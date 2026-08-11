/**
 * COURTSIDE — Data layer
 * Priority: Supabase (if available) → localStorage → demo
 */
(function () {
  "use strict";

  const STORAGE_KEY = "courtside_admin_data";
  let cache = null;
  let cacheAt = 0;
  const CACHE_MS = 30_000;

  function mergeWithDemo(parsed) {
    const demo = window.COURTSIDE_DEMO || {};
    return {
      ...demo,
      ...parsed,
      siteContent: { ...(demo.siteContent || {}), ...(parsed.siteContent || {}) },
      forecasts: parsed.forecasts || demo.forecasts,
      top100: parsed.top100 || demo.top100,
      goat: parsed.goat || demo.goat,
      news: parsed.news || demo.news,
      giComponents: parsed.giComponents || demo.giComponents,
      season: parsed.season || demo.season || (window.COURTSIDE_CONFIG && window.COURTSIDE_CONFIG.SEASON)
    };
  }

  function getFromLocal() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return mergeWithDemo(JSON.parse(saved));
    } catch (e) {
      console.warn("COURTSIDE local load", e);
    }
    return window.COURTSIDE_DEMO || {};
  }

  /** Sync get — local/demo (pages that can't await) */
  function getData() {
    if (cache && Date.now() - cacheAt < CACHE_MS) return cache;
    const local = getFromLocal();
    cache = local;
    cacheAt = Date.now();
    return local;
  }

  /**
   * Async get from Supabase site_content + tables when possible
   */
  async function getDataAsync() {
    const sb = window.COURTSIDE_SB;
    if (!sb) return getData();

    try {
      const [contentRes, forecastRes, newsRes] = await Promise.all([
        sb.from("site_content").select("key, value"),
        sb.from("forecasts").select("*").order("updated_at", { ascending: false }),
        sb.from("news").select("*").eq("published", true).order("published_at", { ascending: false }).limit(20)
      ]);

      const siteContent = {};
      if (contentRes.data) {
        contentRes.data.forEach((row) => {
          siteContent[row.key] = row.value;
        });
      }

      // forecasts from DB if any
      let forecasts = getData().forecasts;
      if (forecastRes.data && forecastRes.data.length) {
        forecasts = forecastRes.data.map((f) => ({
          category: (f.category || "").toUpperCase(),
          player: f.player_name || f.player_id || "—",
          confidence: f.confidence,
          explanation: f.explanation || ""
        }));
      }

      let news = getData().news;
      if (newsRes.data && newsRes.data.length) {
        news = newsRes.data.map((n) => ({
          title: n.title,
          category: n.category,
          excerpt: n.excerpt,
          content: n.content
        }));
      }

      // top100 / goat still often from local until fully migrated
      const local = getFromLocal();
      const merged = mergeWithDemo({
        ...local,
        siteContent: { ...local.siteContent, ...siteContent },
        forecasts,
        news
      });

      // theme from site_content
      if (siteContent.theme && typeof siteContent.theme === "object") {
        applyTheme(siteContent.theme);
      }

      cache = merged;
      cacheAt = Date.now();
      return merged;
    } catch (e) {
      console.warn("COURTSIDE supabase fetch", e);
      return getData();
    }
  }

  function applyTheme(theme) {
    if (!theme) return;
    const root = document.documentElement;
    if (theme.accent) root.style.setProperty("--accent", theme.accent);
    if (theme.neon) root.style.setProperty("--neon", theme.neon);
    if (theme.cyan) root.style.setProperty("--magenta", theme.cyan);
    if (theme.bg) root.style.setProperty("--bg-primary", theme.bg);
  }

  function getPlayerByName(name) {
    const data = getData();
    const list = data.top100 || [];
    return list.find((p) => (p.player || "").toLowerCase() === name.toLowerCase()) || null;
  }

  function getGoatByName(name) {
    const data = getData();
    const list = data.goat || [];
    return list.find((p) => (p.player || "").toLowerCase() === name.toLowerCase()) || null;
  }

  /** Save blob (admin) — localStorage always; Supabase when logged in as admin */
  async function saveData(partial) {
    const current = getFromLocal();
    const next = mergeWithDemo({ ...current, ...partial });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    cache = next;
    cacheAt = Date.now();

    const sb = window.COURTSIDE_SB;
    const auth = window.COURTSIDE_AUTH;
    if (!sb || !auth) return { ok: true, local: true };

    try {
      const admin = await auth.isAdmin();
      if (!admin) return { ok: true, local: true, remote: false };

      // site_content keys
      if (partial.siteContent) {
        for (const [key, value] of Object.entries(partial.siteContent)) {
          await sb.from("site_content").upsert({ key, value, updated_at: new Date().toISOString() });
        }
      }
      if (partial.theme) {
        await sb.from("site_content").upsert({
          key: "theme",
          value: partial.theme,
          updated_at: new Date().toISOString()
        });
        applyTheme(partial.theme);
      }
      // forecasts — store as JSON blob in site_content for simplicity until normalized
      if (partial.forecasts) {
        await sb.from("site_content").upsert({
          key: "forecasts_json",
          value: partial.forecasts,
          updated_at: new Date().toISOString()
        });
      }
      if (partial.top100) {
        await sb.from("site_content").upsert({
          key: "top100_json",
          value: partial.top100,
          updated_at: new Date().toISOString()
        });
      }
      if (partial.goat) {
        await sb.from("site_content").upsert({
          key: "goat_json",
          value: partial.goat,
          updated_at: new Date().toISOString()
        });
      }
      if (partial.news) {
        await sb.from("site_content").upsert({
          key: "news_json",
          value: partial.news,
          updated_at: new Date().toISOString()
        });
      }
      return { ok: true, local: true, remote: true };
    } catch (e) {
      console.warn("COURTSIDE remote save", e);
      return { ok: true, local: true, remote: false, error: String(e) };
    }
  }

  window.COURTSIDE_DATA = {
    get: getData,
    getAsync: getDataAsync,
    getPlayerByName,
    getGoatByName,
    save: saveData,
    applyTheme
  };
})();

/**
 * COURTSIDE — Data layer
 * Reads from localStorage (admin saves) with fallback to demo data.
 * Later: replace with Supabase client.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "courtside_admin_data";

  function getData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with demo so missing keys still exist
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
          season: parsed.season || demo.season
        };
      }
    } catch (e) {
      console.warn("COURTSIDE data load error", e);
    }
    return window.COURTSIDE_DEMO || {};
  }

  function getPlayerByName(name) {
    const data = getData();
    const list = data.top100 || [];
    return list.find((p) => p.player.toLowerCase() === name.toLowerCase()) || null;
  }

  function getGoatByName(name) {
    const data = getData();
    const list = data.goat || [];
    return list.find((p) => p.player.toLowerCase() === name.toLowerCase()) || null;
  }

  window.COURTSIDE_DATA = {
    get: getData,
    getPlayerByName,
    getGoatByName
  };
})();

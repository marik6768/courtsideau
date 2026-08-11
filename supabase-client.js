/**
 * COURTSIDE — Supabase client
 * Requires: config.js loaded first, then supabase-js CDN
 */
(function () {
  "use strict";

  const cfg = window.COURTSIDE_CONFIG || {};
  const url = cfg.SUPABASE_URL || "";
  const key = cfg.SUPABASE_ANON_KEY || "";

  if (!url || !key) {
    console.warn("[COURTSIDE] Supabase URL/key missing — demo mode only");
    window.COURTSIDE_SB = null;
    return;
  }

  if (typeof window.supabase === "undefined" || !window.supabase.createClient) {
    console.warn("[COURTSIDE] supabase-js not loaded. Add CDN script before this file.");
    window.COURTSIDE_SB = null;
    return;
  }

  const client = window.supabase.createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  window.COURTSIDE_SB = client;

  /** Is current user admin? */
  async function isAdmin() {
    const { data: { session } } = await client.auth.getSession();
    if (!session) return false;
    const { data, error } = await client
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .maybeSingle();
    if (error) {
      console.warn("[COURTSIDE] profile check", error.message);
      return false;
    }
    return data && data.role === "admin";
  }

  async function getSession() {
    const { data: { session } } = await client.auth.getSession();
    return session;
  }

  async function signIn(email, password) {
    return client.auth.signInWithPassword({ email, password });
  }

  async function signOut() {
    return client.auth.signOut();
  }

  window.COURTSIDE_AUTH = {
    isAdmin,
    getSession,
    signIn,
    signOut,
    client
  };
})();

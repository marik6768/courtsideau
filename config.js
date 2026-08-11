// COURTSIDE — Configuration
// Replace with your Supabase project values when ready.

const CONFIG = {
  // Supabase (leave empty for pure demo mode)
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",

  // Site
  SITE_NAME: "COURTSIDE",
  SEASON: "2025-26",
  DEMO_MODE: true, // shows DEMO DATA badges when true

  // Version
  VERSION: "0.1.0"
};

// Export for modules (if using type="module")
if (typeof window !== "undefined") {
  window.COURTSIDE_CONFIG = CONFIG;
}

// COURTSIDE — Configuration
// Supabase project: coursideau

const CONFIG = {
  // Base project URL (without /rest/v1/)
  SUPABASE_URL: "https://uoslrsahdcsuitdnvnzf.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_s3a_CpM8uimE9GBGcF90fQ_Okv5jaue",

  SITE_NAME: "COURTSIDE",
  SEASON: "2025-26",
  // false when Supabase is connected — badges still show if tables empty
  DEMO_MODE: false,

  VERSION: "0.2.0"
};

if (typeof window !== "undefined") {
  window.COURTSIDE_CONFIG = CONFIG;
}

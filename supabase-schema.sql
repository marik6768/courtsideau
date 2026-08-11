-- COURTSIDE Supabase schema
-- Run in SQL Editor after creating the project.
-- Enable RLS on all tables. Public read, admin write.

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text default 'user' check (role in ('admin', 'editor', 'user')),
  created_at timestamptz default now()
);

-- Site content (key-value)
create table if not exists public.site_content (
  key text primary key,
  value jsonb,
  updated_at timestamptz default now()
);

-- Players
create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  team text,
  position text,
  photo_url text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Season stats
create table if not exists public.season_stats (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references public.players(id) on delete cascade,
  season text not null,
  pts numeric,
  reb numeric,
  ast numeric,
  stl numeric,
  blk numeric,
  tov numeric,
  fg_pct numeric,
  ts_pct numeric,
  usg numeric,
  gp integer,
  mp numeric,
  efficiency numeric,
  unique(player_id, season)
);

-- Seasonal GI scores
create table if not exists public.gi_scores (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references public.players(id) on delete cascade,
  season text not null,
  gi_score numeric not null,
  production numeric,
  efficiency numeric,
  creation numeric,
  defense numeric,
  consistency numeric,
  winning numeric,
  context numeric,
  rank integer,
  rank_change integer,
  is_new boolean default false,
  unique(player_id, season)
);

-- Historical GOAT
create table if not exists public.goat_rankings (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references public.players(id) on delete cascade,
  rank integer not null,
  gi_score numeric,
  peak numeric,
  longevity numeric,
  winning numeric,
  playoff_impact numeric,
  era_context numeric,
  explanation text,
  updated_at timestamptz default now()
);

-- Forecasts
create table if not exists public.forecasts (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('mvp','dpoy','roy','mip','champion')),
  player_name text,
  team text,
  confidence integer check (confidence between 0 and 100),
  explanation text,
  season text not null,
  updated_at timestamptz default now()
);

-- News
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  category text check (category in ('news','analysis','forecast','essay','gi','history')),
  excerpt text,
  content text,
  cover_image text,
  published boolean default false,
  published_at timestamptz,
  author_id uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS helpers
alter table public.profiles enable row level security;
alter table public.site_content enable row level security;
alter table public.players enable row level security;
alter table public.season_stats enable row level security;
alter table public.gi_scores enable row level security;
alter table public.goat_rankings enable row level security;
alter table public.forecasts enable row level security;
alter table public.news enable row level security;

-- Public read
create policy "Public read profiles" on public.profiles for select using (true);
create policy "Public read site_content" on public.site_content for select using (true);
create policy "Public read players" on public.players for select using (true);
create policy "Public read season_stats" on public.season_stats for select using (true);
create policy "Public read gi_scores" on public.gi_scores for select using (true);
create policy "Public read goat_rankings" on public.goat_rankings for select using (true);
create policy "Public read forecasts" on public.forecasts for select using (true);
create policy "Public read published news" on public.news for select using (published = true);

-- Admin write (assumes profiles.role = 'admin')
create policy "Admin all site_content" on public.site_content for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admin all players" on public.players for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admin all season_stats" on public.season_stats for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admin all gi_scores" on public.gi_scores for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admin all goat_rankings" on public.goat_rankings for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admin all forecasts" on public.forecasts for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admin all news" on public.news for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Storage bucket (create via dashboard or API)
-- name: site-images
-- public: true for read
-- policy: authenticated admin can upload

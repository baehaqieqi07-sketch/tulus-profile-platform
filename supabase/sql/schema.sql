-- TULUS database schema
create extension if not exists "pgcrypto";

create type public.profile_visibility as enum ('public', 'unlisted', 'private');
create type public.subscription_plan as enum ('free', 'plus', 'pro', 'lifetime');
create type public.subscription_status as enum ('active', 'pending', 'expired', 'cancelled');
create type public.payment_status as enum ('draft', 'pending', 'approved', 'rejected', 'failed');
create type public.user_role as enum ('user', 'premium_user', 'moderator', 'owner');
create type public.report_status as enum ('pending', 'reviewing', 'resolved', 'rejected');

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9._]{1,24}$'),
  display_name text not null default 'bekiw' check (char_length(display_name) <= 32),
  bio text default 'just a quiet page for the things i like.',
  avatar_url text,
  background_url text,
  background_type text default 'gradient',
  background_overlay text default 'rgba(255,255,255,.28)',
  background_blur int default 0 check (background_blur between 0 and 40),
  background_brightness int default 100 check (background_brightness between 20 and 180),
  music_title text,
  music_artist text,
  music_url text,
  music_cover_url text,
  theme_name text default 'Pearl Calm',
  accent_color text default '#d9a6a1',
  layout_name text default 'Classic Card',
  visibility profile_visibility not null default 'public',
  show_views boolean default true,
  show_music boolean default true,
  show_badges boolean default true,
  show_gallery boolean default true,
  show_quotes boolean default true,
  show_particles boolean default true,
  show_cursor boolean default false,
  is_suspended boolean default false,
  is_hidden_from_explore boolean default false,
  views bigint default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null check (char_length(label) <= 32),
  url text not null check (url ~ '^https?://'),
  icon text default 'Website',
  style text default 'Glass',
  is_active boolean default true,
  sort_order int default 0,
  clicks bigint default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null check (char_length(label) <= 20),
  color text default '#f1d8d7',
  style text default 'Pearl',
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  text text not null check (char_length(text) <= 160),
  animation text default 'fade',
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text check (char_length(title) <= 80),
  image_url text,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan subscription_plan not null default 'free',
  status subscription_status not null default 'active',
  started_at timestamptz default now(),
  expires_at timestamptz,
  payment_method text default 'manual',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan subscription_plan not null,
  amount numeric(12,2) not null default 0,
  status payment_status not null default 'pending',
  proof_url text,
  provider text default 'manual',
  provider_reference text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  reporter_user_id uuid references auth.users(id) on delete set null,
  reason text not null check (reason in ('spam', 'impersonation', 'harmful_content', 'inappropriate_content', 'other')),
  message text,
  status report_status not null default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  event_type text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role user_role not null default 'user',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, role)
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users(id) on delete set null,
  actor_role user_role,
  action text not null,
  target_type text,
  target_id text,
  metadata jsonb default '{}'::jsonb,
  ip_hash text,
  user_agent_hash text,
  created_at timestamptz default now()
);

create table if not exists public.platform_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz default now()
);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array['profiles','social_links','badges','quotes','gallery_items','subscriptions','payments','reports','user_roles'] loop
    execute format('drop trigger if exists touch_%I_updated_at on public.%I', t, t);
    execute format('create trigger touch_%I_updated_at before update on public.%I for each row execute function public.touch_updated_at()', t, t);
  end loop;
end $$;

create or replace function public.is_owner(uid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.user_roles where user_id = uid and role = 'owner');
$$;

create or replace function public.is_moderator(uid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.user_roles where user_id = uid and role in ('owner', 'moderator'));
$$;

create index if not exists profiles_username_idx on public.profiles(username);
create index if not exists profiles_public_idx on public.profiles(visibility, is_suspended, is_hidden_from_explore);
create index if not exists analytics_profile_event_idx on public.analytics_events(profile_id, event_type, created_at desc);
create index if not exists payments_status_idx on public.payments(status, created_at desc);

-- Auth Gate + Music Recommendation update fields
create table if not exists public.music_recommendations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text,
  mood text,
  category text,
  audio_url text,
  cover_url text,
  is_premium boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists music_source_type text default 'none' check (music_source_type in ('recommendation','direct_url','external_url','upload','none'));
alter table public.profiles add column if not exists music_recommendation_id uuid references public.music_recommendations(id) on delete set null;
alter table public.profiles add column if not exists music_direct_url text;
alter table public.profiles add column if not exists music_external_url text;
alter table public.profiles add column if not exists music_upload_url text;
alter table public.profiles add column if not exists music_loop boolean not null default true;
alter table public.profiles add column if not exists music_volume numeric not null default 0.55 check (music_volume >= 0 and music_volume <= 1);
alter table public.profiles add column if not exists music_equalizer_enabled boolean not null default true;
alter table public.profiles add column if not exists music_fallback_text text not null default 'tap to play music';

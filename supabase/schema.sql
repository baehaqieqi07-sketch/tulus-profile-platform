create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  background_url text,
  music_url text,
  visibility text default 'public' check (visibility in ('public','private','unlisted')),
  plan text default 'free',
  verified boolean default false,
  theme jsonb default '{}'::jsonb,
  apps jsonb default '[]'::jsonb,
  gallery jsonb default '[]'::jsonb,
  analytics jsonb default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  profile_id uuid references public.profiles(id) on delete cascade,
  type text not null,
  name text not null,
  url text not null,
  size_bytes bigint default 0,
  favorite boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.payment_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  profile_id uuid references public.profiles(id) on delete cascade,
  plan text not null,
  amount text not null,
  method text default 'manual',
  proof_url text,
  status text default 'pending' check (status in ('pending','approved','rejected')),
  owner_note text,
  created_at timestamptz default now(),
  reviewed_at timestamptz
);

create table if not exists public.profile_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  event_type text not null,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.help_articles (
  id text primary key,
  category text not null,
  title jsonb not null,
  body jsonb not null,
  published boolean default true,
  updated_at timestamptz default now()
);

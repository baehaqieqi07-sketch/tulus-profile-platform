-- TULUS Auth Gate + Music Recommendation Update
-- Run this after schema.sql. Safe to re-run.

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

alter table public.music_recommendations enable row level security;

drop policy if exists "active music recommendations are readable" on public.music_recommendations;
create policy "active music recommendations are readable"
  on public.music_recommendations for select
  using (is_active = true);

drop policy if exists "owners manage music recommendations" on public.music_recommendations;
create policy "owners manage music recommendations"
  on public.music_recommendations for all
  using (public.is_owner(auth.uid()))
  with check (public.is_owner(auth.uid()));

insert into public.music_recommendations (title, artist, mood, category, audio_url, cover_url, is_premium, is_active, sort_order)
values
  ('Calm Room', 'TULUS Ambient', 'calm', 'Ambient', '', '', false, true, 1),
  ('Blue Mist', 'TULUS Mood', 'blue mood', 'Blue Mood', '', '', false, true, 2),
  ('Soft Piano Placeholder', 'Replace with licensed audio', 'soft piano', 'Soft Piano', '', '', false, true, 3),
  ('Night Glass', 'TULUS Premium', 'night', 'Night', '', '', true, true, 4)
on conflict do nothing;

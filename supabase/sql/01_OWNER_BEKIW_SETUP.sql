-- TULUS OWNER + PROFILE BEKIW SETUP
-- Jalankan setelah 00_FULL_SAFE_MIGRATION.sql dan rls-policies.sql.
-- Aman dijalankan ulang. Tidak menghapus data.

insert into public.user_roles (user_id, role)
select id, 'owner'::public.user_role
from auth.users
where email = 'baehaqieqi07@gmail.com'
and not exists (
  select 1 from public.user_roles r where r.user_id = auth.users.id and r.role = 'owner'::public.user_role
);

insert into public.profiles (
  user_id,
  username,
  display_name,
  bio,
  visibility,
  show_music,
  music_source_type,
  theme_name,
  accent_color,
  music_title,
  music_artist,
  music_url,
  music_external_url,
  music_fallback_text,
  background_overlay
)
select
  id,
  'bekiw',
  'bekiw',
  'quiet page, clean links, soft blue glass.',
  'public'::public.profile_visibility,
  true,
  'external_platform',
  'TULUS Bio Night',
  '#4F8CFF',
  'soft room',
  'tulus space',
  'https://www.youtube.com/',
  'https://www.youtube.com/',
  'open music',
  'rgba(0,0,0,.62)'
from auth.users
where email = 'baehaqieqi07@gmail.com'
on conflict (username) do update set
  display_name = excluded.display_name,
  bio = excluded.bio,
  visibility = 'public'::public.profile_visibility,
  show_music = true,
  music_source_type = 'external_platform',
  theme_name = 'TULUS Bio Night',
  accent_color = '#4F8CFF',
  music_title = coalesce(nullif(public.profiles.music_title, ''), 'soft room'),
  music_artist = coalesce(nullif(public.profiles.music_artist, ''), 'tulus space'),
  music_url = coalesce(nullif(public.profiles.music_url, ''), 'https://www.youtube.com/'),
  music_external_url = coalesce(nullif(public.profiles.music_external_url, ''), 'https://www.youtube.com/'),
  music_fallback_text = coalesce(nullif(public.profiles.music_fallback_text, ''), 'open music'),
  background_overlay = 'rgba(0,0,0,.62)',
  updated_at = now();

insert into public.badges (user_id, label, color, style, is_active, sort_order)
select u.id, x.label, x.color, 'glass', true, x.sort_order
from auth.users u
cross join (values
  ('calm', 'rose', 1),
  ('soft', 'lavender', 2),
  ('personal', 'blue', 3)
) as x(label, color, sort_order)
where u.email = 'baehaqieqi07@gmail.com'
and not exists (select 1 from public.badges b where b.user_id = u.id and b.label = x.label);

insert into public.quotes (user_id, text, animation, is_active, sort_order)
select u.id, x.text, 'fade', true, x.sort_order
from auth.users u
cross join (values
  ('softly, quietly.', 1),
  ('less noise, more meaning.', 2),
  ('simple pages feel better.', 3)
) as x(text, sort_order)
where u.email = 'baehaqieqi07@gmail.com'
and not exists (select 1 from public.quotes q where q.user_id = u.id and q.text = x.text);


-- Default bio-style social links for public profile
insert into public.social_links (user_id, label, url, icon, style, is_active, sort_order)
select u.id, x.label, x.url, x.icon, 'glass', true, x.sort_order
from auth.users u
cross join (values
  ('Discord', 'https://discord.com', 'discord', 1),
  ('Instagram', 'https://instagram.com', 'instagram', 2),
  ('Spotify', 'https://spotify.com', 'spotify', 3)
) as x(label, url, icon, sort_order)
where u.email = 'baehaqieqi07@gmail.com'
and not exists (select 1 from public.social_links s where s.user_id = u.id and s.label = x.label);

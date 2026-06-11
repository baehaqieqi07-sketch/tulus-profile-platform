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
  accent_color
)
select
  id,
  'bekiw',
  'bekiw',
  'just a quiet page for the things i like.',
  'public'::public.profile_visibility,
  true,
  'none',
  'Pearl Calm',
  '#4F8CFF'
from auth.users
where email = 'baehaqieqi07@gmail.com'
on conflict (username) do update set
  display_name = excluded.display_name,
  bio = excluded.bio,
  visibility = 'public'::public.profile_visibility,
  show_music = true,
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

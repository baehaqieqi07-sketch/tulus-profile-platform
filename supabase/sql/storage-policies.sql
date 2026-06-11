-- TULUS storage buckets + safe policies
-- Aman dijalankan ulang. Tidak menghapus file user.

insert into storage.buckets (id, name, public) values
  ('avatars', 'avatars', true),
  ('backgrounds', 'backgrounds', true),
  ('gallery', 'gallery', true),
  ('music', 'music', false),
  ('profile-music', 'profile-music', true),
  ('payment-proofs', 'payment-proofs', false)
on conflict (id) do update set public = excluded.public;

-- Hapus policy lama dulu supaya SQL bisa dijalankan ulang tanpa error duplicate policy.
drop policy if exists "public read avatars" on storage.objects;
drop policy if exists "public read backgrounds" on storage.objects;
drop policy if exists "public read gallery" on storage.objects;
drop policy if exists "users upload own avatars" on storage.objects;
drop policy if exists "users update own avatars" on storage.objects;
drop policy if exists "users delete own avatars" on storage.objects;
drop policy if exists "users upload own backgrounds" on storage.objects;
drop policy if exists "users manage own backgrounds" on storage.objects;
drop policy if exists "users delete own backgrounds" on storage.objects;
drop policy if exists "users upload own gallery" on storage.objects;
drop policy if exists "users manage own gallery" on storage.objects;
drop policy if exists "users delete own gallery" on storage.objects;
drop policy if exists "users read own music" on storage.objects;
drop policy if exists "users upload own music" on storage.objects;
drop policy if exists "users manage own music" on storage.objects;
drop policy if exists "users delete own music" on storage.objects;
drop policy if exists "users read own payment proofs" on storage.objects;
drop policy if exists "users upload own payment proofs" on storage.objects;
drop policy if exists "owners read all payment proofs" on storage.objects;
drop policy if exists "owners manage all storage" on storage.objects;
drop policy if exists "Users upload own profile music" on storage.objects;
drop policy if exists "Users update own profile music" on storage.objects;
drop policy if exists "Users delete own profile music" on storage.objects;
drop policy if exists "Anyone can read public profile music" on storage.objects;

create policy "public read avatars" on storage.objects for select using (bucket_id = 'avatars');
create policy "public read backgrounds" on storage.objects for select using (bucket_id = 'backgrounds');
create policy "public read gallery" on storage.objects for select using (bucket_id = 'gallery');

create policy "users upload own avatars" on storage.objects for insert to authenticated with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users update own avatars" on storage.objects for update to authenticated using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users delete own avatars" on storage.objects for delete to authenticated using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users upload own backgrounds" on storage.objects for insert to authenticated with check (bucket_id = 'backgrounds' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users manage own backgrounds" on storage.objects for update to authenticated using (bucket_id = 'backgrounds' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users delete own backgrounds" on storage.objects for delete to authenticated using (bucket_id = 'backgrounds' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users upload own gallery" on storage.objects for insert to authenticated with check (bucket_id = 'gallery' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users manage own gallery" on storage.objects for update to authenticated using (bucket_id = 'gallery' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users delete own gallery" on storage.objects for delete to authenticated using (bucket_id = 'gallery' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users read own music" on storage.objects for select to authenticated using (bucket_id = 'music' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users upload own music" on storage.objects for insert to authenticated with check (bucket_id = 'music' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users manage own music" on storage.objects for update to authenticated using (bucket_id = 'music' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users delete own music" on storage.objects for delete to authenticated using (bucket_id = 'music' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users read own payment proofs" on storage.objects for select to authenticated using (bucket_id = 'payment-proofs' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users upload own payment proofs" on storage.objects for insert to authenticated with check (bucket_id = 'payment-proofs' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "owners read all payment proofs" on storage.objects for select to authenticated using (bucket_id = 'payment-proofs' and public.is_owner(auth.uid()));
create policy "owners manage all storage" on storage.objects for all to authenticated using (public.is_owner(auth.uid())) with check (public.is_owner(auth.uid()));

-- Public profile music. File harus disimpan di folder /{user_id}/file.mp3
create policy "Users upload own profile music" on storage.objects for insert to authenticated with check (bucket_id = 'profile-music' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users update own profile music" on storage.objects for update to authenticated using (bucket_id = 'profile-music' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users delete own profile music" on storage.objects for delete to authenticated using (bucket_id = 'profile-music' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Anyone can read public profile music" on storage.objects for select to anon, authenticated using (bucket_id = 'profile-music');

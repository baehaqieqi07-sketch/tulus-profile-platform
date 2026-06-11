-- Create buckets from Supabase SQL editor if allowed, or create them manually from Storage UI.
insert into storage.buckets (id, name, public) values
  ('avatars', 'avatars', true),
  ('backgrounds', 'backgrounds', true),
  ('gallery', 'gallery', true),
  ('music', 'music', false),
  ('payment-proofs', 'payment-proofs', false)
on conflict (id) do nothing;

-- Folder convention: each user uploads to /{user_id}/filename.ext
create policy "public read avatars" on storage.objects for select using (bucket_id = 'avatars');
create policy "public read backgrounds" on storage.objects for select using (bucket_id = 'backgrounds');
create policy "public read gallery" on storage.objects for select using (bucket_id = 'gallery');

create policy "users upload own avatars" on storage.objects for insert with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users update own avatars" on storage.objects for update using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users delete own avatars" on storage.objects for delete using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users upload own backgrounds" on storage.objects for insert with check (bucket_id = 'backgrounds' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users manage own backgrounds" on storage.objects for update using (bucket_id = 'backgrounds' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users delete own backgrounds" on storage.objects for delete using (bucket_id = 'backgrounds' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users upload own gallery" on storage.objects for insert with check (bucket_id = 'gallery' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users manage own gallery" on storage.objects for update using (bucket_id = 'gallery' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users delete own gallery" on storage.objects for delete using (bucket_id = 'gallery' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users read own music" on storage.objects for select using (bucket_id = 'music' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users upload own music" on storage.objects for insert with check (bucket_id = 'music' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users manage own music" on storage.objects for update using (bucket_id = 'music' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users delete own music" on storage.objects for delete using (bucket_id = 'music' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users read own payment proofs" on storage.objects for select using (bucket_id = 'payment-proofs' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users upload own payment proofs" on storage.objects for insert with check (bucket_id = 'payment-proofs' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "owners read all payment proofs" on storage.objects for select using (bucket_id = 'payment-proofs' and public.is_owner(auth.uid()));
create policy "owners manage all storage" on storage.objects for all using (public.is_owner(auth.uid())) with check (public.is_owner(auth.uid()));

-- Music upload security reminder:
-- Bucket "music" should stay private unless you intentionally serve direct audio with signed URLs.
-- User uploads must stay in folder auth.uid() and only mp3/ogg/wav should be accepted by serverless validation.

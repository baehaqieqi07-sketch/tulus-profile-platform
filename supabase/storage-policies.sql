-- Buckets to create in Supabase dashboard:
-- profile-media, payment-proofs, brand-assets

-- Example policy idea for profile-media:
-- allow authenticated users to upload only into their own folder:
-- bucket_id = 'profile-media' and auth.uid()::text = (storage.foldername(name))[1]

-- Keep payment proofs private in production. Owner/admin should review via server/service role.
-- Do not expose service role key in frontend.

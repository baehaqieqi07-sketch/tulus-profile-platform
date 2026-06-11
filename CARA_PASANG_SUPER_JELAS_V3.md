# Cara Pasang TULUS V3 — Super Jelas

1. Backup folder `D:\tulus`.
2. Extract ZIP ini.
3. Buka folder `tulus-profile-platform`.
4. Copy semua isi folder itu.
5. Paste ke `D:\tulus` lalu pilih Replace.
6. Buka VS Code → File → Open Folder → `D:\tulus`.
7. Terminal → New Terminal.
8. Jalankan:

```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
```

9. Kalau build sukses, jalankan:

```powershell
git add .
git commit -m "TULUS prompt match v3"
git push
```

10. Buka Vercel → project `tulus` → Deployments → tunggu Ready.
11. Buka Supabase → SQL Editor → jalankan berurutan:

- `supabase/sql/00_FULL_SAFE_MIGRATION.sql`
- `supabase/sql/rls-policies.sql`
- `supabase/sql/storage-policies.sql`
- `supabase/sql/music-recommendations.sql`
- `supabase/sql/01_OWNER_BEKIW_SETUP.sql`

12. Buka Supabase → Storage → pastikan bucket ada:

- avatars
- backgrounds
- gallery
- profile-music
- payment-proofs

13. Buka Vercel → Settings → Environment Variables, pastikan ada:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_TURNSTILE_SITE_KEY
- VITE_OWNER_EMAIL = baehaqieqi07@gmail.com
- APP_URL = https://tulus-id.vercel.app

14. Tes:

- https://tulus-id.vercel.app
- https://tulus-id.vercel.app/auth
- https://tulus-id.vercel.app/bekiw
- https://tulus-id.vercel.app/dashboard
- https://tulus-id.vercel.app/tulus-control

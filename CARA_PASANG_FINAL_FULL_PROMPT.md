# CARA PASANG TULUS FINAL FULL PROMPT

Pakai file ZIP ini saja. Jangan campur dengan ZIP lama.

## 1. Masukkan project ke D:\tulus
1. Extract ZIP.
2. Masuk folder `tulus-profile-platform`.
3. Copy semua isi folder.
4. Paste ke `D:\tulus`.
5. Pilih Replace.

## 2. Build dan push
Buka VS Code → Open Folder → `D:\tulus` → Terminal → New Terminal.

```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
git add .
git commit -m "TULUS final full prompt update"
git push
```

## 3. Vercel
Buka Vercel → project `tulus` → Deployments → tunggu `Ready`.

Cek Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_TURNSTILE_SITE_KEY`
- `VITE_OWNER_EMAIL=baehaqieqi07@gmail.com`
- `APP_URL=https://tulus-id.vercel.app`

Kalau edit env, Redeploy tanpa build cache.

## 4. Supabase SQL urut
Supabase → SQL Editor → New Query. Run file ini satu-satu:
1. `supabase/sql/00_FULL_SAFE_MIGRATION.sql`
2. `supabase/sql/rls-policies.sql`
3. `supabase/sql/storage-policies.sql`
4. `supabase/sql/music-recommendations.sql`
5. `supabase/sql/01_OWNER_BEKIW_SETUP.sql`
6. Jika musik masih kosong, run `supabase/sql/02_FORCE_BEKIW_MUSIC_READY.sql`

## 5. Storage
Supabase → Storage. Pastikan ada bucket:
- avatars public
- backgrounds public
- gallery public
- profile-music public
- payment-proofs private

## 6. Tes link
Buka incognito:
- `https://tulus-id.vercel.app`
- `https://tulus-id.vercel.app/auth`
- `https://tulus-id.vercel.app/bekiw`
- `https://tulus-id.vercel.app/dashboard`
- `https://tulus-id.vercel.app/tulus-control`

## 7. Musik
YouTube/Spotify/TikTok tampil sebagai tombol external.
MP3 direct/upload bisa diputar setelah Click To Enter.

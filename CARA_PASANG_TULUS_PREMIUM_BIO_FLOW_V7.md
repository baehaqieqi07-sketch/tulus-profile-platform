# CARA PASANG TULUS PREMIUM BIO FLOW V7

Update ini dibuat untuk membuat TULUS terasa seperti platform bio-page modern: fullscreen profile, click-to-enter, login/register rapi, onboarding, account dashboard, badges, analytics, customize, links, pricing, leaderboard, help center, owner panel, dan efek premium original versi TULUS.

## Urutan aman

1. Backup folder lama `D:\tulus`.
2. Extract ZIP V7.
3. Copy semua isi folder `tulus-profile-platform`.
4. Paste ke `D:\tulus` dan pilih Replace.
5. Buka VS Code > Open Folder > `D:\tulus`.
6. Terminal:

```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
git add .
git commit -m "TULUS premium bio flow v7"
git push
```

7. Buka Vercel > project `tulus` > Deployments > tunggu `Ready`.
8. Jalankan SQL Supabase yang sudah ada jika belum pernah:
   - `supabase/sql/00_FULL_SAFE_MIGRATION.sql`
   - `supabase/sql/rls-policies.sql`
   - `supabase/sql/storage-policies.sql`
   - `supabase/sql/music-recommendations.sql`
   - `supabase/sql/01_OWNER_BEKIW_SETUP.sql`

## Link yang dites

- `https://tulus-id.vercel.app`
- `https://tulus-id.vercel.app/login`
- `https://tulus-id.vercel.app/register`
- `https://tulus-id.vercel.app/pricing`
- `https://tulus-id.vercel.app/help`
- `https://tulus-id.vercel.app/leaderboard`
- `https://tulus-id.vercel.app/bekiw`
- `https://tulus-id.vercel.app/account`
- `https://tulus-id.vercel.app/account/settings`
- `https://tulus-id.vercel.app/account/badges`
- `https://tulus-id.vercel.app/account/analytics`
- `https://tulus-id.vercel.app/customize`
- `https://tulus-id.vercel.app/links`
- `https://tulus-id.vercel.app/dashboard`
- `https://tulus-id.vercel.app/tulus-control`

## Catatan penting

- Ini bukan copy mentah asset/nama/layout website lain. Ini versi TULUS original dengan flow bio-page modern.
- Warna utama tetap biru TULUS/ORANG TULUS dengan purple accent lembut.
- YouTube/Spotify/TikTok tetap external button, bukan autoplay direct.
- MP3 direct dari Supabase Storage bisa play setelah click-to-enter.
- Payment auto-detect tetap perlu key asli payment gateway.

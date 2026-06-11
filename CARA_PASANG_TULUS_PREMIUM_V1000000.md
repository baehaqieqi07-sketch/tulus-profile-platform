# CARA PASANG TULUS PREMIUM UPDATE

Pakai ZIP ini sebagai update utama. Nama update tidak ditampilkan di UI publik supaya TULUS tetap clean.

## 1. Backup
- Buka File Explorer
- Masuk ke D:\
- Copy folder `tulus`
- Rename jadi `tulus-backup-sebelum-update-premium-besar`

## 2. Pasang file
- Extract ZIP
- Masuk folder `tulus-profile-platform`
- Ctrl + A
- Ctrl + C
- Buka `D:\tulus`
- Ctrl + V
- Pilih Replace

Jangan hapus:
- `.git`
- `.env`
- `.env.local`

Jangan upload ke GitHub:
- `.env`
- `.env.local`

## 3. Build
```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
```

Kalau ada `✓ built`, lanjut.

## 4. Push
```powershell
git add .
git commit -m "TULUS premium platform update"
git push
```

Kalau muncul unlink file `.git/objects/pack`, ketik `n`, Enter, lalu jalankan `git status` dan `git push` ulang.

## 5. Vercel
- Buka vercel.com
- Project `tulus`
- Deployments
- Tunggu `Ready`

## 6. Vercel ENV wajib
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_TURNSTILE_SITE_KEY`
- `VITE_OWNER_EMAIL=baehaqieqi07@gmail.com`
- `APP_URL=https://tulus-id.vercel.app`

Kalau ENV diubah, Redeploy tanpa build cache.

## 7. Supabase SQL
Run urut:
1. `supabase/sql/00_FULL_SAFE_MIGRATION.sql`
2. `supabase/sql/rls-policies.sql`
3. `supabase/sql/storage-policies.sql`
4. `supabase/sql/music-recommendations.sql`
5. `supabase/sql/01_OWNER_BEKIW_SETUP.sql`

Jangan run `schema.sql` kalau database sudah pernah dibuat.

## 8. Supabase Auth URL
- Site URL: `https://tulus-id.vercel.app`
- Redirect URL: `https://tulus-id.vercel.app/**`

## 9. AI bekiw
Untuk AI real, isi secret server-side:
- `OPENAI_API_KEY`
- `OPENAI_MODEL`

Jangan taruh key OpenAI di frontend atau variable yang diawali `VITE_`.

## 10. Google/Discord Login
Aktifkan dari:
- Supabase → Authentication → Providers → Google
- Supabase → Authentication → Providers → Discord

Butuh Client ID dan Client Secret dari provider masing-masing.

## 11. Tes halaman
- `/`
- `/login`
- `/register`
- `/help`
- `/games`
- `/pricing`
- `/leaderboard`
- `/bekiw`
- `/account`
- `/account/settings`
- `/customize`
- `/links`
- `/tulus-control`

## 12. Yang baru
- Logo TULUS baru yang simple premium
- UI bahasa benar-benar berubah untuk label penting
- AI bekiw seperti chat biasa dengan typing animation
- Help Center lebih lengkap
- Game Center: Focus Tap, Memory Light, Aura Match, Word Flow
- Icon brand lebih rapi dan sesuai aplikasi
- Dashboard lebih isi
- Animasi dan efek lebih premium
- Public profile tetap fullscreen bio style

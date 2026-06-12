# CARA PASANG UPDATE FINAL TULUS

Ikuti langkah ini di Windows + VS Code + PowerShell.

## 1. Backup dulu

1. Buka File Explorer.
2. Masuk ke `D:\`.
3. Klik kanan folder `tulus`.
4. Klik Copy.
5. Paste di tempat yang sama.
6. Rename jadi `tulus-backup-sebelum-update`.

## 2. Extract ZIP final

1. Buka Downloads.
2. Klik kanan ZIP TULUS final.
3. Klik Extract All.
4. Klik Extract.
5. Masuk ke folder yang langsung punya `package.json`, `src`, `supabase`, `README.md`.

## 3. Pindahkan ke D:\tulus

1. Di folder hasil extract, tekan `Ctrl + A`.
2. Tekan `Ctrl + C`.
3. Buka `D:\tulus`.
4. Tekan `Ctrl + V`.
5. Pilih Replace the files in the destination.
6. Jangan hapus folder `.git` lokal.
7. Jangan upload `.env` atau `.env.local` ke GitHub.

## 4. Install ulang dependency bersih

Buka VS Code → File → Open Folder → pilih `D:\tulus` → Terminal → New Terminal.

Jalankan:

```powershell
cd D:\tulus
if (Test-Path node_modules) { Remove-Item -Recurse -Force node_modules }
if (Test-Path dist) { Remove-Item -Recurse -Force dist }
npm.cmd install
```

## 5. Isi env lokal

Kalau belum ada `.env.local`, copy dari `.env.example`, lalu isi minimal:

```env
VITE_SUPABASE_URL=https://PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=ISI_ANON_PUBLIC_KEY
VITE_TURNSTILE_SITE_KEY=
VITE_OWNER_EMAIL=baehaqieqi07@gmail.com
APP_URL=https://tulus-id.vercel.app
```

Jangan isi secret server di frontend.

## 6. Test lokal

```powershell
npm.cmd run dev
```

Buka URL localhost yang muncul, biasanya:

```text
http://localhost:5173
```

Cek halaman:

- `/`
- `/login`
- `/register`
- `/help`
- `/games`
- `/pricing`
- `/explore`
- `/leaderboard`
- `/bekiw`

## 7. Build production

```powershell
npm.cmd run build
```

Hasil benar:

```text
✓ built
```

Warning chunk 500kB bukan error.

## 8. Push ke GitHub

```powershell
git status
git add .
git commit -m "TULUS final full polish update"
git push
```

Kalau muncul `nothing to commit`, lanjut ke Vercel.

## 9. Deploy Vercel

1. Buka `https://vercel.com`.
2. Masuk project `tulus`.
3. Klik Deployments.
4. Tunggu deployment paling atas sampai Ready.

Kalau env Vercel berubah:

1. Project tulus → Settings → Environment Variables.
2. Pastikan ada `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_TURNSTILE_SITE_KEY`, `VITE_OWNER_EMAIL`, `APP_URL`.
3. Deployments → titik tiga deployment terbaru → Redeploy.
4. Jangan pakai existing build cache.

## 10. Supabase checklist

Jalankan SQL hanya kalau belum sukses:

1. `supabase/sql/00_FULL_SAFE_MIGRATION.sql`
2. `supabase/sql/rls-policies.sql`
3. `supabase/sql/storage-policies.sql`
4. `supabase/sql/music-recommendations.sql`
5. `supabase/sql/01_OWNER_BEKIW_SETUP.sql`

Jangan jalankan `schema.sql` di database lama.

## 11. Google Search Console

Setelah domain online:

1. Buka Google Search Console.
2. Tambah property domain atau URL prefix `https://tulus-id.vercel.app`.
3. Submit sitemap:

```text
https://tulus-id.vercel.app/sitemap.xml
```

4. Pakai URL Inspection untuk:

```text
https://tulus-id.vercel.app
https://tulus-id.vercel.app/bekiw
```

5. Klik Request indexing.

## 12. Checklist device

Test manual:

- 320px HP kecil
- 375px iPhone umum
- 430px HP besar
- 768px tablet
- 1024px laptop kecil
- 1366px laptop
- 1440px monitor
- 1920px PC besar

Halaman wajib dicek:

- Landing
- Login/Register
- Dashboard/Account
- Customize
- Links
- Public profile `/bekiw`
- Help Center
- Game Center
- Pricing/Premium
- Leaderboard
- Explore
- Owner panel sebagai owner dan non-owner

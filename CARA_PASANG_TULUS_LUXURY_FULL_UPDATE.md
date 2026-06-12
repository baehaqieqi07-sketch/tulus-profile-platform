# Cara Pasang TULUS Luxury Full Update

## 1. Backup

Buka File Explorer → masuk `D:\` → copy folder `tulus` → paste → rename jadi `tulus-backup-sebelum-update`.

## 2. Extract ZIP

Klik kanan ZIP update → Extract All → Extract. Masuk folder project sampai terlihat `package.json`, `src`, `supabase`, dan `README.md`.

## 3. Copy ke project lama

Di folder hasil extract tekan `Ctrl + A` → `Ctrl + C`. Buka `D:\tulus` → `Ctrl + V` → pilih Replace files in destination. Jangan hapus `.git`.

Struktur yang benar:

```text
D:\tulus\package.json
D:\tulus\src
D:\tulus\supabase
```

Bukan:

```text
D:\tulus\tulus-profile-platform\package.json
```

## 4. Build

Buka VS Code → File → Open Folder → `D:\tulus` → Terminal → New Terminal.

```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
```

Hasil benar: `✓ built`.

## 5. GitHub

```powershell
cd D:\tulus
git status
git add .
git commit -m "TULUS luxury full update"
git push
```

Kalau `nothing to commit` atau `Everything up-to-date`, aman.

## 6. Vercel

Buka Vercel → project `tulus` → Deployments → tunggu status `Ready`.

## 7. Env Vercel

Settings → Environment Variables. Pastikan ada:

```env
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_TURNSTILE_SITE_KEY
VITE_OWNER_EMAIL=baehaqieqi07@gmail.com
APP_URL=https://tulus-id.vercel.app
```

Jika env diubah, redeploy tanpa existing build cache.

## 8. Supabase

Run SQL urut:

1. `00_FULL_SAFE_MIGRATION.sql`
2. `rls-policies.sql`
3. `storage-policies.sql`
4. `music-recommendations.sql`
5. `01_OWNER_BEKIW_SETUP.sql`

Cek bucket storage: avatars, backgrounds, gallery, profile-music public; payment-proofs private.

## 9. Tes

Buka:

- `https://tulus-id.vercel.app`
- `https://tulus-id.vercel.app/login`
- `https://tulus-id.vercel.app/register`
- `https://tulus-id.vercel.app/account`
- `https://tulus-id.vercel.app/customize`
- `https://tulus-id.vercel.app/links`
- `https://tulus-id.vercel.app/help`
- `https://tulus-id.vercel.app/leaderboard`
- `https://tulus-id.vercel.app/games`
- `https://tulus-id.vercel.app/bekiw`
- `https://tulus-id.vercel.app/tulus-control`

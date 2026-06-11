# CARA PASANG TULUS PREMIUM MEGA UPDATE

Panduan ini lanjut dari project TULUS yang sudah ada, bukan mulai dari nol.

## 1. Buka VS Code

1. Buka **VS Code**.
2. Klik **File**.
3. Klik **Open Folder**.
4. Pilih folder:

```powershell
D:\tulus
```

## 2. Backup dulu

Di PowerShell:

```powershell
cd D:\tulus
copy .env .env.backup
```

Kalau `.env` tidak ada, lanjut saja.

## 3. Copy isi update

1. Extract ZIP update ini.
2. Copy semua isi folder `tulus-profile-platform`.
3. Paste ke:

```powershell
D:\tulus
```

4. Pilih **Replace files in destination**.
5. Jangan hapus `.env` lokal kamu kalau sudah berisi key asli.

## 4. Install dan build

Di PowerShell:

```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
```

Hasil benar:

```text
found 0 vulnerabilities
✓ built
```

Warning chunk lebih dari 500kB bukan error.

## 5. Git push

```powershell
git status
git add .
git commit -m "TULUS premium mega update"
git push origin main
```

Kalau muncul:

```text
Unlink of file '.git/objects/pack/...idx' failed. Should I try again? (y/n)
```

Ketik:

```text
n
```

Lalu tekan Enter, tutup VS Code, buka lagi PowerShell, jalankan:

```powershell
cd D:\tulus
git push origin main
```

## 6. Vercel

1. Buka **vercel.com**.
2. Masuk project **tulus**.
3. Buka **Deployments**.
4. Tunggu status **Ready**.
5. Jangan pakai link preview panjang. Pakai:

```text
https://tulus-id.vercel.app
```

## 7. Cek Environment Variables di Vercel

Masuk:

**Project tulus → Settings → Environment Variables**

Pastikan ada:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_TURNSTILE_SITE_KEY=
VITE_OWNER_EMAIL=baehaqieqi07@gmail.com
APP_URL=https://tulus-id.vercel.app
```

Kalau env diubah, redeploy Vercel tanpa existing build cache.

## 8. Supabase SQL

Buka **Supabase → project tulus → SQL Editor**.

Jalankan urut:

```text
supabase/sql/00_FULL_SAFE_MIGRATION.sql
supabase/sql/rls-policies.sql
supabase/sql/storage-policies.sql
supabase/sql/music-recommendations.sql
supabase/sql/01_OWNER_BEKIW_SETUP.sql
```

Jangan jalankan `schema.sql` kalau database sudah ada.

Kalau error `profile_visibility already exists`, berarti file yang dijalankan salah. Pakai `00_FULL_SAFE_MIGRATION.sql`.

## 9. Tes halaman

Buka:

```text
https://tulus-id.vercel.app
https://tulus-id.vercel.app/bekiw
https://tulus-id.vercel.app/login
https://tulus-id.vercel.app/register
https://tulus-id.vercel.app/account
https://tulus-id.vercel.app/customize
https://tulus-id.vercel.app/links
https://tulus-id.vercel.app/help
https://tulus-id.vercel.app/games
https://tulus-id.vercel.app/leaderboard
https://tulus-id.vercel.app/tulus-control
```

Yang benar:

- `/bekiw` bisa dibuka publik.
- `/account`, `/customize`, `/links` minta login kalau belum login.
- `/tulus-control` user biasa melihat page not found.
- Language picker mengubah UI utama.
- Help Center bekiw tampil seperti chat.
- Social/app icons tampil rapi dan recognizable.
- Leaderboard memakai data Supabase/public profile, bukan angka random.
- Game score dan streak tersimpan di localStorage.
- Profile views naik dengan cooldown.

## 10. Fitur yang butuh key asli

Struktur sudah disiapkan, tapi real service butuh key/provider asli:

- OpenAI AI real: `OPENAI_API_KEY` dan `OPENAI_MODEL` di server/Supabase function.
- Google Login: Supabase Authentication Provider Google harus aktif dengan Client ID/Secret.
- Discord Login: Supabase Authentication Provider Discord harus aktif dengan Client ID/Secret.
- Payment otomatis: butuh Midtrans/Xendit/Duitku/Stripe key dan webhook aktif.

Jangan taruh secret di frontend, GitHub, `.env.example` dengan value asli, atau variable `VITE_`.

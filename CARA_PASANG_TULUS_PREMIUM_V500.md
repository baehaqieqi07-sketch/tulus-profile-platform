# Cara Pasang TULUS Premium Platform Update

Pakai ZIP ini saja. Jangan campur dengan ZIP lama.

## 1. Backup
1. Buka File Explorer.
2. Buka `D:\`.
3. Copy folder `tulus`.
4. Paste, lalu rename jadi `tulus-backup-sebelum-update`.

## 2. Copy update
1. Extract ZIP.
2. Masuk folder `tulus-profile-platform`.
3. Tekan `Ctrl + A` lalu `Ctrl + C`.
4. Buka `D:\tulus`.
5. Tekan `Ctrl + V`.
6. Pilih `Replace the files in the destination`.

## 3. Build
Buka VS Code → Open Folder → `D:\tulus` → Terminal → New Terminal.

```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
```

Kalau muncul `✓ built`, lanjut.

## 4. Push GitHub
```powershell
git add .
git commit -m "TULUS premium platform update"
git push
```

## 5. Vercel
1. Buka Vercel.
2. Project `tulus`.
3. Buka `Deployments`.
4. Tunggu status `Ready`.

## 6. Environment Variables Vercel
Wajib ada:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_TURNSTILE_SITE_KEY`
- `VITE_OWNER_EMAIL`
- `APP_URL`

Isi penting:

- `VITE_OWNER_EMAIL=baehaqieqi07@gmail.com`
- `APP_URL=https://tulus-id.vercel.app`

Kalau env baru diedit, redeploy tanpa build cache.

## 7. Supabase SQL
Jalankan urut lewat SQL Editor:

1. `supabase/sql/00_FULL_SAFE_MIGRATION.sql`
2. `supabase/sql/rls-policies.sql`
3. `supabase/sql/storage-policies.sql`
4. `supabase/sql/music-recommendations.sql`
5. `supabase/sql/01_OWNER_BEKIW_SETUP.sql`

Jangan run `schema.sql` di database yang sudah pernah dibuat.

## 8. Supabase Auth URL
Authentication → URL Configuration:

- Site URL: `https://tulus-id.vercel.app`
- Redirect URL: `https://tulus-id.vercel.app/**`

## 9. OAuth Google / Discord
Supabase → Authentication → Sign In / Providers:

- Aktifkan Google jika ingin tombol Google real.
- Aktifkan Discord jika ingin tombol Discord real.
- Isi Client ID dan Secret dari provider masing-masing.

Kalau belum diaktifkan, tombol akan tampil tetapi login OAuth belum jalan.

## 10. AI bekiw
Supabase → Edge Functions → Secrets:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`

Jangan pernah simpan OpenAI key di frontend atau GitHub.

## 11. Tes link
Tes:

- `https://tulus-id.vercel.app`
- `https://tulus-id.vercel.app/login`
- `https://tulus-id.vercel.app/register`
- `https://tulus-id.vercel.app/help`
- `https://tulus-id.vercel.app/leaderboard`
- `https://tulus-id.vercel.app/bekiw`
- `https://tulus-id.vercel.app/account`
- `https://tulus-id.vercel.app/customize`
- `https://tulus-id.vercel.app/links`
- `https://tulus-id.vercel.app/tulus-control`

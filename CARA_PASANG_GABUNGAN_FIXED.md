# CARA PASANG TULUS FULL MERGED FIXED

Ini versi gabungan: project lama + update baru sudah dirapikan jadi satu project siap deploy.

## 1. PASANG FILE KE LAPTOP

1. Download ZIP `tulus-full-merged-fixed.zip`.
2. Extract ZIP.
3. Buka folder hasil extract.
4. Masuk folder `tulus-profile-platform`.
5. Tekan `Ctrl + A`.
6. Tekan `Ctrl + C`.
7. Buka folder project kamu: `D:\tulus`.
8. Tekan `Ctrl + V`.
9. Kalau muncul pilihan, klik `Replace the files in the destination`.

## 2. BUILD DI VS CODE

1. Buka VS Code.
2. Klik `File > Open Folder`.
3. Pilih `D:\tulus`.
4. Klik `Terminal > New Terminal`.
5. Jalankan:

```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
```

Kalau muncul `built`, lanjut. Kalau error merah, stop dan screenshot.

## 3. PUSH KE GITHUB

```powershell
git add .
git commit -m "TULUS full merged fixed"
git push
```

## 4. TUNGGU VERCEL

1. Buka `vercel.com`.
2. Buka project `tulus`.
3. Klik `Deployments`.
4. Tunggu deployment paling atas sampai `Ready`.

Link utama:

```txt
https://tulus-id.vercel.app
```

## 5. CEK ENV VERCEL

Buka `Vercel > tulus > Settings > Environment Variables`.

Pastikan ada:

```txt
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_TURNSTILE_SITE_KEY
VITE_OWNER_EMAIL
APP_URL
```

Isi penting:

```txt
VITE_OWNER_EMAIL = baehaqieqi07@gmail.com
APP_URL = https://tulus-id.vercel.app
```

Setelah edit ENV, lakukan `Redeploy` tanpa build cache.

## 6. JALANKAN SQL SUPABASE

Buka `supabase.com > project tulus > SQL Editor > New Query`.

Jalankan file SQL ini berurutan:

1. `supabase/sql/00_FULL_SAFE_MIGRATION.sql`
2. `supabase/sql/rls-policies.sql`
3. `supabase/sql/storage-policies.sql`
4. `supabase/sql/music-recommendations.sql`
5. `supabase/sql/01_OWNER_BEKIW_SETUP.sql`

Cara menjalankan:

1. Buka file SQL di VS Code.
2. Tekan `Ctrl + A`.
3. Tekan `Ctrl + C`.
4. Paste ke Supabase SQL Editor.
5. Klik `Run`.
6. Kalau ada warning, klik `Review > Run / Confirm`.

## 7. CEK STORAGE

Buka `Supabase > Storage`.

Pastikan bucket ini ada:

```txt
avatars = public
backgrounds = public
gallery = public
profile-music = public
payment-proofs = private
```

Kalau `profile-music` belum ada:

1. Klik `New bucket`.
2. Isi `profile-music`.
3. Aktifkan `Public bucket`.
4. Klik `Create bucket`.

## 8. TES WEB

Buka Incognito Chrome: `Ctrl + Shift + N`.

Cek link ini:

```txt
https://tulus-id.vercel.app
https://tulus-id.vercel.app/auth
https://tulus-id.vercel.app/bekiw
https://tulus-id.vercel.app/dashboard
https://tulus-id.vercel.app/tulus-control
```

Hasil yang benar:

```txt
/auth = login/register
/bekiw = profile public
/dashboard = dashboard edit
/tulus-control = owner panel kalau login sebagai owner
```

## 9. TES MUSIK MP3

1. Buka `Supabase > Storage > profile-music`.
2. Klik `Upload file`.
3. Pilih file `.mp3` yang aman/no-copyright/punya izin.
4. Klik file yang sudah upload.
5. Klik `Copy public URL`.
6. Buka `Supabase > SQL Editor > New Query`.
7. Jalankan ini dan ganti link MP3:

```sql
update public.profiles
set
  show_music = true,
  music_source_type = 'direct_audio',
  music_title = 'My Music',
  music_artist = 'Bekiw',
  music_url = 'PASTE_LINK_MP3_DI_SINI',
  music_loop = true,
  music_volume = 0.55,
  updated_at = now()
where username = 'bekiw'
returning username, music_source_type, music_url;
```

8. Buka `https://tulus-id.vercel.app/bekiw`.
9. Klik `Click To Enter`.
10. Musik harus bisa play. Kalau browser blokir, klik play manual.

## 10. TES LINK YOUTUBE / SPOTIFY / TIKTOK

Di dashboard bagian Music, paste link platform luar.

Hasil yang benar:

```txt
YouTube / Spotify / TikTok = tombol Open, tidak autoplay
MP3 / WAV / OGG / M4A = bisa play di web
```

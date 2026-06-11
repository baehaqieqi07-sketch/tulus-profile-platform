# CARA PASANG FULL UPDATE TULUS V2

Ikuti urutan ini saja.

## 1. Pasang file ke project
1. Download ZIP full update.
2. Extract ZIP.
3. Copy semua isi folder hasil extract.
4. Paste ke folder project kamu: `D:\tulus`.
5. Kalau Windows tanya replace, pilih **Replace the files in the destination**.

## 2. Build di VS Code
1. Buka VS Code.
2. Klik **File → Open Folder**.
3. Pilih `D:\tulus`.
4. Klik **Terminal → New Terminal**.
5. Jalankan:

```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
```

Kalau muncul `✓ built`, lanjut.

## 3. Push ke GitHub
```powershell
git add .
git commit -m "Full TULUS platform update"
git push
```

## 4. Vercel
1. Buka Vercel.
2. Klik project **tulus**.
3. Klik **Deployments**.
4. Tunggu deployment terbaru sampai **Ready**.

## 5. Supabase SQL
1. Buka Supabase project **tulus**.
2. Klik **SQL Editor → New Query**.
3. Buka file `supabase/sql/00_FULL_SAFE_MIGRATION.sql` di VS Code.
4. Copy semua isinya.
5. Paste ke Supabase SQL Editor.
6. Klik **Run**.
7. Kalau ada warning, klik **Review → Run / Confirm**.

## 6. Supabase Storage
Buat bucket ini:
- `avatars` public
- `backgrounds` public
- `gallery` public
- `profile-music` public
- `payment-proofs` private

Lalu jalankan file:
`supabase/sql/storage-policies.sql`

File ini aman dijalankan ulang karena sudah drop policy lama dulu sebelum membuat policy baru.

## 7. Vercel Environment Variables
Buka **Vercel → Project tulus → Settings → Environment Variables**.

Isi:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_TURNSTILE_SITE_KEY`
- `VITE_OWNER_EMAIL` = email owner kamu
- `APP_URL` = `https://tulus-id.vercel.app`

Setelah isi env, klik **Deployments → Redeploy**. Jangan centang build cache.

## 8. Test web
Buka:
- `https://tulus-id.vercel.app`
- `https://tulus-id.vercel.app/auth`
- `https://tulus-id.vercel.app/bekiw`
- `https://tulus-id.vercel.app/dashboard`
- `https://tulus-id.vercel.app/tulus-control`

## 9. Music test
1. Buka Supabase → Storage → bucket `profile-music`.
2. Upload file `.mp3`.
3. Klik file → **Copy public URL**.
4. Buka dashboard TULUS → Music.
5. Paste link MP3 itu.
6. Klik Save.
7. Buka `/bekiw` → Click To Enter.

Kalau pakai YouTube/Spotify/TikTok, itu akan tampil sebagai tombol external, bukan autoplay di web.


## 10. SQL owner + profile awal
Jika /tulus-control masih page not found atau /bekiw kosong, jalankan SQL ini di Supabase SQL Editor. Ganti email/user_id kalau akun owner kamu berbeda.

```sql
insert into public.user_roles (user_id, role)
select id, 'owner'::public.user_role
from auth.users
where email = 'baehaqieqi07@gmail.com'
and not exists (
  select 1 from public.user_roles r
  where r.user_id = auth.users.id and r.role = 'owner'::public.user_role
);

insert into public.profiles (user_id, username, display_name, bio, visibility, show_music, music_source_type)
select id, 'bekiw', 'bekiw', 'just a quiet page for the things i like.', 'public'::public.profile_visibility, true, 'none'
from auth.users
where email = 'baehaqieqi07@gmail.com'
on conflict (username) do update set
  display_name = excluded.display_name,
  bio = excluded.bio,
  visibility = 'public'::public.profile_visibility,
  show_music = true,
  updated_at = now();
```

# TULUS — A quiet profile space

TULUS adalah platform profile aesthetic untuk membuat halaman profile pribadi yang bisa dilihat publik, diedit sendiri oleh user, dan tampil soft, calm, premium, clean, serta tidak alay.

Project ini dibuat sebagai starter lengkap React + Vite + Supabase + Cloudflare Turnstile. Versi frontend sudah bisa jalan dengan mode local demo memakai `localStorage`, lalu bisa disambungkan ke Supabase untuk production.

## Isi project

- Landing page `/`
- Register `/register`
- Login `/login`
- Explore `/explore`
- Public profile `/:username`
- Dashboard user `/dashboard`
- Dashboard internal tersembunyi `/tulus-control`
- Profile card glassmorphism
- Click to enter screen
- Music player dengan fallback
- Theme manager soft premium
- Quick edit dan advanced edit
- Social links, badges, quotes, gallery
- Premium plans dan manual payment demo
- Supabase schema SQL
- Supabase RLS policies
- Supabase storage policies
- Supabase Edge Functions untuk aksi sensitif
- Cloudflare Turnstile helper
- Security headers untuk Vercel/Netlify/Cloudflare Pages

## Cara install di VS Code

1. Extract ZIP project ini.
2. Buka folder `tulus-profile-platform` di VS Code.
3. Buka terminal di VS Code.
4. Jalankan:

```bash
npm install
npm run dev
```

5. Buka link yang muncul, biasanya:

```bash
http://localhost:5173
```

## Mode demo lokal

Tanpa Supabase, website tetap bisa dibuka dan diedit. Data disimpan di `localStorage` browser.

Agar bisa masuk dashboard:

1. Buka `/register` atau `/login`.
2. Isi email dan password bebas untuk demo.
3. Klik `Turnstile demo check`.
4. Login/register akan masuk ke `/dashboard`.

Untuk mencoba owner dashboard demo:

1. Isi `.env` dengan:

```env
OWNER_EMAIL=owner@tulus.id
```

2. Login memakai email:

```txt
owner@tulus.id
```

3. Buka:

```txt
/tulus-control
```

Catatan: di production, role owner jangan bergantung dari frontend. Gunakan tabel `user_roles`, RLS, dan Edge Functions.

## Setup Supabase

1. Buat project baru di Supabase.
2. Masuk ke SQL Editor.
3. Jalankan file berikut secara berurutan:

```txt
supabase/sql/schema.sql
supabase/sql/rls-policies.sql
supabase/sql/storage-policies.sql
```

4. Masuk ke Authentication settings.
5. Aktifkan email verification.
6. Tambahkan redirect URL sesuai domain kamu, contoh:

```txt
http://localhost:5173
https://tulus.id
```

## Isi environment variable

Copy `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Isi bagian frontend:

```env
VITE_SUPABASE_URL=https://PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=anon_key_kamu
VITE_TURNSTILE_SITE_KEY=site_key_turnstile
```

Isi bagian backend untuk Supabase Edge Functions:

```env
SUPABASE_URL=https://PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=anon_key_kamu
SUPABASE_SERVICE_ROLE_KEY=service_role_key_kamu
TURNSTILE_SECRET_KEY=secret_key_turnstile
OWNER_EMAIL=email_owner_kamu
OWNER_USER_ID=user_id_owner_kamu
APP_URL=https://tulus.id
```

Penting:

- `VITE_SUPABASE_ANON_KEY` boleh di frontend.
- `VITE_TURNSTILE_SITE_KEY` boleh di frontend.
- `SUPABASE_SERVICE_ROLE_KEY` tidak boleh masuk frontend.
- `TURNSTILE_SECRET_KEY` tidak boleh masuk frontend.
- `CLOUDFLARE_API_TOKEN` tidak boleh masuk frontend.

## Setup owner role pertama

Setelah akun owner dibuat di Supabase Auth, ambil `user_id` owner lalu jalankan SQL:

```sql
insert into public.user_roles (user_id, role)
values ('USER_ID_OWNER_DI_SINI', 'owner')
on conflict do nothing;
```

Dashboard internal ada di:

```txt
/tulus-control
```

Route ini tidak muncul di navbar, landing page, dashboard user biasa, footer, atau sitemap publik.

Jika user biasa membuka `/tulus-control`, tampilan harus seperti 404 dengan teks:

```txt
page not found
```

## Setup Cloudflare Turnstile

1. Login ke Cloudflare.
2. Buka Turnstile.
3. Klik Add site.
4. Masukkan domain kamu, contoh `tulus.id`.
5. Pilih Managed mode.
6. Copy Site Key ke:

```env
VITE_TURNSTILE_SITE_KEY=
```

7. Copy Secret Key ke:

```env
TURNSTILE_SECRET_KEY=
```

Turnstile dipakai untuk:

- Register
- Login setelah beberapa kali gagal
- Forgot password
- Upload payment proof
- Report profile
- Owner dashboard login
- Owner action sensitif

## Setup Cloudflare DNS dan SSL

1. Tambahkan domain ke Cloudflare.
2. Arahkan nameserver domain ke Cloudflare.
3. Buka SSL/TLS.
4. Pilih mode `Full (strict)`.
5. Aktifkan `Always Use HTTPS`.
6. Aktifkan HSTS jika domain sudah stabil HTTPS.
7. Aktifkan WAF Managed Rules.
8. Buat rate limiting untuk route sensitif:
   - `/register`
   - `/login`
   - `/api/*`
   - `/functions/v1/*`
   - `/tulus-control`
9. Optional: lindungi `/tulus-control` dengan Cloudflare Zero Trust / Access.

## Deploy ke Vercel

1. Push project ke GitHub.
2. Buka Vercel.
3. Import repository.
4. Framework: Vite.
5. Build command:

```bash
npm run build
```

6. Output folder:

```txt
dist
```

7. Masukkan environment variable dari `.env`.
8. Deploy.

`vercel.json` sudah disiapkan untuk rewrite semua route ke `index.html`.

## Deploy ke Netlify

1. Push project ke GitHub.
2. Buka Netlify.
3. Import repository.
4. Build command:

```bash
npm run build
```

5. Publish directory:

```txt
dist
```

6. Masukkan environment variable.
7. Deploy.

`netlify.toml` sudah disiapkan.

## Deploy ke Cloudflare Pages

1. Push project ke GitHub.
2. Buka Cloudflare Pages.
3. Connect repository.
4. Framework preset: Vite.
5. Build command:

```bash
npm run build
```

6. Output directory:

```txt
dist
```

7. Tambahkan environment variable.
8. Deploy.

File `_headers` sudah disiapkan untuk security headers dasar.

## Manual payment flow

Versi awal memakai manual payment:

1. User buka dashboard.
2. Masuk menu `Premium`.
3. Pilih plan.
4. Masuk menu `Billing`.
5. Upload bukti pembayaran ke private bucket `payment-proofs`.
6. Simpan URL private/signed proof ke payment record.
7. Owner masuk `/tulus-control`.
8. Owner approve/reject payment.
9. Jika approve, subscription user berubah sesuai plan.

Edge Functions yang disiapkan:

- `approve-payment`
- `reject-payment`
- `update-user-plan`
- `suspend-profile`
- `unsuspend-profile`
- `owner-action-log`
- `validate-upload`
- `verify-turnstile`
- `create-checkout-session`

Deploy Edge Function contoh:

```bash
supabase functions deploy verify-turnstile
supabase functions deploy approve-payment
supabase functions deploy reject-payment
supabase functions deploy update-user-plan
supabase functions deploy suspend-profile
supabase functions deploy unsuspend-profile
supabase functions deploy owner-action-log
supabase functions deploy validate-upload
supabase functions deploy create-checkout-session
```

## Checklist sebelum public launch

- [ ] RLS aktif semua tabel
- [ ] Storage policy aman
- [ ] Turnstile aktif
- [ ] Cloudflare aktif
- [ ] SSL Full Strict aktif
- [ ] WAF aktif
- [ ] Rate limit aktif
- [ ] Tidak ada service role key di frontend
- [ ] Tidak ada secret key di frontend
- [ ] Owner role sudah dibuat
- [ ] `/tulus-control` tidak muncul di navbar
- [ ] User biasa diarahkan ke 404 jika akses `/tulus-control`
- [ ] Upload file sudah dibatasi
- [ ] Input sudah disanitasi
- [ ] Payment proof private
- [ ] Activity log aktif
- [ ] Explore tidak menampilkan private/unlisted profile
- [ ] Error message tidak membocorkan detail teknis
- [ ] Cloudflare Zero Trust untuk `/tulus-control` sudah dipertimbangkan

## Catatan penting

Project ini adalah starter production-ready structure, bukan jaminan keamanan penuh hanya dari frontend. Untuk production beneran, semua aksi sensitif harus lewat backend atau Supabase Edge Functions, bukan langsung dari frontend.

Yang sudah dibuat di starter ini:

- UI aesthetic soft premium
- Struktur halaman lengkap
- Struktur database lengkap
- RLS dasar
- Storage policy dasar
- Edge Functions dasar
- Turnstile helper
- Security headers dasar

Yang perlu kamu isi sendiri sebelum live:

- Supabase keys
- Turnstile keys
- Owner user ID
- Payment method asli jika tidak pakai manual
- Domain asli
- Cloudflare WAF/rate limit rules

---

# Update: Auth Gate + Click To Enter + Music Recommendation

Update ini menambahkan flow baru yang lebih rapi:

```txt
Auth Gate → Sign In / Sign Up → Onboarding → Click To Enter → Profile Experience / Dashboard
```

## Auth Flow

Saat membuka `/`, user yang belum login akan melihat **Auth Gate** terlebih dahulu, bukan langsung dashboard. Public visitor tetap bisa membuka profile public seperti `/bekiw` tanpa login.

Route baru:

- `/` — Auth Gate jika belum login, Enter Gate jika sudah login
- `/login` — Auth Gate tab Sign In
- `/register` — Auth Gate tab Sign Up
- `/onboarding` — onboarding singkat setelah sign up
- `/enter` — pilihan `click to enter` atau `edit profile`
- `/me` — personal profile experience setelah user klik enter
- `/:username` — public visitor profile flow

Alur Sign Up:

1. User isi email, password, dan username.
2. User menyelesaikan Cloudflare Turnstile.
3. Jika Supabase aktif, proses memakai Supabase Auth dan email verification bisa diaktifkan dari Supabase.
4. Setelah sukses, user masuk onboarding.
5. User boleh pilih nama, vibe, dan music optional.
6. User diarahkan ke click-to-enter.

Alur Sign In:

1. User isi email dan password.
2. Login normal tidak memakai Turnstile.
3. Jika gagal 3 kali, Turnstile muncul.
4. Setelah sukses, user diarahkan ke click-to-enter.

## Click To Enter + Autoplay Music

Browser modern tidak mengizinkan audio autoplay sebelum user melakukan interaksi. Karena itu TULUS memakai **click to enter** sebagai interaksi resmi.

Aturan music:

- Music tidak autoplay sebelum user klik enter.
- Setelah user klik enter, aplikasi memanggil `audio.play()`.
- Jika direct audio valid, music akan play.
- Jika autoplay gagal, aplikasi menampilkan fallback `tap to play music`.
- Jika music kosong, profile tetap tampil tanpa error.
- YouTube, Spotify, Apple Music, dan SoundCloud tidak dipaksa menjadi direct audio. Link tersebut ditampilkan sebagai tombol `open music`.

## Dashboard Music

Menu dashboard `Music` sekarang punya dua mode:

### Quick Music

- Recommended music
- Paste music link
- Upload audio
- Preview

### Advanced Music

- Direct audio URL
- External music URL
- Loop on/off
- Volume default
- Show/hide music player
- Equalizer on/off
- Fallback button text
- Music source type

Jenis input music:

1. Recommended Music
2. Paste Link
3. Upload Audio

Direct audio yang bisa diputar:

- `.mp3`
- `.ogg`
- `.wav`

External platform fallback:

- YouTube
- Spotify
- Apple Music
- SoundCloud
- Custom URL

## Recommended Music

File frontend:

```txt
src/data/musicRecommendations.js
src/components/music/MusicRecommendationList.jsx
src/components/music/MusicRecommendationCard.jsx
```

Owner dashboard `/tulus-control` sekarang punya bagian **Recommended Music** untuk:

- Tambah recommended music
- Edit konsep music dari database/Edge Function production
- Set Free/Premium
- Aktif/nonaktif
- Delete
- Preview URL

Catatan penting: jangan memasukkan lagu komersial/copyright tanpa izin. Gunakan audio buatan sendiri, bebas lisensi, atau placeholder yang nanti diganti owner.

## SQL tambahan music recommendation

Jalankan file ini setelah `schema.sql`, `rls-policies.sql`, dan `storage-policies.sql`:

```txt
supabase/sql/music-recommendations.sql
```

File ini menambahkan:

- Tabel `music_recommendations`
- Kolom music baru di `profiles`
- RLS untuk recommended music
- Seed placeholder music

Kolom baru `profiles`:

- `music_source_type`
- `music_recommendation_id`
- `music_direct_url`
- `music_external_url`
- `music_upload_url`
- `music_loop`
- `music_volume`
- `music_equalizer_enabled`
- `music_fallback_text`

## Edge Functions tambahan

Tambahan function owner-only:

```bash
supabase functions deploy create-music-recommendation
supabase functions deploy update-music-recommendation
supabase functions deploy delete-music-recommendation
```

Function ini wajib dijalankan server-side dan hanya boleh untuk role `owner`.

## Security tambahan music

- Hanya izinkan mp3, ogg, wav untuk upload audio.
- Validasi MIME type lewat backend/Edge Function.
- Rename file otomatis.
- Simpan file di folder user masing-masing.
- User hanya bisa update/delete music miliknya sendiri.
- Owner hanya bisa manage recommended music melalui role owner.
- Tolak `javascript:` URL.
- Tolak `data:` URL.
- Jika direct audio gagal karena CORS, tampilkan fallback.
- Jangan spam request audio.

## File baru update auth + music

```txt
src/routes/AuthGate.jsx
src/routes/Onboarding.jsx
src/routes/EnterGate.jsx
src/routes/ProfileExperience.jsx

src/components/auth/SignInCard.jsx
src/components/auth/SignUpCard.jsx
src/components/auth/AuthTabs.jsx
src/components/auth/AuthGateBackground.jsx

src/components/music/MusicDashboard.jsx
src/components/music/QuickMusic.jsx
src/components/music/AdvancedMusic.jsx
src/components/music/MusicRecommendationList.jsx
src/components/music/MusicRecommendationCard.jsx
src/components/music/MusicLinkInput.jsx
src/components/music/MusicUploadButton.jsx
src/components/music/MusicPreview.jsx
src/components/music/MusicFallbackButton.jsx
src/components/music/MusicEqualizer.jsx

src/components/onboarding/OnboardingSteps.jsx
src/components/onboarding/PickNameStep.jsx
src/components/onboarding/ChooseVibeStep.jsx
src/components/onboarding/AddMusicStep.jsx
src/components/onboarding/EnterSpaceStep.jsx

src/lib/music.js
src/lib/musicLinkDetector.js
src/lib/authFlow.js

supabase/sql/music-recommendations.sql

supabase/functions/create-music-recommendation/index.ts
supabase/functions/update-music-recommendation/index.ts
supabase/functions/delete-music-recommendation/index.ts
```

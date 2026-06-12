# TULUS

TULUS adalah platform profile/bio page premium dengan konsep **A quiet profile space** dan tema ORANG TULUS Blue Glass.

## Isi utama

- React + Vite frontend
- Supabase Auth, Database, Storage, dan Edge Functions scaffold
- Public profile route `/:username`
- Dashboard account, settings, badges, analytics
- Customize profile dengan upload avatar/background/gallery/music
- Links Studio dengan brand icons yang recognizable
- Help Center premium dengan AI bekiw chat style
- Language picker dengan localStorage dan fallback English
- Game Center: Focus Tap, Memory Light, Aura Match, Word Flow
- Leaderboard berbasis data profile/views, bukan angka random
- Hidden owner panel `/tulus-control`
- SEO dasar, robots.txt, sitemap.xml placeholder

## Build

```bash
npm install
npm run build
```

Di Windows gunakan:

```powershell
npm.cmd install
npm.cmd run build
```

Warning chunk besar dari Vite bukan error selama build selesai dengan `✓ built`.

## Env Vercel wajib

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_TURNSTILE_SITE_KEY=
VITE_OWNER_EMAIL=baehaqieqi07@gmail.com
APP_URL=https://tulus-id.vercel.app
```

Jangan taruh secret di frontend atau GitHub.

## Secret server-side

Secret seperti `OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `TURNSTILE_SECRET_KEY`, payment gateway secret, dan Cloudflare token harus disimpan server-side, bukan di file frontend.

## Supabase SQL urutan aman

Jalankan file ini satu per satu di Supabase SQL Editor:

1. `supabase/sql/00_FULL_SAFE_MIGRATION.sql`
2. `supabase/sql/rls-policies.sql`
3. `supabase/sql/storage-policies.sql`
4. `supabase/sql/music-recommendations.sql`
5. `supabase/sql/01_OWNER_BEKIW_SETUP.sql`

Jangan jalankan `schema.sql` pada database yang sudah dibuat jika type `profile_visibility` sudah ada.

## Storage buckets

- `avatars` public
- `backgrounds` public
- `gallery` public
- `profile-music` public
- `payment-proofs` private

## AI bekiw

UI dan fallback AI sudah siap. Real AI memakai Supabase Edge Function `bekiw-help-ai` dan butuh secret:

```env
OPENAI_API_KEY=
OPENAI_MODEL=
```

Kalau key belum ada, Help Center tetap jalan dengan fallback knowledge lokal.

## Payment/Premium

UI plan Free, Plus, Pro, Lifetime, billing page, manual proof, checkout placeholder, dan webhook scaffold tersedia. Payment otomatis belum boleh diklaim aktif sampai provider key dan webhook real diisi.

## Deploy

Push ke GitHub repo, lalu Vercel project `tulus` akan deploy. Setelah env diubah, lakukan redeploy tanpa existing build cache.

## TULUS Final Full System Polish

TULUS adalah platform bio/profile premium dengan tema ORANG TULUS Blue Glass: public profile `/:username`, dashboard, customize studio, links, music, Help Center AI bekiw, Game Center, pricing/premium, leaderboard, explore, dan owner control hidden.

### Cara jalan lokal

```powershell
npm.cmd install
npm.cmd run dev
```

### Build production

```powershell
npm.cmd run build
```

### Environment frontend yang boleh dipakai

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_TURNSTILE_SITE_KEY=
VITE_OWNER_EMAIL=baehaqieqi07@gmail.com
APP_URL=https://tulus-id.vercel.app
```

### Secret yang tidak boleh masuk frontend/GitHub

- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `TURNSTILE_SECRET_KEY`
- payment gateway secret
- Cloudflare API token

### SEO

File SEO tersedia:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/site.webmanifest`
- `public/tulus-og.svg`
- `src/utils/seo.js`

Submit sitemap ke Google Search Console setelah deploy:

```text
https://tulus-id.vercel.app/sitemap.xml
```

Google indexing tidak bisa dijamin langsung muncul nomor 1 hanya dengan kata `tulus`, tetapi project sudah dibuat SEO-ready.

### Full update notes

Baca:

- `CHANGELOG_UPDATE.md`
- `CARA_PASANG_UPDATE_FINAL.md`

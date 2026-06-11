# TULUS — A quiet profile space

TULUS adalah platform profile/bio page aesthetic dengan public profile `/:username`, click-to-enter, music, social/app links, dashboard edit profile, Help Center AI bekiw, Game Center, owner dashboard hidden, dan UI premium ORANG TULUS Blue Glass.

Style utama: soft blue glass, silver, lavender halus, glow biru lembut, clean, modern, responsive, tidak alay, dan tidak berantakan.

## Route utama

- `/`
- `/login`
- `/register`
- `/auth`
- `/onboarding`
- `/pricing`
- `/help`
- `/leaderboard`
- `/bekiw` atau `/:username`
- `/account`
- `/account/settings`
- `/account/badges`
- `/account/analytics`
- `/customize`
- `/links`
- `/games`
- `/tulus-control`
- 404 aesthetic page not found

## Update penting di ZIP ini

- Brand icon system lebih rapi dan tidak pakai emoji random sebagai icon utama.
- Support brand/app/payment icons: Discord, Instagram, Roblox, Spotify, Apple Music, YouTube, TikTok, X/Twitter, GitHub, Telegram, SoundCloud, Twitch, Steam, Pinterest, Website, Custom Link, Google, Email, WhatsApp, Facebook, Snapchat, Reddit, LinkedIn, PayPal, DANA, GoPay, OVO, ShopeePay, QRIS, Bank Transfer.
- File baru: `src/lib/brandIcons.js`, `src/components/AppIcon.jsx`, `src/components/SocialIconButton.jsx`.
- Language system ditambah Vietnamese dan alias `getText` / `setLanguage`.
- Help Center AI bekiw tetap punya fallback lokal dan siap diarahkan ke server-side function.
- Profile views sekarang memanggil Supabase RPC `increment_profile_view` jika profile punya ID.
- Leaderboard memakai data public profile dari Supabase dan tidak menampilkan angka random.
- Game Center punya best score dan daily streak di localStorage.

## Cara install lokal Windows

Buka PowerShell:

```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
npm.cmd run dev
```

Local URL biasanya:

```text
http://localhost:5173
```

## Environment Vercel wajib

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_TURNSTILE_SITE_KEY=
VITE_OWNER_EMAIL=baehaqieqi07@gmail.com
APP_URL=https://tulus-id.vercel.app
```

Opsional untuk AI bekiw real:

```env
VITE_BEKIW_AI_ENDPOINT=
```

## Secret jangan masuk frontend/GitHub

Jangan taruh value asli untuk secret ini di frontend atau file yang dipush:

```env
SUPABASE_SERVICE_ROLE_KEY=
TURNSTILE_SECRET_KEY=
OPENAI_API_KEY=
PAYMENT_SECRET_KEY=
PAYMENT_WEBHOOK_SECRET=
CLOUDFLARE_API_TOKEN=
```

## Supabase SQL yang aman

Kalau database sudah pernah dibuat, jangan jalankan `schema.sql`.

Jalankan urut di Supabase SQL Editor:

```text
supabase/sql/00_FULL_SAFE_MIGRATION.sql
supabase/sql/rls-policies.sql
supabase/sql/storage-policies.sql
supabase/sql/music-recommendations.sql
supabase/sql/01_OWNER_BEKIW_SETUP.sql
```

Kalau muncul error `profile_visibility already exists`, artinya yang dijalankan file schema mentah. Solusi: pakai `00_FULL_SAFE_MIGRATION.sql`.

## Bucket Supabase Storage

- `avatars` public
- `backgrounds` public
- `gallery` public
- `profile-music` public
- `payment-proofs` private

## Login provider

Google dan Discord button sudah disiapkan di UI. Untuk login real, aktifkan provider di:

**Supabase → Authentication → Providers**

Lalu isi Client ID dan Client Secret asli dari Google/Discord developer dashboard.

## AI bekiw real

UI Help Center sudah siap. Fallback lokal tetap jalan tanpa API key.

Untuk AI real, deploy Supabase Edge Function `bekiw-help-ai`, isi server env:

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.5
```

Jangan pernah taruh `OPENAI_API_KEY` di frontend.

## Payment / premium

UI Free, Plus, Pro, Lifetime dan scaffold pembayaran sudah disiapkan. Payment otomatis belum aktif sampai payment gateway key dan webhook asli dipasang.

Provider yang bisa disiapkan nanti: Midtrans, Xendit, Duitku, Stripe, atau manual payment proof.

## Build test status

Build terakhir sukses:

```text
npm install
npm run build
✓ built
```

Warning chunk lebih dari 500kB adalah warning performa, bukan error.

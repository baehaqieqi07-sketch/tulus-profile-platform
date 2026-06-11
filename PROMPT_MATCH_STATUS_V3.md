# TULUS Prompt Match V3

Versi ini dibuat untuk lebih dekat dengan prompt besar TULUS.

## Sudah dibuat di frontend
- React + Vite project siap jalan.
- Landing/auth gate, login, register, onboarding, click-to-enter.
- Public profile /:username dengan glassmorphism Orang Tulus Blue Glass.
- Dashboard user: quick edit, profile, background, avatar, music, links, badges, gallery, quotes, theme, animation, privacy, premium, billing, advanced.
- Music clean system: direct audio bisa play, YouTube/Spotify/TikTok/platform luar jadi tombol external.
- Upload helper dan tombol upload untuk avatar/background/gallery/music.
- Effects files: star dust, bokeh, floating orb, cursor, ripple, sparkle, motion helpers.
- Owner route /tulus-control tersembunyi.
- Bahasa helper Indonesia/English.

## Sudah dibuat di Supabase
- SQL safe migration untuk profiles, music_recommendations, app_links, social_links, badges, quotes, gallery, payments, reports, roles, activity logs.
- RLS policies.
- Storage policies.
- Owner setup untuk baehaqieqi07@gmail.com dan profile /bekiw.

## Sudah dibuat sebagai scaffold backend
- Payment webhook folder.
- Tracking click/view function folders.
- Music recommendation function folders.

## Yang tetap butuh data/key asli
- Payment gateway otomatis perlu Midtrans/Xendit/Duitku/Stripe key asli dan webhook asli.
- Cloudflare WAF/DNS/SSL harus diaktifkan dari dashboard Cloudflare.
- Lagu yang benar-benar bunyi perlu link MP3 direct atau upload file audio ke Supabase Storage.

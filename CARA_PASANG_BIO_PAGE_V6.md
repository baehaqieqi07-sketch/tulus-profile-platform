# CARA PASANG TULUS BIO PAGE V6

Pakai ZIP ini kalau kamu mau tampilan profile TULUS jadi bio-page modern yang lebih clean, gelap, glass, dan rapi.

## Cara pasang

1. Extract ZIP.
2. Buka folder `tulus-profile-platform`.
3. Tekan `Ctrl + A` lalu `Ctrl + C`.
4. Buka folder project kamu: `D:\tulus`.
5. Paste, pilih `Replace the files in the destination`.
6. Buka VS Code → `D:\tulus`.
7. Terminal:

```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
git add .
git commit -m "TULUS bio page style v6"
git push
```

8. Buka Vercel → project `tulus` → Deployments → tunggu `Ready`.
9. Buka `https://tulus-id.vercel.app/bekiw`.

## Supabase optional

Kalau profile `/bekiw` masih pakai data lama, jalankan ulang:

`supabase/sql/01_OWNER_BEKIW_SETUP.sql`

Lalu refresh `/bekiw` pakai `Ctrl + F5`.

## Catatan

- Alur dibuat sama seperti bio-page modern: click to enter → reveal profile → card center → social icons → music card.
- Tetap original TULUS, tidak copy asset/nama/layout mentah dari website lain.
- YouTube/Spotify/TikTok tetap menjadi tombol external, bukan autoplay.
- MP3 direct tetap bisa play di web setelah click-to-enter.

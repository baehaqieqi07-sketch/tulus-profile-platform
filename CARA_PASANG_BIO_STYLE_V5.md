# CARA PASANG TULUS BIO STYLE V5

Pakai ZIP ini kalau kamu mau tampilan public profile TULUS jadi lebih mirip vibe bio-page modern: fullscreen background, center glass card, avatar besar, social icon square, music card, click-to-enter, dark blue glass premium.

## Cara pasang
1. Extract ZIP.
2. Copy semua isi folder `tulus-profile-platform`.
3. Paste ke `D:\tulus`.
4. Pilih Replace.
5. Buka VS Code → Open Folder `D:\tulus`.
6. Terminal:

```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
git add .
git commit -m "TULUS bio style v5"
git push
```

7. Buka Vercel → project `tulus` → Deployments → tunggu Ready.
8. Supabase → SQL Editor → jalankan ulang `supabase/sql/01_OWNER_BEKIW_SETUP.sql` supaya default /bekiw pakai theme `TULUS Bio Night` dan social icons.
9. Buka `https://tulus-id.vercel.app/bekiw` pakai Incognito.

## Catatan
Desain ini dibuat original TULUS Bio Night. Vibe-nya mengikuti bio-page modern yang kamu minta, tapi tidak menyalin asset, nama, atau layout persis dari website lain.

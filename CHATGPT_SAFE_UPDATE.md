# ChatGPT Safe Update

Jika update terlalu besar, pecah request menjadi beberapa bagian:

1. Part 1 UI.
2. Part 2 Backend / server skeleton.
3. Part 3 Supabase SQL, RLS, storage.
4. Part 4 Docs.
5. Part 5 Final ZIP + build check.

Wajib tulis di prompt:

- Lanjutkan project TULUS yang sudah ada.
- Jangan mulai ulang.
- Jangan ganti arah.
- Jangan hapus fitur lama.
- Jangan tampilkan versi internal di UI.
- Jalankan `npm run check` dan `npm run build`.

Gunakan dashboard Safe Update Guard untuk export feature map dan checklist.

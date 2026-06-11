# Safe Update Protocol

## Sebelum update

- Backup project.
- Export Current Feature Map.
- Export Project Checklist.
- Baca `PROJECT_MAP.md` dan `UPDATE_LOCKS.md`.

## Saat update

- Jangan regenerate dari nol.
- Jangan hapus route utama.
- Jangan hardcode secret.
- Jangan ubah nama publik TULUS.
- Jangan tampilkan versi internal di UI.
- Simpan fitur lama, lalu tambah fitur baru.

## Setelah update

- Jalankan `npm run check`.
- Jalankan `npm run build`.
- Pastikan ZIP tidak membawa `node_modules`.
- Pastikan public route dan `/tulus-control` tetap jalan.

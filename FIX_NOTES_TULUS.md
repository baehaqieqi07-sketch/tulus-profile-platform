# TULUS Fix Notes

Perbaikan utama:

- Memperbaiki penyebab halaman blank pada React/Vite.
- Error sebelumnya: `useEffect must not return anything besides a function` dan `destroy is not a function`.
- Penyebab: beberapa `useEffect` di `src/App.jsx` memakai bentuk singkat seperti `useEffect(() => saveProfile(profile), [profile])`, sehingga React menganggap hasil return dari fungsi save sebagai cleanup effect.
- Solusi: semua effect penyimpanan lokal diubah menjadi block body agar tidak mengembalikan object/value ke React.
- `src/components/AIChat.jsx` juga dibuat lebih aman dengan block body pada scroll effect.

Sudah dites:

```bash
npm install
npm run check
npm run build
```

Hasil build berhasil.

Cara jalan lokal:

```bash
npm install
npm run dev
```

Kalau PowerShell memblokir `npm`, gunakan:

```powershell
npm.cmd install
npm.cmd run dev
```

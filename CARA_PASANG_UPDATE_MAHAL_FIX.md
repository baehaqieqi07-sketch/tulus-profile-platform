# Cara Pasang TULUS Mahal Fix

1. Extract ZIP ini.
2. Masuk ke folder project yang langsung berisi `package.json`.
3. Copy semua isi folder itu ke `D:\tulus`.
4. Jangan hapus `.git` lokal kalau folder `D:\tulus` sudah connect GitHub.
5. Buka VS Code → Open Folder → `D:\tulus`.
6. Buka Terminal baru.
7. Jalankan:

```powershell
cd D:\tulus
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
npm.cmd install
npm.cmd run build
```

Kalau build sukses:

```powershell
git add .
git commit -m "Upgrade TULUS luxury UI and games"
git push
```

Setelah itu buka Vercel → project `tulus` → Deployments → tunggu `Ready`.

Cek halaman:

- https://tulus-id.vercel.app
- https://tulus-id.vercel.app/bekiw
- https://tulus-id.vercel.app/account
- https://tulus-id.vercel.app/customize
- https://tulus-id.vercel.app/links
- https://tulus-id.vercel.app/help
- https://tulus-id.vercel.app/games
- https://tulus-id.vercel.app/pricing

Kalau masih ada bug, kirim screenshot halaman spesifik + link halaman + Console error kalau ada.

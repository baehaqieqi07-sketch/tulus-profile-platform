# Cara Pasang TULUS Major Platform Update

1. Extract ZIP.
2. Copy isi folder project ke `D:\tulus`.
3. Pilih Replace files in destination.
4. Jangan hapus `.git` lokal kamu.
5. Buka VS Code terminal:

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
git commit -m "TULUS major platform UI update"
git push
```

Lalu buka Vercel > project `tulus` > Deployments > tunggu Ready.

Cek:
- https://tulus-id.vercel.app
- https://tulus-id.vercel.app/bekiw
- https://tulus-id.vercel.app/account
- https://tulus-id.vercel.app/customize
- https://tulus-id.vercel.app/links
- https://tulus-id.vercel.app/help
- https://tulus-id.vercel.app/games
- https://tulus-id.vercel.app/pricing

Setelah deploy tekan Ctrl+0 lalu Ctrl+F5.

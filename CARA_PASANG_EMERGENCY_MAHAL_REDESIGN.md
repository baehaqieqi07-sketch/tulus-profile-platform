# Cara Pasang TULUS Emergency Mahal Redesign

1. Extract ZIP.
2. Copy isi folder project ke `D:\tulus`.
3. Jangan hapus `.git` lokal kamu.
4. Jalankan:

```powershell
cd D:\tulus
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
npm.cmd install
npm.cmd run build
git add .
git commit -m "Emergency TULUS luxury redesign"
git push
```

5. Buka Vercel → project tulus → Deployments → tunggu Ready.
6. Buka `https://tulus-id.vercel.app` lalu tekan Ctrl+0 dan Ctrl+F5.

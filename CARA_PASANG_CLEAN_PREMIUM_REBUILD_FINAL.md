# Cara Pasang TULUS Clean Premium Rebuild Final

1. Extract ZIP ini.
2. Masuk ke folder project hasil extract yang langsung punya `package.json`.
3. Copy semua isi folder itu.
4. Paste ke `D:\tulus`.
5. Pilih **Replace the files in the destination**.
6. Jangan hapus `.git` lokal di `D:\tulus` kalau kamu masih mau push ke GitHub repo lama.
7. Buka VS Code → File → Open Folder → pilih `D:\tulus`.
8. Buka Terminal baru.
9. Jalankan:

```powershell
cd D:\tulus
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
npm.cmd install
npm.cmd run build
```

10. Kalau build sukses:

```powershell
git status
git add .
git commit -m "TULUS clean premium rebuild final"
git push
```

11. Buka Vercel → project `tulus` → Deployments.
12. Tunggu deployment terbaru sampai **Ready**.
13. Buka domain utama:

```text
https://tulus-id.vercel.app
```

14. Tekan:

```text
Ctrl + 0
Ctrl + F5
```

15. Cek:

```text
https://tulus-id.vercel.app
https://tulus-id.vercel.app/bekiw
https://tulus-id.vercel.app/account
https://tulus-id.vercel.app/customize
https://tulus-id.vercel.app/links
https://tulus-id.vercel.app/help
https://tulus-id.vercel.app/games
https://tulus-id.vercel.app/pricing
```

Kalau masih sama, cek Vercel deployment commit terbaru dulu, bukan update ulang fitur.

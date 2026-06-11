# CARA PASANG TULUS PREMIUM FLOW UPDATE

Pakai ZIP ini sebagai update utama. Jangan tampilkan nama versi di UI publik.

## 1. Pasang ke project
1. Extract ZIP.
2. Masuk folder `tulus-profile-platform`.
3. Tekan `Ctrl + A`, lalu `Ctrl + C`.
4. Buka `D:\tulus`.
5. Tekan `Ctrl + V`.
6. Pilih `Replace the files in the destination`.

## 2. Build dan push
Buka VS Code → folder `D:\tulus` → Terminal → New Terminal.

```powershell
cd D:\tulus
npm.cmd install
npm.cmd run build
git add .
git commit -m "TULUS premium platform update"
git push
```

## 3. Vercel
1. Buka Vercel.
2. Masuk project `tulus`.
3. Klik `Deployments`.
4. Tunggu status paling atas `Ready`.

## 4. Supabase AI bekiw optional
Kalau mau Help Center memakai OpenAI server-side:
1. Deploy function `supabase/functions/bekiw-help-ai`.
2. Isi environment server-side:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL=gpt-5.5`
3. Di Vercel isi frontend env:
   - `VITE_BEKIW_AI_ENDPOINT=https://PROJECT.supabase.co/functions/v1/bekiw-help-ai`
4. Redeploy Vercel.

Tanpa key OpenAI, bekiw tetap bisa menjawab basic memakai knowledge lokal.

## 5. Tes link
- `/`
- `/login`
- `/register`
- `/onboarding`
- `/help`
- `/pricing`
- `/leaderboard`
- `/bekiw`
- `/account`
- `/account/settings`
- `/account/badges`
- `/account/analytics`
- `/customize`
- `/links`
- `/premium`
- `/tulus-control`

## Catatan
- Desain dibuat original TULUS, bukan salinan mentah website lain.
- Tidak memakai asset brand/ikon milik platform lain.
- Payment auto-detect tetap butuh key gateway asli.

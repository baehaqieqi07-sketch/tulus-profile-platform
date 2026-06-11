# Security Checklist

- Frontend hanya boleh memakai Supabase anon key.
- Service role key hanya di server atau Supabase function.
- Validasi URL harus http/https.
- Validasi tipe dan ukuran file sebelum upload.
- Jangan render HTML mentah dari user.
- Aktifkan Supabase RLS untuk semua tabel user-facing.
- Payment manual harus approval owner.
- Turnstile dipakai untuk form sensitif di production.
- AI Bekiw hanya panduan, bukan akses admin.
- `/tulus-control` wajib auth guard production.

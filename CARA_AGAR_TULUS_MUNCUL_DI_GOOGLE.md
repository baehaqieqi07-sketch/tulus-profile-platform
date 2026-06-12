# Cara Agar TULUS Bisa Muncul di Google

TULUS sudah dibuat SEO-ready, tetapi Google tetap butuh waktu untuk crawling, indexing, dan ranking. Tidak ada cara aman untuk menjamin langsung muncul nomor 1 hanya dengan kata “tulus”, apalagi kata itu umum dan kompetitif.

## 1. Pastikan domain utama aktif

Buka:

```text
https://tulus-id.vercel.app
```

Pastikan halaman tidak blank dan tidak 404.

## 2. Cek robots dan sitemap

Buka:

```text
https://tulus-id.vercel.app/robots.txt
https://tulus-id.vercel.app/sitemap.xml
```

Yang benar:

- `robots.txt` berisi `Allow: /`
- Ada `Sitemap: https://tulus-id.vercel.app/sitemap.xml`
- `sitemap.xml` berisi halaman utama, help, pricing, leaderboard, games, dan `/bekiw`

## 3. Masuk Google Search Console

Buka:

```text
https://search.google.com/search-console
```

Login pakai akun Google.

## 4. Tambahkan property

Klik:

```text
Add property
```

Pilih yang paling gampang:

```text
URL prefix
```

Isi:

```text
https://tulus-id.vercel.app
```

Klik Continue.

## 5. Verifikasi ownership

Pilih metode yang paling mudah untuk Vercel:

- HTML tag, atau
- HTML file upload jika tersedia, atau
- DNS kalau pakai custom domain sendiri nanti.

Kalau pakai HTML tag, Google akan kasih kode meta seperti:

```html
<meta name="google-site-verification" content="kode-google" />
```

Paste kode itu ke `index.html` di dalam bagian `<head>`, lalu build dan deploy ulang.

## 6. Submit sitemap

Di Google Search Console:

1. Klik menu `Sitemaps`.
2. Isi:

```text
sitemap.xml
```

3. Klik Submit.

## 7. Request indexing halaman penting

Di Google Search Console, pakai URL Inspection:

```text
https://tulus-id.vercel.app
https://tulus-id.vercel.app/bekiw
https://tulus-id.vercel.app/help
https://tulus-id.vercel.app/games
```

Klik:

```text
Request indexing
```

## 8. Cara cek sudah masuk Google

Cari di Google:

```text
site:tulus-id.vercel.app
```

Kalau sudah muncul, berarti index mulai masuk.

Untuk kata kunci utama, coba:

```text
TULUS bio page
TULUS profile space
TULUS bekiw
TULUS ORANG TULUS Blue Glass
```

Untuk cuma kata `tulus`, butuh waktu dan reputasi karena keyword itu umum.

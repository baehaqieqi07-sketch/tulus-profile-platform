export const helpCategories = [
  'Mulai Cepat', 'Profile & Username', 'Upload Avatar/Background', 'Upload Music', 'Apps & Links',
  'Templates & Layout', 'Theme Studio', 'Logo & Brand', 'Premium & Payment', 'Analytics',
  'Mini Games & Cosmetic', 'Security & Privacy', 'Error & Troubleshooting', 'Safe Update / Anti Timeout'
];

export const helpArticles = [
  {
    id: 'first-profile', category: 'Mulai Cepat', icon: '✦',
    title: { id: 'Cara membuat profile pertama', en: 'Create your first profile' },
    summary: { id: 'Pilih username, template, upload asset, preview, lalu publish.', en: 'Choose username, template, upload assets, preview, then publish.' },
    steps: {
      id: ['Buka Dashboard > Profile Builder.', 'Isi username, display name, dan bio.', 'Pilih template yang paling cocok.', 'Preview dulu di mobile dan desktop.', 'Klik Publish saat sudah rapi.'],
      en: ['Open Dashboard > Profile Builder.', 'Set username, display name, and bio.', 'Choose a template that fits.', 'Preview on mobile and desktop.', 'Publish when it feels ready.']
    }
  },
  {
    id: 'upload-background', category: 'Upload Avatar/Background', icon: '▣',
    title: { id: 'Cara upload background dari galeri', en: 'Upload a background from your gallery' },
    summary: { id: 'Gunakan tombol file picker, bukan tempel link manual.', en: 'Use the file picker button, not only a manual link.' },
    steps: {
      id: ['Buka Dashboard > Assets.', 'Klik Upload Background.', 'Pilih gambar dari galeri perangkat.', 'Cek preview file dan ukuran.', 'Simpan, lalu lihat live preview.'],
      en: ['Open Dashboard > Assets.', 'Click Upload Background.', 'Choose an image from your device gallery.', 'Check preview and file size.', 'Save, then check live preview.']
    }
  },
  {
    id: 'music-autoplay', category: 'Upload Music', icon: '♪',
    title: { id: 'Kenapa musik tidak autoplay?', en: 'Why does music not autoplay?' },
    summary: { id: 'Browser butuh interaksi user, jadi TULUS memakai click-to-enter.', en: 'Browsers require user interaction, so TULUS uses click-to-enter.' },
    steps: {
      id: ['Upload musik di Assets.', 'Aktifkan music profile.', 'Biarkan click-to-enter aktif.', 'User klik masuk dulu, lalu musik boleh diputar.', 'Matikan autoplay jika ingin lebih ringan.'],
      en: ['Upload music in Assets.', 'Enable profile music.', 'Keep click-to-enter enabled.', 'Visitors click enter first, then music can play.', 'Disable autoplay for a lighter profile.']
    }
  },
  {
    id: 'apps-links', category: 'Apps & Links', icon: '⌁',
    title: { id: 'Cara menambah Roblox dan Apple Music', en: 'Add Roblox and Apple Music' },
    summary: { id: 'Tambahkan app, isi link, validasi, highlight kalau penting.', en: 'Add an app, fill the link, validate it, highlight important apps.' },
    steps: {
      id: ['Buka Apps & Links.', 'Klik Add App.', 'Pilih Roblox atau Apple Music.', 'Isi username dan URL.', 'Aktifkan highlight untuk link utama.'],
      en: ['Open Apps & Links.', 'Click Add App.', 'Choose Roblox or Apple Music.', 'Fill username and URL.', 'Enable highlight for important links.']
    }
  },
  {
    id: 'premium-payment', category: 'Premium & Payment', icon: '◆',
    title: { id: 'Cara upload bukti pembayaran', en: 'Upload payment proof' },
    summary: { id: 'Pembayaran manual diverifikasi owner, bukan auto-claim.', en: 'Manual payments are verified by the owner, not auto-claimed.' },
    steps: {
      id: ['Buka Premium Center.', 'Pilih plan.', 'Ikuti instruksi Dana/OVO/GoPay/Bank/QRIS.', 'Upload bukti pembayaran.', 'Tunggu owner approve di /tulus-control.'],
      en: ['Open Premium Center.', 'Choose a plan.', 'Follow Dana/OVO/GoPay/Bank/QRIS instructions.', 'Upload payment proof.', 'Wait for owner approval in /tulus-control.']
    }
  },
  {
    id: 'safe-update', category: 'Safe Update / Anti Timeout', icon: '☑',
    title: { id: 'Cara menghindari request timeout saat update besar', en: 'Avoid request timeout during large updates' },
    summary: { id: 'Pecah update besar jadi beberapa bagian dan selalu bawa feature map.', en: 'Split large updates into parts and always include the feature map.' },
    steps: {
      id: ['Export Current Feature Map.', 'Backup project sebelum update.', 'Pecah update: UI, backend, Supabase, docs, final ZIP.', 'Tulis: jangan regenerate dari nol.', 'Jalankan npm run check dan npm run build.'],
      en: ['Export Current Feature Map.', 'Backup before updating.', 'Split updates: UI, backend, Supabase, docs, final ZIP.', 'Write: do not regenerate from zero.', 'Run npm run check and npm run build.']
    }
  },
  {
    id: 'analytics', category: 'Analytics', icon: '⌬',
    title: { id: 'Cara membaca analytics', en: 'Read analytics' },
    summary: { id: 'Lihat views, clicks, top app, dan export CSV.', en: 'Check views, clicks, top app, and export CSV.' },
    steps: {
      id: ['Buka Analytics.', 'Lihat profile views dan link clicks.', 'Cek app paling sering diklik.', 'Export CSV untuk backup.', 'Jaga privasi visitor.'],
      en: ['Open Analytics.', 'Check profile views and link clicks.', 'Review the most clicked app.', 'Export CSV for backup.', 'Respect visitor privacy.']
    }
  },
  {
    id: 'theme-studio', category: 'Theme Studio', icon: '◐',
    title: { id: 'Cara memakai Theme Studio', en: 'Use Theme Studio' },
    summary: { id: 'Atur warna, blur, glow, motion, lalu simpan custom theme.', en: 'Set colors, blur, glow, motion, then save a custom theme.' },
    steps: {
      id: ['Buka Theme Studio.', 'Pilih accent color.', 'Atur glass, blur, dan shadow.', 'Kurangi motion kalau terasa berat.', 'Save atau export theme JSON.'],
      en: ['Open Theme Studio.', 'Choose accent color.', 'Adjust glass, blur, and shadow.', 'Reduce motion if it feels heavy.', 'Save or export theme JSON.']
    }
  }
];

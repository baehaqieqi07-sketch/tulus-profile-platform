export const plans = [
  { id: 'free', name: 'Free', price: 'Rp0', badge: 'Start', caption: { id: 'Profil basic yang tetap rapi.', en: 'A basic profile that still feels polished.' }, benefits: ['1 public profile', '5 apps / links', 'basic templates', 'click-to-enter music'] },
  { id: 'plus', name: 'Plus', price: 'Rp19.000', badge: 'Popular', caption: { id: 'Lebih bebas untuk link dan tampilan.', en: 'More room for links and visual styling.' }, benefits: ['unlimited links', 'premium templates', 'custom accent', 'basic analytics', 'more gallery items'] },
  { id: 'pro', name: 'Pro', price: 'Rp39.000', badge: 'Creator', caption: { id: 'Untuk profil yang lebih lengkap.', en: 'For a more complete creator profile.' }, benefits: ['advanced analytics', 'premium badge visual', 'custom cursor', 'theme export/import', 'priority templates'] },
  { id: 'creator', name: 'Creator', price: 'Rp69.000', badge: 'Studio', caption: { id: 'Untuk kreator dan komunitas kecil.', en: 'For creators and small communities.' }, benefits: ['featured projects', 'profile frame cosmetics', 'AI design checklist', 'asset manager pro', 'SEO preview'] },
  { id: 'lifetime', name: 'Lifetime', price: 'Manual', badge: 'Owner Verified', caption: { id: 'Sekali bayar, diverifikasi owner.', en: 'One-time manual plan, owner verified.' }, benefits: ['all Creator features', 'lifetime visual badge', 'future templates', 'manual owner support'] }
];

export const paymentMethods = [
  { id: 'dana', name: 'Dana', note: 'Masukkan nomor owner di production.' },
  { id: 'ovo', name: 'OVO', note: 'Masukkan nomor owner di production.' },
  { id: 'gopay', name: 'GoPay', note: 'Masukkan nomor owner di production.' },
  { id: 'bank', name: 'Bank Transfer', note: 'Tambahkan rekening owner.' },
  { id: 'qris', name: 'QRIS Manual', note: 'Upload QRIS owner sebagai asset private.' }
];

export const TULUS_KNOWLEDGE = [
  {
    title: 'What is TULUS?',
    body: 'TULUS is a calm profile platform for fullscreen public profiles, links, music, effects, custom cursor, analytics, premium layouts, and an owner dashboard.'
  },
  {
    title: 'Public profile flow',
    body: 'Visitors open /username, see click to enter, then the fullscreen profile reveals. Direct audio can play after the click. External platforms like YouTube, Spotify, TikTok, Apple Music, and SoundCloud appear as open buttons.'
  },
  {
    title: 'Dashboard flow',
    body: 'Users sign in, open /account for overview, /customize for appearance/background/music/effects, /links for social links, /account/settings for account and language, /account/badges for badges, and /account/analytics for profile data.'
  },
  {
    title: 'Owner dashboard',
    body: '/tulus-control is hidden. It requires login and owner role. It includes users, profiles, reports, payments, recommended music, platform settings, announcements, logs, and AI help controls.'
  },
  {
    title: 'Music rules',
    body: 'MP3, WAV, OGG, M4A, AAC, and FLAC direct links can play in the TULUS player. YouTube, Spotify, TikTok, Apple Music, SoundCloud, Deezer, Joox, Instagram, and other platforms open externally instead of forced autoplay.'
  },
  {
    title: 'Upload rules',
    body: 'Avatar, background, gallery, music, cover, and payment proof use upload buttons. Public profile media goes to public buckets. Payment proofs stay private. Never place service role keys in frontend.'
  },
  {
    title: 'Design language',
    body: 'TULUS uses soft blue glass, dark-but-not-too-dark panels, subtle purple/blue glow, clean cards, rounded buttons, quiet animations, bokeh, star dust, and a custom desktop cursor.'
  },
  {
    title: 'Security checklist',
    body: 'Use Supabase Auth, RLS, storage policies, Turnstile, rate limits, safe URL validation, private payment-proof storage, owner role checks, and no secret keys in GitHub.'
  }
]

export function answerFromKnowledge(message = '', locale = 'auto') {
  const q = message.toLowerCase()
  const langId = /\b(apa|gimana|cara|kenapa|dimana|tolong|bantu|lagu|musik|akun|masuk|daftar|bayar|pemilik|owner|unggah|upload)\b/.test(q)
  const hit = TULUS_KNOWLEDGE.find((item) => {
    const hay = `${item.title} ${item.body}`.toLowerCase()
    return q.split(/\s+/).filter(Boolean).some((word) => word.length > 3 && hay.includes(word))
  }) || TULUS_KNOWLEDGE[0]

  if (langId || locale === 'id') {
    return `Bisa. Di TULUS, ${hit.body}\n\nYang perlu kamu lakukan: buka dashboard yang sesuai, ubah datanya, lalu klik Save. Kalau bagian itu butuh file, gunakan tombol upload, jangan pakai secret key di frontend.`
  }

  return `Yes. In TULUS, ${hit.body}\n\nNext step: open the matching dashboard section, update the field, then press Save. For files, use upload buttons and never expose secret keys in frontend.`
}

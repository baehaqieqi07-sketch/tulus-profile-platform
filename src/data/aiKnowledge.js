export const aiModes = [
  { id: 'design', label: { id: 'Bantu Desain', en: 'Design Help' } },
  { id: 'upload', label: { id: 'Bantu Upload', en: 'Upload Help' } },
  { id: 'premium', label: { id: 'Bantu Premium', en: 'Premium Help' } },
  { id: 'error', label: { id: 'Bantu Error', en: 'Error Help' } },
  { id: 'publish', label: { id: 'Bantu Publish', en: 'Publish Help' } },
  { id: 'template', label: { id: 'Pilih Template', en: 'Choose Template' } },
  { id: 'logo', label: { id: 'Bantu Logo', en: 'Logo Help' } },
  { id: 'apps', label: { id: 'Bantu Apps', en: 'Apps Help' } },
  { id: 'analytics', label: { id: 'Bantu Analytics', en: 'Analytics Help' } },
  { id: 'safe', label: { id: 'Safe Update', en: 'Safe Update' } }
];

export const aiGreeting = {
  id: 'Halo, aku Bekiw. Aku bisa bantu kamu bikin profil TULUS lebih rapi, upload background, atur link, pilih template, sampai jelasin premium. Mau mulai dari mana?',
  en: 'Hi, I’m Bekiw. I can help you polish your TULUS profile, upload backgrounds, set links, choose templates, and explain premium. Where do you want to start?'
};

export const aiQuickReplies = {
  id: ['Cara upload background', 'Pilih template premium', 'Cara tambah link', 'Cara publish profile', 'Cara bayar premium'],
  en: ['Upload a background', 'Choose a premium template', 'Add a link', 'Publish my profile', 'Premium payment steps']
};

export const tulusKnowledge = [
  'Profile Builder: username, display name, bio, badge, apps, gallery, featured project, visibility, draft mode, safe preview, profile health score.',
  'Templates and Layout: fifteen templates and twelve layouts with different visual structures.',
  'Theme Studio: palette, accent, glass, blur, shadow, radius, motion, reduced motion, export/import theme JSON.',
  'Assets Manager: avatar, background, gallery, music, custom icon, custom cursor, preview, validation, storage usage, favorite assets.',
  'Apps & Links: Roblox, Apple Music, Spotify, Discord, YouTube, TikTok, Instagram, WhatsApp, Telegram, GitHub, Website, Custom App.',
  'Premium Center: manual payment through Dana, OVO, GoPay, Bank Transfer, QRIS placeholder, proof upload, owner approval.',
  'Analytics: profile views, link clicks, app clicks, top app, daily chart, export CSV, privacy note.',
  'Mini Games: Memory Card, Click Combo, Daily Spin, Badge Collector, Profile XP, cosmetic-only rewards.',
  'Help Center: searchable articles, FAQ accordion, article steps, Ask Bekiw shortcut.',
  'Owner Control: hidden /tulus-control route for premium requests, users, feature flags, site settings, storage, maintenance, templates, payment methods.',
  'Safe Update Guard: export feature map, project checklist, compact prompt, backup reminder, do not regenerate from zero.',
  'Public Profile: /:username route with click-to-enter so profile music can start after user interaction.'
];

export const BRAND_ALIASES = {
  discord: ['discord', 'dc'],
  instagram: ['instagram', 'ig'],
  roblox: ['roblox'],
  spotify: ['spotify'],
  appleMusic: ['apple music', 'applemusic', 'apple', 'itunes'],
  youtube: ['youtube', 'yt'],
  tiktok: ['tiktok', 'tik tok'],
  x: ['x', 'twitter', 'x/twitter'],
  github: ['github', 'git hub'],
  telegram: ['telegram'],
  soundcloud: ['soundcloud', 'sound cloud'],
  twitch: ['twitch'],
  steam: ['steam'],
  pinterest: ['pinterest'],
  google: ['google'],
  email: ['email', 'mail', 'gmail'],
  whatsapp: ['whatsapp', 'wa'],
  facebook: ['facebook', 'fb'],
  snapchat: ['snapchat'],
  reddit: ['reddit'],
  linkedin: ['linkedin', 'linked in'],
  paypal: ['paypal'],
  dana: ['dana'],
  gopay: ['gopay', 'go pay'],
  ovo: ['ovo'],
  shopeepay: ['shopeepay', 'shopee pay'],
  qris: ['qris'],
  bank: ['bank', 'bank transfer', 'transfer bank'],
  website: ['website', 'web', 'site', 'link'],
  custom: ['custom', 'custom link']
}

export const BRAND_ICON_NAMES = Object.keys(BRAND_ALIASES)

export const BRAND_META = {
  discord: { label: 'Discord', className: 'discord' },
  instagram: { label: 'Instagram', className: 'instagram' },
  roblox: { label: 'Roblox', className: 'roblox' },
  spotify: { label: 'Spotify', className: 'spotify' },
  appleMusic: { label: 'Apple Music', className: 'apple-music' },
  youtube: { label: 'YouTube', className: 'youtube' },
  tiktok: { label: 'TikTok', className: 'tiktok' },
  x: { label: 'X / Twitter', className: 'x' },
  github: { label: 'GitHub', className: 'github' },
  telegram: { label: 'Telegram', className: 'telegram' },
  soundcloud: { label: 'SoundCloud', className: 'soundcloud' },
  twitch: { label: 'Twitch', className: 'twitch' },
  steam: { label: 'Steam', className: 'steam' },
  pinterest: { label: 'Pinterest', className: 'pinterest' },
  google: { label: 'Google', className: 'google' },
  email: { label: 'Email', className: 'email' },
  whatsapp: { label: 'WhatsApp', className: 'whatsapp' },
  facebook: { label: 'Facebook', className: 'facebook' },
  snapchat: { label: 'Snapchat', className: 'snapchat' },
  reddit: { label: 'Reddit', className: 'reddit' },
  linkedin: { label: 'LinkedIn', className: 'linkedin' },
  paypal: { label: 'PayPal', className: 'paypal' },
  dana: { label: 'DANA', className: 'dana' },
  gopay: { label: 'GoPay', className: 'gopay' },
  ovo: { label: 'OVO', className: 'ovo' },
  shopeepay: { label: 'ShopeePay', className: 'shopeepay' },
  qris: { label: 'QRIS', className: 'qris' },
  bank: { label: 'Bank Transfer', className: 'bank' },
  website: { label: 'Website', className: 'website' },
  custom: { label: 'Custom Link', className: 'custom' }
}

export function normalizeBrandName(value = '') {
  const raw = String(value || '').toLowerCase().trim().replace(/[_-]+/g, ' ')
  if (!raw) return 'custom'
  for (const [brand, aliases] of Object.entries(BRAND_ALIASES)) {
    if (aliases.includes(raw) || aliases.some((alias) => raw.includes(alias))) return brand
  }
  return 'custom'
}

export function getBrandMeta(value = '') {
  const name = normalizeBrandName(value)
  return { name, ...(BRAND_META[name] || BRAND_META.custom) }
}


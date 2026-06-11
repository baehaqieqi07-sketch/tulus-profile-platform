const brandMap = {
  discord: { label: 'Discord', className: 'discord', glyph: '⌁' },
  instagram: { label: 'Instagram', className: 'instagram', glyph: '◎' },
  roblox: { label: 'Roblox', className: 'roblox', glyph: '◇' },
  spotify: { label: 'Spotify', className: 'spotify', glyph: '≋' },
  'apple music': { label: 'Apple Music', className: 'apple', glyph: '♪' },
  apple: { label: 'Apple Music', className: 'apple', glyph: '♪' },
  youtube: { label: 'YouTube', className: 'youtube', glyph: '▶' },
  tiktok: { label: 'TikTok', className: 'tiktok', glyph: '♫' },
  telegram: { label: 'Telegram', className: 'telegram', glyph: '↗' },
  soundcloud: { label: 'SoundCloud', className: 'soundcloud', glyph: '☁' },
  github: { label: 'GitHub', className: 'github', glyph: '⌘' },
  twitch: { label: 'Twitch', className: 'twitch', glyph: '▣' },
  steam: { label: 'Steam', className: 'steam', glyph: '◌' },
  pinterest: { label: 'Pinterest', className: 'pinterest', glyph: 'P' },
  website: { label: 'Website', className: 'website', glyph: '⌬' },
  google: { label: 'Google', className: 'google', glyph: 'G' },
  paypal: { label: 'PayPal', className: 'paypal', glyph: 'P' },
  x: { label: 'X', className: 'x', glyph: 'X' },
  twitter: { label: 'X', className: 'x', glyph: 'X' },
  email: { label: 'Email', className: 'email', glyph: '✉' },
  custom: { label: 'Custom', className: 'custom', glyph: '✦' }
}

export function brandFor(value = '') {
  const key = String(value).toLowerCase().trim()
  return brandMap[key] || Object.entries(brandMap).find(([k]) => key.includes(k))?.[1] || brandMap.custom
}

export default function BrandIcon({ name = 'custom', label, showLabel = false, className = '' }) {
  const brand = brandFor(name || label)
  return (
    <span className={`brand-icon brand-${brand.className} ${className}`} title={label || brand.label} aria-label={label || brand.label}>
      <i>{brand.glyph}</i>
      {showLabel && <b>{label || brand.label}</b>}
    </span>
  )
}

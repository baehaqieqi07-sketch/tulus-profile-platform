const ICONS = {
  discord: '✦',
  instagram: '◎',
  spotify: '♪',
  youtube: '▶',
  tiktok: '♬',
  roblox: '◆',
  github: '⌘',
  apple: '',
  'apple music': '',
  telegram: '✈',
  soundcloud: '☁',
  twitch: '◐',
  steam: '◈',
  website: '↗',
  link: '↗'
}

function iconFor(link) {
  const raw = String(link.icon || link.label || 'link').trim()
  const key = raw.toLowerCase()
  return ICONS[key] || raw.slice(0, 2).toUpperCase()
}

export default function SocialLinks({ links = [], onClick }) {
  const active = links.filter((link) => link.is_active !== false).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  if (!active.length) return null
  return (
    <div className="social-links bio-icon-row" aria-label="social links">
      {active.map((link) => (
        <a
          key={link.id || link.label}
          className={`social-link bio-icon-button style-${String(link.style || 'glass').toLowerCase().replace(/\s+/g, '-')}`}
          href={link.url || '#'}
          target="_blank"
          rel="noreferrer"
          onClick={() => onClick?.(link)}
          title={link.label}
          aria-label={link.label}
        >
          <span>{iconFor(link)}</span>
          <b>{link.label}</b>
        </a>
      ))}
    </div>
  )
}

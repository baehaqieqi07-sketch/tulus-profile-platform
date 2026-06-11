import AppIcon from './AppIcon.jsx'
import { safeUrl } from '../lib/sanitize.js'
import { getBrandMeta } from '../lib/brandIcons.js'

function iconName(link = {}) {
  return link.icon || link.app_name || link.platform || link.label || 'custom'
}

export default function SocialIconButton({ link, mode = 'icon-only', onClick }) {
  const url = safeUrl(link?.url || '') || '#'
  const brand = getBrandMeta(iconName(link))
  const label = link?.label || brand.label
  return (
    <a
      className={`social-icon-button social-mode-${String(mode || 'icon-only').toLowerCase().replace(/\s+/g, '-')} style-${String(link?.style || 'glass').toLowerCase().replace(/\s+/g, '-')}`}
      href={url}
      target="_blank"
      rel="noreferrer"
      title={label}
      aria-label={label}
      onClick={(event) => {
        if (url === '#') event.preventDefault()
        onClick?.(link)
      }}
    >
      <AppIcon app={iconName(link)} size={mode === 'pill' ? 34 : 42} />
      <b>{label}</b>
    </a>
  )
}

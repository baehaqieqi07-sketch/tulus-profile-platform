import SocialIconButton from './SocialIconButton.jsx'

export default function SocialLinks({ links = [], onClick, mode = 'icon-only' }) {
  const active = links
    .filter((link) => link.is_active !== false)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  if (!active.length) return null
  return (
    <div className={`social-links bio-icon-row social-mode-${mode}`} aria-label="social links">
      {active.map((link) => <SocialIconButton key={link.id || link.url || link.label} link={link} mode={mode} onClick={onClick} />)}
    </div>
  )
}

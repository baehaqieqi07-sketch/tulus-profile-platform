export default function SocialLinks({ links = [], onClick }) {
  const active = links.filter((link) => link.is_active !== false).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  if (!active.length) return null
  return (
    <div className="social-links">
      {active.map((link) => (
        <a key={link.id || link.label} className={`social-link style-${String(link.style || 'glass').toLowerCase().replace(/\s+/g, '-')}`} href={link.url || '#'} target="_blank" rel="noreferrer" onClick={() => onClick?.(link)}>
          <span>{link.icon || link.label}</span>
          <b>{link.label}</b>
        </a>
      ))}
    </div>
  )
}

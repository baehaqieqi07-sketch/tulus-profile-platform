export default function MusicFallbackButton({ href, text = 'open music' }) {
  if (!href) return null
  return <a className="tiny-link fallback-pill" href={href} target="_blank" rel="noreferrer">{text}</a>
}

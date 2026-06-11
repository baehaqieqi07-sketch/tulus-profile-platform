export default function MusicPlatformButton({ href, label = 'Open music', icon = '↗' }) {
  if (!href) return null
  return (
    <a className="music-platform-button" href={href} target="_blank" rel="noopener noreferrer">
      <span>{icon}</span>
      {label}
    </a>
  )
}

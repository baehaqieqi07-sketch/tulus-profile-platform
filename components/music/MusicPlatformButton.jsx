import { detectMusicPlatform, getMusicOpenLabel } from '../../lib/musicPlatform.js'

export default function MusicPlatformButton({ href, label, platform, compact = false }) {
  if (!href) return null

  const detected = platform ? { platform, name: label || platform, icon: '↗' } : detectMusicPlatform(href)
  const text = label || getMusicOpenLabel(detected.platform)

  return (
    <a className={`music-platform-button ${compact ? 'music-platform-button-compact' : ''}`} href={href} target="_blank" rel="noreferrer">
      <span className="music-platform-icon">{detected.icon || '↗'}</span>
      <span>{text}</span>
    </a>
  )
}

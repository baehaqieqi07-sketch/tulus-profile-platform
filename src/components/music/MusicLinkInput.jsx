import { useMemo, useState } from 'react'
import { detectMusicLink } from '../../lib/musicLinkDetector.js'

export default function MusicLinkInput({ onUse }) {
  const [url, setUrl] = useState('')
  const detected = useMemo(() => detectMusicLink(url), [url])
  return (
    <div className="mini-form">
      <label>Paste music link<input value={url} placeholder="YouTube, Spotify, SoundCloud, or direct .mp3" onChange={(e) => setUrl(e.target.value)} /></label>
      <p className="muted small">Detected: {detected.label}. Direct audio can play inside TULUS. External platforms use a clean fallback button.</p>
      <button type="button" className="secondary-button" onClick={() => onUse?.(url)} disabled={!url}>Use this link</button>
    </div>
  )
}

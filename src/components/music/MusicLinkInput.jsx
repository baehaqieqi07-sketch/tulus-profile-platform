import { useMemo, useState } from 'react'
import { detectMusicPlatform } from '../../lib/musicPlatform.js'

export default function MusicLinkInput({ onUse }) {
  const [url, setUrl] = useState('')
  const detected = useMemo(() => detectMusicPlatform(url), [url])

  return (
    <div className="mini-form">
      <label>
        Paste music link
        <input
          value={url}
          placeholder="Paste YouTube, Spotify, TikTok, SoundCloud, or direct .mp3 link"
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <p className="muted small">
        {url ? `Detected: ${detected.name}. ` : ''}Direct audio can play inside TULUS. Platform links open externally.
      </p>
      <button type="button" className="secondary-button" onClick={() => onUse?.(url)} disabled={!detected.valid}>
        Use this link
      </button>
    </div>
  )
}

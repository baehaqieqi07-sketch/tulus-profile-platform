import { useMemo, useState } from 'react'
import { detectMusicPlatform } from '../../lib/musicPlatform.js'

export default function MusicLinkInput({ onUse }) {
  const [url, setUrl] = useState('')
  const detected = useMemo(() => detectMusicPlatform(url), [url])

  const status = detected.playable
    ? 'Direct audio can play inside TULUS.'
    : detected.valid
      ? `${detected.name} links open externally.`
      : 'Direct audio can play inside TULUS. Platform links open externally.'

  return (
    <div className="mini-form music-link-card">
      <label>
        Music link
        <input
          value={url}
          placeholder="Paste YouTube, Spotify, TikTok, SoundCloud, or direct .mp3 link"
          onChange={(event) => setUrl(event.target.value)}
        />
      </label>

      <div className="music-link-status">
        <span>{detected.icon || '♪'}</span>
        <p>{status}</p>
      </div>

      <button type="button" className="secondary-button" onClick={() => onUse?.(url)} disabled={!detected.valid}>
        Use this link
      </button>
    </div>
  )
}

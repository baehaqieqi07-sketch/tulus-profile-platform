import { useMemo } from 'react'
import { applyMusicSelection } from '../../lib/music.js'
import { detectMusicPlatform } from '../../lib/musicPlatform.js'

export default function AdvancedMusic({ profile, setProfile }) {
  const currentUrl = profile.music_url || profile.music_direct_url || profile.music_external_url || ''
  const detected = useMemo(() => detectMusicPlatform(currentUrl), [currentUrl])
  const update = (key, value) => setProfile((prev) => ({ ...prev, [key]: value }))

  const updateMusicUrl = (value) => {
    setProfile((prev) => applyMusicSelection(prev, { kind: 'link', url: value }))
  }

  return (
    <div className="two-col-form editor-subgrid">
      <label className="wide-field">
        Music URL
        <input
          value={currentUrl}
          placeholder="Paste YouTube, Spotify, TikTok, SoundCloud, or direct .mp3 link"
          onChange={(event) => updateMusicUrl(event.target.value)}
        />
        <small className="field-help">Direct audio can play inside TULUS. Platform links open externally.</small>
      </label>

      <label>Music title<input value={profile.music_title || ''} onChange={(event) => update('music_title', event.target.value)} /></label>
      <label>Artist / platform<input value={profile.music_artist || ''} onChange={(event) => update('music_artist', event.target.value)} /></label>
      <label>Cover image URL<input value={profile.music_cover_url || ''} onChange={(event) => update('music_cover_url', event.target.value)} /></label>
      <label>Fallback text<input value={profile.music_fallback_text || 'tap to play music'} onChange={(event) => update('music_fallback_text', event.target.value)} /></label>

      <label>
        Default volume
        <input type="range" min="0" max="1" step="0.05" value={profile.music_volume ?? 0.55} onChange={(event) => update('music_volume', Number(event.target.value))} />
      </label>

      <label>
        Music source
        <select value={profile.music_source_type || 'none'} onChange={(event) => update('music_source_type', event.target.value)}>
          <option value="none">none</option>
          <option value="direct_audio">direct audio</option>
          <option value="external_platform">external platform</option>
          <option value="recommendation">recommendation</option>
          <option value="upload">upload</option>
        </select>
        <small className="field-help">Detected: {detected.name}</small>
      </label>

      <label className="switch-row"><input type="checkbox" checked={profile.music_loop !== false} onChange={(event) => update('music_loop', event.target.checked)} /> Loop music</label>
      <label className="switch-row"><input type="checkbox" checked={profile.show_music !== false} onChange={(event) => update('show_music', event.target.checked)} /> Show music player</label>
      <label className="switch-row"><input type="checkbox" checked={profile.music_equalizer_enabled !== false} onChange={(event) => update('music_equalizer_enabled', event.target.checked)} /> Music equalizer</label>
    </div>
  )
}

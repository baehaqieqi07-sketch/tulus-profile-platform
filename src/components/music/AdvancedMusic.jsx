export default function AdvancedMusic({ profile, setProfile }) {
  const update = (key, value) => setProfile((prev) => ({ ...prev, [key]: value }))
  return (
    <div className="two-col-form editor-subgrid">
      <label>Direct audio URL<input value={profile.music_direct_url || profile.music_url || ''} placeholder="https://.../track.mp3" onChange={(e) => update('music_direct_url', e.target.value)} /></label>
      <label>External music URL<input value={profile.music_external_url || ''} placeholder="YouTube / Spotify / SoundCloud" onChange={(e) => update('music_external_url', e.target.value)} /></label>
      <label>Music title<input value={profile.music_title || ''} onChange={(e) => update('music_title', e.target.value)} /></label>
      <label>Artist<input value={profile.music_artist || ''} onChange={(e) => update('music_artist', e.target.value)} /></label>
      <label>Cover image URL<input value={profile.music_cover_url || ''} onChange={(e) => update('music_cover_url', e.target.value)} /></label>
      <label>Fallback text<input value={profile.music_fallback_text || 'tap to play music'} onChange={(e) => update('music_fallback_text', e.target.value)} /></label>
      <label>Default volume<input type="range" min="0" max="1" step="0.05" value={profile.music_volume ?? 0.55} onChange={(e) => update('music_volume', Number(e.target.value))} /></label>
      <label>Music source<select value={profile.music_source_type || 'none'} onChange={(e) => update('music_source_type', e.target.value)}><option value="none">none</option><option value="recommendation">recommendation</option><option value="direct_url">direct url</option><option value="external_url">external url</option><option value="upload">upload</option></select></label>
      <label className="switch-row"><input type="checkbox" checked={profile.music_loop !== false} onChange={(e) => update('music_loop', e.target.checked)} /> Loop music</label>
      <label className="switch-row"><input type="checkbox" checked={profile.show_music !== false} onChange={(e) => update('show_music', e.target.checked)} /> Show music player</label>
      <label className="switch-row"><input type="checkbox" checked={profile.music_equalizer_enabled !== false} onChange={(e) => update('music_equalizer_enabled', e.target.checked)} /> Music equalizer</label>
    </div>
  )
}

export default function BackgroundEditor({ profile, setProfile }) {
  const update = (key, value) => setProfile((prev) => ({ ...prev, [key]: value }))
  return (
    <div className="editor-panel">
      <p className="eyebrow">background</p>
      <h2>Set the room.</h2>
      <label>Background URL<input value={profile.background_url || ''} placeholder="Image, GIF, or video URL" onChange={(e) => update('background_url', e.target.value)} /></label>
      <label>Type<select value={profile.background_type || 'gradient'} onChange={(e) => update('background_type', e.target.value)}><option>gradient</option><option>image</option><option>gif</option><option>video</option></select></label>
      <label>Overlay<input value={profile.background_overlay || ''} onChange={(e) => update('background_overlay', e.target.value)} /></label>
      <label>Blur<input type="range" min="0" max="14" value={profile.background_blur || 0} onChange={(e) => update('background_blur', Number(e.target.value))} /></label>
      <label>Brightness<input type="range" min="40" max="140" value={profile.background_brightness || 100} onChange={(e) => update('background_brightness', Number(e.target.value))} /></label>
    </div>
  )
}

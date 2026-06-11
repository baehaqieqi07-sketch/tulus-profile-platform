export default function AdvancedEdit({ profile, setProfile, onSave }) {
  const update = (key, value) => setProfile((prev) => ({ ...prev, [key]: value }))
  return (
    <div className="editor-panel two-col-form">
      <div className="editor-head wide">
        <p className="eyebrow">advanced edit</p>
        <h2>Fine details, still calm.</h2>
      </div>
      <label>Overlay color<input type="text" value={profile.background_overlay || ''} onChange={(e) => update('background_overlay', e.target.value)} /></label>
      <label>Background blur<input type="range" min="0" max="12" value={profile.background_blur || 0} onChange={(e) => update('background_blur', Number(e.target.value))} /></label>
      <label>Brightness<input type="range" min="40" max="140" value={profile.background_brightness || 100} onChange={(e) => update('background_brightness', Number(e.target.value))} /></label>
      <label>Layout<select value={profile.layout_name || 'Classic Card'} onChange={(e) => update('layout_name', e.target.value)}><option>Classic Card</option><option>Minimal Center</option><option>Split View</option><option>Gallery Focus</option><option>Music Focus</option><option>Soft Magazine</option><option>Floating Card</option><option>Pearl Room</option></select></label>
      <label>Visibility<select value={profile.visibility || 'public'} onChange={(e) => update('visibility', e.target.value)}><option value="public">Public</option><option value="unlisted">Unlisted</option><option value="private">Private</option></select></label>
      <label className="switch-row"><input type="checkbox" checked={profile.show_particles !== false} onChange={(e) => update('show_particles', e.target.checked)} /> Particle / bokeh</label>
      <label className="switch-row"><input type="checkbox" checked={profile.show_music !== false} onChange={(e) => update('show_music', e.target.checked)} /> Show music player</label>
      <label className="switch-row"><input type="checkbox" checked={profile.show_badges !== false} onChange={(e) => update('show_badges', e.target.checked)} /> Show badges</label>
      <label className="switch-row"><input type="checkbox" checked={profile.show_gallery !== false} onChange={(e) => update('show_gallery', e.target.checked)} /> Show gallery</label>
      <label className="switch-row"><input type="checkbox" checked={profile.show_quotes !== false} onChange={(e) => update('show_quotes', e.target.checked)} /> Show quotes</label>
      <label className="switch-row"><input type="checkbox" checked={profile.show_views !== false} onChange={(e) => update('show_views', e.target.checked)} /> Show views</label>
      <button className="primary-button wide" onClick={onSave}>Save advanced settings</button>
    </div>
  )
}

export default function AnimationSettings({ profile, setProfile }) {
  const update = (key, value) => setProfile((prev) => ({ ...prev, [key]: value }))
  return (
    <div className="editor-panel">
      <p className="eyebrow">animation</p>
      <h2>Alive, not noisy.</h2>
      <label>Preset<select value={profile.animation_preset || 'Calm'} onChange={(e) => update('animation_preset', e.target.value)}><option>Calm</option><option>Smooth</option><option>Dreamy</option><option>Minimal</option><option>Still</option><option>Floating</option><option>Soft Bloom</option></select></label>
      <label className="switch-row"><input type="checkbox" checked={profile.show_particles !== false} onChange={(e) => update('show_particles', e.target.checked)} /> Particle / bokeh</label>
      <label className="switch-row"><input type="checkbox" checked={profile.background_motion !== false} onChange={(e) => update('background_motion', e.target.checked)} /> Background motion</label>
      <label className="switch-row"><input type="checkbox" checked={profile.card_floating !== false} onChange={(e) => update('card_floating', e.target.checked)} /> Floating card</label>
      <label className="switch-row"><input type="checkbox" checked={profile.equalizer !== false} onChange={(e) => update('equalizer', e.target.checked)} /> Music equalizer</label>
      <label className="switch-row"><input type="checkbox" checked={profile.show_cursor === true} onChange={(e) => update('show_cursor', e.target.checked)} /> Cursor glow premium</label>
    </div>
  )
}

export default function AvatarEditor({ profile, setProfile }) {
  const update = (key, value) => setProfile((prev) => ({ ...prev, [key]: value }))
  return (
    <div className="editor-panel">
      <p className="eyebrow">avatar</p>
      <h2>A soft first look.</h2>
      <label>Avatar URL<input value={profile.avatar_url || ''} placeholder="https://..." onChange={(e) => update('avatar_url', e.target.value)} /></label>
      <label>Shape<select value={profile.avatar_shape || 'Circle'} onChange={(e) => update('avatar_shape', e.target.value)}><option>Circle</option><option>Rounded</option><option>Soft square</option></select></label>
      <label className="switch-row"><input type="checkbox" checked={profile.avatar_glow !== false} onChange={(e) => update('avatar_glow', e.target.checked)} /> Avatar glow</label>
    </div>
  )
}

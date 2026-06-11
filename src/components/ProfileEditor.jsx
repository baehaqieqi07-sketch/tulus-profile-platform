export default function ProfileEditor({ profile, setProfile }) {
  const update = (key, value) => setProfile((prev) => ({ ...prev, [key]: value }))
  return (
    <div className="editor-panel">
      <p className="eyebrow">profile</p>
      <h2>Your quiet identity.</h2>
      <label>Display name<input value={profile.display_name || ''} onChange={(e) => update('display_name', e.target.value)} /></label>
      <label>Username<input value={profile.username || ''} onChange={(e) => update('username', e.target.value)} /></label>
      <label>Bio<textarea value={profile.bio || ''} onChange={(e) => update('bio', e.target.value)} /></label>
      <label>Status / mood<input value={profile.status || ''} onChange={(e) => update('status', e.target.value)} /></label>
    </div>
  )
}

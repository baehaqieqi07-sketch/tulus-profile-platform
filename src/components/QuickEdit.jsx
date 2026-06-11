import { THEMES } from '../lib/themes.js'
import { normalizeUsername } from '../lib/validation.js'

export default function QuickEdit({ profile, setProfile, onSave }) {
  const update = (key, value) => setProfile((prev) => ({ ...prev, [key]: value }))
  return (
    <div className="editor-panel">
      <div className="editor-head">
        <p className="eyebrow">quick edit</p>
        <h2>Keep it simple.</h2>
      </div>
      <label>Display name<input value={profile.display_name || ''} maxLength="32" onChange={(e) => update('display_name', e.target.value)} /></label>
      <label>Username<input value={profile.username || ''} maxLength="24" onChange={(e) => update('username', normalizeUsername(e.target.value))} /></label>
      <label>Bio<textarea value={profile.bio || ''} maxLength="320" onChange={(e) => update('bio', e.target.value)} /></label>
      <label>Avatar URL<input value={profile.avatar_url || ''} placeholder="https://..." onChange={(e) => update('avatar_url', e.target.value)} /></label>
      <label>Background URL<input value={profile.background_url || ''} placeholder="https://..." onChange={(e) => update('background_url', e.target.value)} /></label>
      <label>Music direct URL<input value={profile.music_url || ''} placeholder="https://.../track.mp3" onChange={(e) => update('music_url', e.target.value)} /></label>
      <label>Theme<select value={profile.theme_name || 'Pearl Calm'} onChange={(e) => update('theme_name', e.target.value)}>{Object.values(THEMES).map((theme) => <option key={theme.name} value={theme.name}>{theme.name}{theme.free ? '' : ' — premium'}</option>)}</select></label>
      <button className="primary-button" onClick={onSave}>Save changes</button>
    </div>
  )
}

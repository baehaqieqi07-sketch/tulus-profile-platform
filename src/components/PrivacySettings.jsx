export default function PrivacySettings({ profile, setProfile }) {
  return (
    <div className="editor-panel">
      <p className="eyebrow">privacy</p>
      <h2>You choose the door.</h2>
      <label>Visibility<select value={profile.visibility || 'public'} onChange={(e) => setProfile((prev) => ({ ...prev, visibility: e.target.value }))}><option value="public">Public</option><option value="unlisted">Unlisted</option><option value="private">Private</option></select></label>
      <label className="switch-row"><input type="checkbox" checked={profile.is_hidden_from_explore === true} onChange={(e) => setProfile((prev) => ({ ...prev, is_hidden_from_explore: e.target.checked }))} /> Hide from explore</label>
      <label className="switch-row"><input type="checkbox" checked={profile.show_views !== false} onChange={(e) => setProfile((prev) => ({ ...prev, show_views: e.target.checked }))} /> Show view counter</label>
      <p className="muted">Public appears in explore. Unlisted is visible by link. Private is hidden from public.</p>
    </div>
  )
}

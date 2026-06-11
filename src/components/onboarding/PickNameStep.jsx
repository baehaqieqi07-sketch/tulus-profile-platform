export default function PickNameStep({ profile, setProfile }) {
  return (
    <div className="onboarding-step">
      <p className="eyebrow">step 01</p>
      <h2>Pick your name</h2>
      <label>Display name<input value={profile.display_name || ''} onChange={(e) => setProfile((p) => ({ ...p, display_name: e.target.value }))} /></label>
      <label>Username<input value={profile.username || ''} onChange={(e) => setProfile((p) => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, '') }))} /></label>
    </div>
  )
}

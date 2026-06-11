import QuickMusic from '../music/QuickMusic.jsx'

export default function AddMusicStep({ profile, setProfile }) {
  return (
    <div className="onboarding-step onboarding-music">
      <p className="eyebrow">step 03</p>
      <h2>Add your music</h2>
      <p className="muted">Optional. You can skip now and edit it later from dashboard.</p>
      <QuickMusic profile={profile} setProfile={setProfile} />
    </div>
  )
}

export default function EnterSpaceStep({ onEnter }) {
  return (
    <div className="onboarding-step enter-space-step">
      <p className="eyebrow">step 04</p>
      <h2>Your quiet space is ready.</h2>
      <p className="muted">Enter once, then edit anything later from dashboard.</p>
      <button className="primary-button sparkle-button" type="button" onClick={onEnter}>click to enter</button>
    </div>
  )
}

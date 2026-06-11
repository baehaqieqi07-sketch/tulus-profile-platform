export default function EnterScreen({ onEnter, hidden, subtitle }) {
  return (
    <button className={`enter-screen ${hidden ? 'enter-screen-hidden' : ''}`} onClick={onEnter} aria-label="Click to enter">
      <span>click to enter</span>
      {subtitle && <small>{subtitle}</small>}
    </button>
  )
}

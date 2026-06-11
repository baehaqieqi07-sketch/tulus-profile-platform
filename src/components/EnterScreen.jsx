export default function EnterScreen({ onEnter, hidden }) {
  if (hidden) return null
  return <button className="v7-enter" onClick={onEnter}><span>click to enter</span><small>your space is ready</small></button>
}

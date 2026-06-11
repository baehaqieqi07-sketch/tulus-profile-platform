export default function ViewCounter({ views = 0, show = true }) {
  if (!show) return null
  return <span className="view-counter">{Number(views || 0).toLocaleString()} views</span>
}

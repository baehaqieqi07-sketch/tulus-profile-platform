export default function ParticleLayer({ enabled = true }) {
  if (!enabled) return null
  return (
    <div className="particle-layer" aria-hidden="true">
      {Array.from({ length: 22 }).map((_, i) => <span key={i} style={{ '--i': i }} />)}
    </div>
  )
}

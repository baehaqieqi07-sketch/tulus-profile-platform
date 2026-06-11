import PremiumCursor from './PremiumCursor.jsx'

export function V7GlowBackground({ children, className = '' }) {
  return (
    <main className={`v100-page ${className}`}>
      <PremiumCursor />
      <div className="v100-noise" />
      <div className="v100-grid-glow" />
      <div className="v100-orb v100-orb-one" />
      <div className="v100-orb v100-orb-two" />
      <div className="v100-orb v100-orb-three" />
      <div className="v100-stars" aria-hidden="true">{Array.from({ length: 42 }).map((_, i) => <span key={i} style={{ '--i': i }} />)}</div>
      {children}
    </main>
  )
}

export function V7Card({ children, className = '' }) {
  return <section className={`v100-card ${className}`}>{children}</section>
}

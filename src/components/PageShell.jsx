import AnimatedBackground from './AnimatedBackground.jsx'
import PremiumCursor from './PremiumCursor.jsx'

export default function PageShell({ children, className = '', density = 'normal', cursor = true }) {
  return (
    <main className={`lux-page-shell ${className}`}>
      {cursor && <PremiumCursor />}
      <AnimatedBackground density={density} />
      {children}
    </main>
  )
}

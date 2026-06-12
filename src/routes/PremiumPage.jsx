import V7DashboardShell from '../components/V7DashboardShell.jsx'
import PremiumButton from '../components/PremiumButton.jsx'

const proofSteps = [
  'Choose Plus, Pro, or Lifetime.',
  'Upload payment proof or send it to owner support.',
  'Owner reviews manually in /tulus-control.',
  'Plan is activated after verification.'
]

const premiumTools = [
  'Premium public profile layouts', 'Background video/image polish', 'Custom cursor and soft trail', 'Advanced music styling', 'Gallery highlight', 'Badge studio', 'Analytics preview', 'SEO preview', 'Help priority placeholder', 'No loud/random UI'
]

export default function PremiumPage({ user, profile }) {
  return <V7DashboardShell user={user} profile={profile} active="Premium">
    <section className="v100-premium-page">
      <p className="v100-kicker">Premium Center</p>
      <h1>Upgrade your TULUS profile with a calm premium flow.</h1>
      <p className="muted">This page keeps payment honest: automatic checkout needs a real payment gateway key and server webhook. Manual verification is ready as the safe fallback.</p>

      <section className="v100-premium-hero">
        <h2>Manual payment proof</h2>
        <p>Upload proof from dashboard or send proof to owner support. The owner can approve the plan from the hidden control panel.</p>
        <div className="premium-value-grid">
          {proofSteps.map((step, index) => <article key={step}><b>{index + 1}</b><span>{step}</span></article>)}
        </div>
        <div className="hero-actions"><PremiumButton>Upload proof placeholder</PremiumButton><a className="v100-secondary" href="/pricing">Compare plans</a></div>
      </section>

      <section className="v100-premium-grid">
        {premiumTools.map((x) => <article key={x}>◆ {x}</article>)}
      </section>
    </section>
  </V7DashboardShell>
}

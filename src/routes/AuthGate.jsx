import { useState } from 'react'
import AuthGateBackground from '../components/auth/AuthGateBackground.jsx'
import AuthTabs from '../components/auth/AuthTabs.jsx'
import SignInCard from '../components/auth/SignInCard.jsx'
import SignUpCard from '../components/auth/SignUpCard.jsx'
import { demoProfile } from '../data/demoProfile.js'
import { go } from '../lib/authFlow.js'

export default function AuthGate({ onLogin, onProfilePatch, profile = demoProfile, initialTab = 'Sign In' }) {
  const [active, setActive] = useState(initialTab)
  return (
    <main className="auth-gate-shell">
      <AuthGateBackground profile={profile} />
      <section className="auth-gate-card glass-card">
        <div className="auth-gate-copy">
          <a className="brand" href="/landing">TULUS</a>
          <p className="eyebrow">a quiet profile space</p>
          <h1>Sign in to enter your quiet profile space.</h1>
          <p className="muted">Create a calm, aesthetic, and personal profile page with your own style.</p>
        </div>
        <AuthTabs active={active} onChange={setActive} />
        {active === 'Sign In'
          ? <SignInCard onLogin={onLogin} onSuccess={() => go('/enter')} />
          : <SignUpCard onLogin={onLogin} onProfilePatch={onProfilePatch} onSuccess={() => go('/onboarding')} />}
        <div className="auth-bottom-links"><a className="tiny-link" href="/explore">Explore public profiles</a><a className="tiny-link" href="/bekiw">View demo profile</a></div>
      </section>
    </main>
  )
}

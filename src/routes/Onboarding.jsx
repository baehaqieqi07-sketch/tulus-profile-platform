import { useState } from 'react'
import AuthGateBackground from '../components/auth/AuthGateBackground.jsx'
import OnboardingSteps from '../components/onboarding/OnboardingSteps.jsx'
import UserGuard from '../components/UserGuard.jsx'
import { go, markOnboarded } from '../lib/authFlow.js'

export default function Onboarding({ user, setUser, profile, setProfile }) {
  const [step, setStep] = useState(0)
  const next = () => setStep((value) => Math.min(value + 1, 3))
  const back = () => setStep((value) => Math.max(value - 1, 0))
  const enter = () => {
    setUser?.(markOnboarded(user))
    go('/enter')
  }
  return (
    <UserGuard user={user}>
      <main className="onboarding-shell">
        <AuthGateBackground profile={profile} />
        <section className="onboarding-card glass-card">
          <div className="onboarding-progress"><i style={{ width: `${((step + 1) / 4) * 100}%` }} /></div>
          <OnboardingSteps step={step} profile={profile} setProfile={setProfile} onEnter={enter} />
          <div className="onboarding-actions">
            {step > 0 && <button className="ghost-button" onClick={back}>Back</button>}
            {step < 3 && <button className="primary-button" onClick={next}>Next</button>}
            {step === 2 && <button className="ghost-button" onClick={() => setStep(3)}>Skip music</button>}
          </div>
        </section>
      </main>
    </UserGuard>
  )
}

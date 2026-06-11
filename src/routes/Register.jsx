import { useState } from 'react'
import { V7GlowBackground, V7Card } from '../components/V7Shell.jsx'
import SignUpCard from '../components/auth/SignUpCard.jsx'

export default function Register({ onLogin, onProfilePatch, profile }) {
  const [step, setStep] = useState('username')
  const [draftUsername, setDraftUsername] = useState(profile?.username || 'bekiw')
  return (
    <V7GlowBackground className="v7-auth">
      <V7Card className="v7-auth-card">
        <a className="v7-auth-logo" href="/">✦</a>
        {step === 'username' ? <>
          <h1>Create your account</h1><p>Build your profile, share your links, and customize everything in one place.</p>
          <label className="v7-auth-input"><span>Username</span><input value={draftUsername} onChange={(e)=>setDraftUsername(e.target.value.toLowerCase())} placeholder="tulus.id/username" /></label>
          <button className="v7-primary full" onClick={()=>setStep('finish')}>Continue</button>
          <div className="v7-auth-foot"><span>Already have an account?</span><a href="/login">Sign In</a></div>
        </> : <>
          <button className="v7-back" onClick={()=>setStep('username')}>‹ Back</button><h1>Finish your signup</h1><p>Add your email, password, and keep the name people will see on your page.</p>
          <SignUpCard onLogin={onLogin} onProfilePatch={(patch)=>onProfilePatch?.({ ...patch, username: draftUsername })} onSuccess={()=>{ history.pushState(null,'','/onboarding'); dispatchEvent(new PopStateEvent('popstate')) }} />
        </>}
      </V7Card>
    </V7GlowBackground>
  )
}

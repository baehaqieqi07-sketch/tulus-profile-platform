import { useState } from 'react'
import { V7GlowBackground, V7Card } from '../components/V7Shell.jsx'
import SignUpCard from '../components/auth/SignUpCard.jsx'
import TulusLogo from '../components/TulusLogo.jsx'

export default function Register({ onLogin, onProfilePatch, profile }) {
  const [step, setStep] = useState('username')
  const [draftUsername, setDraftUsername] = useState(profile?.username || 'bekiw')
  return (
    <V7GlowBackground className="v7-auth v500-auth">
      <V7Card className="v7-auth-card v500-login-card">
        <a className="v7-auth-logo" href="/"><TulusLogo compact /></a>
        {step === 'username' ? <>
          <p className="v100-kicker">Start your space</p><h1>Create your TULUS profile</h1><p>Pick a clean username first. Next you’ll finish email, password, language, and onboarding.</p>
          <label className="v7-auth-input"><span>Username</span><input value={draftUsername} onChange={(e)=>setDraftUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._]/g,''))} placeholder="tulus.id/username" /></label>
          <button className="v7-primary full" onClick={()=>setStep('finish')}>Continue</button>
          <div className="v7-auth-foot"><span>Already have an account?</span><a href="/login">Sign In</a></div>
        </> : <>
          <button className="v7-back" onClick={()=>setStep('username')}>‹ Back</button><p className="v100-kicker">Finish signup</p><h1>Secure your profile</h1><p>Add your email and password, then confirm the profile name people will see.</p>
          <SignUpCard onLogin={onLogin} onProfilePatch={(patch)=>onProfilePatch?.({ ...patch, username: draftUsername })} onSuccess={()=>{ history.pushState(null,'','/onboarding'); dispatchEvent(new PopStateEvent('popstate')) }} />
        </>}
      </V7Card>
    </V7GlowBackground>
  )
}

import { useState } from 'react'
import QuickMusic from './QuickMusic.jsx'
import AdvancedMusic from './AdvancedMusic.jsx'

export default function MusicDashboard({ user, profile, setProfile }) {
  const [mode, setMode] = useState('Quick Music')
  return (
    <div className="editor-panel">
      <p className="eyebrow">music</p>
      <h2>Music that starts after enter.</h2>
      <p className="muted">Pick recommended music, paste a link, or upload audio. Direct audio plays after click-to-enter. Platform links open externally.</p>
      <div className="auth-tabs compact-tabs">
        {['Quick Music', 'Advanced Music'].map((tab) => <button key={tab} type="button" className={mode === tab ? 'active' : ''} onClick={() => setMode(tab)}>{tab}</button>)}
      </div>
      {mode === 'Quick Music' ? <QuickMusic user={user} profile={profile} setProfile={setProfile} /> : <AdvancedMusic profile={profile} setProfile={setProfile} />}
    </div>
  )
}

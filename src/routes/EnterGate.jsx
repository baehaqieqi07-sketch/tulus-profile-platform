import BackgroundLayer from '../components/BackgroundLayer.jsx'
import ParticleLayer from '../components/ParticleLayer.jsx'
import EnterScreen from '../components/EnterScreen.jsx'
import { themeVars } from '../lib/themes.js'
import { go } from '../lib/authFlow.js'

export default function EnterGate({ user, profile }) {
  if (!user) {
    go('/')
    return null
  }
  return (
    <main className="public-profile enter-gate-page" style={themeVars(profile.theme_name)}>
      <BackgroundLayer profile={profile} />
      <ParticleLayer enabled />
      <section className="welcome-back-card glass-card">
        <p className="eyebrow">welcome back</p>
        <h1>{profile.display_name || 'your space'} is ready.</h1>
        <p className="muted">Choose whether you want to enter the profile experience or edit your page.</p>
        <div className="hero-actions">
          <button className="primary-button sparkle-button" onClick={() => go('/me')}>click to enter</button>
          <button className="secondary-button" onClick={() => go('/dashboard')}>edit profile</button>
        </div>
      </section>
      <EnterScreen onEnter={() => go('/me')} hidden={false} subtitle="your space is ready" />
    </main>
  )
}

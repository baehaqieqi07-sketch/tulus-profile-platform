import BackgroundLayer from '../components/BackgroundLayer.jsx'
import ParticleLayer from '../components/ParticleLayer.jsx'
import ProfileCard from '../components/ProfileCard.jsx'
import { demoProfile, demoLinks, demoBadges } from '../data/demoProfile.js'
import { themeVars } from '../lib/themes.js'

export default function Landing() {
  return (
    <main className="landing-page" style={themeVars('Pearl Calm')}>
      <BackgroundLayer profile={demoProfile} />
      <ParticleLayer enabled />
      <nav className="site-nav glass-card">
        <a className="brand" href="/">TULUS</a>
        <div><a href="/explore">Explore</a><a href="/login">Login</a><a className="nav-button" href="/register">Create Profile</a></div>
      </nav>
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">a quiet profile space</p>
          <h1>Create a calm, aesthetic, and personal profile page with your own style.</h1>
          <p className="hero-sub">TULUS keeps your public profile soft, clean, premium, and easy to edit. No loud words. No messy panels. Just a personal page that feels calm.</p>
          <div className="hero-actions"><a className="primary-button" href="/register">Create Profile</a><a className="secondary-button" href="/explore">Explore</a><a className="ghost-button" href="/login">Login</a></div>
        </div>
        <div className="hero-preview"><ProfileCard profile={demoProfile} links={demoLinks} badges={demoBadges} entered /></div>
      </section>
    </main>
  )
}

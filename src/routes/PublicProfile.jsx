import { useEffect, useState } from 'react'
import BackgroundLayer from '../components/BackgroundLayer.jsx'
import ParticleLayer from '../components/ParticleLayer.jsx'
import EnterScreen from '../components/EnterScreen.jsx'
import ProfileCard from '../components/ProfileCard.jsx'
import Quotes from '../components/Quotes.jsx'
import Gallery from '../components/Gallery.jsx'
import { themeVars } from '../lib/themes.js'

export default function PublicProfile({ username, profile, links, badges, quotes, gallery, incrementView, isPersonalExperience = false }) {
  const [entered, setEntered] = useState(Boolean(isPersonalExperience))
  useEffect(() => { document.title = `${profile.display_name || username} — TULUS` }, [profile.display_name, username])
  const enter = () => {
    setEntered(true)
    incrementView?.()
  }
  if (profile.is_suspended) return <main className="not-found"><section className="not-found-card glass-card"><h1>unavailable</h1><p className="muted">This profile is not available right now.</p></section></main>
  if (profile.visibility === 'private') return <main className="not-found"><section className="not-found-card glass-card"><h1>private space</h1><p className="muted">This profile is private.</p></section></main>
  return (
    <main className="public-profile" style={themeVars(profile.theme_name)}>
      <BackgroundLayer profile={profile} />
      <ParticleLayer enabled={profile.show_particles} />
      <EnterScreen onEnter={enter} hidden={entered} />
      <section className={`profile-stage ${entered ? 'profile-stage-visible' : ''}`}>
        <ProfileCard profile={profile} links={links} badges={badges} entered={entered} />
        <Quotes quotes={quotes} show={profile.show_quotes} />
        <Gallery items={gallery} show={profile.show_gallery} />
      </section>
    </main>
  )
}

import { useEffect, useState } from 'react'
import EnterScreen from '../components/EnterScreen.jsx'
import MusicPlayer from '../components/MusicPlayer.jsx'
import ViewCounter from '../components/ViewCounter.jsx'
import PremiumCursor from '../components/PremiumCursor.jsx'
import SocialIconButton from '../components/SocialIconButton.jsx'
import { themeVars } from '../lib/themes.js'

export default function PublicProfile({ username, profile, links = [], incrementView, isPersonalExperience = false }) {
  const [entered, setEntered] = useState(Boolean(isPersonalExperience))
  useEffect(() => { document.title = `${profile.display_name || username} — TULUS` }, [profile.display_name, username])
  const enter = () => { setEntered(true); incrementView?.() }
  if (profile.is_suspended) return <main className="not-found"><section className="not-found-card glass-card"><h1>unavailable</h1><p className="muted">This profile is not available right now.</p></section></main>
  if (profile.visibility === 'private') return <main className="not-found"><section className="not-found-card glass-card"><h1>private space</h1><p className="muted">This profile is private.</p></section></main>
  const activeLinks = links.filter((x)=>x.is_active !== false).slice(0,10)
  return (
    <main className={`v100-public v500-public ${entered ? 'entered' : ''}`} style={themeVars(profile.theme_name)}>
      <PremiumCursor />
      <div className="v100-public-bg v500-public-bg" style={profile.background_url ? { backgroundImage: `url(${profile.background_url})` } : undefined} />
      <div className="v100-public-vignette" />
      <div className="v100-public-noise" />
      <div className="v500-profile-aurora" />
      <div className="v100-public-sparks" aria-hidden="true">{Array.from({ length: 44 }).map((_, i) => <span key={i} style={{ '--i': i }} />)}</div>
      <button className="v100-volume v500-volume" aria-label="Music volume">◔</button>
      <EnterScreen onEnter={enter} hidden={entered} />
      <section className="v100-public-center v500-public-center">
        <div className="v100-avatar-ring v500-avatar-ring">{profile.avatar_url ? <img src={profile.avatar_url} alt="avatar" /> : <span>{(profile.display_name || username || 't').slice(0,1)}</span>}</div>
        <h1>{profile.display_name || username}</h1>
        <p className="v100-public-location">⌖ {profile.location || 'TULUS Space'}</p>
        <p className="v100-public-bio">{profile.bio || 'quiet page, clean links, soft blue glass.'}</p>
        <div className="v100-public-icons v500-public-icons">{activeLinks.map((link)=><SocialIconButton key={link.id || link.url} link={link} mode="icon-only" />)}</div>
        <div className="v100-public-meta"><ViewCounter views={profile.views} show={profile.show_views} /></div>
        {profile.show_music !== false && <div className="v100-public-music v500-public-music"><MusicPlayer profile={profile} entered={entered} compact /></div>}
      </section>
    </main>
  )
}

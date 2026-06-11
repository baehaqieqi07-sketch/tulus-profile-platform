import { useEffect, useState } from 'react'
import EnterScreen from '../components/EnterScreen.jsx'
import MusicPlayer from '../components/MusicPlayer.jsx'
import ViewCounter from '../components/ViewCounter.jsx'
import PremiumCursor from '../components/PremiumCursor.jsx'
import { themeVars } from '../lib/themes.js'

function iconFor(link) {
  const name = (link.icon || link.label || '').toLowerCase()
  if (name.includes('instagram')) return '◎'
  if (name.includes('discord')) return '☁'
  if (name.includes('spotify')) return '♫'
  if (name.includes('youtube')) return '▶'
  if (name.includes('roblox')) return '◆'
  if (name.includes('tiktok')) return '♪'
  if (name.includes('github')) return '⌘'
  return '✦'
}

export default function PublicProfile({ username, profile, links = [], incrementView, isPersonalExperience = false }) {
  const [entered, setEntered] = useState(Boolean(isPersonalExperience))
  useEffect(() => { document.title = `${profile.display_name || username} — TULUS` }, [profile.display_name, username])
  const enter = () => { setEntered(true); incrementView?.() }
  if (profile.is_suspended) return <main className="not-found"><section className="not-found-card glass-card"><h1>unavailable</h1><p className="muted">This profile is not available right now.</p></section></main>
  if (profile.visibility === 'private') return <main className="not-found"><section className="not-found-card glass-card"><h1>private space</h1><p className="muted">This profile is private.</p></section></main>
  const activeLinks = links.filter((x)=>x.is_active !== false).slice(0,8)
  return (
    <main className={`v100-public ${entered ? 'entered' : ''}`} style={themeVars(profile.theme_name)}>
      <PremiumCursor />
      <div className="v100-public-bg" style={profile.background_url ? { backgroundImage: `url(${profile.background_url})` } : undefined} />
      <div className="v100-public-vignette" />
      <div className="v100-public-noise" />
      <div className="v100-public-sparks" aria-hidden="true">{Array.from({ length: 28 }).map((_, i) => <span key={i} style={{ '--i': i }} />)}</div>
      <button className="v100-volume" aria-label="Music volume">◔</button>
      <EnterScreen onEnter={enter} hidden={entered} />
      <section className="v100-public-center">
        <div className="v100-avatar-ring">{profile.avatar_url ? <img src={profile.avatar_url} alt="avatar" /> : <span>{(profile.display_name || username || 't').slice(0,1)}</span>}</div>
        <h1>{profile.display_name || username}</h1>
        <p className="v100-public-location">⌖ {profile.location || 'TULUS Space'}</p>
        <p className="v100-public-bio">{profile.bio || 'quiet page, clean links, soft blue glass.'}</p>
        <div className="v100-public-icons">{activeLinks.map((link)=><a key={link.id || link.url} href={link.url} target="_blank" rel="noreferrer" title={link.label}>{iconFor(link)}</a>)}</div>
        <div className="v100-public-meta"><ViewCounter views={profile.views} show={profile.show_views} /></div>
        {profile.show_music !== false && <div className="v100-public-music"><MusicPlayer profile={profile} entered={entered} compact /></div>}
      </section>
    </main>
  )
}

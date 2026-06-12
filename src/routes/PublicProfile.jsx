import { useEffect, useMemo, useState } from 'react'
import EnterScreen from '../components/EnterScreen.jsx'
import MusicPlayer from '../components/MusicPlayer.jsx'
import ViewCounter from '../components/ViewCounter.jsx'
import PremiumCursor from '../components/PremiumCursor.jsx'
import SocialIconButton from '../components/SocialIconButton.jsx'
import { themeVars } from '../lib/themes.js'

function layoutClass(name = 'Center Aura') {
  return `layout-${String(name || 'Center Aura').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

export default function PublicProfile({ username, profile, links = [], badges = [], quotes = [], gallery = [], incrementView, isPersonalExperience = false }) {
  const [entered, setEntered] = useState(Boolean(isPersonalExperience))
  useEffect(() => { document.title = `${profile.display_name || username} — TULUS` }, [profile.display_name, username])
  const enter = () => { setEntered(true); incrementView?.() }
  const vars = useMemo(() => ({ ...themeVars(profile.theme_name), '--profile-overlay': Number(profile.background_overlay ?? .48) }), [profile])
  if (profile.is_suspended) return <main className="not-found"><section className="not-found-card glass-card"><h1>unavailable</h1><p className="muted">This profile is not available right now.</p></section></main>
  if (profile.visibility === 'private') return <main className="not-found"><section className="not-found-card glass-card"><h1>private space</h1><p className="muted">This profile is private.</p></section></main>
  const activeLinks = links.filter((x)=>x.is_active !== false).slice(0,12)
  const activeBadges = badges.filter((x)=>x.is_active !== false).slice(0,6)
  const quote = quotes.find((x)=>x.is_active !== false)?.text || profile.quote || ''
  return (
    <main className={`v100-public v500-public luxury-public ${layoutClass(profile.layout_name)} ${entered ? 'entered' : ''}`} style={vars}>
      <PremiumCursor />
      <div className="v100-public-bg v500-public-bg" style={profile.background_url ? { backgroundImage: `url(${profile.background_url})` } : undefined} />
      <div className="v100-public-vignette" style={{ opacity: Number(profile.background_overlay ?? .48) }} />
      <div className="v100-public-noise" />
      <div className="v500-profile-aurora" />
      <div className="lux-profile-bokeh" aria-hidden="true"><i/><i/><i/></div>
      <div className="v100-public-sparks" aria-hidden="true">{Array.from({ length: Number(profile.particle_amount || 44) }).map((_, i) => <span key={i} style={{ '--i': i }} />)}</div>
      <button className="v100-volume v500-volume" aria-label="Music volume">◔</button>
      <EnterScreen onEnter={enter} hidden={entered} />
      <section className="v100-public-center v500-public-center luxury-profile-card">
        <div className="v100-avatar-ring v500-avatar-ring lux-avatar-aura">{profile.avatar_url ? <img src={profile.avatar_url} alt="avatar" /> : <span>{(profile.display_name || username || 't').slice(0,1)}</span>}</div>
        <h1>{profile.display_name || username}</h1>
        <p className="v100-public-location">@{username} • {profile.location || 'TULUS Space'}</p>
        <p className="v100-public-bio">{profile.bio || 'quiet page, clean links, soft blue glass.'}</p>
        {quote ? <blockquote className="lux-profile-quote">“{quote}”</blockquote> : null}
        {activeBadges.length ? <div className="lux-profile-badges">{activeBadges.map((badge)=><span key={badge.id || badge.label}>{badge.label}</span>)}</div> : null}
        <div className="v100-public-icons v500-public-icons lux-profile-icons">{activeLinks.map((link)=><SocialIconButton key={link.id || link.url} link={link} mode={profile.link_mode || 'icon-only'} />)}</div>
        <div className="v100-public-meta"><ViewCounter views={profile.views} show={profile.show_views} /><span>{profile.layout_name || 'Center Aura'}</span></div>
        {profile.show_music !== false && <div className="v100-public-music v500-public-music"><MusicPlayer profile={profile} entered={entered} compact /></div>}
      </section>
      {gallery?.length && profile.show_gallery !== false ? <section className="lux-public-gallery">{gallery.slice(0,3).map((item)=><article key={item.id || item.image_url}>{item.image_url ? <img src={item.image_url} alt={item.title || 'gallery'} /> : <span>{item.title}</span>}</article>)}</section> : null}
    </main>
  )
}

import { useEffect, useMemo, useState } from 'react'
import EnterScreen from '../components/EnterScreen.jsx'
import MusicPlayer from '../components/MusicPlayer.jsx'
import ViewCounter from '../components/ViewCounter.jsx'
import PremiumCursor from '../components/PremiumCursor.jsx'
import SocialIconButton from '../components/SocialIconButton.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import { themeVars } from '../lib/themes.js'

function layoutClass(name = 'Center Aura') {
  return `layout-${String(name || 'Center Aura').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

export default function PublicProfile({ username, profile = {}, links = [], badges = [], quotes = [], gallery = [], incrementView, isPersonalExperience = false }) {
  const [entered, setEntered] = useState(Boolean(isPersonalExperience))
  useEffect(() => { document.title = `${profile.display_name || username || 'TULUS'} — TULUS` }, [profile.display_name, username])
  const enter = () => { setEntered(true); incrementView?.() }
  const vars = useMemo(() => ({ ...themeVars(profile.theme_name), '--profile-overlay': Number(profile.background_overlay ?? .56) }), [profile])
  const activeLinks = links.filter((x)=>x?.is_active !== false).slice(0,10)
  const activeBadges = badges.filter((x)=>x?.is_active !== false).slice(0,5)
  const quote = quotes.find((x)=>x?.is_active !== false)?.text || profile.quote || ''

  if (profile.is_suspended) return <main className="luxe-profile-error"><section><h1>unavailable</h1><p>This profile is not available right now.</p></section></main>
  if (profile.visibility === 'private') return <main className="luxe-profile-error"><section><h1>private space</h1><p>This profile is private.</p></section></main>

  return (
    <main className={`luxe-public-profile ${layoutClass(profile.layout_name)} ${entered ? 'entered' : ''}`} style={vars}>
      <PremiumCursor />
      <div className="luxe-public-bg" style={profile.background_url ? { backgroundImage: `url(${profile.background_url})` } : undefined} />
      <div className="luxe-public-overlay" />
      <div className="luxe-public-orb one" /><div className="luxe-public-orb two" />
      <EnterScreen onEnter={enter} hidden={entered} />

      <section className="luxe-public-card" aria-label="Public profile card">
        <div className="luxe-profile-topline"><span>TULUS</span><ViewCounter views={profile.views} show={profile.show_views} /></div>
        <div className="luxe-avatar-frame">
          {profile.avatar_url ? <img src={profile.avatar_url} alt={`${profile.display_name || username} avatar`} /> : <TulusLogo compact />}
        </div>
        <h1>{profile.display_name || username || 'TULUS User'}</h1>
        <p className="luxe-public-username">@{username || profile.username || 'bekiw'}{profile.location ? ` • ${profile.location}` : ''}</p>
        <p className="luxe-public-bio">{profile.bio || 'quiet profile space — clean links, soft music, blue glass mood.'}</p>
        {quote ? <blockquote>{quote}</blockquote> : null}
        {activeBadges.length ? <div className="luxe-badge-row">{activeBadges.map((badge)=><span key={badge.id || badge.label}>{badge.label}</span>)}</div> : null}
        <div className="luxe-public-icons">{activeLinks.length ? activeLinks.map((link)=><SocialIconButton key={link.id || link.url} link={link} mode="icon-only" />) : <span className="luxe-empty-link">No public links yet</span>}</div>
        {profile.show_music !== false ? <div className="luxe-music-dock"><MusicPlayer profile={profile} entered={entered} compact /></div> : null}
      </section>

      {gallery?.length && profile.show_gallery !== false ? <section className="luxe-public-gallery">{gallery.slice(0,3).map((item)=><article key={item.id || item.image_url}>{item.image_url ? <img src={item.image_url} alt={item.title || 'gallery'} /> : <span>{item.title || 'gallery'}</span>}</article>)}</section> : null}
    </main>
  )
}

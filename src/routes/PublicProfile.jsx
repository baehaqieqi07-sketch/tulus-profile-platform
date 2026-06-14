import { useEffect, useMemo, useState } from 'react'
import EnterScreen from '../components/EnterScreen.jsx'
import MusicPlayer from '../components/MusicPlayer.jsx'
import ViewCounter from '../components/ViewCounter.jsx'
import SocialIconButton from '../components/SocialIconButton.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import SpaceBackground from '../components/SpaceBackground.jsx'

export default function PublicProfile({ username, profile = {}, links = [], badges = [], quotes = [], gallery = [], incrementView }) {
  const [entered, setEntered] = useState(false)
  const visibleLinks = useMemo(() => (links || []).filter((link) => link?.is_active !== false).slice(0, 12), [links])
  const display = profile.display_name || username || 'TULUS'
  const bg = profile.background_url
  useEffect(() => { incrementView?.() }, [])
  return (
    <main className="pro-public" style={bg ? { '--profile-bg': `url(${bg})` } : undefined}>
      <SpaceBackground />
      <div className="pro-public-bg" />
      <EnterScreen hidden={entered} onEnter={() => setEntered(true)} />
      <section className={`pro-profile-shell ${entered ? 'entered' : ''}`}>
        <div className="pro-profile-topbar">
          <a href="/" aria-label="TULUS home"><TulusLogo compact /></a>
          <ViewCounter count={profile.views || 0} label="views" />
        </div>
        <div className="pro-profile-card-main">
          <div className="pro-profile-avatar">{profile.avatar_url ? <img src={profile.avatar_url} alt={display} /> : String(display).slice(0,1).toUpperCase()}</div>
          <p className="pro-profile-username">@{username}</p>
          <h1>{display}</h1>
          <p className="pro-profile-bio">{profile.bio || 'A quiet profile space.'}</p>
          <div className="pro-profile-badges">
            {(badges?.length ? badges.slice(0,6).map(b => b.label || b) : ['blue glass','quiet','premium']).map((b,i)=><span key={String(b)+i}>{b}</span>)}
          </div>
          <div className="pro-profile-links">
            {visibleLinks.length ? visibleLinks.map((link,i)=><SocialIconButton key={link.id || i} link={link} />) : ['discord','instagram','roblox','spotify','youtube','tiktok'].map((x)=><SocialIconButton key={x} link={{ label:x, icon:x, url:'https://tulus-id.vercel.app' }} />)}
          </div>
          <div className="pro-profile-music"><MusicPlayer profile={profile} entered={entered} compact /></div>
          {quotes?.[0]?.text ? <p className="pro-profile-quote">“{quotes[0].text}”</p> : <p className="pro-profile-quote">“quiet profile, soft glow, clear mood.”</p>}
        </div>
        {gallery?.length ? <div className="pro-profile-gallery">{gallery.slice(0,4).map((g,i)=><img key={g.id || i} src={g.image_url || g.url} alt={g.title || 'gallery'} />)}</div> : null}
      </section>
    </main>
  )
}

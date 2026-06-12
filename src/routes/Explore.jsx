import { useMemo, useState } from 'react'
import TulusNav from '../components/TulusNav.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import SocialIconButton from '../components/SocialIconButton.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'

export default function Explore({ profile, links = [], badges = [] }) {
  const [query, setQuery] = useState('')
  const rows = useMemo(() => [
    { username: profile?.username || 'bekiw', display_name: profile?.display_name || 'bekiw', bio: profile?.bio || 'quiet profile space.', views: profile?.views || 0, links, badges },
    { username: 'aulia', display_name: 'aulia', bio: 'soft blue profile inspiration.', views: 1280, links: links.slice(0, 4), badges: badges.slice(0, 2) },
    { username: 'qiel', display_name: 'qiel', bio: 'music, links, and calm aura.', views: 940, links: links.slice(0, 3), badges: badges.slice(0, 2) }
  ].filter((item) => `${item.username} ${item.display_name} ${item.bio}`.toLowerCase().includes(query.toLowerCase())), [profile, links, badges, query])

  return <V7GlowBackground className="explore-page-shell">
    <TulusNav />
    <main className="explore-page">
      <section className="page-head"><p className="v100-kicker">Explore</p><h1>Quiet public profiles.</h1><p className="muted">Discover public TULUS profiles with clean cards. Private and hidden profiles should not appear here.</p><input className="search-input" placeholder="Search username or vibe" value={query} onChange={(e) => setQuery(e.target.value)} /></section>
      <section className="explore-grid">
        {rows.map((item) => <article className="explore-card glass-card" key={item.username}>
          <div className="v500-preview-avatar"><TulusLogo compact /></div>
          <h2>{item.display_name}</h2>
          <p>@{item.username} • {Number(item.views || 0).toLocaleString()} views</p>
          <p>{item.bio}</p>
          <div className="lux-public-icon-preview">{(item.links || []).slice(0, 5).map((link) => <SocialIconButton key={link.id || link.url} link={link} />)}</div>
          <a className="v100-secondary" href={`/${item.username}`}>Open profile</a>
        </article>)}
      </section>
    </main>
  </V7GlowBackground>
}

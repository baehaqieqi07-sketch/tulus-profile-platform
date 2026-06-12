import { useMemo, useState } from 'react'
import ProfileCard from '../components/ProfileCard.jsx'

export default function Explore({ profile, links, badges }) {
  const [query, setQuery] = useState('')
  const profiles = useMemo(() => [profile].filter((p) => p.visibility === 'public' && !p.is_hidden_from_explore && !p.is_suspended), [profile])
  const filtered = profiles.filter((p) => p.username.includes(query.toLowerCase()) || p.display_name.toLowerCase().includes(query.toLowerCase()))
  return (
    <main className="explore-page">
      <nav className="site-nav glass-card"><a className="brand" href="/">TULUS</a><div><a href="/login">Login</a><a className="nav-button" href="/register">Create Profile</a></div></nav>
      <section className="page-head"><p className="eyebrow">explore</p><h1>Quiet public profiles.</h1><p className="muted">Only public and safe profiles appear here.</p><input className="search-input" placeholder="Search username" value={query} onChange={(e) => setQuery(e.target.value)} /></section>
      <section className="explore-grid">{filtered.map((item) => <a key={item.username} href={`/${item.username}`} className="explore-card"><ProfileCard profile={item} links={links} badges={badges} entered /></a>)}</section>
    </main>
  )
}

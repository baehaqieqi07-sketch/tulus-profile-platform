import { useEffect, useMemo, useState } from 'react'
import TulusNav from '../components/TulusNav.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
import { useTulusLanguage } from '../lib/i18n.js'
import { supabase, supabaseReady } from '../lib/supabase.js'

function rankScore(profile = {}) {
  return Number(profile.views || 0) + Number(profile.link_clicks || 0) * 3 + Number(profile.music_plays || 0) * 2
}
function readBestGames() { try { return JSON.parse(localStorage.getItem('tulus.games.best.v2') || '{}') } catch { return {} } }

export default function Leaderboard() {
  const { t } = useTulusLanguage()
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(Boolean(supabaseReady))
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('views')
  const [bestGames, setBestGames] = useState(readBestGames)

  useEffect(() => {
    setBestGames(readBestGames())
    if (!supabaseReady) { setLoading(false); return }
    let alive = true
    setLoading(true)
    supabase
      .from('profiles')
      .select('id, username, display_name, avatar_url, bio, views, visibility, is_suspended, is_hidden_from_explore, created_at')
      .eq('visibility', 'public')
      .eq('is_suspended', false)
      .order(tab === 'new' ? 'created_at' : 'views', { ascending: tab === 'new' })
      .limit(60)
      .then(({ data }) => {
        if (!alive) return
        setProfiles((data || []).filter((p) => !p.is_hidden_from_explore))
        setLoading(false)
      })
      .catch(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [tab])

  const rows = useMemo(() => profiles
    .filter((p) => `${p.username || ''} ${p.display_name || ''} ${p.bio || ''}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => tab === 'new' ? new Date(b.created_at || 0) - new Date(a.created_at || 0) : rankScore(b) - rankScore(a))
    .slice(0, 25), [profiles, query, tab])
  const gameRows = Object.entries(bestGames).sort((a,b)=>b[1]-a[1])

  return (
    <V7GlowBackground className="lux-leaderboard-page">
      <TulusNav />
      <section className="v100-board million-board lux-board">
        <div className="v100-board-hero lux-board-hero">
          <p className="v100-kicker">{t('leaderboard')}</p>
          <h1>Top public profiles, ranked by real activity.</h1>
          <p>Ranking memakai views tersimpan dari Supabase. Private, unlisted, hidden, dan suspended profile tidak ditampilkan. Tidak ada angka random.</p>
          <div className="lux-tabs"><button className={tab==='views'?'active':''} onClick={()=>setTab('views')}>Top profiles by views</button><button className={tab==='trending'?'active':''} onClick={()=>setTab('trending')}>Trending profiles</button><button className={tab==='new'?'active':''} onClick={()=>setTab('new')}>New profiles</button><button className={tab==='games'?'active':''} onClick={()=>setTab('games')}>Local game score</button></div>
          <div className="leaderboard-tools"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search username or display name" /><span>{loading ? 'Loading real data…' : tab === 'games' ? `${gameRows.length} local scores` : `${rows.length} public profiles`}</span></div>
        </div>
        {tab === 'games' ? <div className="v100-rank-list million-rank-list">{gameRows.length ? gameRows.map(([name, value], i)=><article className={i<3?'top':''} key={name}><span>{i+1}</span><b>{name}</b><small>Best score {Number(value || 0).toLocaleString()} • saved in this browser</small></article>) : <EmptyState title="No game score yet" body="Play Focus Tap, Memory Light, Aura Match, or Word Flow first." actionLabel="Open Game Center" actionHref="/games" />}</div> : rows.length ? <div className="v100-rank-list million-rank-list">{rows.map((profile, i)=>(
          <a className={i<3?'top':''} href={`/${profile.username}`} key={profile.id || profile.username}>
            <span>{i+1}</span>
            <b>{profile.display_name || profile.username}</b>
            <small>@{profile.username} • {(profile.views || 0).toLocaleString()} views • score {rankScore(profile).toLocaleString()}</small>
          </a>
        ))}</div> : <EmptyState title="No public ranking yet" body="Begitu profile public punya views dari visitor, ranking akan muncul otomatis." actionLabel="Cek /bekiw" actionHref="/bekiw" />}
      </section>
    </V7GlowBackground>
  )
}

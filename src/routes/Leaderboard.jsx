import { useEffect, useMemo, useState } from 'react'
import TulusNav from '../components/TulusNav.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
import { useTulusLanguage } from '../lib/i18n.js'
import { supabase, supabaseReady } from '../lib/supabase.js'

function rankScore(profile = {}) {
  return Number(profile.views || 0) + Number(profile.link_clicks || 0) * 3 + Number(profile.music_plays || 0) * 2
}

export default function Leaderboard() {
  const { t } = useTulusLanguage()
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(Boolean(supabaseReady))
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!supabaseReady) { setLoading(false); return }
    let alive = true
    setLoading(true)
    supabase
      .from('profiles')
      .select('id, username, display_name, avatar_url, bio, views, visibility, is_suspended, is_hidden_from_explore, created_at')
      .eq('visibility', 'public')
      .eq('is_suspended', false)
      .order('views', { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (!alive) return
        setProfiles((data || []).filter((p) => !p.is_hidden_from_explore))
        setLoading(false)
      })
      .catch(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const rows = useMemo(() => profiles
    .filter((p) => `${p.username || ''} ${p.display_name || ''} ${p.bio || ''}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => rankScore(b) - rankScore(a))
    .slice(0, 25), [profiles, query])

  return (
    <V7GlowBackground>
      <TulusNav />
      <section className="v100-board million-board">
        <div className="v100-board-hero">
          <p className="v100-kicker">{t('leaderboard')}</p>
          <h1>Top public profiles, ranked by real activity.</h1>
          <p>Ranking memakai views tersimpan dari Supabase. Private, unlisted, hidden, dan suspended profile tidak ditampilkan.</p>
          <div className="leaderboard-tools"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search username or display name" /><span>{loading ? 'Loading real data…' : `${rows.length} public profiles`}</span></div>
        </div>
        {rows.length ? <div className="v100-rank-list million-rank-list">{rows.map((profile, i)=>(
          <a className={i<3?'top':''} href={`/${profile.username}`} key={profile.id || profile.username}>
            <span>{i+1}</span>
            <b>{profile.display_name || profile.username}</b>
            <small>@{profile.username} • {(profile.views || 0).toLocaleString()} views • score {rankScore(profile).toLocaleString()}</small>
          </a>
        ))}</div> : <article className="leaderboard-empty glass-card"><b>No public ranking yet</b><p>Begitu profile public punya views dari visitor, ranking akan muncul otomatis. Tidak ada angka random.</p><a href="/bekiw">Cek profile /bekiw</a></article>}
      </section>
    </V7GlowBackground>
  )
}

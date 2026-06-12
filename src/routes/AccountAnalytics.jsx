import V7DashboardShell from '../components/V7DashboardShell.jsx'
import EmptyState from '../components/EmptyState.jsx'

const localBest = (() => { try { return JSON.parse(localStorage.getItem('tulus.games.best.v5') || localStorage.getItem('tulus.games.best.v4') || '{}') } catch { return {} } })()
const scoreRows = Object.entries(localBest).sort((a, b) => Number(b[1]) - Number(a[1]))

export default function AccountAnalytics({ user, profile }) {
  const views = Number(profile?.views || 0)
  const avg = Math.max(0, Math.round(views / 7))
  return <V7DashboardShell user={user} profile={profile} active="Analytics">
    <section className="analytics-premium-page">
      <p className="v100-kicker">Analytics</p>
      <h1>Understand your profile without messy numbers.</h1>
      <p className="muted">Analytics uses real profile views when Supabase is connected. Link clicks and advanced geo/referrer data are ready as safe placeholders until backend tracking is connected.</p>
      <section className="v100-overview-grid">
        <article><small>Total link clicks</small><b>0</b><span>tracking scaffold ready</span></article>
        <article><small>Click rate</small><b>0.00%</b><span>needs link click events</span></article>
        <article><small>Profile views</small><b>{views}</b><span>from profile row</span></article>
        <article><small>Average daily views</small><b>{avg}</b><span>estimated last 7 days</span></article>
      </section>
      <section className="v100-panel tall"><h2>Profile views trend</h2><p className="muted">Visual preview stays useful even when data is still small.</p><div className="v100-line-chart"><em/><em/><em/><em/><em/><em/><em/></div></section>
      <div className="v100-analytics-grid">
        <article><h3>Top links</h3><EmptyState title="No link clicks yet" body="Publish links and enable analytics events to fill this card." /></article>
        <article><h3>Game scores</h3>{scoreRows.length ? scoreRows.map(([name, score]) => <p key={name}><b>{name}</b><span>{score}</span></p>) : <EmptyState title="No scores yet" body="Play Game Center to save local scores." actionLabel="Open games" actionHref="/games" />}</article>
        <article><h3>Referrers</h3><EmptyState title="No referrers yet" body="Tracking scaffold is ready for future server-side analytics." /></article>
        <article className="map"><h3>Audience map</h3><p>World map preview. Real country data should be collected server-side with privacy-safe analytics.</p></article>
      </div>
    </section>
  </V7DashboardShell>
}

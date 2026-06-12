import V7DashboardShell from '../components/V7DashboardShell.jsx'
import BrandIcon from '../components/BrandIcon.jsx'

const actions = [
  ['Customize profile','/customize','Edit avatar, background, bio, layout, music, effects.','✦'],
  ['Manage links','/links','Add social apps, reorder links, preview icon style.','◎'],
  ['Open public profile','/{username}','Check what visitors see after click-to-enter.','◇'],
  ['Ask bekiw','/help','Troubleshoot login, upload, Supabase, music, and profile.','?']
]

export default function AccountDashboard({ user, profile }) {
  const username = profile?.username || 'bekiw'
  const display = profile?.display_name || username
  const completion = Math.min(100, [profile?.avatar_url, profile?.background_url, profile?.bio, profile?.music_url || profile?.music_direct_url, username].filter(Boolean).length * 20)
  return (
    <V7DashboardShell user={user} profile={profile} active="Overview">
      <header className="pro-dash-hero">
        <div>
          <p className="pro-kicker">Creator command center</p>
          <h1>Dashboard yang jelas untuk bikin profile kelihatan mahal.</h1>
          <p>Semua action utama ada di sini: edit profile, kelola link, lihat analytics, atur premium, dan cek public profile.</p>
          <div className="pro-actions"><a className="pro-btn primary" href="/customize">Customize now</a><a className="pro-btn secondary" href={`/${username}`}>Open /{username}</a></div>
        </div>
        <aside className="pro-live-profile">
          <div className="pro-live-avatar">{profile?.avatar_url ? <img src={profile.avatar_url} alt="avatar"/> : String(display).slice(0,1).toUpperCase()}</div>
          <small>@{username}</small>
          <h2>{display}</h2>
          <p>{profile?.bio || 'A quiet profile space.'}</p>
          <div>{['discord','instagram','roblox','spotify','youtube'].map((x)=><i key={x}><BrandIcon name={x} size={18}/></i>)}</div>
        </aside>
      </header>

      <section className="pro-stat-grid">
        <article><small>Public URL</small><b>/{username}</b><span>Ready to share</span></article>
        <article><small>Views</small><b>{Number(profile?.views || 0).toLocaleString()}</b><span>Cooldown protected</span></article>
        <article><small>Plan</small><b>{profile?.plan || 'Free'}</b><span>Manual upgrade ready</span></article>
        <article><small>Quality</small><b>{completion}%</b><span>Profile completion</span></article>
      </section>

      <section className="pro-action-grid">
        {actions.map(([title,href,body,icon])=>{
          const url = href.replace('{username}', username)
          return <a key={title} href={url} className="pro-card pro-action-card"><span>{icon}</span><b>{title}</b><p>{body}</p><em>Open →</em></a>
        })}
      </section>

      <section className="pro-dashboard-grid">
        <article className="pro-card pro-wide-card"><div><h2>Profile activity</h2><p>Visual preview yang tetap rapi walaupun data views masih sedikit.</p></div><div className="pro-bars">{[32,52,44,70,60,86,74,92].map((h,i)=><i key={i} style={{height:h+'%'}} />)}</div></article>
        <article className="pro-card"><h2>Best next step</h2><p>Pakai background gelap aesthetic, bio pendek, 5–8 link utama, dan musik direct audio kalau mau player hidup.</p><a className="pro-btn secondary" href="/customize">Fix profile</a></article>
      </section>
    </V7DashboardShell>
  )
}

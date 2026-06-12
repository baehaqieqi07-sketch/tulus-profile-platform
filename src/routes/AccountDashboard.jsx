import V7DashboardShell from '../components/V7DashboardShell.jsx'
import BekiwAIChat from '../components/BekiwAIChat.jsx'
import BrandIcon from '../components/BrandIcon.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

const quick = [
  ['Customize profile', '/customize', 'Edit avatar, bio, background, theme.'],
  ['Manage links', '/links', 'Tambah Discord, Instagram, Roblox, Spotify, dan lainnya.'],
  ['Open games', '/games', 'Main Focus Rush, Memory Pulse, Aura Clash, Word Flow.'],
  ['Help center', '/help', 'Tanya bekiw kalau ada error atau bingung.']
]

export default function AccountDashboard({ user, profile }) {
  const { t } = useTulusLanguage()
  const username = profile?.username || 'bekiw'
  return (
    <V7DashboardShell user={user} profile={profile} active="Overview">
      <header className="ot-dash-hero">
        <div>
          <p className="ot-kicker">Dashboard Studio</p>
          <h1>Semua kontrol TULUS ada di sini.</h1>
          <p>Profile, links, music, effects, analytics, premium, dan help center dibuat jadi satu workspace yang rapi.</p>
          <div className="ot-actions"><a className="ot-btn ot-btn-primary" href="/customize">Customize</a><a className="ot-btn ot-btn-soft" href={`/${username}`}>Open /{username}</a></div>
        </div>
        <aside className="ot-dashboard-preview">
          <div className="ot-avatar-big">{(profile?.display_name || username).slice(0,1).toUpperCase()}</div>
          <h2>{profile?.display_name || username}</h2>
          <span>@{username}</span>
          <p>{profile?.bio || 'quiet profile space.'}</p>
          <div>{['discord','instagram','roblox','spotify','youtube'].map((x)=><i key={x}><BrandIcon name={x} size={18}/></i>)}</div>
        </aside>
      </header>

      <section className="ot-stat-grid">
        <article><small>Public profile</small><b>/{username}</b><span>Ready to share</span></article>
        <article><small>Plan</small><b>{profile?.plan || 'Free'}</b><span>Upgrade kapan saja</span></article>
        <article><small>{t('profileViews') || 'Views'}</small><b>{Number(profile?.views || 0).toLocaleString()}</b><span>Cooldown protected</span></article>
        <article><small>Completion</small><b>82%</b><span>Avatar, links, music, theme</span></article>
      </section>

      <section className="ot-quick-grid">
        {quick.map(([title, href, body]) => <a href={href} key={title} className="ot-glass-card"><b>{title}</b><p>{body}</p><span>Open →</span></a>)}
      </section>

      <section className="ot-dashboard-grid">
        <article className="ot-glass-card ot-chart-card"><h2>Views this week</h2><div className="ot-bars">{[30,62,44,78,52,88,70].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div></article>
        <article className="ot-glass-card"><h2>Next best step</h2><p>Tambah background yang bagus, rapihin bio pendek, lalu isi 5–8 social links utama. Jangan kebanyakan teks.</p><a className="ot-btn ot-btn-soft" href="/customize">Fix profile</a></article>
        <article className="ot-glass-card ot-ai-card"><h2>bekiw AI</h2><BekiwAIChat compact /></article>
      </section>
    </V7DashboardShell>
  )
}

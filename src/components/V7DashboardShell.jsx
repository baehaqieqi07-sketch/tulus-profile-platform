import UserGuard from './UserGuard.jsx'
import TulusLogo from './TulusLogo.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const nav = [
  ['Overview','/account','◇'],
  ['Customize','/customize','✦'],
  ['Links','/links','◎'],
  ['Analytics','/account/analytics','▱'],
  ['Badges','/account/badges','✧'],
  ['Settings','/account/settings','⚙'],
  ['Premium','/premium','◆'],
  ['Games','/games','◈'],
  ['Help','/help','?']
]

export default function V7DashboardShell({ user, profile, active = 'Overview', children }) {
  const username = profile?.username || 'bekiw'
  const name = profile?.display_name || username
  return (
    <UserGuard user={user}>
      <main className="pro-dash-shell">
        <aside className="pro-side">
          <a className="pro-side-logo" href="/"><TulusLogo /></a>
          <div className="pro-side-profile">
            <div className="pro-side-avatar">{String(name).slice(0,1).toUpperCase()}</div>
            <div>
              <b>{name}</b>
              <small>@{username}</small>
            </div>
          </div>
          <div className="pro-side-lang"><LanguageSwitcher compact /></div>
          <nav className="pro-side-nav">
            {nav.map(([label,href,icon]) => <a key={href} className={active === label ? 'active' : ''} href={href}><span>{icon}</span>{label}</a>)}
          </nav>
          <div className="pro-side-preview">
            <p>Public profile</p>
            <b>/{username}</b>
            <a href={`/${username}`}>Open profile →</a>
          </div>
        </aside>
        <section className="pro-workspace">{children}</section>
      </main>
    </UserGuard>
  )
}

import UserGuard from './UserGuard.jsx'
import PremiumCursor from './PremiumCursor.jsx'
import TulusLogo from './TulusLogo.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

const groups = [
  { name: 'Account', items: [['Overview', '/account'], ['Analytics', '/account/analytics'], ['Badges', '/account/badges'], ['Settings', '/account/settings']] },
  { name: 'Studio', items: [['Customize', '/customize'], ['Links', '/links'], ['Music', '/customize#music'], ['Effects', '/customize#effects']] },
  { name: 'Growth', items: [['Premium', '/premium'], ['Leaderboard', '/leaderboard'], ['Games', '/games'], ['Help AI', '/help']] }
]

export default function V7DashboardShell({ user, profile, active = 'Overview', children }) {
  const { t } = useTulusLanguage()
  const username = profile?.username || 'bekiw'
  const initial = (profile?.display_name || username || 'T').slice(0, 1).toUpperCase()
  return (
    <UserGuard user={user}>
      <main className="ot-dashboard-shell luxe-dashboard-shell v100-app-shell v500-app-shell million-app-shell">
        <PremiumCursor />
        <aside className="ot-dashboard-side luxe-dashboard-side v100-side v500-side million-side">
          <a className="ot-side-logo luxe-side-logo" href="/"><TulusLogo /></a>
          <div className="ot-side-profile luxe-side-profile"><span>{initial}</span><div><b>{profile?.display_name || username}</b><small>@{username}</small></div></div>
          <LanguageSwitcher />
          <nav className="ot-side-menu luxe-side-menu v100-side-menu" aria-label="Dashboard navigation">
            {groups.map((group) => <section key={group.name}><p>{group.name}</p>{group.items.map(([label, href]) => <a key={href} className={active === label ? 'active' : ''} href={href}>{label}</a>)}</section>)}
          </nav>
          <div className="ot-side-help luxe-side-help"><b>{t('askBekiw') || 'Ask bekiw'}</b><span>Bantu setup profile, upload, music, link, bahasa, dan bug umum.</span><a href="/help">Open help</a></div>
          <a className="ot-side-share luxe-side-share" href={`/${username}`}>Open public profile</a>
        </aside>
        <section className="ot-dashboard-workspace luxe-dashboard-workspace v100-workspace v500-workspace million-workspace">{children}</section>
      </main>
    </UserGuard>
  )
}

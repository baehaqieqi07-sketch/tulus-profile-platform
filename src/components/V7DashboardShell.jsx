import UserGuard from './UserGuard.jsx'
import PremiumCursor from './PremiumCursor.jsx'
import TulusLogo from './TulusLogo.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

const baseGroups = [
  { name: 'Account', items: [['Overview', '/account'], ['Analytics', '/account/analytics'], ['Badges', '/account/badges'], ['Settings', '/account/settings']] },
  { name: 'Create', items: [['Customize', '/customize'], ['Links', '/links'], ['Music', '/customize#music'], ['Effects', '/customize#effects']] },
  { name: 'Growth', items: [['Premium', '/premium'], ['Leaderboard', '/leaderboard'], ['Games', '/games'], ['Help AI', '/help']] },
  { name: 'Tools', items: [['Image Host', '/image-host'], ['Templates', '/templates']] }
]

export default function V7DashboardShell({ user, profile, active = 'Overview', children }) {
  const { t } = useTulusLanguage()
  const groups = user?.role === 'owner' ? [...baseGroups, { name: 'Owner', items: [['TULUS Control', '/tulus-control']] }] : baseGroups
  return (
    <UserGuard user={user}>
      <main className="v100-app-shell v500-app-shell million-app-shell">
        <PremiumCursor />
        <aside className="v100-side v500-side million-side">
          <a className="v100-side-logo v500-side-logo" href="/"><TulusLogo /></a>
          <label className="v100-search"><span>⌕</span><input placeholder="Search features..." /></label>
          <LanguageSwitcher />
          <div className="v100-side-menu">
            {groups.map((group) => <section key={group.name}><p>{group.name}</p>{group.items.map(([label, href]) => <a key={href} className={active === label ? 'active' : ''} href={href}>{label}</a>)}</section>)}
          </div>
          <div className="v100-help-card v500-help-card"><b>{t('askBekiw')}</b><span>bekiw can guide setup, language, games, music, uploads, and profile design.</span><a href="/help">Chat with bekiw</a><a href={`/${profile?.username || 'bekiw'}`}>{t('openProfile')}</a></div>
          <a className="v100-share" href={`/${profile?.username || 'bekiw'}`}>↗ Share Your Profile</a>
          <div className="v100-user-mini"><span>{(profile?.display_name || 'b').slice(0,1)}</span><div><b>{profile?.display_name || 'bekiw'}</b><small>{user?.id ? `UID ${String(user.id).slice(0, 8)}` : 'local session'}</small></div><i>•••</i></div>
        </aside>
        <section className="v100-workspace v500-workspace million-workspace">{children}</section>
      </main>
    </UserGuard>
  )
}

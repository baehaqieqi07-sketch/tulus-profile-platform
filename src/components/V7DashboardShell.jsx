import UserGuard from './UserGuard.jsx'
import PremiumCursor from './PremiumCursor.jsx'
import TulusLogo from './TulusLogo.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { getInitialLang } from '../lib/i18n.js'
import { useState } from 'react'

const groups = [
  { name: 'Account', items: [['Overview', '/account'], ['Analytics', '/account/analytics'], ['Badges', '/account/badges'], ['Settings', '/account/settings']] },
  { name: 'Create', items: [['Customize', '/customize'], ['Links', '/links'], ['Music', '/customize#music'], ['Effects', '/customize#effects']] },
  { name: 'Growth', items: [['Premium', '/premium'], ['Leaderboard', '/leaderboard'], ['Help AI', '/help']] },
  { name: 'Tools', items: [['Image Host', '/image-host'], ['Templates', '/templates'], ['Owner', '/tulus-control']] }
]

export default function V7DashboardShell({ user, profile, active = 'Overview', children }) {
  const [lang, setLang] = useState(getInitialLang())
  return (
    <UserGuard user={user}>
      <main className="v100-app-shell v500-app-shell">
        <PremiumCursor />
        <aside className="v100-side v500-side">
          <a className="v100-side-logo v500-side-logo" href="/"><TulusLogo /></a>
          <label className="v100-search"><span>⌕</span><input placeholder="Search features..." /></label>
          <LanguageSwitcher value={lang} onChange={setLang} />
          <div className="v100-side-menu">
            {groups.map((group) => <section key={group.name}><p>{group.name}</p>{group.items.map(([label, href]) => <a key={href} className={active === label ? 'active' : ''} href={href}>{label}</a>)}</section>)}
          </div>
          <div className="v100-help-card v500-help-card"><b>Need help?</b><span>bekiw can guide setup, music, uploads, and profile design.</span><a href="/help">Chat with bekiw</a><a href={`/${profile?.username || 'bekiw'}`}>Open my page</a></div>
          <a className="v100-share" href={`/${profile?.username || 'bekiw'}`}>↗ Share Your Profile</a>
          <div className="v100-user-mini"><span>{(profile?.display_name || 'b').slice(0,1)}</span><div><b>{profile?.display_name || 'bekiw'}</b><small>UID 1,895,641</small></div><i>•••</i></div>
        </aside>
        <section className="v100-workspace v500-workspace">{children}</section>
      </main>
    </UserGuard>
  )
}

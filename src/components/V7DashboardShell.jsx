import UserGuard from './UserGuard.jsx'
import PremiumCursor from './PremiumCursor.jsx'

const groups = [
  { name: 'Account', items: [['Overview', '/account'], ['Analytics', '/account/analytics'], ['Badges', '/account/badges'], ['Settings', '/account/settings']] },
  { name: 'Create', items: [['Customize', '/customize'], ['Links', '/links'], ['Music', '/customize#music'], ['Effects', '/customize#effects']] },
  { name: 'Premium', items: [['Premium', '/premium'], ['Image Host', '/image-host'], ['Templates', '/templates']] },
  { name: 'Support', items: [['Help AI', '/help']] }
]

export default function V7DashboardShell({ user, profile, active = 'Overview', children }) {
  return (
    <UserGuard user={user}>
      <main className="v100-app-shell">
        <PremiumCursor />
        <aside className="v100-side">
          <a className="v100-side-logo" href="/"><span>◆</span> TULUS</a>
          <label className="v100-search"><span>⌕</span><input placeholder="Search features..." /></label>
          <div className="v100-side-menu">
            {groups.map((group) => <section key={group.name}><p>{group.name}</p>{group.items.map(([label, href]) => <a key={href} className={active === label ? 'active' : ''} href={href}>{label}</a>)}</section>)}
          </div>
          <div className="v100-help-card"><b>Need help?</b><a href="/help">Chat with bekiw</a><a href={`/${profile?.username || 'bekiw'}`}>My Page</a></div>
          <a className="v100-share" href={`/${profile?.username || 'bekiw'}`}>↗ Share Your Profile</a>
          <div className="v100-user-mini"><span>{(profile?.display_name || 'b').slice(0,1)}</span><div><b>{profile?.display_name || 'bekiw'}</b><small>UID 1,895,641</small></div><i>•••</i></div>
        </aside>
        <section className="v100-workspace">{children}</section>
      </main>
    </UserGuard>
  )
}

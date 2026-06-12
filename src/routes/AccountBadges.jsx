import V7DashboardShell from '../components/V7DashboardShell.jsx'

const badges = ['calm', 'soft', 'personal', 'music ready', 'link builder', 'game streak', 'premium aura', 'creator', 'verified owner', 'early profile']

export default function AccountBadges({ user, profile }) {
  return <V7DashboardShell user={user} profile={profile} active="Badges">
    <section className="badges-premium-page">
      <p className="v100-kicker">Badges</p>
      <h1>Badges that make the profile feel finished.</h1>
      <p className="muted">Default badges are active. Premium and achievement badges can be unlocked through owner approval, plan status, or local activity.</p>
      <div className="v100-badge-grid">
        {badges.map((b, i) => <article key={b}><span>{['◆','✦','◇','✧','◎'][i % 5]}</span><b>{b}</b><small>{i < 3 ? 'Default profile badge.' : i < 6 ? 'Unlock through activity.' : 'Premium/owner approval badge.'}</small><button className={i < 3 ? 'v100-primary' : 'v100-secondary'}>{i < 3 ? 'Active' : 'Preview'}</button></article>)}
      </div>
      <section className="v100-upgrade-banner"><h2>Premium badge studio</h2><p>Reorder, recolor, animate, and toggle badges after the badge backend is connected. The public profile stays clean and not crowded.</p><a className="v100-primary" href="/pricing">View plans</a></section>
    </section>
  </V7DashboardShell>
}

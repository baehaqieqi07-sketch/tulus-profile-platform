import V7DashboardShell from '../components/V7DashboardShell.jsx'
import EmptyState from '../components/EmptyState.jsx'

const copy = {
  'Image Host': {
    title: 'Image Host Studio',
    body: 'Upload and organize profile assets safely. Real file storage uses Supabase Storage buckets and upload validation.',
    tools: ['Avatar library', 'Background library', 'Gallery staging', 'Safe file validation', 'Storage path per user', 'Broken image fallback']
  },
  Templates: {
    title: 'Template Studio',
    body: 'Choose a clean TULUS layout without copying another site. Templates stay original, calm, and readable.',
    tools: ['Center Aura', 'Glass ID', 'Minimal Luxe', 'Music Focus', 'Creator Card', 'Blue Halo']
  }
}

export default function PlaceholderDashboard({ user, profile, title = 'Templates' }) {
  const data = copy[title] || copy.Templates
  return <V7DashboardShell user={user} profile={profile} active={title}>
    <section className="v7-empty-rich">
      <p className="v100-kicker">{title}</p>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <div className="tool-grid">{data.tools.map((tool) => <article key={tool}><b>{tool}</b><span>Ready UI • safe placeholder • production backend can be connected later.</span></article>)}</div>
      <EmptyState title="No published items yet" body="This section is not blank anymore. Add assets/templates later when the backend workflow is connected." actionLabel="Back to customize" actionHref="/customize" />
    </section>
  </V7DashboardShell>
}

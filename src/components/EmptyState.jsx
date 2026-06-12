import PremiumButton from './PremiumButton.jsx'

export default function EmptyState({ title = 'Nothing here yet', body = 'This area will fill up after you add data.', actionLabel, actionHref, className = '' }) {
  return (
    <section className={`empty-state lux-glass-card ${className}`}>
      <i aria-hidden="true" />
      <h2>{title}</h2>
      <p className="lux-muted">{body}</p>
      {actionLabel && actionHref ? <PremiumButton as="a" href={actionHref}>{actionLabel}</PremiumButton> : null}
    </section>
  )
}

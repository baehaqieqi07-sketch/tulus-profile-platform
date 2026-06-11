import { PLANS } from '../lib/plans.js'
export default function PremiumPlans({ onUpgrade }) {
  return (
    <div className="editor-panel wide-panel">
      <p className="eyebrow">premium</p>
      <h2>Free stays good. Premium adds room.</h2>
      <div className="plans-grid">
        {Object.entries(PLANS).map(([key, plan]) => (
          <article className="plan-card" key={key}>
            <h3>{plan.name}</h3>
            <strong>{plan.price}</strong>
            <p>{plan.tagline}</p>
            <ul>{plan.features.slice(0, 7).map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <button className={key === 'free' ? 'secondary-button' : 'primary-button'} onClick={() => onUpgrade?.(key)}>{key === 'free' ? 'Current style' : 'Upgrade'}</button>
          </article>
        ))}
      </div>
    </div>
  )
}

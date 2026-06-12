import TulusNav from '../components/TulusNav.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
import PremiumButton from '../components/PremiumButton.jsx'

const plans = [
  { name: 'Free', price: 'Rp0', note: 'forever', cta: 'Create free profile', href: '/register', features: ['Public profile /:username', 'Basic blue-glass theme', 'Social/app links', 'Profile views', 'Game Center local score'] },
  { name: 'Plus', price: 'Rp19K', note: 'manual verification', cta: 'Request Plus', href: '/premium', features: ['More layouts', 'Extra effects', 'Premium badges', 'Music cover', 'Priority help'] },
  { name: 'Pro', price: 'Rp39K', note: 'manual verification', cta: 'Request Pro', href: '/premium', featured: true, features: ['Creator layouts', 'Advanced analytics preview', 'Custom cursor studio', 'Gallery highlight', 'Profile SEO preview'] },
  { name: 'Lifetime', price: 'Rp149K', note: 'one-time manual', cta: 'Request Lifetime', href: '/premium', features: ['All Pro tools', 'Lifetime profile cosmetics', 'Owner approval flow', 'Early feature access', 'Manual support review'] }
]

const compare = [
  ['Profile layouts', 'Basic', 'More', 'Creator', 'All'],
  ['Background image/upload', 'Yes', 'Yes', 'Yes', 'Yes'],
  ['Direct music MP3/WAV/OGG/M4A', 'Yes', 'Yes', 'Yes', 'Yes'],
  ['External music button', 'Yes', 'Yes', 'Yes', 'Yes'],
  ['Effects & cursor', 'Basic', 'Plus', 'Pro', 'All'],
  ['Analytics preview', 'Views', 'Views', 'Advanced', 'Advanced'],
  ['Payment verification', '—', 'Manual owner', 'Manual owner', 'Manual owner'],
  ['Automatic gateway', 'Not active', 'Needs key', 'Needs key', 'Needs key']
]

export default function Pricing() {
  return (
    <V7GlowBackground className="pricing-page-premium">
      <TulusNav />
      <section className="v100-pricing">
        <p className="v100-kicker">Pricing</p>
        <h1>Premium profile tools without confusing checkout claims.</h1>
        <p>Choose a TULUS plan for your profile. Payment UI is ready, but real automatic payment still needs a gateway key and webhook. Until then, premium upgrades use manual owner verification.</p>

        <div className="premium-plan-grid">
          {plans.map((plan) => (
            <article className={`premium-plan ${plan.featured ? 'featured' : ''}`} key={plan.name}>
              <span className="v100-kicker">{plan.name}</span>
              <h3>{plan.price}<small> / {plan.note}</small></h3>
              <ul>{plan.features.map((item) => <li key={item}>{item}</li>)}</ul>
              <a className={plan.featured ? 'v100-primary' : 'v100-secondary'} href={plan.href}>{plan.cta}</a>
            </article>
          ))}
        </div>

        <section className="premium-payment-card">
          <div><TulusLogo compact /></div>
          <div>
            <h2>Manual verification by owner</h2>
            <p>Kamu bisa siapkan payment proof upload dan owner approval tanpa mengklaim auto-payment aktif. Midtrans/Xendit/Duitku/Stripe bisa ditambahkan nanti setelah secret gateway tersedia di server.</p>
          </div>
          <PremiumButton as="a" href="/premium">Open billing center</PremiumButton>
        </section>

        <h2>Feature comparison</h2>
        <div className="premium-compare-table">
          <div className="premium-compare-row heading"><b>Feature</b><b>Free</b><b>Plus</b><b>Pro</b><b>Lifetime</b></div>
          {compare.map((row) => (
            <div className="premium-compare-row" key={row[0]}>
              {row.map((cell, i) => i === 0 ? <b key={cell}>{cell}</b> : <span key={`${row[0]}-${i}`}>{cell}</span>)}
            </div>
          ))}
        </div>
      </section>
    </V7GlowBackground>
  )
}

import TulusNav from '../components/TulusNav.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'

const plans = [
  { name: 'Free', price: 'Rp0', desc: 'Mulai bikin profile rapi tanpa ribet.', cta: 'Start free', href: '/register', items: ['Public profile', 'Basic links', 'Soft blue theme', 'Profile views'] },
  { name: 'Plus', price: 'Rp19K', desc: 'Untuk profile yang lebih hidup.', cta: 'Choose Plus', href: '/premium', featured: true, items: ['Premium layouts', 'Music mood', 'More effects', 'Gallery section', 'Custom cursor'] },
  { name: 'Pro', price: 'Rp39K', desc: 'Creator tools lebih lengkap.', cta: 'Choose Pro', href: '/premium', items: ['Advanced analytics', 'Priority look', 'Premium badges', 'SEO profile tools', 'More app styles'] },
  { name: 'Lifetime', price: 'Manual', desc: 'Sekali verifikasi manual owner.', cta: 'Manual verification', href: '/premium', items: ['Lifetime status', 'Owner approval', 'Payment proof upload', 'Premium profile set'] }
]
const features = ['Profile aesthetic', 'Click-to-enter', 'Music direct audio', 'External music button', 'Brand icons', 'Views', 'Game Center', 'Help AI', 'Manual payment proof']

export default function Pricing() {
  return (
    <V7GlowBackground className="luxe-page luxe-pricing-page">
      <TulusNav />
      <section className="luxe-pricing-hero">
        <p className="luxe-kicker">Pricing</p>
        <h1>Pilih plan tanpa bikin tampilannya murah.</h1>
        <p>Payment otomatis belum diklaim aktif. Kalau provider belum dipasang, premium diproses sebagai manual verification by owner.</p>
      </section>
      <section className="luxe-plans-grid">
        {plans.map((plan)=><article key={plan.name} className={`luxe-plan-card ${plan.featured ? 'featured' : ''}`}><span>{plan.name}</span><h2>{plan.price}</h2><p>{plan.desc}</p><ul>{plan.items.map((item)=><li key={item}>✓ {item}</li>)}</ul><a href={plan.href}>{plan.cta}</a></article>)}
      </section>
      <section className="luxe-compare-card">
        <div><p className="luxe-kicker">Comparison</p><h2>Fitur utama yang siap dipakai.</h2></div>
        <div className="luxe-compare-list">{features.map((item)=><article key={item}><span>{item}</span><b>Ready</b></article>)}</div>
      </section>
    </V7GlowBackground>
  )
}

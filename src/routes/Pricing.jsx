import CleanNav from '../components/CleanNav.jsx'
const plans = [
  ['Free','Rp0','Mulai bikin profile publik.', ['Public profile','Basic links','Basic effects','Game center']],
  ['Plus','Rp15K','Untuk profile yang lebih niat.', ['More layouts','Premium glass effects','Music cover','More badges']],
  ['Pro','Rp35K','Untuk creator dan server.', ['Advanced analytics','Priority support','Premium themes','Link health placeholder']],
  ['Lifetime','Manual','Sekali bayar, diverifikasi owner.', ['Lifetime badge','Manual approval','Premium tools','Future access']]
]
export default function Pricing(){return <main className="pro-page pro-pricing"><CleanNav/><section className="pro-pricing-hero"><p className="pro-kicker">Pricing</p><h1>Plan yang simpel, jelas, dan tidak menipu.</h1><p>Payment otomatis tidak diklaim aktif kalau gateway belum dipasang. Untuk sekarang premium bisa memakai manual verification by owner.</p></section><section className="pro-plan-grid">{plans.map(([name,price,desc,features],i)=><article key={name} className={`pro-plan ${i===2?'featured':''}`}><small>{name}</small><h2>{price}</h2><p>{desc}</p><ul>{features.map(f=><li key={f}>{f}</li>)}</ul><a className="pro-btn primary" href={i===0?'/register':'/premium'}>{i===0?'Start free':'Open premium'}</a></article>)}</section><section className="pro-card pro-compare"><h2>Manual verification by owner</h2><p>Billing center, payment proof upload, dan webhook scaffold disiapkan. Auto-payment baru disebut aktif kalau payment gateway asli sudah dipasang.</p></section></main>}

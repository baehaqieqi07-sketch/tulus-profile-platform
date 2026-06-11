import { useState } from 'react'
import V7DashboardShell from '../components/V7DashboardShell.jsx'
import BrandIcon from '../components/BrandIcon.jsx'
import SocialIconButton from '../components/SocialIconButton.jsx'
import { BRAND_META } from '../lib/brandIcons.js'

const icons = ['discord','instagram','roblox','spotify','appleMusic','youtube','tiktok','x','github','telegram','soundcloud','twitch','steam','pinterest','website','custom','google','email','whatsapp','facebook','snapchat','reddit','linkedin','paypal','dana','gopay','ovo','shopeepay','qris','bank']

export default function LinksPage({ user, profile }) {
  const [selected, setSelected] = useState('discord')
  const [url, setUrl] = useState('')
  const meta = BRAND_META[selected] || BRAND_META.custom
  return <V7DashboardShell user={user} profile={profile} active="Links">
    <section className="v100-links-panel v500-links-panel">
      <p className="v100-kicker">Links Studio</p>
      <h1>Choose the real platform style, then add the URL.</h1>
      <p>Semua tombol app memakai brand icon yang recognizable, ukuran konsisten, hover glow, dan aman untuk public profile.</p>
      <div className="v100-icon-grid v500-icon-grid">{icons.map((x)=><button title={BRAND_META[x]?.label || x} key={x} className={selected===x?'active':''} onClick={()=>setSelected(x)}><BrandIcon name={x} /><small>{BRAND_META[x]?.label || x}</small></button>)}</div>
      <article className="v500-link-editor">
        <div><BrandIcon name={selected} showLabel /><p>Paste URL {meta.label}. TULUS akan menampilkannya sebagai icon/app button rapi di public profile.</p></div>
        <input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder={`https://${meta.label.toLowerCase().replaceAll(' ','')}.com/yourname`} />
        <button>Save {meta.label}</button>
      </article>
      <article className="link-live-preview"><span>Preview modes</span><SocialIconButton link={{ label: meta.label, url: url || 'https://tulus-id.vercel.app', icon: selected, style: 'Glass' }} mode="icon-only" /><SocialIconButton link={{ label: meta.label, url: url || 'https://tulus-id.vercel.app', icon: selected, style: 'Floating pill' }} mode="pill" /></article>
      <button className="v100-custom-link"><BrandIcon name="custom" /> Add Custom URL <small>Use your own URL and choose a matching clean fallback icon.</small></button>
    </section>
  </V7DashboardShell>
}

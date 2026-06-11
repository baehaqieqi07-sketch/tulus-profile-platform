import { useState } from 'react'
import V7DashboardShell from '../components/V7DashboardShell.jsx'
import BrandIcon from '../components/BrandIcon.jsx'
const icons = ['Discord','Instagram','TikTok','YouTube','Spotify','Apple Music','Roblox','GitHub','Telegram','SoundCloud','Twitch','Steam','Pinterest','Website','Email','Custom']
export default function LinksPage({ user, profile }) {
  const [selected, setSelected] = useState('Discord')
  return <V7DashboardShell user={user} profile={profile} active="Links"><section className="v100-links-panel v500-links-panel"><p className="v100-kicker">Links Studio</p><h1>Choose the real platform style, then add the URL.</h1><p>Every app button uses a consistent brand-styled icon, clean spacing, and responsive layout for phone, tablet, and PC.</p><div className="v100-icon-grid v500-icon-grid">{icons.map((x)=><button title={x} key={x} className={selected===x?'active':''} onClick={()=>setSelected(x)}><BrandIcon name={x} /><small>{x}</small></button>)}</div><article className="v500-link-editor"><div><BrandIcon name={selected} showLabel /><p>Paste your {selected} URL. TULUS will show it as a clean public profile icon.</p></div><input placeholder={`https://${selected.toLowerCase().replaceAll(' ','')}.com/yourname`} /><button>Save {selected}</button></article><button className="v100-custom-link"><BrandIcon name="custom" /> Add Custom URL <small>Use your own URL and choose a matching icon.</small></button></section></V7DashboardShell>
}

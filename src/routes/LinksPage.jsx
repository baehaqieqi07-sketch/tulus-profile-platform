import { useMemo, useState } from 'react'
import V7DashboardShell from '../components/V7DashboardShell.jsx'
import BrandIcon from '../components/BrandIcon.jsx'
import SocialIconButton from '../components/SocialIconButton.jsx'
import { BRAND_ICON_NAMES } from '../lib/brandIcons.js'
import { saveUserLists } from '../lib/profileStore.js'
import { safeUrl } from '../lib/sanitize.js'

export default function LinksPage({ user, profile, links = [], setLinks }) {
  const [draft,setDraft] = useState(links || [])
  const [form,setForm] = useState({ label:'Discord', icon:'discord', url:'' })
  const [message,setMessage] = useState('')
  const active = useMemo(()=>draft.filter(x=>x.is_active!==false),[draft])
  function add(){
    if(!form.label.trim()) return setMessage('Label wajib diisi.')
    if(!safeUrl(form.url)) return setMessage('URL harus diawali https:// atau http://')
    const next=[...draft,{...form,id:crypto.randomUUID?.() || Date.now(), is_active:true, sort_order:draft.length+1}]
    setDraft(next); setForm({...form,url:''}); setMessage('Link added. Click Save to publish.')
  }
  async function save(){ setLinks?.(draft); const res=await saveUserLists(user?.id,{links:draft}); setMessage(res?.ok?'Saved.':'Saved locally. Check Supabase if production save is needed.') }
  return (
    <V7DashboardShell user={user} profile={profile} active="Links">
      <header className="pro-dash-hero">
        <div><p className="pro-kicker">Links studio</p><h1>App links harus kelihatan seperti brand asli, bukan icon random.</h1><p>Tambah link, pilih brand, aktif/nonaktif, lalu cek preview public profile. Layout dibuat clean dan aman di HP.</p></div>
        <div className="pro-actions"><button className="pro-btn primary" onClick={save}>Save links</button><a className="pro-btn secondary" href={`/${profile?.username||'bekiw'}`}>Preview</a></div>
      </header>
      {message && <p className="pro-note">{message}</p>}
      <section className="pro-links-layout">
        <main className="pro-panel">
          <div className="pro-panel-head"><h2>Add brand link</h2><span>{draft.length} links</span></div>
          <div className="pro-form-grid">
            <label>Label<input value={form.label} onChange={(e)=>setForm({...form,label:e.target.value})}/></label>
            <label>Brand<select value={form.icon} onChange={(e)=>setForm({...form,icon:e.target.value,label:e.target.value})}>{BRAND_ICON_NAMES.slice(0,45).map(x=><option key={x}>{x}</option>)}</select></label>
            <label className="wide">URL<input value={form.url} onChange={(e)=>setForm({...form,url:e.target.value})} placeholder="https://discord.gg/..."/></label>
          </div>
          <button className="pro-btn primary" onClick={add}>Add link</button>
          <div className="pro-panel-head"><h2>Current links</h2><span>publish-ready</span></div>
          <div className="pro-link-list">
            {draft.length?draft.map((link,i)=><article key={link.id||i}>
              <div className="pro-link-icon"><BrandIcon name={link.icon||link.label} size={24}/></div>
              <div><b>{link.label}</b><small>{link.url || 'No URL'}</small></div>
              <button onClick={()=>setDraft(draft.map((x,idx)=>idx===i?{...x,is_active:x.is_active===false}:x))}>{link.is_active===false?'Enable':'Disable'}</button>
              <button onClick={()=>setDraft(draft.filter((_,idx)=>idx!==i))}>Remove</button>
            </article>):<p className="pro-empty">No links yet. Add Discord, Instagram, Roblox, Spotify, YouTube, TikTok, or Website.</p>}
          </div>
        </main>
        <aside className="pro-link-preview">
          <p className="pro-kicker">Public preview</p>
          <h2>@{profile?.username||'bekiw'}</h2>
          <p>Icon style yang akan dilihat visitor.</p>
          <div className="pro-profile-links">{active.length?active.map((link,i)=><SocialIconButton key={link.id||i} link={link}/>):['discord','instagram','roblox','spotify','youtube','tiktok'].map(x=><SocialIconButton key={x} link={{label:x,icon:x,url:'https://tulus-id.vercel.app'}}/> )}</div>
        </aside>
      </section>
    </V7DashboardShell>
  )
}

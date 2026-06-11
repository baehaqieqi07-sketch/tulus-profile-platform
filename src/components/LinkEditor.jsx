import { useState } from 'react'
import BrandIcon from './BrandIcon.jsx'
import SocialIconButton from './SocialIconButton.jsx'
import { BRAND_META } from '../lib/brandIcons.js'
import { safeUrl } from '../lib/sanitize.js'

const brandOptions = [
  'discord','instagram','roblox','spotify','appleMusic','youtube','tiktok','x','github','telegram','soundcloud','twitch','steam','pinterest','website','custom','google','email','whatsapp','facebook','snapchat','reddit','linkedin','paypal','dana','gopay','ovo','shopeepay','qris','bank'
]
const styleOptions = ['Glass', 'Icon only', 'Bubble glass', 'Floating pill', 'Soft square', 'Minimal row', 'Glow button', 'Pearl button']

export default function LinkEditor({ links = [], setLinks }) {
  const [draft, setDraft] = useState({ label: '', url: '', icon: 'website', style: 'Glass', is_active: true })
  const add = () => {
    const cleaned = safeUrl(draft.url)
    if (!draft.label || !cleaned) return
    setLinks((prev) => [...prev, { ...draft, url: cleaned, id: crypto.randomUUID(), is_active: true, sort_order: prev.length + 1 }])
    setDraft({ label: '', url: '', icon: 'website', style: 'Glass', is_active: true })
  }
  const update = (id, key, value) => setLinks((prev) => prev.map((link) => link.id === id ? { ...link, [key]: key === 'url' ? safeUrl(value) || value : value } : link))
  const remove = (id) => setLinks((prev) => prev.filter((link) => link.id !== id))
  const move = (id, dir) => setLinks((prev) => {
    const list = [...prev].sort((a,b)=>(a.sort_order||0)-(b.sort_order||0))
    const idx = list.findIndex((x)=>x.id===id)
    const target = idx + dir
    if (idx < 0 || target < 0 || target >= list.length) return prev
    const tmp = list[idx]
    list[idx] = list[target]
    list[target] = tmp
    return list.map((item, index) => ({ ...item, sort_order: index + 1 }))
  })
  return (
    <div className="editor-panel link-editor-mega">
      <p className="eyebrow">links & apps</p>
      <h2>Connect softly.</h2>
      <p className="muted">Pilih icon brand yang benar, paste URL aman, lalu preview sebelum public profile.</p>
      <div className="mini-form link-mini-form">
        <input placeholder="Label, contoh: Discord" value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} />
        <input placeholder="https://..." value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
        <select value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value, label: draft.label || BRAND_META[e.target.value]?.label || 'Custom Link' })}>
          {brandOptions.map((name)=><option key={name} value={name}>{BRAND_META[name]?.label || name}</option>)}
        </select>
        <select value={draft.style} onChange={(e) => setDraft({ ...draft, style: e.target.value })}>{styleOptions.map((x)=><option key={x}>{x}</option>)}</select>
        <button className="secondary-button" onClick={add}>Add link</button>
      </div>
      <div className="brand-picker-strip" aria-label="brand icon quick picker">
        {brandOptions.slice(0, 20).map((name) => <button type="button" key={name} className={draft.icon===name?'active':''} onClick={()=>setDraft({ ...draft, icon: name, label: draft.label || BRAND_META[name]?.label || 'Custom Link' })}><BrandIcon name={name} size={34} /><small>{BRAND_META[name]?.label || name}</small></button>)}
      </div>
      <article className="link-live-preview">
        <span>Live preview</span>
        <SocialIconButton link={draft} mode={draft.style?.toLowerCase().includes('pill') ? 'pill' : 'icon-only'} />
      </article>
      <div className="stack-list">
        {links.map((link) => (
          <div className="stack-item link-stack-item" key={link.id}>
            <BrandIcon name={link.icon || link.label} size={36} />
            <input value={link.label} onChange={(e) => update(link.id, 'label', e.target.value)} />
            <input value={link.url} onChange={(e) => update(link.id, 'url', e.target.value)} />
            <select value={link.icon || 'website'} onChange={(e)=>update(link.id, 'icon', e.target.value)}>{brandOptions.map((name)=><option key={name} value={name}>{BRAND_META[name]?.label || name}</option>)}</select>
            <label className="switch-row"><input type="checkbox" checked={link.is_active !== false} onChange={(e) => update(link.id, 'is_active', e.target.checked)} /> active</label>
            <button className="ghost-button" onClick={() => move(link.id, -1)}>up</button>
            <button className="ghost-button" onClick={() => move(link.id, 1)}>down</button>
            <button className="ghost-button" onClick={() => remove(link.id)}>remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}

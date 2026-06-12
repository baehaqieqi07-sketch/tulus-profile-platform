import { useMemo, useState } from 'react'
import V7DashboardShell from '../components/V7DashboardShell.jsx'
import BrandIcon from '../components/BrandIcon.jsx'
import SocialIconButton from '../components/SocialIconButton.jsx'
import PremiumButton from '../components/PremiumButton.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { BRAND_ICON_NAMES, BRAND_META, getBrandMeta } from '../lib/brandIcons.js'
import { saveUserLists } from '../lib/profileStore.js'
import { safeUrl } from '../lib/sanitize.js'
import { useTulusLanguage } from '../lib/i18n.js'

const styles = ['Icon only', 'Bubble glass', 'Floating pill', 'Soft square', 'Minimal row', 'Glow button', 'Pearl button']

export default function LinksPage({ user, profile, links = [], setLinks }) {
  const { t } = useTulusLanguage()
  const [selected, setSelected] = useState('discord')
  const [items, setItems] = useState(() => links?.length ? links : [])
  const [form, setForm] = useState({ label: 'Discord', url: '', style: 'Bubble glass', is_active: true })
  const [message, setMessage] = useState('')
  const meta = getBrandMeta(selected)
  const activeLinks = useMemo(() => items.filter((x)=>x.is_active !== false), [items])

  function choose(brand) {
    const brandMeta = getBrandMeta(brand)
    setSelected(brandMeta.name)
    setForm((prev)=>({ ...prev, label: brandMeta.label }))
  }

  function addLink() {
    const url = safeUrl(form.url)
    if (!url) { setMessage('URL tidak aman. Pakai link http/https dan jangan javascript/data URL.'); return }
    const next = [{ id: crypto.randomUUID(), label: form.label || meta.label, url, icon: selected, app_name: selected, style: form.style, is_active: form.is_active, sort_order: items.length + 1 }, ...items]
    setItems(next)
    setLinks?.(next)
    setForm((prev)=>({ ...prev, url: '' }))
    setMessage('Link added. Click save to publish.')
  }

  function update(id, patch) {
    const next = items.map((item)=>item.id === id ? { ...item, ...patch } : item)
    setItems(next)
    setLinks?.(next)
  }

  function remove(id) {
    const next = items.filter((item)=>item.id !== id).map((item, index)=>({ ...item, sort_order: index + 1 }))
    setItems(next)
    setLinks?.(next)
  }

  function move(id, dir) {
    const idx = items.findIndex((item)=>item.id === id)
    const nextIdx = idx + dir
    if (idx < 0 || nextIdx < 0 || nextIdx >= items.length) return
    const next = [...items]
    const [row] = next.splice(idx, 1)
    next.splice(nextIdx, 0, row)
    const ordered = next.map((item, index)=>({ ...item, sort_order: index + 1 }))
    setItems(ordered)
    setLinks?.(ordered)
  }

  async function save() {
    setMessage('Saving links...')
    const result = await saveUserLists(user?.id, { links: items })
    setMessage(result?.ok ? 'Saved to Supabase.' : 'Saved locally. Check Supabase table/policies for production save.')
  }

  return <V7DashboardShell user={user} profile={profile} active="Links">
    <section className="v100-links-panel v500-links-panel lux-links-studio">
      <div className="lux-links-head"><div><p className="v100-kicker">Links Studio</p><h1>Brand icons harus jelas dan rapi.</h1><p>Tambah social/app links dengan icon recognizable, hover glow, urutan bisa diatur, dan link divalidasi aman.</p></div><PremiumButton onClick={save}>{t('save')}</PremiumButton></div>
      {message ? <p className="lux-save-state">{message}</p> : null}

      <h2>Brand picker</h2>
      <div className="v100-icon-grid v500-icon-grid lux-brand-picker">{BRAND_ICON_NAMES.map((x)=><button title={BRAND_META[x]?.label || x} key={x} className={selected===x?'active':''} onClick={()=>choose(x)}><BrandIcon name={x} /><small>{BRAND_META[x]?.label || x}</small></button>)}</div>

      <section className="lux-link-form glass-card">
        <div><BrandIcon name={selected} size={64} showLabel /></div>
        <label>Label<input value={form.label} onChange={(e)=>setForm({ ...form, label:e.target.value })}/></label>
        <label>URL<input value={form.url} onChange={(e)=>setForm({ ...form, url:e.target.value })} placeholder="https://..."/></label>
        <label>Style<select value={form.style} onChange={(e)=>setForm({ ...form, style:e.target.value })}>{styles.map((x)=><option key={x}>{x}</option>)}</select></label>
        <label className="switch-row"><input type="checkbox" checked={form.is_active} onChange={(e)=>setForm({ ...form, is_active:e.target.checked })}/> Active</label>
        <PremiumButton onClick={addLink}>Add link</PremiumButton>
      </section>

      <section className="lux-link-preview glass-card">
        <h2>Preview</h2>
        <div className="v100-public-icons v500-public-icons lux-public-icon-preview">
          {activeLinks.length ? activeLinks.slice(0, 10).map((link)=><SocialIconButton key={link.id || link.url} link={link} mode="icon-only" />) : <SocialIconButton link={{ label: meta.label, icon: selected, app_name: selected, url: 'https://example.com', style: form.style }} mode="icon-only" />}
        </div>
      </section>

      <section className="lux-link-list">
        <h2>Current links</h2>
        {items.length ? items.map((item, index)=><article key={item.id || item.url} className="glass-card">
          <BrandIcon name={item.icon || item.app_name || item.label} />
          <input value={item.label} onChange={(e)=>update(item.id, { label:e.target.value })}/>
          <input value={item.url} onChange={(e)=>update(item.id, { url:e.target.value })}/>
          <select value={item.style || 'Bubble glass'} onChange={(e)=>update(item.id, { style:e.target.value })}>{styles.map((x)=><option key={x}>{x}</option>)}</select>
          <label><input type="checkbox" checked={item.is_active !== false} onChange={(e)=>update(item.id, { is_active:e.target.checked })}/> active</label>
          <button onClick={()=>move(item.id, -1)} disabled={index===0}>↑</button>
          <button onClick={()=>move(item.id, 1)} disabled={index===items.length-1}>↓</button>
          <button onClick={()=>remove(item.id)}>Remove</button>
        </article>) : <EmptyState title="No links yet" body="Choose a brand above, paste a safe URL, then click Add link." />}
      </section>
    </section>
  </V7DashboardShell>
}

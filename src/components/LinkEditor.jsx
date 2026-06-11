import { useState } from 'react'

export default function LinkEditor({ links, setLinks }) {
  const [draft, setDraft] = useState({ label: '', url: '', icon: '', style: 'Glass' })
  const add = () => {
    if (!draft.label || !draft.url) return
    setLinks((prev) => [...prev, { ...draft, id: crypto.randomUUID(), is_active: true, sort_order: prev.length + 1 }])
    setDraft({ label: '', url: '', icon: '', style: 'Glass' })
  }
  const update = (id, key, value) => setLinks((prev) => prev.map((link) => link.id === id ? { ...link, [key]: value } : link))
  const remove = (id) => setLinks((prev) => prev.filter((link) => link.id !== id))
  return (
    <div className="editor-panel">
      <p className="eyebrow">links</p>
      <h2>Connect softly.</h2>
      <div className="mini-form">
        <input placeholder="Label" value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} />
        <input placeholder="https://..." value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
        <select value={draft.style} onChange={(e) => setDraft({ ...draft, style: e.target.value })}><option>Glass</option><option>Minimal</option><option>Soft glow</option><option>Pearl button</option><option>Floating pill</option></select>
        <button className="secondary-button" onClick={add}>Add link</button>
      </div>
      <div className="stack-list">
        {links.map((link) => (
          <div className="stack-item" key={link.id}>
            <input value={link.label} onChange={(e) => update(link.id, 'label', e.target.value)} />
            <input value={link.url} onChange={(e) => update(link.id, 'url', e.target.value)} />
            <label className="switch-row"><input type="checkbox" checked={link.is_active !== false} onChange={(e) => update(link.id, 'is_active', e.target.checked)} /> active</label>
            <button className="ghost-button" onClick={() => remove(link.id)}>remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}

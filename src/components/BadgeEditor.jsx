import { useState } from 'react'
export default function BadgeEditor({ badges, setBadges }) {
  const [label, setLabel] = useState('')
  const add = () => {
    if (!label.trim()) return
    setBadges((prev) => [...prev, { id: crypto.randomUUID(), label: label.trim(), color: '#f1d8d7', style: 'Pearl', is_active: true, sort_order: prev.length + 1 }])
    setLabel('')
  }
  return (
    <div className="editor-panel">
      <p className="eyebrow">badges</p>
      <h2>Small, not loud.</h2>
      <div className="mini-form inline"><input value={label} maxLength="20" placeholder="calm" onChange={(e) => setLabel(e.target.value)} /><button className="secondary-button" onClick={add}>Add badge</button></div>
      <div className="stack-list">{badges.map((badge) => <div className="stack-item" key={badge.id}><input value={badge.label} onChange={(e) => setBadges((prev) => prev.map((b) => b.id === badge.id ? { ...b, label: e.target.value } : b))} /><input type="color" value={badge.color || '#f1d8d7'} onChange={(e) => setBadges((prev) => prev.map((b) => b.id === badge.id ? { ...b, color: e.target.value } : b))} /><button className="ghost-button" onClick={() => setBadges((prev) => prev.filter((b) => b.id !== badge.id))}>remove</button></div>)}</div>
    </div>
  )
}

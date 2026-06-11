import { useState } from 'react'
export default function GalleryEditor({ gallery, setGallery }) {
  const [draft, setDraft] = useState({ title: '', image_url: '' })
  const add = () => {
    if (!draft.title && !draft.image_url) return
    setGallery((prev) => [...prev, { ...draft, id: crypto.randomUUID(), is_active: true, sort_order: prev.length + 1 }])
    setDraft({ title: '', image_url: '' })
  }
  return (
    <div className="editor-panel">
      <p className="eyebrow">gallery</p>
      <h2>Moments, softly.</h2>
      <div className="mini-form"><input placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /><input placeholder="Image URL" value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} /><button className="secondary-button" onClick={add}>Add moment</button></div>
      <div className="stack-list">{gallery.map((item) => <div className="stack-item" key={item.id}><input value={item.title} onChange={(e) => setGallery((prev) => prev.map((g) => g.id === item.id ? { ...g, title: e.target.value } : g))} /><input value={item.image_url} onChange={(e) => setGallery((prev) => prev.map((g) => g.id === item.id ? { ...g, image_url: e.target.value } : g))} /><button className="ghost-button" onClick={() => setGallery((prev) => prev.filter((g) => g.id !== item.id))}>remove</button></div>)}</div>
    </div>
  )
}

import { useState } from 'react'
import UploadButton from './UploadButton.jsx'
import { uploadUserFile } from '../lib/profileStore.js'
import { previewFile, validateUpload } from '../lib/upload.js'

export default function GalleryEditor({ user, gallery, setGallery }) {
  const [draft, setDraft] = useState({ title: '', image_url: '' })
  const [message, setMessage] = useState('')
  const add = () => {
    if (!draft.title && !draft.image_url) return
    setGallery((prev) => [...prev, { ...draft, id: crypto.randomUUID(), is_active: true, sort_order: prev.length + 1 }])
    setDraft({ title: '', image_url: '' })
  }
  const pick = async (file) => {
    const valid = validateUpload(file, 'image', 8)
    if (!valid.ok) return setMessage(valid.message)
    const item = { id: crypto.randomUUID(), title: file.name.replace(/\.[^.]+$/, ''), image_url: previewFile(file), is_active: true, sort_order: gallery.length + 1 }
    setGallery((prev) => [...prev, item])
    setMessage('Uploading photo...')
    try {
      const url = await uploadUserFile('gallery', user?.id, file)
      setGallery((prev) => prev.map((g) => g.id === item.id ? { ...g, image_url: url } : g))
      setMessage('Photo ready. Click Save.')
    } catch {
      setMessage('Preview ready. Connect Supabase Storage to save online.')
    }
  }
  return (
    <div className="editor-panel">
      <p className="eyebrow">gallery</p>
      <h2>Moments, softly.</h2>
      <UploadButton label="Add Photo" accept="image/jpeg,image/png,image/webp,image/gif" onPick={pick} />
      {message && <p className="muted small">{message}</p>}
      <div className="mini-form"><input placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /><input placeholder="Image URL" value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} /><button className="secondary-button" onClick={add}>Add moment</button></div>
      <div className="stack-list">{gallery.map((item) => <div className="stack-item" key={item.id}><input value={item.title} onChange={(e) => setGallery((prev) => prev.map((g) => g.id === item.id ? { ...g, title: e.target.value } : g))} /><input value={item.image_url} onChange={(e) => setGallery((prev) => prev.map((g) => g.id === item.id ? { ...g, image_url: e.target.value } : g))} /><label className="switch-row"><input type="checkbox" checked={item.is_active !== false} onChange={(e) => setGallery((prev) => prev.map((g) => g.id === item.id ? { ...g, is_active: e.target.checked } : g))} /> active</label><button className="ghost-button" onClick={() => setGallery((prev) => prev.filter((g) => g.id !== item.id))}>remove</button></div>)}</div>
    </div>
  )
}

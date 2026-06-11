import { useState } from 'react'
import ImagePicker from './ImagePicker.jsx'
import { uploadUserFile } from '../lib/profileStore.js'
import { previewFile, validateUpload } from '../lib/upload.js'

export default function AvatarEditor({ user, profile, setProfile }) {
  const [message, setMessage] = useState('')
  const update = (key, value) => setProfile((prev) => ({ ...prev, [key]: value }))
  const pick = async (file) => {
    const valid = validateUpload(file, 'image', 4)
    if (!valid.ok) return setMessage(valid.message)
    setMessage('Uploading avatar...')
    const localPreview = previewFile(file)
    update('avatar_url', localPreview)
    try {
      const url = await uploadUserFile('avatar', user?.id, file)
      update('avatar_url', url)
      setMessage('Avatar ready. Click Save.')
    } catch {
      setMessage('Preview ready. Connect Supabase Storage to save online.')
    }
  }
  return (
    <div className="editor-panel">
      <p className="eyebrow">avatar</p>
      <h2>A soft first look.</h2>
      <ImagePicker label="Choose Avatar" onPick={pick} />
      {message && <p className="muted small">{message}</p>}
      <label>Avatar URL<input value={profile.avatar_url || ''} placeholder="https://..." onChange={(e) => update('avatar_url', e.target.value)} /></label>
      <label>Shape<select value={profile.avatar_shape || 'Circle'} onChange={(e) => update('avatar_shape', e.target.value)}><option>Circle</option><option>Rounded</option><option>Soft square</option></select></label>
      <label className="switch-row"><input type="checkbox" checked={profile.avatar_glow !== false} onChange={(e) => update('avatar_glow', e.target.checked)} /> Avatar glow</label>
    </div>
  )
}

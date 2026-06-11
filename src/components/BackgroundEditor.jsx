import { useState } from 'react'
import UploadButton from './UploadButton.jsx'
import { uploadUserFile } from '../lib/profileStore.js'
import { previewFile, validateUpload } from '../lib/upload.js'

export default function BackgroundEditor({ user, profile, setProfile }) {
  const [message, setMessage] = useState('')
  const update = (key, value) => setProfile((prev) => ({ ...prev, [key]: value }))
  const pick = async (file) => {
    const valid = validateUpload(file, 'image', 10)
    if (!valid.ok) return setMessage(valid.message)
    setMessage('Uploading background...')
    update('background_url', previewFile(file))
    update('background_type', file.type === 'image/gif' ? 'gif' : 'image')
    try {
      const url = await uploadUserFile('background', user?.id, file)
      update('background_url', url)
      setMessage('Background ready. Click Save.')
    } catch {
      setMessage('Preview ready. Connect Supabase Storage to save online.')
    }
  }
  return (
    <div className="editor-panel">
      <p className="eyebrow">background</p>
      <h2>Set the room.</h2>
      <UploadButton label="Choose Background" accept="image/jpeg,image/png,image/webp,image/gif" onPick={pick} />
      {message && <p className="muted small">{message}</p>}
      <label>Background URL<input value={profile.background_url || ''} placeholder="Image, GIF, or video URL" onChange={(e) => update('background_url', e.target.value)} /></label>
      <label>Type<select value={profile.background_type || 'gradient'} onChange={(e) => update('background_type', e.target.value)}><option>gradient</option><option>image</option><option>gif</option><option>video</option></select></label>
      <label>Overlay<input value={profile.background_overlay || ''} onChange={(e) => update('background_overlay', e.target.value)} /></label>
      <label>Blur<input type="range" min="0" max="14" value={profile.background_blur || 0} onChange={(e) => update('background_blur', Number(e.target.value))} /></label>
      <label>Brightness<input type="range" min="40" max="140" value={profile.background_brightness || 100} onChange={(e) => update('background_brightness', Number(e.target.value))} /></label>
      <label>Saturation<input type="range" min="40" max="180" value={profile.background_saturation || 100} onChange={(e) => update('background_saturation', Number(e.target.value))} /></label>
    </div>
  )
}

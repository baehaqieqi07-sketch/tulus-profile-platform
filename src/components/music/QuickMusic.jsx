import { useState } from 'react'
import MusicRecommendationList from './MusicRecommendationList.jsx'
import MusicLinkInput from './MusicLinkInput.jsx'
import MusicUploadButton from './MusicUploadButton.jsx'
import MusicPreview from './MusicPreview.jsx'
import { applyMusicSelection } from '../../lib/music.js'
import { uploadUserFile } from '../../lib/profileStore.js'
import { supabaseReady } from '../../lib/supabase.js'

export default function QuickMusic({ user, profile, setProfile }) {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const useRecommendation = (item) => setProfile((prev) => applyMusicSelection(prev, { kind: 'recommendation', ...item }))
  const useLink = (url) => setProfile((prev) => applyMusicSelection(prev, { kind: 'link', url }))

  const pickFile = async (file) => {
    if (!file) return
    setMessage('')
    setUploading(true)
    try {
      let url = ''
      if (supabaseReady && user?.id) {
        url = await uploadUserFile('music', user.id, file)
      } else {
        url = URL.createObjectURL(file)
        setMessage('Local preview only. Connect Supabase to save this audio online.')
      }
      setProfile((prev) => ({
        ...prev,
        music_source_type: 'direct_audio',
        music_upload_url: url,
        music_url: url,
        music_title: prev.music_title || file.name.replace(/\.(mp3|ogg|wav|m4a|aac|flac)$/i, ''),
        music_artist: prev.music_artist || 'Uploaded audio',
        music_fallback_text: 'tap to play music',
        show_music: true
      }))
    } catch (error) {
      setMessage(error.message || 'Upload failed. Please try another file.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="music-dashboard-grid">
      <section>
        <h3>Recommended music</h3>
        <p className="muted">Use calm placeholders or replace them later with licensed audio from owner dashboard.</p>
        <MusicRecommendationList profile={profile} onUse={useRecommendation} />
      </section>
      <section className="music-side-stack">
        <MusicLinkInput onUse={useLink} />
        <MusicUploadButton onPick={pickFile} uploading={uploading} />
        {message && <p className="soft-error">{message}</p>}
        <MusicPreview profile={profile} />
      </section>
    </div>
  )
}

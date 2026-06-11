import MusicRecommendationList from './MusicRecommendationList.jsx'
import MusicLinkInput from './MusicLinkInput.jsx'
import MusicUploadButton from './MusicUploadButton.jsx'
import MusicPreview from './MusicPreview.jsx'
import { applyMusicSelection } from '../../lib/music.js'

export default function QuickMusic({ profile, setProfile }) {
  const useRecommendation = (item) => setProfile((prev) => applyMusicSelection(prev, { kind: 'recommendation', ...item }))
  const useLink = (url) => setProfile((prev) => applyMusicSelection(prev, { kind: 'link', url }))
  const pickFile = (file) => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setProfile((prev) => ({ ...prev, music_source_type: 'upload', music_upload_url: url, music_url: url, music_title: prev.music_title || file.name.replace(/\.(mp3|ogg|wav)$/i, ''), show_music: true }))
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
        <MusicUploadButton onPick={pickFile} />
        <MusicPreview profile={profile} />
      </section>
    </div>
  )
}

import MusicPlayer from '../MusicPlayer.jsx'

export default function MusicPreview({ profile }) {
  return (
    <div className="music-preview glass-card">
      <p className="eyebrow">preview</p>
      <MusicPlayer profile={profile} entered={false} compact />
      <p className="muted small">Dashboard preview uses manual play only. Autoplay starts only after click-to-enter.</p>
    </div>
  )
}

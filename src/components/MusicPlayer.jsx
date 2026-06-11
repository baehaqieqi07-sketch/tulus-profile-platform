import { useEffect, useRef, useState } from 'react'
import { getProfileMusic } from '../lib/music.js'
import MusicEqualizer from './music/MusicEqualizer.jsx'
import MusicPlatformButton from './music/MusicPlatformButton.jsx'

export default function MusicPlayer({ profile, entered = true, compact = false }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(profile.music_volume ?? 0.55)
  const [error, setError] = useState('')
  const music = getProfileMusic(profile)

  useEffect(() => { setVolume(profile.music_volume ?? 0.55) }, [profile.music_volume])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    setError('')
    setPlaying(false)
    setProgress(0)
  }, [music.url, music.externalUrl])

  useEffect(() => {
    if (!entered || !music.playable || !audioRef.current) return
    audioRef.current.play().then(() => setPlaying(true)).catch(() => {
      setPlaying(false)
      setError(profile.music_fallback_text || 'tap to play music')
    })
  }, [entered, music.playable, music.url, profile.music_fallback_text])

  const toggle = async () => {
    if (!music.playable) {
      setError(music.externalUrl ? `${music.platformName} opens externally.` : 'no music selected')
      return
    }
    try {
      if (audioRef.current.paused) {
        await audioRef.current.play()
        setPlaying(true)
      } else {
        audioRef.current.pause()
        setPlaying(false)
      }
    } catch {
      setError(profile.music_fallback_text || 'tap to play music')
    }
  }

  const onTime = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  if (profile.show_music === false) return null

  return (
    <div className={`music-player ${compact ? 'music-player-compact' : ''}`}>
      {music.playable && <audio ref={audioRef} src={music.url} loop={profile.music_loop !== false} onTimeUpdate={onTime} onError={() => setError('tap to play music')} />}
      <button className="music-button" onClick={toggle} aria-label="Toggle music">{playing ? 'pause' : music.playable ? 'play' : 'open'}</button>
      <div className="music-meta">
        <strong>{music.title}</strong>
        <span>{music.artist}</span>
        {music.playable ? <div className="music-progress"><i style={{ width: `${progress}%` }} /></div> : <small className="muted">{music.platformName}</small>}
      </div>
      {music.playable && <input className="volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => setVolume(Number(e.target.value))} aria-label="Volume" />}
      {profile.music_equalizer_enabled !== false && <MusicEqualizer playing={playing} />}
      {!music.playable && music.externalUrl && <MusicPlatformButton href={music.externalUrl} label={music.openLabel || music.fallbackText || 'Open music'} icon={music.icon} />}
      {error && <small className="soft-error">{error}</small>}
    </div>
  )
}

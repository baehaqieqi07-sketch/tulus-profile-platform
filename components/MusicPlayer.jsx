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

  useEffect(() => {
    setVolume(profile.music_volume ?? 0.55)
  }, [profile.music_volume])

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

    audioRef.current.play()
      .then(() => setPlaying(true))
      .catch(() => {
        setPlaying(false)
        setError(music.fallbackText || 'tap to play music')
      })
  }, [entered, music.playable, music.url, music.fallbackText])

  const toggle = async () => {
    if (!music.playable || !audioRef.current) return

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play()
        setPlaying(true)
      } else {
        audioRef.current.pause()
        setPlaying(false)
      }
    } catch {
      setError(music.fallbackText || 'tap to play music')
    }
  }

  const onTime = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  if (profile.show_music === false) return null
  if (!music.url && !music.externalUrl && !compact) return null

  if (!music.playable && music.externalUrl) {
    return (
      <div className={`music-player music-player-external ${compact ? 'music-player-compact' : ''}`}>
        <div className="music-platform-mark">{music.platformName?.slice(0, 1) || '♪'}</div>
        <div className="music-meta">
          <strong>{music.title || 'external music'}</strong>
          <span>{music.artist || music.platformName || 'music platform'}</span>
          <small className="music-note">Platform links open externally.</small>
        </div>
        <MusicPlatformButton href={music.externalUrl} label={music.openLabel || music.fallbackText} platform={music.platform} compact={compact} />
      </div>
    )
  }

  return (
    <div className={`music-player ${compact ? 'music-player-compact' : ''}`}>
      {music.playable && (
        <audio
          ref={audioRef}
          src={music.url}
          loop={music.loop}
          onTimeUpdate={onTime}
          onError={() => setError('Audio link could not be played.')}
        />
      )}

      <button className="music-button" onClick={toggle} aria-label="Toggle music" disabled={!music.playable}>
        {playing ? 'pause' : 'play'}
      </button>

      <div className="music-meta">
        <strong>{music.title}</strong>
        <span>{music.artist}</span>
        <div className="music-progress"><i style={{ width: `${progress}%` }} /></div>
      </div>

      <input
        className="volume"
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={(event) => setVolume(Number(event.target.value))}
        aria-label="Volume"
      />

      {profile.music_equalizer_enabled !== false && <MusicEqualizer playing={playing} />}
      {error && <small className="soft-error">{error}</small>}
    </div>
  )
}

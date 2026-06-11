import { musicRecommendations } from '../data/musicRecommendations.js'
import { detectMusicLink, isDirectAudioUrl } from './musicLinkDetector.js'

export function getRecommendation(id) {
  return musicRecommendations.find((item) => item.id === id && item.is_active !== false)
}

export function getProfileMusic(profile = {}) {
  const source = profile.music_source_type || (profile.music_url ? 'direct_url' : 'none')
  if (source === 'recommendation') {
    const rec = getRecommendation(profile.music_recommendation_id)
    if (!rec) return { source: 'none', playable: false, url: '', externalUrl: '', title: profile.music_title || 'quiet track', artist: profile.music_artist || 'TULUS' }
    return {
      source,
      playable: isDirectAudioUrl(rec.audio_url),
      url: rec.audio_url || '',
      externalUrl: rec.audio_url || '',
      title: profile.music_title || rec.title,
      artist: profile.music_artist || rec.artist,
      cover: profile.music_cover_url || rec.cover_url || '',
      fallbackText: profile.music_fallback_text || 'tap to play music'
    }
  }
  if (source === 'upload') {
    const url = profile.music_upload_url || profile.music_url || ''
    return { source, playable: isDirectAudioUrl(url), url, externalUrl: url, title: profile.music_title || 'uploaded music', artist: profile.music_artist || 'private audio', cover: profile.music_cover_url || '', fallbackText: profile.music_fallback_text || 'tap to play music' }
  }
  if (source === 'direct_url') {
    const url = profile.music_direct_url || profile.music_url || ''
    return { source, playable: isDirectAudioUrl(url), url, externalUrl: url, title: profile.music_title || 'quiet track', artist: profile.music_artist || 'unknown artist', cover: profile.music_cover_url || '', fallbackText: profile.music_fallback_text || 'tap to play music' }
  }
  if (source === 'external_url') {
    const url = profile.music_external_url || profile.music_url || ''
    const detected = detectMusicLink(url)
    return { source, playable: detected.playable, url: detected.playable ? url : '', externalUrl: url, title: profile.music_title || 'external music', artist: profile.music_artist || detected.label, cover: profile.music_cover_url || '', fallbackText: profile.music_fallback_text || 'open music' }
  }
  return { source: 'none', playable: false, url: '', externalUrl: '', title: profile.music_title || 'no music selected', artist: profile.music_artist || '', cover: profile.music_cover_url || '', fallbackText: profile.music_fallback_text || 'tap to play music' }
}

export function applyMusicSelection(profile, selection) {
  if (!selection) return profile
  if (selection.kind === 'recommendation') {
    return {
      ...profile,
      music_source_type: 'recommendation',
      music_recommendation_id: selection.id,
      music_title: selection.title || profile.music_title,
      music_artist: selection.artist || profile.music_artist,
      music_cover_url: selection.cover_url || profile.music_cover_url,
      show_music: true
    }
  }
  if (selection.kind === 'link') {
    const detected = detectMusicLink(selection.url)
    if (detected.type === 'direct_url') {
      return { ...profile, music_source_type: 'direct_url', music_direct_url: selection.url, music_url: selection.url, show_music: true }
    }
    return { ...profile, music_source_type: 'external_url', music_external_url: selection.url, music_url: selection.url, show_music: true }
  }
  return profile
}

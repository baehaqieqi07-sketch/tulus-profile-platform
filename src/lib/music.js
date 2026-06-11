import { musicRecommendations as localRecommendations } from '../data/musicRecommendations.js'
import { detectMusicPlatform, isDirectAudioUrl } from './musicPlatform.js'

export function getRecommendation(id, recommendations = localRecommendations) {
  return recommendations.find((item) => item.id === id && item.is_active !== false)
}

export function getProfileMusic(profile = {}, recommendations = localRecommendations) {
  const source = profile.music_source_type || (profile.music_url ? 'direct_audio' : 'none')

  if (source === 'recommendation') {
    const rec = getRecommendation(profile.music_recommendation_id, recommendations)
    if (!rec) {
      return {
        source: 'none',
        playable: false,
        url: '',
        externalUrl: '',
        title: profile.music_title || 'quiet track',
        artist: profile.music_artist || 'TULUS',
        fallbackText: profile.music_fallback_text || 'tap to play music',
        platform: 'none',
        platformName: 'No music selected'
      }
    }

    const detected = detectMusicPlatform(rec.audio_url || '')
    return {
      source,
      playable: detected.playable,
      url: detected.playable ? rec.audio_url : '',
      externalUrl: rec.audio_url || '',
      title: profile.music_title || rec.title,
      artist: profile.music_artist || rec.artist || detected.name,
      cover: profile.music_cover_url || rec.cover_url || '',
      fallbackText: profile.music_fallback_text || detected.openLabel || 'open music',
      platform: detected.platform,
      platformName: detected.name,
      openLabel: detected.openLabel,
      icon: detected.icon
    }
  }

  const url = profile.music_url || profile.music_direct_url || profile.music_external_url || profile.music_upload_url || ''
  const detected = detectMusicPlatform(url)
  const playable = source === 'direct_audio' ? isDirectAudioUrl(url) : detected.playable

  if (source === 'direct_audio' || source === 'direct_url' || source === 'upload') {
    return {
      source: 'direct_audio',
      playable,
      url: playable ? url : '',
      externalUrl: url,
      title: profile.music_title || 'My Music',
      artist: profile.music_artist || 'TULUS',
      cover: profile.music_cover_url || '',
      fallbackText: profile.music_fallback_text || 'tap to play music',
      platform: detected.platform,
      platformName: detected.name,
      openLabel: detected.openLabel,
      icon: detected.icon
    }
  }

  if (source === 'external_platform' || source === 'external_url') {
    return {
      source: 'external_platform',
      playable: false,
      url: '',
      externalUrl: url,
      title: profile.music_title || 'External Music',
      artist: profile.music_artist || detected.name,
      cover: profile.music_cover_url || '',
      fallbackText: profile.music_fallback_text || detected.openLabel || 'open music',
      platform: detected.platform,
      platformName: detected.name,
      openLabel: detected.openLabel,
      icon: detected.icon
    }
  }

  return {
    source: 'none',
    playable: false,
    url: '',
    externalUrl: '',
    title: profile.music_title || 'no music selected',
    artist: profile.music_artist || '',
    cover: profile.music_cover_url || '',
    fallbackText: profile.music_fallback_text || 'tap to play music',
    platform: 'none',
    platformName: 'No music selected',
    openLabel: 'open music',
    icon: '♪'
  }
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
      music_url: selection.audio_url || profile.music_url,
      show_music: true
    }
  }

  if (selection.kind === 'link') {
    const url = String(selection.url || '').trim()
    const detected = detectMusicPlatform(url)
    if (!detected.valid) return { ...profile, music_source_type: 'none', music_url: '', show_music: false }

    if (detected.sourceType === 'direct_audio') {
      return {
        ...profile,
        music_source_type: 'direct_audio',
        music_direct_url: url,
        music_url: url,
        music_title: profile.music_title || 'My Music',
        music_artist: profile.music_artist || 'TULUS',
        music_fallback_text: 'tap to play music',
        show_music: true
      }
    }

    return {
      ...profile,
      music_source_type: 'external_platform',
      music_external_url: url,
      music_url: url,
      music_title: profile.music_title || 'External Music',
      music_artist: detected.name,
      music_fallback_text: detected.openLabel,
      show_music: true
    }
  }

  return profile
}

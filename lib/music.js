import { musicRecommendations } from '../data/musicRecommendations.js'
import { detectMusicPlatform, getMusicOpenLabel, isDirectAudioUrl, normalizeMusicSource } from './musicPlatform.js'

export function getRecommendation(id) {
  return musicRecommendations.find((item) => item.id === id && item.is_active !== false)
}

function cleanUrl(value = '') {
  return String(value || '').trim()
}

function baseMusic(profile = {}) {
  return {
    title: profile.music_title || 'quiet track',
    artist: profile.music_artist || 'TULUS',
    cover: profile.music_cover_url || '',
    volume: profile.music_volume ?? 0.55,
    loop: profile.music_loop !== false,
    show: profile.show_music !== false,
    fallbackText: profile.music_fallback_text || 'tap to play music'
  }
}

function makeMusicFromUrl(profile, url, preferredSource = '') {
  const detected = detectMusicPlatform(url)
  const base = baseMusic(profile)

  if (!url || !detected.valid) {
    return {
      ...base,
      source: 'none',
      playable: false,
      url: '',
      externalUrl: '',
      platform: detected.platform,
      platformName: detected.name,
      openLabel: 'Open music link'
    }
  }

  if (detected.playable) {
    return {
      ...base,
      source: 'direct_audio',
      playable: true,
      url,
      externalUrl: '',
      platform: 'direct_audio',
      platformName: 'Direct Audio',
      openLabel: 'Play inside TULUS'
    }
  }

  return {
    ...base,
    source: preferredSource || 'external_platform',
    playable: false,
    url: '',
    externalUrl: url,
    platform: detected.platform,
    platformName: detected.name,
    artist: profile.music_artist || detected.name,
    fallbackText: profile.music_fallback_text || getMusicOpenLabel(detected.platform),
    openLabel: getMusicOpenLabel(detected.platform)
  }
}

export function getProfileMusic(profile = {}) {
  const source = normalizeMusicSource(profile.music_source_type || (profile.music_url ? 'direct_audio' : 'none'))

  if (source === 'recommendation') {
    const rec = getRecommendation(profile.music_recommendation_id)
    const url = cleanUrl(rec?.audio_url || '')
    if (!rec) return makeMusicFromUrl(profile, '', 'none')

    const music = makeMusicFromUrl(
      {
        ...profile,
        music_title: profile.music_title || rec.title,
        music_artist: profile.music_artist || rec.artist,
        music_cover_url: profile.music_cover_url || rec.cover_url
      },
      url,
      'recommendation'
    )

    return {
      ...music,
      source: 'recommendation'
    }
  }

  if (source === 'upload') {
    const url = cleanUrl(profile.music_upload_url || profile.music_url)
    return makeMusicFromUrl(profile, url, 'upload')
  }

  const url = cleanUrl(
    profile.music_url ||
    profile.music_direct_url ||
    profile.music_external_url ||
    profile.music_upload_url ||
    ''
  )

  return makeMusicFromUrl(profile, url, source)
}

export function applyMusicSelection(profile, selection) {
  if (!selection) return profile

  if (selection.kind === 'recommendation') {
    return {
      ...profile,
      music_source_type: 'recommendation',
      music_recommendation_id: selection.id,
      music_url: selection.audio_url || profile.music_url || '',
      music_title: selection.title || profile.music_title,
      music_artist: selection.artist || profile.music_artist,
      music_cover_url: selection.cover_url || profile.music_cover_url,
      show_music: true
    }
  }

  if (selection.kind === 'link') {
    const url = cleanUrl(selection.url)
    const detected = detectMusicPlatform(url)

    if (!detected.valid) {
      return {
        ...profile,
        music_source_type: 'none',
        music_url: '',
        music_direct_url: '',
        music_external_url: '',
        music_fallback_text: 'Paste a valid music link',
        show_music: true
      }
    }

    if (isDirectAudioUrl(url)) {
      return {
        ...profile,
        music_source_type: 'direct_audio',
        music_url: url,
        music_direct_url: url,
        music_external_url: '',
        music_fallback_text: 'tap to play music',
        show_music: true
      }
    }

    return {
      ...profile,
      music_source_type: 'external_platform',
      music_url: url,
      music_direct_url: '',
      music_external_url: url,
      music_artist: profile.music_artist || detected.name,
      music_fallback_text: getMusicOpenLabel(detected.platform),
      show_music: true
    }
  }

  return profile
}

const DIRECT_AUDIO_RE = /\.(mp3|ogg|wav|m4a|aac|flac)(\?.*)?$/i

const PLATFORM_RULES = [
  { platform: 'youtube_music', name: 'YouTube Music', openLabel: 'Open on YouTube Music', hosts: ['music.youtube.com'], icon: '▶' },
  { platform: 'youtube', name: 'YouTube', openLabel: 'Open on YouTube', hosts: ['youtube.com', 'youtu.be', 'www.youtube.com'], icon: '▶' },
  { platform: 'spotify', name: 'Spotify', openLabel: 'Open on Spotify', hosts: ['spotify.com', 'open.spotify.com'], icon: '♬' },
  { platform: 'tiktok', name: 'TikTok', openLabel: 'Open on TikTok', hosts: ['tiktok.com', 'www.tiktok.com', 'vm.tiktok.com'], icon: '♪' },
  { platform: 'soundcloud', name: 'SoundCloud', openLabel: 'Open on SoundCloud', hosts: ['soundcloud.com', 'www.soundcloud.com'], icon: '☁' },
  { platform: 'apple_music', name: 'Apple Music', openLabel: 'Open on Apple Music', hosts: ['music.apple.com'], icon: '' },
  { platform: 'instagram', name: 'Instagram', openLabel: 'Open on Instagram', hosts: ['instagram.com', 'www.instagram.com'], icon: '◎' },
  { platform: 'deezer', name: 'Deezer', openLabel: 'Open on Deezer', hosts: ['deezer.com', 'www.deezer.com'], icon: '◆' },
  { platform: 'joox', name: 'Joox', openLabel: 'Open on Joox', hosts: ['joox.com', 'www.joox.com'], icon: '♫' }
]

export function isHttpUrl(value = '') {
  try {
    const url = new URL(String(value).trim())
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function isDirectAudioUrl(value = '') {
  return isHttpUrl(value) && DIRECT_AUDIO_RE.test(String(value).trim())
}

export function getHostname(value = '') {
  try {
    return new URL(String(value).trim()).hostname.replace(/^www\./i, '').toLowerCase()
  } catch {
    return ''
  }
}

export function detectMusicPlatform(value = '') {
  const url = String(value || '').trim()

  if (!url) {
    return {
      sourceType: 'none',
      platform: 'none',
      name: 'No music selected',
      playable: false,
      valid: false,
      openLabel: 'Open music',
      icon: '♪'
    }
  }

  if (!isHttpUrl(url)) {
    return {
      sourceType: 'none',
      platform: 'invalid',
      name: 'Invalid music link',
      playable: false,
      valid: false,
      openLabel: 'Open music',
      icon: '♪'
    }
  }

  if (isDirectAudioUrl(url)) {
    return {
      sourceType: 'direct_audio',
      platform: 'direct_audio',
      name: 'Direct Audio',
      playable: true,
      valid: true,
      openLabel: 'Play inside TULUS',
      icon: '♫'
    }
  }

  const hostname = getHostname(url)
  const matched = PLATFORM_RULES.find((item) => item.hosts.some((host) => hostname === host || hostname.endsWith(`.${host}`)))

  if (matched) {
    return {
      sourceType: 'external_platform',
      platform: matched.platform,
      name: matched.name,
      playable: false,
      valid: true,
      openLabel: matched.openLabel,
      icon: matched.icon
    }
  }

  return {
    sourceType: 'external_platform',
    platform: 'external_link',
    name: 'External Music Link',
    playable: false,
    valid: true,
    openLabel: 'Open music',
    icon: '↗'
  }
}

export function getMusicOpenLabel(platform = 'external_link') {
  if (platform === 'direct_audio') return 'Play inside TULUS'
  const matched = PLATFORM_RULES.find((item) => item.platform === platform)
  return matched?.openLabel || 'Open music'
}

export function detectMusicLink(value = '') {
  const detected = detectMusicPlatform(value)
  return {
    type: detected.sourceType === 'direct_audio' ? 'direct_url' : detected.sourceType,
    playable: detected.playable,
    label: detected.name,
    platform: detected.platform,
    openText: detected.openLabel,
    sourceType: detected.sourceType,
    valid: detected.valid,
    icon: detected.icon
  }
}

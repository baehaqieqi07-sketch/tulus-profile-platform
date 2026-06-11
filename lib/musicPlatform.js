const DIRECT_AUDIO_EXTENSIONS = /\.(mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i

const PLATFORM_RULES = [
  { platform: 'youtube_music', name: 'YouTube Music', icon: '▶︎', hosts: ['music.youtube.com'] },
  { platform: 'youtube', name: 'YouTube', icon: '▶︎', hosts: ['youtube.com', 'youtu.be'] },
  { platform: 'spotify', name: 'Spotify', icon: '◉', hosts: ['spotify.com', 'open.spotify.com'] },
  { platform: 'tiktok', name: 'TikTok', icon: '♪', hosts: ['tiktok.com', 'vm.tiktok.com'] },
  { platform: 'soundcloud', name: 'SoundCloud', icon: '〰', hosts: ['soundcloud.com'] },
  { platform: 'apple_music', name: 'Apple Music', icon: '', hosts: ['music.apple.com'] },
  { platform: 'instagram', name: 'Instagram', icon: '◎', hosts: ['instagram.com'] },
  { platform: 'deezer', name: 'Deezer', icon: '▦', hosts: ['deezer.com'] },
  { platform: 'joox', name: 'Joox', icon: '♫', hosts: ['joox.com'] }
]

function parseUrl(value = '') {
  try {
    const url = new URL(String(value).trim())
    if (!['http:', 'https:'].includes(url.protocol)) return null
    return url
  } catch {
    return null
  }
}

function cleanHost(hostname = '') {
  return hostname.replace(/^www\./i, '').toLowerCase()
}

function hostMatches(hostname, expectedHost) {
  return hostname === expectedHost || hostname.endsWith(`.${expectedHost}`)
}

export function isDirectAudioUrl(url = '') {
  const parsed = parseUrl(url)
  return Boolean(parsed && DIRECT_AUDIO_EXTENSIONS.test(parsed.pathname + parsed.search))
}

export function detectMusicPlatform(url = '') {
  const value = String(url || '').trim()

  if (!value) {
    return {
      type: 'none',
      sourceType: 'none',
      platform: 'none',
      name: 'No music selected',
      icon: '♪',
      playable: false,
      valid: false
    }
  }

  const parsed = parseUrl(value)
  if (!parsed) {
    return {
      type: 'invalid',
      sourceType: 'none',
      platform: 'invalid',
      name: 'Invalid music link',
      icon: '!',
      playable: false,
      valid: false
    }
  }

  if (isDirectAudioUrl(value)) {
    return {
      type: 'direct_audio',
      sourceType: 'direct_audio',
      platform: 'direct_audio',
      name: 'Direct Audio',
      icon: '♪',
      playable: true,
      valid: true
    }
  }

  const hostname = cleanHost(parsed.hostname)
  const matched = PLATFORM_RULES.find((rule) => rule.hosts.some((host) => hostMatches(hostname, host)))

  if (matched) {
    return {
      type: 'external_platform',
      sourceType: 'external_platform',
      platform: matched.platform,
      name: matched.name,
      icon: matched.icon,
      playable: false,
      valid: true
    }
  }

  return {
    type: 'external_platform',
    sourceType: 'external_platform',
    platform: 'external',
    name: 'External Music Link',
    icon: '↗',
    playable: false,
    valid: true
  }
}

export function getMusicOpenLabel(platform = 'external') {
  const found = PLATFORM_RULES.find((rule) => rule.platform === platform)
  if (found) return `Open on ${found.name}`
  if (platform === 'direct_audio') return 'Play inside TULUS'
  return 'Open music link'
}

export function normalizeMusicSource(source = '') {
  if (source === 'direct_url') return 'direct_audio'
  if (source === 'external_url') return 'external_platform'
  return source || 'none'
}

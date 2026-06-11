const DIRECT_AUDIO_RE = /\.(mp3|ogg|wav)(\?.*)?$/i
const EXTERNAL_HOST_RE = /(youtube\.com|youtu\.be|spotify\.com|music\.apple\.com|soundcloud\.com)/i

export function isHttpUrl(value = '') {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function isDirectAudioUrl(value = '') {
  return isHttpUrl(value) && DIRECT_AUDIO_RE.test(value.trim())
}

export function detectMusicLink(value = '') {
  const url = value.trim()
  if (!url) return { type: 'empty', playable: false, label: 'no music selected' }
  if (!isHttpUrl(url)) return { type: 'invalid', playable: false, label: 'unknown link' }
  if (isDirectAudioUrl(url)) return { type: 'direct_url', playable: true, label: 'direct audio' }
  if (EXTERNAL_HOST_RE.test(url)) return { type: 'external_url', playable: false, label: 'external music link' }
  return { type: 'external_url', playable: false, label: 'custom music link' }
}

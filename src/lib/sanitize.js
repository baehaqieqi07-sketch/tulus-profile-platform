const HTML_RE = /<[^>]*>?/gm
const ENTITY_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;'
}

export function stripHtml(value = '') {
  return String(value).replace(HTML_RE, '').trim()
}

export function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ENTITY_MAP[char])
}

export function cleanText(value = '', max = 160) {
  return escapeHtml(stripHtml(value)).slice(0, max)
}

export function isSafeUrl(url = '') {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

export function safeUrl(url = '') {
  return isSafeUrl(url) ? url.trim() : ''
}

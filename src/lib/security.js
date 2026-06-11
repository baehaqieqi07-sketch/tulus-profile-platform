import { ACCEPTED_UPLOADS } from './limits.js'

export function softError(message = 'Something went quiet. Please try again.') {
  return { ok: false, message }
}

export function canUploadFile(file, type, maxMb = 5) {
  if (!file) return softError('Choose a file first.')
  const accepted = ACCEPTED_UPLOADS[type] || []
  if (!accepted.includes(file.type)) return softError('This file type is not supported.')
  if (file.size > maxMb * 1024 * 1024) return softError(`File is too large. Max ${maxMb}MB.`)
  return { ok: true, message: 'File looks good.' }
}

export function hashText(value = '') {
  let hash = 0
  for (let i = 0; i < value.length; i++) hash = Math.imul(31, hash) + value.charCodeAt(i) | 0
  return `h_${Math.abs(hash).toString(16)}`
}

export const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; connect-src 'self' https://*.supabase.co; img-src 'self' data: https: blob:; media-src 'self' https: blob:; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Cross-Origin-Opener-Policy': 'same-origin'
}

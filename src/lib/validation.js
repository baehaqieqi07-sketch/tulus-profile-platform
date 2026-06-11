import { cleanText, isSafeUrl } from './sanitize.js'
import { LIMITS } from './limits.js'

export const RESERVED_USERNAMES = new Set([
  'admin', 'owner', 'login', 'register', 'dashboard', 'api', 'support', 'billing', 'explore', 'settings', 'tulus', 'official', 'help', 'security', 'root', 'system', 'control', 'tulus-control', 'payment', 'report', 'reports', 'moderator'
])

export function validateUsername(username = '') {
  const value = String(username).toLowerCase().trim()
  if (!value) return 'Username is required.'
  if (value.length > LIMITS.usernameMax) return 'Username is too long.'
  if (!/^[a-z0-9._]+$/.test(value)) return 'Use letters, numbers, dots, or underscores only.'
  if (value.includes('..')) return 'Username cannot contain double dots.'
  if (RESERVED_USERNAMES.has(value)) return 'This username is reserved.'
  return ''
}

export function normalizeUsername(username = '') {
  return String(username).toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9._]/g, '').slice(0, LIMITS.usernameMax)
}

export function validateProfile(profile) {
  const errors = {}
  const usernameError = validateUsername(profile.username)
  if (usernameError) errors.username = usernameError
  if (!profile.display_name?.trim()) errors.display_name = 'Display name is required.'
  if (profile.display_name?.length > LIMITS.displayNameMax) errors.display_name = 'Display name is too long.'
  if (profile.bio?.length > LIMITS.bioPremiumMax) errors.bio = 'Bio is too long.'
  return errors
}

export function cleanProfileInput(profile) {
  return {
    ...profile,
    username: normalizeUsername(profile.username),
    display_name: cleanText(profile.display_name, LIMITS.displayNameMax),
    bio: cleanText(profile.bio, LIMITS.bioPremiumMax),
    music_url: profile.music_url && isSafeUrl(profile.music_url) ? profile.music_url.trim() : profile.music_url
  }
}

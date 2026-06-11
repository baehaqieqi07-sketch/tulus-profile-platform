export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''

export function isTurnstileConfigured() {
  return Boolean(TURNSTILE_SITE_KEY)
}

export async function verifyTurnstileToken(token, action = 'generic') {
  if (!token) return { ok: false, message: 'Verification is required.' }
  try {
    const response = await fetch('/functions/v1/verify-turnstile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, action })
    })
    return response.ok ? await response.json() : { ok: false, message: 'Verification failed.' }
  } catch {
    return { ok: false, message: 'Verification service is not ready yet.' }
  }
}

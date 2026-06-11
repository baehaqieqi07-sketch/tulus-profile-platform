import { useEffect, useMemo } from 'react'
import { TURNSTILE_SITE_KEY } from '../lib/turnstile.js'

export default function TurnstileBox({ required = true, onToken }) {
  const callbackName = useMemo(() => `tulusTurnstile_${Math.random().toString(36).slice(2)}`, [])

  useEffect(() => {
    if (!required || !TURNSTILE_SITE_KEY) return
    window[callbackName] = (token) => onToken?.(token)
    if (!document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
    return () => { delete window[callbackName] }
  }, [callbackName, onToken, required])

  if (!required) return null
  const configured = Boolean(TURNSTILE_SITE_KEY)
  return (
    <div className="turnstile-box">
      {configured ? (
        <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-callback={callbackName} />
      ) : (
        <button type="button" className="soft-check" onClick={() => onToken?.('local-demo-token')}>Turnstile demo check</button>
      )}
      <small>{configured ? 'Protected by Cloudflare Turnstile.' : 'Add VITE_TURNSTILE_SITE_KEY to enable real Turnstile.'}</small>
    </div>
  )
}

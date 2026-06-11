import { useState } from 'react'
import TurnstileBox from '../TurnstileBox.jsx'
import { localRateLimit } from '../../lib/rateLimit.js'
import { supabase, supabaseReady } from '../../lib/supabase.js'
import { createLocalUser } from '../../lib/authFlow.js'
import BrandIcon from '../BrandIcon.jsx'

export default function SignInCard({ onLogin, onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [fails, setFails] = useState(0)
  const [token, setToken] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const needsCaptcha = fails >= 3
  const ownerEmail = (import.meta.env.VITE_OWNER_EMAIL || import.meta.env.OWNER_EMAIL || '').toLowerCase()


  const oauthLogin = async (provider) => {
    setMessage('')
    if (!supabaseReady) return setMessage('OAuth needs Supabase env to be active.')
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/account` }
    })
    if (error) setMessage(provider === 'discord' ? 'Discord login is not active yet. Enable it in Supabase providers.' : 'Google login is not active yet. Enable it in Supabase providers.')
  }

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (!localRateLimit(`login:${email}`, 5, 10 * 60 * 1000)) return setMessage('Too many attempts. Please try again later.')
    if (needsCaptcha && !token) return setMessage('Please finish the soft security check.')
    if (!email || !password) { setFails((v) => v + 1); return setMessage('Please check your email or password.') }
    setLoading(true)
    try {
      if (supabaseReady) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) { setFails((v) => v + 1); setMessage('Please check your email or password.'); return }
        onLogin?.({ email: data.user.email, id: data.user.id, role: (email || '').toLowerCase() === ownerEmail ? 'owner' : 'user', onboarded: true, remember })
      } else {
        onLogin?.({ ...createLocalUser(email, (email || '').toLowerCase() === ownerEmail ? 'owner' : 'user'), onboarded: true, remember })
      }
      onSuccess?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={submit}>
      <label>Email<input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Password<input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <div className="auth-row"><label className="switch-row"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me</label><button type="button" className="text-button">Forgot password</button></div>
      <TurnstileBox required={needsCaptcha} onToken={setToken} />
      {message && <p className="soft-error">{message}</p>}
      <button className="primary-button sparkle-button" disabled={loading}>{loading ? 'Entering...' : 'Sign In'}</button>
      <div className="oauth-row"><button type="button" className="secondary-button brand-oauth" onClick={() => oauthLogin('google')}><BrandIcon name="google" /> Continue with Google</button><button type="button" className="secondary-button brand-oauth" onClick={() => oauthLogin('discord')}><BrandIcon name="discord" /> Continue with Discord</button></div>
    </form>
  )
}

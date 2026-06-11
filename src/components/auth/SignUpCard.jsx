import { useState } from 'react'
import TurnstileBox from '../TurnstileBox.jsx'
import { normalizeUsername, validateUsername } from '../../lib/validation.js'
import { localRateLimit } from '../../lib/rateLimit.js'
import { supabase, supabaseReady } from '../../lib/supabase.js'
import { createLocalUser } from '../../lib/authFlow.js'

export default function SignUpCard({ onLogin, onProfilePatch, onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [token, setToken] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const usernameError = validateUsername(form.username)

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (!localRateLimit('register:local', 3, 60 * 60 * 1000)) return setMessage('Too many attempts. Please try again later.')
    if (!token) return setMessage('Please finish the soft security check.')
    if (usernameError) return setMessage(usernameError)
    if (!form.email || !form.password) return setMessage('Please complete your account details.')
    setLoading(true)
    try {
      if (supabaseReady) {
        const { data, error } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { username: form.username } } })
        if (error) { setMessage('We could not create your account right now.'); return }
        onLogin?.({ email: data.user?.email || form.email, id: data.user?.id || crypto.randomUUID(), role: 'user', onboarded: false })
      } else {
        onLogin?.({ ...createLocalUser(form.email, 'user'), onboarded: false })
      }
      onProfilePatch?.({ username: form.username, display_name: form.username })
      onSuccess?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={submit}>
      <label>Email<input type="email" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} /></label>
      <label>Password<input type="password" autoComplete="new-password" value={form.password} onChange={(e) => update('password', e.target.value)} /></label>
      <label>Username<input value={form.username} onChange={(e) => update('username', normalizeUsername(e.target.value))} /><small>{usernameError || `tulus.id/${form.username || 'namauser'}`}</small></label>
      <TurnstileBox required onToken={setToken} />
      {message && <p className="soft-error">{message}</p>}
      <button className="primary-button sparkle-button" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
    </form>
  )
}

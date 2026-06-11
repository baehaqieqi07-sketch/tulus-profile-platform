import { useMemo, useState } from 'react'
import OwnerGuard from '../components/OwnerGuard.jsx'
import TurnstileBox from '../components/TurnstileBox.jsx'
import { musicRecommendations as builtInMusic } from '../data/musicRecommendations.js'

export default function OwnerPanel({ user, profile, setProfile, payments, setPayments, musicRecommendations = [], setMusicRecommendations }) {
  const [token, setToken] = useState('')
  const [logs, setLogs] = useState([])
  const [musicForm, setMusicForm] = useState({ title: '', artist: '', mood: 'calm', category: 'Calm', audio_url: '', cover_url: '', is_premium: false, is_active: true })
  const managedMusic = musicRecommendations.length ? musicRecommendations : builtInMusic
  const stats = useMemo(() => ({ totalUsers: 1, activeProfiles: profile.is_suspended ? 0 : 1, publicProfiles: profile.visibility === 'public' ? 1 : 0, privateProfiles: profile.visibility === 'private' ? 1 : 0, pendingPayments: payments.filter((p) => p.status === 'pending' || p.status === 'draft').length, recommendedMusic: managedMusic.length }), [profile, payments, managedMusic.length])
  const log = (action) => setLogs((prev) => [{ action, created_at: new Date().toISOString(), actor: user.email }, ...prev])
  const approve = (id) => { if (!token) return; setPayments((prev) => prev.map((p) => p.id === id ? { ...p, status: 'approved' } : p)); setProfile((prev) => ({ ...prev, plan: payments.find((p) => p.id === id)?.plan || 'plus' })); log('approve_payment') }
  const reject = (id) => { if (!token) return; setPayments((prev) => prev.map((p) => p.id === id ? { ...p, status: 'rejected' } : p)); log('reject_payment') }
  const addMusic = () => {
    if (!token || !musicForm.title) return
    setMusicRecommendations?.((prev) => [{ ...musicForm, id: crypto.randomUUID(), sort_order: prev.length + 1 }, ...prev])
    setMusicForm({ title: '', artist: '', mood: 'calm', category: 'Calm', audio_url: '', cover_url: '', is_premium: false, is_active: true })
    log('create_music_recommendation')
  }
  const toggleMusic = (id) => { if (!token) return; setMusicRecommendations?.((prev) => (prev.length ? prev : builtInMusic).map((item) => item.id === id ? { ...item, is_active: !item.is_active } : item)); log('toggle_music_recommendation') }
  const deleteMusic = (id) => { if (!token) return; setMusicRecommendations?.((prev) => (prev.length ? prev : builtInMusic).filter((item) => item.id !== id)); log('delete_music_recommendation') }
  return (
    <OwnerGuard user={user}>
      <main className="owner-shell">
        <section className="owner-head glass-card"><div><p className="eyebrow">tulus control</p><h1>Quiet internal dashboard.</h1><p className="muted">This route is not linked publicly. Keep real protection with role checks, RLS, Turnstile, and optional Cloudflare Zero Trust.</p></div><a className="ghost-button" href="/dashboard">Back</a></section>
        <TurnstileBox required onToken={setToken} />
        <section className="stats-grid">{Object.entries(stats).map(([key, value]) => <div className="stat-card glass-card" key={key}><small>{key.replace(/([A-Z])/g, ' $1')}</small><strong>{value}</strong></div>)}</section>
        <section className="owner-grid">
          <article className="owner-card glass-card"><h2>User search</h2><input placeholder="Search email or username" /><div className="stack-item"><strong>@{profile.username}</strong><span>{profile.visibility}</span><button className="secondary-button" onClick={() => { setProfile((p) => ({ ...p, is_suspended: !p.is_suspended })); log(profile.is_suspended ? 'unsuspend_profile' : 'suspend_profile') }}>{profile.is_suspended ? 'Unsuspend' : 'Suspend'}</button><button className="ghost-button" onClick={() => { setProfile((p) => ({ ...p, is_hidden_from_explore: !p.is_hidden_from_explore })); log('toggle_explore_visibility') }}>Hide from explore</button></div></article>
          <article className="owner-card glass-card"><h2>Manual payments</h2>{payments.length ? payments.map((payment) => <div className="stack-item" key={payment.id}><strong>{payment.plan}</strong><span>{payment.status}</span><button className="secondary-button" onClick={() => approve(payment.id)}>Approve</button><button className="ghost-button" onClick={() => reject(payment.id)}>Reject</button></div>) : <p className="muted">No payments yet.</p>}</article>
          <article className="owner-card glass-card owner-music-card"><h2>Recommended Music</h2><p className="muted">Only upload audio you own or can legally use.</p><div className="mini-form"><input placeholder="Title" value={musicForm.title} onChange={(e) => setMusicForm({ ...musicForm, title: e.target.value })} /><input placeholder="Artist" value={musicForm.artist} onChange={(e) => setMusicForm({ ...musicForm, artist: e.target.value })} /><input placeholder="Audio URL .mp3/.ogg/.wav" value={musicForm.audio_url} onChange={(e) => setMusicForm({ ...musicForm, audio_url: e.target.value })} /><input placeholder="Cover URL" value={musicForm.cover_url} onChange={(e) => setMusicForm({ ...musicForm, cover_url: e.target.value })} /><label className="switch-row"><input type="checkbox" checked={musicForm.is_premium} onChange={(e) => setMusicForm({ ...musicForm, is_premium: e.target.checked })} /> Premium</label><button className="secondary-button" onClick={addMusic}>Add music</button></div>{managedMusic.map((item) => <div className="stack-item" key={item.id}><strong>{item.title}</strong><span>{item.category}{item.is_premium ? ' • premium' : ''}</span><button className="ghost-button" onClick={() => toggleMusic(item.id)}>{item.is_active ? 'Disable' : 'Enable'}</button><button className="ghost-button" onClick={() => deleteMusic(item.id)}>Delete</button></div>)}</article>
          <article className="owner-card glass-card"><h2>Reports</h2><div className="stack-item"><strong>demo report</strong><span>pending review</span><button className="secondary-button" onClick={() => log('review_report')}>Review</button></div></article>
          <article className="owner-card glass-card"><h2>Activity logs</h2><div className="log-list">{logs.map((item, i) => <p key={i}><strong>{item.action}</strong><small>{new Date(item.created_at).toLocaleString()}</small></p>)}</div></article>
        </section>
      </main>
    </OwnerGuard>
  )
}

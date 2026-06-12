import { useMemo, useState } from 'react'
import OwnerGuard from '../components/OwnerGuard.jsx'
import TurnstileBox from '../components/TurnstileBox.jsx'
import BekiwAIChat from '../components/BekiwAIChat.jsx'
import PremiumButton from '../components/PremiumButton.jsx'
import BrandIcon from '../components/BrandIcon.jsx'
import { musicRecommendations as builtInMusic } from '../data/musicRecommendations.js'

const featureFlags = ['Maintenance mode placeholder', 'Public explore enabled', 'AI support enabled', 'Manual payment review', 'Reduced motion default on mobile', 'Safe upload validation']
const auditBrands = ['discord','instagram','roblox','spotify','appleMusic','youtube','tiktok','github','google','qris','bank']

export default function OwnerPanel({ user, profile, setProfile, payments = [], setPayments = () => {}, musicRecommendations = [], setMusicRecommendations }) {
  const [token, setToken] = useState('')
  const [logs, setLogs] = useState([])
  const [musicForm, setMusicForm] = useState({ title: '', artist: '', mood: 'calm', category: 'Calm', audio_url: '', cover_url: '', is_premium: false, is_active: true })
  const managedMusic = musicRecommendations.length ? musicRecommendations : builtInMusic
  const stats = useMemo(() => ({ users: 1, profiles: 1, public: profile.visibility === 'public' ? 1 : 0, private: profile.visibility === 'private' ? 1 : 0, views: Number(profile.views || 0), payments: payments.length, reports: 1, music: managedMusic.length, premium: profile.plan === 'premium' ? 1 : 0, logs: logs.length }), [profile, payments.length, managedMusic.length, logs.length])
  const log = (action) => setLogs((prev) => [{ action, created_at: new Date().toISOString(), actor: user?.email || 'owner' }, ...prev])
  const addMusic = () => { if (!token || !musicForm.title) return; setMusicRecommendations?.((prev) => [{ ...musicForm, id: crypto.randomUUID(), sort_order: prev.length + 1 }, ...prev]); setMusicForm({ title: '', artist: '', mood: 'calm', category: 'Calm', audio_url: '', cover_url: '', is_premium: false, is_active: true }); log('create_music_recommendation') }
  const addPayment = () => { setPayments((prev)=>[{ id: crypto.randomUUID(), status: 'pending', plan: 'Pro', created_at: new Date().toISOString() }, ...prev]); log('create_manual_payment_placeholder') }

  return <OwnerGuard user={user}>
    <main className="v100-owner lux-owner-shell">
      <section className="v100-owner-head lux-owner-head"><div><p className="v100-kicker">TULUS Control</p><h1>Owner dashboard</h1><p>Hidden owner panel for platform overview, profiles, payments, music, AI settings, language settings, feature flags, and logs. User biasa tetap melihat page not found.</p></div><a className="v100-secondary" href="/account">Back to account</a></section>
      <TurnstileBox required onToken={setToken} />
      <section className="v100-owner-stats lux-owner-stats">{Object.entries(stats).map(([k,v])=><article key={k}><small>{k}</small><b>{v}</b></article>)}</section>
      <section className="v100-owner-grid lux-owner-grid">
        <article><h2>Platform overview</h2><p>Domain: tulus-id.vercel.app</p><p>Owner: {user?.email}</p><p>Public profile: /{profile.username || 'bekiw'}</p><p>Environment secrets stay server-side only.</p></article>
        <article><h2>User & Profile Control</h2><input placeholder="Search email or username"/><div className="v100-stack"><b>@{profile.username}</b><span>{profile.visibility}</span><button onClick={() => { setProfile((p)=>({...p,is_suspended:!p.is_suspended})); log('toggle_suspend') }}>{profile.is_suspended ? 'Unsuspend' : 'Suspend'}</button><button onClick={() => { setProfile((p)=>({...p,is_hidden_from_explore:!p.is_hidden_from_explore})); log('toggle_explore') }}>Hide Explore</button></div></article>
        <article><h2>Feature flags</h2>{featureFlags.map((x,i)=><label key={x}><input type="checkbox" defaultChecked={i>0}/> {x}</label>)}</article>
        <article><h2>Premium plan manager</h2>{['Free','Plus','Pro','Lifetime'].map((plan)=><button key={plan} onClick={()=>{ setProfile((p)=>({...p, plan: plan.toLowerCase()})); log(`set_plan_${plan.toLowerCase()}`) }}>{plan}</button>)}<p>Payment real tetap butuh gateway key dan webhook aktif.</p></article>
        <article><h2>Payment manual approval</h2><PremiumButton onClick={addPayment}>Create demo payment</PremiumButton><div className="v100-mini-list">{payments.slice(0,4).map((p)=><p key={p.id}><b>{p.plan}</b><span>{p.status}</span></p>)}</div></article>
        <article><h2>Recommended Music</h2><input placeholder="Title" value={musicForm.title} onChange={(e)=>setMusicForm({...musicForm,title:e.target.value})}/><input placeholder="Artist" value={musicForm.artist} onChange={(e)=>setMusicForm({...musicForm,artist:e.target.value})}/><input placeholder="Audio URL" value={musicForm.audio_url} onChange={(e)=>setMusicForm({...musicForm,audio_url:e.target.value})}/><button onClick={addMusic}>Add Music</button><div className="v100-mini-list">{managedMusic.slice(0,5).map((m)=><p key={m.id}><b>{m.title}</b><span>{m.category}</span></p>)}</div></article>
        <article><h2>bekiw AI settings</h2><p>Use OPENAI_API_KEY and OPENAI_MODEL in Supabase Edge Function Secrets. If empty, fallback AI stays active.</p><BekiwAIChat compact /></article>
        <article><h2>Language settings</h2><p>Languages: Indonesia, English, Japanese, Korean, Arabic, Spanish, Portuguese, French, German, Thai, Vietnamese.</p><p>Arabic uses RTL direction.</p></article>
        <article><h2>Brand icon audit</h2><div className="lux-brand-audit">{auditBrands.map((b)=><span key={b}><BrandIcon name={b}/>{b}</span>)}</div></article>
        <article><h2>Broken link checker placeholder</h2><p>UI ready. Real checker should run server-side to avoid exposing secrets and avoid client spam.</p></article>
        <article><h2>Reports</h2><div className="v100-stack"><b>demo report</b><span>pending review</span><button onClick={()=>log('review_report')}>Review</button></div></article>
        <article><h2>Activity Logs</h2>{logs.length ? logs.map((x,i)=><p key={i}><b>{x.action}</b><small>{new Date(x.created_at).toLocaleString()}</small></p>) : <p>No owner actions yet.</p>}</article>
      </section>
    </main>
  </OwnerGuard>
}

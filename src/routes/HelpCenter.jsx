import { useMemo, useState } from 'react'
import BekiwAIChat from '../components/BekiwAIChat.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

const guides = [
  ['Account Setup', 'Create account, verify email, connect Google/Discord, and enter onboarding.'],
  ['Profile Design', 'Set fullscreen background, avatar, bio, card style, and public visibility.'],
  ['Music System', 'Direct MP3 plays inside TULUS. YouTube, Spotify, TikTok open as premium buttons.'],
  ['Links Studio', 'Add Discord, Instagram, Roblox, Spotify, Apple Music, YouTube, TikTok, and custom URLs.'],
  ['Effects Studio', 'Control bokeh, star dust, floating orb, button ripple, cursor, and reduce motion.'],
  ['Game Center', 'Play Focus Tap, Memory Light, Aura Match, and Word Flow without leaving the platform.'],
  ['Analytics', 'Profile views, link clicks, music plays, device view, and leaderboard flow.'],
  ['Owner Panel', 'Hidden /tulus-control for users, reports, payments, recommendations, and platform settings.'],
  ['Security', 'Supabase RLS, Storage policies, Turnstile, safe upload, and no secret key in frontend.']
]
const quick = ['Login gagal', 'Music tidak bunyi', 'Upload background', 'Owner panel 404', 'Profile views', 'Google/Discord login', 'Ganti bahasa', 'Game Center']

export default function HelpCenter() {
  const { t } = useTulusLanguage()
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => guides.filter(([a,b]) => `${a} ${b}`.toLowerCase().includes(query.toLowerCase())), [query])
  return (
    <V7GlowBackground className="v100-help v500-help million-help">
      <aside className="v100-doc-side v500-doc-side"><a className="v100-brand" href="/"><TulusLogo /> </a><a>Getting Started</a><a>Account</a><a>Profile</a><a>Music</a><a>Uploads</a><a>Games</a><a>Premium</a><a>Security</a><a>Owner</a></aside>
      <section className="v100-help-main v500-help-main">
        <div className="v500-help-top"><div><p className="v100-kicker">{t('help')}</p><h1>{t('askBekiw')}.</h1><p>bekiw understands the full TULUS flow: landing, auth, onboarding, dashboard, profile, music, upload, language, games, owner panel, premium, security, and common setup problems.</p></div><LanguageSwitcher /></div>
        <div className="v500-help-search"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder={t('searchHelp')} /><button>Search</button></div>
        <div className="v500-quick-help">{quick.map((x)=><button key={x} onClick={()=>setQuery(x)}>{x}</button>)}</div>
        <BekiwAIChat />
        <h2>Guides & Tutorials</h2>
        <div className="v100-doc-grid v500-doc-grid million-doc-grid">{filtered.map(([title, desc]) => <article key={title}><b>✦ {title}</b><span>{desc}</span><a>Open guide</a></article>)}</div>
      </section>
    </V7GlowBackground>
  )
}

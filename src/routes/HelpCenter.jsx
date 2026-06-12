import { useMemo, useState } from 'react'
import BekiwAIChat from '../components/BekiwAIChat.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import PremiumButton from '../components/PremiumButton.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

const categories = [
  ['Getting Started', 'Register, login, onboarding, and first publish.', '✦'],
  ['Account', 'Email login, Google/Discord provider, sessions, and settings.', '◇'],
  ['Profile', 'Avatar, display name, bio, visibility, layouts, and badges.', '◎'],
  ['Upload', 'Avatar, background, gallery, music cover, and safe file types.', '↑'],
  ['Music', 'Direct MP3/WAV/OGG/M4A, external platforms, volume, loop, cover.', '♪'],
  ['Links & Apps', 'Discord, Instagram, Roblox, Spotify, Apple Music, and custom links.', '↗'],
  ['Language', 'Change UI language and keep it after refresh.', '文'],
  ['Themes', 'Blue glass, black pearl, accent, overlay, and layout mood.', '◐'],
  ['Effects', 'Bokeh, star dust, glow, ripple, cursor, and reduced motion.', '✺'],
  ['Cursor', 'PC glow cursor, trail, magnetic hover, and toggle.', '⌖'],
  ['Privacy', 'Public/private/unlisted profile and safe data display.', '▣'],
  ['Premium', 'Free, Plus, Pro, Lifetime, plan cards, and placeholders.', '◆'],
  ['Billing', 'Manual proof, checkout placeholder, payment status, and webhook scaffold.', '₿'],
  ['Games', 'Focus Tap, Memory Light, Aura Match, Word Flow, streak, best score.', '◈'],
  ['Troubleshooting', 'Blank page, upload failed, music silent, login redirect, SQL error.', '!'],
  ['Safety', 'RLS, storage policies, secret keys, safe URL, and no raw HTML.', '□']
]

const popular = [
  ['cara ubah background?', 'Buka Customize → Choose Background → pilih file → Save → cek /bekiw.'],
  ['cara tambah link Discord?', 'Buka Links → pilih Discord → isi URL → Save → cek public profile.'],
  ['kenapa musik YouTube tidak autoplay?', 'Browser dan platform external tidak mengizinkan autoplay. TULUS buka sebagai external button. Untuk play dalam web, pakai file audio direct.'],
  ['cara pakai MP3?', 'Upload MP3/WAV/OGG/M4A di Customize/Music, save, lalu klik enter di public profile agar audio boleh diputar browser.'],
  ['owner panel kok 404?', 'Itu benar untuk user biasa. Owner harus login dengan email owner yang punya role owner.'],
  ['leaderboard kosong?', 'Pastikan profile visibility public, RLS jalan, dan profile punya views real dari visitor.']
]

const quickFixes = [
  ['Blank putih', 'Buka Inspect → Console, cek env Vercel dan Supabase URL/anon key.'],
  ['Upload gagal', 'Cek bucket avatars/backgrounds/gallery/profile-music dan storage-policies.sql.'],
  ['Login gagal', 'Cek Authentication → URL Configuration dan Redirect URL domain utama.'],
  ['AI fallback', 'Isi OPENAI_API_KEY dan OPENAI_MODEL di Supabase Edge Function Secrets.'],
  ['Views tidak naik', 'Cek function increment_profile_view dan cooldown localStorage.'],
  ['Icon tidak sesuai', 'Pilih brand yang benar di Links Studio. Fallback dipakai untuk brand tidak dikenal.']
]

export default function HelpCenter() {
  const { t } = useTulusLanguage()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('Getting Started')
  const searchable = [...categories.map(([title, body]) => ({ type: 'Category', title, body })), ...popular.map(([title, body]) => ({ type: 'FAQ', title, body })), ...quickFixes.map(([title, body]) => ({ type: 'Quick Fix', title, body }))]
  const results = useMemo(() => searchable.filter((item) => `${item.title} ${item.body} ${item.type}`.toLowerCase().includes(query.toLowerCase())), [query])
  const activeBody = categories.find(([name]) => name === active)?.[1]

  return (
    <V7GlowBackground className="lux-help-page v100-help v500-help million-help">
      <aside className="v100-doc-side v500-doc-side lux-help-side">
        <a className="v100-brand" href="/"><TulusLogo /></a>
        {categories.map(([name]) => <button key={name} className={active === name ? 'active' : ''} onClick={() => setActive(name)}>{name}</button>)}
      </aside>
      <section className="v100-help-main v500-help-main lux-help-main">
        <div className="v500-help-top lux-help-hero">
          <div>
            <p className="v100-kicker">{t('help')}</p>
            <h1>{t('askBekiw')}.</h1>
            <p>Search help, read quick fixes, or chat with bekiw. The help center covers profile, uploads, music, links, language, games, privacy, premium, billing, and safe setup.</p>
          </div>
          <LanguageSwitcher />
        </div>

        <div className="v500-help-search lux-help-search"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder={t('searchHelp')} /><PremiumButton type="button" onClick={() => setQuery(query)}>{t('search')}</PremiumButton></div>
        <div className="v500-quick-help lux-help-chips">{popular.map(([x])=><button key={x} onClick={()=>setQuery(x)}>{x}</button>)}</div>

        {query ? <section className="lux-search-results"><h2>Search result</h2>{results.length ? <div className="million-doc-grid">{results.map((item)=><article key={`${item.type}-${item.title}`}><b>{item.type} • {item.title}</b><span>{item.body}</span><button onClick={()=>setQuery(item.title)}>Ask about this</button></article>)}</div> : <EmptyState title="No help article found" body="Try a simpler keyword like music, upload, login, language, or Discord." />}</section> : null}

        <section className="lux-help-focus glass-card">
          <div><p className="v100-kicker">Selected category</p><h2>{active}</h2><p>{activeBody}</p></div>
          <PremiumButton type="button" variant="secondary" onClick={() => setQuery(active)}>Search this category</PremiumButton>
        </section>

        <section className="lux-help-grid">
          <div>
            <h2>{t('popularQuestions')}</h2>
            <div className="lux-faq-list">{popular.map(([title, body]) => <details key={title}><summary>{title}</summary><p>{body}</p><button>Helpful</button><button>Not helpful</button></details>)}</div>
          </div>
          <div>
            <h2>{t('quickFixes')}</h2>
            <div className="lux-fix-list">{quickFixes.map(([title, body]) => <article key={title}><b>{title}</b><p>{body}</p></article>)}</div>
          </div>
        </section>

        <BekiwAIChat />

        <section className="lux-help-bottom">
          <article className="glass-card"><b>Status system placeholder</b><p>Use this for uptime, Supabase, Vercel, Auth, and Storage notes later.</p></article>
          <article className="glass-card"><b>Contact support placeholder</b><p>Form UI is ready. Real email/ticket service needs provider key.</p></article>
          <article className="glass-card"><b>Report bug placeholder</b><p>Attach screenshot placeholder is ready inside bekiw chat.</p></article>
        </section>
      </section>
    </V7GlowBackground>
  )
}

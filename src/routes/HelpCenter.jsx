import { useMemo, useState } from 'react'
import BekiwAIChat from '../components/BekiwAIChat.jsx'
import TulusNav from '../components/TulusNav.jsx'
import PremiumButton from '../components/PremiumButton.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

const categories = [
  ['Getting Started', 'Register, login, onboarding, publish profile.'],
  ['Profile', 'Avatar, background, bio, layouts, badges, quotes.'],
  ['Music', 'MP3 direct audio, external music buttons, volume, loop.'],
  ['Links & Apps', 'Discord, Instagram, Roblox, Spotify, YouTube, custom links.'],
  ['Premium', 'Plans, proof upload, manual verification by owner.'],
  ['Troubleshooting', 'Blank page, login redirect, upload failed, Supabase RLS.']
]
const faq = [
  ['cara ubah background?', 'Buka Customize → Upload Background → pilih gambar → Save → cek profile publik.'],
  ['cara tambah link Discord?', 'Buka Links → pilih Discord → isi URL → Add link → Save.'],
  ['kenapa YouTube tidak autoplay?', 'External platform tidak boleh dipaksa autoplay. Pakai direct MP3/WAV/OGG/M4A untuk player dalam web.'],
  ['profile /bekiw tidak muncul?', 'Pastikan username bekiw ada di Supabase profiles dan visibility public.'],
  ['AI bekiw fallback?', 'Isi OPENAI_API_KEY dan OPENAI_MODEL di Supabase Edge Function Secrets kalau mau AI real.']
]

export default function HelpCenter() {
  const { t } = useTulusLanguage()
  const [query, setQuery] = useState('')
  const data = [...categories.map(([title, body])=>({ type:'Category', title, body })), ...faq.map(([title, body])=>({ type:'FAQ', title, body }))]
  const results = useMemo(()=> data.filter((item)=>`${item.title} ${item.body}`.toLowerCase().includes(query.toLowerCase())), [query])
  return (
    <V7GlowBackground className="luxe-page luxe-help-page-clean">
      <TulusNav />
      <section className="luxe-help-hero-clean">
        <p className="luxe-kicker">Help Center</p>
        <h1>Tanya bekiw atau cari solusi cepat.</h1>
        <p>Help Center dibuat ringkas dan jelas: profile, upload, music, links, premium, games, login, dan troubleshooting.</p>
        <div className="luxe-help-search-clean"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder={t('searchHelp') || 'Cari masalah kamu…'} /><PremiumButton>{t('search') || 'Search'}</PremiumButton></div>
      </section>
      <section className="luxe-help-layout-clean">
        <main>
          {query ? <section className="luxe-help-results-clean"><h2>Search results</h2>{results.length ? results.map((item)=><article key={`${item.type}-${item.title}`}><small>{item.type}</small><b>{item.title}</b><p>{item.body}</p></article>) : <EmptyState title="Belum ketemu" body="Coba keyword: music, upload, login, Discord, background, premium." />}</section> : <section className="luxe-help-category-grid">{categories.map(([title, body])=><button key={title} onClick={()=>setQuery(title)}><b>{title}</b><span>{body}</span></button>)}</section>}
          <section className="luxe-faq-clean"><h2>Popular questions</h2>{faq.map(([title, body])=><details key={title}><summary>{title}</summary><p>{body}</p></details>)}</section>
        </main>
        <aside><BekiwAIChat /></aside>
      </section>
    </V7GlowBackground>
  )
}

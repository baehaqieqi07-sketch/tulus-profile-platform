import { useMemo, useState } from 'react'
import CleanNav from '../components/CleanNav.jsx'
import BekiwAIChat from '../components/BekiwAIChat.jsx'

const categories = [
  ['Getting Started','Buat akun, login, onboarding, dan publish profile pertama.','01'],
  ['Profile','Edit nama, bio, avatar, background, badges, quotes, layout.','02'],
  ['Music','Direct audio bisa play setelah enter; platform luar jadi external.','03'],
  ['Links & Apps','Discord, Instagram, Roblox, Spotify, YouTube, TikTok, Website.','04'],
  ['Upload','Avatar, background, gallery, dan music memakai file picker.','05'],
  ['Privacy','Public, unlisted, private, views, dan owner route aman.','06'],
  ['Premium','Plan Free, Plus, Pro, Lifetime dan verifikasi manual owner.','07'],
  ['Troubleshooting','Blank page, auth error, Supabase env, RLS, storage, deploy.','08']
]
const faq = [
  ['Kenapa YouTube tidak autoplay?', 'Platform luar seperti YouTube/Spotify tidak dipaksa autoplay. Pakai direct MP3/WAV/OGG/M4A untuk player di profile.'],
  ['Cara ubah background?', 'Buka Customize, klik Choose Background, pilih file jpg/png/webp/gif, lalu Save.'],
  ['Kenapa login gagal?', 'Cek Vercel env, Supabase URL/anon key, dan Authentication URL Configuration.'],
  ['Cara agar profile muncul?', 'Pastikan username valid, visibility public, dan route /username tidak bentrok dengan route sistem.']
]

export default function HelpCenter(){
  const [query,setQuery]=useState('')
  const filtered=useMemo(()=>categories.filter(([t,b])=>(t+b).toLowerCase().includes(query.toLowerCase())),[query])
  return <main className="pro-page pro-help"><CleanNav/>
    <section className="pro-help-hero"><p className="pro-kicker">Help Center</p><h1>Butuh bantuan? bekiw bantu dengan alur yang jelas.</h1><p>Cari artikel, cek quick fix, atau chat dengan AI bekiw untuk masalah profile, upload, login, music, deploy, dan premium.</p><div className="pro-search"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari: upload background, music MP3, login, Supabase..."/><button>Search</button></div></section>
    <section className="pro-help-layout"><main><div className="pro-help-grid">{filtered.map(([title,body,num])=><article className="pro-card" key={title}><span>{num}</span><h3>{title}</h3><p>{body}</p></article>)}</div><div className="pro-card pro-faq"><h2>Popular quick fixes</h2>{faq.map(([q,a])=><details key={q} open={query && q.toLowerCase().includes(query.toLowerCase())}><summary>{q}</summary><p>{a}</p></details>)}</div></main><aside className="pro-ai-panel"><BekiwAIChat /></aside></section>
  </main>
}

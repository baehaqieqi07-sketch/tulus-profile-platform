import { useState } from 'react'
import TulusNav from '../components/TulusNav.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import BrandIcon from '../components/BrandIcon.jsx'
import BekiwAIChat from '../components/BekiwAIChat.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

const stats = [['Profile views','2.9M+'], ['Link clicks','1.2M+'], ['Layouts','72+'], ['Effects','64+']]
const features = ['Fullscreen bio page', 'Click to enter', 'Music link & MP3', 'Avatar/background upload', 'Brand icon links', 'Multi-language UI', 'bekiw AI help', 'Game Center', 'Owner control center', 'Analytics & views', 'Cursor studio', 'Premium effects', 'SEO-ready profile', 'Safe upload', 'Private profile', 'Leaderboard']

function PreviewProfile() {
  const icons = ['discord','instagram','roblox','spotify','apple music','youtube']
  return <div className="v500-profile-preview million-preview"><div className="v500-preview-bg"/><button className="v500-preview-volume">◔</button><section><div className="v500-preview-avatar"><TulusLogo compact /></div><h3>bekiw</h3><p>quiet profile space.</p><div>{icons.map((x)=><a key={x}><BrandIcon name={x} /></a>)}</div><small>profile views • music ready • effects on</small></section></div>
}

export default function Landing() {
  const [spotlight, setSpotlight] = useState('Profile')
  const { t } = useTulusLanguage()
  return (
    <V7GlowBackground className="v500-home million-home">
      <TulusNav />
      <section className="v500-hero million-hero">
        <div className="v500-hero-copy">
          <p className="v100-kicker">A quiet profile space</p>
          <h1>{t('heroTitle')}</h1>
          <p>{t('heroBody')}</p>
          <div className="v500-hero-actions"><a className="v100-primary" href="/register">{t('start')}</a><a className="v100-secondary" href="/bekiw">{t('openProfile')}</a></div>
          <div className="v500-feature-strip">{features.slice(0,9).map((x)=><span key={x}>✦ {x}</span>)}</div>
        </div>
        <PreviewProfile />
      </section>
      <section className="v500-stats million-stats">{stats.map(([label,value])=><article key={label}><b>{value}</b><span>{label}</span></article>)}</section>
      <section className="v500-flow million-flow">
        <div><p className="v100-kicker">Clear flow</p><h2>{t('flowTitle')}</h2><p>Landing → Register/Login → Onboarding → Customize → Publish → Analytics → Game Center → Help AI. Everything has one obvious next step.</p></div>
        <div className="v500-flow-steps">{['Landing','Register','Onboarding','Customize','Publish','Analytics','Games','Help AI'].map((x,i)=><button key={x} className={spotlight===x?'active':''} onClick={()=>setSpotlight(x)}><b>{i+1}</b>{x}</button>)}</div>
      </section>
      <section className="v500-dashboard-preview million-dash-preview"><aside><TulusLogo/><a className="active">Overview</a><a>Customize</a><a>Links</a><a>Games</a><a>Analytics</a><a>Settings</a><a>Help AI</a></aside><main><h2>{spotlight} workspace</h2><div className="v500-chart"><i/><i/><i/><i/><i/><i/></div><div className="v500-cards"><article>Profile views</article><article>Link clicks</article><article>Music plays</article><article>Game score</article></div></main></section>
      <section className="v500-ai-section million-ai-section"><div><p className="v100-kicker">Help Center AI</p><h2>{t('aiTitle')}</h2><p>{t('aiBody')}</p><a className="v100-secondary" href="/help">{t('help')}</a></div><BekiwAIChat compact /></section>
      <section className="v500-brand-grid million-brand-grid"><h2>Brand icons stay clean, recognizable, and consistent.</h2><div>{['discord','instagram','roblox','spotify','apple music','youtube','tiktok','telegram','soundcloud','github','twitch','steam','google','website'].map((x)=><article key={x}><BrandIcon name={x} showLabel /></article>)}</div></section>
      <footer className="v500-footer"><TulusLogo/><nav><a href="/help">{t('help')}</a><a href="/games">{t('games')}</a><a href="/pricing">{t('pricing')}</a><a href="/leaderboard">{t('leaderboard')}</a><a href="/login">{t('login')}</a></nav></footer>
    </V7GlowBackground>
  )
}

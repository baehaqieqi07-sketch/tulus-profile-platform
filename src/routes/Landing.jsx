import { useState } from 'react'
import TulusNav from '../components/TulusNav.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import BrandIcon from '../components/BrandIcon.jsx'
import BekiwAIChat from '../components/BekiwAIChat.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'

const stats = [['Profile views','1.8M+'], ['Link clicks','610K+'], ['Layouts','48+'], ['Effects','36+']]
const features = ['Fullscreen bio page', 'Click to enter', 'Music link & MP3', 'Avatar/background upload', 'Brand icon links', 'Multi-language UI', 'bekiw AI help', 'Owner control center', 'Analytics & views', 'Cursor studio', 'Premium effects', 'SEO-ready profile']

function PreviewProfile() {
  const icons = ['discord','instagram','roblox','spotify','apple music']
  return <div className="v500-profile-preview"><div className="v500-preview-bg"/><button className="v500-preview-volume">◔</button><section><div className="v500-preview-avatar"><TulusLogo compact /></div><h3>bekiw</h3><p>quiet profile space.</p><div>{icons.map((x)=><a key={x}><BrandIcon name={x} /></a>)}</div><small>44 views • music ready</small></section></div>
}

export default function Landing() {
  const [spotlight, setSpotlight] = useState('Profile')
  return (
    <V7GlowBackground className="v500-home">
      <TulusNav />
      <section className="v500-hero">
        <div className="v500-hero-copy">
          <p className="v100-kicker">A quiet profile space</p>
          <h1>TULUS makes your profile feel premium from the first click.</h1>
          <p>Build a fullscreen bio page with calm blue glass, music, app links, animations, profile views, owner tools, and bekiw AI help center. Clear flow, no clutter.</p>
          <div className="v500-hero-actions"><a className="v100-primary" href="/register">Create profile</a><a className="v100-secondary" href="/bekiw">View demo profile</a></div>
          <div className="v500-feature-strip">{features.slice(0,6).map((x)=><span key={x}>✦ {x}</span>)}</div>
        </div>
        <PreviewProfile />
      </section>
      <section className="v500-stats">{stats.map(([label,value])=><article key={label}><b>{value}</b><span>{label}</span></article>)}</section>
      <section className="v500-flow">
        <div><p className="v100-kicker">Clear flow</p><h2>From landing to public profile, every step is obvious.</h2><p>No random dashboard. User starts with login/register, passes onboarding, customizes profile, checks analytics, then shares the public link.</p></div>
        <div className="v500-flow-steps">{['Landing','Register','Onboarding','Customize','Publish','Analytics'].map((x,i)=><button key={x} className={spotlight===x?'active':''} onClick={()=>setSpotlight(x)}><b>{i+1}</b>{x}</button>)}</div>
      </section>
      <section className="v500-dashboard-preview"><aside><TulusLogo/><a className="active">Overview</a><a>Customize</a><a>Links</a><a>Analytics</a><a>Settings</a><a>Help AI</a></aside><main><h2>{spotlight} workspace</h2><div className="v500-chart"><i/><i/><i/><i/><i/><i/></div><div className="v500-cards"><article>Profile views</article><article>Link clicks</article><article>Music plays</article></div></main></section>
      <section className="v500-ai-section"><div><p className="v100-kicker">Help Center AI</p><h2>bekiw feels like a normal chat, not a stiff bot.</h2><p>It understands TULUS features and answers in the language the user uses. It can guide login, profile edits, music, uploads, premium, owner panel, and security.</p><a className="v100-secondary" href="/help">Open Help Center</a></div><BekiwAIChat compact /></section>
      <section className="v500-brand-grid"><h2>App icons stay clean and recognizable.</h2><div>{['discord','instagram','roblox','spotify','apple music','youtube','tiktok','telegram','soundcloud','github','twitch','steam'].map((x)=><article key={x}><BrandIcon name={x} showLabel /></article>)}</div></section>
      <footer className="v500-footer"><TulusLogo/><nav><a href="/help">Help</a><a href="/pricing">Pricing</a><a href="/leaderboard">Leaderboard</a><a href="/login">Login</a></nav></footer>
    </V7GlowBackground>
  )
}

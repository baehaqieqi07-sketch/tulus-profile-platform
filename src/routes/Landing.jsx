import TulusNav from '../components/TulusNav.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
import BekiwAIChat from '../components/BekiwAIChat.jsx'

function StatCard({ value, label }) { return <article className="v100-stat"><strong>{value}</strong><span>{label}</span></article> }
function Plan({ premium }) {
  return <article className={`v100-plan ${premium ? 'premium' : ''}`}><span>{premium ? 'Premium' : 'Free'}</span><h3>{premium ? 'Rp29K' : 'Rp0'}<small>{premium ? '/month' : '/forever'}</small></h3><p>{premium ? 'Full blue glass profile, background video, advanced cursor, analytics, and premium motion.' : 'Start with public profile, links, upload image, music fallback, and calm effects.'}</p><ul><li>Fullscreen profile</li><li>{premium ? 'All premium effects' : 'Basic effects'}</li><li>{premium ? 'Advanced analytics' : 'Basic views'}</li><li>{premium ? 'Custom cursor studio' : 'TULUS watermark'}</li></ul><a href={premium ? '/pricing' : '/register'}>{premium ? 'Learn More' : 'Get Started'}</a></article>
}
export default function Landing() {
  return (
    <V7GlowBackground className="v100-landing">
      <TulusNav />
      <section className="v100-hero">
        <p className="v100-kicker">A quiet profile space</p>
        <h1>Everything you need for a calm, premium profile — right here.</h1>
        <p className="v100-hero-copy">Create a fullscreen TULUS page with links, music, avatar, background, blue glass effects, custom cursor, analytics, and an owner dashboard that stays clean.</p>
        <div className="v100-actions"><a className="v100-primary" href="/register">Sign Up For Free</a><a className="v100-secondary" href="/bekiw">View Profile</a></div>
        <div className="v100-hero-stage">
          <div className="v100-browser"><i/><i/><i/><span>tulus.id/bekiw</span></div>
          <div className="v100-stage-body">
            <aside className="v100-dashboard-mini"><b>Account Overview</b><div><span>Username</span><strong>bekiw</strong></div><div><span>Profile Views</span><strong>1,895,641</strong></div><div className="v100-mini-chart"><em/><em/><em/><em/><em/></div></aside>
            <div className="v100-phone-preview"><div className="v100-phone-bg"/><h3>bekiw</h3><p>quiet profile space.</p><div><span>◎</span><span>◆</span><span>☁</span><span>♫</span></div></div>
          </div>
        </div>
      </section>
      <section className="v100-stats"><h2>A platform flow that feels clear from the first click.</h2><p>Landing, login, onboarding, account dashboard, customize studio, links, analytics, premium, help AI, and public profile are designed as one connected system.</p><div><StatCard value="75K+" label="profile spaces"/><StatCard value="1.8M+" label="views ready"/><StatCard value="610K+" label="link clicks"/><StatCard value="50K+" label="premium flows"/></div></section>
      <section className="v100-split"><div><h2>Help Center with bekiw AI.</h2><p>bekiw understands TULUS features: profile flow, dashboard, music, uploads, premium, owner panel, and security. The chat adapts to the user's language.</p><a className="v100-secondary" href="/help">Open Help Center</a></div><BekiwAIChat compact /></section>
      <section className="v100-plan-section"><h2>Plans that look clean, not noisy.</h2><div className="v100-plans"><Plan/><Plan premium/></div></section>
      <footer className="v100-footer"><div><b>◆ TULUS</b><p>Blue glass profile platform with a calm premium flow.</p></div><nav><a href="/help">Help</a><a href="/pricing">Pricing</a><a href="/leaderboard">Leaderboard</a><a href="/login">Login</a></nav></footer>
    </V7GlowBackground>
  )
}

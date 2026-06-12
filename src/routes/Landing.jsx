import TulusNav from '../components/TulusNav.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import BrandIcon from '../components/BrandIcon.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

const apps = ['discord', 'instagram', 'roblox', 'spotify', 'apple music', 'youtube', 'tiktok', 'github']
const features = [
  ['Profile premium', 'Fullscreen bio, click-to-enter, avatar aura, badge, quote, dan background yang tetap kebaca.'],
  ['Links rapi', 'Discord, Instagram, Roblox, Spotify, YouTube, TikTok, website, dan custom link dengan icon jelas.'],
  ['Music mood', 'MP3 direct bisa play setelah enter. YouTube/Spotify tetap jadi tombol external yang aman.'],
  ['Dashboard studio', 'Edit profile, upload, links, effects, analytics, premium, dan help center dalam satu tempat.']
]

function HeroPhone() {
  return (
    <aside className="ot-phone-preview" aria-label="TULUS profile preview">
      <div className="ot-phone-glow" />
      <div className="ot-phone-card">
        <div className="ot-avatar"><TulusLogo compact /></div>
        <p className="ot-mini">@bekiw</p>
        <h2>bekiw</h2>
        <span>quiet profile space.</span>
        <div className="ot-socials">
          {apps.slice(0, 7).map((app) => <i key={app}><BrandIcon name={app} size={18} /></i>)}
        </div>
        <button>click to enter</button>
      </div>
    </aside>
  )
}

export default function Landing() {
  const { t } = useTulusLanguage()
  return (
    <V7GlowBackground className="ot-page ot-landing">
      <TulusNav />
      <section className="ot-hero">
        <div className="ot-hero-copy">
          <p className="ot-kicker">TULUS • ORANG TULUS BLUE GLASS</p>
          <h1>Bikin profile kamu kelihatan mahal, clean, dan hidup.</h1>
          <p className="ot-subtitle">Bio page premium untuk profile fullscreen, music, app links, background, effects, dashboard, game center, dan AI help. Dibuat rapi untuk HP, tablet, laptop, dan PC.</p>
          <div className="ot-actions">
            <a className="ot-btn ot-btn-primary" href="/register">{t('start') || 'Create Profile'}</a>
            <a className="ot-btn ot-btn-soft" href="/bekiw">Lihat /bekiw</a>
            <a className="ot-btn ot-btn-ghost" href="/explore">Explore</a>
          </div>
          <div className="ot-chip-row">
            <span>Premium glass</span><span>No random icons</span><span>SEO-ready</span><span>Responsive</span>
          </div>
        </div>
        <HeroPhone />
      </section>

      <section className="ot-brand-strip">
        {apps.map((app) => <article key={app}><BrandIcon name={app} size={22} /><span>{app}</span></article>)}
      </section>

      <section className="ot-section ot-feature-section">
        <div className="ot-section-head">
          <p className="ot-kicker">Premium system</p>
          <h2>Satu style untuk semua halaman. Tidak acak, tidak murahan.</h2>
        </div>
        <div className="ot-feature-grid">
          {features.map(([title, body]) => <article key={title} className="ot-glass-card"><b>{title}</b><p>{body}</p></article>)}
        </div>
      </section>

      <section className="ot-section ot-showcase-panel">
        <div>
          <p className="ot-kicker">Clear flow</p>
          <h2>Dari daftar sampai profile online, alurnya pendek dan jelas.</h2>
          <p>Register → customize → add links → upload background/music → publish. Semua action utama dibuat kelihatan jelas.</p>
        </div>
        <div className="ot-flow-list">
          {['Register', 'Customize', 'Add links', 'Upload media', 'Publish', 'Share'].map((item, index) => <span key={item}><b>{index + 1}</b>{item}</span>)}
        </div>
      </section>

      <footer className="ot-footer">
        <TulusLogo />
        <nav><a href="/pricing">Pricing</a><a href="/help">Help</a><a href="/games">Games</a><a href="/login">Login</a></nav>
      </footer>
    </V7GlowBackground>
  )
}

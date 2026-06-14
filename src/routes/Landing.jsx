import CleanNav from '../components/CleanNav.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import BrandIcon from '../components/BrandIcon.jsx'
import SpaceBackground from '../components/SpaceBackground.jsx'

const apps = ['discord','instagram','roblox','spotify','apple music','youtube','tiktok','github','telegram','soundcloud']
const features = [
  ['Fullscreen profile', 'Click-to-enter, avatar glow, badges, music, links, gallery, dan view counter dalam satu profile yang fokus.'],
  ['App links that feel real', 'Logo Discord, Instagram, Roblox, Spotify, Apple Music, YouTube, TikTok, Website, dan brand lain tampil konsisten.'],
  ['Music mood system', 'Direct audio bisa play setelah enter. Platform eksternal jadi tombol open yang aman dan jelas.'],
  ['Creator dashboard', 'Edit profile, link, background, music, effects, analytics, premium, dan help center dalam flow yang rapi.'],
  ['Game lounge', 'Mini game ringan tapi playable: Focus Rush, Memory Pulse, Aura Clash, dan Word Flow.'],
  ['Premium safety', 'Owner route hidden, env aman, storage policy siap, dan tidak ada secret di frontend.']
]
const flow = ['Register', 'Pick username', 'Upload avatar/background', 'Add links & music', 'Publish profile', 'Share /bekiw']

function HeroProfile() {
  return (
    <aside className="pro-hero-device" aria-label="TULUS profile preview">
      <div className="pro-device-screen">
        <div className="pro-device-top"><span /> <i>TULUS</i> <span /></div>
        <div className="pro-device-avatar"><TulusLogo compact /></div>
        <small>@bekiw</small>
        <h2>bekiw</h2>
        <p>A quiet profile space.</p>
        <div className="pro-device-icons">{apps.slice(0,7).map((app)=><b key={app}><BrandIcon name={app} size={22}/></b>)}</div>
        <button>click to enter</button>
        <div className="pro-device-player"><span /> <div><b>Blue Glass</b><small>soft audio mood</small></div><i>▮▮</i></div>
      </div>
    </aside>
  )
}

export default function Landing() {
  return (
    <main className="pro-page pro-landing">
      <SpaceBackground />
      <CleanNav />
      <section className="pro-hero">
        <div className="pro-hero-copy">
          <p className="pro-kicker">ORANG TULUS BLUE GLASS</p>
          <h1>Profile space yang terasa mahal, hidup, dan jelas.</h1>
          <p className="pro-sub">TULUS adalah bio/profile platform modern untuk public profile fullscreen, music, app links, background aesthetic, effects, dashboard, games, dan AI help. Dibuat original dengan vibe web besar: clean, smooth, dan tidak random.</p>
          <div className="pro-actions">
            <a className="pro-btn primary" href="/register">Create Profile</a>
            <a className="pro-btn secondary" href="/bekiw">View /bekiw</a>
            <a className="pro-btn ghost" href="/explore">Explore</a>
          </div>
          <div className="pro-proof-row">
            <span><b>Profile</b><small>fullscreen bio</small></span>
            <span><b>Music</b><small>direct audio ready</small></span>
            <span><b>Dashboard</b><small>creator workspace</small></span>
          </div>
        </div>
        <HeroProfile />
      </section>

      <section className="pro-logo-strip">
        {apps.map((app)=><article key={app}><BrandIcon name={app} size={24}/><span>{app}</span></article>)}
      </section>

      <section className="pro-section pro-split">
        <div>
          <p className="pro-kicker">Platform flow</p>
          <h2>Alurnya dibuat jelas dari awal sampai publish.</h2>
          <p>Visitor melihat profile yang fokus. Creator mengatur semuanya dari dashboard. Owner panel tetap hidden dan aman.</p>
        </div>
        <div className="pro-flow">
          {flow.map((item,i)=><span key={item}><b>{String(i+1).padStart(2,'0')}</b>{item}</span>)}
        </div>
      </section>

      <section className="pro-section">
        <div className="pro-section-head">
          <p className="pro-kicker">Why TULUS</p>
          <h2>Semua halaman harus terasa satu brand, bukan tempelan.</h2>
        </div>
        <div className="pro-feature-grid">
          {features.map(([title,body])=><article className="pro-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="pro-section pro-showcase">
        <div>
          <p className="pro-kicker">Ready for public</p>
          <h2>Landing, dashboard, profile, help, pricing, dan games punya style yang sama.</h2>
        </div>
        <div className="pro-showcase-grid">
          <a href="/customize">Customize Studio</a>
          <a href="/links">Links Studio</a>
          <a href="/help">Help Center</a>
          <a href="/games">Game Lounge</a>
        </div>
      </section>

      <footer className="pro-footer">
        <TulusLogo />
        <nav><a href="/pricing">Pricing</a><a href="/help">Help</a><a href="/games">Games</a><a href="/login">Login</a></nav>
      </footer>
    </main>
  )
}

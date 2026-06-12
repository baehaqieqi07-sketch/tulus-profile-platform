import TulusLogo from '../components/TulusLogo.jsx'
import BrandIcon from '../components/BrandIcon.jsx'

const navItems = [
  ['Help Center', '/help'],
  ['Explore', '/explore'],
  ['Leaderboard', '/leaderboard'],
  ['Pricing', '/pricing'],
]

const appIcons = ['discord', 'instagram', 'roblox', 'spotify', 'apple music', 'youtube', 'tiktok']

const steps = [
  ['01', 'Create account', 'Daftar, pilih username, lalu buka dashboard.'],
  ['02', 'Customize profile', 'Atur background, avatar, bio, warna, efek, dan layout.'],
  ['03', 'Add links & music', 'Masukkan app links dan audio direct untuk profile.'],
  ['04', 'Publish', 'Bagikan link profile TULUS kamu ke siapa pun.'],
]

const featureCards = [
  ['Public profile', 'Halaman /username fullscreen dengan background, music, views, badges, dan icon app.'],
  ['Customize studio', 'Editor profile dibuat jelas: asset, identity, colors, effects, privacy, dan preview.'],
  ['Help Center', 'Bantuan TULUS dibuat ringkas, mudah dicari, dan tidak bertele-tele.'],
  ['Game Center', 'Mini game ringan untuk profile mood, score, streak, dan achievement lokal.'],
]

const faqs = [
  ['TULUS itu apa?', 'TULUS adalah platform profile/bio page untuk menaruh identitas, link aplikasi, musik, background, dan halaman publik dalam satu tempat.'],
  ['Apakah bisa pakai music?', 'Bisa. Audio direct seperti MP3, WAV, OGG, dan M4A bisa diputar setelah visitor klik enter. Link YouTube atau Spotify dibuka sebagai external button.'],
  ['Apakah dashboard bisa edit profile?', 'Bisa. Dashboard dipakai untuk edit nama, bio, avatar, background, link, musik, efek, privacy, dan preview profile.'],
  ['Apakah premium sudah otomatis?', 'Payment gateway real tetap butuh provider dan secret server-side. UI premium dan manual verification disiapkan dengan aman.'],
]

function HomeNav() {
  return (
    <nav className="home-topbar" aria-label="TULUS navigation">
      <a className="home-brand" href="/" aria-label="TULUS Home"><TulusLogo /></a>
      <div className="home-navlinks">
        {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </div>
      <a className="home-dash-btn" href="/account">Dashboard</a>
    </nav>
  )
}

function DashboardMockup() {
  return (
    <div className="home-mockup-wrap" aria-label="TULUS dashboard and profile preview">
      <section className="home-dashboard-card">
        <aside>
          <TulusLogo compact />
          <span className="active">Account</span>
          <span>Customize</span>
          <span>Links</span>
          <span>Music</span>
          <span>Analytics</span>
        </aside>
        <main>
          <div className="home-mini-stats">
            <b>Username</b><b>Links</b><b>Music</b><b>Views</b>
          </div>
          <div className="home-graph" />
          <div className="home-row"><span /> <i /></div>
          <div className="home-row short"><span /> <i /></div>
        </main>
      </section>
      <section className="home-profile-stack one">
        <div className="home-profile-bg" />
        <h3>Azre</h3>
        <small>@profile</small>
        <div><BrandIcon name="discord" size={18}/><BrandIcon name="spotify" size={18}/><BrandIcon name="youtube" size={18}/></div>
      </section>
      <section className="home-profile-stack two">
        <div className="home-profile-bg alt" />
        <h3>bekiw</h3>
        <small>A quiet profile space.</small>
        <div>{appIcons.slice(0,4).map((app) => <BrandIcon key={app} name={app} size={18}/>)}</div>
      </section>
    </div>
  )
}

export default function Landing() {
  return (
    <main className="home-page-clean">
      <HomeNav />

      <section className="home-hero-clean">
        <div className="home-hero-copy-clean">
          <p className="home-kicker">TULUS PROFILE PLATFORM</p>
          <h1>Semua link, musik, dan profile kamu dalam satu halaman.</h1>
          <p>
            Buat profile publik yang rapi, fullscreen, dan mudah dibagikan. TULUS fokus ke tampilan clean, dashboard jelas, dan pengalaman profile yang nyaman di semua device.
          </p>
          <div className="home-actions-clean">
            <a href="/register">Create profile</a>
            <a href="/pricing">View pricing</a>
          </div>
        </div>
        <DashboardMockup />
      </section>

      <section className="home-metrics-clean" aria-label="TULUS features">
        <article><strong>Profile</strong><span>Fullscreen bio page</span></article>
        <article><strong>Music</strong><span>Direct audio ready</span></article>
        <article><strong>Links</strong><span>Brand icons</span></article>
        <article><strong>Dashboard</strong><span>Clean editor flow</span></article>
      </section>

      <section className="home-claim-clean">
        <h2>Claim username kamu dan mulai dari dashboard.</h2>
        <form onSubmit={(event) => event.preventDefault()}>
          <span>tulus-id.vercel.app/</span>
          <input aria-label="username" placeholder="username" />
          <a href="/register">Claim</a>
        </form>
      </section>

      <section className="home-steps-clean">
        <div className="home-section-title">
          <p className="home-kicker">CLEAR FLOW</p>
          <h2>Alur dibuat singkat, jelas, dan tidak membingungkan.</h2>
        </div>
        <div className="home-step-grid">
          {steps.map(([num, title, body]) => (
            <article key={title}>
              <b>{num}</b>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-feature-clean">
        <div className="home-section-title center">
          <p className="home-kicker">PLATFORM</p>
          <h2>Bagian utama TULUS dibuat satu gaya.</h2>
        </div>
        <div className="home-feature-grid-clean">
          {featureCards.map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-faq-clean">
        <h2>Frequently Asked Questions</h2>
        <div>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="home-final-cta-clean">
        <div>
          <h2>Siapkan profile TULUS kamu.</h2>
          <p>Mulai dari profile basic, lalu tambah link, background, musik, dan badge sesuai kebutuhan.</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <span>tulus-id.vercel.app/</span>
          <input aria-label="claim username" placeholder="username" />
          <a href="/register">Claim</a>
        </form>
      </section>

      <footer className="home-footer-clean">
        <div>
          <TulusLogo />
          <p>A quiet profile space.</p>
        </div>
        <nav>
          <a href="/login">Login</a>
          <a href="/register">Sign up</a>
          <a href="/pricing">Pricing</a>
          <a href="/help">Help Center</a>
          <a href="/games">Games</a>
        </nav>
      </footer>
    </main>
  )
}

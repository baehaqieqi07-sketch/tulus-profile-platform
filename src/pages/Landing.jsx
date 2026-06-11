import Logo from '../components/Logo.jsx';
import ProfilePreview from '../components/ProfilePreview.jsx';
import { templates } from '../data/templates.js';
import { plans } from '../data/plans.js';

const copy = {
  id: {
    navHelp: 'Bantuan',
    dashboard: 'Buka dashboard',
    cta: 'Mulai bikin profile',
    sample: 'Lihat contoh profile',
    hero: 'Profil premium yang rapi, hidup, dan siap dipakai.',
    sub: 'TULUS menyatukan profile builder, link apps, musik, galeri, preview, analytics, payment manual, dan AI Bekiw dalam satu dashboard yang terasa clean.',
    badge: 'ORANG TULUS • SOFT BLUE CREATOR PLATFORM',
    proof1: 'Live preview',
    proof2: 'File picker upload',
    proof3: 'AI Bekiw',
    section: 'Bukan sekadar link bio.',
    sectionSub: 'Setiap bagian dibuat supaya alurnya jelas: pilih template, upload asset, atur apps, preview, lalu publish.',
    aiTitle: 'Bekiw bantu seperti chat biasa.',
    aiText: 'Tanya cara upload background, tambah Roblox, pilih template, bayar premium, atau publish profile. Jawabannya pendek, jelas, dan fokus ke TULUS.',
    helpTitle: 'Help Center yang gampang diikuti.',
    helpText: 'Artikel bantuan, FAQ, troubleshooting, dan tombol Tanya Bekiw tersedia langsung dari dashboard.',
    premiumTitle: 'Premium manual, tetap aman.',
    premiumText: 'User upload bukti pembayaran, owner review di control panel, lalu approve atau reject dengan catatan.',
    finalTitle: 'Siap dibuat online.',
    finalText: 'React + Vite, Supabase-ready, Vercel-ready, dan dokumentasi update aman supaya project tidak diulang dari nol.',
    footer: 'TULUS dibuat untuk profile yang clean, aesthetic, dan tidak ribet.'
  },
  en: {
    navHelp: 'Help',
    dashboard: 'Open dashboard',
    cta: 'Start building',
    sample: 'View sample profile',
    hero: 'A premium profile that feels clean, alive, and ready.',
    sub: 'TULUS brings profile builder, app links, music, gallery, preview, analytics, manual payments, and Bekiw AI into one clean dashboard.',
    badge: 'ORANG TULUS • SOFT BLUE CREATOR PLATFORM',
    proof1: 'Live preview',
    proof2: 'File picker upload',
    proof3: 'Bekiw AI',
    section: 'More than a link bio.',
    sectionSub: 'The flow is clear: choose a template, upload assets, arrange apps, preview, then publish.',
    aiTitle: 'Bekiw helps like a normal chat.',
    aiText: 'Ask how to upload backgrounds, add Roblox, pick templates, pay premium, or publish. Answers stay short and useful.',
    helpTitle: 'Help Center that is easy to follow.',
    helpText: 'Guides, FAQ, troubleshooting, and Ask Bekiw are available from the dashboard.',
    premiumTitle: 'Manual premium, still safe.',
    premiumText: 'Users upload payment proof, the owner reviews it in control panel, then approves or rejects with a note.',
    finalTitle: 'Ready to go online.',
    finalText: 'React + Vite, Supabase-ready, Vercel-ready, with safe update docs so the project is never regenerated from zero.',
    footer: 'TULUS is made for clean, aesthetic profiles without friction.'
  }
};

export default function Landing({ lang, setLang, profile, navigate }) {
  const text = copy[lang] || copy.id;
  const topTemplates = templates.slice(0, 6);
  const topPlans = plans.slice(0, 4);

  return (
    <main className="site-page landing-page premium-landing">
      <nav className="site-nav premium-nav">
        <button className="logo-button" onClick={() => navigate('/')} type="button" aria-label="TULUS home"><Logo /></button>
        <div>
          <button onClick={() => navigate('/help')} type="button">{text.navHelp}</button>
          <button onClick={() => setLang(lang === 'id' ? 'en' : 'id')} type="button">{lang === 'id' ? 'EN' : 'ID'}</button>
          <button className="primary-btn" onClick={() => navigate('/dashboard')} type="button">{text.dashboard}</button>
        </div>
      </nav>

      <section className="hero-section hero-premium">
        <div className="hero-copy">
          <p className="eyebrow">{text.badge}</p>
          <h1>{text.hero}</h1>
          <p>{text.sub}</p>
          <div className="hero-actions">
            <button className="primary-btn big-cta" type="button" onClick={() => navigate('/dashboard')}>{text.cta}</button>
            <button className="ghost-btn big-cta" type="button" onClick={() => navigate(`/${profile.username || 'bekiw'}`)}>{text.sample}</button>
          </div>
          <div className="trust-row premium-proof">
            <span>✦ {text.proof1}</span>
            <span>◈ {text.proof2}</span>
            <span>✉ {text.proof3}</span>
          </div>
        </div>
        <div className="hero-preview premium-preview-frame">
          <div className="preview-window-bar"><span /><span /><span /><b>tulus.profile/bekiw</b></div>
          <ProfilePreview profile={profile} entered mode="desktop" />
        </div>
      </section>

      <section className="section-block feature-intro">
        <p className="eyebrow">TULUS SYSTEM</p>
        <h2>{text.section}</h2>
        <p>{text.sectionSub}</p>
        <div className="feature-grid premium-feature-grid">
          {[
            ['Profile Builder', 'Avatar, background, bio, badge, music, visibility, dan draft mode.'],
            ['Theme Studio', 'Palette, glass, blur, glow, radius, font, motion, dan reduced motion.'],
            ['Assets Manager', 'Upload avatar, background, gallery, music, icon, cursor, dan payment proof.'],
            ['Apps & Links', 'Roblox, Discord, Apple Music, Spotify, YouTube, TikTok, WhatsApp, dan custom app.'],
            ['Analytics', 'Views, clicks, top app, AI usage, help search, dan export CSV.'],
            ['Safe Update Guard', 'Checklist update aman supaya project tetap lanjut, bukan diulang dari nol.']
          ].map(([title, desc]) => (
            <article className="feature-card glass-panel premium-card" key={title}>
              <span>✦</span>
              <b>{title}</b>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block premium-template-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Templates</p>
            <h2>{lang === 'id' ? 'Pilih gaya, lalu edit detailnya.' : 'Pick a style, then tune the details.'}</h2>
          </div>
          <button className="ghost-btn" type="button" onClick={() => navigate('/dashboard?tab=templates')}>{lang === 'id' ? 'Buka templates' : 'Open templates'}</button>
        </div>
        <div className="template-showcase premium-template-showcase">
          {topTemplates.map((item) => <article key={item.id} style={{ '--template-accent': item.accent }}><b>{item.name}</b><span>{item.layout}</span><small>{item.mood}</small></article>)}
        </div>
      </section>

      <section className="dual-section premium-dual">
        <article className="glass-panel premium-card spotlight-card"><p className="eyebrow">AI Bekiw</p><h2>{text.aiTitle}</h2><p>{text.aiText}</p><button className="ghost-btn" type="button" onClick={() => navigate('/dashboard')}>{lang === 'id' ? 'Tanya di dashboard' : 'Ask in dashboard'}</button></article>
        <article className="glass-panel premium-card"><p className="eyebrow">Help Center</p><h2>{text.helpTitle}</h2><p>{text.helpText}</p><button className="ghost-btn" type="button" onClick={() => navigate('/help')}>{lang === 'id' ? 'Buka bantuan' : 'Open help'}</button></article>
      </section>

      <section className="section-block premium-payment-strip glass-panel">
        <div>
          <p className="eyebrow">Premium</p>
          <h2>{text.premiumTitle}</h2>
          <p>{text.premiumText}</p>
        </div>
        <div className="plans-grid compact-plans">
          {topPlans.map((plan) => <article className="plan-card mini-plan" key={plan.id}><em>{plan.badge}</em><h3>{plan.name}</h3><strong>{plan.price}</strong></article>)}
        </div>
      </section>

      <section className="section-block final-cta glass-panel">
        <p className="eyebrow">Deploy Ready</p>
        <h2>{text.finalTitle}</h2>
        <p>{text.finalText}</p>
        <div className="hero-actions"><button className="primary-btn big-cta" type="button" onClick={() => navigate('/dashboard')}>{text.cta}</button><button className="ghost-btn big-cta" type="button" onClick={() => navigate('/help')}>{text.navHelp}</button></div>
      </section>

      <footer className="site-footer premium-footer"><Logo compact /><span>{text.footer}</span><span>ORANG TULUS</span></footer>
    </main>
  );
}

import BekiwAIChat from '../components/BekiwAIChat.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'

const guides = [
  ['Account Setup', 'Create account, verify email, and enter onboarding.'],
  ['Profile Setup', 'Set username, display name, bio, avatar, and public visibility.'],
  ['Music System', 'Direct audio plays inside TULUS. External platforms open with a clean button.'],
  ['Upload Manager', 'Upload avatar, background, gallery, music cover, and audio safely.'],
  ['Effects Studio', 'Control bokeh, star dust, floating orb, ripple, cursor, and reduce motion.'],
  ['Owner Panel', 'Hidden /tulus-control for owner actions, reports, payments, and recommended music.'],
  ['Premium Plans', 'Unlock layouts, advanced analytics, cursor studio, background video, and more.'],
  ['Security', 'Use Supabase RLS, storage policies, Turnstile, and no secret keys in frontend.']
]

export default function HelpCenter() {
  return (
    <V7GlowBackground className="v100-help">
      <aside className="v100-doc-side"><a className="v100-brand" href="/"><span>◆</span> TULUS</a><a>Getting Started</a><a>Account</a><a>Profile</a><a>Music</a><a>Uploads</a><a>Premium</a><a>Security</a><a>Owner</a></aside>
      <section className="v100-help-main">
        <p className="v100-kicker">Help Center</p>
        <h1>How can bekiw help you?</h1>
        <p>Ask about anything in TULUS. The AI support is trained around this web flow and can answer in the language you use.</p>
        <BekiwAIChat />
        <h2>Guides & Tutorials</h2>
        <div className="v100-doc-grid">{guides.map(([title, desc]) => <article key={title}><b>◆ {title}</b><span>{desc}</span></article>)}</div>
      </section>
    </V7GlowBackground>
  )
}

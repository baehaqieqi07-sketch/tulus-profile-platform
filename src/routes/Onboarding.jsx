import { useState } from 'react'
import UserGuard from '../components/UserGuard.jsx'
import { go, markOnboarded } from '../lib/authFlow.js'
const questions = [
  { title: 'Where did you find out about TULUS?', desc: 'Knowing how you discovered us helps improve the experience.', choices: ['Google or search engine', 'Someone social media profile', 'Through a friend', 'Other'] },
  { title: 'Pick your profile vibe.', desc: 'Start with a clean preset. You can change this later.', choices: ['Blue Glass', 'Night Soft', 'Pearl Motion', 'Minimal'] },
  { title: 'Are you ready to upgrade yet?', desc: 'Premium unlocks more motion, custom cursor, and advanced layouts.', choices: ['Keep Free', 'View Premium', 'Maybe later'] },
  { title: 'Your TULUS space is ready.', desc: 'Enter your account and customize your page.', choices: ['Continue'] }
]
export default function Onboarding({ user, setUser }) {
  const [step, setStep] = useState(0)
  const q = questions[step]
  const next = () => step < 3 ? setStep(step + 1) : (setUser?.(markOnboarded(user)), go('/account'))
  return <UserGuard user={user}><main className="v7-onboard"><section className="v7-onboard-left"><a className="v7-side-logo" href="/">✦ TULUS</a><div className="v7-steps">{[1,2,3,4].map((n,i)=><span className={i===step?'active':''} key={n}>{n}</span>)}</div><h1>{q.title}</h1><p>{q.desc}</p><div className="v7-choice-list">{q.choices.map((c)=><button key={c}>✦ {c}</button>)}</div><div className="v7-onboard-actions"><button className="v7-primary" onClick={next}>Continue →</button><button className="v7-secondary" onClick={()=>go('/account')}>Skip</button></div></section><section className="v7-onboard-right"><h2>✦ Everything you want, right here.</h2><p>Manage your profile, links, settings, and more in one place.</p><div className="v7-dashboard-preview"><aside><b>Welcome back</b><span>account</span><span>customize</span><span>links</span><span>premium</span></aside><main><div className="v7-preview-cards"><b>Username</b><b>Alias</b><b>UID</b></div><div className="v7-big-chart"><em/><em/><em/><em/><em/></div></main></div></section></main></UserGuard>
}

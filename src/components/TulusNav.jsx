import { useState } from 'react'
import TulusLogo from './TulusLogo.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { getInitialLang } from '../lib/i18n.js'

export default function TulusNav() {
  const [lang, setLang] = useState(getInitialLang())
  return (
    <nav className="v500-nav">
      <a className="v500-brand" href="/"><TulusLogo /></a>
      <div className="v500-nav-links">
        <a href="/help">Help Center</a>
        <a href="/leaderboard">Leaderboard</a>
        <a href="/pricing">Pricing</a>
        <a href="/login">Login</a>
        <LanguageSwitcher value={lang} onChange={setLang} compact />
        <a className="v500-nav-cta" href="/register">Create profile</a>
      </div>
    </nav>
  )
}

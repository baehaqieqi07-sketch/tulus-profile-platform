import TulusLogo from './TulusLogo.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const links = [
  ['Explore', '/explore'],
  ['Pricing', '/pricing'],
  ['Games', '/games'],
  ['Help', '/help']
]

export default function CleanNav({ compact = false }) {
  return (
    <nav className={`pro-nav ${compact ? 'is-compact' : ''}`}>
      <a className="pro-brand" href="/" aria-label="TULUS home"><TulusLogo /></a>
      <div className="pro-nav-links">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </div>
      <div className="pro-nav-actions">
        <LanguageSwitcher compact />
        <a className="pro-login" href="/login">Login</a>
        <a className="pro-create" href="/register">Create profile</a>
      </div>
    </nav>
  )
}

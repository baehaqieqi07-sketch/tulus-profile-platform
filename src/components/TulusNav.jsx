import TulusLogo from './TulusLogo.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

const navItems = [
  ['Explore', '/explore'],
  ['Pricing', '/pricing'],
  ['Games', '/games'],
  ['Help', '/help']
]

export default function TulusNav() {
  const { t } = useTulusLanguage()
  return (
    <nav className="tulus-luxe-nav" aria-label="TULUS navigation">
      <a className="tulus-luxe-brand" href="/" aria-label="TULUS home"><TulusLogo /></a>
      <div className="tulus-luxe-nav-links">
        {navItems.map(([label, href]) => <a key={href} href={href}>{t(label.toLowerCase()) || label}</a>)}
      </div>
      <div className="tulus-luxe-nav-actions">
        <LanguageSwitcher compact />
        <a className="tulus-luxe-login" href="/login">{t('login')}</a>
        <a className="tulus-luxe-create" href="/register">{t('create') || 'Create'}</a>
      </div>
    </nav>
  )
}

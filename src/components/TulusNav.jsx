import TulusLogo from './TulusLogo.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

export default function TulusNav() {
  const { t } = useTulusLanguage()
  return (
    <nav className="v500-nav mega-nav">
      <a className="v500-brand" href="/"><TulusLogo /></a>
      <div className="v500-nav-links">
        <a href="/help">{t('help')}</a>
        <a href="/games">{t('games')}</a>
        <a href="/leaderboard">{t('leaderboard')}</a>
        <a href="/pricing">{t('pricing')}</a>
        <a href="/login">{t('login')}</a>
        <LanguageSwitcher compact />
        <a className="v500-nav-cta" href="/register">{t('create')}</a>
      </div>
    </nav>
  )
}

import { LANGUAGES, languageNames, useTulusLanguage } from '../lib/i18n.js'

export default function LanguageSwitcher({ value, onChange, compact = false }) {
  const { lang, setLang } = useTulusLanguage()
  const current = value || lang
  const choose = (code) => { setLang(code); onChange?.(code) }
  return (
    <label className={`language-picker ${compact ? 'compact' : ''}`}>
      <span>{compact ? '🌐' : 'Language'}</span>
      <select value={current} onChange={(e) => choose(e.target.value)} aria-label="Choose language">
        {LANGUAGES.map((code) => <option value={code} key={code}>{languageNames[code]}</option>)}
      </select>
    </label>
  )
}

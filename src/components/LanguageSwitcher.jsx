import { useState } from 'react'
import { LANGUAGES, languageNames } from '../lib/i18n.js'

export default function LanguageSwitcher({ value = 'id', onChange, compact = false }) {
  const [open, setOpen] = useState(false)
  const current = languageNames[value] || languageNames.id
  const choose = (code) => { onChange?.(code); setOpen(false); localStorage.setItem('tulus.lang', code); document.documentElement.lang = code }
  return (
    <div className={`language-picker ${compact ? 'compact' : ''}`}>
      <button type="button" onClick={() => setOpen(!open)}><span>🌐</span>{compact ? value.toUpperCase() : current}</button>
      {open && <div className="language-menu">
        {LANGUAGES.map((code) => <button type="button" key={code} className={value === code ? 'active' : ''} onClick={() => choose(code)}>{languageNames[code]}</button>)}
      </div>}
    </div>
  )
}

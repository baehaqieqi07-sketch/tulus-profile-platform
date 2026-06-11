import { THEMES } from '../lib/themes.js'
export default function ThemePicker({ profile, setProfile }) {
  return (
    <div className="editor-panel">
      <p className="eyebrow">themes</p>
      <h2>Choose a soft mood.</h2>
      <div className="theme-grid">
        {Object.values(THEMES).map((theme) => (
          <button key={theme.name} className={`theme-tile ${profile.theme_name === theme.name ? 'active' : ''}`} style={{ background: theme.background }} onClick={() => setProfile((prev) => ({ ...prev, theme_name: theme.name, accent_color: theme.accent }))}>
            <span>{theme.name}</span>
            <small>{theme.free ? 'free' : 'premium'}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

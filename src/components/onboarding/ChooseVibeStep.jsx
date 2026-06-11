const themes = ['Orang Tulus Blue Glass', 'Pearl Blue', 'Lavender Mist', 'Rose Milk']
const animations = ['Calm', 'Smooth', 'Dreamy']
const themeMap = { 'Orang Tulus Blue Glass': 'Blue Silk', 'Pearl Blue': 'Blue Silk', 'Lavender Mist': 'Lavender Mist', 'Rose Milk': 'Rose Milk' }

export default function ChooseVibeStep({ profile, setProfile }) {
  return (
    <div className="onboarding-step">
      <p className="eyebrow">step 02</p>
      <h2>Choose your vibe</h2>
      <div className="choice-grid">
        {themes.map((theme) => <button key={theme} type="button" className={profile.theme_name === themeMap[theme] ? 'choice active' : 'choice'} onClick={() => setProfile((p) => ({ ...p, theme_name: themeMap[theme] }))}>{theme}</button>)}
      </div>
      <div className="choice-grid small-choice">
        {animations.map((preset) => <button key={preset} type="button" className={profile.animation_preset === preset ? 'choice active' : 'choice'} onClick={() => setProfile((p) => ({ ...p, animation_preset: preset, show_particles: preset !== 'Still' }))}>{preset}</button>)}
      </div>
    </div>
  )
}

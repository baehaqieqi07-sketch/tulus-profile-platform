import { THEMES } from '../lib/themes.js'

export default function BackgroundLayer({ profile }) {
  const theme = THEMES[profile.theme_name] || THEMES['Pearl Calm']
  const hasCustom = Boolean(profile.background_url)
  const type = profile.background_type || 'gradient'
  const style = hasCustom
    ? { backgroundImage: `url(${profile.background_url})`, filter: `brightness(${profile.background_brightness || 100}%) blur(${profile.background_blur || 0}px)` }
    : { background: theme.background }

  return (
    <div className="background-layer" aria-hidden="true">
      {hasCustom && type === 'video' ? (
        <video className="background-media" src={profile.background_url} autoPlay muted loop playsInline />
      ) : (
        <div className="background-media" style={style} />
      )}
      <div className="background-overlay" style={{ background: profile.background_overlay || 'rgba(255,255,255,.28)' }} />
      <div className="blur-orb orb-one" />
      <div className="blur-orb orb-two" />
      <div className="blur-orb orb-three" />
    </div>
  )
}

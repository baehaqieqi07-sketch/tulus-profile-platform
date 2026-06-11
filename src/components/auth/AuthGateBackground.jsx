import BackgroundLayer from '../BackgroundLayer.jsx'
import ParticleLayer from '../ParticleLayer.jsx'

export default function AuthGateBackground({ profile }) {
  return (
    <>
      <BackgroundLayer profile={{ ...profile, background_type: 'gradient', show_particles: true }} />
      <ParticleLayer enabled />
      <div className="auth-star-dust" aria-hidden="true" />
    </>
  )
}

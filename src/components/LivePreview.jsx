import BackgroundLayer from './BackgroundLayer.jsx'
import ParticleLayer from './ParticleLayer.jsx'
import ProfileCard from './ProfileCard.jsx'
import Gallery from './Gallery.jsx'
import Quotes from './Quotes.jsx'
import { themeVars } from '../lib/themes.js'

export default function LivePreview({ profile, links, badges, quotes, gallery }) {
  return (
    <aside className="live-preview" style={themeVars(profile.theme_name)}>
      <BackgroundLayer profile={profile} />
      <ParticleLayer enabled={profile.show_particles} />
      <div className="preview-inner">
        <ProfileCard profile={profile} links={links} badges={badges} entered />
        <Quotes quotes={quotes} show={profile.show_quotes} />
        <Gallery items={gallery} show={profile.show_gallery} />
      </div>
    </aside>
  )
}

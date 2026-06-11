import MusicPlayer from './MusicPlayer.jsx'
import SocialLinks from './SocialLinks.jsx'
import ViewCounter from './ViewCounter.jsx'

export default function ProfileCard({ profile, links = [], badges = [], entered = true, onLinkClick }) {
  const activeBadges = badges.filter((badge) => badge.is_active !== false).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  const initial = (profile.display_name || profile.username || 'tulus').slice(0, 1).toLowerCase()

  return (
    <article className="profile-card bio-profile-card">
      <div className="bio-card-topline">
        <span>TULUS</span>
        <i>{profile.status || 'online'}</i>
      </div>

      <div className="avatar-wrap bio-avatar-wrap">
        {profile.avatar_url ? <img src={profile.avatar_url} alt={`${profile.display_name} avatar`} /> : <span>{initial}</span>}
      </div>

      <div className="profile-copy bio-profile-copy">
        <h1>{profile.display_name || 'bekiw'}</h1>
        <p className="username">@{profile.username || 'bekiw'}</p>
        <p className="bio">{profile.bio || 'just a quiet page for the things i like.'}</p>
      </div>

      {profile.show_badges !== false && activeBadges.length > 0 && (
        <div className="badges-row bio-badges-row">
          {activeBadges.slice(0, 4).map((badge) => <span key={badge.id || badge.label}>{badge.label}</span>)}
        </div>
      )}

      <SocialLinks links={links} onClick={onLinkClick} />

      {profile.show_music !== false && <MusicPlayer profile={profile} entered={entered} compact />}

      <div className="profile-footer bio-profile-footer">
        <ViewCounter views={profile.views} show={profile.show_views} />
        <small>quiet profile space</small>
      </div>
    </article>
  )
}

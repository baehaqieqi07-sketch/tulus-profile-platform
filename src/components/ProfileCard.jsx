import MusicPlayer from './MusicPlayer.jsx'
import SocialLinks from './SocialLinks.jsx'
import ViewCounter from './ViewCounter.jsx'

export default function ProfileCard({ profile, links = [], badges = [], entered = true, onLinkClick }) {
  const activeBadges = badges.filter((badge) => badge.is_active !== false).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  return (
    <article className="profile-card glass-card floating-card">
      <div className="avatar-wrap">
        {profile.avatar_url ? <img src={profile.avatar_url} alt={`${profile.display_name} avatar`} /> : <span>{(profile.display_name || 't').slice(0, 1).toLowerCase()}</span>}
      </div>
      <div className="profile-copy">
        <h1>{profile.display_name || 'bekiw'}</h1>
        <p className="username">@{profile.username || 'bekiw'}</p>
        <p className="bio">{profile.bio || 'just a quiet page for the things i like.'}</p>
      </div>
      {profile.status && <div className="status-pill">{profile.status}</div>}
      {profile.show_badges !== false && activeBadges.length > 0 && (
        <div className="badges-row">
          {activeBadges.map((badge) => <span key={badge.id || badge.label} style={{ '--badge': badge.color || 'rgba(255,255,255,.45)' }}>{badge.label}</span>)}
        </div>
      )}
      <SocialLinks links={links} onClick={onLinkClick} />
      {profile.show_music !== false && <MusicPlayer profile={profile} entered={entered} compact />}
      <div className="profile-footer">
        <ViewCounter views={profile.views} show={profile.show_views} />
        <small>TULUS</small>
      </div>
    </article>
  )
}

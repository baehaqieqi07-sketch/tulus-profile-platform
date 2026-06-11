import BrandMark from './BrandMark.jsx';
import { validateUrl } from '../utils/validation.js';

export default function ProfilePreview({ profile, entered = true, mode = 'mobile', onEnter, onAppClick }) {
  const palette = profile.palette || ['#07111F', '#0B5CFF', '#73C8FF', '#F7FBFF'];
  const vars = {
    '--profile-accent': profile.accent || palette[2],
    '--profile-bg': palette[0],
    '--profile-bg2': palette[1],
    '--profile-text': palette[3] || '#F7FBFF',
    '--profile-radius': `${profile.radius || 28}px`,
    '--profile-blur': `${profile.blur || 22}px`,
    '--profile-opacity': `${(profile.opacity || 72) / 100}`,
    '--profile-glow': `${profile.glow || 36}px`,
    backgroundImage: profile.background ? `linear-gradient(180deg, rgba(4,7,14,.52), rgba(4,7,14,.76)), url(${profile.background})` : undefined
  };
  const apps = (profile.apps || []).filter((app) => app.visible !== false);

  if (!entered) {
    return (
      <section className="enter-screen" style={vars}>
        <div className="enter-card">
          <BrandMark size={54} />
          <p>Click to enter</p>
          <h1>{profile.displayName || 'TULUS'}</h1>
          <span>musik dan animasi aktif setelah masuk</span>
          <button className="primary-btn" type="button" onClick={onEnter}>Enter Profile</button>
        </div>
      </section>
    );
  }

  return (
    <section className={`profile-preview layout-${String(profile.layout || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')} preview-${mode}`} style={vars}>
      {profile.backgroundVideo && <video className="profile-bg-video" src={profile.backgroundVideo} muted loop autoPlay playsInline />}
      <div className="profile-orb" />
      <article className="profile-card">
        <div className="profile-topline">
          <span className="profile-status-dot" />
          <span>{profile.status || 'Available'}</span>
          {profile.verified && <b className="visual-badge">Premium visual</b>}
        </div>
        <div className="profile-identity">
          <div className="avatar-shell">{profile.avatar ? <img src={profile.avatar} alt={profile.displayName} /> : <BrandMark size={54} />}</div>
          <div>
            <h2>{profile.displayName || 'TULUS'}</h2>
            <p>@{profile.username || 'username'}</p>
          </div>
        </div>
        <p className="profile-bio">{profile.bio}</p>
        <div className="profile-badges">{(profile.badges || []).slice(0, 5).map((badge) => <span key={badge}>{badge}</span>)}</div>
        {profile.featured?.title && <div className="featured-card"><b>{profile.featured.title}</b><span>{profile.featured.description}</span></div>}
        <div className="profile-apps">
          {apps.map((app) => {
            const valid = validateUrl(app.url);
            return (
              <a
                key={app.id}
                className={`app-link ${app.highlighted ? 'is-highlighted' : ''} ${app.pinned ? 'is-pinned' : ''} ${!valid.ok ? 'is-broken' : ''}`}
                href={valid.ok && app.url ? app.url : '#'}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => { if (!valid.ok || !app.url) e.preventDefault(); onAppClick?.(app); }}
                style={{ '--app-accent': app.accent || profile.accent }}
              >
                <span>{app.icon || '⌁'}</span>
                <b>{app.title || app.type}</b>
                <em>{app.username || app.category}</em>
              </a>
            );
          })}
        </div>
        {(profile.gallery || []).length > 0 && <div className="gallery-strip">{profile.gallery.slice(0, 5).map((item) => <img key={item.id || item.url} src={item.url} alt={item.name || 'Gallery'} />)}</div>}
        {profile.music && <audio className="profile-audio" src={profile.music} controls autoPlay={Boolean(profile.autoplayMusic)} />}
        <footer>TULUS • ORANG TULUS</footer>
      </article>
    </section>
  );
}

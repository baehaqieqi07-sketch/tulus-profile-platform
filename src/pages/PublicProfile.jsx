import { useEffect } from 'react';
import ProfilePreview from '../components/ProfilePreview.jsx';
import Logo from '../components/Logo.jsx';

export default function PublicProfile({ profile, username, entered, setEntered, navigate, onAppClick, onView }) {
  useEffect(() => { onView?.(); }, []);
  return (
    <main className="public-page">
      <ProfilePreview profile={{ ...profile, username: username || profile.username }} entered={entered} onEnter={() => setEntered(true)} onAppClick={onAppClick} />
      {entered && <div className="public-actions"><button className="ghost-btn" type="button" onClick={() => navigate('/') }><Logo compact /> Home</button><button className="primary-btn" type="button" onClick={() => navigate('/dashboard')}>Edit</button></div>}
    </main>
  );
}

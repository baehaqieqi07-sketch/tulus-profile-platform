import { useMemo, useState } from 'react'
import { saveDashboardBundle } from '../lib/profileStore.js'
import QuickEdit from '../components/QuickEdit.jsx'
import AdvancedEdit from '../components/AdvancedEdit.jsx'
import ProfileEditor from '../components/ProfileEditor.jsx'
import BackgroundEditor from '../components/BackgroundEditor.jsx'
import AvatarEditor from '../components/AvatarEditor.jsx'
import MusicEditor from '../components/MusicEditor.jsx'
import LinkEditor from '../components/LinkEditor.jsx'
import BadgeEditor from '../components/BadgeEditor.jsx'
import GalleryEditor from '../components/GalleryEditor.jsx'
import QuoteEditor from '../components/QuoteEditor.jsx'
import ThemePicker from '../components/ThemePicker.jsx'
import AnimationSettings from '../components/AnimationSettings.jsx'
import PrivacySettings from '../components/PrivacySettings.jsx'
import PremiumPlans from '../components/PremiumPlans.jsx'
import Billing from '../components/Billing.jsx'
import LivePreview from '../components/LivePreview.jsx'
import SecurityNotice from '../components/SecurityNotice.jsx'
import UserGuard from '../components/UserGuard.jsx'

const menus = ['Quick Edit', 'Profile', 'Background', 'Avatar', 'Music', 'Links', 'Badges', 'Gallery', 'Quotes', 'Theme', 'Animation', 'Privacy', 'Premium', 'Billing', 'Advanced']

export default function Dashboard({ user, profile, setProfile, links, setLinks, badges, setBadges, quotes, setQuotes, gallery, setGallery, payments, setPayments, saveAll }) {
  const [active, setActive] = useState('Quick Edit')
  const [saved, setSaved] = useState('')
  const onSave = async () => {
    saveAll?.()
    const result = await saveDashboardBundle(user?.id, { profile, links, badges, quotes, gallery })
    setSaved(result.ok ? 'Saved to TULUS.' : (result?.error?.message || 'Saved locally. Check Supabase setup if it does not update online.'))
  }
  const editor = useMemo(() => {
    const props = { user, profile, setProfile, links, setLinks, badges, setBadges, quotes, setQuotes, gallery, setGallery, payments, setPayments, onSave }
    switch (active) {
      case 'Profile': return <ProfileEditor {...props} />
      case 'Background': return <BackgroundEditor {...props} />
      case 'Avatar': return <AvatarEditor {...props} />
      case 'Music': return <MusicEditor {...props} />
      case 'Links': return <LinkEditor {...props} />
      case 'Badges': return <BadgeEditor {...props} />
      case 'Gallery': return <GalleryEditor {...props} />
      case 'Quotes': return <QuoteEditor {...props} />
      case 'Theme': return <ThemePicker {...props} />
      case 'Animation': return <AnimationSettings {...props} />
      case 'Privacy': return <PrivacySettings {...props} />
      case 'Premium': return <PremiumPlans onUpgrade={(plan) => { setActive('Billing'); setPayments((prev) => [{ id: crypto.randomUUID(), plan, status: 'draft', provider: 'manual', amount: 0, created_at: new Date().toISOString() }, ...prev]) }} />
      case 'Billing': return <Billing {...props} />
      case 'Advanced': return <AdvancedEdit {...props} />
      default: return <QuickEdit {...props} />
    }
  }, [active, profile, links, badges, quotes, gallery, payments])

  return (
    <UserGuard user={user}>
      <main className="dashboard-shell">
        <aside className="dashboard-sidebar glass-card">
          <a className="brand" href="/">TULUS</a>
          <p className="muted small">{user?.email || 'local user'}</p>
          <div className="menu-list">{menus.map((menu) => <button key={menu} className={active === menu ? 'active' : ''} onClick={() => setActive(menu)}>{menu}</button>)}</div>
          <a className="secondary-button" href={`/${profile.username}`}>View profile</a>
          {user?.role === 'owner' && <a className="ghost-button" href="/tulus-control">Internal</a>}
        </aside>
        <section className="dashboard-editor">
          {editor}
          <div className="dashboard-actions glass-card">
            <button className="primary-button" onClick={onSave}>Save</button>
            <button className="secondary-button" onClick={() => setProfile((prev) => ({ ...prev, visibility: prev.visibility === 'public' ? 'private' : 'public' }))}>{profile.visibility === 'public' ? 'Unpublish' : 'Publish'}</button>
            {saved && <span>{saved}</span>}
          </div>
          <SecurityNotice />
        </section>
        <LivePreview profile={profile} links={links} badges={badges} quotes={quotes} gallery={gallery} />
      </main>
    </UserGuard>
  )
}

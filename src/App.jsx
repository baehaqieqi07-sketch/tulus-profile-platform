import { useEffect, useMemo, useState } from 'react'
import Landing from './routes/Landing.jsx'
import AuthGate from './routes/AuthGate.jsx'
import Login from './routes/Login.jsx'
import Register from './routes/Register.jsx'
import Onboarding from './routes/Onboarding.jsx'
import EnterGate from './routes/EnterGate.jsx'
import PublicProfile from './routes/PublicProfile.jsx'
import ProfileExperience from './routes/ProfileExperience.jsx'
import Dashboard from './routes/Dashboard.jsx'
import OwnerPanel from './routes/OwnerPanel.jsx'
import Explore from './routes/Explore.jsx'
import NotFound from './routes/NotFound.jsx'
import { demoProfile, demoLinks, demoBadges, demoQuotes, demoGallery } from './data/demoProfile.js'
import { themeVars } from './lib/themes.js'
import { validateUsername } from './lib/validation.js'

const STORAGE_KEY = 'tulus.local.v2'

function readLocal() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return parsed || {}
  } catch {
    return {}
  }
}

export default function App() {
  const [path, setPath] = useState(location.pathname)
  const saved = useMemo(readLocal, [])
  const [user, setUser] = useState(saved.user || null)
  const [profile, setProfile] = useState(saved.profile || demoProfile)
  const [links, setLinks] = useState(saved.links || demoLinks)
  const [badges, setBadges] = useState(saved.badges || demoBadges)
  const [quotes, setQuotes] = useState(saved.quotes || demoQuotes)
  const [gallery, setGallery] = useState(saved.gallery || demoGallery)
  const [payments, setPayments] = useState(saved.payments || [])
  const [musicRecommendations, setMusicRecommendations] = useState(saved.musicRecommendations || [])

  useEffect(() => {
    const onPop = () => setPath(location.pathname)
    addEventListener('popstate', onPop)
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.body.style.setProperty('--accent', themeVars(profile.theme_name)['--accent'])
  }, [profile.theme_name])

  const saveAll = () => localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, profile, links, badges, quotes, gallery, payments, musicRecommendations }))
  useEffect(() => { saveAll() }, [user, profile, links, badges, quotes, gallery, payments, musicRecommendations])

  const incrementView = () => {
    const viewKey = `tulus.view.${profile.username}`
    const last = Number(localStorage.getItem(viewKey) || 0)
    if (Date.now() - last > 1000 * 60 * 60) {
      localStorage.setItem(viewKey, String(Date.now()))
      setProfile((prev) => ({ ...prev, views: Number(prev.views || 0) + 1 }))
    }
  }

  const onProfilePatch = (patch) => setProfile((prev) => ({ ...prev, ...patch }))
  const nav = (component) => component
  const usernamePath = decodeURIComponent(path.replace(/^\//, ''))

  if (path === '/') return user ? nav(<EnterGate user={user} profile={profile} />) : nav(<AuthGate onLogin={setUser} onProfilePatch={onProfilePatch} profile={profile} />)
  if (path === '/auth') return nav(<AuthGate onLogin={setUser} onProfilePatch={onProfilePatch} profile={profile} />)
  if (path === '/landing') return nav(<Landing />)
  if (path === '/login') return nav(<Login onLogin={setUser} onProfilePatch={onProfilePatch} profile={profile} />)
  if (path === '/register') return nav(<Register onLogin={setUser} onProfilePatch={onProfilePatch} profile={profile} />)
  if (path === '/onboarding') return nav(<Onboarding user={user} setUser={setUser} profile={profile} setProfile={setProfile} />)
  if (path === '/enter') return nav(<EnterGate user={user} profile={profile} />)
  if (path === '/me') return nav(<ProfileExperience username={profile.username} profile={profile} links={links} badges={badges} quotes={quotes} gallery={gallery} incrementView={incrementView} />)
  if (path === '/dashboard') return nav(<Dashboard user={user} profile={profile} setProfile={setProfile} links={links} setLinks={setLinks} badges={badges} setBadges={setBadges} quotes={quotes} setQuotes={setQuotes} gallery={gallery} setGallery={setGallery} payments={payments} setPayments={setPayments} saveAll={saveAll} />)
  if (path === '/tulus-control') return nav(<OwnerPanel user={user} profile={profile} setProfile={setProfile} payments={payments} setPayments={setPayments} musicRecommendations={musicRecommendations} setMusicRecommendations={setMusicRecommendations} />)
  if (path === '/explore') return nav(<Explore profile={profile} links={links} badges={badges} />)
  if (usernamePath && !validateUsername(usernamePath) && usernamePath === profile.username) return nav(<PublicProfile username={usernamePath} profile={profile} links={links} badges={badges} quotes={quotes} gallery={gallery} incrementView={incrementView} />)
  if (usernamePath && ['bekiw', 'aulia', 'qiel'].includes(usernamePath)) return nav(<PublicProfile username={usernamePath} profile={{ ...demoProfile, username: usernamePath, display_name: usernamePath }} links={demoLinks} badges={demoBadges} quotes={demoQuotes} gallery={demoGallery} incrementView={() => {}} />)
  return <NotFound />
}


import { useEffect, useMemo, useState } from 'react'
import Landing from './routes/Landing.jsx'
import Pricing from './routes/Pricing.jsx'
import HelpCenter from './routes/HelpCenter.jsx'
import Leaderboard from './routes/Leaderboard.jsx'
import AccountDashboard from './routes/AccountDashboard.jsx'
import AccountSettings from './routes/AccountSettings.jsx'
import AccountBadges from './routes/AccountBadges.jsx'
import AccountAnalytics from './routes/AccountAnalytics.jsx'
import CustomizePage from './routes/CustomizePage.jsx'
import LinksPage from './routes/LinksPage.jsx'
import PremiumPage from './routes/PremiumPage.jsx'
import PlaceholderDashboard from './routes/PlaceholderDashboard.jsx'
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
import { supabase, supabaseReady } from './lib/supabase.js'
import { ensureStarterProfile, loadPublicProfile, loadUserBundle, resolveRole } from './lib/profileStore.js'

const STORAGE_KEY = 'tulus.local.v3'
const BLOCKED_PUBLIC_PATHS = ['dashboard', 'tulus-control', 'login', 'register', 'auth', 'landing', 'enter', 'me', 'explore', 'onboarding', 'pricing', 'help', 'leaderboard', 'account', 'customize', 'links', 'premium', 'image-host', 'templates']

function readLocal() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {} } catch { return {} }
}

function isPublicUsernamePath(pathname) {
  const name = decodeURIComponent(pathname.replace(/^\//, ''))
  return Boolean(name && !BLOCKED_PUBLIC_PATHS.includes(name) && !validateUsername(name))
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
  const [publicBundle, setPublicBundle] = useState(null)
  const [loadingPublic, setLoadingPublic] = useState(false)

  useEffect(() => {
    const onPop = () => setPath(location.pathname)
    addEventListener('popstate', onPop)
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.body.style.setProperty('--accent', themeVars(profile.theme_name)['--accent'])
  }, [profile.theme_name])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, profile, links, badges, quotes, gallery, payments, musicRecommendations }))
  }, [user, profile, links, badges, quotes, gallery, payments, musicRecommendations])

  useEffect(() => {
    if (!supabaseReady) return
    let alive = true
    supabase.auth.getUser().then(async ({ data }) => {
      if (!alive || !data?.user) return
      const nextUser = { id: data.user.id, email: data.user.email, role: resolveRole(data.user), onboarded: true }
      setUser((prev) => prev?.id === nextUser.id ? { ...prev, ...nextUser } : nextUser)
      const bundle = await ensureStarterProfile(data.user, profile)
      if (!alive || !bundle?.profile) return
      setProfile((prev) => ({ ...prev, ...bundle.profile }))
      setLinks(bundle.links?.length ? bundle.links : links)
      setBadges(bundle.badges?.length ? bundle.badges : badges)
      setQuotes(bundle.quotes?.length ? bundle.quotes : quotes)
      setGallery(bundle.gallery?.length ? bundle.gallery : gallery)
    })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    if (!supabaseReady || !user?.id) return
    let alive = true
    loadUserBundle(user.id).then((bundle) => {
      if (!alive || !bundle?.profile) return
      setProfile((prev) => ({ ...prev, ...bundle.profile }))
      setLinks(bundle.links?.length ? bundle.links : links)
      setBadges(bundle.badges?.length ? bundle.badges : badges)
      setQuotes(bundle.quotes?.length ? bundle.quotes : quotes)
      setGallery(bundle.gallery?.length ? bundle.gallery : gallery)
    })
    return () => { alive = false }
  }, [user?.id])

  const usernamePath = decodeURIComponent(path.replace(/^\//, ''))

  useEffect(() => {
    if (!supabaseReady || !isPublicUsernamePath(path)) return
    let alive = true
    setLoadingPublic(true)
    loadPublicProfile(usernamePath).then((bundle) => {
      if (!alive) return
      setPublicBundle(bundle)
      setLoadingPublic(false)
    })
    return () => { alive = false }
  }, [path, usernamePath])

  const incrementView = () => {
    const current = publicBundle?.profile || profile
    const viewKey = `tulus.view.${current.username}`
    const last = Number(localStorage.getItem(viewKey) || 0)
    if (Date.now() - last > 1000 * 60 * 60) {
      localStorage.setItem(viewKey, String(Date.now()))
      setProfile((prev) => prev.username === current.username ? ({ ...prev, views: Number(prev.views || 0) + 1 }) : prev)
    }
  }

  const onProfilePatch = (patch) => setProfile((prev) => ({ ...prev, ...patch }))
  const nav = (component) => component

  if (path === '/') return nav(<Landing />)
  if (path === '/auth') return nav(<AuthGate onLogin={setUser} onProfilePatch={onProfilePatch} profile={profile} />)
  if (path === '/landing') return nav(<Landing />)
  if (path === '/pricing') return nav(<Pricing />)
  if (path === '/help') return nav(<HelpCenter />)
  if (path === '/leaderboard') return nav(<Leaderboard />)
  if (path === '/login') return nav(<Login onLogin={setUser} onProfilePatch={onProfilePatch} profile={profile} />)
  if (path === '/register') return nav(<Register onLogin={setUser} onProfilePatch={onProfilePatch} profile={profile} />)
  if (path === '/onboarding') return nav(<Onboarding user={user} setUser={setUser} profile={profile} setProfile={setProfile} />)
  if (path === '/enter') return nav(<EnterGate user={user} profile={profile} />)
  if (path === '/me') return nav(<ProfileExperience username={profile.username} profile={profile} links={links} badges={badges} quotes={quotes} gallery={gallery} incrementView={incrementView} />)
  if (path === '/dashboard') return nav(<Dashboard user={user} profile={profile} setProfile={setProfile} links={links} setLinks={setLinks} badges={badges} setBadges={setBadges} quotes={quotes} setQuotes={setQuotes} gallery={gallery} setGallery={setGallery} payments={payments} setPayments={setPayments} saveAll={() => {}} />)
  if (path === '/account') return nav(<AccountDashboard user={user} profile={profile} />)
  if (path === '/account/settings') return nav(<AccountSettings user={user} profile={profile} />)
  if (path === '/account/badges') return nav(<AccountBadges user={user} profile={profile} />)
  if (path === '/account/analytics') return nav(<AccountAnalytics user={user} profile={profile} />)
  if (path === '/customize') return nav(<CustomizePage user={user} profile={profile} setProfile={setProfile} />)
  if (path === '/links') return nav(<LinksPage user={user} profile={profile} />)
  if (path === '/premium') return nav(<PremiumPage user={user} profile={profile} />)
  if (path === '/image-host') return nav(<PlaceholderDashboard user={user} profile={profile} title="Image Host" />)
  if (path === '/templates') return nav(<PlaceholderDashboard user={user} profile={profile} title="Templates" />)
  if (path === '/tulus-control') return nav(<OwnerPanel user={user} profile={profile} setProfile={setProfile} payments={payments} setPayments={setPayments} musicRecommendations={musicRecommendations} setMusicRecommendations={setMusicRecommendations} />)
  if (path === '/explore') return nav(<Explore profile={profile} links={links} badges={badges} />)

  if (isPublicUsernamePath(path)) {
    const bundle = publicBundle?.profile?.username === usernamePath ? publicBundle : null
    const fallbackBundle = usernamePath === profile.username ? { profile, links, badges, quotes, gallery } : null
    const demoBundle = ['bekiw', 'aulia', 'qiel'].includes(usernamePath) ? { profile: { ...demoProfile, username: usernamePath, display_name: usernamePath }, links: demoLinks, badges: demoBadges, quotes: demoQuotes, gallery: demoGallery } : null
    const finalBundle = bundle || fallbackBundle || demoBundle
    if (!finalBundle && loadingPublic) return <main className="not-found"><section className="not-found-card glass-card"><h1>loading softly</h1><p className="muted">Preparing this profile.</p></section></main>
    if (finalBundle) return nav(<PublicProfile username={usernamePath} profile={finalBundle.profile} links={finalBundle.links} badges={finalBundle.badges} quotes={finalBundle.quotes} gallery={finalBundle.gallery} incrementView={incrementView} />)
  }

  return <NotFound />
}

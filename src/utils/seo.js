const SITE = 'https://tulus-id.vercel.app'
const DEFAULT_TITLE = 'TULUS — Bio Page Premium Indonesia | A quiet profile space.'
const DEFAULT_DESCRIPTION = 'TULUS adalah platform bio page dan profile space premium Indonesia dengan public profile, music, social links, blue glass effects, games, dashboard, dan Help Center AI bekiw.'

function ensureMeta(selector, createAttrs = {}) {
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    Object.entries(createAttrs).forEach(([key, value]) => el.setAttribute(key, value))
    document.head.appendChild(el)
  }
  return el
}

function ensureLink(rel) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  return el
}

export function applySeo({ title, description, path = '/', image, type = 'website', noindex = false } = {}) {
  if (typeof document === 'undefined') return
  const safeTitle = title || DEFAULT_TITLE
  const safeDescription = description || DEFAULT_DESCRIPTION
  const safePath = path.startsWith('/') ? path : `/${path}`
  const url = `${SITE}${safePath}`
  const safeImage = image || `${SITE}/tulus-og.svg`

  document.title = safeTitle

  ensureMeta('meta[name="description"]', { name: 'description' }).setAttribute('content', safeDescription)
  ensureMeta('meta[name="robots"]', { name: 'robots' }).setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  ensureMeta('meta[property="og:title"]', { property: 'og:title' }).setAttribute('content', safeTitle)
  ensureMeta('meta[property="og:description"]', { property: 'og:description' }).setAttribute('content', safeDescription)
  ensureMeta('meta[property="og:type"]', { property: 'og:type' }).setAttribute('content', type)
  ensureMeta('meta[property="og:url"]', { property: 'og:url' }).setAttribute('content', url)
  ensureMeta('meta[property="og:image"]', { property: 'og:image' }).setAttribute('content', safeImage)
  ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' }).setAttribute('content', safeTitle)
  ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description' }).setAttribute('content', safeDescription)
  ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image' }).setAttribute('content', safeImage)
  ensureLink('canonical').setAttribute('href', url)
}

export function routeSeo(pathname, profile) {
  if (pathname === '/') return applySeo({ path: '/', title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION })
  if (pathname === '/help') return applySeo({ path: '/help', title: 'Help Center TULUS — AI bekiw dan panduan profile', description: 'Pusat bantuan TULUS untuk login, profile, music, upload, links, language, premium, games, dan AI bekiw.' })
  if (pathname === '/games') return applySeo({ path: '/games', title: 'Game Center TULUS — Mini games premium ringan', description: 'Main Focus Rush, Memory Pulse, Aura Clash, dan Word Flow di Game Center TULUS.' })
  if (pathname === '/leaderboard') return applySeo({ path: '/leaderboard', title: 'Leaderboard TULUS — Top public profiles', description: 'Lihat public profile TULUS dengan views dan ranking yang masuk akal.' })
  if (pathname === '/pricing') return applySeo({ path: '/pricing', title: 'Pricing TULUS — Free, Plus, Pro, Lifetime', description: 'Pilih plan TULUS untuk membuat public profile premium dengan fitur aesthetic.' })
  if (pathname === '/login') return applySeo({ path: '/login', title: 'Login TULUS', description: 'Masuk ke akun TULUS untuk edit profile, music, links, dan dashboard.' })
  if (pathname === '/register') return applySeo({ path: '/register', title: 'Register TULUS', description: 'Buat akun TULUS dan mulai bangun bio page premium.' })
  if (pathname === '/bekiw') return applySeo({ path: '/bekiw', title: 'bekiw — TULUS Profile', description: 'Public profile bekiw di TULUS, platform bio page premium Indonesia.' })
  if (profile?.username && pathname === `/${profile.username}`) return applySeo({ path: pathname, title: `${profile.display_name || profile.username} — TULUS Profile`, description: profile.bio || `Public profile ${profile.username} di TULUS.` })
  return applySeo({ path: pathname, title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION })
}

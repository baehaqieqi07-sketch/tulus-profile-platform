const SITE_URL = 'https://tulus-id.vercel.app'
const DEFAULT_TITLE = 'TULUS — A quiet profile space.'
const DEFAULT_DESCRIPTION = 'TULUS is a premium blue-glass bio/profile platform for music, links, public profiles, effects, games, and bekiw AI help.'

function ensureMeta(selector, attrs = {}) {
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    document.head.appendChild(el)
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value)
  return el
}

export function applySeo({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, path = '/', image = `${SITE_URL}/tulus-og.svg`, noIndex = false } = {}) {
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  document.title = title
  ensureMeta('meta[name="description"]', { name: 'description', content: description })
  ensureMeta('meta[name="robots"]', { name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large' })
  ensureMeta('meta[property="og:title"]', { property: 'og:title', content: title })
  ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description })
  ensureMeta('meta[property="og:url"]', { property: 'og:url', content: url })
  ensureMeta('meta[property="og:image"]', { property: 'og:image', content: image })
  ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
  ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
  ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
  ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
  ensureMeta('link[rel="canonical"]', { rel: 'canonical', href: url })
}

export function applyRouteSeo(path = '/', profile) {
  const cleanPath = path || '/'
  if (cleanPath === '/') return applySeo({ path: '/', title: DEFAULT_TITLE, description: 'Create a calm premium TULUS profile with click-to-enter, music, social links, games, and AI help.' })
  if (cleanPath === '/pricing' || cleanPath === '/premium') return applySeo({ path: cleanPath, title: 'TULUS Pricing — Premium Profile Plans', description: 'Compare TULUS Free, Plus, Pro, and Lifetime plans with manual owner verification.' })
  if (cleanPath === '/help') return applySeo({ path: cleanPath, title: 'TULUS Help Center — bekiw AI Support', description: 'Get help with login, profile editing, music, uploads, language, views, premium, and troubleshooting.' })
  if (cleanPath === '/games') return applySeo({ path: cleanPath, title: 'TULUS Game Center — Focus Rush, Memory Pulse, Aura Clash, Word Flow', description: 'Play premium lightweight mini games inside TULUS with score, combo, level, and streak.' })
  if (cleanPath === '/leaderboard') return applySeo({ path: cleanPath, title: 'TULUS Leaderboard — Public Profiles by Views', description: 'Explore public TULUS profiles and local game scores.' })
  if (cleanPath === '/explore') return applySeo({ path: cleanPath, title: 'Explore TULUS Profiles', description: 'Discover public TULUS profile pages with links, music, and blue-glass style.' })
  if (cleanPath === '/login' || cleanPath === '/register' || cleanPath.startsWith('/account') || cleanPath === '/customize' || cleanPath === '/links' || cleanPath === '/tulus-control') return applySeo({ path: cleanPath, title: 'TULUS Account', description: 'TULUS account dashboard.', noIndex: true })
  if (profile?.username) return applySeo({ path: `/${profile.username}`, title: `${profile.display_name || profile.username} — TULUS Profile`, description: profile.bio || 'A premium TULUS public profile with music, links, and soft blue-glass effects.' })
  return applySeo({ path: cleanPath })
}

export function injectJsonLd() {
  const id = 'tulus-jsonld'
  let script = document.getElementById(id)
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TULUS',
    alternateName: ['TULUS profile', 'ORANG TULUS', 'TULUS bio page'],
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/explore?q={search_term_string}`, 'query-input': 'required name=search_term_string' }
  })
}

export function go(path) {
  history.pushState(null, '', path)
  dispatchEvent(new PopStateEvent('popstate'))
}

export function createLocalUser(email, role = 'user') {
  return {
    id: crypto.randomUUID?.() || `local-${Date.now()}`,
    email,
    role,
    onboarded: false,
    created_at: new Date().toISOString()
  }
}

export function markOnboarded(user) {
  return user ? { ...user, onboarded: true } : user
}

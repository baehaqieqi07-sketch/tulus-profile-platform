const buckets = new Map()

export function localRateLimit(key, limit, windowMs) {
  const now = Date.now()
  const bucket = buckets.get(key) || []
  const recent = bucket.filter((time) => now - time < windowMs)
  if (recent.length >= limit) {
    buckets.set(key, recent)
    return false
  }
  recent.push(now)
  buckets.set(key, recent)
  return true
}

export function debounce(fn, wait = 400) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}

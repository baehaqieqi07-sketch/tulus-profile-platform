export function prefersReducedMotion() { return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches }
export function motionDuration(base = 700, speed = 1) { return Math.max(180, Math.round(base / Math.max(.4, speed || 1))) }

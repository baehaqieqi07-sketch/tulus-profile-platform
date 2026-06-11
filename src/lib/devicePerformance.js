export function deviceKind() { const w = typeof innerWidth === 'number' ? innerWidth : 1200; return w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop' }
export function particleLimit(plan = 'free') { const kind = deviceKind(); if (kind === 'mobile') return 24; if (kind === 'tablet') return 40; return plan === 'pro' || plan === 'lifetime' ? 100 : 70 }

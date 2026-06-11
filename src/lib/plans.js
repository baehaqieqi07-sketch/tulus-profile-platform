export const PLANS = {
  free: {
    name: 'Free',
    price: 'Rp0',
    tagline: 'Tetap aesthetic untuk mulai.',
    features: ['1 profile', '5 social links', '3 badges', '3 quotes', '6 gallery images', 'Basic music player', 'Basic views', 'Small TULUS watermark'],
    limits: { links: 5, badges: 3, quotes: 3, gallery: 6, videoBackground: false, advancedAnalytics: false }
  },
  plus: {
    name: 'Plus',
    price: 'Rp29.000/bln',
    tagline: 'Lebih bebas tanpa ramai.',
    features: ['No watermark', 'Premium themes', 'Unlimited links', 'Unlimited badges', '15 gallery images', 'Music cover', 'Link click counter', 'Video background'],
    limits: { links: 999, badges: 999, quotes: 999, gallery: 15, videoBackground: true, advancedAnalytics: false }
  },
  pro: {
    name: 'Pro',
    price: 'Rp59.000/bln',
    tagline: 'Untuk profile yang lebih personal.',
    features: ['Everything in Plus', 'Custom domain', 'Advanced analytics', 'Password protected profile', 'Secret section', 'Profile backup/export', 'Schedule theme', 'Custom cursor'],
    limits: { links: 999, badges: 999, quotes: 999, gallery: 50, videoBackground: true, advancedAnalytics: true }
  },
  lifetime: {
    name: 'Lifetime',
    price: 'Sekali bayar',
    tagline: 'Akses panjang tanpa ribet.',
    features: ['Everything in Pro', 'Lifetime plan', 'Optional lifetime badge', 'Extra storage', 'Future premium themes'],
    limits: { links: 999, badges: 999, quotes: 999, gallery: 100, videoBackground: true, advancedAnalytics: true }
  }
}

export function getPlan(planName = 'free') {
  return PLANS[planName] || PLANS.free
}

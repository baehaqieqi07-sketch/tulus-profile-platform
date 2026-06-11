export const LIMITS = {
  usernameMax: 24,
  displayNameMax: 32,
  bioFreeMax: 160,
  bioPremiumMax: 320,
  badgeMax: 20,
  quoteMax: 160,
  linkLabelMax: 32,
  avatarMaxMb: { free: 2, plus: 5, pro: 10, lifetime: 15 },
  backgroundMaxMb: { free: 4, plus: 20, pro: 40, lifetime: 60 },
  musicMaxMb: { free: 8, plus: 20, pro: 40, lifetime: 60 }
}

export const ACCEPTED_UPLOADS = {
  avatar: ['image/jpeg', 'image/png', 'image/webp'],
  background: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'],
  music: ['audio/mpeg', 'audio/ogg', 'audio/wav'],
  paymentProof: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
}

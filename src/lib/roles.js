export const ROLES = {
  USER: 'user',
  PREMIUM_USER: 'premium_user',
  MODERATOR: 'moderator',
  OWNER: 'owner'
}

export function isOwner(role) {
  return role === ROLES.OWNER
}

export function canModerate(role) {
  return role === ROLES.OWNER || role === ROLES.MODERATOR
}

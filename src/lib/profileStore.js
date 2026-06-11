import { supabase, supabaseReady } from './supabase.js'
import { cleanText } from './sanitize.js'

const PUBLIC_PROFILE_COLUMNS = '*'
const STORAGE_BUCKETS = {
  avatar: 'avatars',
  background: 'backgrounds',
  gallery: 'gallery',
  music: 'profile-music',
  payment: 'payment-proofs'
}

export function ownerEmail() {
  return String(import.meta.env.VITE_OWNER_EMAIL || import.meta.env.OWNER_EMAIL || '').trim().toLowerCase()
}

export function resolveRole(user) {
  const email = String(user?.email || '').toLowerCase()
  return email && email === ownerEmail() ? 'owner' : (user?.role || 'user')
}

export function cleanProfileForDb(profile = {}, userId) {
  const allowed = [
    'username', 'display_name', 'bio', 'avatar_url', 'background_url', 'background_type', 'background_overlay',
    'background_blur', 'background_brightness', 'background_saturation', 'music_source_type', 'music_recommendation_id',
    'music_direct_url', 'music_external_url', 'music_upload_url', 'music_title', 'music_artist', 'music_url', 'music_cover_url',
    'music_loop', 'music_volume', 'music_fallback_text', 'music_equalizer_enabled', 'theme_name', 'accent_color',
    'button_color', 'glow_color', 'text_color', 'layout_name', 'language', 'visibility', 'show_views', 'show_music',
    'show_badges', 'show_gallery', 'show_quotes', 'show_particles', 'show_cursor', 'effect_preset', 'effect_intensity',
    'show_star_dust', 'show_bokeh', 'show_floating_orb', 'show_glass_shine', 'show_blue_aura', 'show_button_ripple',
    'show_click_sparkle', 'show_card_floating', 'show_avatar_pulse', 'show_music_equalizer', 'show_page_transition',
    'show_custom_cursor', 'cursor_style', 'button_effect_style', 'page_transition_style', 'particle_amount', 'glow_intensity',
    'motion_speed', 'reduce_motion', 'is_hidden_from_explore'
  ]
  const row = {}
  for (const key of allowed) {
    if (profile[key] !== undefined) row[key] = profile[key]
  }
  if (userId) row.user_id = userId
  if (row.display_name) row.display_name = cleanText(row.display_name, 32).slice(0, 32)
  if (row.bio) row.bio = cleanText(row.bio, 280).slice(0, 280)
  if (!row.music_source_type) row.music_source_type = row.music_url ? 'direct_audio' : 'none'
  return row
}

export async function getCurrentUser() {
  if (!supabaseReady) return null
  const { data } = await supabase.auth.getUser()
  return data?.user || null
}

export async function loadPublicProfile(username) {
  if (!supabaseReady || !username) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(PUBLIC_PROFILE_COLUMNS)
    .eq('username', username)
    .maybeSingle()

  if (error || !profile) return null

  const userId = profile.user_id
  const [linksRes, badgesRes, quotesRes, galleryRes] = await Promise.all([
    supabase.from('social_links').select('*').eq('user_id', userId).eq('is_active', true).order('sort_order', { ascending: true }),
    supabase.from('badges').select('*').eq('user_id', userId).eq('is_active', true).order('sort_order', { ascending: true }),
    supabase.from('quotes').select('*').eq('user_id', userId).eq('is_active', true).order('sort_order', { ascending: true }),
    supabase.from('gallery_items').select('*').eq('user_id', userId).eq('is_active', true).order('sort_order', { ascending: true })
  ])

  return {
    profile,
    links: linksRes.data || [],
    badges: badgesRes.data || [],
    quotes: quotesRes.data || [],
    gallery: galleryRes.data || []
  }
}

export async function loadUserBundle(userId) {
  if (!supabaseReady || !userId) return null
  const { data: profile } = await supabase.from('profiles').select('*').eq('user_id', userId).maybeSingle()
  if (!profile) return null
  return loadPublicProfile(profile.username)
}

export async function saveProfile(profile, userId) {
  if (!supabaseReady || !userId) return { ok: false, localOnly: true }
  const row = cleanProfileForDb(profile, userId)
  const { data, error } = await supabase.from('profiles').upsert(row, { onConflict: 'user_id' }).select('*').single()
  if (error) return { ok: false, error }
  return { ok: true, profile: data }
}

export async function ensureStarterProfile(user, draftProfile = {}) {
  if (!supabaseReady || !user?.id) return null
  const existing = await loadUserBundle(user.id)
  if (existing?.profile) return existing

  const usernameFromMeta = user.user_metadata?.username || draftProfile.username || String(user.email || 'user').split('@')[0].toLowerCase().replace(/[^a-z0-9._]/g, '').slice(0, 24)
  const username = usernameFromMeta || `user_${String(user.id).slice(0, 8)}`
  const display = draftProfile.display_name || username
  const row = cleanProfileForDb({
    ...draftProfile,
    username,
    display_name: display,
    bio: draftProfile.bio || 'just a quiet page for the things i like.',
    visibility: 'public',
    theme_name: draftProfile.theme_name || 'Pearl Calm',
    show_music: true,
    music_source_type: draftProfile.music_source_type || 'none'
  }, user.id)

  await supabase.from('profiles').upsert(row, { onConflict: 'user_id' })
  await Promise.all([
    supabase.from('badges').insert([
      { user_id: user.id, label: 'calm', color: 'rose', style: 'glass', sort_order: 1 },
      { user_id: user.id, label: 'soft', color: 'lavender', style: 'glass', sort_order: 2 },
      { user_id: user.id, label: 'personal', color: 'blue', style: 'glass', sort_order: 3 }
    ]).select().then(() => null),
    supabase.from('quotes').insert([
      { user_id: user.id, text: 'softly, quietly.', animation: 'fade', sort_order: 1 },
      { user_id: user.id, text: 'less noise, more meaning.', animation: 'fade', sort_order: 2 },
      { user_id: user.id, text: 'simple pages feel better.', animation: 'fade', sort_order: 3 }
    ]).select().then(() => null)
  ])

  return loadUserBundle(user.id)
}

function safeFileName(name = 'file') {
  return String(name).toLowerCase().replace(/[^a-z0-9._-]/g, '-').replace(/-+/g, '-').slice(0, 80)
}

export async function uploadUserFile(kind, userId, file) {
  if (!supabaseReady || !userId || !file) throw new Error('Upload is not ready.')
  const bucket = STORAGE_BUCKETS[kind] || STORAGE_BUCKETS.gallery
  const path = `${userId}/${Date.now()}-${safeFileName(file.name)}`
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true, contentType: file.type })
  if (error) throw error
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function incrementProfileView(profileId) {
  if (!supabaseReady || !profileId) return
  await supabase.from('analytics_events').insert({ profile_id: profileId, event_type: 'profile_view', metadata: {} })
  await supabase.rpc('increment_profile_view', { profile_id_input: profileId }).catch(() => null)
}

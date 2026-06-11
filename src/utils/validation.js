export function safeUsername(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9._]/g, '').replace(/^[._]+/g, '').slice(0, 32);
}

export function validateUrl(value) {
  if (!value) return { ok: true, message: '' };
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return { ok: false, message: 'URL must use http or https.' };
    return { ok: true, message: '' };
  } catch {
    return { ok: false, message: 'URL format is not valid.' };
  }
}

export function validateFile(file, kind = 'image') {
  if (!file) return { ok: false, message: 'No file selected.' };
  const max = kind === 'music' ? 12 * 1024 * 1024 : 6 * 1024 * 1024;
  const accept = {
    image: ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml'],
    music: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg'],
    video: ['video/mp4', 'video/webm'],
    cursor: ['image/png', 'image/svg+xml']
  }[kind] || [];
  if (accept.length && !accept.includes(file.type)) return { ok: false, message: `File type not supported: ${file.type || 'unknown'}` };
  if (file.size > max) return { ok: false, message: `File is too large. Max ${(max / 1024 / 1024).toFixed(0)}MB.` };
  return { ok: true, message: 'File looks good.' };
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}

export function escapeText(value) {
  return String(value || '').replace(/[<>]/g, '');
}

export function profileHealth(profile) {
  const notes = [];
  if (!profile.avatar) notes.push('Upload avatar agar profile lebih hidup.');
  if (!profile.background) notes.push('Background masih kosong, coba pakai soft blue atau aurora.');
  if ((profile.bio || '').length < 24) notes.push('Bio masih pendek, tambahkan satu kalimat yang jelas.');
  if ((profile.apps || []).filter((app) => app.visible).length === 0) notes.push('Tambahkan minimal satu app/link utama.');
  if ((profile.apps || []).length > 8) notes.push('Link cukup banyak, pin satu link yang paling penting.');
  const score = Math.max(10, 100 - notes.length * 18);
  return { score, notes };
}

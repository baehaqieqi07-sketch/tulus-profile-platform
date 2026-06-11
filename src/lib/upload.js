const SAFE_IMAGE = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const SAFE_AUDIO = ['audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/wav', 'audio/x-wav', 'audio/mp4', 'audio/m4a']
export function validateUpload(file, kind = 'image', maxMb = 8) {
  if (!file) return { ok: false, message: 'No file selected.' }
  const allowed = kind === 'music' ? SAFE_AUDIO : SAFE_IMAGE
  if (!allowed.includes(file.type)) return { ok: false, message: 'File type is not allowed.' }
  if (file.size > maxMb * 1024 * 1024) return { ok: false, message: `File must be under ${maxMb}MB.` }
  return { ok: true }
}
export function previewFile(file) { return file ? URL.createObjectURL(file) : '' }

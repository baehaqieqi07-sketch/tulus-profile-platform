export default function MusicUploadButton({ onPick, uploading = false }) {
  return (
    <label className="upload-soft">{uploading ? 'Uploading music...' : 'Upload Music'}
      <input disabled={uploading} type="file" accept="audio/mpeg,audio/ogg,audio/wav,audio/mp4,audio/aac,audio/flac" onChange={(e) => onPick?.(e.target.files?.[0])} />
      <small>mp3, ogg, wav, m4a, aac, or flac. File is saved to Supabase Storage bucket profile-music when Supabase is ready.</small>
    </label>
  )
}

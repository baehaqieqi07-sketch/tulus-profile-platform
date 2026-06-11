export default function MusicUploadButton({ onPick }) {
  return (
    <label className="upload-soft">Upload Music
      <input type="file" accept="audio/mpeg,audio/ogg,audio/wav" onChange={(e) => onPick?.(e.target.files?.[0])} />
      <small>mp3, ogg, or wav only. Production upload should go to Supabase Storage in the user folder.</small>
    </label>
  )
}

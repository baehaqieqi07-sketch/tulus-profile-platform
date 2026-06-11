export default function MusicEqualizer({ playing }) {
  return <div className={`equalizer ${playing ? 'is-playing' : ''}`} aria-hidden="true"><b /><b /><b /></div>
}

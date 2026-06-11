export default function NotFound({ quiet = false }) {
  return (
    <main className="not-found">
      <div className="glass-card not-found-card">
        <p className="eyebrow">{quiet ? 'quiet page' : 'not found'}</p>
        <h1>page not found</h1>
        {!quiet && <a className="primary-button" href="/">Back home</a>}
      </div>
    </main>
  )
}

export default function MusicRecommendationCard({ item, selected, onUse, onPreview }) {
  return (
    <article className={`music-rec-card ${selected ? 'active' : ''}`}>
      <div className="music-cover-soft">{item.cover_url ? <img src={item.cover_url} alt="" /> : <span>{item.category?.slice(0, 1) || 'm'}</span>}</div>
      <div>
        <strong>{item.title}</strong>
        <small>{item.artist}</small>
        <p>{item.category} • {item.mood}{item.is_premium ? ' • premium' : ''}</p>
      </div>
      <div className="music-rec-actions">
        <button type="button" className="ghost-button" onClick={() => onPreview?.(item)}>Preview</button>
        <button type="button" className="secondary-button" onClick={() => onUse?.(item)}>Use</button>
      </div>
    </article>
  )
}

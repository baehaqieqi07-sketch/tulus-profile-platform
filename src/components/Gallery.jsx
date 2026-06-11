import { useState } from 'react'

export default function Gallery({ items = [], show = true }) {
  const [open, setOpen] = useState(null)
  const active = items.filter((item) => item.is_active !== false).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  if (!show || !active.length) return null
  return (
    <section className="gallery-block">
      <div className="section-label">moments</div>
      <div className="gallery-grid">
        {active.map((item, index) => (
          <button key={item.id || index} className="gallery-item" onClick={() => setOpen(item)}>
            {item.image_url ? <img src={item.image_url} alt={item.title || 'gallery item'} /> : <span>{item.title || 'soft moment'}</span>}
          </button>
        ))}
      </div>
      {open && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <div className="lightbox-card">
            {open.image_url ? <img src={open.image_url} alt={open.title || 'gallery item'} /> : <div className="placeholder-large">{open.title || 'soft moment'}</div>}
            <p>{open.title}</p>
          </div>
        </div>
      )}
    </section>
  )
}

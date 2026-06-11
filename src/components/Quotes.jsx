export default function Quotes({ quotes = [], show = true }) {
  const active = quotes.filter((quote) => quote.is_active !== false).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  if (!show || !active.length) return null
  return (
    <div className="quotes-block">
      {active.slice(0, 3).map((quote) => <p key={quote.id || quote.text} className={`quote quote-${quote.animation || 'fade'}`}>{quote.text}</p>)}
    </div>
  )
}

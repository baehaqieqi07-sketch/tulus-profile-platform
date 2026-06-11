import { useState } from 'react'
export default function QuoteEditor({ quotes, setQuotes }) {
  const [text, setText] = useState('')
  const add = () => {
    if (!text.trim()) return
    setQuotes((prev) => [...prev, { id: crypto.randomUUID(), text: text.trim(), animation: 'fade', is_active: true, sort_order: prev.length + 1 }])
    setText('')
  }
  return (
    <div className="editor-panel">
      <p className="eyebrow">quotes</p>
      <h2>Less noise, more meaning.</h2>
      <div className="mini-form inline"><input value={text} maxLength="160" placeholder="softly, quietly." onChange={(e) => setText(e.target.value)} /><button className="secondary-button" onClick={add}>Add quote</button></div>
      <div className="stack-list">{quotes.map((quote) => <div className="stack-item" key={quote.id}><input value={quote.text} onChange={(e) => setQuotes((prev) => prev.map((q) => q.id === quote.id ? { ...q, text: e.target.value } : q))} /><select value={quote.animation} onChange={(e) => setQuotes((prev) => prev.map((q) => q.id === quote.id ? { ...q, animation: e.target.value } : q))}><option>fade</option><option>type soft</option><option>slide</option><option>none</option></select><button className="ghost-button" onClick={() => setQuotes((prev) => prev.filter((q) => q.id !== quote.id))}>remove</button></div>)}</div>
    </div>
  )
}

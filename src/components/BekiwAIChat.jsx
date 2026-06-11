import { useMemo, useRef, useState } from 'react'
import { TULUS_KNOWLEDGE, answerFromKnowledge } from '../lib/bekiwKnowledge.js'

const starter = [
  'Cara bikin profile publik?',
  'Cara masukin musik?',
  'Kenapa YouTube tidak autoplay?',
  'Cara upload background?',
  'Cara buka owner panel?'
]

export default function BekiwAIChat({ compact = false }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Halo, aku bekiw. Aku bisa bantu kamu pakai TULUS: profile, dashboard, musik, upload, premium, owner panel, dan security. Mau dibantu bagian apa?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const boxRef = useRef(null)
  const endpoint = import.meta.env.VITE_BEKIW_AI_ENDPOINT
  const context = useMemo(() => TULUS_KNOWLEDGE.map((x) => `${x.title}: ${x.body}`).join('\n'), [])

  async function send(text = input) {
    const clean = text.trim()
    if (!clean) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: clean }])
    setLoading(true)
    try {
      let answer = ''
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: clean, context })
        })
        if (res.ok) {
          const data = await res.json()
          answer = data.answer || data.output_text || ''
        }
      }
      if (!answer) answer = answerFromKnowledge(clean)
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }])
      requestAnimationFrame(() => boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' }))
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: answerFromKnowledge(clean) }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={`bekiw-ai ${compact ? 'compact' : ''}`}>
      <div className="bekiw-ai-head">
        <div className="bekiw-avatar">B</div>
        <div><b>bekiw</b><span>AI support for TULUS</span></div>
        <i>online</i>
      </div>
      <div className="bekiw-ai-messages" ref={boxRef}>
        {messages.map((m, i) => <p key={i} className={m.role}><span>{m.text}</span></p>)}
        {loading && <p className="assistant"><span>bekiw lagi mikir sebentar…</span></p>}
      </div>
      <div className="bekiw-ai-chips">
        {starter.slice(0, compact ? 3 : 5).map((x) => <button key={x} onClick={() => send(x)}>{x}</button>)}
      </div>
      <form className="bekiw-ai-input" onSubmit={(e) => { e.preventDefault(); send() }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tanya bekiw tentang TULUS..." />
        <button type="submit">Send</button>
      </form>
    </section>
  )
}

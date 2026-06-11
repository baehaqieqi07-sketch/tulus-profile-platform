import { useMemo, useRef, useState } from 'react'
import TulusLogo from './TulusLogo.jsx'
import { TULUS_KNOWLEDGE, answerFromKnowledge } from '../lib/bekiwKnowledge.js'

const starter = [
  'Bantu aku bikin profile yang bagus',
  'Cara upload background dan avatar?',
  'Cara pasang musik YouTube atau MP3?',
  'Kenapa owner panel page not found?',
  'Cara bikin dashboard lebih premium?'
]

function detectLanguage(text = '') {
  if (/kumaha|abdi|maneh|sunda|bogor/i.test(text)) return 'su'
  if (/how|why|what|where|can|help|profile|music/i.test(text)) return 'en'
  return 'id'
}

function humanizeAnswer(text, question) {
  const lang = detectLanguage(question)
  if (lang === 'en') return `Got it. ${text}\n\nI’ll keep it simple: open the page or dashboard section mentioned above, change one thing, save, then check your public profile. If it still feels off, send the exact screenshot and I’ll point to the next button.`
  if (lang === 'su') return `Oke, ku bekiw bantu pelan-pelan. ${text}\n\nIntina ulah ngarobah loba-loba heula. Buka bagian anu tadi, simpen, terus cek /bekiw.`
  return `Oke, aku bantu pelan-pelan. ${text}\n\nBiar nggak pusing: buka menu yang aku sebutin, ubah satu bagian dulu, klik save, terus cek /bekiw. Kalau masih beda, kirim screenshot bagian itu aja.`
}

export default function BekiwAIChat({ compact = false }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Halo, aku bekiw. Aku ngerti alur TULUS: login, register, onboarding, profile publik, dashboard, upload, musik, effects, premium, owner panel, dan security. Mau aku bantu bagian apa dulu?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [typingText, setTypingText] = useState('')
  const boxRef = useRef(null)
  const endpoint = import.meta.env.VITE_BEKIW_AI_ENDPOINT
  const context = useMemo(() => TULUS_KNOWLEDGE.map((x) => `${x.title}: ${x.body}`).join('\n'), [])

  async function typeAnswer(answer) {
    setTypingText('')
    const words = answer.split(' ')
    for (let i = 0; i < words.length; i++) {
      await new Promise((r) => setTimeout(r, compact ? 8 : 16))
      setTypingText((prev) => `${prev}${prev ? ' ' : ''}${words[i]}`)
    }
    setMessages((prev) => [...prev, { role: 'assistant', text: answer }])
    setTypingText('')
    requestAnimationFrame(() => boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' }))
  }

  async function send(text = input) {
    const clean = text.trim()
    if (!clean) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: clean }])
    setLoading(true)
    try {
      let answer = ''
      if (endpoint) {
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: clean, context, tone: 'friendly-human-help-center', name: 'bekiw' }) })
        if (res.ok) {
          const data = await res.json()
          answer = data.answer || data.output_text || ''
        }
      }
      if (!answer) answer = humanizeAnswer(answerFromKnowledge(clean), clean)
      await typeAnswer(answer)
    } catch {
      await typeAnswer(humanizeAnswer(answerFromKnowledge(clean), clean))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={`bekiw-ai v500-ai ${compact ? 'compact' : ''}`}>
      <div className="bekiw-ai-head">
        <div className="bekiw-avatar"><TulusLogo compact /></div>
        <div><b>bekiw</b><span>AI help center • understands TULUS</span></div>
        <i>{loading ? 'typing…' : 'online'}</i>
      </div>
      <div className="bekiw-ai-messages" ref={boxRef}>
        {messages.map((m, i) => <p key={i} className={m.role}><span>{m.text}</span></p>)}
        {loading && !typingText && <p className="assistant typing"><span><i/><i/><i/></span></p>}
        {typingText && <p className="assistant"><span>{typingText}</span></p>}
      </div>
      <div className="bekiw-ai-chips">
        {starter.slice(0, compact ? 3 : 5).map((x) => <button key={x} type="button" onClick={() => send(x)}>{x}</button>)}
      </div>
      <form className="bekiw-ai-input" onSubmit={(e) => { e.preventDefault(); send() }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Chat bekiw seperti chat biasa..." />
        <button type="submit">Send</button>
      </form>
    </section>
  )
}

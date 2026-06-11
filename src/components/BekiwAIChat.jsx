import { useMemo, useRef, useState } from 'react'
import TulusLogo from './TulusLogo.jsx'
import { TULUS_KNOWLEDGE, answerFromKnowledge } from '../lib/bekiwKnowledge.js'
import { useTulusLanguage } from '../lib/i18n.js'

const starterByLang = {
  id: ['Bantu aku rapihin profile', 'Cara ganti bahasa?', 'Cara bikin musik bunyi?', 'Kenapa owner panel 404?', 'Game Center itu apa?'],
  en: ['Help me improve my profile', 'How do I change language?', 'How do I make music play?', 'Why is owner panel 404?', 'What is Game Center?'],
  su: ['Bantos rapihkeun profile', 'Kumaha ganti basa?', 'Kumaha musik jalan?', 'Naha owner panel 404?', 'Game Center naon?'],
  vi: ['Giúp tôi làm hồ sơ đẹp hơn', 'Cách đổi ngôn ngữ?', 'Cách bật nhạc?', 'Vì sao owner panel 404?', 'Game Center là gì?']
}

function detectLanguage(text = '', fallback = 'id') {
  if (/^[\s\S]*[ぁ-んァ-ン一-龯]/.test(text)) return 'ja'
  if (/^[\s\S]*[가-힣]/.test(text)) return 'ko'
  if (/^[\s\S]*[ء-ي]/.test(text)) return 'ar'
  if (/kumaha|abdi|saha|naha|basa|sunda/i.test(text)) return 'su'
  if (/cách|ngôn ngữ|hồ sơ|nhạc|đăng nhập|trợ giúp/i.test(text)) return 'vi'
  if (/how|why|what|where|can|help|profile|music|upload|language/i.test(text)) return 'en'
  return fallback || 'id'
}

function intro(lang) {
  if (lang === 'en') return 'Hi, I’m bekiw. I understand TULUS: profile, dashboard, links, music, upload, language, games, analytics, premium, owner panel, and security. Ask me like a normal chat.'
  if (lang === 'su') return 'Halo, abdi bekiw. Abdi ngartos TULUS: profile, dashboard, link, musik, upload, basa, game, analytics, premium, owner panel, jeung security.'
  if (lang === 'vi') return 'Xin chào, mình là bekiw. Mình hiểu TULUS: hồ sơ, dashboard, liên kết, nhạc, upload, ngôn ngữ, game, analytics, premium, owner panel và bảo mật.'
  return 'Halo, aku bekiw. Aku paham TULUS: profile, dashboard, link, musik, upload, bahasa, game, analytics, premium, owner panel, dan security. Tanya aja kayak chat biasa.'
}

function polish(text, question, lang) {
  const qLang = detectLanguage(question, lang)
  if (qLang === 'en') return `${text}\n\nDo this one step at a time: open the section, change one thing, save, then check your public profile. No need to touch other settings first.`
  if (qLang === 'su') return `${text}\n\nLakukeun hiji-hiji: buka bagianna, robah hiji heula, simpen, terus cek profile publik.`
  if (qLang === 'ja') return `${text}\n\n一つずつ進めてください。該当セクションを開いて、1つ変更し、保存してから公開プロフィールを確認します。`
  if (qLang === 'ko') return `${text}\n\n한 번에 하나씩 하세요. 해당 메뉴를 열고 하나만 바꾼 뒤 저장하고 공개 프로필을 확인하세요.`
  if (qLang === 'ar') return `${text}\n\nافعلها خطوة بخطوة: افتح القسم، غيّر شيئًا واحدًا، احفظ، ثم افحص الملف العام.`
  if (qLang === 'vi') return `${text}\n\nLàm từng bước: mở đúng mục, đổi một phần, bấm save, rồi kiểm tra public profile.`
  return `${text}\n\nBiar gampang: buka menu yang disebut, ubah satu bagian dulu, klik save, lalu cek profile publik. Jangan ubah semuanya sekaligus.`
}

export default function BekiwAIChat({ compact = false }) {
  const { lang, t } = useTulusLanguage()
  const [messages, setMessages] = useState([{ role: 'assistant', text: intro(lang), time: 'now' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [typingText, setTypingText] = useState('')
  const boxRef = useRef(null)
  const endpoint = import.meta.env.VITE_BEKIW_AI_ENDPOINT
  const context = useMemo(() => TULUS_KNOWLEDGE.map((x) => `${x.title}: ${x.body}`).join('\n'), [])
  const starter = starterByLang[lang] || starterByLang.id

  async function typeAnswer(answer) {
    setTypingText('')
    const chunks = answer.split(/(\s+)/)
    for (let i = 0; i < chunks.length; i++) {
      await new Promise((r) => setTimeout(r, compact ? 7 : 13))
      setTypingText((prev) => `${prev}${chunks[i]}`)
    }
    setMessages((prev) => [...prev, { role: 'assistant', text: answer, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setTypingText('')
    requestAnimationFrame(() => boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' }))
  }

  async function send(text = input) {
    const clean = text.trim()
    if (!clean || loading) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: clean, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setLoading(true)
    try {
      let answer = ''
      if (endpoint) {
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: clean, context, language: detectLanguage(clean, lang), tone: 'friendly-human-help-center', name: 'bekiw' }) })
        if (res.ok) {
          const data = await res.json()
          answer = data.answer || data.output_text || ''
        }
      }
      if (!answer) answer = polish(answerFromKnowledge(clean), clean, lang)
      await typeAnswer(answer)
    } catch {
      await typeAnswer(polish(answerFromKnowledge(clean), clean, lang))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={`bekiw-ai v500-ai million-ai ${compact ? 'compact' : ''}`}>
      <div className="bekiw-ai-head">
        <div className="bekiw-avatar"><TulusLogo compact /></div>
        <div><b>bekiw</b><span>{t('aiTitle')} • TULUS specialist</span></div>
        <i>{loading ? 'typing…' : 'online'}</i>
        <button type="button" className="bekiw-clear" onClick={() => setMessages([{ role: 'assistant', text: intro(lang), time: 'now' }])}>clear</button>
      </div>
      <div className="bekiw-ai-messages" ref={boxRef}>
        {messages.map((m, i) => <p key={i} className={m.role}><span>{m.text}</span><small>{m.time}</small></p>)}
        {loading && !typingText && <p className="assistant typing"><span><i/><i/><i/></span></p>}
        {typingText && <p className="assistant"><span>{typingText}</span><small>typing</small></p>}
      </div>
      <div className="bekiw-ai-chips">
        {starter.slice(0, compact ? 3 : 5).map((x) => <button key={x} type="button" onClick={() => send(x)}>{x}</button>)}
      </div>
      <form className="bekiw-ai-input" onSubmit={(e) => { e.preventDefault(); send() }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={lang === 'en' ? 'Message bekiw…' : lang === 'su' ? 'Kirim pesen ka bekiw…' : lang === 'vi' ? 'Nhắn cho bekiw…' : 'Chat bekiw seperti chat biasa…'} />
        <button type="submit">{t('send')}</button>
      </form>
    </section>
  )
}

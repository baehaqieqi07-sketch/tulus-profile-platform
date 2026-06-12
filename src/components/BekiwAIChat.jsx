import { useEffect, useMemo, useRef, useState } from 'react'
import TulusLogo from './TulusLogo.jsx'
import PremiumButton from './PremiumButton.jsx'
import { TULUS_KNOWLEDGE, answerFromKnowledge } from '../lib/bekiwKnowledge.js'
import { useTulusLanguage } from '../lib/i18n.js'
import { supabase, supabaseReady } from '../lib/supabase.js'

const HISTORY_KEY = 'tulus.bekiw.chat.v3'

const starterByLang = {
  id: ['Cara ubah background?', 'Cara tambah link Discord?', 'Kenapa YouTube tidak autoplay?', 'Cara pakai MP3?', 'Cara ganti bahasa?'],
  en: ['How do I change background?', 'How do I add Discord?', 'Why does YouTube not autoplay?', 'How do I use MP3?', 'How do I change language?'],
  ja: ['背景を変えるには？', 'Discordリンクを追加するには？', 'YouTubeが自動再生しない理由は？'],
  ko: ['배경은 어떻게 바꾸나요?', 'Discord 링크는 어떻게 추가하나요?', 'YouTube가 자동 재생되지 않는 이유는?'],
  ar: ['كيف أغير الخلفية؟', 'كيف أضيف رابط Discord؟', 'لماذا لا يعمل YouTube تلقائياً؟'],
  vi: ['Cách đổi background?', 'Cách thêm link Discord?', 'Vì sao YouTube không tự phát?']
}

function detectLanguage(text = '', fallback = 'id') {
  if (/[ぁ-んァ-ン一-龯]/.test(text)) return 'ja'
  if (/[가-힣]/.test(text)) return 'ko'
  if (/[ء-ي]/.test(text)) return 'ar'
  if (/cách|ngôn ngữ|hồ sơ|nhạc|đăng nhập|trợ giúp/i.test(text)) return 'vi'
  if (/como|por qué|ayuda|perfil|música/i.test(text)) return 'es'
  if (/comment|aide|profil|musique/i.test(text)) return 'fr'
  if (/wie|hilfe|profil|musik/i.test(text)) return 'de'
  if (/how|why|what|where|can|help|profile|music|upload|language/i.test(text)) return 'en'
  return fallback || 'id'
}

function intro(lang) {
  if (lang === 'en') return 'Hi, I’m bekiw. I can help with TULUS: profile, dashboard, links, music, uploads, language, games, analytics, premium, security, and setup. Ask me like a normal chat.'
  if (lang === 'ja') return 'こんにちは、bekiwです。TULUS のプロフィール、音楽、リンク、アップロード、言語、ゲーム、セキュリティを手伝えます。'
  if (lang === 'ko') return '안녕, 나는 bekiw야. TULUS의 프로필, 음악, 링크, 업로드, 언어, 게임, 보안 설정을 도와줄게.'
  if (lang === 'ar') return 'مرحباً، أنا bekiw. أساعدك في TULUS: الملف الشخصي، الموسيقى، الروابط، الرفع، اللغة، الألعاب، والأمان.'
  if (lang === 'vi') return 'Xin chào, mình là bekiw. Mình hỗ trợ TULUS: hồ sơ, link, nhạc, upload, ngôn ngữ, game, analytics, premium và bảo mật.'
  return 'Halo, aku bekiw. Aku bisa bantu TULUS: profile, dashboard, link, musik, upload, bahasa, game, analytics, premium, security, sampai setup. Tanya aja kayak chat biasa.'
}

function polish(text, question, lang) {
  const qLang = detectLanguage(question, lang)
  if (qLang === 'en') return `${text}\n\nDo it step by step: open the right page, change one thing, save, then check your public profile.`
  if (qLang === 'ja') return `${text}\n\n一つずつ進めてください。該当ページを開いて、1つ変更し、保存してから公開プロフィールを確認します。`
  if (qLang === 'ko') return `${text}\n\n한 번에 하나씩 하세요. 해당 페이지를 열고 하나만 바꾼 뒤 저장하고 공개 프로필을 확인하세요.`
  if (qLang === 'ar') return `${text}\n\nافعلها خطوة بخطوة: افتح الصفحة المناسبة، غيّر شيئًا واحدًا، احفظ، ثم افحص الملف العام.`
  if (qLang === 'vi') return `${text}\n\nLàm từng bước: mở đúng trang, đổi một phần, bấm save, rồi kiểm tra public profile.`
  return `${text}\n\nBiar gampang: buka halaman yang disebut, ubah satu bagian dulu, klik save, lalu cek profile publik.`
}

function readHistory(lang) {
  try {
    const saved = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
    return Array.isArray(saved) && saved.length ? saved.slice(-20) : [{ role: 'assistant', text: intro(lang), time: 'now', liked: null }]
  } catch {
    return [{ role: 'assistant', text: intro(lang), time: 'now', liked: null }]
  }
}

export default function BekiwAIChat({ compact = false }) {
  const { lang, t } = useTulusLanguage()
  const [messages, setMessages] = useState(() => readHistory(lang))
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [typingText, setTypingText] = useState('')
  const boxRef = useRef(null)
  const context = useMemo(() => TULUS_KNOWLEDGE.map((x) => `${x.title}: ${x.body}`).join('\n'), [])
  const starter = starterByLang[lang] || starterByLang.id

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-20)))
    requestAnimationFrame(() => boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' }))
  }, [messages, typingText])

  async function typeAnswer(answer) {
    setTypingText('')
    const chunks = answer.split(/(\s+)/)
    for (let i = 0; i < chunks.length; i++) {
      await new Promise((r) => setTimeout(r, compact ? 5 : 10))
      setTypingText((prev) => `${prev}${chunks[i]}`)
    }
    setMessages((prev) => [...prev, { role: 'assistant', text: answer, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), liked: null }])
    setTypingText('')
  }

  async function getServerAnswer(clean) {
    const payload = { message: clean, context, language: detectLanguage(clean, lang), tone: 'friendly-human-help-center', name: 'bekiw' }
    if (supabaseReady && supabase?.functions) {
      const { data, error } = await supabase.functions.invoke('bekiw-help-ai', { body: payload })
      if (!error && data?.answer) return data.answer
    }
    const endpoint = import.meta.env.VITE_BEKIW_AI_ENDPOINT
    if (endpoint) {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) {
        const data = await res.json()
        return data.answer || data.output_text || ''
      }
    }
    return ''
  }

  async function send(text = input) {
    const clean = text.trim()
    if (!clean || loading) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: clean, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setLoading(true)
    try {
      const server = await getServerAnswer(clean)
      const answer = server || polish(answerFromKnowledge(clean), clean, lang)
      await typeAnswer(answer)
    } catch {
      await typeAnswer(polish(answerFromKnowledge(clean), clean, lang))
    } finally {
      setLoading(false)
    }
  }

  function clearChat() {
    const first = [{ role: 'assistant', text: intro(lang), time: 'now', liked: null }]
    setMessages(first)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(first))
  }

  function rate(index, liked) {
    setMessages((prev) => prev.map((msg, i) => i === index ? { ...msg, liked } : msg))
  }

  return (
    <section className={`bekiw-ai v500-ai million-ai luxury-ai ${compact ? 'compact' : ''}`}>
      <div className="bekiw-ai-head">
        <div className="bekiw-avatar"><TulusLogo compact /></div>
        <div><b>bekiw</b><span>{t('statusOnline')} • TULUS specialist</span></div>
        <i>{loading ? t('thinking') : t('statusOnline')}</i>
        <button type="button" className="bekiw-clear" onClick={clearChat}>{t('clear')}</button>
      </div>
      <div className="bekiw-ai-messages" ref={boxRef}>
        {messages.map((m, i) => (
          <p key={i} className={m.role}>
            <span>{m.text}</span>
            <small>{m.time}</small>
            {m.role === 'assistant' && !compact ? <em className="bekiw-actions"><button onClick={() => navigator.clipboard?.writeText(m.text)}>{t('copy')}</button><button onClick={() => rate(i, true)}>{m.liked === true ? 'liked' : 'like'}</button><button onClick={() => rate(i, false)}>{m.liked === false ? 'reported' : 'report'}</button></em> : null}
          </p>
        ))}
        {loading && !typingText && <p className="assistant typing"><span><i/><i/><i/></span></p>}
        {typingText && <p className="assistant"><span>{typingText}</span><small>typing</small></p>}
      </div>
      <div className="bekiw-ai-chips">
        {starter.slice(0, compact ? 3 : 5).map((x) => <button key={x} type="button" onClick={() => send(x)}>{x}</button>)}
      </div>
      {!compact && <div className="bekiw-ai-chips secondary"><button type="button">Attach screenshot placeholder</button><button type="button">Suggested action</button><button type="button">Helpful?</button></div>}
      <form className="bekiw-ai-input" onSubmit={(e) => { e.preventDefault(); send() }}>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t('messageBekiw')} rows={1} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }} />
        <PremiumButton type="submit">{t('send')}</PremiumButton>
      </form>
    </section>
  )
}

import { useEffect, useMemo, useState } from 'react'
import TulusNav from '../components/TulusNav.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

const games = [
  { id: 'focus', name: 'Focus Tap', desc: 'Click the glowing orb before it fades. Calm reaction game for quick breaks.' },
  { id: 'memory', name: 'Memory Light', desc: 'Remember the soft blue sequence and repeat it.' },
  { id: 'aura', name: 'Aura Match', desc: 'Pick the matching color mood for your profile vibe.' },
  { id: 'word', name: 'Word Flow', desc: 'Build a short aesthetic quote from calm words.' }
]
const palette = ['#4F8CFF','#8FB7FF','#C8B8FF','#72E6C8','#F2C7D5']
const words = ['quiet','blue','soft','space','dream','glass','calm','light','aura','profile']
const SCORE_KEY = 'tulus.games.best.v2'
const STREAK_KEY = 'tulus.games.streak.v2'

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback } catch { return fallback }
}

function todayKey() { return new Date().toISOString().slice(0, 10) }

export default function GameCenter() {
  const { t } = useTulusLanguage()
  const [active, setActive] = useState('focus')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => readJson(SCORE_KEY, {}))
  const [streak, setStreak] = useState(() => readJson(STREAK_KEY, { days: 0, last: '' }))
  const [sequence, setSequence] = useState([0,2,1])
  const [picked, setPicked] = useState([])
  const [quote, setQuote] = useState([])
  const target = useMemo(() => Math.floor((score * 7 + active.length) % palette.length), [score, active])
  const bestScore = best[active] || 0

  useEffect(() => {
    if (score > bestScore) {
      const next = { ...best, [active]: score }
      setBest(next)
      localStorage.setItem(SCORE_KEY, JSON.stringify(next))
    }
  }, [score, bestScore, best, active])

  function bump(points = 1) {
    setScore((s) => Math.max(0, s + points))
    const today = todayKey()
    if (streak.last !== today) {
      const next = { days: Number(streak.days || 0) + 1, last: today }
      setStreak(next)
      localStorage.setItem(STREAK_KEY, JSON.stringify(next))
    }
  }

  const pickSeq = (i) => {
    const next = [...picked, i]
    setPicked(next)
    if (next.join(',') === sequence.slice(0,next.length).join(',')) {
      if (next.length === sequence.length) {
        bump(5)
        setPicked([])
        setSequence((s)=>[...s, Math.floor(Math.random()*4)])
      }
    } else {
      setPicked([])
      setScore((s)=>Math.max(0,s-1))
    }
  }

  return (
    <V7GlowBackground className="million-games-page">
      <TulusNav />
      <section className="million-games-hero"><p className="v100-kicker">{t('gameCenter')}</p><h1>Small games inside a premium profile platform.</h1><p>Mini game ringan, tidak gambling, tidak uang asli, score disimpan lokal, dan tetap rapi di HP/PC.</p></section>
      <section className="daily-challenge glass-card"><b>Daily mini challenge</b><span>Play one mini game today to keep your calm streak.</span><strong>{streak.days || 0} day streak</strong></section>
      <section className="million-games-layout">
        <aside>{games.map((g)=><button key={g.id} className={active===g.id?'active':''} onClick={()=>{setActive(g.id); setScore(0); setPicked([])}}><b>{g.name}</b><span>{g.desc}</span><small>Best {best[g.id] || 0}</small></button>)}</aside>
        <main>
          <div className="million-game-top"><TulusLogo compact /><div><b>{games.find(g=>g.id===active)?.name}</b><span>Score {score} • Best {bestScore}</span></div><button onClick={()=>setScore(0)}>Reset</button></div>
          {active === 'focus' && <div className="focus-game"><button className="focus-orb" onClick={()=>bump(1)}>tap</button><p>Tap the orb. Each tap raises your calm score.</p></div>}
          {active === 'memory' && <div className="memory-game"><p>Sequence length: {sequence.length}</p><div>{palette.slice(0,4).map((c,i)=><button key={c} style={{background:c}} onClick={()=>pickSeq(i)}>{i+1}</button>)}</div><small>Sequence preview: {sequence.map((x)=>x+1).join(' • ')}</small></div>}
          {active === 'aura' && <div className="aura-game"><p>Match the highlighted aura.</p><div>{palette.map((c,i)=><button key={c} className={i===target?'target':''} style={{background:c}} onClick={()=> i===target ? bump(3) : setScore(s=>Math.max(0,s-1)) } />)}</div></div>}
          {active === 'word' && <div className="word-game"><p>{quote.join(' ') || 'Pick words to create a profile quote.'}</p><div>{words.map((w)=><button key={w} onClick={()=>setQuote((q)=>q.length>5?[w]:[...q,w])}>{w}</button>)}</div><button onClick={()=>{bump(quote.length); setQuote([])}}>Save quote points</button></div>}
        </main>
      </section>
    </V7GlowBackground>
  )
}

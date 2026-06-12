import { useEffect, useMemo, useState } from 'react'
import TulusNav from '../components/TulusNav.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'

const GAMES = [
  { id:'rush', name:'Focus Rush', desc:'Tap target sebelum waktu habis. Combo bikin score makin besar.' },
  { id:'pulse', name:'Memory Pulse', desc:'Ingat urutan warna, lalu ulangi dengan tepat.' },
  { id:'aura', name:'Aura Clash', desc:'Cocokkan mood target dengan kartu aura yang benar.' },
  { id:'word', name:'Word Flow', desc:'Susun kalimat TULUS dari kata acak.' }
]
const colors = ['Blue','Pearl','Lavender','Cyan']
const aura = ['Calm','Luxe','Dream','Fresh']
const phrases = [['quiet','profile','space'], ['blue','glass','aura'], ['clean','link','flow'], ['music','after','enter']]
const BEST_KEY = 'tulus.arcade.best.v8'
const STREAK_KEY = 'tulus.arcade.streak.v8'
const read = (k,f)=>{ try { return JSON.parse(localStorage.getItem(k)) || f } catch { return f } }
const today = () => new Date().toISOString().slice(0,10)
const rnd = (n)=>Math.floor(Math.random()*n)
const shuffle = (arr)=>[...arr].sort(()=>Math.random()-.5)

export default function GameCenter() {
  const [active,setActive] = useState('rush')
  const [started,setStarted] = useState(false)
  const [score,setScore] = useState(0)
  const [combo,setCombo] = useState(0)
  const [time,setTime] = useState(30)
  const [best,setBest] = useState(()=>read(BEST_KEY,{}))
  const [streak,setStreak] = useState(()=>read(STREAK_KEY,{days:0,last:''}))
  const [status,setStatus] = useState('Pilih game dan tekan Start.')
  const [target,setTarget] = useState({x:45,y:45})
  const [sequence,setSequence] = useState(()=>[rnd(4),rnd(4),rnd(4)])
  const [picked,setPicked] = useState([])
  const [auraTarget,setAuraTarget] = useState(()=>aura[rnd(aura.length)])
  const [phrase,setPhrase] = useState(()=>phrases[rnd(phrases.length)])
  const [words,setWords] = useState(()=>shuffle([...phrases[0],'soft','halo','dark']))
  const current = GAMES.find(g=>g.id===active) || GAMES[0]
  const bestScore = best[active] || 0
  const totalBest = useMemo(()=>Object.values(best).reduce((a,b)=>a+Number(b||0),0),[best])
  useEffect(()=>{ if(score>bestScore){const next={...best,[active]:score}; setBest(next); localStorage.setItem(BEST_KEY,JSON.stringify(next))}},[score,bestScore,best,active])
  useEffect(()=>{ if(!started || active!=='rush') return; if(time<=0){setStarted(false); setStatus('Time up. Restart untuk kejar best score.'); return} const i=setInterval(()=>setTime(t=>Math.max(0,t-1)),1000); return()=>clearInterval(i)},[started,active,time])
  function mark(){ const d=today(); if(streak.last===d) return; const next={days:Number(streak.days||0)+1,last:d}; setStreak(next); localStorage.setItem(STREAK_KEY,JSON.stringify(next)) }
  function start(id=active){ setActive(id); setStarted(true); setScore(0); setCombo(0); setTime(30); setPicked([]); setTarget({x:15+rnd(70),y:18+rnd(60)}); const p=phrases[rnd(phrases.length)]; setPhrase(p); setWords(shuffle([...p,'soft','halo','dark','shine'])); setSequence([rnd(4),rnd(4),rnd(4)]); setAuraTarget(aura[rnd(aura.length)]); setStatus('Game started. Fokus, tapi tetap santai.'); mark() }
  function good(points,msg){ setScore(s=>s+points+Math.min(combo,10)); setCombo(c=>c+1); setStatus(msg) }
  function miss(msg){ setCombo(0); setScore(s=>Math.max(0,s-2)); setStatus(msg) }
  function hitTarget(){ if(!started) return; good(4,'Nice hit. Target pindah.'); setTarget({x:15+rnd(70),y:18+rnd(60)}) }
  function pickMemory(i){ if(!started) return; const next=[...picked,i]; if(sequence[next.length-1]!==i){ setPicked([]); miss('Salah urutan. Combo reset.'); return } if(next.length===sequence.length){ good(sequence.length*4,'Perfect pulse. Sequence naik.'); setPicked([]); setSequence(s=>[...s,rnd(4)]) } else { setPicked(next); setStatus(`${next.length}/${sequence.length} benar.`) } }
  function pickAura(x){ if(!started) return; if(x===auraTarget){ good(8,`Aura match: ${x}`); setAuraTarget(aura[rnd(aura.length)]) } else miss(`Bukan ${x}. Target: ${auraTarget}.`) }
  function pickWord(w){ if(!started) return; const next=[...picked,w]; if(phrase[next.length-1]!==w){ setPicked([]); miss('Kata salah. Susun ulang dari awal.'); return } if(next.length===phrase.length){ good(12,`Flow complete: ${phrase.join(' ')}`); const p=phrases[rnd(phrases.length)]; setPhrase(p); setWords(shuffle([...p,'soft','halo','dark','shine'])); setPicked([]) } else { setPicked(next); setStatus(`${next.length}/${phrase.length} kata benar.`) } }
  return <V7GlowBackground className="luxe-page luxe-arcade-page"><TulusNav />
    <section className="luxe-arcade-hero"><p className="luxe-kicker">Game Center</p><h1>Mini game yang beneran bisa dimainkan.</h1><p>Bukan kotak kosong. Ada start, score, best score, combo, streak, dan level lokal di device kamu.</p></section>
    <section className="luxe-arcade-stats"><article><small>Best total</small><b>{totalBest}</b></article><article><small>Daily streak</small><b>{streak.days||0}</b></article><article><small>Combo</small><b>{combo}x</b></article><article><small>Current score</small><b>{score}</b></article></section>
    <section className="luxe-arcade-layout"><aside className="luxe-game-list">{GAMES.map(g=><button key={g.id} className={active===g.id?'active':''} onClick={()=>start(g.id)}><b>{g.name}</b><span>{g.desc}</span><small>Best {best[g.id]||0}</small></button>)}</aside>
      <main className="luxe-game-stage"><div className="luxe-game-head"><div><small>{current.name}</small><h2>{status}</h2></div><button onClick={()=>start(active)}>{started?'Restart':'Start'}</button></div>
        {active==='rush' && <div className="luxe-rush-board" onClick={()=>started&&miss('Miss. Tap target-nya aja.')}><span>Time {time}s</span><button style={{left:`${target.x}%`,top:`${target.y}%`}} onClick={(e)=>{e.stopPropagation();hitTarget()}}>tap</button></div>}
        {active==='pulse' && <div className="luxe-pulse-board"><p>Sequence: {sequence.map(i=>colors[i]).join(' → ')}</p><div>{colors.map((c,i)=><button key={c} onClick={()=>pickMemory(i)}>{c}</button>)}</div></div>}
        {active==='aura' && <div className="luxe-aura-board"><h3>Target aura: {auraTarget}</h3><div>{aura.map(x=><button key={x} onClick={()=>pickAura(x)}>{x}</button>)}</div></div>}
        {active==='word' && <div className="luxe-word-board"><p>{picked.join(' ') || 'Susun kata sesuai flow.'}</p><div>{words.map((w,i)=><button key={`${w}-${i}`} onClick={()=>pickWord(w)}>{w}</button>)}</div></div>}
      </main>
    </section>
  </V7GlowBackground>
}

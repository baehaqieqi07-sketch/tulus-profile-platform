import { useEffect, useMemo, useState } from 'react'
import CleanNav from '../components/CleanNav.jsx'

const games = [
  ['rush','Focus Rush','Tap target bergerak, kumpulkan combo sebelum waktu habis.'],
  ['memory','Memory Pulse','Ingat urutan warna yang makin panjang.'],
  ['aura','Aura Clash','Pilih aura yang cocok dengan target. Makin cepat makin tinggi score.'],
  ['word','Word Flow','Susun kata jadi quote TULUS yang benar.']
]
const colors = ['blue','cyan','violet','pearl']
const words = ['quiet','profile','space','blue','glass','music','links','aura']
const quotes = ['quiet profile space','blue glass music','links aura profile']
const rnd = (n)=>Math.floor(Math.random()*n)

export default function GameCenter(){
  const [active,setActive]=useState('rush')
  const [started,setStarted]=useState(false)
  const [time,setTime]=useState(30)
  const [score,setScore]=useState(()=>Number(localStorage.getItem('tulus.game.score')||0))
  const [best,setBest]=useState(()=>Number(localStorage.getItem('tulus.game.best')||0))
  const [combo,setCombo]=useState(0)
  const [level,setLevel]=useState(1)
  const [lives,setLives]=useState(3)
  const [toast,setToast]=useState('Pick a game and press start.')
  const [target,setTarget]=useState({x:44,y:48})
  const [sequence,setSequence]=useState(()=>[rnd(4),rnd(4),rnd(4)])
  const [step,setStep]=useState(0)
  const [aura,setAura]=useState(colors[rnd(colors.length)])
  const [picked,setPicked]=useState([])
  const [daily,setDaily]=useState(()=>Number(localStorage.getItem('tulus.game.streak')||0))
  const current = useMemo(()=>games.find(g=>g[0]===active),[active])

  useEffect(()=>{ if(!started)return; const t=setInterval(()=>setTime(v=>v>0?v-1:0),1000); return()=>clearInterval(t)},[started])
  useEffect(()=>{ if(time===0 && started){ setStarted(false); setToast('Time is up. Restart to beat your best score.') }},[time,started])
  useEffect(()=>{ if(score>best){setBest(score); localStorage.setItem('tulus.game.best',String(score))} localStorage.setItem('tulus.game.score',String(score)) },[score,best])

  function start(){ setStarted(true); setTime(30); setScore(0); setCombo(0); setLevel(1); setLives(3); setStep(0); setPicked([]); setSequence([rnd(4),rnd(4),rnd(4)]); setAura(colors[rnd(colors.length)]); setTarget({x:30+rnd(55),y:24+rnd(60)}); setDaily((d)=>{const n=d+1; localStorage.setItem('tulus.game.streak',String(n)); return n}); setToast('Game started. Keep the combo alive.') }
  function good(points,msg){ const bonus=Math.max(0,combo); setScore(s=>s+points+bonus); setCombo(c=>c+1); setLevel(l=>Math.max(l,Math.floor((score+points)/60)+1)); setToast(msg); }
  function miss(msg){ setCombo(0); setLives(l=>Math.max(0,l-1)); setToast(msg); if(lives<=1) setStarted(false) }
  function hitRush(){ if(!started)return; good(10,'Nice hit. Target moved.'); setTarget({x:10+rnd(78),y:15+rnd(68)}) }
  function memoryTap(i){ if(!started)return; if(i===sequence[step]){ if(step+1===sequence.length){ good(18,'Sequence cleared. Next pulse.'); setSequence((s)=>[...s,rnd(4)]); setStep(0) } else { setStep(step+1); good(4,'Correct pulse.') } } else miss('Wrong pulse.') }
  function auraTap(c){ if(!started)return; c===aura ? (good(12,'Aura locked.'),setAura(colors[rnd(colors.length)])) : miss('Wrong aura.') }
  function wordTap(w){ if(!started)return; const next=[...picked,w]; setPicked(next); const targetQuote=quotes[level%quotes.length]; if(next.join(' ')===targetQuote){ good(25,'Word flow complete.'); setPicked([]); setLevel(l=>l+1) } else if(!targetQuote.startsWith(next.join(' '))) { miss('Flow broken.'); setPicked([]) } }

  return <main className="pro-page pro-games"><CleanNav/>
    <section className="pro-game-hero"><p className="pro-kicker">Game Lounge</p><h1>Mini games yang lebih niat, ringan, dan playable.</h1><p>Focus, memory, aura, dan word game punya start/restart, score, best score, combo, level, lives, daily streak, dan achievement lokal.</p></section>
    <section className="pro-game-layout">
      <aside className="pro-game-menu">{games.map(([id,title,desc])=><button key={id} className={active===id?'active':''} onClick={()=>{setActive(id);setStarted(false);setToast(desc)}}><b>{title}</b><small>{desc}</small></button>)}</aside>
      <main className="pro-game-stage">
        <div className="pro-game-head"><div><p className="pro-kicker">{current?.[1]}</p><h2>{current?.[2]}</h2></div><button className="pro-btn primary" onClick={start}>{started?'Restart':'Start'}</button></div>
        <div className="pro-game-stats"><span>Score <b>{score}</b></span><span>Best <b>{best}</b></span><span>Combo <b>{combo}</b></span><span>Level <b>{level}</b></span><span>Lives <b>{lives}</b></span><span>Streak <b>{daily}</b></span><span>Time <b>{time}s</b></span></div>
        <p className="pro-note">{toast}</p>
        {active==='rush'&&<div className="pro-rush-board"><button className="pro-target" style={{left:target.x+'%',top:target.y+'%'}} onClick={hitRush}>tap</button></div>}
        {active==='memory'&&<div className="pro-choice-board"><p>Repeat the pulse. Step {step+1}/{sequence.length}</p>{colors.map((c,i)=><button key={c} className={`pulse-${c}`} onClick={()=>memoryTap(i)}>{c}</button>)}</div>}
        {active==='aura'&&<div className="pro-choice-board"><p>Target aura: <b>{aura}</b></p>{colors.map(c=><button key={c} className={`pulse-${c}`} onClick={()=>auraTap(c)}>{c}</button>)}</div>}
        {active==='word'&&<div className="pro-choice-board"><p>{picked.join(' ')||`Build: ${quotes[level%quotes.length]}`}</p>{words.map((w,i)=><button key={w+i} onClick={()=>wordTap(w)}>{w}</button>)}</div>}
      </main>
    </section>
  </main>
}

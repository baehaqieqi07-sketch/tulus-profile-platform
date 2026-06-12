import { useEffect, useMemo, useState } from 'react'
import TulusNav from '../components/TulusNav.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

const games = [
  { id: 'focus', name: 'Focus Rush', desc: 'Tap target yang pindah cepat. Jaga combo, hindari miss, kejar timer.', goal: '30 detik • 3 lives' },
  { id: 'memory', name: 'Memory Pulse', desc: 'Ingat urutan cahaya, lalu ulangi tanpa salah.', goal: 'sequence • level naik' },
  { id: 'aura', name: 'Aura Clash', desc: 'Cocokkan aura target dengan kartu yang benar.', goal: 'mood match • streak' },
  { id: 'word', name: 'Word Flow', desc: 'Susun quote TULUS dari kata acak dengan urutan tepat.', goal: 'quote puzzle • calm flow' }
]

const palette = ['#4F8CFF', '#8FB7FF', '#C8B8FF', '#72E6C8']
const memoryLabels = ['Blue', 'Pearl', 'Aura', 'Glass']
const auraCards = [
  { id: 'calm', name: 'Calm Blue', hint: 'soft, quiet, clear', color: '#6EA2FF' },
  { id: 'luxe', name: 'Black Pearl', hint: 'deep, premium, focused', color: '#16223A' },
  { id: 'dream', name: 'Lavender Dream', hint: 'smooth, gentle, aesthetic', color: '#C5B7FF' },
  { id: 'fresh', name: 'Cyan Fresh', hint: 'clean, light, alive', color: '#7DE7FF' },
  { id: 'warm', name: 'Soft Rose', hint: 'warm, human, friendly', color: '#F2C7D5' }
]
const phrasePool = [
  ['quiet', 'space', 'soft', 'blue'],
  ['glass', 'profile', 'with', 'aura'],
  ['calm', 'link', 'clean', 'flow'],
  ['midnight', 'light', 'feels', 'premium'],
  ['tulus', 'makes', 'profile', 'alive']
]
const fillerWords = ['shine', 'dream', 'digital', 'room', 'halo', 'motion', 'pearl', 'softly']
const SCORE_KEY = 'tulus.games.best.v5'
const STREAK_KEY = 'tulus.games.streak.v5'

function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback } catch { return fallback } }
function todayKey() { return new Date().toISOString().slice(0, 10) }
function rand(max) { return Math.floor(Math.random() * max) }
function shuffle(list) { return [...list].sort(() => Math.random() - 0.5) }
function newTarget() { return { x: 14 + rand(72), y: 16 + rand(64), size: 66 + rand(42), tone: ['#67A4FF', '#75E9FF', '#C8B7FF', '#74F0C9'][rand(4)] } }
function newSequence(length = 3) { return Array.from({ length }, () => rand(4)) }

export default function GameCenter() {
  const { t } = useTulusLanguage()
  const [active, setActive] = useState('focus')
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(30)
  const [best, setBest] = useState(() => readJson(SCORE_KEY, {}))
  const [streak, setStreak] = useState(() => readJson(STREAK_KEY, { days: 0, last: '' }))
  const [status, setStatus] = useState('Pilih game, tekan Start, lalu kejar best score.')
  const [target, setTarget] = useState(() => newTarget())
  const [sequence, setSequence] = useState(() => newSequence(3))
  const [picked, setPicked] = useState([])
  const [showing, setShowing] = useState(true)
  const [auraTarget, setAuraTarget] = useState(() => auraCards[rand(auraCards.length)])
  const [phrase, setPhrase] = useState(() => phrasePool[rand(phrasePool.length)])
  const [wordBank, setWordBank] = useState(() => shuffle([...phrasePool[0], ...fillerWords.slice(0, 5)]))
  const [pickedWords, setPickedWords] = useState([])

  const bestScore = best[active] || 0
  const activeGame = games.find((game) => game.id === active) || games[0]
  const totalBest = useMemo(() => Object.values(best).reduce((sum, value) => sum + Number(value || 0), 0), [best])
  const achievements = useMemo(() => [
    score >= 25 && 'Blue starter',
    combo >= 5 && 'Combo calm',
    level >= 3 && 'Level keeper',
    lives === 3 && started && score > 0 && 'No damage',
    totalBest >= 100 && 'TULUS gamer'
  ].filter(Boolean), [score, combo, level, lives, started, totalBest])

  useEffect(() => {
    if (score > bestScore) {
      const next = { ...best, [active]: score }
      setBest(next)
      localStorage.setItem(SCORE_KEY, JSON.stringify(next))
    }
  }, [score, bestScore, best, active])

  useEffect(() => {
    if (!started || active !== 'focus') return
    if (timeLeft <= 0 || lives <= 0) {
      setStarted(false)
      setStatus(lives <= 0 ? 'Lives habis. Restart buat coba lagi.' : 'Waktu habis. Restart buat kejar combo lebih tinggi.')
      return
    }
    const timer = setInterval(() => setTimeLeft((next) => Math.max(0, next - 1)), 1000)
    return () => clearInterval(timer)
  }, [active, timeLeft, lives, started])

  useEffect(() => {
    if (!started || active !== 'memory') return
    setShowing(true)
    const timer = setTimeout(() => setShowing(false), 1300 + Math.min(sequence.length, 8) * 160)
    return () => clearTimeout(timer)
  }, [active, sequence, started])

  function markDaily() {
    const today = todayKey()
    if (streak.last === today) return
    const next = { days: Number(streak.days || 0) + 1, last: today }
    setStreak(next)
    localStorage.setItem(STREAK_KEY, JSON.stringify(next))
  }

  function addScore(points, text) {
    markDaily()
    setScore((value) => {
      const next = Math.max(0, value + points)
      setLevel(Math.max(1, Math.floor(next / 28) + 1))
      return next
    })
    setCombo((value) => value + 1)
    setStatus(text)
  }

  function miss(text = 'Miss. Combo reset, coba lebih fokus.') {
    if (!started) return
    setCombo(0)
    setLives((value) => Math.max(0, value - 1))
    setScore((value) => Math.max(0, value - 2))
    setStatus(text)
  }

  function resetCore(id = active, autoStart = false) {
    setActive(id)
    setStarted(autoStart)
    setScore(0)
    setCombo(0)
    setLevel(1)
    setLives(3)
    setTimeLeft(30)
    setPicked([])
    setPickedWords([])
    setTarget(newTarget())
    setSequence(newSequence(3))
    setShowing(true)
    setAuraTarget(auraCards[rand(auraCards.length)])
    resetWord()
    setStatus(autoStart ? 'Game dimulai. Keep it clean.' : 'Game siap. Tekan Start buat main.')
  }

  function switchGame(id) { resetCore(id, false) }
  function start() { resetCore(active, true) }
  function restart() { resetCore(active, true) }

  function tapFocus(event) {
    event.stopPropagation()
    if (!started || timeLeft <= 0 || lives <= 0) return
    const bonus = combo >= 8 ? 4 : combo >= 5 ? 3 : combo >= 2 ? 2 : 1
    addScore(2 + bonus, `Nice tap +${2 + bonus}. Combo ${combo + 1}.`)
    setTarget(newTarget())
  }

  function pickMemory(index) {
    if (!started || showing || lives <= 0) return
    const next = [...picked, index]
    setPicked(next)
    if (sequence[next.length - 1] !== index) {
      setPicked([])
      miss('Urutannya salah. Sequence diulang sebentar.')
      setShowing(true)
      setTimeout(() => setShowing(false), 1050)
      return
    }
    if (next.length === sequence.length) {
      addScore(sequence.length * 4, `Perfect memory. Sequence ${sequence.length} cleared.`)
      setPicked([])
      setSequence((old) => [...old, rand(4)])
    } else {
      setStatus(`Benar. Lanjut ${next.length}/${sequence.length}.`)
    }
  }

  function pickAura(card) {
    if (!started || lives <= 0) return
    if (card.id === auraTarget.id) {
      addScore(7 + combo, `Aura match: ${card.name}. Combo ${combo + 1}.`)
      let next = auraCards[rand(auraCards.length)]
      if (next.id === auraTarget.id) next = auraCards[(auraCards.findIndex((x) => x.id === next.id) + 1) % auraCards.length]
      setAuraTarget(next)
      return
    }
    miss(`Bukan ${card.name}. Targetnya ${auraTarget.name}.`)
  }

  function resetWord() {
    const nextPhrase = phrasePool[rand(phrasePool.length)]
    setPhrase(nextPhrase)
    setPickedWords([])
    setWordBank(shuffle([...nextPhrase, ...shuffle(fillerWords).slice(0, 5)]))
  }

  function pickWord(word) {
    if (!started || lives <= 0) return
    const next = [...pickedWords, word]
    setPickedWords(next)
    if (phrase[next.length - 1] !== word) {
      miss('Kata kurang pas. Quote direset biar rapi lagi.')
      setPickedWords([])
      return
    }
    if (next.length === phrase.length) {
      addScore(phrase.length * 5, `Quote complete: ${phrase.join(' ')}.`)
      resetWord()
    } else {
      setStatus(`Good flow. ${next.length}/${phrase.length} kata benar.`)
    }
  }

  return (
    <V7GlowBackground className="million-games-page pro-games-page">
      <TulusNav />
      <section className="million-games-hero pro-games-hero">
        <p className="v100-kicker">{t('gameCenter')}</p>
        <h1>Mini games that feel alive, not empty.</h1>
        <p>Focus Rush, Memory Pulse, Aura Clash, dan Word Flow sekarang punya Start/Restart, lives, combo, level, daily streak, achievements, dan best score lokal.</p>
      </section>

      <section className="pro-game-stats">
        <article><small>Daily streak</small><b>{streak.days || 0} day</b><span>Main satu game hari ini untuk lanjut streak.</span></article>
        <article><small>Total best</small><b>{totalBest}</b><span>Gabungan best score lokal di device ini.</span></article>
        <article><small>Current combo</small><b>{combo}x</b><span>Combo reset kalau salah/miss.</span></article>
        <article><small>Lives / Level</small><b>{lives} ❤ • {level}</b><span>Level naik dari score session.</span></article>
      </section>

      <section className="million-games-layout pro-games-layout">
        <aside className="pro-game-menu">
          {games.map((game) => (
            <button key={game.id} className={active === game.id ? 'active' : ''} onClick={() => switchGame(game.id)}>
              <b>{game.name}</b>
              <span>{game.desc}</span>
              <small>{game.goal} • Best {best[game.id] || 0}</small>
            </button>
          ))}
        </aside>

        <main className="pro-game-board">
          <div className="million-game-top pro-game-top">
            <TulusLogo compact />
            <div><b>{activeGame.name}</b><span>Score {score} • Best {bestScore} • Combo {combo}x</span></div>
            <div className="hero-actions"><button className="v100-primary" onClick={start}>Start</button><button className="v100-secondary" onClick={restart}>Restart</button></div>
          </div>

          <div className="pro-game-status"><span>{status}</span><b>{active === 'focus' ? `${timeLeft}s` : activeGame.goal}</b></div>

          {!started ? <div className="game-start-card"><h2>{activeGame.name}</h2><p>{activeGame.desc}</p><button className="v100-primary" onClick={start}>Start game</button></div> : null}

          {active === 'focus' && started && (
            <div className="focus-rush-arena" onClick={() => timeLeft > 0 && lives > 0 && miss()}>
              <button className="focus-rush-target" style={{ left: `${target.x}%`, top: `${target.y}%`, width: target.size, height: target.size, background: `radial-gradient(circle at 35% 28%, #ffffff, ${target.tone} 38%, rgba(79,140,255,.34) 70%)` }} onClick={tapFocus} disabled={timeLeft <= 0 || lives <= 0}>TAP</button>
              <div className="focus-rush-hud"><b>Rule:</b> tap orb, jangan klik area kosong.</div>
            </div>
          )}

          {active === 'memory' && started && (
            <div className="memory-pulse-game">
              <div className="memory-sequence-card"><b>{showing ? 'Watch the pulse...' : 'Repeat the sequence'}</b><span>{showing ? sequence.map((x) => memoryLabels[x]).join(' → ') : `${picked.length}/${sequence.length} selected`}</span></div>
              <div className="memory-pad-grid">{palette.map((color, index) => <button key={color} className={showing && sequence.includes(index) ? 'preview' : ''} style={{ background: color }} onClick={() => pickMemory(index)}>{memoryLabels[index]}</button>)}</div>
            </div>
          )}

          {active === 'aura' && started && (
            <div className="aura-clash-game">
              <div className="aura-target-card" style={{ '--auraColor': auraTarget.color }}><small>Target aura</small><b>{auraTarget.name}</b><span>{auraTarget.hint}</span></div>
              <div className="aura-card-grid">{shuffle(auraCards).map((card) => <button key={card.id} onClick={() => pickAura(card)} style={{ '--auraColor': card.color }}><b>{card.name}</b><span>{card.hint}</span></button>)}</div>
            </div>
          )}

          {active === 'word' && started && (
            <div className="word-flow-game">
              <div className="word-flow-target"><small>Target quote</small><b>{phrase.map((word, index) => pickedWords[index] || '____').join(' ')}</b><span>Susun sesuai urutan: {phrase.length} kata.</span></div>
              <div className="word-bank">{wordBank.map((word, index) => <button key={`${word}-${index}`} onClick={() => pickWord(word)} disabled={pickedWords.includes(word) && phrase.filter((x) => x === word).length <= pickedWords.filter((x) => x === word).length}>{word}</button>)}</div>
              <button className="v100-secondary" onClick={resetWord}>New quote</button>
            </div>
          )}

          <div className="game-achievements">
            {achievements.length ? achievements.map((item) => <span key={item}>◆ {item}</span>) : <span>Play clean to unlock achievements.</span>}
          </div>
        </main>
      </section>
    </V7GlowBackground>
  )
}

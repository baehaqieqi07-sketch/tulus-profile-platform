import { useEffect, useMemo, useState } from 'react'
import TulusNav from '../components/TulusNav.jsx'
import TulusLogo from '../components/TulusLogo.jsx'
import { V7GlowBackground } from '../components/V7Shell.jsx'
import { useTulusLanguage } from '../lib/i18n.js'

const games = [
  { id: 'focus', name: 'Focus Rush', desc: 'Tap orb biru, hindari decoy. Makin cepat makin tinggi combo.', goal: '30 detik • reflex combo' },
  { id: 'memory', name: 'Memory Pulse', desc: 'Ingat urutan cahaya. Setiap level sequence makin panjang.', goal: 'sequence • memory level' },
  { id: 'aura', name: 'Aura Clash', desc: 'Cocokkan target aura dengan kartu vibe yang benar.', goal: 'match • momentum' },
  { id: 'word', name: 'Word Flow', desc: 'Susun quote TULUS dari kata acak sebelum flow hilang.', goal: 'quote puzzle • streak' }
]

const palette = ['#4F8CFF', '#8FB7FF', '#C8B8FF', '#72E6C8', '#F2C7D5', '#7DE7FF']
const memoryLabels = ['Blue', 'Pearl', 'Aura', 'Glass']
const auraCards = [
  { id: 'calm', name: 'Calm Blue', hint: 'soft, quiet, clear', color: '#6EA2FF' },
  { id: 'luxe', name: 'Black Pearl', hint: 'deep, premium, focused', color: '#16223A' },
  { id: 'dream', name: 'Lavender Dream', hint: 'smooth, gentle, aesthetic', color: '#C5B7FF' },
  { id: 'fresh', name: 'Cyan Fresh', hint: 'clean, light, alive', color: '#7DE7FF' },
  { id: 'warm', name: 'Soft Rose', hint: 'warm, human, friendly', color: '#F2C7D5' },
  { id: 'silver', name: 'Silver Flow', hint: 'simple, modern, balanced', color: '#D8E4FF' }
]
const phrasePool = [
  ['quiet', 'space', 'soft', 'blue'],
  ['glass', 'profile', 'with', 'aura'],
  ['calm', 'link', 'clean', 'flow'],
  ['midnight', 'light', 'feels', 'premium'],
  ['tulus', 'profile', 'looks', 'alive'],
  ['music', 'glows', 'after', 'enter']
]
const fillerWords = ['shine', 'dream', 'digital', 'room', 'halo', 'motion', 'pearl', 'view', 'spark', 'smooth']
const SCORE_KEY = 'tulus.games.best.v5'
const STREAK_KEY = 'tulus.games.streak.v5'

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback } catch { return fallback }
}
function todayKey() { return new Date().toISOString().slice(0, 10) }
function rand(max) { return Math.floor(Math.random() * max) }
function shuffle(list) { return [...list].sort(() => Math.random() - 0.5) }
function newTarget() { return { x: 14 + rand(72), y: 16 + rand(62), size: 58 + rand(34), tone: palette[rand(palette.length)] } }
function newDecoy() { return { x: 12 + rand(76), y: 15 + rand(64), size: 42 + rand(28) } }
function newSequence(length = 3) { return Array.from({ length }, () => rand(4)) }

export default function GameCenter() {
  const { t } = useTulusLanguage()
  const [active, setActive] = useState('focus')
  const [running, setRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(30)
  const [best, setBest] = useState(() => readJson(SCORE_KEY, {}))
  const [streak, setStreak] = useState(() => readJson(STREAK_KEY, { days: 0, last: '' }))
  const [status, setStatus] = useState('Pilih game, tekan Start, lalu kejar combo terbaik.')
  const [target, setTarget] = useState(() => newTarget())
  const [decoy, setDecoy] = useState(() => newDecoy())
  const [sequence, setSequence] = useState(() => newSequence(3))
  const [picked, setPicked] = useState([])
  const [showing, setShowing] = useState(true)
  const [auraTarget, setAuraTarget] = useState(() => auraCards[rand(auraCards.length)])
  const [auraChoices, setAuraChoices] = useState(() => shuffle(auraCards).slice(0, 4))
  const [phrase, setPhrase] = useState(() => phrasePool[rand(phrasePool.length)])
  const [wordBank, setWordBank] = useState(() => shuffle([...phrasePool[0], ...fillerWords.slice(0, 5)]))
  const [pickedWords, setPickedWords] = useState([])

  const bestScore = best[active] || 0
  const activeGame = games.find((game) => game.id === active) || games[0]
  const totalBest = useMemo(() => Object.values(best).reduce((sum, value) => sum + Number(value || 0), 0), [best])
  const progress = active === 'focus' ? Math.max(0, Math.min(100, (timeLeft / 30) * 100)) : Math.min(100, (score % 100))

  useEffect(() => {
    if (score > bestScore) {
      const next = { ...best, [active]: score }
      setBest(next)
      localStorage.setItem(SCORE_KEY, JSON.stringify(next))
    }
  }, [score, bestScore, best, active])

  useEffect(() => {
    if (active !== 'focus' || !running) return
    if (timeLeft <= 0 || lives <= 0) {
      setRunning(false)
      setStatus(timeLeft <= 0 ? 'Waktu habis. Tekan Start lagi buat retry.' : 'Lives habis. Restart dan kejar combo lebih bersih.')
      return
    }
    const timer = setInterval(() => setTimeLeft((next) => Math.max(0, next - 1)), 1000)
    return () => clearInterval(timer)
  }, [active, running, timeLeft, lives])

  useEffect(() => {
    if (active !== 'memory' || !running) return
    setShowing(true)
    const timer = setTimeout(() => setShowing(false), 950 + Math.min(sequence.length, 9) * 170)
    return () => clearTimeout(timer)
  }, [active, sequence, running])

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
      setLevel(Math.max(1, Math.floor(next / 35) + 1))
      return next
    })
    setCombo((value) => value + 1)
    setStatus(text)
  }

  function miss(text = 'Miss. Combo reset, coba lebih fokus.') {
    setCombo(0)
    setLives((value) => Math.max(0, value - 1))
    setScore((value) => Math.max(0, value - 3))
    setStatus(text)
  }

  function resetWord() {
    const nextPhrase = phrasePool[rand(phrasePool.length)]
    setPhrase(nextPhrase)
    setPickedWords([])
    setWordBank(shuffle([...nextPhrase, ...shuffle(fillerWords).slice(0, 6)]))
  }

  function prepareGame(id = active, shouldRun = false) {
    setActive(id)
    setRunning(shouldRun)
    setScore(0)
    setCombo(0)
    setLevel(1)
    setLives(3)
    setTimeLeft(30)
    setPicked([])
    setPickedWords([])
    setTarget(newTarget())
    setDecoy(newDecoy())
    setSequence(newSequence(3))
    setShowing(id === 'memory')
    setAuraTarget(auraCards[rand(auraCards.length)])
    setAuraChoices(shuffle(auraCards).slice(0, 4))
    resetWord()
    setStatus(shouldRun ? 'Game mulai. Fokus dan jaga combo.' : 'Game siap. Tekan Start buat mulai.')
  }

  function switchGame(id) {
    prepareGame(id, false)
  }

  function startGame() {
    prepareGame(active, true)
  }

  function tapFocus(event) {
    event.stopPropagation()
    if (!running || timeLeft <= 0 || lives <= 0) return
    const bonus = combo >= 10 ? 6 : combo >= 6 ? 4 : combo >= 3 ? 2 : 1
    addScore(4 + bonus, `Perfect tap +${4 + bonus}. Combo ${combo + 1}x.`)
    setTarget(newTarget())
    setDecoy(newDecoy())
  }

  function tapDecoy(event) {
    event.stopPropagation()
    if (!running) return
    miss('Decoy kena. Fokus ke orb biru yang glow.')
    setDecoy(newDecoy())
  }

  function pickMemory(index) {
    if (!running || showing) return
    const next = [...picked, index]
    setPicked(next)
    if (sequence[next.length - 1] !== index) {
      setPicked([])
      miss('Urutannya salah. Sequence akan tampil ulang.')
      setShowing(true)
      setTimeout(() => setShowing(false), 900)
      return
    }
    if (next.length === sequence.length) {
      addScore(sequence.length * 4 + combo, `Clean memory. Sequence ${sequence.length} selesai.`)
      setPicked([])
      setSequence((old) => [...old, rand(4)])
    } else {
      setStatus(`Benar. Lanjut ${next.length}/${sequence.length}.`)
    }
  }

  function pickAura(card) {
    if (!running) return
    if (card.id === auraTarget.id) {
      addScore(8 + combo, `Aura match: ${card.name}. Combo ${combo + 1}x.`)
      let next = auraCards[rand(auraCards.length)]
      if (next.id === auraTarget.id) next = auraCards[(auraCards.findIndex((x) => x.id === next.id) + 1) % auraCards.length]
      const choices = shuffle([next, ...auraCards.filter((x) => x.id !== next.id)]).slice(0, 4)
      if (!choices.some((x) => x.id === next.id)) choices[0] = next
      setAuraTarget(next)
      setAuraChoices(shuffle(choices))
      return
    }
    miss(`Bukan ${card.name}. Targetnya ${auraTarget.name}.`)
  }

  function pickWord(word, index) {
    if (!running) return
    const next = [...pickedWords, word]
    setPickedWords(next)
    if (phrase[next.length - 1] !== word) {
      miss('Kata kurang pas. Flow reset, coba baca targetnya.')
      setPickedWords([])
      return
    }
    if (next.length === phrase.length) {
      addScore(phrase.length * 5 + combo, `Quote complete: ${phrase.join(' ')}.`)
      resetWord()
    } else {
      setStatus(`Good flow. ${next.length}/${phrase.length} kata benar.`)
    }
  }

  return (
    <V7GlowBackground className="million-games-page pro-games-page ultimate-games-page">
      <TulusNav />
      <section className="million-games-hero pro-games-hero">
        <p className="v100-kicker">{t('gameCenter')}</p>
        <h1>Arcade kecil yang clean, cepat, dan tetap TULUS.</h1>
        <p>Game Center sekarang punya Start/Restart, lives, combo, level, daily streak, best score, dan mini achievement. Tetap ringan, aman, bukan gambling, dan nyaman di HP/PC.</p>
      </section>

      <section className="pro-game-stats">
        <article><small>Daily streak</small><b>{streak.days || 0} day</b><span>Main minimal satu game hari ini.</span></article>
        <article><small>Total best</small><b>{totalBest}</b><span>Gabungan best score lokal device ini.</span></article>
        <article><small>Combo</small><b>{combo}x</b><span>Naik kalau berhasil terus.</span></article>
        <article><small>Level</small><b>{level}</b><span>Naik dari score session.</span></article>
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
            <div>
              <b>{activeGame.name}</b>
              <span>Score {score} • Best {bestScore} • Lives {'♡'.repeat(lives)}{'·'.repeat(3 - lives)}</span>
            </div>
            <div className="ultimate-game-actions">
              <button className="primary" onClick={startGame}>{running ? 'Restart' : 'Start'}</button>
              <button onClick={() => prepareGame(active, false)}>Reset</button>
            </div>
          </div>

          <div className="pro-game-status">
            <span>{status}</span>
            <b>{active === 'focus' ? `${timeLeft}s` : activeGame.goal}</b>
          </div>
          <div className="ultimate-game-mission">
            <b>Mission</b>
            <span>{active === 'focus' ? 'Tap orb biru. Jangan klik area kosong dan jangan kena decoy.' : active === 'memory' ? 'Tonton pulse, lalu ulangi sequence sampai panjang.' : active === 'aura' ? 'Baca target aura, pilih kartu vibe yang sama.' : 'Susun kata sesuai target quote dari kiri ke kanan.'}</span>
            <div className="music-progress"><i style={{ width: `${progress}%` }} /></div>
          </div>

          {active === 'focus' && (
            <div className="focus-rush-arena" onClick={() => running && miss('Area kosong kena. Combo reset.')}>
              <button
                className="focus-rush-target"
                style={{ left: `${target.x}%`, top: `${target.y}%`, width: target.size, height: target.size, background: `radial-gradient(circle at 35% 28%, #ffffff, ${target.tone} 38%, rgba(79,140,255,.34) 70%)` }}
                onClick={tapFocus}
                disabled={!running || timeLeft <= 0 || lives <= 0}
              >
                TAP
              </button>
              <button
                className="focus-rush-decoy"
                style={{ left: `${decoy.x}%`, top: `${decoy.y}%`, width: decoy.size, height: decoy.size }}
                onClick={tapDecoy}
                disabled={!running}
              >
                ×
              </button>
              <div className="focus-rush-hud"><span>Blue orb = score</span><span>Decoy/blank = lose life</span><span>Combo bonus aktif setelah 3x</span></div>
            </div>
          )}

          {active === 'memory' && (
            <div className="memory-pulse-game">
              <div className="memory-sequence-card">
                <b>{!running ? 'Press Start to show sequence' : showing ? 'Watch the pulse...' : 'Repeat the sequence'}</b>
                <span>{showing && running ? sequence.map((x) => memoryLabels[x]).join(' → ') : `${picked.length}/${sequence.length} selected`}</span>
              </div>
              <div className="memory-pad-grid">
                {palette.slice(0, 4).map((color, index) => (
                  <button key={color} className={showing && sequence.includes(index) ? 'preview' : ''} style={{ background: color }} onClick={() => pickMemory(index)}>
                    {memoryLabels[index]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {active === 'aura' && (
            <div className="aura-clash-game">
              <div className="aura-target-card" style={{ '--auraColor': auraTarget.color }}>
                <small>Target aura</small>
                <b>{auraTarget.name}</b>
                <span>{auraTarget.hint}</span>
              </div>
              <div className="aura-card-grid">
                {auraChoices.map((card) => (
                  <button key={card.id} onClick={() => pickAura(card)} style={{ '--auraColor': card.color }}>
                    <b>{card.name}</b>
                    <span>{card.hint}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {active === 'word' && (
            <div className="word-flow-game">
              <div className="word-flow-target">
                <small>Target quote</small>
                <b>{phrase.map((word, index) => pickedWords[index] || '____').join(' ')}</b>
                <span>Susun sesuai urutan: {phrase.length} kata.</span>
              </div>
              <div className="word-bank">
                {wordBank.map((word, index) => (
                  <button key={`${word}-${index}`} onClick={() => pickWord(word, index)} disabled={!running || pickedWords.includes(word)}>
                    {word}
                  </button>
                ))}
              </div>
              <button className="v100-secondary" onClick={resetWord}>New quote</button>
            </div>
          )}

          <section className="ultimate-achievements">
            <article><b>{score >= 50 ? 'Unlocked' : 'Locked'}</b><span>Blue Starter • reach 50 score</span></article>
            <article><b>{combo >= 8 ? 'Unlocked' : 'Locked'}</b><span>Combo Calm • reach 8x combo</span></article>
            <article><b>{totalBest >= 200 ? 'Unlocked' : 'Locked'}</b><span>TULUS Arcade • total best 200</span></article>
          </section>
        </main>
      </section>
    </V7GlowBackground>
  )
}

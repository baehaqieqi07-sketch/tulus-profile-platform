import { useEffect } from 'react'

export default function PremiumCursor() {
  useEffect(() => {
    const fine = matchMedia('(pointer: fine)').matches
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    const dot = document.createElement('i')
    const ring = document.createElement('b')
    dot.className = 'tulus-cursor-dot'
    ring.className = 'tulus-cursor-ring'
    document.body.append(dot, ring)
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y
    const move = (e) => { x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px,${y}px)` }
    const tick = () => {
      rx += (x - rx) * .18
      ry += (y - ry) * .18
      ring.style.transform = `translate(${rx}px,${ry}px)`
      requestAnimationFrame(tick)
    }
    const down = () => document.body.classList.add('cursor-down')
    const up = () => document.body.classList.remove('cursor-down')
    addEventListener('pointermove', move)
    addEventListener('pointerdown', down)
    addEventListener('pointerup', up)
    tick()
    return () => { removeEventListener('pointermove', move); removeEventListener('pointerdown', down); removeEventListener('pointerup', up); dot.remove(); ring.remove() }
  }, [])
  return null
}

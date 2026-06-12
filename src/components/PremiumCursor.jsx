import { useEffect } from 'react'

export default function PremiumCursor() {
  useEffect(() => {
    const fine = matchMedia('(pointer: fine)').matches
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const enabled = localStorage.getItem('tulus.cursor.disabled') !== '1'
    if (!fine || reduce || !enabled) return

    const dot = document.createElement('i')
    const ring = document.createElement('b')
    dot.className = 'tulus-cursor-dot'
    ring.className = 'tulus-cursor-ring'
    document.body.append(dot, ring)

    const trails = Array.from({ length: 7 }).map(() => {
      const trail = document.createElement('span')
      trail.className = 'tulus-cursor-trail'
      document.body.appendChild(trail)
      return { el: trail, x: innerWidth / 2, y: innerHeight / 2 }
    })

    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      dot.style.transform = `translate(${x}px,${y}px)`
    }
    const tick = () => {
      rx += (x - rx) * .18
      ry += (y - ry) * .18
      ring.style.transform = `translate(${rx}px,${ry}px)`
      trails.forEach((trail, i) => {
        trail.x += (x - trail.x) * (0.08 + i * 0.018)
        trail.y += (y - trail.y) * (0.08 + i * 0.018)
        trail.el.style.opacity = String(Math.max(0, .32 - i * .035))
        trail.el.style.transform = `translate(${trail.x}px,${trail.y}px) scale(${1 - i * .06})`
      })
      raf = requestAnimationFrame(tick)
    }
    const down = (event) => {
      document.body.classList.add('cursor-down')
      const sparkle = document.createElement('span')
      sparkle.className = 'tulus-click-sparkle'
      sparkle.style.left = `${event.clientX - 4}px`
      sparkle.style.top = `${event.clientY - 4}px`
      document.body.appendChild(sparkle)
      setTimeout(() => sparkle.remove(), 560)
    }
    const up = () => document.body.classList.remove('cursor-down')
    const over = (event) => {
      if (event.target?.closest?.('a, button, input, textarea, select, [role="button"], .lux-glass-card')) document.body.classList.add('cursor-hover')
    }
    const out = (event) => {
      if (event.target?.closest?.('a, button, input, textarea, select, [role="button"], .lux-glass-card')) document.body.classList.remove('cursor-hover')
    }

    addEventListener('pointermove', move)
    addEventListener('pointerdown', down)
    addEventListener('pointerup', up)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    tick()
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', move)
      removeEventListener('pointerdown', down)
      removeEventListener('pointerup', up)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      dot.remove(); ring.remove(); trails.forEach((t) => t.el.remove())
      document.body.classList.remove('cursor-hover', 'cursor-down')
    }
  }, [])
  return null
}

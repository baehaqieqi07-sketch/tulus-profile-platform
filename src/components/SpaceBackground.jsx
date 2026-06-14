import { useEffect, useRef } from 'react'

export default function SpaceBackground({ className = '' }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width, height
    let stars = []
    let shootingStars = []
    let nebulae = []
    let time = 0

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initStars()
      initNebulae()
    }

    const initStars = () => {
      stars = []
      const starCount = Math.floor((width * height) / 3000)
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2
        })
      }
    }

    const initNebulae = () => {
      nebulae = []
      const nebulaCount = 3
      for (let i = 0; i < nebulaCount; i++) {
        nebulae.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 300 + 200,
          color: i === 0 ? 'rgba(100, 130, 255, 0.08)' : i === 1 ? 'rgba(150, 100, 255, 0.06)' : 'rgba(180, 130, 255, 0.05)',
          drift: Math.random() * 0.2 - 0.1
        })
      }
    }

    const createShootingStar = () => {
      if (Math.random() < 0.003 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.5,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + Math.random() * 0.2,
          opacity: 1
        })
      }
    }

    const draw = () => {
      time += 0.016

      // Deep space background
      const gradient = ctx.createRadialGradient(width * 0.3, height * 0.3, 0, width * 0.5, height * 0.5, Math.max(width, height))
      gradient.addColorStop(0, '#0a0e1a')
      gradient.addColorStop(0.5, '#050810')
      gradient.addColorStop(1, '#020408')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Nebulae
      nebulae.forEach(nebula => {
        nebula.x += nebula.drift
        if (nebula.x > width + nebula.radius) nebula.x = -nebula.radius
        if (nebula.x < -nebula.radius) nebula.x = width + nebula.radius

        const nebulaGradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)
        nebulaGradient.addColorStop(0, nebula.color)
        nebulaGradient.addColorStop(1, 'transparent')
        ctx.fillStyle = nebulaGradient
        ctx.fillRect(0, 0, width, height)
      })

      // Aurora glow (subtle)
      const auroraGradient = ctx.createLinearGradient(0, height * 0.3, 0, height * 0.7)
      auroraGradient.addColorStop(0, 'transparent')
      auroraGradient.addColorStop(0.3, 'rgba(100, 150, 255, 0.03)')
      auroraGradient.addColorStop(0.5, 'rgba(150, 100, 255, 0.02)')
      auroraGradient.addColorStop(0.7, 'rgba(100, 150, 255, 0.03)')
      auroraGradient.addColorStop(1, 'transparent')
      ctx.fillStyle = auroraGradient
      ctx.fillRect(0, 0, width, height)

      // Stars
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.fill()
      })

      // Shooting stars
      createShootingStar()
      shootingStars = shootingStars.filter(ss => {
        ss.x += Math.cos(ss.angle) * ss.speed
        ss.y += Math.sin(ss.angle) * ss.speed
        ss.opacity -= 0.015

        if (ss.opacity <= 0) return false

        const tailGradient = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - Math.cos(ss.angle) * ss.length,
          ss.y - Math.sin(ss.angle) * ss.length
        )
        tailGradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`)
        tailGradient.addColorStop(1, 'transparent')
        
        ctx.beginPath()
        ctx.moveTo(ss.x, ss.y)
        ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.length, ss.y - Math.sin(ss.angle) * ss.length)
        ctx.strokeStyle = tailGradient
        ctx.lineWidth = 2
        ctx.stroke()

        return true
      })

      // Horizon glow (distant planet light)
      const horizonGradient = ctx.createLinearGradient(0, height * 0.85, 0, height)
      horizonGradient.addColorStop(0, 'transparent')
      horizonGradient.addColorStop(0.5, 'rgba(80, 100, 180, 0.08)')
      horizonGradient.addColorStop(1, 'rgba(60, 80, 150, 0.12)')
      ctx.fillStyle = horizonGradient
      ctx.fillRect(0, height * 0.85, width, height * 0.15)

      // Planet curve at bottom
      ctx.beginPath()
      ctx.ellipse(width * 0.5, height + 200, width * 0.8, 300, 0, Math.PI, 0)
      const planetGradient = ctx.createRadialGradient(width * 0.5, height + 200, 0, width * 0.5, height + 200, width * 0.8)
      planetGradient.addColorStop(0, 'rgba(40, 60, 100, 0.15)')
      planetGradient.addColorStop(0.5, 'rgba(30, 50, 90, 0.1)')
      planetGradient.addColorStop(1, 'transparent')
      ctx.fillStyle = planetGradient
      ctx.fill()

      // Cinematic grain
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const grain = (Math.random() - 0.5) * 8
        data[i] += grain
        data[i + 1] += grain
        data[i + 2] += grain
      }
      ctx.putImageData(imageData, 0, 0)

      // Vignette
      const vignetteGradient = ctx.createRadialGradient(width * 0.5, height * 0.5, height * 0.3, width * 0.5, height * 0.5, Math.max(width, height) * 0.8)
      vignetteGradient.addColorStop(0, 'transparent')
      vignetteGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.2)')
      vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)')
      ctx.fillStyle = vignetteGradient
      ctx.fillRect(0, 0, width, height)

      animationRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className={`space-background ${className}`} aria-hidden="true" />
}

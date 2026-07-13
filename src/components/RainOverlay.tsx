import { useEffect, useRef } from 'react'

type Drop = {
  x: number
  y: number
  speed: number
  length: number
  width: number
  opacity: number
  drift: number
}

type Splash = {
  x: number
  y: number
  radius: number
  opacity: number
  life: number
}

/** Капли дождя поверх всего сайта */
export function RainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const splashesRef = useRef<Splash[]>([])
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (reduced) return

    let w = 0
    let h = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * devicePixelRatio)
      canvas.height = Math.floor(h * devicePixelRatio)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    const createDrop = (randomY = false) => ({
      x: Math.random() * w,
      y: randomY ? Math.random() * h : -20 - Math.random() * 80,
      speed: 12 + Math.random() * 18,
      length: 16 + Math.random() * 28,
      width: 1 + Math.random() * 1.5,
      opacity: 0.35 + Math.random() * 0.45,
      drift: -0.8 + Math.random() * 1.6,
    })

    const spawnDrop = () => {
      const count = coarse ? 2 : Math.random() > 0.4 ? 3 : 2
      for (let i = 0; i < count; i++) {
        dropsRef.current.push(createDrop())
      }
      if (dropsRef.current.length > (coarse ? 100 : 200)) {
        dropsRef.current.splice(0, 15)
      }
    }

    const spawnSplash = (x: number, y: number) => {
      if (Math.random() > 0.25) return
      splashesRef.current.push({
        x,
        y,
        radius: 2 + Math.random() * 5,
        opacity: 0.4 + Math.random() * 0.35,
        life: 1,
      })
    }

    let lastSpawn = 0
    const draw = (now: number) => {
      if (now - lastSpawn > (coarse ? 60 : 30)) {
        spawnDrop()
        lastSpawn = now
      }

      ctx.clearRect(0, 0, w, h)

      const nextDrops: Drop[] = []
      for (const d of dropsRef.current) {
        const ny = d.y + d.speed
        const nx = d.x + d.drift

        ctx.beginPath()
        ctx.strokeStyle = `rgba(220, 235, 255, ${d.opacity})`
        ctx.lineWidth = d.width
        ctx.lineCap = 'round'
        ctx.moveTo(nx, ny)
        ctx.lineTo(nx - d.drift * 4, ny - d.length)
        ctx.stroke()

        if (ny < h + 30) {
          nextDrops.push({ ...d, x: nx, y: ny })
        } else {
          spawnSplash(nx, h - 4)
        }
      }
      dropsRef.current = nextDrops

      splashesRef.current = splashesRef.current.filter((s) => {
        s.life -= 0.05
        s.radius += 0.5
        s.opacity *= 0.9
        if (s.life <= 0) return false

        ctx.beginPath()
        ctx.strokeStyle = `rgba(200, 225, 255, ${s.opacity})`
        ctx.lineWidth = 1
        ctx.ellipse(s.x, s.y, s.radius, s.radius * 0.35, 0, 0, Math.PI * 2)
        ctx.stroke()
        return true
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    for (let i = 0; i < (coarse ? 60 : 120); i++) {
      dropsRef.current.push(createDrop(true))
    }
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="rain-overlay pointer-events-none fixed inset-0 z-[30]"
      aria-hidden="true"
    />
  )
}
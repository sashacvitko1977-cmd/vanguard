import { useEffect, useRef } from 'react'

type Drop = {
  x: number
  y: number
  z: number
  speed: number
  length: number
  width: number
  opacity: number
  wind: number
  heavy: boolean
}

type Ripple = {
  x: number
  y: number
  radius: number
  opacity: number
  life: number
  heavy: boolean
}

const WIND = 1.35

/** Реалистичный дождь поверх всего сайта */
export function RainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const ripplesRef = useRef<Ripple[]>([])
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

    const createDrop = (randomY = false): Drop => {
      const z = Math.random()
      const heavy = Math.random() < 0.08
      const depth = 0.35 + z * 0.65

      return {
        x: Math.random() * (w + 80) - 40,
        y: randomY ? Math.random() * h : -30 - Math.random() * 120,
        z,
        speed: (heavy ? 22 : 14) + depth * 16 + Math.random() * 6,
        length: (heavy ? 28 : 14) + depth * 22 + Math.random() * 12,
        width: heavy ? 1.4 + Math.random() * 0.8 : 0.4 + depth * 0.9,
        opacity: heavy ? 0.55 + Math.random() * 0.25 : 0.12 + depth * 0.35,
        wind: WIND + (Math.random() - 0.5) * 0.35,
        heavy,
      }
    }

    const spawnDrop = () => {
      const chance = coarse ? 0.55 : 0.72
      if (Math.random() > chance) return

      const count = coarse ? 1 : Math.random() < 0.15 ? 2 : 1
      for (let i = 0; i < count; i++) {
        dropsRef.current.push(createDrop())
      }
      const max = coarse ? 90 : 180
      if (dropsRef.current.length > max) {
        dropsRef.current.splice(0, dropsRef.current.length - max)
      }
    }

    const spawnRipple = (x: number, y: number, heavy: boolean) => {
      if (Math.random() > (heavy ? 0.7 : 0.18)) return
      ripplesRef.current.push({
        x,
        y,
        radius: heavy ? 3 + Math.random() * 4 : 1.5 + Math.random() * 3,
        opacity: heavy ? 0.35 + Math.random() * 0.2 : 0.15 + Math.random() * 0.15,
        life: 1,
        heavy,
      })
    }

    const drawDrop = (d: Drop, x: number, y: number) => {
      const tailX = x - d.wind * (d.length * 0.12)
      const tailY = y - d.length

      const grad = ctx.createLinearGradient(tailX, tailY, x, y)
      grad.addColorStop(0, `rgba(160, 185, 220, 0)`)
      grad.addColorStop(0.45, `rgba(190, 210, 235, ${d.opacity * 0.25})`)
      grad.addColorStop(0.85, `rgba(215, 230, 250, ${d.opacity * 0.75})`)
      grad.addColorStop(1, `rgba(240, 248, 255, ${Math.min(d.opacity * 1.1, 0.95)})`)

      ctx.beginPath()
      ctx.strokeStyle = grad
      ctx.lineWidth = d.width
      ctx.lineCap = 'round'
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(x, y)
      ctx.stroke()

      if (d.heavy) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(235, 245, 255, ${d.opacity * 0.5})`
        ctx.arc(x, y, d.width * 0.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let lastSpawn = 0
    const draw = (now: number) => {
      if (now - lastSpawn > (coarse ? 55 : 28)) {
        spawnDrop()
        lastSpawn = now
      }

      ctx.clearRect(0, 0, w, h)

      const nextDrops: Drop[] = []
      for (const d of dropsRef.current) {
        const ny = d.y + d.speed
        const nx = d.x + d.wind

        drawDrop(d, nx, ny)

        if (ny < h + 40) {
          nextDrops.push({ ...d, x: nx, y: ny })
        } else {
          spawnRipple(nx, h - 2 - Math.random() * 6, d.heavy)
        }
      }
      dropsRef.current = nextDrops

      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.life -= r.heavy ? 0.04 : 0.06
        r.radius += r.heavy ? 0.55 : 0.35
        r.opacity *= 0.91
        if (r.life <= 0 || r.opacity < 0.02) return false

        ctx.beginPath()
        ctx.strokeStyle = `rgba(200, 220, 245, ${r.opacity})`
        ctx.lineWidth = r.heavy ? 1.1 : 0.6
        ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.28, 0, 0, Math.PI * 2)
        ctx.stroke()

        if (r.heavy && r.life > 0.5) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(200, 220, 245, ${r.opacity * 0.45})`
          ctx.lineWidth = 0.5
          ctx.ellipse(r.x, r.y, r.radius * 0.55, r.radius * 0.16, 0, 0, Math.PI * 2)
          ctx.stroke()
        }

        return true
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    const seedCount = coarse ? 50 : 100
    for (let i = 0; i < seedCount; i++) {
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
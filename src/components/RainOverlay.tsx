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

type ImpactDrop = {
  startX: number
  startY: number
  targetX: number
  targetY: number
  progress: number
  speed: number
  size: number
  opacity: number
}

type ScreenSplash = {
  x: number
  y: number
  life: number
  maxLife: number
  radius: number
  ring: number
  rays: { angle: number; length: number }[]
  bead: { y: number; driftX: number; opacity: number; life: number } | null
}

const WIND = 1.35

/** Реалистичный дождь + удары о «стекло» экрана */
export function RainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const ripplesRef = useRef<Ripple[]>([])
  const impactsRef = useRef<ImpactDrop[]>([])
  const splashesRef = useRef<ScreenSplash[]>([])
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

    const createImpactDrop = (): ImpactDrop => {
      const targetX = w * (0.12 + Math.random() * 0.76)
      const targetY = h * (0.1 + Math.random() * 0.75)
      const edge = Math.floor(Math.random() * 3)

      let startX = targetX
      let startY = targetY
      if (edge === 0) {
        startX = targetX + (Math.random() - 0.5) * w * 0.35
        startY = -40 - Math.random() * 80
      } else if (edge === 1) {
        startX = w + 30 + Math.random() * 60
        startY = targetY - h * (0.08 + Math.random() * 0.2)
      } else {
        startX = -30 - Math.random() * 60
        startY = targetY - h * (0.08 + Math.random() * 0.2)
      }

      return {
        startX,
        startY,
        targetX,
        targetY,
        progress: 0,
        speed: 0.018 + Math.random() * 0.022,
        size: 1.2 + Math.random() * 1.8,
        opacity: 0.45 + Math.random() * 0.35,
      }
    }

    const spawnScreenSplash = (x: number, y: number) => {
      const rayCount = 7 + Math.floor(Math.random() * 6)
      const rays = Array.from({ length: rayCount }, (_, i) => ({
        angle: (Math.PI * 2 * i) / rayCount + (Math.random() - 0.5) * 0.35,
        length: 6 + Math.random() * 14,
      }))

      splashesRef.current.push({
        x,
        y,
        life: 1,
        maxLife: 1,
        radius: 2 + Math.random() * 2,
        ring: 0,
        rays,
        bead:
          Math.random() > 0.35
            ? {
                y: 0,
                driftX: (Math.random() - 0.5) * 3,
                opacity: 0.55 + Math.random() * 0.25,
                life: 1,
              }
            : null,
      })

      if (splashesRef.current.length > (coarse ? 12 : 24)) {
        splashesRef.current.shift()
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

    const spawnImpactDrop = () => {
      const interval = coarse ? 0.004 : 0.007
      if (Math.random() > interval) return
      if (impactsRef.current.length >= (coarse ? 3 : 6)) return
      impactsRef.current.push(createImpactDrop())
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

    const drawImpactDrop = (drop: ImpactDrop) => {
      const t = drop.progress * drop.progress
      const x = drop.startX + (drop.targetX - drop.startX) * t
      const y = drop.startY + (drop.targetY - drop.startY) * t
      const size = drop.size * (0.4 + t * 2.2)
      const alpha = drop.opacity * (0.35 + t * 0.65)

      const trailT = Math.max(0, t - 0.12)
      const tx = drop.startX + (drop.targetX - drop.startX) * trailT
      const ty = drop.startY + (drop.targetY - drop.startY) * trailT

      const streak = ctx.createLinearGradient(tx, ty, x, y)
      streak.addColorStop(0, `rgba(200, 220, 245, 0)`)
      streak.addColorStop(0.6, `rgba(220, 235, 250, ${alpha * 0.35})`)
      streak.addColorStop(1, `rgba(245, 250, 255, ${alpha})`)

      ctx.beginPath()
      ctx.strokeStyle = streak
      ctx.lineWidth = size * 0.45
      ctx.lineCap = 'round'
      ctx.moveTo(tx, ty)
      ctx.lineTo(x, y)
      ctx.stroke()

      const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 1.8)
      glow.addColorStop(0, `rgba(245, 250, 255, ${alpha * 0.9})`)
      glow.addColorStop(0.45, `rgba(220, 235, 250, ${alpha * 0.35})`)
      glow.addColorStop(1, `rgba(200, 220, 245, 0)`)

      ctx.beginPath()
      ctx.fillStyle = glow
      ctx.arc(x, y, size * 1.8, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.85})`
      ctx.arc(x, y, size * 0.55, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawScreenSplash = (s: ScreenSplash) => {
      const fade = s.life / s.maxLife
      const alpha = fade * fade

      ctx.beginPath()
      ctx.fillStyle = `rgba(240, 248, 255, ${alpha * 0.55})`
      ctx.arc(s.x, s.y, s.radius * 0.7, 0, Math.PI * 2)
      ctx.fill()

      for (const ray of s.rays) {
        const len = ray.length * (0.6 + (1 - fade) * 0.8)
        const ex = s.x + Math.cos(ray.angle) * len
        const ey = s.y + Math.sin(ray.angle) * len

        const rayGrad = ctx.createLinearGradient(s.x, s.y, ex, ey)
        rayGrad.addColorStop(0, `rgba(235, 245, 255, ${alpha * 0.75})`)
        rayGrad.addColorStop(1, `rgba(200, 220, 245, 0)`)

        ctx.beginPath()
        ctx.strokeStyle = rayGrad
        ctx.lineWidth = 0.8 + fade * 0.6
        ctx.lineCap = 'round'
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(ex, ey)
        ctx.stroke()
      }

      ctx.beginPath()
      ctx.strokeStyle = `rgba(210, 230, 250, ${alpha * 0.5})`
      ctx.lineWidth = 1
      ctx.ellipse(s.x, s.y, s.ring, s.ring * 0.35, 0, 0, Math.PI * 2)
      ctx.stroke()

      if (s.bead) {
        const beadAlpha = s.bead.opacity * s.bead.life * alpha
        const slideGrad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.bead.y)
        slideGrad.addColorStop(0, `rgba(220, 235, 250, ${beadAlpha * 0.7})`)
        slideGrad.addColorStop(1, `rgba(200, 220, 245, 0)`)

        ctx.beginPath()
        ctx.strokeStyle = slideGrad
        ctx.lineWidth = 1.2
        ctx.lineCap = 'round'
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x + s.bead.driftX, s.y + s.bead.y)
        ctx.stroke()

        ctx.beginPath()
        ctx.fillStyle = `rgba(235, 245, 255, ${beadAlpha * 0.6})`
        ctx.ellipse(s.x + s.bead.driftX * 0.4, s.y + s.bead.y, 1.8, 2.4, 0, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let lastSpawn = 0
    const draw = (now: number) => {
      if (now - lastSpawn > (coarse ? 55 : 28)) {
        spawnDrop()
        lastSpawn = now
      }
      spawnImpactDrop()

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

      const nextImpacts: ImpactDrop[] = []
      for (const drop of impactsRef.current) {
        const progress = drop.progress + drop.speed
        if (progress < 1) {
          nextImpacts.push({ ...drop, progress })
          drawImpactDrop({ ...drop, progress })
        } else {
          spawnScreenSplash(drop.targetX, drop.targetY)
        }
      }
      impactsRef.current = nextImpacts

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

      splashesRef.current = splashesRef.current.filter((s) => {
        s.life -= 0.035
        s.ring += 1.8 + (1 - s.life) * 2.2
        if (s.bead) {
          s.bead.y += 1.6 + (1 - s.bead.life) * 1.2
          s.bead.life -= 0.028
        }
        if (s.life <= 0) return false

        drawScreenSplash(s)
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
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
  x: number
  y: number
  impactY: number
  speed: number
  length: number
  width: number
  opacity: number
  wind: number
  heavy: boolean
}

type SplashParticle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  opacity: number
}

type SlideBead = {
  y: number
  driftX: number
  opacity: number
  life: number
  width: number
}

type ScreenSplash = {
  x: number
  y: number
  life: number
  maxLife: number
  intensity: number
  radius: number
  flash: number
  rings: { radius: number; opacity: number; width: number }[]
  rays: { angle: number; length: number; width: number }[]
  smears: { angle: number; length: number; opacity: number }[]
  particles: SplashParticle[]
  beads: SlideBead[]
}

const WIND_DRIFT = 0.12

const createSplashParticles = (x: number, y: number, intensity: number, count: number): SplashParticle[] => {
  const particles: SplashParticle[] = []
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const force = (2 + Math.random() * 7) * intensity
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * force,
      vy: Math.sin(angle) * force - 1.5 - Math.random() * 3,
      size: 0.6 + Math.random() * 2.2 * intensity,
      life: 0.7 + Math.random() * 0.5,
      opacity: 0.4 + Math.random() * 0.5,
    })
  }
  return particles
}

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
      const heavy = Math.random() < 0.14
      const depth = 0.35 + z * 0.65

      return {
        x: Math.random() * w,
        y: randomY ? -20 - Math.random() * h : -20 - Math.random() * 140,
        z,
        speed: (heavy ? 20 : 12) + depth * 18 + Math.random() * 8,
        length: (heavy ? 22 : 12) + depth * 26 + Math.random() * 14,
        width: heavy ? 1.2 + Math.random() * 0.7 : 0.35 + depth * 0.75,
        opacity: heavy ? 0.5 + Math.random() * 0.3 : 0.14 + depth * 0.38,
        wind: (Math.random() - 0.5) * WIND_DRIFT,
        heavy,
      }
    }

    const createImpactDrop = (heavy = Math.random() < 0.22): ImpactDrop => ({
      x: Math.random() * w,
      y: -20 - Math.random() * 180,
      impactY: h * (0.1 + Math.random() * 0.82),
      speed: (heavy ? 18 : 11) + Math.random() * 12,
      length: (heavy ? 22 : 14) + Math.random() * 20,
      width: heavy ? 1.1 + Math.random() * 0.9 : 0.55 + Math.random() * 0.65,
      opacity: heavy ? 0.55 + Math.random() * 0.35 : 0.32 + Math.random() * 0.38,
      wind: (Math.random() - 0.5) * WIND_DRIFT,
      heavy,
    })

    const spawnScreenSplash = (x: number, y: number, heavy: boolean) => {
      const intensity = heavy ? 1.2 + Math.random() * 0.5 : 0.75 + Math.random() * 0.45
      const rayCount = heavy ? 14 + Math.floor(Math.random() * 8) : 9 + Math.floor(Math.random() * 6)

      const rays = Array.from({ length: rayCount }, (_, i) => ({
        angle: (Math.PI * 2 * i) / rayCount + (Math.random() - 0.5) * 0.5,
        length: (heavy ? 14 : 8) + Math.random() * (heavy ? 22 : 14),
        width: 0.6 + Math.random() * (heavy ? 1.8 : 1.1),
      }))

      const smears = Array.from({ length: heavy ? 5 : 3 }, () => ({
        angle: Math.random() * Math.PI * 2,
        length: 10 + Math.random() * (heavy ? 28 : 16),
        opacity: 0.25 + Math.random() * 0.35,
      }))

      const beads: SlideBead[] = Array.from({ length: heavy ? 3 : 1 + Math.floor(Math.random() * 2) }, () => ({
        y: 0,
        driftX: (Math.random() - 0.5) * (heavy ? 8 : 5),
        opacity: 0.5 + Math.random() * 0.35,
        life: 1,
        width: 1 + Math.random() * (heavy ? 2.2 : 1.4),
      }))

      splashesRef.current.push({
        x,
        y,
        life: 1,
        maxLife: 1,
        intensity,
        radius: heavy ? 3 + Math.random() * 4 : 2 + Math.random() * 2.5,
        flash: 1,
        rings: [
          { radius: 0, opacity: 0.7, width: heavy ? 2 : 1.2 },
          { radius: 0, opacity: 0.45, width: 1 },
          { radius: 0, opacity: 0.25, width: 0.6 },
        ],
        rays,
        smears,
        particles: createSplashParticles(x, y, intensity, heavy ? 28 + Math.floor(Math.random() * 16) : 14 + Math.floor(Math.random() * 10)),
        beads,
      })

      if (heavy && Math.random() > 0.4) {
        const ox = x + (Math.random() - 0.5) * 40
        const oy = y + (Math.random() - 0.5) * 30
        splashesRef.current.push({
          x: ox,
          y: oy,
          life: 0.85,
          maxLife: 0.85,
          intensity: 0.5 + Math.random() * 0.3,
          radius: 1.5 + Math.random() * 2,
          flash: 0.6,
          rings: [{ radius: 0, opacity: 0.4, width: 0.8 }],
          rays: Array.from({ length: 6 }, (_, i) => ({
            angle: (Math.PI * 2 * i) / 6 + Math.random() * 0.4,
            length: 5 + Math.random() * 8,
            width: 0.5 + Math.random() * 0.6,
          })),
          smears: [],
          particles: createSplashParticles(ox, oy, 0.5, 6 + Math.floor(Math.random() * 6)),
          beads: [],
        })
      }

      const maxSplashes = coarse ? 7 : 12
      if (splashesRef.current.length > maxSplashes) {
        splashesRef.current.splice(0, splashesRef.current.length - maxSplashes)
      }
    }

    const spawnDrop = () => {
      const chance = coarse ? 0.22 : 0.28
      if (Math.random() > chance) return

      dropsRef.current.push(createDrop())
      const max = coarse ? 11 : 19
      if (dropsRef.current.length > max) {
        dropsRef.current.splice(0, dropsRef.current.length - max)
      }
    }

    const spawnImpactDrop = () => {
      const chance = coarse ? 0.15 : 0.18
      if (Math.random() > chance) return
      const maxImpacts = coarse ? 28 : 55
      if (impactsRef.current.length >= maxImpacts) return

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
      const tailX = x - d.wind * 2
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

    const drawImpactDrop = (d: ImpactDrop, x: number, y: number) => {
      const tailX = x - d.wind * 2
      const tailY = y - d.length

      const grad = ctx.createLinearGradient(tailX, tailY, x, y)
      grad.addColorStop(0, `rgba(170, 195, 225, 0)`)
      grad.addColorStop(0.4, `rgba(200, 220, 245, ${d.opacity * 0.3})`)
      grad.addColorStop(0.85, `rgba(225, 238, 252, ${d.opacity * 0.8})`)
      grad.addColorStop(1, `rgba(245, 250, 255, ${Math.min(d.opacity * 1.15, 0.98)})`)

      ctx.beginPath()
      ctx.strokeStyle = grad
      ctx.lineWidth = d.width
      ctx.lineCap = 'round'
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(x, y)
      ctx.stroke()

      if (d.heavy) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(240, 248, 255, ${d.opacity * 0.55})`
        ctx.arc(x, y, d.width * 0.65, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawScreenSplash = (s: ScreenSplash) => {
      const fade = s.life / s.maxLife
      const alpha = fade * fade * s.intensity

      if (s.flash > 0.05) {
        const flashGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 18 + s.intensity * 14)
        flashGrad.addColorStop(0, `rgba(255, 255, 255, ${s.flash * 0.55})`)
        flashGrad.addColorStop(0.35, `rgba(220, 235, 255, ${s.flash * 0.2})`)
        flashGrad.addColorStop(1, `rgba(200, 220, 245, 0)`)
        ctx.beginPath()
        ctx.fillStyle = flashGrad
        ctx.arc(s.x, s.y, 18 + s.intensity * 14, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.beginPath()
      ctx.fillStyle = `rgba(245, 250, 255, ${alpha * 0.65})`
      ctx.arc(s.x, s.y, s.radius * (0.6 + (1 - fade) * 0.5), 0, Math.PI * 2)
      ctx.fill()

      for (const smear of s.smears) {
        const len = smear.length * (0.5 + (1 - fade) * 0.7)
        const ex = s.x + Math.cos(smear.angle) * len
        const ey = s.y + Math.sin(smear.angle) * len
        const smearGrad = ctx.createLinearGradient(s.x, s.y, ex, ey)
        smearGrad.addColorStop(0, `rgba(230, 242, 255, ${smear.opacity * alpha * 0.8})`)
        smearGrad.addColorStop(1, `rgba(200, 220, 245, 0)`)
        ctx.beginPath()
        ctx.strokeStyle = smearGrad
        ctx.lineWidth = 1.5 + fade
        ctx.lineCap = 'round'
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(ex, ey)
        ctx.stroke()
      }

      for (const ray of s.rays) {
        const len = ray.length * (0.5 + (1 - fade) * 1.1)
        const ex = s.x + Math.cos(ray.angle) * len
        const ey = s.y + Math.sin(ray.angle) * len

        const rayGrad = ctx.createLinearGradient(s.x, s.y, ex, ey)
        rayGrad.addColorStop(0, `rgba(245, 250, 255, ${alpha * 0.9})`)
        rayGrad.addColorStop(0.4, `rgba(230, 242, 255, ${alpha * 0.5})`)
        rayGrad.addColorStop(1, `rgba(200, 220, 245, 0)`)

        ctx.beginPath()
        ctx.strokeStyle = rayGrad
        ctx.lineWidth = ray.width
        ctx.lineCap = 'round'
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(ex, ey)
        ctx.stroke()
      }

      for (const ring of s.rings) {
        if (ring.opacity < 0.03) continue
        ctx.beginPath()
        ctx.strokeStyle = `rgba(210, 230, 250, ${ring.opacity * alpha})`
        ctx.lineWidth = ring.width
        ctx.ellipse(s.x, s.y, ring.radius, ring.radius * 0.32, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      for (const p of s.particles) {
        if (p.life <= 0) continue
        const pAlpha = p.opacity * p.life * alpha
        ctx.beginPath()
        ctx.fillStyle = `rgba(235, 245, 255, ${pAlpha})`
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const bead of s.beads) {
        const beadAlpha = bead.opacity * bead.life * alpha
        const slideGrad = ctx.createLinearGradient(s.x, s.y, s.x + bead.driftX, s.y + bead.y)
        slideGrad.addColorStop(0, `rgba(225, 238, 252, ${beadAlpha * 0.85})`)
        slideGrad.addColorStop(0.6, `rgba(210, 228, 248, ${beadAlpha * 0.45})`)
        slideGrad.addColorStop(1, `rgba(200, 220, 245, 0)`)

        ctx.beginPath()
        ctx.strokeStyle = slideGrad
        ctx.lineWidth = bead.width
        ctx.lineCap = 'round'
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x + bead.driftX, s.y + bead.y)
        ctx.stroke()

        ctx.beginPath()
        ctx.fillStyle = `rgba(240, 248, 255, ${beadAlpha * 0.7})`
        ctx.ellipse(s.x + bead.driftX * 0.5, s.y + bead.y, bead.width * 1.2, bead.width * 1.6, 0, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let lastSpawn = 0
    let lastImpactSpawn = 0
    const draw = (now: number) => {
      if (now - lastSpawn > (coarse ? 220 : 152)) {
        spawnDrop()
        lastSpawn = now
      }
      if (now - lastImpactSpawn > (coarse ? 56 : 36)) {
        spawnImpactDrop()
        lastImpactSpawn = now
      }

      ctx.clearRect(0, 0, w, h)

      const nextDrops: Drop[] = []
      for (const d of dropsRef.current) {
        const ny = d.y + d.speed
        const nx = d.x + d.wind * 0.4
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
        const ny = drop.y + drop.speed
        const nx = drop.x + drop.wind * 0.4
        drawImpactDrop(drop, nx, ny)
        if (ny < drop.impactY) {
          nextImpacts.push({ ...drop, x: nx, y: ny })
        } else {
          spawnScreenSplash(nx, drop.impactY, drop.heavy)
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
        return true
      })

      splashesRef.current = splashesRef.current.filter((s) => {
        s.life -= s.intensity > 1 ? 0.028 : 0.038
        s.flash *= 0.82

        for (const ring of s.rings) {
          ring.radius += 2.4 + s.intensity * 1.8
          ring.opacity *= 0.9
        }

        for (const p of s.particles) {
          p.x += p.vx
          p.y += p.vy
          p.vy += 0.22
          p.vx *= 0.97
          p.life -= 0.04
        }

        for (const bead of s.beads) {
          bead.y += 2.2 + (1 - bead.life) * 2.5
          bead.life -= 0.022
        }

        if (s.life <= 0) return false
        drawScreenSplash(s)
        return true
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    const bgSeed = coarse ? 6 : 10
    const impactSeed = coarse ? 18 : 38
    for (let i = 0; i < bgSeed; i++) {
      dropsRef.current.push(createDrop(true))
    }
    for (let i = 0; i < impactSeed; i++) {
      const drop = createImpactDrop()
      drop.y = -20 - Math.random() * h
      impactsRef.current.push(drop)
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
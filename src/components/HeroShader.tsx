import { useEffect, useRef } from 'react'

/** Процедурный noise-градиент на canvas, реагирует на курсор */
export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const smooth = useRef({ x: 0.5, y: 0.5 })
  const t = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * devicePixelRatio)
      canvas.height = Math.floor(h * devicePixelRatio)
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth
      mouse.current.y = e.clientY / window.innerHeight
    }

    const noise = (x: number, y: number, seed: number) => {
      const s = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453
      return s - Math.floor(s)
    }

    const draw = () => {
      t.current += 0.004
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.06
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.06

      const mx = smooth.current.x
      const my = smooth.current.y
      const time = t.current

      const g = ctx.createRadialGradient(
        w * (0.35 + mx * 0.25),
        h * (0.4 + my * 0.2),
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.85,
      )
      g.addColorStop(0, `rgba(124, 58, 237, ${0.35 + mx * 0.15})`)
      g.addColorStop(0.35, `rgba(59, 7, 100, ${0.5 + my * 0.1})`)
      g.addColorStop(0.7, 'rgba(5, 5, 12, 0.95)')
      g.addColorStop(1, '#030308')

      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      const step = 10
      ctx.globalCompositeOperation = 'screen'
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const n = noise(x * 0.007 + time, y * 0.007 - time * 0.5, time * 2)
          const influence = Math.pow(n, 2) * 0.1
          const hue = 260 + mx * 40 + n * 30
          ctx.fillStyle = `hsla(${hue}, 70%, 55%, ${influence})`
          ctx.fillRect(x, y, step, step)
        }
      }
      ctx.globalCompositeOperation = 'source-over'

      // Wireframe grid
      ctx.strokeStyle = `rgba(139, 92, 246, ${0.06 + mx * 0.04})`
      ctx.lineWidth = 1
      const grid = 48
      const offsetX = (time * 20 + mx * 30) % grid
      const offsetY = (time * 12 + my * 20) % grid
      ctx.beginPath()
      for (let x = -grid; x < w + grid; x += grid) {
        ctx.moveTo(x + offsetX, 0)
        ctx.lineTo(x + offsetX - w * 0.15, h)
      }
      for (let y = -grid; y < h + grid; y += grid) {
        ctx.moveTo(0, y + offsetY)
        ctx.lineTo(w, y + offsetY - h * 0.08)
      }
      ctx.stroke()

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
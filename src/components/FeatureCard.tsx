import { useRef, type MouseEvent } from 'react'
import { useReducedEffects } from '../hooks/useReducedEffects'
import { motion, type Variants } from 'framer-motion'
import type { CardData } from '../lib/data'
import { ArrowUpRight } from 'lucide-react'

const accentMap = {
  violet: {
    ring: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.08)]',
    icon: 'text-violet-300 bg-violet-500/12 border-violet-400/20',
    tag: 'text-violet-200/90 bg-violet-500/12 border-violet-400/25',
    metric: 'text-violet-300',
    line: 'from-violet-400 to-fuchsia-400',
    arrow: 'text-violet-400',
    cursor: 'rgba(139, 92, 246, 0.22)',
    mockupAccent: 'bg-violet-500/30',
  },
  cyan: {
    ring: 'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.07)]',
    icon: 'text-cyan-300 bg-cyan-500/12 border-cyan-400/20',
    tag: 'text-cyan-200/90 bg-cyan-500/12 border-cyan-400/25',
    metric: 'text-cyan-300',
    line: 'from-cyan-400 to-blue-400',
    arrow: 'text-cyan-400',
    cursor: 'rgba(34, 211, 238, 0.2)',
    mockupAccent: 'bg-cyan-400/30',
  },
  amber: {
    ring: 'group-hover:shadow-[0_0_20px_rgba(251,191,36,0.07)]',
    icon: 'text-amber-300 bg-amber-500/12 border-amber-400/20',
    tag: 'text-amber-200/90 bg-amber-500/12 border-amber-400/25',
    metric: 'text-amber-300',
    line: 'from-amber-400 to-orange-400',
    arrow: 'text-amber-400',
    cursor: 'rgba(251, 191, 36, 0.2)',
    mockupAccent: 'bg-amber-400/30',
  },
  rose: {
    ring: 'group-hover:shadow-[0_0_20px_rgba(244,63,94,0.07)]',
    icon: 'text-rose-300 bg-rose-500/12 border-rose-400/20',
    tag: 'text-rose-200/90 bg-rose-500/12 border-rose-400/25',
    metric: 'text-rose-300',
    line: 'from-rose-400 to-pink-400',
    arrow: 'text-rose-400',
    cursor: 'rgba(244, 63, 94, 0.2)',
    mockupAccent: 'bg-rose-400/30',
  },
  emerald: {
    ring: 'group-hover:shadow-[0_0_20px_rgba(52,211,153,0.07)]',
    icon: 'text-emerald-300 bg-emerald-500/12 border-emerald-400/20',
    tag: 'text-emerald-200/90 bg-emerald-500/12 border-emerald-400/25',
    metric: 'text-emerald-300',
    line: 'from-emerald-400 to-teal-400',
    arrow: 'text-emerald-400',
    cursor: 'rgba(52, 211, 153, 0.2)',
    mockupAccent: 'bg-emerald-400/30',
  },
}

type Props = {
  card: CardData
  variants?: Variants
  tilt?: boolean
  index?: number
  className?: string
}

export function FeatureCard({ card, variants, tilt = false, index, className = '' }: Props) {
  const reducedEffects = useReducedEffects()
  const enableTilt = tilt && !reducedEffects
  const a = accentMap[card.accent]
  const Icon = card.icon
  const ref = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)

  const applyTilt = () => {
    const el = ref.current
    if (!el || !enableTilt) return
    const { x, y } = tiltRef.current
    el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.01, 1.01, 1.01)`
  }

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    const glow = glowRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    if (glow) {
      glow.style.background = `radial-gradient(320px circle at ${px * 100}% ${py * 100}%, ${a.cursor}, transparent 68%)`
      glow.style.opacity = '1'
    }

    if (enableTilt) {
      tiltRef.current = {
        x: Math.max(-7, Math.min(7, (px - 0.5) * 16)),
        y: Math.max(-6, Math.min(6, (0.5 - py) * 12)),
      }
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(applyTilt)
    }
  }

  const handleLeave = () => {
    const el = ref.current
    const glow = glowRef.current
    if (glow) glow.style.opacity = '0'
    if (el && enableTilt) {
      tiltRef.current = { x: 0, y: 0 }
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
  }

  return (
    <motion.article
      ref={ref}
      variants={variants}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor-hover
      className={`group relative ${a.ring} ${className}`}
      style={{ transformStyle: enableTilt ? 'preserve-3d' : undefined, willChange: enableTilt ? 'transform' : undefined }}
    >
      <div className="card-shell relative overflow-hidden">
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-500"
        />

        {card.mockup && (
          <div className={`relative overflow-hidden bg-gradient-to-br ${card.mockup.gradient} ${card.mockup.pattern ?? ''}`}>
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-black/20 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/10" />
                <span className="h-2 w-2 rounded-full bg-white/10" />
              </div>
              <div className="mx-auto h-5 flex-1 max-w-[140px] rounded-md bg-white/[0.06]" />
              {index !== undefined && (
                <span className="font-display text-[10px] text-white/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
            </div>

            <div className="relative h-32 sm:h-36">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(0,0,0,0.9)_100%)]" />
              <div className={`absolute left-5 top-5 h-20 w-28 rounded-xl border border-white/10 bg-black/15 ${a.mockupAccent}`} />
              <div className="absolute right-5 top-6 h-14 w-20 rounded-lg border border-white/8 bg-white/[0.04]" />
              <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${a.icon}`}>
                  <Icon size={13} strokeWidth={1.5} />
                </div>
                {card.mockup.label && (
                  <span className="font-inter text-[9px] uppercase tracking-widest text-white/45">
                    {card.mockup.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="relative z-[1] p-5">
          {!card.mockup && (
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${a.icon}`}>
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <span className={`rounded-full border px-2.5 py-0.5 font-inter text-[9px] uppercase tracking-widest ${a.tag}`}>
                {card.tag}
              </span>
            </div>
          )}

          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="font-display text-base uppercase leading-tight text-white">{card.title}</h3>
            {card.mockup && (
              <span className={`shrink-0 rounded-full border px-2 py-0.5 font-inter text-[9px] uppercase tracking-widest ${a.tag}`}>
                {card.tag}
              </span>
            )}
          </div>

          {card.metric && (
            <p className={`mb-2.5 font-inter text-[11px] font-medium tracking-wide ${a.metric}`}>
              {card.metric}
            </p>
          )}

          <p className="text-[13px] leading-relaxed text-white/52">{card.text}</p>

          <div className="mt-5 flex items-center justify-between">
            <span className="flex items-center gap-1 font-inter text-[10px] uppercase tracking-widest text-white/30 transition-colors group-hover:text-white/65">
              Подробнее
              <ArrowUpRight size={12} strokeWidth={1.5} className={a.arrow} />
            </span>
            <div className={`h-[2px] w-8 bg-gradient-to-r ${a.line} opacity-40 transition-all duration-500 group-hover:w-16 group-hover:opacity-100`} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}
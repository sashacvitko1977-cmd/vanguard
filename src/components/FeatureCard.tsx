import { useRef, type MouseEvent } from 'react'
import { motion, type Variants } from 'framer-motion'
import type { CardData } from '../lib/data'
import { SNAP } from '../lib/motion'
import { ArrowUpRight } from 'lucide-react'

const accentMap = {
  violet: {
    border: 'group-hover:border-violet-500/50',
    glow: 'from-violet-600/20 via-violet-500/5 to-transparent',
    icon: 'text-violet-400 bg-violet-500/10 border-violet-500/25',
    tag: 'text-violet-300 bg-violet-500/15 border-violet-500/30',
    metric: 'text-violet-200',
    line: 'from-violet-500 to-fuchsia-500',
    arrow: 'text-violet-400',
    cursor: 'rgba(139, 92, 246, 0.18)',
  },
  cyan: {
    border: 'group-hover:border-cyan-500/50',
    glow: 'from-cyan-600/20 via-cyan-500/5 to-transparent',
    icon: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
    tag: 'text-cyan-300 bg-cyan-500/15 border-cyan-500/30',
    metric: 'text-cyan-200',
    line: 'from-cyan-500 to-blue-500',
    arrow: 'text-cyan-400',
    cursor: 'rgba(34, 211, 238, 0.18)',
  },
  amber: {
    border: 'group-hover:border-amber-500/50',
    glow: 'from-amber-600/20 via-amber-500/5 to-transparent',
    icon: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
    tag: 'text-amber-300 bg-amber-500/15 border-amber-500/30',
    metric: 'text-amber-200',
    line: 'from-amber-500 to-orange-500',
    arrow: 'text-amber-400',
    cursor: 'rgba(251, 191, 36, 0.18)',
  },
  rose: {
    border: 'group-hover:border-rose-500/50',
    glow: 'from-rose-600/20 via-rose-500/5 to-transparent',
    icon: 'text-rose-400 bg-rose-500/10 border-rose-500/25',
    tag: 'text-rose-300 bg-rose-500/15 border-rose-500/30',
    metric: 'text-rose-200',
    line: 'from-rose-500 to-pink-500',
    arrow: 'text-rose-400',
    cursor: 'rgba(244, 63, 94, 0.18)',
  },
  emerald: {
    border: 'group-hover:border-emerald-500/50',
    glow: 'from-emerald-600/20 via-emerald-500/5 to-transparent',
    icon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    tag: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30',
    metric: 'text-emerald-200',
    line: 'from-emerald-500 to-teal-500',
    arrow: 'text-emerald-400',
    cursor: 'rgba(52, 211, 153, 0.18)',
  },
}

type Props = {
  card: CardData
  variants?: Variants
  tilt?: boolean
  className?: string
}

export function FeatureCard({ card, variants, tilt = false, className = '' }: Props) {
  const a = accentMap[card.accent]
  const Icon = card.icon
  const ref = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    const glow = glowRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    if (glow) {
      glow.style.background = `radial-gradient(280px circle at ${px * 100}% ${py * 100}%, ${a.cursor}, transparent 65%)`
      glow.style.opacity = '1'
    }

    if (tilt) {
      const rotateY = (px - 0.5) * 14
      const rotateX = (0.5 - py) * 10
      el.style.transform = `perspective(900px) rotateX(${Math.max(-8, Math.min(8, rotateX))}deg) rotateY(${Math.max(-8, Math.min(8, rotateY))}deg)`
    }
  }

  const handleLeave = () => {
    const el = ref.current
    const glow = glowRef.current
    if (el && tilt) el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
    if (glow) glow.style.opacity = '0'
  }

  return (
    <motion.article
      ref={ref}
      variants={variants}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor-hover
      className={`group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-[border-color,transform] duration-200 ${a.border} ${className}`}
      style={{ transformStyle: 'preserve-3d', willChange: tilt ? 'transform' : undefined }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300"
      />

      {card.mockup && (
        <div
          className={`relative h-36 overflow-hidden border-b border-white/8 bg-gradient-to-br sm:h-40 ${card.mockup.gradient} ${card.mockup.pattern ?? ''}`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded border ${a.icon}`}>
              <Icon size={14} strokeWidth={1.5} />
            </div>
            {card.mockup.label && (
              <span className="font-inter text-[9px] uppercase tracking-widest text-white/40">
                {card.mockup.label}
              </span>
            )}
          </div>
          <div className="absolute right-4 top-4 h-16 w-24 rounded border border-white/10 bg-white/5 backdrop-blur-sm" />
          <div className="absolute right-6 top-7 h-1.5 w-14 rounded-full bg-white/20" />
          <div className="absolute right-6 top-10 h-1 w-10 rounded-full bg-white/10" />
        </div>
      )}

      <div className={`relative z-10 ${card.mockup ? 'p-5' : 'p-5'}`}>
        {!card.mockup && (
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-md border ${a.icon}`}>
              <Icon size={18} strokeWidth={1.5} />
            </div>
            <span className={`rounded-full border px-2.5 py-0.5 font-inter text-[9px] uppercase tracking-widest ${a.tag}`}>
              {card.tag}
            </span>
          </div>
        )}

        <div className="mb-3 flex items-end justify-between gap-2">
          <h3 className="font-inter text-sm font-semibold text-white">{card.title}</h3>
          <span className={`shrink-0 rounded-full border px-2 py-0.5 font-inter text-[9px] uppercase tracking-widest ${a.tag}`}>
            {card.tag}
          </span>
        </div>

        {card.metric && (
          <p className={`mb-2 font-display text-[11px] uppercase tracking-wide ${a.metric}`}>
            {card.metric}
          </p>
        )}

        <p className="text-xs leading-relaxed text-white/50">{card.text}</p>

        <motion.div
          className="mt-4 flex items-center gap-1 font-inter text-[10px] uppercase tracking-widest text-white/35 group-hover:text-white/70"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.18 }}
        >
          Подробнее
          <ArrowUpRight size={12} strokeWidth={1.5} className={`opacity-60 transition-colors group-hover:opacity-100 ${a.arrow}`} />
        </motion.div>

        <motion.div
          className={`mt-3 h-[2px] w-0 bg-gradient-to-r ${a.line} group-hover:w-full`}
          transition={{ duration: 0.35, ease: SNAP }}
        />
      </div>
    </motion.article>
  )
}
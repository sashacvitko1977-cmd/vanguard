import { motion, type Variants } from 'framer-motion'
import type { CardData } from '../lib/data'
import { cardHover, SNAP } from '../lib/motion'
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
  },
  cyan: {
    border: 'group-hover:border-cyan-500/50',
    glow: 'from-cyan-600/20 via-cyan-500/5 to-transparent',
    icon: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
    tag: 'text-cyan-300 bg-cyan-500/15 border-cyan-500/30',
    metric: 'text-cyan-200',
    line: 'from-cyan-500 to-blue-500',
    arrow: 'text-cyan-400',
  },
  amber: {
    border: 'group-hover:border-amber-500/50',
    glow: 'from-amber-600/20 via-amber-500/5 to-transparent',
    icon: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
    tag: 'text-amber-300 bg-amber-500/15 border-amber-500/30',
    metric: 'text-amber-200',
    line: 'from-amber-500 to-orange-500',
    arrow: 'text-amber-400',
  },
  rose: {
    border: 'group-hover:border-rose-500/50',
    glow: 'from-rose-600/20 via-rose-500/5 to-transparent',
    icon: 'text-rose-400 bg-rose-500/10 border-rose-500/25',
    tag: 'text-rose-300 bg-rose-500/15 border-rose-500/30',
    metric: 'text-rose-200',
    line: 'from-rose-500 to-pink-500',
    arrow: 'text-rose-400',
  },
  emerald: {
    border: 'group-hover:border-emerald-500/50',
    glow: 'from-emerald-600/20 via-emerald-500/5 to-transparent',
    icon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    tag: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30',
    metric: 'text-emerald-200',
    line: 'from-emerald-500 to-teal-500',
    arrow: 'text-emerald-400',
  },
}

export function FeatureCard({ card, variants }: { card: CardData; variants?: Variants }) {
  const a = accentMap[card.accent]
  const Icon = card.icon

  return (
    <motion.article
      variants={variants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm transition-colors duration-200 ${a.border}`}
    >
      <div className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${a.glow} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`} />

      <motion.div variants={cardHover} className="relative z-10">
        <div className="mb-4 flex items-start justify-between gap-3">
          <motion.div
            className={`flex h-10 w-10 items-center justify-center rounded-md border ${a.icon}`}
            whileHover={{ rotate: -8, scale: 1.1 }}
            transition={{ duration: 0.2, ease: SNAP }}
          >
            <Icon size={18} strokeWidth={1.75} />
          </motion.div>
          <span className={`rounded-full border px-2.5 py-0.5 font-inter text-[9px] uppercase tracking-widest ${a.tag}`}>
            {card.tag}
          </span>
        </div>

        <div className="mb-3 flex items-end justify-between gap-2">
          <h3 className="font-inter text-sm font-semibold text-white">{card.title}</h3>
          {card.metric && (
            <span className={`shrink-0 font-podium text-[11px] uppercase tracking-wide ${a.metric}`}>
              {card.metric}
            </span>
          )}
        </div>

        <p className="text-xs leading-relaxed text-white/50">{card.text}</p>

        <motion.div
          className="mt-4 flex items-center gap-1 font-inter text-[10px] uppercase tracking-widest text-white/35 group-hover:text-white/70"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.18 }}
        >
          Подробнее
          <ArrowUpRight size={12} className={`opacity-60 transition-colors group-hover:opacity-100 ${a.arrow}`} />
        </motion.div>

        <motion.div
          className={`mt-3 h-[2px] w-0 bg-gradient-to-r ${a.line} group-hover:w-full`}
          transition={{ duration: 0.35, ease: SNAP }}
        />
      </motion.div>
    </motion.article>
  )
}
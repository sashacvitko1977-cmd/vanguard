import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { HEADLINES, STATS } from '../lib/data'
import { SNAP_HARD } from '../lib/motion'
import { BrandSlash } from './BrandSlash'
import { CountUp } from './CountUp'
import { MagneticButton } from './MagneticButton'
import { TextReveal } from './TextReveal'

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <BrandSlash
        size="xl"
        className="pointer-events-none absolute -right-4 top-1/3 hidden opacity-25 sm:block lg:right-[8%] lg:opacity-35"
      />

      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pb-20 pt-28 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: SNAP_HARD }}
            className="mb-6 inline-flex items-center gap-3"
          >
            <BrandSlash size="sm" />
            <span className="font-display text-xs text-violet-400/70">00</span>
            <span className="h-px w-6 bg-violet-500/50" />
            <span className="rounded-full border border-white/10 bg-black/20 px-4 py-1.5 font-inter text-[10px] uppercase tracking-[0.22em] text-white/50">
              Креативная Web3-студия
            </span>
          </motion.div>

          <h1 className="font-display uppercase leading-[0.92] text-white">
            {HEADLINES.map((line, lineIdx) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + lineIdx * 0.16,
                  ease: SNAP_HARD,
                }}
                className={`block overflow-hidden text-[clamp(2rem,6vw,4.5rem)] ${
                  lineIdx === 2
                    ? 'blood-glow text-[#c41e3a]'
                    : `neon-glow ${lineIdx === 1 ? 'text-white/90' : 'text-white'}`
                }`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.35 }}
            className="mt-6 max-w-md"
          >
            <TextReveal
              as="p"
              className="font-inter text-sm leading-relaxed text-white/58"
              delay={0.65}
              text="Мы создаём легендарные бренды и продукты в мире криптовалюты, которые не просто привлекают внимание — они захватывают рынок."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.35, ease: SNAP_HARD }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <MagneticButton
              href="#projects"
              className="btn-arrow group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-inter text-xs font-semibold uppercase tracking-widest text-black shadow-neon transition-colors hover:bg-white/92 sm:w-auto"
            >
              Смотреть работы
              <ArrowUpRight size={16} strokeWidth={1.5} className="arrow-icon" />
            </MagneticButton>

            <span className="hidden font-inter text-[10px] uppercase tracking-widest text-white/40 sm:inline">
              ↓ Листай вниз
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-14 grid grid-cols-1 gap-6 border-t border-white/[0.06] pt-8 sm:grid-cols-3"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05 + i * 0.07, duration: 0.35, ease: SNAP_HARD }}
                className="group"
              >
                <div className="font-display text-3xl text-white transition-colors group-hover:text-violet-200">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1.5 font-inter text-[10px] uppercase tracking-widest text-white/42">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
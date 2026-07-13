import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { HEADLINES, STATS } from '../lib/data'
import { SNAP_HARD } from '../lib/motion'
import { CountUp } from './CountUp'
import { MagneticButton } from './MagneticButton'
import { TextReveal } from './TextReveal'
import { HeroShader } from './HeroShader'
import { CharReveal } from './CharReveal'

export function Hero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], [0, 320])
  const contentY = useTransform(scrollY, [0, 600], [0, 60])
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0.25])

  let charDelay = 0.12

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#030308]">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <HeroShader />
      </motion.div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_60%_40%,rgba(124,58,237,0.12),transparent_60%)]" />

      <motion.div
        className="relative z-10 flex min-h-screen flex-col justify-center px-6 pb-16 pt-24 sm:px-10 lg:px-16"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="mx-auto w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: SNAP_HARD }}
            className="mb-4 inline-flex items-center rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 backdrop-blur-sm"
          >
            <span className="font-inter text-[10px] uppercase tracking-[0.28em] text-white/55 sm:text-[11px]">
              Креативная Web3-студия нового поколения
            </span>
          </motion.div>

          <h1 className="font-display uppercase leading-[0.95] text-white">
            {HEADLINES.map((line) => {
              const delay = charDelay
              charDelay += line.length * 0.04 + 0.08
              return (
                <span
                  key={line}
                  className="neon-glow block text-[clamp(1.85rem,5.5vw,4.25rem)]"
                >
                  <CharReveal text={line} delay={delay} stagger={0.04} />
                </span>
              )
            })}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.3 }}
            className="mt-5 max-w-lg"
          >
            <TextReveal
              as="p"
              className="font-inter text-xs leading-relaxed text-white/65 sm:text-sm"
              delay={0.6}
              text="Мы создаём легендарные бренды и продукты в мире криптовалюты, которые не просто привлекают внимание — они захватывают рынок."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.28, ease: SNAP_HARD }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <MagneticButton
              href="#projects"
              className="btn-arrow group inline-flex w-full items-center justify-center gap-2 bg-white px-6 py-3 font-inter text-xs font-semibold uppercase tracking-widest text-black shadow-neon transition-colors hover:bg-white/90 sm:w-auto"
            >
              Смотреть работы
              <ArrowUpRight size={16} strokeWidth={1.5} className="arrow-icon" />
            </MagneticButton>

            <div className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2.5 font-inter text-[10px] uppercase tracking-widest text-white/60 sm:inline-flex">
              Нам доверяют топ-протоколы
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="mt-10 grid grid-cols-1 gap-5 border-t border-white/10 pt-7 sm:grid-cols-3 sm:gap-6"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.08, duration: 0.3, ease: SNAP_HARD }}
                whileHover={{ y: -4 }}
                className="group cursor-default"
              >
                <div className="font-display text-2xl text-white neon-glow transition-colors group-hover:text-violet-200 sm:text-3xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 font-inter text-[10px] uppercase tracking-widest text-white/50 sm:text-xs">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
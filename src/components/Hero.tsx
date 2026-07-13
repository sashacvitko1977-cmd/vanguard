import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Award, Crown, Zap } from 'lucide-react'
import { HEADLINES, STATS } from '../lib/data'
import { EASE_OUT_EXPO } from '../lib/motion'
import { CountUp } from './CountUp'
import { MagneticButton } from './MagneticButton'
import { TextReveal } from './TextReveal'

export function Hero() {
  const { scrollY } = useScroll()
  const videoY = useTransform(scrollY, [0, 600], [0, 120])
  const videoScale = useTransform(scrollY, [0, 600], [1, 1.08])
  const contentY = useTransform(scrollY, [0, 500], [0, 80])
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.3])

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#050508]">
      {/* Parallax video background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY, scale: videoScale }}>
        <video
          className="h-full w-full object-cover"
          src="/fonono.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </motion.div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/40 to-black/25" />
      <div className="absolute inset-0 z-[1] bg-black/10" />

      <motion.div
        className="relative z-10 flex min-h-screen flex-col justify-center px-6 pb-16 pt-24 sm:px-10 lg:px-16"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="mx-auto w-full max-w-4xl">
          {/* Tagline — уменьшен */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="mb-4 flex items-center gap-2.5"
          >
            <motion.div animate={{ rotate: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <Crown size={13} className="text-white/70" />
            </motion.div>
            <span className="font-inter text-[10px] uppercase tracking-[0.28em] text-white/60 sm:text-[11px]">
              Креативная Web3-студия нового поколения
            </span>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Zap size={12} className="text-violet-400/60" />
            </motion.div>
          </motion.div>

          {/* Headline — меньше и изящнее */}
          <h1 className="font-podium uppercase leading-[0.95] text-white">
            {HEADLINES.map((line, i) => (
              <motion.span
                key={line}
                className="neon-glow block text-[clamp(1.85rem,5.5vw,4.25rem)]"
                initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.15 + i * 0.12, ease: EASE_OUT_EXPO }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle — компактнее */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE_OUT_EXPO }}
            className="mt-5 max-w-lg"
          >
            <TextReveal
              as="p"
              className="font-inter text-xs leading-relaxed text-white/65 sm:text-sm"
              delay={0.6}
              text="Мы создаём легендарные бренды и продукты в мире криптовалюты, которые не просто привлекают внимание — они захватывают рынок."
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE_OUT_EXPO }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <MagneticButton
              href="#projects"
              className="btn-arrow group inline-flex w-full items-center justify-center gap-2 bg-white px-6 py-3 font-inter text-xs font-semibold uppercase tracking-widest text-black shadow-neon transition-colors hover:bg-white/90 sm:w-auto"
            >
              Смотреть работы
              <ArrowUpRight size={16} className="arrow-icon" />
            </MagneticButton>

            <motion.div
              className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 font-inter text-[10px] uppercase tracking-widest text-white/75 neon-border backdrop-blur-sm sm:inline-flex"
              whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.35)' }}
            >
              <Award size={14} className="text-violet-300" />
              Нам доверяют топ-протоколы
            </motion.div>
          </motion.div>

          {/* Stats with count-up */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 grid grid-cols-1 gap-5 border-t border-white/10 pt-7 sm:grid-cols-3 sm:gap-6"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.7 }}
                whileHover={{ y: -4 }}
                className="group cursor-default"
              >
                <div className="font-podium text-2xl text-white neon-glow transition-colors group-hover:text-violet-200 sm:text-3xl">
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
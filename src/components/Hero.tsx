import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Award, Crown, Zap } from 'lucide-react'
import { HEADLINES, STATS } from '../lib/data'
import { eyebrowSnap, textSnap, snapStagger, snapScale, SNAP_HARD } from '../lib/motion'
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
        <motion.div
          className="mx-auto w-full max-w-4xl"
          variants={snapStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={eyebrowSnap} className="mb-4 flex items-center gap-2.5">
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

          <motion.h1
            variants={snapStagger}
            className="font-podium uppercase leading-[0.95] text-white"
          >
            {HEADLINES.map((line) => (
              <motion.span
                key={line}
                variants={textSnap}
                className="neon-glow block text-[clamp(1.85rem,5.5vw,4.25rem)]"
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div variants={textSnap} className="mt-5 max-w-lg">
            <TextReveal
              as="p"
              className="font-inter text-xs leading-relaxed text-white/65 sm:text-sm"
              delay={0.35}
              text="Мы создаём легендарные бренды и продукты в мире криптовалюты, которые не просто привлекают внимание — они захватывают рынок."
            />
          </motion.div>

          <motion.div
            variants={snapScale}
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
              transition={{ duration: 0.2, ease: SNAP_HARD }}
            >
              <Award size={14} className="text-violet-300" />
              Нам доверяют топ-протоколы
            </motion.div>
          </motion.div>

          <motion.div
            variants={snapStagger}
            className="mt-10 grid grid-cols-1 gap-5 border-t border-white/10 pt-7 sm:grid-cols-3 sm:gap-6"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={textSnap}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.18, ease: SNAP_HARD }}
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
        </motion.div>
      </motion.div>
    </section>
  )
}
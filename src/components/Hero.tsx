import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { HEADLINES, STATS } from '../lib/data'
import { SNAP_HARD } from '../lib/motion'
import { CountUp } from './CountUp'
import { MagneticButton } from './MagneticButton'
import { TextReveal } from './TextReveal'
import { CharReveal } from './CharReveal'

const SCROLL_RANGE = 1600

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollY } = useScroll()

  // Персонаж смещается при скролле — parallax + панорама кадра
  const videoX = useTransform(scrollY, [0, 500, SCROLL_RANGE], [0, -90, -200])
  const videoY = useTransform(scrollY, [0, SCROLL_RANGE], [0, 160])
  const videoScale = useTransform(scrollY, [0, SCROLL_RANGE], [1.2, 1.55])
  const objectPosition = useTransform(
    scrollY,
    [0, 400, SCROLL_RANGE],
    ['62% 38%', '48% 42%', '28% 48%'],
  )

  const contentY = useTransform(scrollY, [0, 700], [0, -80])
  const contentOpacity = useTransform(scrollY, [0, 500, 900], [1, 0.7, 0])

  // Скролл = покадровое движение персонажа в видео
  useMotionValueEvent(scrollY, 'change', (y) => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return

    const progress = Math.min(Math.max(y / SCROLL_RANGE, 0), 1)
    const target = progress * video.duration
    if (Math.abs(video.currentTime - target) > 0.04) {
      video.currentTime = target
    }
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onReady = () => {
      video.pause()
      video.currentTime = 0
    }

    video.addEventListener('loadedmetadata', onReady)
    if (video.readyState >= 1) onReady()

    return () => video.removeEventListener('loadedmetadata', onReady)
  }, [])

  let charDelay = 0.15

  return (
    <section id="top" className="relative h-[200vh]">
      {/* Sticky видео-фон — персонаж двигается пока листаешь */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--void)]">
        <motion.div
          className="absolute inset-[-15%] z-0 will-change-transform"
          style={{ x: videoX, y: videoY, scale: videoScale }}
        >
          <motion.video
            ref={videoRef}
            className="h-full w-full object-cover"
            style={{ objectPosition }}
            src="/fonono.mp4"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </motion.div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-black/20 to-[var(--void)]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_65%_40%,rgba(124,58,237,0.1),transparent_55%)]" />

        <div className="pointer-events-none absolute inset-x-0 top-1/3 z-[2] h-px overflow-hidden opacity-40">
          <div className="signal-line h-full w-48 bg-gradient-to-r from-transparent via-violet-400/80 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 flex h-full flex-col justify-center px-6 pb-20 pt-28 sm:px-10 lg:px-16"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="pointer-events-auto mx-auto w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: SNAP_HARD }}
              className="mb-6 inline-flex items-center gap-3"
            >
              <span className="font-display text-xs text-violet-400/70">00</span>
              <span className="h-px w-6 bg-violet-500/50" />
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-inter text-[10px] uppercase tracking-[0.22em] text-white/50">
                Креативная Web3-студия
              </span>
            </motion.div>

            <h1 className="font-display uppercase leading-[0.92] text-white">
              {HEADLINES.map((line, lineIdx) => {
                const delay = charDelay
                charDelay += line.length * 0.038 + 0.1
                return (
                  <span
                    key={line}
                    className={`neon-glow block text-[clamp(2rem,6vw,4.5rem)] ${lineIdx === 1 ? 'text-white/90' : ''} ${lineIdx === 2 ? 'text-violet-200/90' : ''}`}
                  >
                    <CharReveal text={line} delay={delay} stagger={0.038} />
                  </span>
                )
              })}
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
                ↓ Листай — персонаж оживает
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
                  whileHover={{ y: -3 }}
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
        </motion.div>
      </div>
    </section>
  )
}
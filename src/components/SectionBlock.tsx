import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { SectionData } from '../lib/data'
import {
  snapFadeUp,
  snapSlideLeft,
  snapScale,
  snapClip,
  snapStagger,
  cardSnapIn,
  textSnap,
  eyebrowSnap,
} from '../lib/motion'
import { FeatureCard } from './FeatureCard'
import { MagneticButton } from './MagneticButton'
import { ArrowUpRight } from 'lucide-react'

const sectionVariants = {
  'fade-up': snapFadeUp,
  'slide-blur': snapSlideLeft,
  'scale-rotate': snapScale,
  'clip-wipe': snapClip,
}

export function SectionBlock({
  section,
  index,
  onWallet,
}: {
  section: SectionData
  index: number
  onWallet?: () => void
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isEven = index % 2 === 1
  const SectionVariant = sectionVariants[section.animation]

  return (
    <motion.section
      ref={ref}
      id={section.id}
      variants={SectionVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`scroll-section border-t border-white/8 px-6 py-20 sm:px-10 lg:px-16 ${isEven ? 'bg-[#0a0a0a]' : 'bg-[#050505]'}`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={snapStagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p
            variants={eyebrowSnap}
            className="mb-2 font-inter text-[10px] uppercase tracking-[0.22em] text-violet-400"
          >
            {section.eyebrow}
          </motion.p>
          <motion.h2
            variants={textSnap}
            className="font-podium text-[clamp(1.5rem,3.5vw,2.25rem)] uppercase neon-glow"
          >
            {section.title}
          </motion.h2>
          <motion.p
            variants={textSnap}
            className="mt-3 max-w-xl text-sm leading-relaxed text-white/60"
          >
            {section.lead}
          </motion.p>
        </motion.div>

        {section.cards.length > 0 && (
          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={snapStagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ perspective: 900 }}
          >
            {section.cards.map((card) => (
              <FeatureCard key={card.title} card={card} variants={cardSnapIn} />
            ))}
          </motion.div>
        )}

        {section.id === 'launch' && (
          <motion.div
            variants={textSnap}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="mt-8"
          >
            <MagneticButton
              onClick={onWallet}
              className="btn-arrow inline-flex items-center gap-2 bg-white px-6 py-3 font-inter text-xs font-semibold uppercase tracking-widest text-black shadow-neon hover:bg-white/90"
            >
              Начать проект
              <ArrowUpRight size={16} className="arrow-icon" />
            </MagneticButton>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
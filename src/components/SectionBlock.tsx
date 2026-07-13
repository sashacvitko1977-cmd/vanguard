import { motion } from 'framer-motion'
import type { SectionData } from '../lib/data'
import {
  snapFadeUp,
  snapSlideLeft,
  snapScale,
  snapClip,
  textStagger,
  cardGridStagger,
  cardSnapIn,
  textSnap,
  eyebrowSnap,
  sectionViewport,
  textViewport,
  cardsViewport,
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
  const isEven = index % 2 === 1
  const SectionVariant = sectionVariants[section.animation]

  return (
    <section
      id={section.id}
      className={`scroll-section border-t border-white/8 px-6 py-20 sm:px-10 lg:px-16 ${isEven ? 'bg-[#0a0a0a]' : 'bg-[#050505]'}`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Раздел — резкое появление при скролле */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={SectionVariant}
          className="origin-top"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={textViewport}
            variants={textStagger}
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
        </motion.div>

        {/* Карточки — отдельный триггер при скролле к блоку */}
        {section.cards.length > 0 && (
          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={cardsViewport}
            variants={cardGridStagger}
            style={{ perspective: 900 }}
          >
            {section.cards.map((card) => (
              <FeatureCard key={card.title} card={card} variants={cardSnapIn} />
            ))}
          </motion.div>
        )}

        {section.id === 'launch' && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={cardsViewport}
            variants={textSnap}
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
    </section>
  )
}
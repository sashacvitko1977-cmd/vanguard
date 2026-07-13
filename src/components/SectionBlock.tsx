import { motion } from 'framer-motion'
import type { SectionData } from '../lib/data'
import { sectionViewport, textViewport, cardsViewport } from '../lib/motion'
import { getSectionMotion } from '../lib/sectionMotion'
import { FeatureCard } from './FeatureCard'
import { MagneticButton } from './MagneticButton'
import { ArrowUpRight } from 'lucide-react'

const accentLineInitial = {
  'scale-y': { scaleY: 0 },
  'scale-x': { scaleX: 0 },
  skew: { scaleX: 0, skewX: -12 },
  glow: { scaleX: 0, opacity: 0 },
} as const

const accentLineAnimate = {
  'scale-y': { scaleY: 1 },
  'scale-x': { scaleX: 1 },
  skew: { scaleX: 1, skewX: 0 },
  glow: { scaleX: 1, opacity: 1 },
} as const

const accentLineOrigin = {
  'scale-y': 'origin-top',
  'scale-x': 'origin-left',
  skew: 'origin-left',
  glow: 'origin-center',
} as const

const accentGradients = {
  projects: 'from-violet-500 via-fuchsia-500/60 to-transparent',
  ecosystem: 'from-cyan-400 via-blue-500/50 to-transparent',
  services: 'from-amber-400 via-orange-500/50 to-transparent',
  launch: 'from-rose-400 via-violet-500/60 to-transparent',
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
  const motionProfile = getSectionMotion(section.id)
  const lineType = motionProfile.accentLine
  const gradient = accentGradients[section.id as keyof typeof accentGradients] ?? accentGradients.projects

  return (
    <section
      id={section.id}
      className={`scroll-section border-t border-white/8 px-6 py-20 sm:px-10 lg:px-16 ${isEven ? 'bg-[#0a0a0a]' : 'bg-[#050505]'}`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Раздел — уникальный резкий вход */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={motionProfile.section}
          className="origin-top"
        >
          <motion.div
            initial={accentLineInitial[lineType]}
            whileInView={accentLineAnimate[lineType]}
            viewport={sectionViewport}
            transition={{ duration: 0.16, ease: [1, 0, 0, 1] }}
            className={`mb-6 h-[2px] w-24 bg-gradient-to-r ${gradient} ${accentLineOrigin[lineType]} ${lineType === 'glow' ? 'shadow-[0_0_12px_rgba(167,139,250,0.5)]' : ''}`}
          />

          {/* Текст — каждый элемент со своей анимацией */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={textViewport}
            variants={motionProfile.textStagger}
          >
            <motion.p
              variants={motionProfile.eyebrow}
              className="mb-2 font-inter text-[10px] uppercase tracking-[0.22em] text-violet-400"
            >
              {section.eyebrow}
            </motion.p>
            <motion.h2
              variants={motionProfile.title}
              className="font-podium text-[clamp(1.5rem,3.5vw,2.25rem)] uppercase neon-glow"
            >
              {section.title}
            </motion.h2>
            <motion.p
              variants={motionProfile.lead}
              className="mt-3 max-w-xl text-sm leading-relaxed text-white/60"
            >
              {section.lead}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Блок карточек — свой ритм и варианты входа */}
        {section.cards.length > 0 && (
          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={cardsViewport}
            variants={motionProfile.cardStagger}
            style={{ perspective: 1000 }}
          >
            {section.cards.map((card, i) => (
              <FeatureCard key={card.title} card={card} variants={motionProfile.card(i)} />
            ))}
          </motion.div>
        )}

        {section.id === 'launch' && motionProfile.cta && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={cardsViewport}
            variants={motionProfile.cta}
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
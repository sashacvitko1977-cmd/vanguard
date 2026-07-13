import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  fadeUp,
  staggerContainer,
  slideFromLeft,
  scaleRotateIn,
  clipWipe,
  cardHover,
  EASE_OUT_EXPO,
} from '../lib/motion'
import { MagneticButton } from './MagneticButton'
import { ArrowUpRight } from 'lucide-react'

type Section = {
  id: string
  eyebrow: string
  title: string
  lead: string
  animation: 'fade-up' | 'slide-blur' | 'scale-rotate' | 'clip-wipe'
  cards: readonly { title: string; text: string }[]
}

const headerVariants = {
  'fade-up': fadeUp,
  'slide-blur': slideFromLeft,
  'scale-rotate': scaleRotateIn,
  'clip-wipe': clipWipe,
}

export function SectionBlock({
  section,
  index,
  onWallet,
}: {
  section: Section
  index: number
  onWallet?: () => void
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isEven = index % 2 === 1
  const HeaderVariant = headerVariants[section.animation]

  return (
    <section
      ref={ref}
      id={section.id}
      className={`scroll-section border-t border-white/8 px-6 py-20 sm:px-10 lg:px-16 ${isEven ? 'bg-[#0a0a0a]' : 'bg-[#050505]'}`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={HeaderVariant}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p
            className="mb-2 font-inter text-[10px] uppercase tracking-[0.22em] text-violet-400"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            {section.eyebrow}
          </motion.p>
          <h2 className="font-podium text-[clamp(1.5rem,3.5vw,2.25rem)] uppercase neon-glow">
            {section.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">{section.lead}</p>
        </motion.div>

        {section.cards.length > 0 && (
          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {section.cards.map((card, i) => (
              <motion.article
                key={card.title}
                variants={fadeUp}
                initial="rest"
                whileHover="hover"
                animate="rest"
                custom={i}
                className="card-glow group rounded-sm border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
                style={{ transition: 'border-color 0.4s' }}
              >
                <motion.div variants={cardHover}>
                  <motion.h3
                    className="mb-2 text-sm font-semibold text-white"
                    whileHover={{ x: 4 }}
                    transition={{ ease: EASE_OUT_EXPO }}
                  >
                    {card.title}
                  </motion.h3>
                  <p className="text-xs leading-relaxed text-white/55">{card.text}</p>
                  <motion.div
                    className="mt-4 h-px w-0 bg-gradient-to-r from-violet-500/60 to-transparent"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {section.id === 'launch' && inView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: EASE_OUT_EXPO }}
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
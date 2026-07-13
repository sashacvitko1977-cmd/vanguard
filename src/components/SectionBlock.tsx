import { motion } from 'framer-motion'
import type { SectionData } from '../lib/data'
import { sectionViewport } from '../lib/motion'
import { getSectionMotion } from '../lib/sectionMotion'
import { FeatureCard } from './FeatureCard'
import { LaunchBlock } from './LaunchBlock'

const SECTION_GLOW: Record<string, { color: string; position: string }> = {
  projects: { color: 'rgba(139,92,246,0.18)', position: 'top-0 right-0 h-[420px] w-[420px]' },
  ecosystem: { color: 'rgba(34,211,238,0.12)', position: 'top-20 left-0 h-[360px] w-[360px]' },
  services: { color: 'rgba(251,191,36,0.1)', position: 'bottom-0 right-1/4 h-[300px] w-[300px]' },
  launch: { color: 'rgba(244,63,94,0.12)', position: 'top-1/3 left-1/2 h-[400px] w-[400px]' },
}

const SECTION_NUM: Record<string, string> = {
  projects: '01',
  ecosystem: '02',
  services: '03',
  launch: '04',
}

export function SectionBlock({
  section,
  onWallet,
  onLeadSubmit,
}: {
  section: SectionData
  index: number
  onWallet?: () => void
  onLeadSubmit?: (data: { name: string; contact: string }) => void
}) {
  const motionProfile = getSectionMotion(section.id)
  const isProjects = section.id === 'projects'
  const glow = SECTION_GLOW[section.id]
  const sectionNum = SECTION_NUM[section.id] ?? '00'

  const gridClass = isProjects
    ? 'mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-fr'
    : 'mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section
      id={section.id}
      className="scroll-section relative overflow-hidden border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16"
    >
      {glow && (
        <div
          className={`section-glow absolute ${glow.position}`}
          style={{ background: glow.color }}
          aria-hidden="true"
        />
      )}

      {/* Весь раздел влетает с края при скролле */}
      <motion.div
        className="relative mx-auto max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={motionProfile.section}
        style={{ perspective: 1200 }}
      >
        <div className="relative mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div variants={motionProfile.textStagger} className="relative max-w-2xl">
            <span
              className="pointer-events-none absolute -left-2 -top-8 font-display text-[5rem] leading-none text-white/[0.03] sm:text-[7rem] lg:-left-6 lg:-top-12"
              aria-hidden="true"
            >
              {sectionNum}
            </span>

            <motion.div variants={motionProfile.eyebrow} className="mb-3 flex items-center gap-3">
              <span className="font-display text-sm text-violet-400/80">{sectionNum}</span>
              <span className="h-px w-8 bg-violet-500/40" />
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-inter text-[10px] uppercase tracking-[0.18em] text-white/50">
                {section.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              variants={motionProfile.title}
              className="text-balance font-display text-[clamp(1.75rem,4vw,2.75rem)] uppercase leading-[0.95] text-white"
            >
              {section.title}
            </motion.h2>
            <motion.p
              variants={motionProfile.lead}
              className="mt-4 max-w-lg text-sm leading-relaxed text-white/55"
            >
              {section.lead}
            </motion.p>
          </motion.div>

          <motion.div
            variants={motionProfile.eyebrow}
            className="hidden h-px w-32 origin-left bg-gradient-to-r from-violet-500/60 to-transparent lg:block"
          />
        </div>

        {section.cards.length > 0 && (
          <motion.div
            className={gridClass}
            variants={motionProfile.cardStagger}
          >
            {section.cards.map((card, i) => (
              <FeatureCard
                key={card.title}
                card={card}
                index={isProjects ? i : undefined}
                variants={motionProfile.card(i)}
                tilt={isProjects}
                className={card.layoutClass ?? ''}
              />
            ))}
          </motion.div>
        )}

        {section.id === 'launch' && motionProfile.cta && (
          <motion.div variants={motionProfile.cta}>
            <LaunchBlock onWallet={onWallet} onSubmit={onLeadSubmit} />
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
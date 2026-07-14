import { useRef } from 'react'
import { useReducedEffects } from '../hooks/useReducedEffects'
import { motion, useInView } from 'framer-motion'
import type { SectionData } from '../lib/data'
import { sectionViewport } from '../lib/motion'
import { getSectionEntrance } from '../lib/sectionMotion'
import { FeatureCard } from './FeatureCard'
import { LaunchBlock } from './LaunchBlock'

const SECTION_SURFACE: Record<string, string> = {
  projects: 'from-violet-950/15 via-black/10 to-transparent',
  ecosystem: 'from-cyan-950/12 via-black/8 to-transparent',
  services: 'from-amber-950/10 via-black/8 to-transparent',
  launch: 'from-rose-950/12 via-black/8 to-transparent',
}

const SECTION_NUM: Record<string, string> = {
  projects: '01',
  ecosystem: '02',
  services: '03',
  launch: '04',
}

const IMPACT_LINE: Record<string, string> = {
  projects: 'bg-violet-400',
  ecosystem: 'bg-cyan-400',
  services: 'bg-amber-400',
  launch: 'bg-rose-400',
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
  const reducedEffects = useReducedEffects()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, sectionViewport)
  const entrance = getSectionEntrance(section.id, reducedEffects)
  const isProjects = section.id === 'projects'
  const surface = SECTION_SURFACE[section.id] ?? SECTION_SURFACE.projects
  const sectionNum = SECTION_NUM[section.id] ?? '00'
  const impactLine = IMPACT_LINE[section.id] ?? 'bg-violet-400'

  const gridClass = isProjects
    ? 'mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-fr'
    : 'mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div ref={ref} className="overflow-x-clip">
      <motion.section
        id={section.id}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={entrance}
        className="scroll-section relative w-full border-t border-white/[0.06]"
        style={{
          transformOrigin: section.id === 'services' ? 'bottom center' : 'center center',
          backfaceVisibility: 'hidden',
        }}
      >
        <motion.div
          className={`absolute left-0 right-0 top-0 z-20 h-px ${impactLine} origin-left`}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 0.45 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.12, 1, 0.28, 1], delay: 0.35 }}
        />

        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${surface}`}
          aria-hidden="true"
        />

        <div className="relative px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="relative mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="relative max-w-2xl">
                <span
                  className="pointer-events-none absolute -left-2 -top-8 font-display text-[5rem] leading-none text-white/[0.04] sm:text-[7rem] lg:-left-6 lg:-top-12"
                  aria-hidden="true"
                >
                  {sectionNum}
                </span>

                <div className="mb-3 flex items-center gap-3">
                  <span className="font-display text-sm text-violet-400/80">{sectionNum}</span>
                  <span className="h-px w-8 bg-violet-500/40" />
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-inter text-[10px] uppercase tracking-[0.18em] text-white/50">
                    {section.eyebrow}
                  </span>
                </div>

                <h2 className="text-balance font-display text-[clamp(1.75rem,4vw,2.75rem)] uppercase leading-[0.95] text-white">
                  {section.title}
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/55">
                  {section.lead}
                </p>
              </div>

              <div className="hidden h-px w-32 bg-gradient-to-r from-violet-500/60 to-transparent lg:block" />
            </div>

            {section.cards.length > 0 && (
              <div className={gridClass}>
                {section.cards.map((card, i) => (
                  <FeatureCard
                    key={card.title}
                    card={card}
                    index={isProjects ? i : undefined}
                    tilt={isProjects}
                    className={card.layoutClass ?? ''}
                  />
                ))}
              </div>
            )}

            {section.id === 'launch' && (
              <LaunchBlock onWallet={onWallet} onSubmit={onLeadSubmit} />
            )}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
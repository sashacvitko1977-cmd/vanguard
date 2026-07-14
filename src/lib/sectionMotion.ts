import type { Variants } from 'framer-motion'

const EASE_SOFT = [0.12, 1, 0.28, 1] as const

const SMOOTH = { duration: 1.25, ease: EASE_SOFT }
const SMOOTH_UP = { duration: 1.35, ease: EASE_SOFT }
const SMOOTH_FADE = { duration: 1.4, ease: EASE_SOFT }

const sectionSmoothLeft: Variants = {
  hidden: { opacity: 0, x: -28, y: 16 },
  visible: { opacity: 1, x: 0, y: 0, transition: SMOOTH },
}

const sectionSmoothRight: Variants = {
  hidden: { opacity: 0, x: 28, y: 16 },
  visible: { opacity: 1, x: 0, y: 0, transition: SMOOTH },
}

const sectionSmoothBottom: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: SMOOTH_UP },
}

const sectionSmoothFade: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SMOOTH_FADE },
}

/** Плавное появление секций при скролле */
const SECTION_ENTRANCE: Record<string, Variants> = {
  projects: sectionSmoothLeft,
  ecosystem: sectionSmoothRight,
  services: sectionSmoothBottom,
  launch: sectionSmoothFade,
}

const sectionMobile: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_SOFT } },
}

export function getSectionEntrance(sectionId: string, reduced = false): Variants {
  if (reduced) return sectionMobile
  return SECTION_ENTRANCE[sectionId] ?? sectionSmoothLeft
}
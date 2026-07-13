import type { Variants } from 'framer-motion'

const SMOOTH = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
const SMOOTH_UP = { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const }
const SMOOTH_FADE = { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }

const sectionSmoothLeft: Variants = {
  hidden: { opacity: 0, x: -48, y: 28 },
  visible: { opacity: 1, x: 0, y: 0, transition: SMOOTH },
}

const sectionSmoothRight: Variants = {
  hidden: { opacity: 0, x: 48, y: 28 },
  visible: { opacity: 1, x: 0, y: 0, transition: SMOOTH },
}

const sectionSmoothBottom: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: { opacity: 1, y: 0, transition: SMOOTH_UP },
}

const sectionSmoothFade: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SMOOTH_FADE },
}

/** Плавное появление секций при скролле */
const SECTION_ENTRANCE: Record<string, Variants> = {
  projects: sectionSmoothLeft,
  ecosystem: sectionSmoothRight,
  services: sectionSmoothBottom,
  launch: sectionSmoothFade,
}

export function getSectionEntrance(sectionId: string): Variants {
  return SECTION_ENTRANCE[sectionId] ?? sectionSmoothLeft
}
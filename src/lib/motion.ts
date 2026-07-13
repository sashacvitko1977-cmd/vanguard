import type { Variants } from 'framer-motion'

/** Premium easing — cinematic 2026 feel */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT_SOFT = [0.45, 0, 0.15, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -60, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
}

export const scaleRotateIn: Variants = {
  hidden: { opacity: 0, scale: 0.88, rotate: -2 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
}

export const clipWipe: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.1, ease: EASE_IN_OUT_SOFT },
  },
}

export const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: '0 0 0 rgba(139,92,246,0)' },
  hover: {
    scale: 1.03,
    y: -6,
    boxShadow: '0 20px 40px rgba(139,92,246,0.15), 0 0 30px rgba(255,255,255,0.06)',
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
}
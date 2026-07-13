import type { Variants } from 'framer-motion'

/** Резкие snap-анимации — быстрый вход, минимум blur */
export const SNAP = [0.22, 1, 0.36, 1] as const
export const SNAP_HARD = [0.9, 0, 0.1, 1] as const

export const springSnap = { type: 'spring' as const, stiffness: 420, damping: 28, mass: 0.7 }

export const snapFadeUp: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: SNAP_HARD },
  },
}

export const snapSlideLeft: Variants = {
  hidden: { opacity: 0, x: -72, skewX: -4 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { duration: 0.35, ease: SNAP_HARD },
  },
}

export const snapScale: Variants = {
  hidden: { opacity: 0, scale: 0.82, rotate: -3 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: springSnap,
  },
}

export const snapClip: Variants = {
  hidden: { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', x: -24 },
  visible: {
    opacity: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    x: 0,
    transition: { duration: 0.42, ease: SNAP_HARD },
  },
}

/** Stagger для карточек — быстрый каскад */
export const snapStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

/** Резкий вход карточки */
export const cardSnapIn: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.9, rotateX: 12 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: springSnap,
  },
}

/** Текст — резкий pop */
export const textSnap: Variants = {
  hidden: { opacity: 0, y: 28, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.32, ease: SNAP_HARD },
  },
}

export const eyebrowSnap: Variants = {
  hidden: { opacity: 0, x: -32, letterSpacing: '0.4em' },
  visible: {
    opacity: 1,
    x: 0,
    letterSpacing: '0.22em',
    transition: { duration: 0.3, ease: SNAP },
  },
}

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.04,
    y: -8,
    transition: { duration: 0.22, ease: SNAP },
  },
}

// Legacy aliases
export const fadeUp = snapFadeUp
export const staggerContainer = snapStagger
export const slideFromLeft = snapSlideLeft
export const scaleRotateIn = snapScale
export const clipWipe = snapClip
export const EASE_OUT_EXPO = SNAP
export const EASE_IN_OUT_SOFT = SNAP_HARD
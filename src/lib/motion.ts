import type { Variants } from 'framer-motion'

/** Резкие snap-анимации — быстрый вход, минимум blur */
export const SNAP = [0.22, 1, 0.36, 1] as const
export const SNAP_HARD = [0.9, 0, 0.1, 1] as const

export const springSnap = { type: 'spring' as const, stiffness: 520, damping: 32, mass: 0.6 }
export const springSnapHard = { type: 'spring' as const, stiffness: 680, damping: 34, mass: 0.5 }

/** Viewport-триггеры для scroll-reveal */
export const sectionViewport = { once: true, margin: '-8% 0px -5% 0px', amount: 0.12 as const }
export const textViewport = { once: true, margin: '-10% 0px -8% 0px', amount: 0.35 as const }
export const cardsViewport = { once: true, margin: '-6% 0px -10% 0px', amount: 0.18 as const }

export const snapFadeUp: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.26, ease: SNAP_HARD },
  },
}

export const snapSlideLeft: Variants = {
  hidden: { opacity: 0, x: -80, skewX: -6 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { duration: 0.24, ease: SNAP_HARD },
  },
}

export const snapScale: Variants = {
  hidden: { opacity: 0, scale: 0.78, rotate: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: springSnapHard,
  },
}

export const snapClip: Variants = {
  hidden: { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', x: -32 },
  visible: {
    opacity: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    x: 0,
    transition: { duration: 0.3, ease: SNAP_HARD },
  },
}

/** Stagger текста в секции */
export const textStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
}

/** Stagger карточек — резкий каскад при скролле */
export const cardGridStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.04 },
  },
}

export const snapStagger = textStagger

/** Резкий вход карточки при скролле */
export const cardSnapIn: Variants = {
  hidden: { opacity: 0, y: 64, scale: 0.86, rotateX: 14 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: springSnap,
  },
}

/** Текст — резкий pop при скролле */
export const textSnap: Variants = {
  hidden: { opacity: 0, y: 36, skewY: 4 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.24, ease: SNAP_HARD },
  },
}

export const eyebrowSnap: Variants = {
  hidden: { opacity: 0, x: -40, letterSpacing: '0.45em' },
  visible: {
    opacity: 1,
    x: 0,
    letterSpacing: '0.22em',
    transition: { duration: 0.22, ease: SNAP_HARD },
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
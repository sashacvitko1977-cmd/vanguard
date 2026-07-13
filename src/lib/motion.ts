import type { Variants } from 'framer-motion'

/** Резкие snap-кривые */
export const SNAP = [0.22, 1, 0.36, 1] as const
export const SNAP_HARD = [0.9, 0, 0.1, 1] as const
export const SNAP_BRUTAL = [1, 0, 0, 1] as const

export const springSnap = { type: 'spring' as const, stiffness: 620, damping: 30, mass: 0.55 }
export const springSnapHard = { type: 'spring' as const, stiffness: 820, damping: 32, mass: 0.42 }
export const springBrutal = { type: 'spring' as const, stiffness: 960, damping: 28, mass: 0.38 }

const brutal = { duration: 0.18, ease: SNAP_BRUTAL }
const hard = { duration: 0.2, ease: SNAP_HARD }

/** Viewport-триггеры для scroll-reveal */
export const sectionViewport = { once: true, margin: '-8% 0px -5% 0px', amount: 0.12 as const }
export const textViewport = { once: true, margin: '-10% 0px -8% 0px', amount: 0.32 as const }
export const cardsViewport = { once: true, margin: '-6% 0px -10% 0px', amount: 0.16 as const }

// ——— Уникальные входы разделов ———

export const sectionSlamDown: Variants = {
  hidden: { opacity: 0, y: 96, scaleY: 0.55, originY: 0 },
  visible: { opacity: 1, y: 0, scaleY: 1, transition: { ...brutal, duration: 0.22 } },
}

export const sectionSlashLeft: Variants = {
  hidden: { opacity: 0, x: -140, skewX: -10, scale: 0.94 },
  visible: { opacity: 1, x: 0, skewX: 0, scale: 1, transition: brutal },
}

export const sectionPunchIn: Variants = {
  hidden: { opacity: 0, scale: 1.22, rotate: -3, filter: 'brightness(1.4)' },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: 'brightness(1)',
    transition: springBrutal,
  },
}

export const sectionIgnite: Variants = {
  hidden: {
    opacity: 0,
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    y: 40,
  },
  visible: {
    opacity: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    y: 0,
    transition: { duration: 0.24, ease: SNAP_BRUTAL },
  },
}

// ——— Уникальные входы текста ———

export const eyebrowSlash: Variants = {
  hidden: { opacity: 0, x: -56, scaleX: 0.4, originX: 0, letterSpacing: '0.5em' },
  visible: { opacity: 1, x: 0, scaleX: 1, letterSpacing: '0.22em', transition: brutal },
}

export const eyebrowDrop: Variants = {
  hidden: { opacity: 0, y: -28, letterSpacing: '0.38em' },
  visible: { opacity: 1, y: 0, letterSpacing: '0.22em', transition: hard },
}

export const eyebrowFlash: Variants = {
  hidden: { opacity: 0, scale: 1.6, filter: 'brightness(2)' },
  visible: { opacity: 1, scale: 1, filter: 'brightness(1)', transition: springBrutal },
}

export const eyebrowTrack: Variants = {
  hidden: { opacity: 0, x: 48, skewX: 12 },
  visible: { opacity: 1, x: 0, skewX: 0, transition: brutal },
}

export const titleClipUp: Variants = {
  hidden: { opacity: 0, y: 48, scale: 1.12, clipPath: 'inset(100% 0 0 0)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.2, ease: SNAP_BRUTAL },
  },
}

export const titleSkewRight: Variants = {
  hidden: { opacity: 0, x: 72, skewY: -6, scale: 0.92 },
  visible: { opacity: 1, x: 0, skewY: 0, scale: 1, transition: brutal },
}

export const titlePunch: Variants = {
  hidden: { opacity: 0, scale: 0.62, rotate: -2 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: springBrutal },
}

export const titleSlam: Variants = {
  hidden: { opacity: 0, y: 64, scaleY: 0.5, originY: 1 },
  visible: { opacity: 1, y: 0, scaleY: 1, transition: { ...brutal, duration: 0.19 } },
}

export const leadRise: Variants = {
  hidden: { opacity: 0, y: 40, skewX: 3 },
  visible: { opacity: 1, y: 0, skewX: 0, transition: hard },
}

export const leadWipe: Variants = {
  hidden: { opacity: 0, x: -36, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
  visible: {
    opacity: 1,
    x: 0,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: brutal,
  },
}

export const leadSnapLeft: Variants = {
  hidden: { opacity: 0, x: -48, skewY: 4 },
  visible: { opacity: 1, x: 0, skewY: 0, transition: brutal },
}

export const leadFadeStrike: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springSnapHard },
}

// ——— Stagger-профили ———

export const staggerTight: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0 } },
}

export const staggerPunch: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
}

export const staggerWave: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.038, delayChildren: 0.06 } },
}

export const staggerIgnite: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
}

// ——— Уникальные входы карточек ———

export const cardFlipSlam: Variants = {
  hidden: { opacity: 0, y: 72, rotateX: 22, scale: 0.84 },
  visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: springSnap },
}

export const cardFromLeft: Variants = {
  hidden: { opacity: 0, x: -88, skewX: -5, scale: 0.9 },
  visible: { opacity: 1, x: 0, skewX: 0, scale: 1, transition: brutal },
}

export const cardFromRight: Variants = {
  hidden: { opacity: 0, x: 88, skewX: 5, scale: 0.9 },
  visible: { opacity: 1, x: 0, skewX: 0, scale: 1, transition: brutal },
}

export const cardZoomPunch: Variants = {
  hidden: { opacity: 0, scale: 0.55, rotate: -4 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: springBrutal },
}

export const cardSlamUp: Variants = {
  hidden: { opacity: 0, y: 80, scaleY: 0.6, originY: 1 },
  visible: { opacity: 1, y: 0, scaleY: 1, transition: { ...brutal, duration: 0.17 } },
}

export const cardTiltIn: Variants = {
  hidden: { opacity: 0, y: 56, rotateZ: -6, scale: 0.88 },
  visible: { opacity: 1, y: 0, rotateZ: 0, scale: 1, transition: springSnapHard },
}

export const ctaPunch: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springBrutal },
}

// Legacy aliases
export const snapFadeUp = sectionSlamDown
export const snapSlideLeft = sectionSlashLeft
export const snapScale = sectionPunchIn
export const snapClip = sectionIgnite
export const snapStagger = staggerTight
export const textStagger = staggerTight
export const cardGridStagger = staggerWave
export const cardSnapIn = cardFlipSlam
export const textSnap = titleClipUp
export const eyebrowSnap = eyebrowSlash
export const fadeUp = sectionSlamDown
export const staggerContainer = staggerTight
export const slideFromLeft = sectionSlashLeft
export const scaleRotateIn = sectionPunchIn
export const clipWipe = sectionIgnite
export const EASE_OUT_EXPO = SNAP
export const EASE_IN_OUT_SOFT = SNAP_HARD

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.04,
    y: -8,
    transition: { duration: 0.18, ease: SNAP_HARD },
  },
}
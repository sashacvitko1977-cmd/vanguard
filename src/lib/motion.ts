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

/** Триггер: раздел влетает целиком */
export const sectionViewport = { once: true, margin: '0px 0px -5% 0px', amount: 0.08 as const }
export const textViewport = { once: true, margin: '0px 0px -6% 0px', amount: 0.25 as const }
export const cardsViewport = { once: true, margin: '0px 0px -10% 0px', amount: 0.12 as const }

/** Резкий влет всего раздела — без stagger, один удар */
const slam = { duration: 0.36, ease: SNAP_BRUTAL }
const slamHard = { duration: 0.32, ease: SNAP_HARD }

export const sectionFromLeft: Variants = {
  hidden: { x: '-100vw' },
  visible: { x: 0, transition: slam },
}

export const sectionFromRight: Variants = {
  hidden: { x: '100vw' },
  visible: { x: 0, transition: slam },
}

export const sectionFromBottom: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { duration: 0.38, ease: SNAP_BRUTAL } },
}

export const sectionFromVoid: Variants = {
  hidden: { scale: 0.82, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: slamHard },
}

export const sectionSlamDown = sectionFromBottom
export const sectionSlashLeft = sectionFromLeft
export const sectionPunchIn = sectionFromBottom
export const sectionIgnite = sectionFromVoid

// ——— Текст (footer и пр.) ———

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

export const cardFromLeft: Variants = {
  hidden: { opacity: 0, x: -160, skewX: -6, scale: 0.88 },
  visible: { opacity: 1, x: 0, skewX: 0, scale: 1, transition: { ...brutal, duration: 0.45 } },
}

export const cardFromRight: Variants = {
  hidden: { opacity: 0, x: 160, skewX: 6, scale: 0.88 },
  visible: { opacity: 1, x: 0, skewX: 0, scale: 1, transition: { ...brutal, duration: 0.45 } },
}

export const cardZoomPunch: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -6, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)', transition: springBrutal },
}

export const cardSlamUp: Variants = {
  hidden: { opacity: 0, y: 120, scaleY: 0.7, originY: 1 },
  visible: { opacity: 1, y: 0, scaleY: 1, transition: { ...brutal, duration: 0.42 } },
}

export const cardFlipSlam: Variants = {
  hidden: { opacity: 0, y: 72, rotateX: 22, scale: 0.84 },
  visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: springSnap },
}

export const cardTiltIn: Variants = {
  hidden: { opacity: 0, y: 56, rotateZ: -6, scale: 0.88 },
  visible: { opacity: 1, y: 0, rotateZ: 0, scale: 1, transition: springSnapHard },
}

export const ctaPunch: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springBrutal },
}

export const snapFadeUp = sectionFromBottom
export const snapSlideLeft = sectionFromLeft
export const snapScale = sectionFromVoid
export const snapClip = sectionFromVoid
export const snapStagger = staggerTight
export const textStagger = staggerTight
export const cardGridStagger = staggerWave
export const cardSnapIn = cardFlipSlam
export const textSnap = titleClipUp
export const eyebrowSnap = eyebrowSlash
export const fadeUp = sectionFromBottom
export const staggerContainer = staggerTight
export const slideFromLeft = sectionFromLeft
export const scaleRotateIn = sectionFromVoid
export const clipWipe = sectionFromVoid
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
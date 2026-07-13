import type { Variants } from 'framer-motion'
import {
  sectionFromLeft,
  sectionFromRight,
  sectionFromBottom,
  sectionFromVoid,
  eyebrowSlash,
  eyebrowDrop,
  eyebrowFlash,
  eyebrowTrack,
  titleClipUp,
  titleSkewRight,
  titlePunch,
  titleSlam,
  leadRise,
  leadWipe,
  leadSnapLeft,
  leadFadeStrike,
  staggerTight,
  staggerPunch,
  staggerWave,
  staggerIgnite,
  cardFromLeft,
  cardFromRight,
  cardSlamUp,
  cardZoomPunch,
  cardFlipSlam,
  cardTiltIn,
  ctaPunch,
} from './motion'

export type SectionMotionProfile = {
  section: Variants
  textStagger: Variants
  eyebrow: Variants
  title: Variants
  lead: Variants
  cardStagger: Variants
  card: (index: number) => Variants
  accentLine: 'scale-x' | 'scale-y' | 'skew' | 'glow'
  cta?: Variants
}

const SECTION_PROFILES: Record<string, SectionMotionProfile> = {
  projects: {
    section: sectionFromLeft,
    textStagger: staggerTight,
    eyebrow: eyebrowSlash,
    title: titleClipUp,
    lead: leadRise,
    cardStagger: staggerWave,
    card: () => cardFromLeft,
    accentLine: 'scale-x',
  },
  ecosystem: {
    section: sectionFromRight,
    textStagger: staggerPunch,
    eyebrow: eyebrowTrack,
    title: titleSkewRight,
    lead: leadSnapLeft,
    cardStagger: staggerPunch,
    card: () => cardFromRight,
    accentLine: 'skew',
  },
  services: {
    section: sectionFromBottom,
    textStagger: staggerTight,
    eyebrow: eyebrowFlash,
    title: titlePunch,
    lead: leadWipe,
    cardStagger: staggerTight,
    card: () => cardSlamUp,
    accentLine: 'scale-y',
  },
  launch: {
    section: sectionFromVoid,
    textStagger: staggerIgnite,
    eyebrow: eyebrowDrop,
    title: titleSlam,
    lead: leadFadeStrike,
    cardStagger: staggerIgnite,
    card: (i) => (i % 2 === 0 ? cardZoomPunch : cardFlipSlam),
    accentLine: 'glow',
    cta: ctaPunch,
  },
}

const fallback = SECTION_PROFILES.projects

export function getSectionMotion(sectionId: string): SectionMotionProfile {
  return SECTION_PROFILES[sectionId] ?? fallback
}
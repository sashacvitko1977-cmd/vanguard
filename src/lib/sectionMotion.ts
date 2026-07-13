import type { Variants } from 'framer-motion'
import {
  sectionSlamDown,
  sectionSlashLeft,
  sectionPunchIn,
  sectionIgnite,
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
  cardFlipSlam,
  cardFromLeft,
  cardFromRight,
  cardZoomPunch,
  cardSlamUp,
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
    section: sectionSlamDown,
    textStagger: staggerTight,
    eyebrow: eyebrowSlash,
    title: titleClipUp,
    lead: leadRise,
    cardStagger: staggerWave,
    card: (i) => (i % 3 === 1 ? cardTiltIn : i % 2 === 0 ? cardFlipSlam : cardSlamUp),
    accentLine: 'scale-y',
  },
  ecosystem: {
    section: sectionSlashLeft,
    textStagger: staggerPunch,
    eyebrow: eyebrowTrack,
    title: titleSkewRight,
    lead: leadSnapLeft,
    cardStagger: staggerPunch,
    card: (i) => (i % 2 === 0 ? cardFromLeft : cardFromRight),
    accentLine: 'skew',
  },
  services: {
    section: sectionPunchIn,
    textStagger: staggerTight,
    eyebrow: eyebrowFlash,
    title: titlePunch,
    lead: leadWipe,
    cardStagger: staggerTight,
    card: (i) => {
      const pool = [cardZoomPunch, cardTiltIn, cardFlipSlam]
      return pool[i % pool.length]
    },
    accentLine: 'glow',
  },
  launch: {
    section: sectionIgnite,
    textStagger: staggerIgnite,
    eyebrow: eyebrowDrop,
    title: titleSlam,
    lead: leadFadeStrike,
    cardStagger: staggerIgnite,
    card: () => cardSlamUp,
    accentLine: 'scale-x',
    cta: ctaPunch,
  },
}

const fallback = SECTION_PROFILES.projects

export function getSectionMotion(sectionId: string): SectionMotionProfile {
  return SECTION_PROFILES[sectionId] ?? fallback
}
import type { Variants } from 'framer-motion'
import {
  sectionFromLeft,
  sectionFromRight,
  sectionFromBottom,
  sectionFromVoid,
} from './motion'

/** Только резкий влет всего раздела целиком */
const SECTION_ENTRANCE: Record<string, Variants> = {
  projects: sectionFromLeft,
  ecosystem: sectionFromRight,
  services: sectionFromBottom,
  launch: sectionFromVoid,
}

export function getSectionEntrance(sectionId: string): Variants {
  return SECTION_ENTRANCE[sectionId] ?? sectionFromLeft
}
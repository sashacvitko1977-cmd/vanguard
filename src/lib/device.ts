/** Skip canvas effects only when user prefers reduced motion or save-data */
export function shouldSkipAmbientEffects() {
  if (typeof window === 'undefined') return false

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection

  return reducedMotion || conn?.saveData === true
}

export function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: none), (pointer: coarse)').matches
}
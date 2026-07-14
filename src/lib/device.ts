/** Non-hook check for canvas / video effects */
export function shouldReduceEffects() {
  if (typeof window === 'undefined') return true

  const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection

  return coarse || reducedMotion || conn?.saveData === true
}
import { useEffect, useState } from 'react'

function detectReducedMotion() {
  if (typeof window === 'undefined') return false

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  const saveData = conn?.saveData === true

  return reducedMotion || saveData
}

/** Only heavy scroll/animation effects — video & rain stay enabled on mobile */
export function useReducedEffects() {
  const [reduced, setReduced] = useState(detectReducedMotion)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => setReduced(detectReducedMotion())

    reducedMotion.addEventListener('change', update)
    return () => reducedMotion.removeEventListener('change', update)
  }, [])

  return reduced
}
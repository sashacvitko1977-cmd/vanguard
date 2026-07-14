import { useEffect, useState } from 'react'

function detectReducedEffects() {
  if (typeof window === 'undefined') return true

  const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
  const narrow = window.matchMedia('(max-width: 768px)').matches
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  const saveData = conn?.saveData === true

  return coarse || narrow || reducedMotion || saveData
}

/** Touch / low-power devices — skip heavy canvas, video, parallax */
export function useReducedEffects() {
  const [reduced, setReduced] = useState(detectReducedEffects)

  useEffect(() => {
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => setReduced(detectReducedEffects())

    coarse.addEventListener('change', update)
    reducedMotion.addEventListener('change', update)
    return () => {
      coarse.removeEventListener('change', update)
      reducedMotion.removeEventListener('change', update)
    }
  }, [])

  return reduced
}
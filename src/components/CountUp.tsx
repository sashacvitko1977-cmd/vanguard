import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type Props = {
  value: number
  suffix?: string
  className?: string
}

/** Анимированный счётчик цифр — только Inter, без display-шрифта */
export function CountUp({ value, suffix = '', className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <motion.span
      ref={ref}
      className={`font-inter tabular-nums tracking-tight ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {count}
      <span className="font-inter">{suffix}</span>
    </motion.span>
  )
}
import { motion, useScroll, useSpring } from 'framer-motion'

/** Тонкая линия прогресса скролла сверху */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="progress-bar fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-violet-500 via-white to-cyan-400"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
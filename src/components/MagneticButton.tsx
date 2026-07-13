import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

/** Magnetic hover-эффект для кнопок */
export function MagneticButton({ children, className = '', onClick, href }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        {inner}
      </a>
    )
  }

  return inner
}
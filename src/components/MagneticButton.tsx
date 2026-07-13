import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  strength?: number
}

/** Магнитная кнопка — притягивается к курсору на 4–8px */
export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  strength = 0.28,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const max = 8
    const tx = Math.max(-max, Math.min(max, x * strength))
    const ty = Math.max(-max, Math.min(max, y * strength))
    el.style.transform = `translate(${tx}px, ${ty}px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  const inner = (
    <motion.div
      ref={ref}
      data-cursor-hover
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
      <a href={href} className="inline-block" data-cursor-hover>
        {inner}
      </a>
    )
  }

  return inner
}
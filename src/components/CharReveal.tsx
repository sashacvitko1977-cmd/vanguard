import { motion } from 'framer-motion'
import { SNAP_HARD } from '../lib/motion'

type Props = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'span' | 'p'
}

/** Посимвольная сборка заголовка при загрузке */
export function CharReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
  as: Tag = 'span',
}: Props) {
  const chars = [...text]

  return (
    <Tag className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)', scale: 0.92 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          transition={{
            duration: 0.32,
            delay: delay + i * stagger,
            ease: SNAP_HARD,
          }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  )
}
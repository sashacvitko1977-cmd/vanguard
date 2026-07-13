import { motion } from 'framer-motion'
import { SNAP_HARD } from '../lib/motion'

type Props = {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'p' | 'span'
}

/** Резкое появление текста по словам */
export function TextReveal({ text, className = '', delay = 0, as: Tag = 'span' }: Props) {
  const words = text.split(' ')

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0, skewY: 4 }}
            animate={{ y: 0, opacity: 1, skewY: 0 }}
            transition={{
              duration: 0.28,
              delay: delay + i * 0.04,
              ease: SNAP_HARD,
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
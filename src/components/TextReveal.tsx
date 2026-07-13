import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../lib/motion'

type Props = {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'p' | 'span'
}

/** Появление текста по словам */
export function TextReveal({ text, className = '', delay = 0, as: Tag = 'span' }: Props) {
  const words = text.split(' ')

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.06,
              ease: EASE_OUT_EXPO,
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 600))

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 24px rgba(167,139,250,0.4)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.35 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md"
          aria-label="Наверх"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
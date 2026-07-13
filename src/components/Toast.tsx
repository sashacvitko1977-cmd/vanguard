import { motion, AnimatePresence } from 'framer-motion'

type Props = { message: string; visible: boolean }

export function Toast({ message, visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-6 right-6 z-[70] border border-violet-400/50 bg-[#111] px-5 py-3 text-sm text-white"
          role="status"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
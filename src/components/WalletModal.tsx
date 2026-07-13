import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  open: boolean
  onClose: () => void
  onConnect: () => void
}

export function WalletModal({ open, onClose, onConnect }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-6 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md border border-white/12 bg-[#111] p-7"
          >
            <div className="mb-4 flex items-start justify-between">
              <h2 className="font-podium text-lg uppercase">Подключить кошелёк</h2>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-sm"
                aria-label="Закрыть"
              >
                ✕
              </motion.button>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-white/65">
              Подключите MetaMask, WalletConnect или Phantom для доступа к эксклюзивным материалам и раннему доступу к
              проектам VANGUARD.
            </p>
            <motion.button
              type="button"
              onClick={onConnect}
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white py-3.5 font-inter text-xs font-semibold uppercase tracking-widest text-black"
            >
              Подключить MetaMask
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
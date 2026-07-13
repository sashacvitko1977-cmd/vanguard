import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { NAV_LINKS } from '../lib/data'
import { EASE_OUT_EXPO } from '../lib/motion'

type Props = {
  open: boolean
  onClose: () => void
  onWallet: () => void
}

export function MobileMenu({ open, onClose, onWallet }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md md:hidden"
          aria-hidden={!open}
        >
          <div className="flex h-full flex-col px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="font-podium text-2xl font-bold uppercase tracking-wider text-white">VANGUARD</span>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                className="flex h-10 w-10 items-center justify-center text-white"
                aria-label="Закрыть меню"
              >
                <X size={26} />
              </motion.button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-5" aria-label="Мобильная навигация">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={onClose}
                  initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.1 + i * 0.08, ease: EASE_OUT_EXPO }}
                  whileHover={{ x: 8, color: '#c4b5fd' }}
                  className="font-podium text-3xl uppercase text-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.button
              type="button"
              onClick={() => { onClose(); onWallet() }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: 1.02 }}
              className="btn-arrow mb-4 flex w-full items-center justify-center gap-2 border border-white/35 py-4 font-inter text-xs font-semibold uppercase tracking-widest text-white neon-border"
            >
              Подключить кошелёк
              <ArrowUpRight size={16} className="arrow-icon" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
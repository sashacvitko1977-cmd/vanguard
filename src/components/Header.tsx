import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { NAV_LINKS } from '../lib/data'
import { MagneticButton } from './MagneticButton'

type Props = {
  onWallet: () => void
  onMenuOpen: () => void
}

export function Header({ onWallet, onMenuOpen }: Props) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-40 px-6 py-5 transition-colors duration-500 sm:px-10 lg:px-16 lg:py-6 ${
        scrolled ? 'border-b border-white/8 bg-black/75 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <motion.a
          href="#top"
          data-cursor-hover
          className="font-display text-xl font-bold uppercase tracking-wider text-white neon-glow sm:text-2xl"
          whileHover={{ scale: 1.02 }}
        >
          VANGUARD
        </motion.a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Основная навигация">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.id}
              href={`#${link.id}`}
              data-cursor-hover
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              whileHover={{ color: '#fff', y: -2 }}
              className="font-inter text-xs uppercase tracking-widest text-white/70 transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <MagneticButton
            onClick={onWallet}
            className="btn-arrow group hidden items-center gap-2 border border-white/35 px-5 py-2.5 font-inter text-[10px] font-semibold uppercase tracking-widest text-white neon-border transition-all hover:border-white hover:bg-white hover:text-black md:inline-flex"
          >
            Подключить кошелёк
            <ArrowUpRight size={14} strokeWidth={1.5} className="arrow-icon" />
          </MagneticButton>

          <motion.button
            type="button"
            data-cursor-hover
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Открыть меню"
            whileTap={{ scale: 0.9 }}
            onClick={onMenuOpen}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-0.5 w-5 bg-white"
                animate={{ scaleX: [1, 0.85, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
import { motion } from 'framer-motion'
import { NAV_LINKS } from '../lib/data'
import { snapFadeUp, staggerTight, textViewport, SNAP_HARD } from '../lib/motion'

const linkStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}

const linkFade = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: SNAP_HARD } },
}

export function Footer() {
  const columns = [
    { title: 'Навигация', links: NAV_LINKS.map((l) => ({ href: `#${l.id}`, label: l.label })) },
    {
      title: 'Соцсети',
      links: [
        { href: 'https://twitter.com', label: 'Twitter / X' },
        { href: 'https://discord.com', label: 'Discord' },
        { href: 'https://t.me', label: 'Telegram' },
      ],
    },
    {
      title: 'Правовая информация',
      links: [
        { href: '#footer', label: 'Политика конфиденциальности' },
        { href: '#footer', label: 'Условия использования' },
        { href: '#footer', label: 'Политика cookie' },
      ],
    },
  ]

  return (
    <motion.footer
      id="footer"
      className="relative z-10 border-t border-white/10 bg-transparent px-6 py-14 sm:px-10 lg:px-16"
      initial="hidden"
      whileInView="visible"
      viewport={textViewport}
      variants={staggerTight}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <motion.div variants={snapFadeUp}>
            <a href="#top" data-cursor-hover className="font-display text-xl font-bold uppercase tracking-wider text-white neon-glow">
              VANGUARD
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Креативная Web3-студия нового поколения. Строим бренды и продукты, которые доминируют на рынке криптовалют.
            </p>
          </motion.div>

          {columns.map((col) => (
            <motion.div key={col.title} variants={snapFadeUp}>
              <h4 className="mb-3 font-inter text-[10px] uppercase tracking-[0.14em] text-white/40">{col.title}</h4>
              <motion.div variants={linkStagger} initial="hidden" whileInView="visible" viewport={textViewport}>
                {col.links.map((link) => (
                  <motion.a
                    key={link.label}
                    variants={linkFade}
                    href={link.href}
                    data-cursor-hover
                    className="block py-0.5 text-sm text-white/60 transition-colors hover:text-violet-300"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={snapFadeUp}
          className="mt-10 flex flex-wrap justify-between gap-3 border-t border-white/8 pt-6 text-xs text-white/40"
        >
          <span>© 2026 VANGUARD Studio. Все права защищены.</span>
          <span>Создавай. Запускай. Доминируй.</span>
        </motion.div>
      </div>
    </motion.footer>
  )
}
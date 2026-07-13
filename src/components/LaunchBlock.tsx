import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Send } from 'lucide-react'
import { textSnap, cardsViewport } from '../lib/motion'
import { MagneticButton } from './MagneticButton'
import { Marquee } from './Marquee'

const SLOTS = 3

type Props = {
  onWallet?: () => void
  onSubmit?: (data: { name: string; contact: string }) => void
}

export function LaunchBlock({ onWallet, onSubmit }: Props) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !contact.trim()) return
    onSubmit?.({ name: name.trim(), contact: contact.trim() })
    setName('')
    setContact('')
  }

  return (
    <div className="mt-10 space-y-8">
      <Marquee />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={cardsViewport}
        variants={textSnap}
        className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-violet-500/20 bg-violet-500/[0.04] px-5 py-4"
      >
        <div>
          <p className="font-inter text-[10px] uppercase tracking-widest text-violet-300/80">
            Лимит на месяц
          </p>
          <p className="mt-1 font-display text-lg uppercase text-white">
            Осталось <span className="text-violet-300">{SLOTS}</span> слота
          </p>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full ${i < SLOTS ? 'bg-violet-500/70' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </motion.div>

      <motion.form
        initial="hidden"
        whileInView="visible"
        viewport={cardsViewport}
        variants={textSnap}
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-[1fr_1fr_auto]"
      >
        <label className="block">
          <span className="mb-1.5 block font-inter text-[10px] uppercase tracking-widest text-white/40">
            Имя
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Алексей"
            className="w-full border border-white/10 bg-black/40 px-4 py-3 font-inter text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-violet-500/50"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-inter text-[10px] uppercase tracking-widest text-white/40">
            Telegram / Email
          </span>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="@username"
            className="w-full border border-white/10 bg-black/40 px-4 py-3 font-inter text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-violet-500/50"
          />
        </label>
        <div className="flex items-end gap-3">
          <MagneticButton
            onClick={() => {
              if (!name.trim() || !contact.trim()) return
              onSubmit?.({ name: name.trim(), contact: contact.trim() })
              setName('')
              setContact('')
            }}
            className="btn-arrow inline-flex h-[46px] w-full items-center justify-center gap-2 bg-white px-6 font-inter text-xs font-semibold uppercase tracking-widest text-black shadow-neon transition-colors hover:bg-white/90 sm:w-auto"
          >
            <Send size={14} strokeWidth={1.5} />
            Отправить
          </MagneticButton>
          <MagneticButton
            onClick={onWallet}
            className="btn-arrow hidden items-center gap-2 border border-white/25 px-5 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-white neon-border hover:border-white sm:inline-flex"
          >
            Кошелёк
            <ArrowUpRight size={14} strokeWidth={1.5} className="arrow-icon" />
          </MagneticButton>
        </div>
      </motion.form>
    </div>
  )
}
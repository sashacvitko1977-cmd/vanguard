import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Send } from 'lucide-react'
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
    <div className="mt-14 space-y-6">
      <Marquee />

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-500/15 bg-violet-500/[0.04] px-6 py-5">
        <div>
          <p className="font-inter text-[10px] uppercase tracking-widest text-violet-300/70">
            Лимит на месяц
          </p>
          <p className="mt-1 font-display text-xl uppercase text-white">
            Осталось <span className="text-violet-300">{SLOTS}</span> слота
          </p>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-10 rounded-full transition-colors ${i < SLOTS ? 'bg-violet-500/60' : 'bg-white/8'}`}
            />
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-2xl border border-white/[0.08] bg-[var(--surface)] p-6 sm:grid-cols-[1fr_1fr_auto]"
      >
        <label className="block">
          <span className="mb-2 block font-inter text-[10px] uppercase tracking-widest text-white/38">
            Имя
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Алексей"
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 font-inter text-sm text-white outline-none transition-colors placeholder:text-white/22 focus:border-violet-500/40"
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-inter text-[10px] uppercase tracking-widest text-white/38">
            Telegram / Email
          </span>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="@username"
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 font-inter text-sm text-white outline-none transition-colors placeholder:text-white/22 focus:border-violet-500/40"
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
            className="btn-arrow inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-white px-6 font-inter text-xs font-semibold uppercase tracking-widest text-black shadow-neon hover:bg-white/92 sm:w-auto"
          >
            <Send size={14} strokeWidth={1.5} />
            Отправить
          </MagneticButton>
          <MagneticButton
            onClick={onWallet}
            className="btn-arrow hidden items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-white neon-border hover:border-white/40 sm:inline-flex"
          >
            Кошелёк
            <ArrowUpRight size={14} strokeWidth={1.5} className="arrow-icon" />
          </MagneticButton>
        </div>
      </form>
    </div>
  )
}
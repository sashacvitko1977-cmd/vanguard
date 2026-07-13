import { PARTNERS } from '../lib/data'

export function Marquee() {
  const items = [...PARTNERS, ...PARTNERS]

  return (
    <div className="relative overflow-hidden border-y border-white/8 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050505] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050505] to-transparent" />
      <div className="marquee-track flex w-max items-center gap-12">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 font-display text-sm uppercase tracking-[0.2em] text-white/25 transition-colors hover:text-white/50"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
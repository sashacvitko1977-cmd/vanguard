import { PARTNERS } from '../lib/data'

export function Marquee() {
  const items = [...PARTNERS, ...PARTNERS]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--surface)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--surface)] to-transparent" />
      <div className="marquee-track flex w-max items-center gap-14 px-4">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 font-display text-xs uppercase tracking-[0.25em] text-white/20"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
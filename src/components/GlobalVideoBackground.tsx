/** Видео-фон на всём сайте: фиксированный, без blur и parallax */
export function GlobalVideoBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'brightness(0.65)' }}
        src="/fonono.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-black/25" />
    </div>
  )
}
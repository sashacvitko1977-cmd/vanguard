/** Видео-фон на всём сайте: фиксированный, без blur и parallax */
export function GlobalVideoBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <video
        className="absolute left-1/2 top-1/2 h-full w-full object-cover"
        style={{
          filter: 'brightness(0.68)',
          transform: 'translate(-50%, -50%) scale(0.78)',
          objectPosition: '50% 38%',
        }}
        src="/fonono.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}
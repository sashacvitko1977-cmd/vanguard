import { useEffect, useRef } from 'react'
import { useReducedEffects } from '../hooks/useReducedEffects'

/** Видео-фон на десктопе; на мобильных — статичный градиент (без лагов) */
export function GlobalVideoBackground() {
  const reduced = useReducedEffects()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (reduced) {
      video.pause()
      video.removeAttribute('src')
      video.load()
      return
    }

    video.play().catch(() => {})
  }, [reduced])

  if (reduced) {
    return (
      <div
        className="fixed-viewport-layer pointer-events-none z-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(/shot-hero.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/50 via-[#030308]/90 to-[#030308]" />
        <div className="absolute inset-0 bg-black/25" />
      </div>
    )
  }

  return (
    <div className="fixed-viewport-layer pointer-events-none z-0" aria-hidden="true">
      <video
        ref={videoRef}
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        style={{
          filter: 'brightness(0.68)',
          objectPosition: '50% 40%',
        }}
        src="/fonono.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/shot-hero.png"
      />

      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}
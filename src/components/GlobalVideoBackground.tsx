import { useEffect, useRef } from 'react'
import { shouldSkipAmbientEffects } from '../lib/device'

/** Видео-фон на всех устройствах; статичный fallback только при reduced-motion */
export function GlobalVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || shouldSkipAmbientEffects()) return

    video.play().catch(() => {})
  }, [])

  if (shouldSkipAmbientEffects()) {
    return (
      <div className="fixed-viewport-layer pointer-events-none z-0" aria-hidden="true">
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
        className="video-bg absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        style={{
          filter: 'brightness(0.68)',
          objectPosition: '50% 40%',
        }}
        src="/fonono.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/shot-hero.png"
      />

      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}
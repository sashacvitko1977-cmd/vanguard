import { useEffect, useRef } from 'react'
import { shouldSkipAmbientEffects } from '../lib/device'

/** Видео-фон на всех устройствах */
export function GlobalVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || shouldSkipAmbientEffects()) return

    const play = () => video.play().catch(() => {})

    play()
    document.addEventListener('visibilitychange', play)
    return () => document.removeEventListener('visibilitychange', play)
  }, [])

  if (shouldSkipAmbientEffects()) {
    return (
      <div className="fixed-viewport-layer pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: 'url(/shot-hero.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 via-[#030308]/85 to-[#030308]" />
        <div className="video-vignette absolute inset-0" />
      </div>
    )
  }

  return (
    <div className="fixed-viewport-layer pointer-events-none z-0" aria-hidden="true">
      <video
        ref={videoRef}
        className="video-bg absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        src="/fonono.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/shot-hero.png"
      />
      <div className="absolute inset-0 bg-black/18" />
      <div className="video-vignette absolute inset-0" />
    </div>
  )
}
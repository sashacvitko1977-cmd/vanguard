import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

const SCROLL_RANGE = 2400

/** Видео-фон на всём сайте: лёгкий blur + parallax при скролле */
export function GlobalVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollY } = useScroll()

  const videoX = useTransform(scrollY, [0, 600, SCROLL_RANGE], [0, -70, -150])
  const videoY = useTransform(scrollY, [0, SCROLL_RANGE], [0, 120])
  const videoScale = useTransform(scrollY, [0, SCROLL_RANGE], [1.15, 1.35])
  const objectPosition = useTransform(
    scrollY,
    [0, 500, SCROLL_RANGE],
    ['60% 40%', '45% 42%', '30% 48%'],
  )

  useMotionValueEvent(scrollY, 'change', (y) => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return

    const progress = Math.min(Math.max(y / SCROLL_RANGE, 0), 1)
    const target = progress * video.duration
    if (Math.abs(video.currentTime - target) > 0.05) {
      video.currentTime = target
    }
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onReady = () => {
      video.pause()
      video.currentTime = 0
    }

    video.addEventListener('loadedmetadata', onReady)
    if (video.readyState >= 1) onReady()

    return () => video.removeEventListener('loadedmetadata', onReady)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-[-12%] will-change-transform"
        style={{ x: videoX, y: videoY, scale: videoScale }}
      >
        <motion.video
          ref={videoRef}
          className="h-full w-full object-cover"
          style={{
            objectPosition,
            filter: 'blur(3px) brightness(0.55) saturate(1.1)',
          }}
          src="/fonono.mp4"
          muted
          playsInline
          preload="auto"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(124,58,237,0.08),transparent_60%)]" />
    </div>
  )
}
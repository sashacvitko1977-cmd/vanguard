import { GlobalVideoBackground } from './GlobalVideoBackground'

/** Единственный атмосферный слой: видео-фон + лёгкий film grain */
export function Atmosphere() {
  return (
    <>
      <GlobalVideoBackground />
      <div className="grain-overlay" aria-hidden="true" />
    </>
  )
}
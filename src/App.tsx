import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { SectionBlock } from './components/SectionBlock'
import { Footer } from './components/Footer'
import { MobileMenu } from './components/MobileMenu'
import { WalletModal } from './components/WalletModal'
import { Toast } from './components/Toast'
import { ScrollProgress } from './components/ScrollProgress'
import { BackToTop } from './components/BackToTop'
import { CustomCursor } from './components/CustomCursor'
import { GlobalVideoBackground } from './components/GlobalVideoBackground'
import { RainOverlay } from './components/RainOverlay'
import { useReducedEffects } from './hooks/useReducedEffects'
import { SECTIONS } from './lib/data'

export default function App() {
  const reducedEffects = useReducedEffects()
  const [menuOpen, setMenuOpen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    document.body.style.overflow = menuOpen || walletOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, walletOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setWalletOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <>
      <GlobalVideoBackground />
      {!reducedEffects && <RainOverlay />}
      {!reducedEffects && <div className="grain-overlay" aria-hidden="true" />}
      <CustomCursor />
      <ScrollProgress />
      <Header onWallet={() => setWalletOpen(true)} onMenuOpen={() => setMenuOpen(true)} />
      <main className="relative z-10">
        <Hero />
        {SECTIONS.map((section, i) => (
          <SectionBlock
            key={section.id}
            section={section}
            index={i}
            onWallet={section.id === 'launch' ? () => setWalletOpen(true) : undefined}
            onLeadSubmit={
              section.id === 'launch'
                ? (data) => showToast(`Заявка от ${data.name} принята — свяжемся в Telegram`)
                : undefined
            }
          />
        ))}
      </main>
      <Footer />
      <BackToTop />
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onWallet={() => setWalletOpen(true)}
      />
      <WalletModal
        open={walletOpen}
        onClose={() => setWalletOpen(false)}
        onConnect={() => {
          setWalletOpen(false)
          showToast('Демо: кошелёк подключён успешно')
        }}
      />
      <Toast message={toast} visible={!!toast} />
    </>
  )
}
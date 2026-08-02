import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Cursor } from '@/components/Cursor'
import { PageIntro } from '@/components/PageIntro'
import { Home } from '@/pages/Home'
import { Contact } from '@/pages/Contact'
import { useLenis } from '@/lib/useLenis'
import { useReducedMotion } from '@/lib/useReducedMotion'

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [location.pathname, location.hash])

  return null
}

function PageTransition() {
  const location = useLocation()
  const reduced = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function AppShell() {
  useLenis()

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="grain-overlay" aria-hidden="true" />
      <PageIntro />
      <Cursor />
      <Nav />
      <main id="main-content">
        <PageTransition />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <AppShell />
    </BrowserRouter>
  )
}

export default App

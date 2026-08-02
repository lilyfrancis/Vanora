import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Cursor } from '@/components/Cursor'
import { PageIntro } from '@/components/PageIntro'
import { Home } from '@/pages/Home'
import { Contact } from '@/pages/Contact'
import { useLenis } from '@/lib/useLenis'

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

function AppShell() {
  useLenis()

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <PageIntro />
      <Cursor />
      <Nav />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
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

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Positioning', href: '#positioning' },
  { label: 'What we install', href: '#pillars' },
  { label: 'Launchpad', href: '#launchpad' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Contact', href: '/contact' },
]

export function Nav() {
  const [condensed, setCondensed] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastY = useRef(0)
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setCondensed(y > 60)
      setHidden(y > lastY.current && y > 200)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = location.pathname === '/'

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500',
          condensed ? 'border border-white/10 bg-ink/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.25)]' : 'bg-transparent',
        )}
      >
        <Link to="/" className="font-display text-lg tracking-tight text-cloud">
          Vanora <span className="text-gold-lite">Partners</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              {link.href.startsWith('/') ? (
                <Link to={link.href} className="text-sm text-mist transition-colors hover:text-cloud">
                  {link.label}
                </Link>
              ) : isHome ? (
                <a href={link.href} className="text-sm text-mist transition-colors hover:text-cloud">
                  {link.label}
                </a>
              ) : (
                <Link to={`/${link.href}`} className="text-sm text-mist transition-colors hover:text-cloud">
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-lite md:inline-block"
        >
          Book a call
        </Link>

        <button
          type="button"
          className="text-cloud md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute left-4 right-4 top-[72px] rounded-2xl border border-white/10 bg-ink/95 p-6 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') || !isHome ? (
                    <Link to={link.href.startsWith('/') ? link.href : `/${link.href}`} className="text-cloud" onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-cloud" onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

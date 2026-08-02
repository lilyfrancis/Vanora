import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/lib/useReducedMotion'

const SESSION_KEY = 'vanora-intro-seen'

function shouldShowIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return !sessionStorage.getItem(SESSION_KEY)
}

export function PageIntro() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(shouldShowIntro)

  useEffect(() => {
    if (reduced || !visible) return
    sessionStorage.setItem(SESSION_KEY, '1')

    const timer = setTimeout(() => setVisible(false), 1500)
    function skip() {
      setVisible(false)
    }
    window.addEventListener('keydown', skip)
    window.addEventListener('click', skip, { once: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('click', skip)
    }
  }, [reduced, visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="flex flex-col items-center gap-3">
            <motion.p
              className="eyebrow text-mist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Vanora Partners
            </motion.p>
            <motion.span
              className="relative font-display text-4xl italic text-cloud md:text-5xl"
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            >
              Installed.
              <motion.span
                className="absolute -bottom-2 left-0 h-[2px] w-full origin-left bg-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
              />
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

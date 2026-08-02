import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { SplitHeading } from '@/components/SplitHeading'
import { MagneticButton } from '@/components/MagneticButton'
import { installTransition } from '@/lib/motion'
import { useShaderBackground } from '@/components/ui/animated-shader-hero'
import { useReducedMotion } from '@/lib/useReducedMotion'

export function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()
  const canvasRef = useShaderBackground()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-cloud">
      {reduced ? (
        <div className="hero-mesh" aria-hidden="true" />
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" aria-hidden="true" />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink/85 via-ink/55 to-ink/90"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{ background: 'radial-gradient(60% 50% at 50% 35%, rgba(201,162,75,0.35), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-32 text-center">
        <motion.p
          className="eyebrow text-gold-lite"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...installTransition, delay: 0.15 }}
        >
          A division of Techbots Group
        </motion.p>

        <SplitHeading
          as="h1"
          text="Strategy. Installed."
          seamAfterWord={1}
          className="mt-6 justify-center text-center font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.98] tracking-tight text-cloud"
        />

        <motion.p
          className="mt-8 max-w-xl text-balance text-lg text-mist md:text-xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...installTransition, delay: 0.9 }}
        >
          We don't just advise businesses — we build, staff, brand and scale them. One partner, from idea to scale.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...installTransition, delay: 1.05 }}
        >
          <MagneticButton href="/contact">Book a strategy call</MagneticButton>
          <MagneticButton
            variant="ghost"
            onClick={() => document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See what we install
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="scroll-indicator block h-10 w-px bg-gradient-to-b from-gold-lite to-transparent" aria-hidden="true" />
      </motion.div>
    </section>
  )
}

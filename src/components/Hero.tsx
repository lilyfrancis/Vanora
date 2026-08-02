import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { Sparkles, TrendingUp, Bot } from 'lucide-react'
import { SplitHeading } from '@/components/SplitHeading'
import { MagneticButton } from '@/components/MagneticButton'
import { installTransition } from '@/lib/motion'
import { useShaderBackground } from '@/components/ui/animated-shader-hero'
import { useReducedMotion } from '@/lib/useReducedMotion'

const floatingBadges = [
  { icon: TrendingUp, label: '150+ systems installed', side: 'left' as const, top: '24%' },
  { icon: Bot, label: 'AI agents live 24/7', side: 'right' as const, top: '20%' },
  { icon: Sparkles, label: '40% avg. revenue lift', side: 'right' as const, top: '66%' },
]

export function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()
  const canvasRef = useShaderBackground()

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 137.5) % 100}%`,
        size: 2 + ((i * 7) % 5),
        duration: 14 + ((i * 5) % 12),
        delay: -(i * 1.7),
        drift: `${((i % 2 === 0 ? 1 : -1) * (20 + ((i * 11) % 40)))}px`,
      })),
    [],
  )

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

      {!reduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {particles.map((p) => (
            <span
              key={p.id}
              className="hero-particle"
              style={{
                left: p.left,
                bottom: '-10%',
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                ['--drift' as string]: p.drift,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-32 text-center">
        <motion.span
          className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 text-gold-lite backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...installTransition, delay: 0.15 }}
        >
          <Sparkles size={12} className="shrink-0" aria-hidden="true" />
          A division of Techbots Group
        </motion.span>

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

      {!reduced &&
        floatingBadges.map((badge, i) => {
          const Icon = badge.icon
          return (
            <motion.div
              key={badge.label}
              className={`pointer-events-none absolute z-10 hidden items-center gap-2.5 rounded-full border border-white/10 bg-ink-2/60 px-4 py-2.5 text-xs font-medium text-cloud/90 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md lg:flex ${
                badge.side === 'left' ? 'left-[6%]' : 'right-[6%]'
              }`}
              style={{ top: badge.top }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -12, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 1.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: 1.3 + i * 0.15 },
              }}
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-lite">
                <Icon size={14} />
              </span>
              {badge.label}
            </motion.div>
          )
        })}

      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="eyebrow text-[10px] text-mist/70">Scroll</span>
        <span className="scroll-indicator block h-10 w-px bg-gradient-to-b from-gold-lite to-transparent" aria-hidden="true" />
      </motion.div>
    </section>
  )
}

import { Reveal } from '@/components/Reveal'
import { MagneticButton } from '@/components/MagneticButton'
import { seamVariants, viewportOnce } from '@/lib/motion'
import { motion } from 'motion/react'

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-ink py-32 text-center text-cloud md:py-44">
      <div className="hero-mesh opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal as="h2" className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08]">
          We don't just plan the business. We build it, staff it, brand it and scale it.
        </Reveal>

        <motion.span
          className="mx-auto mt-8 block h-px w-24 origin-center bg-gold"
          variants={seamVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        />

        <Reveal delay={0.15} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <MagneticButton href="/contact">Book a strategy call</MagneticButton>
          <MagneticButton variant="ghost" href="/contact">
            See the full service catalogue
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}

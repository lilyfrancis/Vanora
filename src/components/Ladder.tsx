import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Reveal } from '@/components/Reveal'

const steps = [
  {
    number: '01',
    title: 'Diagnose',
    tag: 'Paid audits',
    descriptor: 'Fixed-scope audits that map exactly where value is leaking, and what fixing it is worth.',
  },
  {
    number: '02',
    title: 'Install',
    tag: 'AI systems · StackForge · recruitment · branding',
    descriptor: 'We deploy the systems, tools and people the audit calls for — end to end, not just a plan.',
  },
  {
    number: '03',
    title: 'Transform',
    tag: 'Retainers · fractional execs · Launchpad',
    descriptor: 'An ongoing partnership — from fractional leadership to a full company build-out.',
  },
]

export function Ladder() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 55%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="ladder" className="bg-ink py-28 text-cloud md:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal as="h2" className="text-center font-display text-[clamp(2rem,4.2vw,3rem)] leading-tight">
          One audit can become a seven-figure partnership.
        </Reveal>

        <div ref={containerRef} className="relative mt-20">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-white/10 md:left-1/2" aria-hidden="true">
            <motion.div className="h-full w-full origin-bottom bg-gold" style={{ scaleY: lineScale }} />
          </div>

          <ol className="flex flex-col gap-16">
            {steps.map((step, i) => (
              <Reveal key={step.number} as="li" delay={i * 0.05} className="relative pl-16 md:pl-0">
                <div
                  className={
                    'flex flex-col gap-2 md:w-[46%] ' + (i % 2 === 0 ? 'md:mr-auto md:text-right md:items-end' : 'md:ml-auto')
                  }
                >
                  <span className="eyebrow text-gold-lite">Step {step.number}</span>
                  <h3 className="font-display text-2xl text-cloud md:text-3xl">{step.title}</h3>
                  <p className="text-sm text-gold-lite/80">{step.tag}</p>
                  <p className="text-mist">{step.descriptor}</p>
                </div>
                <span
                  className="absolute left-6 top-1 size-3 -translate-x-1/2 rounded-full border-2 border-gold bg-ink md:left-1/2"
                  aria-hidden="true"
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

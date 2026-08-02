import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pillars, type Pillar } from '@/data/pillars'
import { PillarCard } from '@/components/PillarCard'
import { Drawer } from '@/components/Drawer'
import { Reveal } from '@/components/Reveal'
import { useReducedMotion } from '@/lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Pillars() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState<Pillar | null>(null)

  useLayoutEffect(() => {
    if (reduced || !sectionRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.pillar-card', gridRef.current!)
        gsap.set(cards, { opacity: 0, y: 34, scale: 0.94 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=110%',
            scrub: 0.4,
            pin: true,
            anticipatePin: 1,
          },
        })

        tl.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          ease: 'power3.out',
          duration: 1,
        })
      })

      return () => mm.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="pillars" ref={sectionRef} className="relative bg-ink py-28 text-cloud md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Reveal as="p" className="eyebrow text-gold-lite">
            What we do
          </Reveal>
          <Reveal as="h2" delay={0.08} className="mt-4 font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-tight">
            Eight service pillars
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-5 text-lg text-mist">
            One partner across the whole business lifecycle.
          </Reveal>
        </div>

        <div ref={gridRef} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} onOpen={() => setActive(pillar)} />
          ))}
        </div>
      </div>

      <Drawer open={!!active} onClose={() => setActive(null)} title={active?.title ?? ''}>
        {active && (
          <>
            <p className="text-mist">{active.descriptor}</p>
            <ul className="mt-8 flex flex-col gap-4">
              {active.services.map((service) => (
                <li key={service} className="flex items-start gap-3 border-b border-white/10 pb-4 text-[15px] text-cloud/90">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {service}
                </li>
              ))}
            </ul>
          </>
        )}
      </Drawer>
    </section>
  )
}

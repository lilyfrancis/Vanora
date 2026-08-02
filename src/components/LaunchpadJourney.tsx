import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { launchpadStages } from '@/data/launchpad'
import { Reveal } from '@/components/Reveal'
import { useReducedMotion } from '@/lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function StagePanel({ stage }: { stage: (typeof launchpadStages)[number] }) {
  return (
    <div className="flex w-[82vw] shrink-0 flex-col rounded-2xl border border-white/10 bg-ink p-8 sm:w-[420px]">
      <span className="eyebrow text-gold-lite">{stage.number}</span>
      <h3 className="mt-4 font-display text-2xl text-cloud">{stage.title}</h3>
      <p className="mt-3 text-mist">{stage.descriptor}</p>
      <ul className="mt-6 flex flex-col gap-2.5">
        {stage.details.map((d) => (
          <li key={d} className="flex items-start gap-2.5 text-sm text-cloud/80">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-gold" />
            {d}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function LaunchpadJourney() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !sectionRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current!
        gsap.set(threadRef.current, { scaleX: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => '+=' + Math.max(track.scrollWidth - window.innerWidth + 200, 400),
            scrub: 0.5,
            pin: pinRef.current,
            invalidateOnRefresh: true,
          },
        })

        tl.to(track, { x: () => -(track.scrollWidth - window.innerWidth + 200), ease: 'none' }, 0)
        tl.to(threadRef.current, { scaleX: 1, ease: 'none' }, 0)
      })

      return () => mm.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="launchpad" ref={sectionRef} className="relative bg-ink-2 py-28 text-cloud md:py-0">
      <div ref={pinRef} className="md:flex md:min-h-screen md:flex-col md:justify-center md:overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal as="span" className="eyebrow inline-block rounded-full border border-gold/40 px-4 py-1.5 text-gold-lite">
            Flagship program
          </Reveal>
          <Reveal as="h2" delay={0.08} className="mt-5 font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-tight">
            Vanora Launchpad
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-5 max-w-xl text-lg text-mist">
            Idea → Scale. From a rough idea to a running, growing company — then we stay on as growth partner.
          </Reveal>

          <div className="relative mt-4 hidden h-px w-full max-w-xl bg-white/10 md:block">
            <div ref={threadRef} className="absolute inset-y-0 left-0 w-full origin-left bg-gold" />
          </div>
        </div>

        <div className="mt-12 overflow-x-auto md:mt-14 md:overflow-visible">
          <div ref={trackRef} className="flex gap-6 px-6 pb-4 md:w-max md:px-[8vw]">
            {launchpadStages.map((stage) => (
              <StagePanel key={stage.id} stage={stage} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-6 md:mt-24">
        <Reveal>
          <p className="gold-italic text-xl">
            A partnership with a defined exit milestone — we grow with you until you hit your target or your first raise.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

import { Check, X } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'

const others = ['Hands you a slide deck', 'You execute alone', 'Sells hours', 'Slow — reports, not results']

const vanora = ['Hands you a working system', 'We build, staff & run it', 'Sells outcomes', 'Fast — proof, not promises']

export function Positioning() {
  return (
    <section id="positioning" className="bg-ice py-28 text-slate md:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <Reveal as="p" className="eyebrow text-gold">
            More than consulting
          </Reveal>
          <Reveal as="h2" delay={0.08} className="mt-4 font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-tight text-slate">
            We advise — then we install.
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-6 max-w-md text-lg text-slate/80">
            Most firms sell a slide deck. We diagnose the problem, then deploy the systems that fix it — end to end.
          </Reveal>
          <Reveal delay={0.24} className="mt-8">
            <p className="gold-italic text-xl">The moat: strategy + execution under one roof.</p>
          </Reveal>
        </div>

        <RevealGroup stagger={0.1} className="grid gap-5 sm:grid-cols-2 md:grid-cols-1">
          <RevealItem className="rounded-2xl border border-line bg-paper p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_-25px_rgba(14,22,48,0.2)]">
            <p className="eyebrow text-mist">Others</p>
            <ul className="mt-5 flex flex-col gap-4">
              {others.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-slate/70">
                  <X size={16} className="mt-1 shrink-0 text-slate/40" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className="glow-card relative overflow-hidden rounded-2xl border border-ink-3 bg-ink p-7 text-cloud transition-all duration-500 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_25px_60px_-25px_rgba(201,162,75,0.4)]">
            <span
              className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-gold/10 blur-3xl"
              aria-hidden="true"
            />
            <p className="eyebrow relative text-gold-lite">Vanora</p>
            <ul className="mt-5 flex flex-col gap-4">
              {vanora.map((item, i) => (
                <RevealItem key={item} as="li" className="flex items-start gap-3 text-[15px]">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/15">
                    <Check size={13} className="text-gold-lite" />
                  </span>
                  <span>
                    {item}
                    <span className="sr-only">, item {i + 1}</span>
                  </span>
                </RevealItem>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}

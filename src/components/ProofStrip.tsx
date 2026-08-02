import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { Counter } from '@/components/Counter'

const segments = ['SMEs', 'Startups', 'Schools', 'Real Estate', 'Government', 'Investment Firms']

const stats = [
  { value: 150, suffix: '+', label: 'Systems installed' },
  { value: 40, suffix: '%', label: 'Avg. revenue lift' },
  { value: 8, suffix: '', label: 'Sectors served' },
]

export function ProofStrip() {
  return (
    <section className="border-y border-line bg-ice py-20 text-slate">
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ice to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ice to-transparent"
          aria-hidden="true"
        />
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-4 pr-4 motion-reduce:animate-none">
          {[...segments, ...segments].map((label, i) => (
            <span
              key={i}
              className="eyebrow flex shrink-0 items-center whitespace-nowrap rounded-full border border-line bg-paper px-5 py-2.5 text-slate/60"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <RevealGroup stagger={0.08} className="mx-auto mt-14 grid max-w-4xl gap-6 px-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <RevealItem
            key={stat.label}
            className="group rounded-2xl border border-line bg-paper p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_20px_45px_-25px_rgba(201,162,75,0.5)]"
          >
            <p className="font-display text-4xl text-slate">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-slate/70">{stat.label}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal as="p" delay={0.15} className="mx-auto mt-6 max-w-4xl px-6 text-center text-xs text-slate/40">
        Illustrative figures — to be replaced with client-reported results.
      </Reveal>
    </section>
  )
}

import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'

const segments = ['SMEs', 'Startups', 'Schools', 'Real Estate', 'Government', 'Investment Firms']

const stats = [
  { value: '150+', label: 'Systems installed' },
  { value: '40%', label: 'Avg. revenue lift' },
  { value: '8', label: 'Sectors served' },
]

export function ProofStrip() {
  return (
    <section className="border-y border-line bg-ice py-20 text-slate">
      <div className="overflow-hidden">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-16 pr-16 motion-reduce:animate-none">
          {[...segments, ...segments].map((label, i) => (
            <span key={i} className="eyebrow whitespace-nowrap text-slate/50">
              {label}
            </span>
          ))}
        </div>
      </div>

      <RevealGroup stagger={0.08} className="mx-auto mt-14 grid max-w-4xl gap-6 px-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <RevealItem key={stat.label} className="rounded-2xl border border-line bg-paper p-6 text-center">
            <p className="font-display text-4xl text-slate">{stat.value}</p>
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

import { offers } from '@/data/offers'
import { OfferCard } from '@/components/OfferCard'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'

export function Offers() {
  return (
    <section id="solutions" className="bg-paper py-28 text-slate md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Reveal as="p" className="eyebrow text-gold">
            Signature solutions
          </Reveal>
          <Reveal as="h2" delay={0.08} className="mt-4 font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-tight text-slate">
            Solutions that sell themselves.
          </Reveal>
        </div>

        <RevealGroup stagger={0.07} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <RevealItem key={offer.id}>
              <OfferCard offer={offer} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

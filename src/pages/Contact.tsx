import { Reveal } from '@/components/Reveal'
import { ContactForm } from '@/components/ContactForm'

export function Contact() {
  return (
    <>
      <section className="relative bg-ink pb-20 pt-40 text-center text-cloud md:pt-48">
        <div className="hero-mesh opacity-70" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl px-6">
          <Reveal as="p" className="eyebrow text-gold-lite">
            Book a strategy call
          </Reveal>
          <Reveal as="h1" delay={0.08} className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-tight">
            Let's install your next system.
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-5 text-lg text-mist">
            Tell us where you're stuck. We'll come back with a point of view, fast.
          </Reveal>
        </div>
      </section>

      <section className="bg-ice py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}

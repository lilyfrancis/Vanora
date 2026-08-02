import { motion } from 'motion/react'
import type { Offer } from '@/data/offers'
import { useReducedMotion } from '@/lib/useReducedMotion'

const bars = [6, 14, 22, 12, 18, 9, 16]

export function OfferCard({ offer }: { offer: Offer }) {
  const Icon = offer.icon
  const reduced = useReducedMotion()
  return (
    <div className="glow-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-cloud p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_25px_55px_-25px_rgba(14,22,48,0.3)]">
      <span
        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gold/0 blur-2xl transition-colors duration-500 group-hover:bg-gold/10"
        aria-hidden="true"
      />
      <motion.span
        className="relative flex size-12 items-center justify-center rounded-full bg-ink text-gold-lite"
        whileHover={{ rotate: -8, scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <span className="icon-glow" aria-hidden="true" />
        <Icon size={22} className="relative" />
      </motion.span>

      <h3 className="mt-5 font-display text-xl text-slate">{offer.title}</h3>
      <p className="mt-2 text-sm text-slate/70">{offer.descriptor}</p>

      {offer.demo === 'voice' && (
        <div className="mt-6 flex h-8 items-end gap-1 opacity-40 transition-opacity group-hover:opacity-100" aria-hidden="true">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-gold"
              initial={{ height: 4 }}
              animate={reduced ? { height: h } : { height: [4, h, 4] }}
              transition={reduced ? { duration: 0 } : { duration: 0.9, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

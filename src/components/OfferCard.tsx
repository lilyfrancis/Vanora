import { motion } from 'motion/react'
import type { Offer } from '@/data/offers'
import { useReducedMotion } from '@/lib/useReducedMotion'

const bars = [6, 14, 22, 12, 18, 9, 16]

export function OfferCard({ offer }: { offer: Offer }) {
  const Icon = offer.icon
  const reduced = useReducedMotion()
  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-line bg-cloud p-7 transition-shadow hover:shadow-[0_20px_45px_-20px_rgba(14,22,48,0.25)]">
      <motion.span
        className="flex size-12 items-center justify-center rounded-full bg-ink text-gold-lite"
        whileHover={{ rotate: -8, scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <Icon size={22} />
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

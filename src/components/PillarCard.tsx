import { forwardRef } from 'react'
import { motion } from 'motion/react'
import type { Pillar } from '@/data/pillars'
import { cn } from '@/lib/utils'

interface PillarCardProps {
  pillar: Pillar
  onOpen: () => void
  className?: string
}

export const PillarCard = forwardRef<HTMLButtonElement, PillarCardProps>(function PillarCard(
  { pillar, onOpen, className },
  ref,
) {
  const Icon = pillar.icon
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      className={cn(
        'pillar-card glow-card group relative flex h-full flex-col items-start overflow-hidden rounded-2xl border border-white/10 bg-ink-2 p-6 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:bg-ink-3 hover:shadow-[0_25px_60px_-25px_rgba(201,162,75,0.35)]',
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gold/0 blur-2xl transition-colors duration-500 group-hover:bg-gold/10"
        aria-hidden="true"
      />
      <span className="eyebrow text-mist">{pillar.number}</span>
      <motion.span
        className="relative mt-4 flex size-12 items-center justify-center rounded-full bg-ink-3 text-gold-lite transition-colors group-hover:bg-gold/15"
        whileHover={{ rotate: -10, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <span className="icon-glow" aria-hidden="true" />
        <Icon size={22} className="relative" />
      </motion.span>
      <h3 className="mt-5 font-display text-xl text-cloud">{pillar.title}</h3>
      <p className="mt-2 text-sm text-mist">{pillar.descriptor}</p>
      <span className="mt-auto flex items-center gap-1.5 pt-5 text-xs font-semibold uppercase tracking-wider text-gold-lite opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
        View services
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </button>
  )
})

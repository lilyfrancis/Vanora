import { forwardRef } from 'react'
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
        'pillar-card group relative flex h-full flex-col items-start rounded-2xl border border-white/10 bg-ink-2 p-6 text-left transition-colors hover:border-gold/50 hover:bg-ink-3',
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
        aria-hidden="true"
      />
      <span className="eyebrow text-mist">{pillar.number}</span>
      <span className="mt-4 flex size-12 items-center justify-center rounded-full bg-ink-3 text-gold-lite transition-colors group-hover:bg-gold/15">
        <Icon size={22} />
      </span>
      <h3 className="mt-5 font-display text-xl text-cloud">{pillar.title}</h3>
      <p className="mt-2 text-sm text-mist">{pillar.descriptor}</p>
      <span className="mt-auto pt-5 text-xs font-semibold uppercase tracking-wider text-gold-lite opacity-0 transition-opacity group-hover:opacity-100">
        View services →
      </span>
    </button>
  )
})

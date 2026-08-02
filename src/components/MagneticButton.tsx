import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  variant?: 'solid' | 'ghost'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold tracking-wide transition-colors duration-300'
const solid = 'bg-gold text-ink hover:bg-gold-lite'
const ghost = 'border border-mist/50 text-inherit hover:border-gold hover:text-gold-lite'

export function MagneticButton({ children, className, variant = 'solid', href, onClick, type = 'button' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  function handleMove(e: MouseEvent) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  const classes = cn(base, variant === 'solid' ? solid : ghost, className)

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {href ? (
        <a href={href} className={classes} onClick={onClick}>
          {children}
        </a>
      ) : (
        <button type={type} className={classes} onClick={onClick}>
          {children}
        </button>
      )}
    </motion.div>
  )
}

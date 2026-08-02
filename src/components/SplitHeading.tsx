import { useEffect, useRef, type ElementType } from 'react'
import { motion, useAnimation, useInView } from 'motion/react'
import { installTransition } from '@/lib/motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { cn } from '@/lib/utils'

interface SplitHeadingProps {
  text: string
  as?: ElementType
  className?: string
  wordClassName?: string
  /** Word index (0-based) after which the "installed" word gets the signature lock + gold seam. */
  seamAfterWord?: number
}

/**
 * Splits a heading by word and reveals each with a staggered rise-in.
 * Optionally draws a gold seam under a specific word (the Install signature).
 */
export function SplitHeading({ text, as = 'h2', className, wordClassName, seamAfterWord }: SplitHeadingProps) {
  const words = text.split(' ')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const controls = useAnimation()
  const reduced = useReducedMotion()
  const Tag = as as ElementType

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  if (reduced) {
    return (
      <Tag ref={ref} className={className}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag ref={ref} className={cn(className, 'flex flex-wrap gap-x-[0.3em]')}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="relative inline-block overflow-hidden pb-[0.12em]">
          <motion.span
            className={cn('inline-block', wordClassName)}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: '110%', scale: 0.94 },
              visible: {
                opacity: 1,
                y: '0%',
                scale: 1,
                transition: { ...installTransition, delay: i * 0.08 },
              },
            }}
          >
            {word}
          </motion.span>
          {seamAfterWord === i && (
            <motion.span
              className="absolute left-0 -bottom-1 h-[2px] w-full origin-left bg-gold"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                visible: {
                  scaleX: 1,
                  opacity: 1,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 + 0.35 },
                },
              }}
            />
          )}
        </span>
      ))}
    </Tag>
  )
}

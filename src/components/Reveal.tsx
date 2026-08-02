import type { ElementType, ReactNode } from 'react'
import { motion } from 'motion/react'
import { installTransition, installVariants, staggerContainer, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  as?: ElementType
  delay?: number
}

/** Reveals a single element on scroll with the Install signature (rise + fade + settle). */
export function Reveal({ children, className, as = 'div', delay = 0 }: RevealProps) {
  const MotionTag = motion.create(as)
  return (
    <MotionTag
      className={className}
      variants={installVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ ...installTransition, delay }}
    >
      {children}
    </MotionTag>
  )
}

interface RevealGroupProps {
  children: ReactNode
  className?: string
  as?: ElementType
  stagger?: number
  delayChildren?: number
}

/** Stagger container — children should be <RevealItem> and will animate in sequence. */
export function RevealGroup({ children, className, as = 'div', stagger = 0.08, delayChildren = 0 }: RevealGroupProps) {
  const MotionTag = motion.create(as)
  return (
    <MotionTag
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  )
}

interface RevealItemProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

export function RevealItem({ children, className, as = 'div' }: RevealItemProps) {
  const MotionTag = motion.create(as)
  return (
    <MotionTag className={cn(className)} variants={installVariants}>
      {children}
    </MotionTag>
  )
}

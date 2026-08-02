import type { Transition, Variants } from 'motion/react'

/** The "Install" signature easing — a short overshoot then settle. */
export const installEase = [0.16, 1, 0.3, 1] as const

export const installTransition: Transition = {
  duration: 0.7,
  ease: installEase,
}

/** Rise + fade + scale-in used for reveal-on-scroll ("the Install"). */
export const installVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: installTransition,
  },
}

/** Wraps installVariants children with a stagger — use on a parent in view. */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  }
}

/** A gold hairline seam that draws in left-to-right. */
export const seamVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: installEase, delay: 0.15 },
  },
}

export const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: installTransition,
  },
}

export const viewportOnce = { once: true, amount: 0.2 as number, margin: '0px 0px -10% 0px' }
export const viewportOnceGenerous = { once: true, amount: 0.1 as number, margin: '0px 0px -5% 0px' }

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
}

/** Animates a number counting up from 0 once it scrolls into view. */
export function Counter({ value, prefix = '', suffix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20, mass: 1 })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  useEffect(() => {
    if (reduced || !ref.current) return
    return spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`
    })
  }, [spring, prefix, suffix, reduced])

  if (reduced) {
    return (
      <span className={className}>
        {prefix}
        {value}
        {suffix}
      </span>
    )
  }

  return (
    <motion.span ref={ref} className={className}>
      {prefix}0{suffix}
    </motion.span>
  )
}

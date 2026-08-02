import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useReducedMotion } from '@/lib/useReducedMotion'

export function Cursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 300, damping: 30 })
  const ringY = useSpring(y, { stiffness: 300, damping: 30 })

  const [active, setActive] = useState(false)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (reduced || !canHover) return
    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    function onMove(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement
      setActive(!!target.closest('a, button, [role="button"], input, textarea, select'))
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [reduced, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y, translateX: '-50%', translateY: '-50%' }} />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: active ? 1.6 : 1, opacity: active ? 1 : 0.7 }}
        transition={{ duration: 0.25 }}
      />
    </>
  )
}

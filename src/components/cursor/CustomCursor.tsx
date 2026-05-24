'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { damping: 20, stiffness: 200, mass: 0.5 })
  const springY = useSpring(mouseY, { damping: 20, stiffness: 200, mass: 0.5 })

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    if (window.matchMedia('(max-width: 768px)').matches) return
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
      setIsPointer(window.getComputedStyle(e.target as HTMLElement).cursor === 'pointer')
    }
    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [mouseX, mouseY, isVisible])

  if (isMobile) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isPointer ? 1.8 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00C896' }} />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: isVisible ? 0.3 : 0, scale: isPointer ? 2.5 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-8 h-8 rounded-full" style={{ border: '1px solid #00C896' }} />
      </motion.div>
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export const useCustomCursor = () => {
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

  return {
    isVisible,
    isPointer,
    isMobile,
    mouseX,
    mouseY,
    springX,
    springY,
  }
}

'use client'

import { useEffect, useState } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export const useScrollProgress = () => {
  const [scrollPercent, setScrollPercent] = useState(0)
  const raw = useMotionValue(0)
  const smooth = useSpring(raw, { damping: 30, stiffness: 200 })

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const percent = (window.scrollY / docHeight) * 100
      raw.set(percent)
      setScrollPercent(percent)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [raw])

  return { scrollPercent, smooth }
}

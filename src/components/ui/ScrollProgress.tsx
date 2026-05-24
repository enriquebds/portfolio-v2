'use client'

import { useEffect, useState } from 'react'
import { useMotionValue, useSpring, motion } from 'framer-motion'

export function ScrollProgress() {
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
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [raw])

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 h-[2px] origin-left"
      style={{ width: `${scrollPercent}%`, backgroundColor: '#00C896', scaleX: smooth }}
    />
  )
}

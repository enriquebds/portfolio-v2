'use client'

import { motion } from 'framer-motion'
import { useScrollProgress } from './useScrollProgress'

export function ScrollProgress() {
  const { scrollPercent, smooth } = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 h-[2px] origin-left"
      style={{
        width: `${scrollPercent}%`,
        backgroundColor: '#00C896',
        scaleX: smooth,
      }}
    />
  )
}

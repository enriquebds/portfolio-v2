'use client'

import { motion } from 'framer-motion'
import { useCustomCursor } from './useCustomCursor'

export function CustomCursor() {
  const { isVisible, isPointer, isMobile, mouseX, mouseY, springX, springY } = useCustomCursor()

  if (isMobile) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
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

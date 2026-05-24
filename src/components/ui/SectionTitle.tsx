'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainerVariants } from '@/utils/constants'
import { useInView } from '@/hooks/useInView'

interface SectionTitleProps {
  id?: string
  title: string
  accent: string
  subtitle?: string
}

export function SectionTitle({ id, title, accent, subtitle }: SectionTitleProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>} variants={staggerContainerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-16">
      <motion.span variants={fadeUpVariants} className="font-mono text-sm block mb-2" style={{ color: '#00C896' }}>{accent}</motion.span>
      <motion.h2 id={id} variants={fadeUpVariants} className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text)]">{title}</motion.h2>
      {subtitle && <motion.p variants={fadeUpVariants} className="font-body text-[var(--muted)] mt-4 max-w-2xl">{subtitle}</motion.p>}
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { MemoryGameBoard } from '@/components/ui/MemoryGameBoard'
import { fadeUpVariants, staggerContainerVariants } from '@/utils/constants'
import { useInView } from '@/hooks/useInView'

export function MemoryGame() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  return (
    <section id="game" aria-labelledby="game-heading" className="py-24 md:py-32 bg-[var(--card)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref as React.RefObject<HTMLDivElement>} variants={staggerContainerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-12">
          <motion.span variants={fadeUpVariants} className="font-mono text-sm block mb-2" style={{ color: '#00C896' }}>// break time</motion.span>
          <motion.h2 id="game-heading" variants={fadeUpVariants} className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text)] mb-2">
            $ play <span style={{ color: '#00C896' }}>--while-you-browse</span>
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="font-body text-[var(--muted)] max-w-xl mx-auto mt-4">
            Todo dev merece uma pausa. Teste a memória combinando os pares de tecnologias — se você errar as stacks, não se preocupa, acontece com o melhor de nós.
          </motion.p>
        </motion.div>
        <motion.div variants={fadeUpVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.2 }}>
          <MemoryGameBoard />
        </motion.div>
      </div>
    </section>
  )
}

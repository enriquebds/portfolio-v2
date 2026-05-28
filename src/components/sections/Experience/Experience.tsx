'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { staggerContainerVariants } from '@/utils/constants'
import type { ExperienceItem } from '@/types'
import { ExperienceCard } from './ExperienceCard'
import { useExperience } from './useExperience'

export function Experience({ experiences }: { experiences: ExperienceItem[] }) {
  const { ref, isInView } = useExperience()

  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          id="experience-heading"
          title="Experiência"
          accent="// experience"
          subtitle="Minha trajetória profissional construindo produtos digitais de alto impacto."
        />
        <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
          <motion.div
            className="absolute left-[5px] top-0 w-[1px] origin-top"
            style={{
              background: 'linear-gradient(to bottom, #00C896, transparent)',
            }}
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

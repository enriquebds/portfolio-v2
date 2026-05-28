'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/utils/constants'
import type { ExperienceItem } from '@/types'
import { useExperienceCard } from './useExperienceCard'

interface ExperienceCardProps {
  exp: ExperienceItem
  index: number
}

export function ExperienceCard({ exp, index }: ExperienceCardProps) {
  const { ref, isInView, formattedStart, formattedEnd } = useExperienceCard(exp)

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 md:pl-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{
          delay: index * 0.1 + 0.2,
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
        className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-accent bg-[var(--bg)]"
        style={{ borderColor: '#00C896' }}
      />
      <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-accent/40 transition-colors group">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display font-bold text-lg text-[var(--text)] group-hover:text-accent transition-colors">
              {exp.role}
            </h3>
            <p className="font-body text-[var(--muted)] text-sm">{exp.company}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs" style={{ color: '#00C896' }}>
              {formattedStart} — {formattedEnd}
            </p>
            {exp.location && (
              <p className="font-mono text-xs text-[var(--muted)] mt-0.5">{exp.location}</p>
            )}
            {exp.current && (
              <span
                className="inline-flex items-center gap-1 font-mono text-[10px] mt-1"
                style={{ color: '#00C896' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: '#00C896' }}
                />
                atual
              </span>
            )}
          </div>
        </div>
        {exp.bullets.length > 0 && (
          <ul className="mb-4 space-y-1.5">
            {exp.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2 text-sm font-body text-[var(--muted)]">
                <span className="flex-shrink-0 mt-0.5" style={{ color: '#00C896' }}>
                  ▹
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
        {exp.stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {exp.stack.map(tech => (
              <span
                key={tech}
                className="font-mono text-[10px] px-2 py-0.5 rounded"
                style={{
                  backgroundColor: 'rgba(0,200,150,0.1)',
                  color: '#00C896',
                  border: '1px solid rgba(0,200,150,0.2)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

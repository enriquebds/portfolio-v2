'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { cardVariants, staggerContainerVariants } from '@/utils/constants'
import type { CertificationItem } from '@/types'
import { useCertifications } from './useCertifications'

export function Certifications({ certifications }: { certifications: CertificationItem[] }) {
  const { ref, isInView, certs, degrees } = useCertifications(certifications)

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          id="certifications-heading"
          title="Formação"
          accent="// education"
          subtitle="Certificações e formação acadêmica."
        />
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <div>
            <motion.h3
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-mono text-sm mb-6"
              style={{ color: '#00C896' }}
            >
              // certificações
            </motion.h3>
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-3"
            >
              {certs.map(cert => (
                <motion.div
                  key={cert.id}
                  variants={cardVariants}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-accent/40 transition-colors group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-body font-medium text-sm text-[var(--text)] group-hover:text-accent transition-colors">
                        {cert.issuer}
                      </p>
                      <p className="font-mono text-xs text-[var(--muted)] mt-0.5">
                        {cert.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {cert.date && (
                        <span className="font-mono text-[10px] text-[var(--muted)]">
                          {cert.date}
                        </span>
                      )}
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver credencial: ${cert.title}`}
                          className="font-mono text-[10px] hover:underline"
                          style={{ color: '#00C896' }}
                        >
                          ↗
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div>
            <motion.h3
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-mono text-sm mb-6"
              style={{ color: '#00C896' }}
            >
              // formação acadêmica
            </motion.h3>
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-3"
            >
              {degrees.map(deg => (
                <motion.div
                  key={deg.id}
                  variants={cardVariants}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-accent/40 transition-colors group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-body font-medium text-sm text-[var(--text)] group-hover:text-accent transition-colors">
                        {deg.title}
                      </p>
                      <p className="font-mono text-xs text-[var(--muted)] mt-0.5">{deg.issuer}</p>
                    </div>
                    {deg.date && (
                      <span className="font-mono text-[10px] text-[var(--muted)] flex-shrink-0">
                        {deg.date}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

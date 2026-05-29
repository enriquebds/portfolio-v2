'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { cardVariants, staggerContainerVariants } from '@/utils/constants'
import { useInView } from '@/hooks/useInView'
import type { ProjectItem } from '@/types'
import { useTranslations } from 'next-intl'

function ProjectCard({ project }: { project: ProjectItem; index: number }) {
  const t = useTranslations('projects')
  const isComingSoon = project.status === 'coming-soon'
  return (
    <motion.article
      variants={cardVariants}
      className="relative rounded-2xl border overflow-hidden group transition-all bg-[var(--card)] border-[var(--border)] hover:border-accent/40"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      aria-label={t('ariaProject', { title: project.title })}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4 gap-3">
          <div>
            <h3 className="font-display font-bold text-lg text-[var(--text)] group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            {project.description && (
              <p className="font-body text-sm text-[var(--muted)] mt-1 leading-relaxed">
                {project.description}
              </p>
            )}
          </div>
          <span
            className="flex-shrink-0 font-mono text-[10px] px-2.5 py-1 rounded-full border"
            style={
              isComingSoon
                ? {
                    color: '#F5A623',
                    borderColor: 'rgba(245,166,35,0.3)',
                    backgroundColor: 'rgba(245,166,35,0.1)',
                  }
                : {
                    color: '#00C896',
                    borderColor: 'rgba(0,200,150,0.3)',
                    backgroundColor: 'rgba(0,200,150,0.1)',
                  }
            }
          >
            {isComingSoon ? t('comingSoon') : t('published')}
          </span>
        </div>
        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--border)] text-[var(--muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-3">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('ariaCode', { title: project.title })}
              className="flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] hover:text-accent transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {t('code')}
            </a>
          ) : (
            <span className="font-mono text-xs text-[var(--muted)] opacity-40">
              {isComingSoon ? t('comingSoonCode') : t('codeUnavailable')}
            </span>
          )}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('ariaDemo', { title: project.title })}
              className="font-mono text-xs transition-colors"
              style={{ color: '#00C896' }}
            >
              ↗ demo
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}

export function Projects({ projects }: { projects: ProjectItem[] }) {
  const t = useTranslations('projects')
  const { ref, isInView } = useInView({ threshold: 0.05 })
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 md:py-32 bg-[var(--card)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          id="projects-heading"
          title={t('title')}
          accent={t('accent')}
          subtitle={t('subtitle')}
        />
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

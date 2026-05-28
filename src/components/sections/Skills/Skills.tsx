'use client'

import { motion } from 'framer-motion'
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiReactrouter,
  SiStyledcomponents,
  SiVite,
  SiVitest,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPostgresql,
  SiGraphql,
  SiDocker,
  SiGit,
  SiFigma,
} from 'react-icons/si'
import { DiCss3, DiW3C } from 'react-icons/di'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { TechBadge } from '@/components/ui/TechBadge'
import { staggerContainerVariants, fadeUpVariants } from '@/utils/constants'
import type { SkillItem } from '@/types'
import { useSkills } from './useSkills'

const ICON_MAP: Record<string, React.ReactNode> = {
  SiReact: <SiReact />,
  SiTypescript: <SiTypescript />,
  SiJavascript: <SiJavascript />,
  SiRedux: <SiRedux />,
  SiZustand: <SiReact />,
  SiStyledcomponents: <SiStyledcomponents />,
  SiReactrouter: <SiReactrouter />,
  SiVite: <SiVite />,
  SiVitest: <SiVitest />,
  DiCss3: <DiCss3 />,
  DiW3C: <DiW3C />,
  SiLighthouse: <SiReact />,
  SiNodedotjs: <SiNodedotjs />,
  SiNestjs: <SiNestjs />,
  SiExpress: <SiExpress />,
  SiPostgresql: <SiPostgresql />,
  SiOpenapiinitiative: <SiReact />,
  SiGraphql: <SiGraphql />,
  SiDocker: <SiDocker />,
  SiGithubactions: <SiGit />,
  SiGit: <SiGit />,
  SiGithub: <SiGit />,
  SiJira: <SiReact />,
  SiFigma: <SiFigma />,
}

interface SkillsProps {
  skills: SkillItem[]
}

export function Skills({ skills }: SkillsProps) {
  const { ref, isInView, groupedCategories } = useSkills(skills)

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          id="skills-heading"
          title="Stack"
          accent="// skills"
          subtitle="Tecnologias e ferramentas que uso no dia a dia."
        />

        <div ref={ref as React.RefObject<HTMLDivElement>} className="space-y-12">
          {groupedCategories.map(group => (
            <div key={group.key}>
              <motion.h3
                variants={fadeUpVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="font-mono text-sm text-accent mb-4"
              >
                {group.label.toLowerCase()}
              </motion.h3>
              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="flex flex-wrap gap-2"
              >
                {group.skills.map(skill => (
                  <motion.div key={skill.id} variants={fadeUpVariants}>
                    <TechBadge
                      name={skill.name}
                      icon={skill.icon ? ICON_MAP[skill.icon] : undefined}
                      level={skill.level}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

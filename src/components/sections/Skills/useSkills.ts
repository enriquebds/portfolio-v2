'use client'

import { useMemo } from 'react'
import { useInView } from '@/hooks/useInView'
import type { SkillItem } from '@/types'

const CATEGORIES = ['frontend', 'backend', 'devops', 'softskills'] as const

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  devops: 'Ferramentas & DevOps',
  softskills: 'Soft Skills',
}

export const useSkills = (skills: SkillItem[]) => {
  const { ref, isInView } = useInView({ threshold: 0.05 })

  const groupedCategories = useMemo(
    () =>
      CATEGORIES.map(category => ({
        key: category,
        label: CATEGORY_LABELS[category],
        skills: skills.filter(s => s.category === category),
      })).filter(group => group.skills.length > 0),
    [skills],
  )

  return { ref, isInView, groupedCategories }
}

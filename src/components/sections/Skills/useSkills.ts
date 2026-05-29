'use client'

import { useMemo } from 'react'
import { useInView } from '@/hooks/useInView'
import type { SkillItem } from '@/types'

const CATEGORIES = ['frontend', 'backend', 'devops', 'softskills'] as const

export const useSkills = (skills: SkillItem[]) => {
  const { ref, isInView } = useInView({ threshold: 0.05 })

  const groupedCategories = useMemo(
    () =>
      CATEGORIES.map(category => ({
        key: category,
        skills: skills.filter(s => s.category === category),
      })).filter(group => group.skills.length > 0),
    [skills],
  )

  return { ref, isInView, groupedCategories }
}

'use client'

import { useInView } from '@/hooks/useInView'
import type { ExperienceItem } from '@/types'

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return 'Presente'
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
}

export const useExperienceCard = (exp: ExperienceItem) => {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return {
    ref,
    isInView,
    formattedStart: formatDate(exp.startDate),
    formattedEnd: formatDate(exp.endDate),
  }
}

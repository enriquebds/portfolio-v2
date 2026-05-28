'use client'

import { useInView } from '@/hooks/useInView'

export const useExperience = () => {
  const { ref, isInView } = useInView({ threshold: 0.05 })

  return { ref, isInView }
}

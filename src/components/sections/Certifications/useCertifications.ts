'use client'

import { useMemo } from 'react'
import { useInView } from '@/hooks/useInView'
import type { CertificationItem } from '@/types'

export const useCertifications = (certifications: CertificationItem[]) => {
  const { ref, isInView } = useInView({ threshold: 0.05 })

  const { certs, degrees } = useMemo(
    () => ({
      certs: certifications.filter(c => c.type === 'certification'),
      degrees: certifications.filter(c => c.type === 'degree'),
    }),
    [certifications],
  )

  return { ref, isInView, certs, degrees }
}

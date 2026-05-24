'use client'

import { useState, useEffect } from 'react'

export interface UseScrollSpyReturn {
  activeSection: string
}

export function useScrollSpy(sectionIds: string[], threshold = 0.4): UseScrollSpyReturn {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold, rootMargin: '-10% 0px -50% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach(obs => obs.disconnect())
  }, [sectionIds, threshold])

  return { activeSection }
}

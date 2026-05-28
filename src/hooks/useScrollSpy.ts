'use client'

import { useState, useEffect } from 'react'

export interface UseScrollSpyReturn {
  activeSection: string
}

export function useScrollSpy(sectionIds: string[]): UseScrollSpyReturn {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const compute = () => {
      const elements = sectionIds
        .map(id => ({ id, el: document.getElementById(id) }))
        .filter((s): s is { id: string; el: HTMLElement } => s.el !== null)
      if (elements.length === 0) return

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) {
        setActiveSection(elements[elements.length - 1].id)
        return
      }

      const refY = window.innerHeight * 0.3
      let active = elements[0].id
      for (const { id, el } of elements) {
        if (el.getBoundingClientRect().top <= refY) active = id
        else break
      }
      setActiveSection(active)
    }

    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)

    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [sectionIds])

  return { activeSection }
}

'use client'

import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useEffect, useState } from 'react'

const SECTION_IDS = [
  'hero',
  'about',
  'experience',
  'projects',
  'skills',
  'game',
  'certifications',
  'contact',
]

export const useHeader = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { activeSection } = useScrollSpy(SECTION_IDS)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return {
    scrolled,
    mobileOpen,
    activeSection,
    setMobileOpen,
    handleNavClick,
  }
}

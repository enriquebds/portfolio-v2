'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const LOCALES = ['pt-BR', 'en-US'] as const
export type SwitcherLocale = (typeof LOCALES)[number]

const LOCALE_META: Record<SwitcherLocale, { flag: string; short: string; label: string }> = {
  'pt-BR': { flag: '🇧🇷', short: 'PT', label: 'Português' },
  'en-US': { flag: '🇺🇸', short: 'EN', label: 'English' },
}

function readCurrentLocale(): SwitcherLocale {
  if (typeof document === 'undefined') return 'pt-BR'
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/)
  const val = match?.[1]
  return val === 'en-US' ? 'en-US' : 'pt-BR'
}

export function useLocaleSwitcher() {
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState<SwitcherLocale>('pt-BR')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentLocale(readCurrentLocale())
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const switchTo = useCallback(
    (locale: SwitcherLocale) => {
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`
      setCurrentLocale(locale)
      setIsOpen(false)
      router.refresh()
    },
    [router],
  )

  return { currentLocale, isOpen, setIsOpen, switchTo, containerRef, locales: LOCALES, LOCALE_META }
}

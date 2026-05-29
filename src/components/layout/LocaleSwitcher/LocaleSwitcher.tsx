'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useLocaleSwitcher } from './useLocaleSwitcher'

export function LocaleSwitcher() {
  const { theme } = useTheme()
  const { currentLocale, isOpen, setIsOpen, switchTo, containerRef, locales, LOCALE_META } =
    useLocaleSwitcher()

  const current = LOCALE_META[currentLocale]

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="icon"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Mudar idioma"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 px-2"
      >
        <span aria-hidden="true">{current.flag}</span>
        <span className="font-mono text-xs hidden sm:block">{current.short}</span>
        <motion.svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <path d="M5 7L1 3h8L5 7z" />
        </motion.svg>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            aria-label="Seletor de idioma"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-[var(--border)] overflow-hidden shadow-lg z-50"
            style={{
              background: theme === 'dark' ? 'rgba(15,17,26,0.98)' : 'rgba(248,247,244,0.98)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {locales.map(locale => {
              const meta = LOCALE_META[locale]
              const isActive = locale === currentLocale
              return (
                <button
                  key={locale}
                  role="menuitem"
                  onClick={() => switchTo(locale)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 font-body text-sm transition-colors text-left"
                  style={{
                    color: isActive ? '#00C896' : 'var(--text)',
                    backgroundColor: isActive ? 'rgba(0,200,150,0.06)' : 'transparent',
                  }}
                  onMouseEnter={e => {
                    if (!isActive)
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        'rgba(0,200,150,0.04)'
                  }}
                  onMouseLeave={e => {
                    if (!isActive)
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
                  }}
                >
                  <span aria-hidden="true">{meta.flag}</span>
                  <span>{meta.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

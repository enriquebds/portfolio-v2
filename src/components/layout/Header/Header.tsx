'use client'

import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { useTheme } from '@/components/providers/ThemeProvider'
import { cn } from '@/utils/cn'
import { navLinks } from '@/utils/constants'
import { motion, AnimatePresence } from 'framer-motion'
import { useHeader } from './useHeader'

export function Header() {
  const { theme } = useTheme()
  const { scrolled, mobileOpen, activeSection, handleNavClick, setMobileOpen } = useHeader()

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-md border-b border-[var(--border)]'
          : 'border-b border-transparent',
      )}
      style={{
        background: scrolled
          ? theme === 'dark'
            ? 'rgba(15,17,26,0.85)'
            : 'rgba(248,247,244,0.85)'
          : 'transparent',
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 font-mono text-sm px-3 py-2 rounded-lg z-50"
        style={{ backgroundColor: '#00C896', color: '#0F111A' }}
      >
        Ir para conteúdo principal
      </a>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#hero"
          onClick={e => {
            e.preventDefault()
            handleNavClick('#hero')
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Logo />
        </motion.a>
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
          {navLinks.map(link => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={e => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative font-body text-sm px-3 py-2 rounded-lg transition-colors',
                  isActive ? 'text-accent' : 'text-[var(--muted)] hover:text-[var(--text)]',
                )}
                whileHover={{ y: -1 }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.a>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="icon"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            className="md:hidden"
          >
            <div className="w-5 flex flex-col gap-1">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-[2px] bg-[var(--text)] rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-[2px] bg-[var(--text)] rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-[2px] bg-[var(--text)] rounded-full"
              />
            </div>
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-[var(--border)]"
            style={{
              background: theme === 'dark' ? 'rgba(15,17,26,0.98)' : 'rgba(248,247,244,0.98)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <nav className="flex flex-col px-6 py-4 gap-1" aria-label="Menu mobile">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={e => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'font-body text-base py-3 px-3 rounded-lg transition-colors flex items-center gap-3',
                      isActive
                        ? 'text-accent bg-accent/5'
                        : 'text-[var(--text)] hover:text-accent hover:bg-accent/5',
                    )}
                  >
                    {isActive && <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />}
                    {link.label}
                  </motion.a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

'use client'

import { motion } from 'framer-motion'
import { CodeSnippet } from '@/components/ui/CodeSnippet'
import { useTypewriter } from '@/hooks/useTypewriter'
import { fadeUpVariants, staggerContainerVariants } from '@/utils/constants'

const ROLES = [
  'Front-end Engineer',
  'React Developer',
  'TypeScript Enthusiast',
  'UI/UX Craftsman',
  'B2B SaaS Builder',
]

const HERO_CODE = `import { useState, useEffect } from 'react'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce`

export function Hero() {
  const { displayText, isTyping } = useTypewriter({ strings: ROLES })

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.4,
        }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
            <motion.span
              variants={fadeUpVariants}
              className="font-mono text-sm mb-4 block"
              style={{ color: '#00C896' }}
            >
              $ whoami
            </motion.span>
            <motion.div variants={fadeUpVariants}>
              <p className="font-mono text-base text-[var(--muted)] mb-2">Olá, sou</p>
              <h1
                id="hero-heading"
                className="font-display text-6xl md:text-7xl xl:text-8xl font-extrabold leading-none text-[var(--text)]"
              >
                Enrique
                <br />
                <span style={{ color: '#00C896' }}>Barbosa</span>
              </h1>
            </motion.div>
            <motion.div variants={fadeUpVariants} className="mt-6 h-8 flex items-center">
              <span className="font-mono text-lg md:text-xl text-[var(--muted)]">
                {'> '}
                <span className="text-[var(--text)]">{displayText}</span>
                <motion.span
                  animate={{ opacity: isTyping ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                  className="inline-block w-[2px] h-5 ml-0.5 align-middle"
                  style={{ backgroundColor: '#00C896' }}
                />
              </span>
            </motion.div>
            <motion.div variants={fadeUpVariants} className="mt-5">
              <span
                className="inline-flex items-center gap-2 font-mono text-sm px-3 py-1.5 rounded-full border"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
              >
                <span>📍</span> São Paulo, Brasil · Híbrido ou Remoto
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: '#00C896' }}
                />
                <span className="text-xs" style={{ color: '#00C896' }}>
                  Disponível CLT/PJ
                </span>
              </span>
            </motion.div>
            <motion.div variants={fadeUpVariants} className="mt-8 flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Ver projetos"
                className="font-body font-semibold text-sm px-6 py-3 rounded-lg transition-all"
                style={{
                  backgroundColor: '#00C896',
                  color: '#0F111A',
                  boxShadow: '0 4px 20px rgba(0,200,150,0.3)',
                }}
              >
                Ver projetos
              </motion.a>
              <motion.a
                href="#contact"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Entrar em contato"
                className="font-body font-medium text-sm px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--text)] hover:border-accent transition-all"
              >
                Entrar em contato
              </motion.a>
            </motion.div>
            <motion.div variants={fadeUpVariants} className="mt-8 flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'B2B SaaS', 'AIoT'].map(tag => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2.5 py-1 rounded"
                  style={{
                    backgroundColor: 'rgba(0,200,150,0.1)',
                    color: '#00C896',
                    border: '1px solid rgba(0,200,150,0.2)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <CodeSnippet code={HERO_CODE} language="ts" floating className="max-w-md ml-auto" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-[var(--muted)]">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8"
            style={{
              background: 'linear-gradient(to bottom, #00C896, transparent)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

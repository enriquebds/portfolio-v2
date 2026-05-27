'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { CodeSnippet } from '@/components/ui/CodeSnippet'
import { Logo } from '@/components/ui/Logo'
import { useInView } from '@/hooks/useInView'
import { fadeUpVariants, fadeRightVariants, staggerContainerVariants } from '@/utils/constants'

const ABOUT_CODE = `function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj.map(deepClone) as unknown as T
  }
  return Object.fromEntries(
    Object.entries(obj as object).map(
      ([key, value]) => [key, deepClone(value)]
    )
  ) as T
}

export { deepClone }`

const stats = [
  { value: '3+', label: 'anos de experiência', icon: '🗓' },
  { value: 'B2B SaaS', label: 'especialidade', icon: '🚀' },
  { value: '20+', label: 'custom hooks', icon: '⚙️' },
  { value: '3', label: 'plataformas produção', icon: '🏗' },
]

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.15 })
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle id="about-heading" title="Sobre mim" accent="// about" subtitle="Desenvolvedor front-end apaixonado por criar experiências digitais de alta qualidade." />
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div variants={staggerContainerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            <motion.div variants={fadeUpVariants} className="mb-8 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-2xl text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00C896 0%, #0091ff 100%)', boxShadow: '0 8px 24px rgba(0,200,150,0.3)' }}><Logo variant="monogram" /></div>
              <div>
                <p className="font-display font-semibold text-[var(--text)]">Enrique Barbosa</p>
                <p className="font-mono text-sm" style={{ color: '#00C896' }}>@enriquebds</p>
              </div>
            </motion.div>
            <motion.p variants={fadeUpVariants} className="font-body text-[var(--muted)] leading-relaxed text-base mb-4">Sou um desenvolvedor front-end com <strong className="text-[var(--text)]">mais de 3 anos de experiência</strong> construindo interfaces rápidas, acessíveis e escaláveis. Atuo principalmente no ecossistema React + TypeScript, com foco em soluções <strong className="text-[var(--text)]">B2B SaaS</strong>, AIoT e smart cities.</motion.p>
            <motion.p variants={fadeUpVariants} className="font-body text-[var(--muted)] leading-relaxed text-base mb-4">Na Group Link One, contribuo para o desenvolvimento de plataformas de monitoramento em tempo real para cidades inteligentes, integrando dispositivos IoT com dashboards modernos e mapas interativos.</motion.p>
            <motion.p variants={fadeUpVariants} className="font-body text-[var(--muted)] leading-relaxed text-base mb-8">Além do código, me interessa arquitetura frontend, developer experience e criar uma cultura de qualidade no time.</motion.p>
            <motion.div variants={staggerContainerVariants} className="grid grid-cols-2 gap-3">
              {stats.map(stat => (
                <motion.div key={stat.value} variants={fadeUpVariants} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]" whileHover={{ y: -2, borderColor: '#00C896' }} transition={{ duration: 0.2 }}>
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <p className="font-display font-bold text-xl text-[var(--text)]">{stat.value}</p>
                  <p className="font-body text-xs text-[var(--muted)]">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div variants={fadeRightVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.2 }}>
            <CodeSnippet code={ABOUT_CODE} language="ts" floating />
            <motion.div variants={fadeUpVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.4 }} className="mt-6 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <p className="font-mono text-xs text-[var(--muted)] mb-2">// disponibilidade</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: '#00C896' }} />
                <span className="font-body text-sm text-[var(--text)]">Aberto a oportunidades <strong>CLT ou PJ</strong> · Híbrido ou Remoto</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

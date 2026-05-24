'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { staggerContainerVariants, fadeUpVariants } from '@/utils/constants'
import { useInView } from '@/hooks/useInView'

const CONTACT_ITEMS = [
  { label: 'Email', value: 'enrique.barbosasilva@gmail.com', href: 'mailto:enrique.barbosasilva@gmail.com', icon: '✉', display: 'enrique.barbosasilva@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/enriquebds', href: 'https://linkedin.com/in/enriquebds', icon: '🔗', display: '/in/enriquebds' },
  { label: 'GitHub', value: 'github.com/enriquebds', href: 'https://github.com/enriquebds', icon: '⌥', display: '/enriquebds' },
  { label: 'Telefone', value: '+55 11 97552-0983', href: 'tel:+5511975520983', icon: '📱', display: '+55 11 97552-0983' },
]

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value
    const body = `Olá Enrique,\n\nMeu nome é ${name} (${email}).\n\n${message}`
    window.location.href = `mailto:enrique.barbosasilva@gmail.com?subject=Contato via portfólio&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 md:py-32 bg-[var(--card)]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle id="contact-heading" title="Contato" accent="// contact" subtitle="Aberto a oportunidades CLT ou PJ · Híbrido ou Remoto. Vamos conversar?" />
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div variants={staggerContainerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="space-y-4">
            {CONTACT_ITEMS.map(item => (
              <motion.a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} variants={fadeUpVariants} aria-label={`${item.label}: ${item.value}`} className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-accent/40 transition-all group" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <span className="text-2xl w-10 text-center flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-mono text-xs text-[var(--muted)]">{item.label}</p>
                  <p className="font-body text-sm text-[var(--text)] group-hover:text-accent transition-colors">{item.display}</p>
                </div>
                <span className="ml-auto text-[var(--muted)] group-hover:text-accent transition-colors text-lg">↗</span>
              </motion.a>
            ))}
            <motion.div variants={fadeUpVariants} className="mt-6 p-4 rounded-xl" style={{ border: '1px solid rgba(0,200,150,0.2)', backgroundColor: 'rgba(0,200,150,0.05)' }}>
              <p className="font-mono text-xs mb-1" style={{ color: '#00C896' }}>// disponibilidade</p>
              <p className="font-body text-sm text-[var(--text)]">Aberto a oportunidades <strong>CLT ou PJ</strong> — Híbrido ou Remoto · São Paulo, SP</p>
            </motion.div>
          </motion.div>
          <motion.form onSubmit={handleSubmit} variants={staggerContainerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="space-y-4" aria-label="Formulário de contato">
            {[{name:'name',label:'Nome',type:'text',placeholder:'Seu nome'},{name:'email',label:'Email',type:'email',placeholder:'seu@email.com'}].map(field => (
              <motion.div key={field.name} variants={fadeUpVariants}>
                <label htmlFor={field.name} className="block font-mono text-xs text-[var(--muted)] mb-1.5">// {field.label.toLowerCase()}</label>
                <input id={field.name} name={field.name} type={field.type} required placeholder={field.placeholder} className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] font-body text-sm placeholder:text-[var(--muted)] focus:outline-none focus:border-accent transition-colors" />
              </motion.div>
            ))}
            <motion.div variants={fadeUpVariants}>
              <label htmlFor="message" className="block font-mono text-xs text-[var(--muted)] mb-1.5">// mensagem</label>
              <textarea id="message" name="message" required rows={5} placeholder="Sua mensagem..." className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] font-body text-sm placeholder:text-[var(--muted)] focus:outline-none focus:border-accent transition-colors resize-none" />
            </motion.div>
            <motion.button type="submit" variants={fadeUpVariants} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} aria-label="Enviar mensagem" className="w-full font-body font-semibold text-sm px-6 py-3.5 rounded-xl transition-all" style={{ backgroundColor: '#00C896', color: '#0F111A', boxShadow: '0 4px 20px rgba(0,200,150,0.3)' }}>Enviar mensagem ↗</motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

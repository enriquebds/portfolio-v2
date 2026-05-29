'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { staggerContainerVariants, fadeUpVariants } from '@/utils/constants'
import { CONTACT_ITEMS, FORM_FIELDS } from '../constants'
import { useContact } from './useContact'
import { useTranslations } from 'next-intl'

export function Contact() {
  const t = useTranslations('contact')
  const { ref, isInView, register, errors, isSubmitting, isBusy, onSubmit, serverState } =
    useContact()

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 md:py-32 bg-[var(--card)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          id="contact-heading"
          title={t('title')}
          accent={t('accent')}
          subtitle={t('subtitle')}
        />
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-4"
          >
            {CONTACT_ITEMS.map(item => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                variants={fadeUpVariants}
                aria-label={`${item.label}: ${item.value}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-accent/40 transition-all group"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-2xl w-10 text-center flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-mono text-xs text-[var(--muted)]">{item.label}</p>
                  <p className="font-body text-sm text-[var(--text)] group-hover:text-accent transition-colors">
                    {item.display}
                  </p>
                </div>
                <span className="ml-auto text-[var(--muted)] group-hover:text-accent transition-colors text-lg">
                  ↗
                </span>
              </motion.a>
            ))}
            <motion.div
              variants={fadeUpVariants}
              className="mt-6 p-4 rounded-xl"
              style={{
                border: '1px solid rgba(0,200,150,0.2)',
                backgroundColor: 'rgba(0,200,150,0.05)',
              }}
            >
              <p className="font-mono text-xs mb-1" style={{ color: '#00C896' }}>
                {t('availabilityComment')}
              </p>
              <p className="font-body text-sm text-[var(--text)]">
                {t.rich('availabilityText', {
                  strong: chunks => <strong>{chunks}</strong>,
                })}
              </p>
            </motion.div>
          </motion.div>
          <motion.form
            onSubmit={onSubmit}
            noValidate
            variants={staggerContainerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-4"
            aria-label={t('formLabel')}
          >
            {FORM_FIELDS.map(field => {
              const fieldError = errors[field.name]?.message
              return (
                <motion.div key={field.name} variants={fadeUpVariants}>
                  <label
                    htmlFor={field.name}
                    className="block font-mono text-xs text-[var(--muted)] mb-1.5"
                  >
                    // {t(`${field.name}Label`).toLowerCase()}
                  </label>
                  <input
                    id={field.name}
                    type={field.type}
                    placeholder={t(`${field.name}Placeholder`)}
                    aria-invalid={!!fieldError}
                    aria-describedby={fieldError ? `${field.name}-error` : undefined}
                    {...register(field.name)}
                    className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg)] text-[var(--text)] font-body text-sm placeholder:text-[var(--muted)] focus:outline-none transition-colors ${fieldError ? 'border-red-400 focus:border-red-400' : 'border-[var(--border)] focus:border-accent'}`}
                  />
                  {fieldError && (
                    <p id={`${field.name}-error`} className="mt-1.5 font-mono text-xs text-red-400">
                      {fieldError}
                    </p>
                  )}
                </motion.div>
              )
            })}
            <motion.div variants={fadeUpVariants}>
              <label
                htmlFor="message"
                className="block font-mono text-xs text-[var(--muted)] mb-1.5"
              >
                // {t('messageLabel')}
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder={t('messagePlaceholder')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                {...register('message')}
                className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg)] text-[var(--text)] font-body text-sm placeholder:text-[var(--muted)] focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-400 focus:border-red-400' : 'border-[var(--border)] focus:border-accent'}`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 font-mono text-xs text-red-400">
                  {errors.message.message}
                </p>
              )}
            </motion.div>

            {serverState.status !== 'idle' && serverState.message && (
              <motion.p
                variants={fadeUpVariants}
                role="status"
                aria-live="polite"
                className={`font-mono text-xs ${serverState.status === 'success' ? 'text-accent' : 'text-red-400'}`}
              >
                {serverState.status === 'success' ? '✓ ' : '// '}
                {serverState.message}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={isBusy}
              variants={fadeUpVariants}
              aria-label={t('submit')}
              className="w-full"
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

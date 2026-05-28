'use client'

import { EMAIL } from '@/constants'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Enrique Barbosa &mdash; built with{' '}
          <span style={{ color: '#00C896' }}>Next.js</span> +{' '}
          <span style={{ color: '#00C896' }}>Payload CMS</span>
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/enriquebds"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="font-mono text-xs text-[var(--muted)] hover:text-accent transition-colors"
          >
            github
          </a>
          <a
            href="https://linkedin.com/in/enriquebds"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="font-mono text-xs text-[var(--muted)] hover:text-accent transition-colors"
          >
            linkedin
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="font-mono text-xs text-[var(--muted)] hover:text-accent transition-colors"
          >
            email
          </a>
        </div>
      </div>
    </footer>
  )
}

import { cn } from '@/utils/cn'

/** Fonte única da marca — mudar aqui reflete em todo o app (e no favicon: public/icon.svg). */
const BRAND = 'BDS'
const ACCENT = '#00C896'

type LogoVariant = 'wordmark' | 'tag' | 'monogram'

interface LogoProps {
  /** `wordmark` (BDS.) | `tag` (<BDS./>) | `monogram` (apenas BDS, herda cor do container). */
  variant?: LogoVariant
  className?: string
}

const Accent = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: ACCENT }}>{children}</span>
)

export function Logo({ variant = 'wordmark', className }: LogoProps) {
  // Monograma não carrega tipografia própria: herda cor/tamanho do container (ex: avatar com gradiente).
  if (variant === 'monogram') {
    return <span className={className}>{BRAND}</span>
  }

  return (
    <span
      className={cn(
        'font-display font-bold text-2xl text-[var(--text)] hover:text-accent transition-colors',
        className,
      )}
    >
      {variant === 'tag' && <Accent>{'<'}</Accent>}
      {BRAND}
      <Accent>.</Accent>
      {variant === 'tag' && <Accent>{'/>'}</Accent>}
    </span>
  )
}

'use client'

import { motion, type HTMLMotionProps, type TargetAndTransition } from 'framer-motion'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon'
export type ButtonSize = 'sm' | 'md'

interface VariantProps {
  variant?: ButtonVariant
  size?: ButtonSize
}

type ButtonProps = HTMLMotionProps<'button'> & VariantProps
type ButtonLinkProps = HTMLMotionProps<'a'> & VariantProps

// backgroundColor/border são inline porque o reset `body.frontend button`
// (globals.css) ganha em especificidade dos utilitários do Tailwind.
const VARIANT_STYLE: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#00C896',
    color: '#0F111A',
    boxShadow: '0 4px 20px rgba(0,200,150,0.3)',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--text)',
    border: '1px solid var(--border)',
  },
  ghost: {
    color: 'var(--muted)',
  },
  icon: {
    color: 'var(--text)',
  },
}

const PRIMARY_DISABLED_STYLE: React.CSSProperties = {
  backgroundColor: 'var(--muted)',
  color: 'var(--card)',
  boxShadow: 'none',
  cursor: 'default',
}

const SIZE_CLASSES: Record<ButtonVariant, Record<ButtonSize, string>> = {
  primary: { sm: 'px-5 py-2', md: 'px-6 py-3' },
  secondary: { sm: 'px-5 py-2', md: 'px-6 py-3' },
  ghost: { sm: '', md: '' },
  icon: { sm: 'w-8 h-8', md: 'w-9 h-9' },
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'font-body font-semibold text-sm',
  secondary: 'font-body font-semibold text-sm',
  ghost: 'font-body text-sm',
  icon: 'hover:bg-black/5 dark:hover:bg-white/10',
}

const VARIANT_HOVER: Record<ButtonVariant, TargetAndTransition | undefined> = {
  primary: { scale: 1.02, y: -1 },
  secondary: { scale: 1.02, y: -1, borderColor: '#00C896' },
  ghost: { color: '#00C896' },
  icon: undefined,
}

const VARIANT_TAP: Record<ButtonVariant, TargetAndTransition | undefined> = {
  primary: { scale: 0.98 },
  secondary: { scale: 0.98 },
  ghost: undefined,
  icon: undefined,
}

const BASE_CLASSES = 'rounded-xl transition-all inline-flex items-center justify-center'

const resolveStyle = (variant: ButtonVariant, disabled: boolean): React.CSSProperties =>
  disabled && variant === 'primary' ? PRIMARY_DISABLED_STYLE : VARIANT_STYLE[variant]

const resolveClasses = (
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
  className?: string,
) =>
  cn(
    BASE_CLASSES,
    SIZE_CLASSES[variant][size],
    VARIANT_CLASSES[variant],
    disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
    className,
  )

export function Button({
  className,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  style,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : VARIANT_HOVER[variant]}
      whileTap={disabled ? undefined : VARIANT_TAP[variant]}
      className={resolveClasses(variant, size, disabled, className)}
      style={{ ...resolveStyle(variant, disabled), ...style }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export function ButtonLink({
  className,
  variant = 'primary',
  size = 'md',
  style,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <motion.a
      whileHover={VARIANT_HOVER[variant]}
      whileTap={VARIANT_TAP[variant]}
      className={resolveClasses(variant, size, false, className)}
      style={{ ...resolveStyle(variant, false), ...style }}
      {...props}
    >
      {children}
    </motion.a>
  )
}

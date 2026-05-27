'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

type ButtonProps = HTMLMotionProps<'button'>

// Fundo via `style` inline porque o reset `body.frontend button` (globals.css)
// tem especificidade maior que utilitários `bg-*` do Tailwind.
const ENABLED_STYLE: React.CSSProperties = {
  backgroundColor: '#00C896',
  color: '#0F111A',
  boxShadow: '0 4px 20px rgba(0,200,150,0.3)',
}

const DISABLED_STYLE: React.CSSProperties = {
  backgroundColor: 'var(--muted)',
  color: 'var(--card)',
  boxShadow: 'none',
  cursor: 'default'
}

export function Button({ className, type = 'button', disabled = false, style, children, ...props }: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={cn(
        'font-body font-semibold text-sm px-6 py-3.5 rounded-xl transition-all',
        disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
        className,
      )}
      style={{ ...(disabled ? DISABLED_STYLE : ENABLED_STYLE), ...style }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

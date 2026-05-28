'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'

type Level = 'avancado' | 'intermediario' | 'basico'

interface TechBadgeProps {
  name: string
  icon?: React.ReactNode
  level?: Level
  className?: string
}

const LEVEL_LABEL: Record<Level, string> = {
  avancado: 'Avançado',
  intermediario: 'Intermediário',
  basico: 'Básico',
}
const LEVEL_DOTS: Record<Level, number> = {
  avancado: 3,
  intermediario: 2,
  basico: 1,
}
const LEVEL_COLOR: Record<Level, string> = {
  avancado: '#00C896',
  intermediario: '#F5A623',
  basico: '#6B7280',
}

export function TechBadge({ name, icon, level, className }: TechBadgeProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      className={cn(
        'relative flex items-center gap-2 px-3 py-2 rounded-lg cursor-default select-none bg-[var(--card)] border border-[var(--border)]',
        className,
      )}
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        boxShadow: hovered ? '0 4px 16px rgba(0,200,150,0.15)' : '0 1px 4px var(--shadow)',
        borderColor: hovered ? '#00C896' : 'var(--border)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      {icon && (
        <span
          className="text-lg flex-shrink-0"
          style={{
            color: hovered ? '#00C896' : 'var(--muted)',
            transition: 'color 0.2s',
          }}
        >
          {icon}
        </span>
      )}
      <span className="font-body text-sm font-medium text-[var(--text)] whitespace-nowrap">
        {name}
      </span>
      <AnimatePresence>
        {hovered && level && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20"
          >
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-md px-2.5 py-1.5 shadow-lg whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <span
                  className="font-mono text-xs font-medium"
                  style={{ color: LEVEL_COLOR[level] }}
                >
                  {LEVEL_LABEL[level]}
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3].map(dot => (
                    <div
                      key={dot}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor:
                          dot <= LEVEL_DOTS[level] ? LEVEL_COLOR[level] : 'var(--border)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiDocker,
  SiGit,
  SiVite,
  SiPostgresql,
  SiGraphql,
  SiNestjs,
} from 'react-icons/si'
import { Logo } from '@/components/ui/Logo'
import type { Card } from '@/types'
import { useCardTile } from './useCardTile'

const TECH_ICONS: Record<string, React.ReactNode> = {
  React: <SiReact className="w-8 h-8" style={{ color: '#61DAFB' }} />,
  TypeScript: <SiTypescript className="w-8 h-8" style={{ color: '#3178C6' }} />,
  JavaScript: <SiJavascript className="w-8 h-8" style={{ color: '#F7DF1E' }} />,
  NodeJS: <SiNodedotjs className="w-8 h-8" style={{ color: '#339933' }} />,
  Docker: <SiDocker className="w-8 h-8" style={{ color: '#2496ED' }} />,
  Git: <SiGit className="w-8 h-8" style={{ color: '#F05032' }} />,
  Vite: <SiVite className="w-8 h-8" style={{ color: '#646CFF' }} />,
  PostgreSQL: <SiPostgresql className="w-8 h-8" style={{ color: '#4169E1' }} />,
  GraphQL: <SiGraphql className="w-8 h-8" style={{ color: '#E10098' }} />,
  NestJS: <SiNestjs className="w-8 h-8" style={{ color: '#E0234E' }} />,
}

interface CardTileProps {
  card: Card
  onClick: (id: number) => void
}

export function CardTile({ card, onClick }: CardTileProps) {
  const { prefersReduced, handleClick, handleKeyDown, isRevealed, ariaLabel } = useCardTile({
    card,
    onClick,
  })

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: '600px', aspectRatio: '1' }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      aria-pressed={isRevealed}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center border border-[var(--border)] bg-[var(--card)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {!card.isFlipped && <Logo variant="tag" />}
        </div>
        <div
          className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1 border ${card.isMatched ? 'border-accent/40 bg-accent/5' : 'border-[var(--border)] bg-[var(--card)]'}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {TECH_ICONS[card.techName]}
          <span className="font-mono text-[10px] text-[var(--muted)]">{card.techName}</span>
        </div>
      </motion.div>
    </div>
  )
}

'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SiReact, SiTypescript, SiJavascript, SiNodedotjs, SiDocker, SiGit, SiVite, SiPostgresql, SiGraphql, SiNestjs } from 'react-icons/si'
import { useMemoryGame } from '@/components/sections/MemoryGame/useMemoryGame'
import { Logo } from '@/components/ui/Logo'
import type { Card } from '@/types'

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

function CardTile({ card, onClick }: { card: Card; onClick: (id: number) => void }) {
  const prefersReduced = useReducedMotion()
  return (
    <div className="relative cursor-pointer" style={{ perspective: '600px', aspectRatio: '1' }} onClick={() => onClick(card.id)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(card.id) }} tabIndex={0} role="button" aria-label={card.isFlipped || card.isMatched ? card.techName : 'Carta virada'} aria-pressed={card.isFlipped || card.isMatched}>
      <motion.div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }} transition={prefersReduced ? { duration: 0 } : { duration: 0.4, ease: [0.22,1,0.36,1] }}>
        <div className="absolute inset-0 rounded-xl flex items-center justify-center border border-[var(--border)] bg-[var(--card)]" style={{ backfaceVisibility: 'hidden' }}>
          {!card.isFlipped && <Logo variant="tag" />}
        </div>
        <div className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1 border ${card.isMatched ? 'border-accent/40 bg-accent/5' : 'border-[var(--border)] bg-[var(--card)]'}`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          {TECH_ICONS[card.techName]}
          <span className="font-mono text-[10px] text-[var(--muted)]">{card.techName}</span>
        </div>
      </motion.div>
    </div>
  )
}

export function MemoryGameBoard() {
  const { cards, attempts, time, gameState, handleCardClick, startGame, resetGame, bestScore } = useMemoryGame()
  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6 font-mono text-sm">
        <div className="flex gap-6">
          <span className="text-[var(--muted)]">tentativas: <span style={{ color: '#00C896' }} className="font-bold">{attempts}</span></span>
          <span className="text-[var(--muted)]">tempo: <span className="text-[var(--text)] font-bold">{fmt(time)}</span></span>
        </div>
        {bestScore !== null && <span className="text-[var(--muted)] text-xs">melhor: <span style={{ color: '#F5A623' }} className="font-bold">{bestScore}</span></span>}
      </div>
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {cards.map(card => <CardTile key={card.id} card={card} onClick={handleCardClick} />)}
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <button onClick={resetGame} className="font-mono text-xs text-[var(--muted)] hover:text-accent transition-colors flex items-center gap-2">↺ reiniciar</button>
        {gameState === 'idle' && (
          <button onClick={startGame} className="font-body font-semibold text-sm px-5 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#00C896', color: '#0F111A' }}>
            ▶ começar
          </button>
        )}
        {gameState === 'preview' && <span className="font-mono text-xs animate-pulse" style={{ color: '#00C896' }}>memorize as cartas...</span>}
      </div>
      <AnimatePresence>
        {gameState === 'won' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="mt-8 p-6 rounded-2xl text-center" style={{ border: '1px solid rgba(0,200,150,0.3)', backgroundColor: 'rgba(0,200,150,0.05)' }}>
            <p className="font-display font-bold text-2xl text-[var(--text)] mb-1">🎉 Você venceu!</p>
            <p className="font-mono text-sm text-[var(--muted)] mb-4">{attempts} tentativas · {fmt(time)}</p>
            <button onClick={resetGame} className="font-body font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors" style={{ backgroundColor: '#00C896', color: '#0F111A' }}>Jogar novamente</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

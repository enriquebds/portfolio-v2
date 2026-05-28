'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { CardTile } from './CardTile/CardTile'
import { useMemoryGameBoard } from './useMemoryGameBoard'

export function MemoryGameBoard() {
  const {
    cards,
    attempts,
    gameState,
    handleCardClick,
    startGame,
    resetGame,
    bestScore,
    formattedTime,
  } = useMemoryGameBoard()

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6 font-mono text-sm">
        <div className="flex gap-6">
          <span className="text-[var(--muted)]">
            tentativas:{' '}
            <span style={{ color: '#00C896' }} className="font-bold">
              {attempts}
            </span>
          </span>
          <span className="text-[var(--muted)]">
            tempo: <span className="text-[var(--text)] font-bold">{formattedTime}</span>
          </span>
        </div>
        {bestScore !== null && (
          <span className="text-[var(--muted)] text-xs">
            melhor:{' '}
            <span style={{ color: '#F5A623' }} className="font-bold">
              {bestScore}
            </span>
          </span>
        )}
      </div>
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {cards.map(card => (
          <CardTile key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={resetGame}
          className="font-mono text-xs flex items-center gap-2"
        >
          ↺ reiniciar
        </Button>
        {gameState === 'idle' && (
          <Button size="sm" onClick={startGame}>
            ▶ começar
          </Button>
        )}
        {gameState === 'preview' && (
          <span className="font-mono text-xs animate-pulse" style={{ color: '#00C896' }}>
            memorize as cartas...
          </span>
        )}
      </div>
      <AnimatePresence>
        {gameState === 'won' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-8 p-6 rounded-2xl text-center"
            style={{
              border: '1px solid rgba(0,200,150,0.3)',
              backgroundColor: 'rgba(0,200,150,0.05)',
            }}
          >
            <p className="font-display font-bold text-2xl text-[var(--text)] mb-1">
              🎉 Você venceu!
            </p>
            <p className="font-mono text-sm text-[var(--muted)] mb-4">
              {attempts} tentativas · {formattedTime}
            </p>
            <Button onClick={resetGame}>Jogar novamente</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

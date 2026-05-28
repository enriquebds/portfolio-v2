'use client'

import { useReducedMotion } from 'framer-motion'
import type { KeyboardEvent } from 'react'
import type { Card } from '@/types'

interface UseCardTileParams {
  card: Card
  onClick: (id: number) => void
}

export const useCardTile = ({ card, onClick }: UseCardTileParams) => {
  const prefersReduced = useReducedMotion()

  const handleClick = () => onClick(card.id)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') onClick(card.id)
  }

  const isRevealed = card.isFlipped || card.isMatched
  const ariaLabel = isRevealed ? card.techName : 'Carta virada'

  return { prefersReduced, handleClick, handleKeyDown, isRevealed, ariaLabel }
}

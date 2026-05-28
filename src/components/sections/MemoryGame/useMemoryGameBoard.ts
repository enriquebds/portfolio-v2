'use client'

import { useMemoryGame } from './useMemoryGame'

const formatTime = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export const useMemoryGameBoard = () => {
  const game = useMemoryGame()

  return {
    ...game,
    formattedTime: formatTime(game.time),
  }
}

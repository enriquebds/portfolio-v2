export interface ExperienceItem {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string | null
  location: string
  bullets: string[]
  stack: string[]
  current: boolean
  order: number
}

export interface ProjectItem {
  id: string
  title: string
  slug: string
  description: string
  stack: string[]
  githubUrl?: string
  liveUrl?: string
  thumbnail?: string
  status: 'published' | 'coming-soon' | 'draft'
  featured: boolean
  order: number
}

export interface CertificationItem {
  id: string
  title: string
  issuer: string
  type: 'certification' | 'degree'
  date: string
  credentialUrl?: string
  order: number
}

export interface SkillItem {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'devops' | 'softskills'
  level: 'avancado' | 'intermediario' | 'basico'
  icon: string
  order: number
}

export interface Card {
  id: number
  pairId: number
  techName: string
  isFlipped: boolean
  isMatched: boolean
}

export type GameState = 'idle' | 'preview' | 'playing' | 'won'

export interface UseMemoryGameReturn {
  cards: Card[]
  attempts: number
  time: number
  gameState: GameState
  handleCardClick: (id: number) => void
  startGame: () => void
  resetGame: () => void
  bestScore: number | null
}

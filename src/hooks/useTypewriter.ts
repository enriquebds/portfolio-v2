'use client'

import { useState, useEffect, useRef } from 'react'

interface UseTypewriterOptions {
  strings: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export interface UseTypewriterReturn {
  displayText: string
  isTyping: boolean
}

export function useTypewriter({
  strings,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (strings.length === 0) return
    const currentString = strings[currentIndex]
    const tick = () => {
      if (!isDeleting) {
        if (charIndex < currentString.length) {
          setDisplayText(currentString.slice(0, charIndex + 1))
          setCharIndex(prev => prev + 1)
          setIsTyping(true)
          timeoutRef.current = setTimeout(tick, typingSpeed)
        } else {
          setIsTyping(false)
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentString.slice(0, charIndex - 1))
          setCharIndex(prev => prev - 1)
          setIsTyping(true)
          timeoutRef.current = setTimeout(tick, deletingSpeed)
        } else {
          setIsDeleting(false)
          setCurrentIndex(prev => (prev + 1) % strings.length)
          setIsTyping(false)
        }
      }
    }
    timeoutRef.current = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [charIndex, isDeleting, currentIndex, strings, typingSpeed, deletingSpeed, pauseDuration])

  return { displayText, isTyping }
}

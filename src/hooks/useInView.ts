'use client'

import { useState, useEffect, useRef } from 'react'

interface UseInViewOptions {
  threshold?: number
  triggerOnce?: boolean
}

export interface UseInViewReturn {
  ref: React.RefObject<HTMLElement | null>
  isInView: boolean
}

export function useInView({
  threshold = 0.1,
  triggerOnce = true,
}: UseInViewOptions = {}): UseInViewReturn {
  const ref = useRef<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.unobserve(el)
  }, [threshold, triggerOnce])

  return { ref, isInView }
}

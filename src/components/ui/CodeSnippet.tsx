'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CodeSnippetProps {
  code: string
  language?: string
  floating?: boolean
  className?: string
}

function tokenize(code: string) {
  const tokens: Array<{ type: string; value: string }> = []
  const patterns = [
    { type: 'comment', regex: /^(\/\/.*|\/\*[\s\S]*?\*\/)/ },
    { type: 'keyword', regex: /^(import|export|from|function|const|let|var|return|if|else|typeof|null|undefined|true|false|default|new|class|extends|async|await|of|in|for|while|do|try|catch|finally|throw|type|interface|enum)\b/ },
    { type: 'string', regex: /^(['"` + '`' + `])(?:(?!\1)[^\\]|\\.)*\1/ },
    { type: 'type', regex: /^[A-Z][A-Za-z0-9]*/ },
    { type: 'function', regex: /^[a-z_$][a-zA-Z0-9_$]*(?=\s*[(<])/ },
    { type: 'number', regex: /^\d+(\.\d+)?/ },
    { type: 'punctuation', regex: /^[{}[\]().,;:<>=!&|+\-*/\\?]/ },
    { type: 'whitespace', regex: /^\s+/ },
    { type: 'text', regex: /^[^\s{}[\]().,;:<>=!&|+\-*/\\?` + '`' + `'"]+/ },
  ]
  for (const line of code.split('\n')) {
    let remaining = line
    while (remaining.length > 0) {
      let matched = false
      for (const { type, regex } of patterns) {
        const match = remaining.match(regex)
        if (match) { tokens.push({ type, value: match[0] }); remaining = remaining.slice(match[0].length); matched = true; break }
      }
      if (!matched) { tokens.push({ type: 'text', value: remaining[0] }); remaining = remaining.slice(1) }
    }
    tokens.push({ type: 'newline', value: '\n' })
  }
  return tokens
}

const TOKEN_COLORS: Record<string, string> = {
  comment: '#6A9955', keyword: '#569CD6', string: '#CE9178', type: '#4EC9B0',
  function: '#DCDCAA', number: '#B5CEA8', punctuation: '#D4D4D4', text: '#D4D4D4',
}

export function CodeSnippet({ code, language = 'tsx', floating = false, className }: CodeSnippetProps) {
  const tokens = tokenize(code)
  let lineNumber = 1
  const elements: React.ReactNode[] = []
  let currentLine: React.ReactNode[] = []

  const pushLine = () => {
    elements.push(
      <div key={`l${lineNumber}`} className="flex group hover:bg-white/5">
        <span className="select-none w-10 shrink-0 text-right pr-4 font-mono text-xs opacity-30" style={{ color: '#858585' }}>{lineNumber}</span>
        <span className="flex-1 font-mono text-xs leading-6">{currentLine}</span>
      </div>
    )
    lineNumber++; currentLine = []
  }

  for (const token of tokens) {
    if (token.type === 'newline') { pushLine() } else {
      currentLine.push(<span key={`${lineNumber}-${currentLine.length}`} style={{ color: TOKEN_COLORS[token.type] || '#D4D4D4' }}>{token.value}</span>)
    }
  }
  if (currentLine.length > 0) pushLine()

  const filename = language === 'tsx' ? 'component.tsx' : language === 'ts' ? 'utils.ts' : `file.${language}`

  const content = (
    <div className={cn('rounded-xl overflow-hidden shadow-2xl', className)} style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ background: '#2D2D2D', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
        <span className="ml-3 font-mono text-xs opacity-30 text-white">{filename}</span>
      </div>
      <div className="p-4 overflow-x-auto"><div className="min-w-0">{elements}</div></div>
    </div>
  )

  if (floating) {
    return (
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        {content}
      </motion.div>
    )
  }
  return content
}

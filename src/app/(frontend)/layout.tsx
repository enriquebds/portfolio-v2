'use client'

import { useTheme } from '@/hooks/useTheme'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/cursor/CustomCursor/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress/ScrollProgress'
import '@/styles/globals.css'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <title>Enrique Barbosa — Front-end Engineer</title>
        <meta
          name="description"
          content="Portfólio de Enrique Barbosa, Front-end Engineer especializado em React, TypeScript e B2B SaaS."
        />
      </head>
      <body className="frontend">
        <CustomCursor />
        <ScrollProgress />
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

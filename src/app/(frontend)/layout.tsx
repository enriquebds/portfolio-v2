import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/cursor/CustomCursor/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress/ScrollProgress'
import '@/styles/globals.css'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
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
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <CustomCursor />
            <ScrollProgress />
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

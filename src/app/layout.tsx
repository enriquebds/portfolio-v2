import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export const metadata: Metadata = {
  title: 'Enrique Barbosa — Front-end Engineer',
  description:
    'Portfólio de Enrique Barbosa, Front-end Engineer especializado em React, TypeScript e B2B SaaS.',
  icons: {
    icon: '/icon.svg',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="frontend">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

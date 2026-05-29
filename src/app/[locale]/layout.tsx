import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/cursor/CustomCursor/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress/ScrollProgress'
import '@/styles/globals.css'

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}

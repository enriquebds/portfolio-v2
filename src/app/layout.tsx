import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enrique Barbosa — Front-end Engineer',
  description:
    'Portfólio de Enrique Barbosa, Front-end Engineer especializado em React, TypeScript e B2B SaaS.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

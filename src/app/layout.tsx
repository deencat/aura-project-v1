import './globals.css'
import type { Metadata } from 'next'
import { inter, playfair } from './fonts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceInitializer from '@/components/ServiceInitializer'

export const metadata: Metadata = {
  title: 'Aura - Tech-Forward Beauty',
  description: 'Advanced tech-forward beauty treatments and services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans">
        <ServiceInitializer />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 
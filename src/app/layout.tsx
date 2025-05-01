import './globals.css'
import type { Metadata } from 'next'
import { inter, playfair } from './fonts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceInitializer from '@/components/ServiceInitializer'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

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
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <body className="min-h-screen font-sans">
          <ServiceInitializer />
          <div className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
} 
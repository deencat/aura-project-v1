import './globals.css'
import type { Metadata } from 'next'
import { inter, playfair } from './fonts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceInitializer from '@/components/ServiceInitializer'
import {
  getClerkProvider as getCP,
  getSignInButton as getSIB,
  getSignUpButton as getSUB,
  getSignedIn as getSI,
  getSignedOut as getSO,
  getUserButton as getUB
} from '@/lib/auth-wrapper'

// Get the components based on environment
const ClerkProvider = getCP();
const SignInButton = getSIB();
const SignUpButton = getSUB();
const SignedIn = getSI();
const SignedOut = getSO();
const UserButton = getUB();

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
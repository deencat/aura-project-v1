import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { inter, playfair } from './fonts'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceInitializer from '@/components/ServiceInitializer'
import { LanguageProvider } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export const metadata: Metadata = {
  title: 'Aura - Tech-Forward Beauty',
  description: 'Advanced tech-forward beauty treatments and services',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#2563eb" }
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <body className="min-h-screen font-sans antialiased">
          <LanguageProvider>
          <ServiceInitializer />
          <header className="flex justify-end items-center p-4 gap-4 h-16">
              <LanguageSwitcher />
            <SignedOut>
              <SignInButton mode="modal" />
              <SignUpButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  )
} 
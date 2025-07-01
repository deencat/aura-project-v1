import { type Metadata } from 'next'
// Temporarily disabled Clerk until proper keys are configured
// import {
//   ClerkProvider,
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from '@clerk/nextjs'
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
    // Temporarily disabled ClerkProvider until proper keys are configured
    // <ClerkProvider
    //   appearance={{
    //     variables: { colorPrimary: "#2563eb" }
    //   }}
    //   signInUrl="/sign-in"
    //   signUpUrl="/sign-up"
    // >
      <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <body className="min-h-screen font-sans antialiased">
          <LanguageProvider>
          <ServiceInitializer />
          <header className="flex justify-end items-center p-4 gap-4 h-16">
              <LanguageSwitcher />
            {/* Temporarily disabled auth components */}
            {/* <SignedOut>
              <SignInButton mode="modal" />
              <SignUpButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn> */}
            {/* Temporary placeholder for auth area */}
            <div className="text-sm text-gray-500">Auth disabled</div>
          </header>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          </LanguageProvider>
        </body>
      </html>
    // </ClerkProvider>
  )
} 
import { Inter, Playfair_Display } from 'next/font/google'

// Load Inter font from Google Fonts
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Load Playfair Display font from Google Fonts
export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
}) 
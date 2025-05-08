import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aura Beauty',
  description: 'Luxury beauty treatments and services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-pink-600">
                  Aura Beauty
                </Link>
              </div>
              
              <div className="flex space-x-6">
                <Link href="/" className="text-gray-600 hover:text-pink-600">
                  Home
                </Link>
                <Link href="/treatments" className="text-gray-600 hover:text-pink-600">
                  Treatments
                </Link>
                <Link href="/image-examples" className="text-gray-600 hover:text-pink-600">
                  Image Examples
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-pink-600">
                  About
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-pink-600">
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        </header>
        
        <main>
          {children}
        </main>
        
        <footer className="bg-gray-100 mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Aura Beauty. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 
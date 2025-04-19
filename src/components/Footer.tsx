'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="Freshen Page" 
                width={32} 
                height={32} 
                className="mr-2"
              />
              <span className="text-lg font-serif font-bold">Freshen Page</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              We Care. We Beautify. Eternally. <br />
              永恆不變 持久美麗
            </p>
            <div className="mt-6 flex space-x-4">
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-primary hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </Link>
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-primary hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-primary hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-900">Premium Beauty Treatments</h3>
            <ul className="space-y-3">
              {[
                'Royal Black Scan',
                'Smooth Egg Skin',
                'Collagen Regeneration',
                '360 Smart Rescue',
                'Farewell Puffy Face',
                'Desert Skin Rescue'
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-900">Body Care Treatments</h3>
            <ul className="space-y-3">
              {[
                '2-in-1 Lymphatic Detox',
                'Breast Enhancement',
                'Milk Bubble Whitening',
                'Perfect Buttocks',
                'Full Body Hair Removal',
                'Stretch Mark Repair'
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-900">Contact Us</h3>
            <address className="not-italic">
              <div className="mb-3 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 mt-1 flex-shrink-0 text-gray-600"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">Main Store</p>
                  <p>7/F, Cameron Commercial Building,</p>
                  <p>18-20 Cameron Road, Tsim Sha Tsui</p>
                </div>
              </div>
              <div className="mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 flex-shrink-0 text-gray-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <p className="text-sm text-gray-600">+852 9831 3610</p>
              </div>
              <div className="mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 flex-shrink-0 text-gray-600"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
                <p className="text-sm text-gray-600">info@freshenpage.com</p>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-900">Opening Hours</p>
                <p className="text-sm text-gray-600">Monday - Saturday: 12:00 – 21:00</p>
              </div>
            </address>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="mt-12 rounded-xl bg-white p-6 shadow-sm md:p-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Subscribe to our newsletter</h3>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">Stay updated with our latest treatments and special offers.</p>
          </div>
          <div className="mt-6 flex flex-shrink-0 lg:mt-0">
            <div className="flex w-full max-w-md">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-l-full border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button className="rounded-r-full bg-primary px-4 text-white hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Freshen Page. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              {['Terms', 'Privacy Policy', 'Cookies'].map((item) => (
                <Link key={item} href="#" className="text-sm text-gray-500 hover:text-primary">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 
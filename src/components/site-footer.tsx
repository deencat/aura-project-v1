import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and About Section */}
          <div className="space-y-4">
            <Link href="/" className="font-serif text-2xl font-bold text-white">
              <span className="mr-1">Aura</span>
              <span className="text-primary">Beauty</span>
            </Link>
            <p className="mt-4 text-sm">
              Aura Beauty is dedicated to providing diverse, effective, and safe beauty treatments using the most advanced technology and techniques to help you achieve your beauty goals.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Main Navigation Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Our Treatments</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/treatments" className="hover:text-primary">
                  Premium Beauty Treatments
                </Link>
              </li>
              <li>
                <Link href="/body-care" className="hover:text-primary">
                  Body Care Treatments
                </Link>
              </li>
              <li>
                <Link href="/facial" className="hover:text-primary">
                  Facial Treatments
                </Link>
              </li>
              <li>
                <Link href="/facial-filters" className="hover:text-primary">
                  AI Facial Filters
                </Link>
              </li>
              <li>
                <Link href="/cell-beauty" className="hover:text-primary">
                  Cell Beauty Technology
                </Link>
              </li>
              <li>
                <Link href="/hair-care" className="hover:text-primary">
                  Hair Care Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Treatments Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Featured Treatments</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/treatments/royal-black-scan" className="hover:text-primary">
                  Royal Black Scan
                </Link>
              </li>
              <li>
                <Link href="/treatments/peeled-egg-skin" className="hover:text-primary">
                  Peeled Egg Skin
                </Link>
              </li>
              <li>
                <Link href="/facial-filters/youth-filter" className="hover:text-primary">
                  Youth Filter
                </Link>
              </li>
              <li>
                <Link href="/body-care/body-sculpting" className="hover:text-primary">
                  Body Sculpting
                </Link>
              </li>
              <li>
                <Link href="/cell-beauty/cell-rejuvenation" className="hover:text-primary">
                  Cell Rejuvenation
                </Link>
              </li>
              <li>
                <Link href="/hair-care/keratin-treatment" className="hover:text-primary">
                  Keratin Treatment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 mt-1 text-primary"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>123 Beauty Avenue<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-primary"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>info@aurabeauty.com</span>
              </li>
              <li className="pt-4">
                <Link href="/contact">
                  <Button className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90">
                    Book a Consultation
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Business Hours</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>10:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center md:items-end">
              <p>Subscribe to our newsletter for exclusive offers</p>
              <div className="mt-4 flex w-full max-w-md">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-l-full border-0 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="rounded-r-full bg-primary px-4 py-2 text-white hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Aura Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 
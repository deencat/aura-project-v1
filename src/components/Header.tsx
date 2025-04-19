'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Menu data with submenu structure based on EternalCareBeauty.com
const menuData = [
  { title: 'Home', href: '/' },
  { title: 'About Us', href: '/about' },
  {
    title: 'Premium Beauty Treatments',
    href: '/treatments',
    submenu: [
      { title: 'Royal Black Scan', href: '/treatments/royal-black-scan' },
      { title: 'Smooth Egg Skin', href: '/treatments/smooth-egg-skin' },
      { title: 'Collagen Regeneration', href: '/treatments/collagen-regeneration' },
      { title: '360 Smart Rescue', href: '/treatments/smart-rescue' },
      { title: 'Farewell Puffy Face', href: '/treatments/farewell-puffy' },
      { title: 'Desert Skin Rescue', href: '/treatments/desert-skin-rescue' },
      { title: 'Royal Porcelain Skin', href: '/treatments/porcelain-skin' },
      { title: 'Crystal Micro-Needling', href: '/treatments/crystal-needling' },
      { title: 'Zero Flaw Skin', href: '/treatments/zero-flaw-skin' },
      { title: 'Baby Face Contouring', href: '/treatments/baby-face' },
    ]
  },
  {
    title: 'Body Care Treatments',
    href: '/body-care',
    submenu: [
      { title: '2-in-1 Lymphatic Detox', href: '/body-care/lymphatic-detox' },
      { title: 'Breast Enhancement', href: '/body-care/breast-enhancement' },
      { title: 'Milk Bubble Whitening', href: '/body-care/milk-bubble' },
      { title: 'Perfect Buttocks', href: '/body-care/perfect-buttocks' },
      { title: 'Full Body Hair Removal', href: '/body-care/hair-removal' },
      { title: 'Stretch Mark Repair', href: '/body-care/stretch-mark' },
      { title: 'Collagen Whitening', href: '/body-care/collagen-whitening' },
    ]
  },
  {
    title: 'AI Facial Filters',
    href: '/ai-filters'
  },
  {
    title: 'Aura Whitening',
    href: '/whitening',
    submenu: [
      { title: 'Royal Black Scan', href: '/whitening/royal-black-scan' },
      { title: 'Milk Bubble Whitening', href: '/whitening/milk-bubble' },
      { title: 'Collagen Whitening', href: '/whitening/collagen-whitening' },
    ]
  },
  {
    title: 'Cell Beauty Science',
    href: '/cell-beauty',
    submenu: [
      { title: 'Baby Face Contouring', href: '/cell-beauty/baby-face' },
      { title: 'Stretch Mark Repair', href: '/cell-beauty/stretch-mark' },
    ]
  },
  { title: 'Special Offers', href: '/offers' },
  { title: 'Contact Us', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
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
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-6">
            {menuData.slice(0, 3).map((item) => (
              <li key={item.title} className="group relative">
                <Link 
                  href={item.href} 
                  className="text-sm font-medium hover:text-primary"
                >
                  {item.title}
                </Link>
                {item.submenu && (
                  <div className="absolute left-0 top-full z-10 mt-2 hidden min-w-[240px] rounded-md bg-white p-3 shadow-lg group-hover:block">
                    <ul className="space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.title}>
                          <Link 
                            href={subItem.href}
                            className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
            <li className="relative group">
              <Link href="#" className="text-sm font-medium hover:text-primary">
                More
              </Link>
              <div className="absolute right-0 top-full z-10 mt-2 hidden min-w-[200px] rounded-md bg-white p-3 shadow-lg group-hover:block">
                <ul className="space-y-1">
                  {menuData.slice(3).map((item) => (
                    <li key={item.title} className="group/submenu relative">
                      <Link 
                        href={item.href}
                        className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                      >
                        {item.title}
                        {item.submenu && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                          </span>
                        )}
                      </Link>
                      {item.submenu && (
                        <div className="absolute left-full top-0 z-10 ml-2 hidden min-w-[240px] rounded-md bg-white p-3 shadow-lg group-hover/submenu:block">
                          <ul className="space-y-1">
                            {item.submenu.map((subItem) => (
                              <li key={subItem.title}>
                                <Link 
                                  href={subItem.href}
                                  className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full text-gray-600 hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden rounded-full border-primary text-sm font-medium text-primary hover:bg-primary hover:text-white md:inline-flex"
          >
            Book Now
          </Button>
          
          <Button 
            size="sm" 
            className="hidden rounded-full bg-primary text-sm font-medium text-white hover:bg-primary/90 md:inline-flex"
          >
            Contact
          </Button>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-0 z-50 flex flex-col bg-white p-6 text-black transition-transform duration-300 lg:hidden",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-between">
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
          <button onClick={() => setMobileMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-10 flex-1 overflow-y-auto">
          <ul className="space-y-4">
            {menuData.map((item) => (
              <li key={item.title} className="border-b border-gray-100 pb-4">
                <Link 
                  href={item.href} 
                  className="text-base font-medium"
                  onClick={() => !item.submenu && setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
                {item.submenu && (
                  <ul className="mt-2 space-y-2 pl-4">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.title}>
                        <Link 
                          href={subItem.href}
                          className="text-sm text-gray-600 hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 flex flex-col gap-3">
          <Button 
            variant="outline" 
            className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white"
          >
            Book Now
          </Button>
          <Button 
            className="w-full rounded-full bg-primary text-white hover:bg-primary/90"
          >
            Contact
          </Button>
        </div>
      </div>
    </header>
  )
} 
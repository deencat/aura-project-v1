'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronDown, Menu, Search, X } from 'lucide-react'

// Menu data structure
const menuData = [
  { title: 'Home', href: '/' },
  { title: 'About Us', href: '/about' },
  {
    title: 'Premium Beauty',
    href: '/treatments',
    submenu: [
      { title: 'Royal Black Scan', href: '/treatments/royal-black-scan' },
      { title: 'Peeled Egg Skin', href: '/treatments/peeled-egg-skin' },
      { title: 'Collagen Regeneration', href: '/treatments/collagen-regeneration' },
      { title: '360 Smart Rescue', href: '/treatments/smart-rescue' },
      { title: 'Farewell Puffy Face', href: '/treatments/farewell-puffy' },
      { title: 'Ultimate Stemcell Hydrating Repair', href: '/treatments/ultimate-stemcell-hydrating-repair' },
      { title: 'Ceramic Skin Renewal', href: '/treatments/ceramic-skin-renewal' },
      { title: 'Mole, Wart & Skin Growth Removal', href: '/treatments/mole-wart-removal' },
      { title: 'Radiant Defense Synergy Treatment', href: '/treatments/radiant-defense-synergy' },
      { title: 'New Doublo™', href: '/treatments/new-doublo' },
    ]
  },
  {
    title: 'Body Care',
    href: '/body-care',
    submenu: [
      { title: '2-in-1 Lymphatic Detox', href: '/body-care/lymphatic-detox' },
      { title: 'Breast Enhancement', href: '/body-care/breast-enhancement' },
      { title: 'Perfect Buttocks', href: '/body-care/perfect-buttocks' },
      { title: 'Full Body Hair Removal', href: '/body-care/hair-removal' },
      { title: 'Stretch Mark Repair', href: '/body-care/stretch-mark' },
      { title: 'Collagen Whitening', href: '/body-care/collagen-whitening' },
    ]
  },
  {
    title: 'AI Facial',
    href: '/ai-filters'
  },
  {
    title: 'Aura Whitening',
    href: '/whitening',
    submenu: [
      { title: 'Royal Black Scan', href: '/whitening/royal-black-scan' },
      { title: 'Collagen Whitening', href: '/whitening/collagen-whitening' },
    ]
  },
  {
    title: 'Cell Beauty',
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
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  const handleMouseEnter = (title: string) => {
    setActiveSubmenu(title)
  }

  const handleMouseLeave = () => {
    setActiveSubmenu(null)
  }

  return (
    <header className="w-full bg-white">
      {/* Top Bar */}
      <div className="hidden border-b border-gray-100 py-2 text-xs text-gray-600 lg:block">
        <div className="container mx-auto flex justify-end px-4">
          <div className="flex items-center gap-6">
            <a href="tel:+85212345678" className="hover:text-primary">
              Call: +852 1234 5678
            </a>
            <a href="mailto:info@freshenpage.com" className="hover:text-primary">
              Email: info@freshenpage.com
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.svg" 
              alt="Freshen Page" 
              width={40} 
              height={40} 
              className="mr-2"
            />
            <span className="text-xl font-serif font-bold">
              <span>Freshen</span>
              <span className="text-primary"> Page</span>
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-1">
            {menuData.map((item) => (
              <li 
                key={item.title} 
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  href={item.href} 
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium transition-colors",
                    "hover:text-primary"
                  )}
                >
                  {item.title}
                  {item.submenu && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Link>
                
                {item.submenu && activeSubmenu === item.title && (
                  <div className="absolute left-0 top-full z-50 mt-1 min-w-[220px] origin-top-left rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 transition duration-200">
                    <div className="py-1">
                      {item.submenu.map((subItem) => (
                        <Link 
                          key={subItem.title}
                          href={subItem.href}
                          className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-primary">
            <Search className="h-5 w-5" />
          </button>
          
          <Link href="/contact" className="hidden md:block">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full border-primary text-sm font-medium text-primary hover:bg-primary hover:text-white"
            >
              Book Now
            </Button>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-white transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
            <Image 
              src="/logo.svg" 
              alt="Freshen Page" 
              width={32} 
              height={32} 
              className="mr-2"
            />
            <span className="text-lg font-serif font-bold">
              <span>Freshen</span>
              <span className="text-primary"> Page</span>
            </span>
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav>
            <ul className="space-y-1 px-4">
              {menuData.map((item) => (
                <li key={item.title} className="border-b border-gray-100 py-2">
                  <Link
                    href={item.href}
                    className="block py-2 text-base font-medium"
                    onClick={() => !item.submenu && setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                  
                  {item.submenu && (
                    <ul className="mt-2 space-y-1 pl-4">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.href}
                            className="block py-2 text-sm text-gray-600 hover:text-primary"
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
        </div>
        
        <div className="border-t border-gray-100 p-4">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-full bg-primary py-2 text-center text-white hover:bg-primary/90"
            >
              Book Now
            </Link>
            <div className="flex justify-between text-sm text-gray-600">
              <a href="tel:+85212345678" className="hover:text-primary">
                Call: +852 1234 5678
              </a>
              <a href="mailto:info@freshenpage.com" className="hover:text-primary">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 
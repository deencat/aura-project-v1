'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronDown, Menu, Search, X, Phone, Mail, Facebook, Instagram } from 'lucide-react'

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
    ]
  },
  {
    title: 'New Doublo',
    href: '/new-doublo',
    submenu: [
      { title: 'Sculpt & Lift', href: '/new-doublo/sculpt-lift' },
      { title: 'V-Line Perfection', href: '/new-doublo/v-line' },
      { title: 'Youth Revival', href: '/new-doublo/youth-revival' },
      { title: 'Neck Rejuvenation', href: '/new-doublo/neck-rejuvenation' },
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
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (title: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current)
    }
    setActiveSubmenu(title)
  }

  const handleMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null)
    }, 300)
  }

  useEffect(() => {
    return () => {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar with contact info and social media */}
      <div className="bg-primary text-white py-2 text-sm">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+85212345678" className="flex items-center gap-1 hover:opacity-80 transition">
              <Phone className="h-3 w-3" />
              <span>+852 1234 5678</span>
            </a>
            <a href="mailto:info@freshenpage.com" className="flex items-center gap-1 hover:opacity-80 transition">
              <Mail className="h-3 w-3" />
              <span>info@freshenpage.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-80 transition" aria-label="Facebook">
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a href="#" className="hover:opacity-80 transition" aria-label="Instagram">
              <Instagram className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
              <span>Aura</span>
              <span className="text-primary"> Beauty</span>
            </span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Book button and search for mobile */}
        <div className="hidden md:flex lg:hidden items-center gap-4">
          <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/contact">
            <Button 
              size="sm" 
              className="rounded-full bg-primary hover:bg-primary/90 text-white"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Desktop Navigation - Full width bar style like EstheClinic */}
      <nav className="hidden lg:block bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between">
            {menuData.map((item) => (
              <li 
                key={item.title} 
                className="relative group"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  href={item.href} 
                  className={cn(
                    "flex items-center px-3 py-4 text-sm font-medium transition-colors whitespace-nowrap",
                    "hover:text-primary relative"
                  )}
                >
                  {item.title}
                  {item.submenu && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                  {/* Hover underline effect */}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                
                {item.submenu && activeSubmenu === item.title && (
                  <div className="absolute left-0 top-full z-50 mt-0 min-w-[240px] bg-white shadow-lg py-3 border-t-2 border-primary">
                    {item.submenu.map((subItem) => (
                      <Link 
                        key={subItem.title}
                        href={subItem.href}
                        className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary whitespace-nowrap"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li className="relative flex items-center">
              <button className="p-2 text-gray-600 hover:text-primary">
                <Search className="h-5 w-5" />
              </button>
              <Link href="/contact">
                <Button 
                  className="ml-4 rounded-full bg-primary hover:bg-primary/90 text-white"
                >
                  Book Now
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
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
              <span>Aura</span>
              <span className="text-primary"> Beauty</span>
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
              {menuData.map((item) => {
                const [isOpen, setIsOpen] = useState(false);
                return (
                  <li key={item.title} className="border-b border-gray-100 py-2">
                    <div className="flex justify-between items-center">
                      <Link
                        href={item.href}
                        className="block py-2 text-base font-medium"
                        onClick={() => !item.submenu && setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                      {item.submenu && (
                        <button
                          onClick={() => setIsOpen(!isOpen)}
                          className="p-2 text-gray-600"
                        >
                          <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    
                    {item.submenu && isOpen && (
                      <ul className="mt-2 space-y-1 pl-4 border-l-2 border-gray-100">
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
                );
              })}
            </ul>
          </nav>
        </div>
        
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <a href="tel:+85212345678" className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>+852 1234 5678</span>
            </a>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          <Link href="/contact" className="w-full">
            <Button 
              className="w-full rounded-full bg-primary hover:bg-primary/90 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 
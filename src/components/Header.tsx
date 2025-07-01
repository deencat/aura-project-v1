'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronDown, Menu, Search, X, Phone, Mail, Facebook, Instagram } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// Menu data structure with translation keys
const menuData = [
  { title: 'Home', titleKey: 'home', href: '/' },
  { title: 'About Us', titleKey: 'about', href: '/about' },
  {
    title: 'Premium Beauty',
    titleKey: 'premium_beauty',
    href: '/treatments',
    submenu: [
      { title: 'Royal Black Scan', titleKey: 'royal_black_scan', href: '/treatments/royal-black-scan' },
      { title: 'Peeled Egg Skin', titleKey: 'peeled_egg_skin', href: '/treatments/peeled-egg-skin' },
      { title: 'Collagen Regeneration', titleKey: 'collagen_regeneration', href: '/treatments/collagen-regeneration' },
      { title: '360 Smart Rescue', titleKey: 'smart_rescue', href: '/treatments/smart-rescue' },
      { title: 'Farewell Puffy Face', titleKey: 'farewell_puffy', href: '/treatments/farewell-puffy' },
      { title: 'Ultimate Stemcell Hydrating Repair', titleKey: 'ultimate_stemcell', href: '/treatments/ultimate-stemcell-hydrating-repair' },
      { title: 'Ceramic Skin Renewal', titleKey: 'ceramic_skin', href: '/treatments/ceramic-skin-renewal' },
      { title: 'Mole, Wart & Skin Growth Removal', titleKey: 'mole_wart_removal', href: '/treatments/mole-wart-removal' },
      { title: 'Radiant Defense Synergy Treatment', titleKey: 'radiant_defense', href: '/treatments/radiant-defense-synergy' },
      { title: 'New Doublo™', titleKey: 'new_doublo', href: '/treatments/new-doublo' },
    ]
  },
  {
    title: 'Body Care',
    titleKey: 'body_care',
    href: '/body-care',
    submenu: [
      { title: '2-in-1 Lymphatic Detox', titleKey: 'lymphatic_detox', href: '/body-care/lymphatic-detox' },
      { title: 'Breast Enhancement', titleKey: 'breast_enhancement', href: '/body-care/breast-enhancement' },
      { title: 'Perfect Buttocks', titleKey: 'perfect_buttocks', href: '/body-care/perfect-buttocks' },
      { title: 'Full Body Hair Removal', titleKey: 'hair_removal', href: '/body-care/hair-removal' },
      { title: 'Stretch Mark Repair', titleKey: 'stretch_mark', href: '/body-care/stretch-mark' },
    ]
  },
  {
    title: 'New Doublo',
    titleKey: 'new_doublo',
    href: '/new-doublo',
    submenu: [
      { title: 'Sculpt & Lift', titleKey: 'sculpt_lift', href: '/new-doublo/sculpt-lift' },
      { title: 'V-Line Perfection', titleKey: 'v_line', href: '/new-doublo/v-line' },
      { title: 'Youth Revival', titleKey: 'youth_revival', href: '/new-doublo/youth-revival' },
      { title: 'Neck Rejuvenation', titleKey: 'neck_rejuvenation', href: '/new-doublo/neck-rejuvenation' },
    ]
  },
  {
    title: 'Cell Beauty',
    titleKey: 'cell_beauty',
    href: '/cell-beauty',
    submenu: [
      { title: 'Baby Face Contouring', titleKey: 'baby_face', href: '/cell-beauty/baby-face' },
      { title: 'Stretch Mark Repair', titleKey: 'stretch_mark', href: '/cell-beauty/stretch-mark' },
    ]
  },
  { title: 'Special Offers', titleKey: 'special_offers', href: '/offers' },
  { title: 'Contact Us', titleKey: 'contact', href: '/contact' },
]

export default function Header() {
  const [currentHover, setCurrentHover] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<string[]>([])
  const { t } = useLanguage()

  const handleMouseEnter = (title: string) => {
    setCurrentHover(title)
  }

  const handleMouseLeave = () => {
    setCurrentHover(null)
  }

  const toggleMobileSubmenu = (title: string) => {
    setOpenMobileSubmenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    )
  }

  const isMobileSubmenuOpen = (title: string) => {
    return openMobileSubmenus.includes(title)
  }

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50" data-testid="main-header">
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
              data-testid="header-book-now-tablet"
            >
              {t('book_now', 'Book Now')}
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
                  {t(item.titleKey, item.title)}
                  {item.submenu && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                  {/* Hover underline effect */}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                
                {item.submenu && currentHover === item.title && (
                  <div className="absolute left-0 top-full z-50 mt-0 min-w-[240px] bg-white shadow-lg py-3 border-t-2 border-primary">
                    {item.submenu.map((subItem) => (
                      <Link 
                        key={subItem.title}
                        href={subItem.href}
                        className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary whitespace-nowrap"
                      >
                        {t(subItem.titleKey, subItem.title)}
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
                  data-testid="header-book-now-desktop"
                >
                  {t('book_now', 'Book Now')}
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
              {menuData.map((item) => (
                <li key={item.title} className="border-b border-gray-100 py-2">
                  <div className="flex justify-between items-center">
                    <Link
                      href={item.href}
                      className="block py-2 text-base font-medium"
                      onClick={() => !item.submenu && setMobileMenuOpen(false)}
                    >
                      {t(item.titleKey, item.title)}
                    </Link>
                    
                    {item.submenu && (
                      <button
                        onClick={() => toggleMobileSubmenu(item.title)}
                        className="p-2 text-gray-600"
                      >
                        <ChevronDown 
                          className={cn(
                            "h-5 w-5 transition-transform",
                            isMobileSubmenuOpen(item.title) && "rotate-180"
                          )} 
                        />
                      </button>
                    )}
                  </div>
                  
                  {item.submenu && isMobileSubmenuOpen(item.title) && (
                    <div className="mt-2 pl-4 border-l border-gray-100">
                      {item.submenu.map((subItem) => (
                          <Link
                          key={subItem.title}
                            href={subItem.href}
                            className="block py-2 text-sm text-gray-600 hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                          {t(subItem.titleKey, subItem.title)}
                          </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="border-t border-gray-100 p-4">
          <Link href="/contact">
            <Button 
              className="w-full rounded-full bg-primary hover:bg-primary/90 text-white"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="header-book-now-mobile"
            >
              {t('book_now', 'Book Now')}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  ChevronDown,
  Menu,
  Search,
  X,
  Phone,
  Mail,
  Facebook,
  Instagram,
  ShoppingCart,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

/** Bilingual labels for desktop nav: Traditional Chinese / English (layout reference). */
const NAV_BILINGUAL: Record<string, { zh: string; en: string }> = {
  home: { zh: '主頁', en: 'Home' },
  about: { zh: '關於我們', en: 'About Us' },
  ai_concierge: { zh: 'AI 禮賓', en: 'AI Concierge' },
  premium_beauty: { zh: '尊貴美容', en: 'Premium Beauty' },
  body_care: { zh: '身體護理', en: 'Body Care' },
  new_doublo: { zh: 'New Doublo™', en: 'New Doublo™' },
  cell_beauty: { zh: '細胞美容', en: 'Cell Beauty' },
  special_offers: { zh: '最新優惠', en: 'Special Offers' },
  blog: { zh: '博客', en: 'Blog' },
  contact: { zh: '聯絡我們', en: 'Contact Us' },
}

// Menu data structure with translation keys
const menuData = [
  { title: 'Home', titleKey: 'home', href: '/' },
  { title: 'About Us', titleKey: 'about', href: '/about' },
  { title: 'AI Concierge', titleKey: 'ai_concierge', href: '/concierge' },
  {
    title: 'Premium Beauty',
    titleKey: 'premium_beauty',
    href: '/treatments',
    submenu: [
      { title: 'Royal Black Scan', titleKey: 'royal_black_scan', href: '/treatments/royal-black-scan' },
      { title: 'Peeled Egg Skin', titleKey: 'peeled_egg_skin', href: '/treatments/peeled-egg-skin' },
      { title: 'Collagen Regeneration', titleKey: 'collagen_regeneration', href: '/treatments/collagen-regeneration' },
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
    href: '/treatments/new-doublo',
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
  { title: 'Blog', titleKey: 'blog', href: '/blog' },
  { title: 'Contact Us', titleKey: 'contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname() || ''
  const [currentHover, setCurrentHover] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<string[]>([])
  const { t } = useLanguage()

  const linkIsActive = (href: string) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

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
    <header className="w-full bg-white shadow-sm sticky top-0 z-30" data-testid="main-header">
      {/* Top Bar with contact info and social media */}
      <div className="bg-primary text-white py-2 text-sm">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+85223646018" className="flex items-center gap-1 hover:opacity-80 transition">
              <Phone className="h-3 w-3" />
              <span>2364 6018 / 2300 1810</span>
            </a>
            <a href="mailto:info@swbeauty.hk" className="flex items-center gap-1 hover:opacity-80 transition">
              <Mail className="h-3 w-3" />
              <span>info@swbeauty.hk</span>
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
      
      {/* Main header: single row on lg+ (logo | nav | utilities); compact row below lg */}
      <div className="container mx-auto px-4">
        {/* Desktop / large screens — logo left, menu follows, icons + CTA right */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 py-4 min-h-[104px]">
          <Link href="/" className="shrink-0 flex items-center pr-2">
            <Image
              src="/scintillaworld-logo.transparent.png"
              alt="Scintillaworld"
              width={200}
              height={80}
              className="h-18 w-auto xl:h-20"
              priority
            />
          </Link>

          <nav className="flex-1 min-w-0 flex items-center border-l border-gray-100 pl-4 xl:pl-6">
            <ul
              className={cn(
                // Note: avoid overflow containers here; they clip absolute-positioned dropdown menus.
                'flex items-center gap-0.5 xl:gap-1 min-w-0'
              )}
            >
              {menuData.map((item) => {
                const active = linkIsActive(item.href)
                const pair = NAV_BILINGUAL[item.titleKey]
                return (
                  <li
                    key={item.title}
                    className="relative group shrink-0"
                    onMouseEnter={() => item.submenu && handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center px-2 xl:px-2.5 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                        'hover:text-primary relative',
                        active ? 'text-primary' : 'text-gray-800'
                      )}
                    >
                      {pair ? (
                        <span className="flex items-center gap-1 font-serif text-[11px] xl:text-xs tracking-tight">
                          <span className={cn(active ? 'text-primary' : 'text-gray-900')}>{pair.zh}</span>
                          <span className="hidden 2xl:inline text-gray-300 font-sans font-normal">/</span>
                          <span className={cn('hidden 2xl:inline', active ? 'text-primary' : 'text-gray-600')}>
                            {pair.en}
                          </span>
                        </span>
                      ) : (
                        t(item.titleKey, item.title)
                      )}
                      {item.submenu && <ChevronDown className="ml-0.5 h-4 w-4 shrink-0 opacity-70" />}
                      <span
                        className={cn(
                          'absolute bottom-0 left-2 right-2 h-0.5 bg-primary transition-transform origin-left',
                          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        )}
                      />
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
                )
              })}
            </ul>
          </nav>

          <div className="shrink-0 flex items-center gap-1 border-l border-gray-100 pl-3 xl:pl-5">
            <Link
              href="/offers"
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary"
              aria-label={t('special_offers', 'Special Offers')}
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <button
              type="button"
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link href="/contact" className="ml-1">
              <Button
                size="sm"
                className="rounded-full bg-primary hover:bg-primary/90 text-white px-3.5 xl:px-4"
                data-testid="header-book-now-desktop"
              >
                {t('book_now', 'Book Now')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Tablet & mobile — logo + wordmark, utilities, hamburger */}
        <div className="flex lg:hidden items-center justify-between py-3 gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <Image
              src="/scintillaworld-logo.transparent.png"
              alt="Scintillaworld"
              width={200}
              height={80}
              className="h-16 w-auto shrink-0"
              priority
            />
            <span className="text-lg font-serif font-bold truncate">
              <span>SW</span>
              <span className="text-primary"> Beauty</span>
            </span>
          </Link>

          <div className="flex items-center gap-1 shrink-0">
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
                aria-label="Search"
              >
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
            <button
              type="button"
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
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
              src="/scintillaworld-logo.transparent.png" 
              alt="Scintillaworld" 
              width={200} 
              height={80} 
              className="mr-2 h-8 w-auto"
              priority
            />
            <span className="text-lg font-serif font-bold">
              <span>SW</span>
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
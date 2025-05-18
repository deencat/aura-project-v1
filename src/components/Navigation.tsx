"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  
  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <span className="text-xl font-bold text-primary">Aura Beauty</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') 
                    ? 'text-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {t('home', 'Home')}
              </Link>
              
              <Link 
                href="/about" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/about') 
                    ? 'text-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {t('about', 'About Us')}
              </Link>
              
              <Link 
                href="/treatments" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/treatments') 
                    ? 'text-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {t('treatments', 'Treatments')}
              </Link>
              
              <Link 
                href="/blog" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/blog') 
                    ? 'text-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {t('blog', 'Blog')}
              </Link>
              
              <Link 
                href="/testimonials" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/testimonials') 
                    ? 'text-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {t('testimonials', 'Testimonials')}
              </Link>
              
              <Link 
                href="/contact" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/contact') 
                    ? 'text-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {t('contact', 'Contact Us')}
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/book">
              <Button size="sm">
                {t('book_now', 'Book Now')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            {t('home', 'Home')}
          </Link>
          
          <Link 
            href="/about" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/about') 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            {t('about', 'About Us')}
          </Link>
          
          <Link 
            href="/treatments" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/treatments') 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            {t('treatments', 'Treatments')}
          </Link>
          
          <Link 
            href="/blog" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/blog') 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            {t('blog', 'Blog')}
          </Link>
          
          <Link 
            href="/testimonials" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/testimonials') 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            {t('testimonials', 'Testimonials')}
          </Link>
          
          <Link 
            href="/contact" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/contact') 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            {t('contact', 'Contact Us')}
          </Link>
          
          <Link href="/book" onClick={closeMenu}>
            <Button className="w-full mt-3">
              {t('book_now', 'Book Now')}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
} 
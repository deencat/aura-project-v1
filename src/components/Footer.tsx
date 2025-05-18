'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Aura Beauty</h3>
            <p className="text-gray-400 mb-4">
              {t('footer_tagline', 'Premium beauty treatments using cutting-edge technology.')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quick_links', 'Quick Links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  {t('home', 'Home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  {t('about', 'About Us')}
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="text-gray-400 hover:text-white">
                  {t('treatments', 'Treatments')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  {t('blog', 'Blog')}
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-400 hover:text-white">
                  {t('testimonials', 'Testimonials')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  {t('contact', 'Contact Us')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Treatments */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('treatments', 'Treatments')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/treatments/facial" className="text-gray-400 hover:text-white">
                  {t('facial_treatments', 'Facial Treatments')}
                </Link>
              </li>
              <li>
                <Link href="/treatments/body" className="text-gray-400 hover:text-white">
                  {t('body_treatments', 'Body Treatments')}
                </Link>
              </li>
              <li>
                <Link href="/treatments/specialized" className="text-gray-400 hover:text-white">
                  {t('specialized_services', 'Specialized Services')}
                </Link>
              </li>
              <li>
                <Link href="/treatments/packages" className="text-gray-400 hover:text-white">
                  {t('treatment_packages', 'Treatment Packages')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact_us', 'Contact Us')}</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">123 Beauty Street</p>
              <p className="mb-2">New York, NY 10001</p>
              <p className="mb-2">
                <a href="tel:+1234567890" className="hover:text-white">
                  (123) 456-7890
                </a>
              </p>
              <p>
                <a href="mailto:info@aurabeauty.com" className="hover:text-white">
                  info@aurabeauty.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Aura Beauty. {t('all_rights_reserved', 'All rights reserved.')}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              {t('privacy_policy', 'Privacy Policy')}
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              {t('terms_of_service', 'Terms of Service')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 
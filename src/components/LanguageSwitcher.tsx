"use client"

import { useState, useEffect } from 'react'
import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type Language = 'en' | 'zh-Hant' | 'zh-Hans'

interface LanguageSwitcherProps {
  className?: string
}

export const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const [language, setLanguage] = useState<Language>('en')

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferred-language') as Language
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [])

  // Update localStorage and trigger language change event when language changes
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('preferred-language', newLanguage)
    
    // Dispatch a custom event that other components can listen for
    const event = new CustomEvent('language-changed', { detail: { language: newLanguage } })
    window.dispatchEvent(event)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={`flex items-center gap-2 ${className}`}>
          <Languages className="h-4 w-4" />
          <span>
            {language === 'en' && 'English'}
            {language === 'zh-Hant' && '繁體中文'}
            {language === 'zh-Hans' && '简体中文'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
          <span className={language === 'en' ? 'font-bold' : ''}>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('zh-Hant')}>
          <span className={language === 'zh-Hant' ? 'font-bold' : ''}>繁體中文</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('zh-Hans')}>
          <span className={language === 'zh-Hans' ? 'font-bold' : ''}>简体中文</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitcher 
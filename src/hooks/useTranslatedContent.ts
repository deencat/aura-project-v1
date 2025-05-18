"use client"

import { useLanguage } from '@/contexts/LanguageContext'

// Define the structure of multilingual content
interface MultilingualContent {
  english: Record<string, string>
  traditional_chinese: Record<string, string>
  simplified_chinese: Record<string, string>
}

/**
 * Hook to get content in the current language
 * @param content The multilingual content object
 * @returns An object with methods to access translated content
 */
export const useTranslatedContent = (content: MultilingualContent | undefined) => {
  const { language } = useLanguage()
  
  /**
   * Get content for a specific field in the current language
   * @param field The field name to get
   * @param fallback Optional fallback text if translation is not available
   * @returns The translated content or fallback
   */
  const getField = (field: string, fallback: string = ''): string => {
    if (!content) return fallback
    
    let languageKey: keyof MultilingualContent = 'english'
    
    if (language === 'zh-Hant') {
      languageKey = 'traditional_chinese'
    } else if (language === 'zh-Hans') {
      languageKey = 'simplified_chinese'
    }
    
    return content[languageKey]?.[field] || content.english?.[field] || fallback
  }
  
  return {
    getField
  }
}

export default useTranslatedContent 
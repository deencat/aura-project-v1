"use client"

// Define the structure for multilingual service data
export interface ServiceMultilingualData {
  english: {
    name: string
    short_description: string
    long_description: string
    benefits: string
    suitable_for: string
    contraindications: string
    preparation: string
    aftercare: string
  }
  traditional_chinese: {
    name: string
    short_description: string
    long_description: string
    benefits: string
    suitable_for: string
    contraindications: string
    preparation: string
    aftercare: string
  }
  simplified_chinese: {
    name: string
    short_description: string
    long_description: string
    benefits: string
    suitable_for: string
    contraindications: string
    preparation: string
    aftercare: string
  }
}

// Define the basic service data structure
export interface ServiceData {
  id: number
  slug: string
  category: string
  price: string
  duration: string
  status: string
  name: string
  short_description: string
  long_description: string
  benefits: string
  suitable_for: string
  contraindications: string
  preparation: string
  aftercare: string
  multilingual?: ServiceMultilingualData
}

// Mock service data storage - in a real app, this would be fetched from an API
const serviceData: Record<string, ServiceData> = {}

/**
 * Get a service by slug
 * @param slug The service slug
 * @returns The service data or undefined if not found
 */
export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return serviceData[slug]
}

/**
 * Save service data
 * @param service The service data to save
 */
export const saveServiceData = (service: ServiceData): void => {
  serviceData[service.slug] = service
}

/**
 * Format service data for display in the current language
 * @param service The service data
 * @param language The current language code
 * @returns Formatted service data in the current language
 */
export const getLocalizedServiceData = (service: ServiceData, language: string) => {
  if (!service) return null
  
  // Default to English content
  let localizedContent = {
    name: service.name || '',
    short_description: service.short_description || '',
    long_description: service.long_description || '',
    benefits: service.benefits || '',
    suitable_for: service.suitable_for || '',
    contraindications: service.contraindications || '',
    preparation: service.preparation || '',
    aftercare: service.aftercare || ''
  }
  
  // If multilingual data exists, use it based on language
  if (service.multilingual) {
    if (language === 'zh-Hant' && service.multilingual.traditional_chinese) {
      // Use Traditional Chinese content, falling back to English for empty fields
      const tc = service.multilingual.traditional_chinese
      localizedContent = {
        name: tc.name || localizedContent.name,
        short_description: tc.short_description || localizedContent.short_description,
        long_description: tc.long_description || localizedContent.long_description,
        benefits: tc.benefits || localizedContent.benefits,
        suitable_for: tc.suitable_for || localizedContent.suitable_for,
        contraindications: tc.contraindications || localizedContent.contraindications,
        preparation: tc.preparation || localizedContent.preparation,
        aftercare: tc.aftercare || localizedContent.aftercare
      }
    } else if (language === 'zh-Hans' && service.multilingual.simplified_chinese) {
      // Use Simplified Chinese content, falling back to English for empty fields
      const sc = service.multilingual.simplified_chinese
      localizedContent = {
        name: sc.name || localizedContent.name,
        short_description: sc.short_description || localizedContent.short_description,
        long_description: sc.long_description || localizedContent.long_description,
        benefits: sc.benefits || localizedContent.benefits,
        suitable_for: sc.suitable_for || localizedContent.suitable_for,
        contraindications: sc.contraindications || localizedContent.contraindications,
        preparation: sc.preparation || localizedContent.preparation,
        aftercare: sc.aftercare || localizedContent.aftercare
      }
    }
  }
  
  return {
    ...service,
    ...localizedContent
  }
} 
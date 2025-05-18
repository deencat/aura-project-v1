"use client"

// Define the structure for multilingual testimonial data
export interface TestimonialMultilingualData {
  english: {
    clientName: string
    content: string
  }
  traditional_chinese: {
    clientName: string
    content: string
  }
  simplified_chinese: {
    clientName: string
    content: string
  }
}

// Define the basic testimonial data structure
export interface Testimonial {
  id: number
  clientName: string
  service: string
  rating: number
  date: string
  status: string
  featured: boolean
  content: string
  multilingual?: TestimonialMultilingualData
}

// Mock testimonial data storage - in a real app, this would be fetched from an API
const testimonialData: Record<number, Testimonial> = {}

/**
 * Get a testimonial by ID
 * @param id The testimonial ID
 * @returns The testimonial data or undefined if not found
 */
export const getTestimonialById = (id: number): Testimonial | undefined => {
  return testimonialData[id]
}

/**
 * Save testimonial data
 * @param testimonial The testimonial data to save
 */
export const saveTestimonialData = (testimonial: Testimonial): void => {
  testimonialData[testimonial.id] = testimonial
}

/**
 * Format testimonial data for display in the current language
 * @param testimonial The testimonial data
 * @param language The current language code
 * @returns Formatted testimonial data in the current language
 */
export const getLocalizedTestimonialData = (testimonial: Testimonial, language: string) => {
  if (!testimonial) return null
  
  // Default to English content
  let localizedContent = {
    clientName: testimonial.clientName || '',
    content: testimonial.content || ''
  }
  
  // If multilingual data exists, use it based on language
  if (testimonial.multilingual) {
    if (language === 'zh-Hant' && testimonial.multilingual.traditional_chinese) {
      // Use Traditional Chinese content, falling back to English for empty fields
      const tc = testimonial.multilingual.traditional_chinese
      localizedContent = {
        clientName: tc.clientName || localizedContent.clientName,
        content: tc.content || localizedContent.content
      }
    } else if (language === 'zh-Hans' && testimonial.multilingual.simplified_chinese) {
      // Use Simplified Chinese content, falling back to English for empty fields
      const sc = testimonial.multilingual.simplified_chinese
      localizedContent = {
        clientName: sc.clientName || localizedContent.clientName,
        content: sc.content || localizedContent.content
      }
    }
  }
  
  return {
    ...testimonial,
    ...localizedContent
  }
} 
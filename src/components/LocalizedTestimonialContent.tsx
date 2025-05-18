"use client"

import { useLanguage } from '@/contexts/LanguageContext'
import { getLocalizedTestimonialData, type Testimonial } from '@/utils/testimonialUtils'

interface LocalizedTestimonialContentProps {
  testimonial: Testimonial
  field: keyof Testimonial
  fallback?: string
  className?: string
  as?: keyof JSX.IntrinsicElements
  dangerouslySetInnerHTML?: boolean
}

export const LocalizedTestimonialContent = ({
  testimonial,
  field,
  fallback = '',
  className = '',
  as: Component = 'span',
  dangerouslySetInnerHTML = false
}: LocalizedTestimonialContentProps) => {
  const { language } = useLanguage()
  
  // Get the localized testimonial data
  const localizedTestimonial = getLocalizedTestimonialData(testimonial, language)
  
  if (!localizedTestimonial) {
    return <Component className={className}>{fallback}</Component>
  }
  
  // Ensure content is a string
  const content = String(localizedTestimonial[field] || fallback)
  
  if (dangerouslySetInnerHTML) {
    return (
      <Component 
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }
  
  return <Component className={className}>{content}</Component>
} 
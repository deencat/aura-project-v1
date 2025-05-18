"use client"

import { useLanguage } from '@/contexts/LanguageContext'
import { getLocalizedServiceData, type ServiceData } from '@/utils/serviceUtils'

interface LocalizedServiceContentProps {
  service: ServiceData
  field: keyof ServiceData
  fallback?: string
  className?: string
  as?: keyof JSX.IntrinsicElements
  dangerouslySetInnerHTML?: boolean
}

/**
 * Component to display localized service content
 * This component renders content in the user's selected language
 * 
 * @example
 * <LocalizedServiceContent service={service} field="name" fallback="Service Name" />
 * <LocalizedServiceContent service={service} field="long_description" as="div" className="mt-4" />
 * <LocalizedServiceContent service={service} field="benefits" dangerouslySetInnerHTML={true} as="div" />
 */
export function LocalizedServiceContent({
  service,
  field,
  fallback = '',
  className = '',
  as: Component = 'span',
  dangerouslySetInnerHTML = false
}: LocalizedServiceContentProps) {
  const { language } = useLanguage()
  
  if (!service) {
    return <Component className={className}>{fallback}</Component>
  }
  
  // Get localized service data
  const localizedService = getLocalizedServiceData(service, language)
  
  // Get the content for the requested field
  const content = localizedService ? localizedService[field] as string : fallback
  
  // If dangerouslySetInnerHTML is true, render the content as HTML
  if (dangerouslySetInnerHTML) {
    return <Component className={className} dangerouslySetInnerHTML={{ __html: content }} />
  }
  
  return <Component className={className}>{content}</Component>
}

export default LocalizedServiceContent 
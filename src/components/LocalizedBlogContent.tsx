"use client"

import { useLanguage } from '@/contexts/LanguageContext'
import { getLocalizedBlogData, type BlogPost } from '@/utils/blogUtils'

interface LocalizedBlogContentProps {
  post: BlogPost
  field: keyof BlogPost
  fallback?: string
  className?: string
  as?: keyof JSX.IntrinsicElements
  dangerouslySetInnerHTML?: boolean
}

export const LocalizedBlogContent = ({
  post,
  field,
  fallback = '',
  className = '',
  as: Component = 'span',
  dangerouslySetInnerHTML = false
}: LocalizedBlogContentProps) => {
  const { language } = useLanguage()
  
  // Get the localized blog post data
  const localizedPost = getLocalizedBlogData(post, language)
  
  if (!localizedPost) {
    return <Component className={className}>{fallback}</Component>
  }
  
  // Ensure content is a string
  const content = String(localizedPost[field] || fallback)
  
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
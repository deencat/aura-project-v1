"use client"

// Define the structure for multilingual blog data
export interface BlogMultilingualData {
  english: {
    title: string
    content: string
    metaDescription: string
  }
  traditional_chinese: {
    title: string
    content: string
    metaDescription: string
  }
  simplified_chinese: {
    title: string
    content: string
    metaDescription: string
  }
}

// Define the basic blog post data structure
export interface BlogPost {
  id: number
  slug: string
  category: string
  author: string
  publishDate: string
  status: string
  featuredImage?: string
  title: string
  content: string
  metaDescription: string
  multilingual?: BlogMultilingualData
}

// Mock blog post data storage - in a real app, this would be fetched from an API
const blogData: Record<string, BlogPost> = {}

/**
 * Get a blog post by slug
 * @param slug The blog post slug
 * @returns The blog post data or undefined if not found
 */
export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogData[slug]
}

/**
 * Save blog post data
 * @param post The blog post data to save
 */
export const saveBlogData = (post: BlogPost): void => {
  blogData[post.slug] = post
}

/**
 * Format blog post data for display in the current language
 * @param post The blog post data
 * @param language The current language code
 * @returns Formatted blog post data in the current language
 */
export const getLocalizedBlogData = (post: BlogPost, language: string) => {
  if (!post) return null
  
  // Default to English content
  let localizedContent = {
    title: post.title || '',
    content: post.content || '',
    metaDescription: post.metaDescription || ''
  }
  
  // If multilingual data exists, use it based on language
  if (post.multilingual) {
    if (language === 'zh-Hant' && post.multilingual.traditional_chinese) {
      // Use Traditional Chinese content, falling back to English for empty fields
      const tc = post.multilingual.traditional_chinese
      localizedContent = {
        title: tc.title || localizedContent.title,
        content: tc.content || localizedContent.content,
        metaDescription: tc.metaDescription || localizedContent.metaDescription
      }
    } else if (language === 'zh-Hans' && post.multilingual.simplified_chinese) {
      // Use Simplified Chinese content, falling back to English for empty fields
      const sc = post.multilingual.simplified_chinese
      localizedContent = {
        title: sc.title || localizedContent.title,
        content: sc.content || localizedContent.content,
        metaDescription: sc.metaDescription || localizedContent.metaDescription
      }
    }
  }
  
  return {
    ...post,
    ...localizedContent
  }
} 
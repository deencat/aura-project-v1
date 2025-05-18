"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Calendar, User, Tag, Search, FilterX } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LocalizedBlogContent } from '@/components/LocalizedBlogContent'
import { useLanguage } from '@/contexts/LanguageContext'
import { BlogPost } from '@/utils/blogUtils'

// Mock blog posts data - in a real app, this would come from your API
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Benefits of Regular Facials",
    slug: "benefits-of-regular-facials",
    category: "Facial Treatments",
    content: "Regular facials can significantly improve your skin's health and appearance...",
    metaDescription: "Discover how regular facial treatments can improve skin health, reduce signs of aging, and provide relaxation benefits for overall wellbeing.",
    author: "Sarah Johnson",
    publishDate: "2023-08-15",
    status: "Published",
    featuredImage: "/images/placeholder.jpg",
    multilingual: {
      english: {
        title: "The Benefits of Regular Facials",
        content: "Regular facials can significantly improve your skin's health and appearance...",
        metaDescription: "Discover how regular facial treatments can improve skin health, reduce signs of aging, and provide relaxation benefits for overall wellbeing."
      },
      traditional_chinese: {
        title: "定期面部護理的好處",
        content: "定期進行面部護理可以顯著改善皮膚健康和外觀...",
        metaDescription: "了解定期面部護理如何改善皮膚健康，減少衰老跡象，並為整體健康提供放鬆益處。"
      },
      simplified_chinese: {
        title: "定期面部护理的好处",
        content: "定期进行面部护理可以显著改善皮肤健康和外观...",
        metaDescription: "了解定期面部护理如何改善皮肤健康，减少衰老迹象，并为整体健康提供放松益处。"
      }
    }
  },
  {
    id: 2,
    title: "5 Things to Know Before Getting a Chemical Peel",
    slug: "things-to-know-before-chemical-peel",
    category: "Specialized Services",
    content: "Chemical peels are powerful treatments that can transform your skin...",
    metaDescription: "Learn the essential facts about chemical peels before your treatment, including preparation, aftercare, and what results to expect.",
    author: "Dr. Emily Chen",
    publishDate: "2023-09-02",
    status: "Published",
    featuredImage: "/images/placeholder.jpg",
    multilingual: {
      english: {
        title: "5 Things to Know Before Getting a Chemical Peel",
        content: "Chemical peels are powerful treatments that can transform your skin...",
        metaDescription: "Learn the essential facts about chemical peels before your treatment, including preparation, aftercare, and what results to expect."
      },
      traditional_chinese: {
        title: "化學換膚前需要知道的5件事",
        content: "化學換膚是一種強效的護理，可以徹底改變你的皮膚...",
        metaDescription: "了解化學換膚前的必備知識，包括準備工作、術後護理和預期效果。"
      },
      simplified_chinese: {
        title: "化学换肤前需要知道的5件事",
        content: "化学换肤是一种强效的护理，可以彻底改变你的皮肤...",
        metaDescription: "了解化学换肤前的必备知识，包括准备工作、术后护理和预期效果。"
      }
    }
  },
  {
    id: 3,
    title: "Skincare Routine for Combination Skin",
    slug: "skincare-routine-combination-skin",
    category: "Skincare Tips",
    content: "Combination skin presents unique challenges that require a balanced approach...",
    metaDescription: "Discover the perfect skincare routine for combination skin with tips on managing both oily and dry areas for a balanced, healthy complexion.",
    author: "Lisa Wang",
    publishDate: "2023-10-10",
    status: "Published",
    featuredImage: "/images/placeholder.jpg",
    multilingual: {
      english: {
        title: "Skincare Routine for Combination Skin",
        content: "Combination skin presents unique challenges that require a balanced approach...",
        metaDescription: "Discover the perfect skincare routine for combination skin with tips on managing both oily and dry areas for a balanced, healthy complexion."
      },
      traditional_chinese: {
        title: "混合性肌膚的護膚程序",
        content: "混合性肌膚帶來獨特的挑戰，需要平衡的護理方法...",
        metaDescription: "發現適合混合性肌膚的完美護膚程序，掌握管理油性和乾性區域的技巧，讓肌膚健康平衡。"
      },
      simplified_chinese: {
        title: "混合性肌肤的护肤程序",
        content: "混合性肌肤带来独特的挑战，需要平衡的护理方法...",
        metaDescription: "发现适合混合性肌肤的完美护肤程序，掌握管理油性和干性区域的技巧，让肌肤健康平衡。"
      }
    }
  }
]

export default function BlogListingPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  // Get unique categories from posts
  const categories = Array.from(new Set(mockBlogPosts.map(post => post.category)))
  
  // Filter posts based on search term and category
  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true
    
    return matchesSearch && matchesCategory
  })
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory(null)
  }
  
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-8">{t('blog', 'Blog')}</h1>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder={t('search_blog', 'Search blog posts...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">{t('all_categories', 'All Categories')}</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          {(searchTerm || selectedCategory) && (
            <Button variant="ghost" size="icon" onClick={resetFilters} title={t('reset_filters', 'Reset filters')}>
              <FilterX className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <div key={post.id} className="flex flex-col h-full border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Featured image */}
            {post.featuredImage && (
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            )}
            
            {/* Content */}
            <div className="flex flex-col flex-grow p-6">
              {/* Category */}
              <div className="mb-2">
                <span className="text-xs font-medium text-primary px-2 py-1 bg-primary/10 rounded-full">
                  {post.category}
                </span>
              </div>
              
              {/* Title */}
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  <LocalizedBlogContent post={post} field="title" />
                </h2>
              </Link>
              
              {/* Excerpt */}
              <div className="text-gray-600 mb-4 line-clamp-3">
                <LocalizedBlogContent post={post} field="content" />
              </div>
              
              {/* Meta info */}
              <div className="mt-auto pt-4 border-t flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* No results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">{t('no_posts_found', 'No posts found')}</h3>
          <p className="text-gray-500">{t('try_different_search', 'Try a different search term or category')}</p>
        </div>
      )}
    </div>
  )
} 
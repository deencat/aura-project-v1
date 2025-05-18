"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LocalizedBlogContent } from '@/components/LocalizedBlogContent'
import { useLanguage } from '@/contexts/LanguageContext'
import { getBlogBySlug, BlogPost } from '@/utils/blogUtils'

// Mock blog post data - in a real app, this would come from your API
const mockPost: BlogPost = {
  id: 1,
  title: "The Benefits of Regular Facials",
  slug: "benefits-of-regular-facials",
  category: "Facial Treatments",
  content: "Regular facials can significantly improve your skin's health and appearance. They help to deeply cleanse pores, exfoliate dead skin cells, and hydrate the skin.\n\nBeyond the physical benefits, facials also provide a relaxing experience that can reduce stress and promote mental wellbeing. The massage techniques used during a facial can improve blood circulation and lymphatic drainage.\n\nFor optimal results, it's recommended to get a facial every 4-6 weeks, as this aligns with your skin's natural cell turnover cycle.",
  metaDescription: "Discover how regular facial treatments can improve skin health, reduce signs of aging, and provide relaxation benefits for overall wellbeing.",
  author: "Sarah Johnson",
  publishDate: "2023-08-15",
  status: "Published",
  featuredImage: "/images/placeholder.jpg",
  multilingual: {
    english: {
      title: "The Benefits of Regular Facials",
      content: "Regular facials can significantly improve your skin's health and appearance. They help to deeply cleanse pores, exfoliate dead skin cells, and hydrate the skin.\n\nBeyond the physical benefits, facials also provide a relaxing experience that can reduce stress and promote mental wellbeing. The massage techniques used during a facial can improve blood circulation and lymphatic drainage.\n\nFor optimal results, it's recommended to get a facial every 4-6 weeks, as this aligns with your skin's natural cell turnover cycle.",
      metaDescription: "Discover how regular facial treatments can improve skin health, reduce signs of aging, and provide relaxation benefits for overall wellbeing."
    },
    traditional_chinese: {
      title: "定期面部護理的好處",
      content: "定期進行面部護理可以顯著改善皮膚健康和外觀。它們有助於深層清潔毛孔，去除死皮細胞，並為皮膚補充水分。\n\n除了身體上的好處外，面部護理還提供了一種放鬆的體驗，可以減輕壓力並促進心理健康。面部護理中使用的按摩技術可以改善血液循環和淋巴引流。\n\n為了獲得最佳效果，建議每4-6週進行一次面部護理，因為這與皮膚的自然細胞更新週期一致。",
      metaDescription: "了解定期面部護理如何改善皮膚健康，減少衰老跡象，並為整體健康提供放鬆益處。"
    },
    simplified_chinese: {
      title: "定期面部护理的好处",
      content: "定期进行面部护理可以显著改善皮肤健康和外观。它们有助于深层清洁毛孔，去除死皮细胞，并为皮肤补充水分。\n\n除了身体上的好处外，面部护理还提供了一种放松的体验，可以减轻压力并促进心理健康。面部护理中使用的按摩技术可以改善血液循环和淋巴引流。\n\n为了获得最佳效果，建议每4-6周进行一次面部护理，因为这与皮肤的自然细胞更新周期一致。",
      metaDescription: "了解定期面部护理如何改善皮肤健康，减少衰老迹象，并为整体健康提供放松益处。"
    }
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage()
  const { slug } = params
  
  // In a real app, you would fetch the blog post data from your API
  // const post = getBlogBySlug(slug)
  const post = mockPost // Using mock data for demonstration
  
  if (!post) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t('blog_not_found', 'Blog post not found')}</h1>
        <p className="mb-8">{t('blog_not_found_message', 'The blog post you are looking for does not exist or has been removed.')}</p>
        <Link href="/blog">
          <Button>{t('back_to_blog', 'Back to Blog')}</Button>
        </Link>
      </div>
    )
  }
  
  // Format date for display
  const formattedDate = new Date(post.publishDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Back button */}
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="flex items-center gap-2 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="h-4 w-4" />
            {t('back_to_blog', 'Back to Blog')}
          </Button>
        </Link>
      </div>
      
      {/* Featured image */}
      {post.featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      )}
      
      {/* Blog header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <LocalizedBlogContent post={post} field="title" />
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            <span>{post.category}</span>
          </div>
        </div>
      </div>
      
      {/* Blog content */}
      <div className="prose max-w-none">
        <LocalizedBlogContent 
          post={post} 
          field="content" 
          as="div"
          className="whitespace-pre-wrap"
        />
      </div>
      
      {/* Related posts section could be added here */}
    </div>
  )
} 
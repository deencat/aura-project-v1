"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LocalizedBlogContent } from '@/components/LocalizedBlogContent'
import { TestimonialSection } from '@/components/TestimonialSection'
import { useLanguage } from '@/contexts/LanguageContext'
import { BlogPost } from '@/utils/blogUtils'
import { Testimonial } from '@/utils/testimonialUtils'

interface FeaturedContentProps {
  blogPosts: BlogPost[]
  testimonials: Testimonial[]
  className?: string
}

export const FeaturedContent = ({
  blogPosts,
  testimonials,
  className = ''
}: FeaturedContentProps) => {
  const { t } = useLanguage()
  
  // Filter out only featured testimonials
  const featuredTestimonials = testimonials.filter(t => t.featured).slice(0, 3)
  
  // Take the most recent blog posts
  const recentBlogPosts = [...blogPosts]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 3)
  
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Featured Blog Posts */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">{t('latest_posts', 'Latest Posts')}</h2>
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2 group">
                {t('view_all', 'View All')}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBlogPosts.map(post => (
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
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      <LocalizedBlogContent post={post} field="title" />
                    </h3>
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
        </div>
        
        {/* Featured Testimonials */}
        {featuredTestimonials.length > 0 && (
          <div>
            <TestimonialSection
              testimonials={featuredTestimonials}
              title={t('what_clients_say', 'What Our Clients Say')}
              subtitle={t('testimonials_subtitle', 'Read about the experiences of our satisfied clients with our beauty treatments and services.')}
              displayType="carousel"
            />
            
            <div className="text-center mt-8">
              <Link href="/testimonials">
                <Button>
                  {t('view_all_testimonials', 'View All Testimonials')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 
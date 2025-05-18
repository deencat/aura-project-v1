"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { TestimonialSection } from '@/components/TestimonialSection'
import { LocalizedBlogContent } from '@/components/LocalizedBlogContent'
import { BlogPost } from '@/utils/blogUtils'
import { Testimonial } from '@/utils/testimonialUtils'

// Mock featured blog posts - in a real app, this would come from your API
const featuredBlogPosts: BlogPost[] = [
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

// Mock featured testimonials - in a real app, this would come from your API
const featuredTestimonials: Testimonial[] = [
  {
    id: 1,
    clientName: "Emma Thompson",
    service: "Royal Black Scan",
    rating: 5,
    date: "2023-08-15",
    status: "Published",
    featured: true,
    content: "The Royal Black Scan treatment was amazing! My skin looks younger and more radiant than it has in years. The staff was professional and made me feel comfortable throughout the entire process.",
    multilingual: {
      english: {
        clientName: "Emma Thompson",
        content: "The Royal Black Scan treatment was amazing! My skin looks younger and more radiant than it has in years. The staff was professional and made me feel comfortable throughout the entire process."
      },
      traditional_chinese: {
        clientName: "艾瑪·湯普森",
        content: "皇家黑掃描療程真的很棒！我的皮膚看起來比過去幾年更年輕、更有光澤。工作人員非常專業，讓我在整個過程中感到舒適。"
      },
      simplified_chinese: {
        clientName: "艾玛·汤普森",
        content: "皇家黑扫描疗程真的很棒！我的皮肤看起来比过去几年更年轻、更有光泽。工作人员非常专业，让我在整个过程中感到舒适。"
      }
    }
  },
  {
    id: 3,
    clientName: "Sarah Johnson",
    service: "Lymphatic Detox",
    rating: 5,
    date: "2023-10-05",
    status: "Published",
    featured: true,
    content: "The Lymphatic Detox treatment helped reduce my bloating and water retention. I feel lighter and more energetic. Will definitely be coming back for more sessions.",
    multilingual: {
      english: {
        clientName: "Sarah Johnson",
        content: "The Lymphatic Detox treatment helped reduce my bloating and water retention. I feel lighter and more energetic. Will definitely be coming back for more sessions."
      },
      traditional_chinese: {
        clientName: "莎拉·約翰遜",
        content: "淋巴排毒療程幫助減少了我的腹脹和水腫。我感覺更輕盈，更有活力。一定會回來做更多療程。"
      },
      simplified_chinese: {
        clientName: "莎拉·约翰逊",
        content: "淋巴排毒疗程帮助减少了我的腹胀和水肿。我感觉更轻盈，更有活力。一定会回来做更多疗程。"
      }
    }
  },
  {
    id: 6,
    clientName: "Sophia Kim",
    service: "V-Line Perfection",
    rating: 5,
    date: "2023-11-15",
    status: "Published",
    featured: true,
    content: "The V-Line Perfection treatment has completely transformed my jawline! I was skeptical at first, but after completing the recommended sessions, I'm amazed by how defined my face looks now.",
    multilingual: {
      english: {
        clientName: "Sophia Kim",
        content: "The V-Line Perfection treatment has completely transformed my jawline! I was skeptical at first, but after completing the recommended sessions, I'm amazed by how defined my face looks now."
      },
      traditional_chinese: {
        clientName: "金蘇菲亞",
        content: "V臉完美療程徹底改變了我的下顎線！起初我持懷疑態度，但完成推薦的療程後，我對我的臉部輪廓變得多麼分明感到驚訝。"
      },
      simplified_chinese: {
        clientName: "金苏菲亚",
        content: "V脸完美疗程彻底改变了我的下颚线！起初我持怀疑态度，但完成推荐的疗程后，我对我的脸部轮廓变得多么分明感到惊讶。"
      }
    }
  }
]

export default function Home() {
  const { t } = useLanguage()
  
  return (
    <main>
      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 py-24 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('hero_title', 'Premium Beauty Services for Your Radiant Self')}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              {t('hero_subtitle', 'Experience luxurious beauty treatments tailored to your unique needs. Discover the perfect balance of science and relaxation.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                {t('book_now', 'Book Now')}
              </Button>
              <Button variant="outline" size="lg">
                {t('explore_treatments', 'Explore Treatments')}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured services section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t('featured_services', 'Our Featured Services')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('featured_services_subtitle', 'Discover our most popular beauty treatments and services that our clients love.')}
            </p>
          </div>
          
          {/* Service cards would go here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service cards */}
          </div>
        </div>
      </section>
      
      {/* Featured testimonials section */}
      <section className="py-20 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t('what_clients_say', 'What Our Clients Say')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('testimonials_subtitle', 'Read about the experiences of our satisfied clients with our beauty treatments and services.')}
            </p>
          </div>
          
          <TestimonialSection 
            testimonials={featuredTestimonials}
            displayType="carousel"
          />
          
          <div className="text-center mt-10">
            <Link href="/testimonials">
              <Button variant="outline" className="group">
                {t('view_all_testimonials', 'View All Testimonials')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured blog posts section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t('latest_from_blog', 'Latest From Our Blog')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('blog_subtitle', 'Discover beauty tips, treatment insights, and expert advice from our specialists.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogPosts.map(post => (
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
                  
                  {/* Read more link */}
                  <div className="mt-auto pt-4">
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                      {t('read_more', 'Read More')}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/blog">
              <Button variant="outline" className="group">
                {t('view_all_posts', 'View All Blog Posts')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 px-4 md:px-6 bg-primary text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">
            {t('ready_to_glow', 'Ready to Glow? Book Your Treatment Today')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t('cta_subtitle', 'Take the first step towards a more radiant you. Our specialists are ready to create a personalized beauty experience just for you.')}
          </p>
          <Button size="lg" variant="secondary">
            {t('book_appointment', 'Book an Appointment')}
          </Button>
        </div>
      </section>
    </main>
  )
} 
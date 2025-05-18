"use client"

import React, { useState } from 'react'
import { Star, Search, FilterX } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TestimonialCard } from '@/components/TestimonialCard'
import { TestimonialSection } from '@/components/TestimonialSection'
import { useLanguage } from '@/contexts/LanguageContext'
import { Testimonial } from '@/utils/testimonialUtils'

// Mock testimonials data - in a real app, this would come from your API
const mockTestimonials: Testimonial[] = [
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
    id: 2,
    clientName: "Michael Wang",
    service: "Collagen Regeneration",
    rating: 4,
    date: "2023-09-22",
    status: "Published",
    featured: false,
    content: "After just three sessions of the Collagen Regeneration treatment, I noticed significant improvement in my skin elasticity. My friends keep asking what my secret is!",
    multilingual: {
      english: {
        clientName: "Michael Wang",
        content: "After just three sessions of the Collagen Regeneration treatment, I noticed significant improvement in my skin elasticity. My friends keep asking what my secret is!"
      },
      traditional_chinese: {
        clientName: "王明輝",
        content: "僅僅三次膠原蛋白再生療程後，我就注意到我的皮膚彈性有了顯著改善。我的朋友們一直在問我的秘密是什麼！"
      },
      simplified_chinese: {
        clientName: "王明辉",
        content: "仅仅三次胶原蛋白再生疗程后，我就注意到我的皮肤弹性有了显著改善。我的朋友们一直在问我的秘密是什么！"
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
    id: 4,
    clientName: "Jennifer Lee",
    service: "Hair Removal",
    rating: 5,
    date: "2023-10-18",
    status: "Published",
    featured: false,
    content: "I've tried many hair removal services in Hong Kong, but this one was truly painless and effective. After 3 sessions, I'm already seeing amazing results.",
    multilingual: {
      english: {
        clientName: "Jennifer Lee",
        content: "I've tried many hair removal services in Hong Kong, but this one was truly painless and effective. After 3 sessions, I'm already seeing amazing results."
      },
      traditional_chinese: {
        clientName: "李珍妮",
        content: "我在香港嘗試過很多脫毛服務，但這個真的是無痛且有效的。僅僅3次療程後，我已經看到了驚人的效果。"
      },
      simplified_chinese: {
        clientName: "李珍妮",
        content: "我在香港尝试过很多脱毛服务，但这个真的是无痛且有效的。仅仅3次疗程后，我已经看到了惊人的效果。"
      }
    }
  },
  {
    id: 5,
    clientName: "David Chen",
    service: "Peeled Egg Skin",
    rating: 4,
    date: "2023-11-02",
    status: "Published",
    featured: false,
    content: "The Peeled Egg Skin treatment gave my skin a smooth, glowing finish. The process was comfortable and the results were visible after just one session.",
    multilingual: {
      english: {
        clientName: "David Chen",
        content: "The Peeled Egg Skin treatment gave my skin a smooth, glowing finish. The process was comfortable and the results were visible after just one session."
      },
      traditional_chinese: {
        clientName: "陳大衛",
        content: "剝殼雞蛋肌療程讓我的皮膚光滑有光澤。過程很舒適，僅僅一次療程後效果就很明顯。"
      },
      simplified_chinese: {
        clientName: "陈大卫",
        content: "剥壳鸡蛋肌疗程让我的皮肤光滑有光泽。过程很舒适，仅仅一次疗程后效果就很明显。"
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

// Available services for filtering
const services = Array.from(new Set(mockTestimonials.map(t => t.service)))

export default function TestimonialsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  
  // Get featured testimonials
  const featuredTestimonials = mockTestimonials.filter(t => t.featured)
  
  // Filter testimonials based on search, service, and rating
  const filteredTestimonials = mockTestimonials.filter(testimonial => {
    const matchesSearch = 
      testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.service.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesService = selectedService ? testimonial.service === selectedService : true
    const matchesRating = selectedRating ? testimonial.rating >= selectedRating : true
    
    return matchesSearch && matchesService && matchesRating
  })
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('')
    setSelectedService(null)
    setSelectedRating(null)
  }
  
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Page header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('client_testimonials', 'Client Testimonials')}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('testimonials_subtitle', 'Read about the experiences of our satisfied clients with our beauty treatments and services.')}
        </p>
      </div>
      
      {/* Featured testimonials carousel */}
      {featuredTestimonials.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {t('featured_testimonial', 'Featured Testimonials')}
          </h2>
          <TestimonialSection 
            testimonials={featuredTestimonials}
            displayType="carousel"
          />
        </div>
      )}
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder={t('search_testimonials', 'Search testimonials...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Service filter */}
          <select
            value={selectedService || ''}
            onChange={(e) => setSelectedService(e.target.value || null)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">{t('all_services', 'All Services')}</option>
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          
          {/* Rating filter */}
          <div className="flex items-center gap-2 bg-background border rounded-md px-3 py-2">
            <span className="text-sm">{t('min_rating', 'Min Rating:')}</span>
            <div className="flex">
              {[5, 4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating === selectedRating ? null : rating)}
                  className={`p-1 ${selectedRating === rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <Star className="h-4 w-4 fill-current" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Reset filters */}
          {(searchTerm || selectedService || selectedRating) && (
            <Button variant="ghost" size="icon" onClick={resetFilters} title={t('reset_filters', 'Reset filters')}>
              <FilterX className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* All testimonials grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
      
      {/* No results */}
      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">{t('no_testimonials_found', 'No testimonials found')}</h3>
          <p className="text-gray-500">{t('try_different_search', 'Try a different search term or filter')}</p>
        </div>
      )}
      
      {/* CTA */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-4">{t('share_your_experience', 'Share Your Experience')}</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {t('testimonial_cta_text', 'Had a great experience with one of our treatments? We would love to hear from you!')}
        </p>
        <Button size="lg">
          {t('submit_testimonial', 'Submit Your Testimonial')}
        </Button>
      </div>
    </div>
  )
} 
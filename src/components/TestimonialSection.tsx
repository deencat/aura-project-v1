"use client"

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TestimonialCard } from '@/components/TestimonialCard'
import { Testimonial } from '@/utils/testimonialUtils'
import { useLanguage } from '@/contexts/LanguageContext'

interface TestimonialSectionProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  className?: string
  displayType?: 'grid' | 'carousel'
}

export const TestimonialSection = ({
  testimonials,
  title,
  subtitle,
  className = '',
  displayType = 'grid'
}: TestimonialSectionProps) => {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  
  // For carousel view, calculate the visible testimonials
  const visibleTestimonials = displayType === 'carousel' 
    ? [testimonials[activeIndex]]
    : testimonials
  
  // Carousel navigation
  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }
  
  const goToNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }
  
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && <h2 className="text-3xl font-bold mb-3">{title}</h2>}
            {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        
        {/* Testimonials display */}
        {displayType === 'grid' ? (
          // Grid layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          // Carousel layout
          <div className="relative max-w-3xl mx-auto">
            <div className="transition-all duration-300">
              {visibleTestimonials.map((testimonial) => (
                <TestimonialCard 
                  key={testimonial.id} 
                  testimonial={testimonial}
                  className="max-w-3xl mx-auto"
                />
              ))}
            </div>
            
            {/* Carousel navigation */}
            <div className="flex justify-center items-center mt-8 gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrev}
                className="rounded-full"
                aria-label={t('previous_testimonial', 'Previous testimonial')}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              {/* Pagination dots */}
              <div className="flex items-center gap-2 mx-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === activeIndex ? 'bg-primary scale-125' : 'bg-gray-300'
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full"
                aria-label={t('next_testimonial', 'Next testimonial')}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// Example usage with mock data
export const TestimonialSectionExample = () => {
  const { t } = useLanguage()
  
  // Mock testimonials data - in a real app, this would come from your API
  const testimonials: Testimonial[] = [
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
    }
  ]
  
  return (
    <TestimonialSection
      testimonials={testimonials}
      title={t('what_clients_say', 'What Our Clients Say')}
      subtitle={t('testimonials_subtitle', 'Read about the experiences of our satisfied clients with our beauty treatments and services.')}
      displayType="carousel"
    />
  )
} 
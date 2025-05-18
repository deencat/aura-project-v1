"use client"

import React from 'react'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { LocalizedTestimonialContent } from '@/components/LocalizedTestimonialContent'
import { Testimonial } from '@/utils/testimonialUtils'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export const TestimonialCard = ({ testimonial, className = '' }: TestimonialCardProps) => {
  return (
    <Card className={`h-full ${className}`}>
      <CardContent className="p-6 flex flex-col h-full">
        {/* Rating stars */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        
        {/* Testimonial content */}
        <div className="mb-6 flex-grow">
          <p className="text-gray-700 italic">
            <LocalizedTestimonialContent 
              testimonial={testimonial} 
              field="content"
            />
          </p>
        </div>
        
        {/* Client info */}
        <div className="flex items-center">
          {/* Avatar placeholder - could be replaced with actual client photo */}
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-gray-500 font-medium">
              {testimonial.clientName.charAt(0)}
            </span>
          </div>
          
          <div>
            <p className="font-semibold text-gray-900">
              <LocalizedTestimonialContent 
                testimonial={testimonial} 
                field="clientName"
              />
            </p>
            <p className="text-sm text-gray-500">{testimonial.service}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Example usage:
export const TestimonialGrid = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  )
} 
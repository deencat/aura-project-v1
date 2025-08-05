"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CarouselApi } from "@/components/ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useLanguage } from '@/contexts/LanguageContext'

interface ServiceData {
  id: number
  name: string
  category: string
  price: string
  duration: string
  status: string
  slug: string
  short_description: string
  long_description: string
  benefits: string
  suitable_for: string
  contraindications: string
  preparation: string
  aftercare: string
  name_zh_hant?: string
  short_description_zh_hant?: string
  long_description_zh_hant?: string
  benefits_zh_hant?: string
  name_zh_hans?: string
  short_description_zh_hans?: string
  long_description_zh_hans?: string
  benefits_zh_hans?: string
  multilingual?: any
}

export default function BreastEnhancementPage() {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [serviceData, setServiceData] = useState<ServiceData | null>(null)
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()
  const totalSlides = 3

  // Fetch service data from API
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/api/services/5')
        if (response.ok) {
          const data = await response.json()
          setServiceData(data.service)
        } else {
          console.error('Failed to fetch service data')
        }
      } catch (error) {
        console.error('Error fetching service data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServiceData()
  }, [])

  // Get content based on current language with fallbacks
  const getLocalizedContent = (field: string, fallback: string = ''): string => {
    if (!serviceData) return fallback
    
    switch (language) {
      case 'zh-Hant':
        return serviceData[`${field}_zh_hant` as keyof ServiceData] as string || serviceData[field as keyof ServiceData] as string || fallback
      case 'zh-Hans':
        return serviceData[`${field}_zh_hans` as keyof ServiceData] as string || serviceData[field as keyof ServiceData] as string || fallback
      default:
        return serviceData[field as keyof ServiceData] as string || fallback
    }
  }

  // Get service title
  const getTitle = () => {
    return getLocalizedContent('name', 'Goddess Curves')
  }

  // Get service description
  const getDescription = () => {
    return getLocalizedContent('short_description', 'Awaken Your Goddess Curves—Experience the Revolutionary "Cellular Breast Vitality" Transformation! Our exclusive techniques work at the cellular level to restore fullness and resilience from within.')
  }

  // Get service benefits array
  const getBenefits = (): string[] => {
    const benefits = getLocalizedContent('benefits', 'Cellular-Level Activation\nTriple Deep Restoration\nNatural Energy Infusion')
    return benefits.split('\n').filter((benefit: string) => benefit.trim())
  }

  // Get localized UI text
  const getUIText = (key: string): string => {
    const uiText: Record<string, Record<string, string>> = {
      'en': {
        'natural_enhancement': 'Natural enhancement',
        'natural_enhancement_desc': 'Firm, contour, and revitalize',
        'non_invasive': 'Non-invasive solution',
        'non_invasive_desc': 'Safe, painless, no side effects',
        'book_now': 'BOOK NOW',
        'treatment_benefits': 'Treatment Benefits',
        'visible_transformations': 'Visible Transformations',
        'enhancement_tab': 'Enhancement',
        'firmness_tab': 'Firmness',
        'non_invasive_tab': 'Non-Invasive',
        'loading': 'Loading...',
        // Benefits section
        'benefits_generic_desc': 'Experience the benefits of our advanced treatment technology.',
        'visible_transformations_desc': 'Our advanced technology delivers noticeable enhancement after just a few sessions, with lasting benefits for your confidence and well-being.',
        // Tab content
        'natural_fullness': 'Natural Fullness',
        'natural_fullness_desc': 'Experience improved volume and natural-looking results through cellular revitalization.',
        'enhanced_confidence': 'Enhanced Confidence',
        'enhanced_confidence_desc': 'Feel more confident and comfortable in your body with improved proportions and symmetry.',
        'improved_firmness': 'Improved Firmness',
        'improved_firmness_desc': 'Stimulates collagen production and tissue strengthening for noticeably firmer, uplifted contours.',
        'youthful_appearance': 'Youthful Appearance',
        'youthful_appearance_desc': 'Rejuvenates and restores tissue for a more youthful, natural, and vibrant appearance.',
        'safe_natural': 'Safe & Natural',
        'safe_natural_desc': 'Completely non-invasive approach with zero side effects, suitable for all body types.',
        'zero_downtime': 'Zero Downtime',
        'zero_downtime_desc': 'Return to daily activities immediately with no recovery period or special post-care regimen.',
        // Testimonial section
        'transformation_trust': 'Transformation You Can Trust',
        'testimonial_text': 'Not just fuller, but healthier and more confident—this is a true upgrade! My experience with the Goddess Curves treatment has been transformative. The results are natural and beautiful, and the boost to my confidence has been incredible.',
        'testimonial_name': 'Jennifer Lau',
        'testimonial_role': 'Wellness enthusiast',
        'experience_rating': 'Experience Rating:',
        // Perfect For section
        'perfect_for': 'Perfect For',
        'perfect_for_desc': 'Our Goddess Curves treatment is ideal for women looking for natural enhancement and restoration',
        'post_pregnancy': 'Post-Pregnancy',
        'post_pregnancy_desc': 'Women looking to restore breast volume and firmness after pregnancy and breastfeeding.',
        'natural_enhancement_title': 'Natural Enhancement',
        'natural_enhancement_card_desc': 'Those seeking fuller, firmer breasts without surgery or synthetic implants.',
        'age_related_changes': 'Age-Related Changes',
        'age_related_changes_desc': 'Women experiencing loss of volume, firmness, or elasticity due to aging or hormonal changes.',
        'asymmetry_correction': 'Asymmetry Correction',
        'asymmetry_correction_desc': 'Those looking to improve natural breast symmetry and proportions without invasive procedures.',
        'awakens_natural_beauty': 'Our Goddess Curves treatment awakens your natural beauty, enhancing your curves while maintaining a completely natural look and feel.',
        // FAQ section
        'faqs': 'FAQs',
        'faq_subtitle': 'Expert insights about our Goddess Curves enhancement program',
        'faq_how_works': 'How does the treatment work?',
        'faq_how_works_answer': 'Our Goddess Curves treatment uses a unique combination of advanced bio-stimulation technology and natural active ingredients to revitalize mammary tissue at the cellular level, encouraging natural firmness and enhancement.',
        'faq_sessions': 'How many sessions are recommended?',
        'faq_sessions_answer': 'While many clients notice improvements after just 2-3 sessions, we typically recommend a series of 6-8 treatments for optimal results, followed by maintenance sessions every 3-4 months to sustain enhancement.',
        'faq_painful': 'Is the treatment painful?',
        'faq_painful_answer': 'No, the treatment is completely non-invasive and painless. Most clients describe it as a warm, relaxing experience with gentle stimulation that\'s actually quite pleasant.',
        'faq_duration': 'How long do results last?',
        'faq_duration_answer': 'With proper maintenance sessions, results can last for years. The treatment stimulates your body\'s natural processes, and regular maintenance helps sustain the enhanced firmness, shape, and volume over time.',
        'ready_transform': 'Ready to transform naturally?',
        'experience_revolutionary': 'Experience our revolutionary Goddess Curves treatment for natural enhancement.',
        'book_consultation': 'Book Consultation',
        // Final booking section
        'embrace_goddess': 'Embrace Your Goddess Within',
        'embrace_goddess_desc': 'Experience the transformative benefits of our Goddess Curves treatment. Book your consultation today and begin your journey to natural enhancement and confidence.',
        'book_appointment': 'BOOK APPOINTMENT',
        'advanced_technology': 'ADVANCED TECHNOLOGY',
        'advanced_technology_desc': 'Cellular-level revitalization',
        'natural_enhancement_feature': 'NATURAL ENHANCEMENT',
        'natural_enhancement_feature_desc': 'Results that look and feel real',
        'no_side_effects': 'NO SIDE EFFECTS',
        'no_side_effects_desc': 'Completely safe and non-invasive'
      },
      'zh-Hant': {
        'natural_enhancement': '天然增強',
        'natural_enhancement_desc': '緊實、塑型、煥活',
        'non_invasive': '非侵入式解決方案',
        'non_invasive_desc': '安全、無痛、無副作用',
        'book_now': '立即預約',
        'treatment_benefits': '療程效益',
        'visible_transformations': '可見轉變',
        'enhancement_tab': '增強效果',
        'firmness_tab': '緊實度',
        'non_invasive_tab': '非侵入式',
        'loading': '載入中...',
        // Benefits section
        'benefits_generic_desc': '體驗我們先進治療技術的好處。',
        'visible_transformations_desc': '我們的先進技術在短短幾次療程後就能帶來明顯的增強效果，為您的自信和健康帶來持久的益處。',
        // Tab content
        'natural_fullness': '天然豐滿',
        'natural_fullness_desc': '通過細胞活化體驗改善的體積和自然外觀效果。',
        'enhanced_confidence': '增強自信',
        'enhanced_confidence_desc': '透過改善比例和對稱性，讓您對自己的身體更加自信和舒適。',
        'improved_firmness': '改善緊實度',
        'improved_firmness_desc': '刺激膠原蛋白生成和組織強化，顯著提升緊實度和挺拔輪廓。',
        'youthful_appearance': '年輕外觀',
        'youthful_appearance_desc': '恢復和修復組織，呈現更年輕、自然和充滿活力的外觀。',
        'safe_natural': '安全天然',
        'safe_natural_desc': '完全非侵入性方法，零副作用，適合所有體型。',
        'zero_downtime': '零恢復期',
        'zero_downtime_desc': '立即恢復日常活動，無需恢復期或特殊護理程序。',
        // Testimonial section
        'transformation_trust': '值得信賴的轉變',
        'testimonial_text': '不僅更豐滿，還更健康、更自信——這是真正的升級！我的女神曲線療程體驗是變革性的。效果自然美麗，自信心的提升令人難以置信。',
        'testimonial_name': 'Jennifer Lau',
        'testimonial_role': '健康愛好者',
        'experience_rating': '體驗評分：',
        // Perfect For section
        'perfect_for': '適合對象',
        'perfect_for_desc': '我們的女神曲線療程適合尋求天然增強和恢復的女性',
        'post_pregnancy': '產後恢復',
        'post_pregnancy_desc': '希望在懷孕和哺乳後恢復胸部體積和緊實度的女性。',
        'natural_enhancement_title': '天然增強',
        'natural_enhancement_card_desc': '尋求更豐滿、更緊實胸部而不需手術或合成植入物的女性。',
        'age_related_changes': '年齡相關變化',
        'age_related_changes_desc': '因衰老或荷爾蒙變化而經歷體積、緊實度或彈性下降的女性。',
        'asymmetry_correction': '不對稱矯正',
        'asymmetry_correction_desc': '希望改善天然胸部對稱性和比例而不需侵入性手術的女性。',
        'awakens_natural_beauty': '我們的女神曲線療程喚醒您的天然美麗，增強您的曲線同時保持完全自然的外觀和感覺。',
        // FAQ section
        'faqs': '常見問題',
        'faq_subtitle': '關於我們女神曲線增強項目的專家見解',
        'faq_how_works': '療程如何運作？',
        'faq_how_works_answer': '我們的女神曲線療程使用先進的生物刺激技術和天然活性成分的獨特組合，在細胞層面活化乳房組織，促進天然緊實和增強。',
        'faq_sessions': '建議多少次療程？',
        'faq_sessions_answer': '雖然許多客戶在2-3次療程後就注意到改善，我們通常建議進行6-8次療程以獲得最佳效果，然後每3-4個月進行維護療程以持續增強效果。',
        'faq_painful': '療程會疼痛嗎？',
        'faq_painful_answer': '不會，療程完全非侵入性且無痛。大多數客戶將其描述為溫暖、放鬆的體驗，溫和的刺激實際上相當舒適。',
        'faq_duration': '效果能持續多久？',
        'faq_duration_answer': '通過適當的維護療程，效果可以持續數年。療程刺激您身體的自然過程，定期維護有助於長期保持增強的緊實度、形狀和體積。',
        'ready_transform': '準備好天然轉變了嗎？',
        'experience_revolutionary': '體驗我們革命性的女神曲線療程進行天然增強。',
        'book_consultation': '預約諮詢',
        // Final booking section
        'embrace_goddess': '擁抱內在女神',
        'embrace_goddess_desc': '體驗我們女神曲線療程的變革性益處。立即預約諮詢，開始您的天然增強和自信之旅。',
        'book_appointment': '預約療程',
        'advanced_technology': '先進技術',
        'advanced_technology_desc': '細胞層面活化',
        'natural_enhancement_feature': '天然增強',
        'natural_enhancement_feature_desc': '看起來和感覺都真實的效果',
        'no_side_effects': '無副作用',
        'no_side_effects_desc': '完全安全且非侵入性'
      },
      'zh-Hans': {
        'natural_enhancement': '天然增强',
        'natural_enhancement_desc': '紧实、塑型、焕活',
        'non_invasive': '非侵入式解决方案',
        'non_invasive_desc': '安全、无痛、无副作用',
        'book_now': '立即预约',
        'treatment_benefits': '疗程效益',
        'visible_transformations': '可见转变',
        'enhancement_tab': '增强效果',
        'firmness_tab': '紧实度',
        'non_invasive_tab': '非侵入式',
        'loading': '载入中...',
        // Benefits section
        'benefits_generic_desc': '体验我们先进治疗技术的好处。',
        'visible_transformations_desc': '我们的先进技术在短短几次疗程后就能带来明显的增强效果，为您的自信和健康带来持久的益处。',
        // Tab content
        'natural_fullness': '天然丰满',
        'natural_fullness_desc': '通过细胞活化体验改善的体积和自然外观效果。',
        'enhanced_confidence': '增强自信',
        'enhanced_confidence_desc': '透过改善比例和对称性，让您对自己的身体更加自信和舒适。',
        'improved_firmness': '改善紧实度',
        'improved_firmness_desc': '刺激胶原蛋白生成和组织强化，显著提升紧实度和挺拔轮廓。',
        'youthful_appearance': '年轻外观',
        'youthful_appearance_desc': '恢复和修复组织，呈现更年轻、自然和充满活力的外观。',
        'safe_natural': '安全天然',
        'safe_natural_desc': '完全非侵入性方法，零副作用，适合所有体型。',
        'zero_downtime': '零恢复期',
        'zero_downtime_desc': '立即恢复日常活动，无需恢复期或特殊护理程序。',
        // Testimonial section
        'transformation_trust': '值得信赖的转变',
        'testimonial_text': '不仅更丰满，还更健康、更自信——这是真正的升级！我的女神曲线疗程体验是变革性的。效果自然美丽，自信心的提升令人难以置信。',
        'testimonial_name': 'Jennifer Lau',
        'testimonial_role': '健康爱好者',
        'experience_rating': '体验评分：',
        // Perfect For section
        'perfect_for': '适合对象',
        'perfect_for_desc': '我们的女神曲线疗程适合寻求天然增强和恢复的女性',
        'post_pregnancy': '产后恢复',
        'post_pregnancy_desc': '希望在怀孕和哺乳后恢复胸部体积和紧实度的女性。',
        'natural_enhancement_title': '天然增强',
        'natural_enhancement_card_desc': '寻求更丰满、更紧实胸部而不需手术或合成植入物的女性。',
        'age_related_changes': '年龄相关变化',
        'age_related_changes_desc': '因衰老或荷尔蒙变化而经历体积、紧实度或弹性下降的女性。',
        'asymmetry_correction': '不对称矫正',
        'asymmetry_correction_desc': '希望改善天然胸部对称性和比例而不需侵入性手术的女性。',
        'awakens_natural_beauty': '我们的女神曲线疗程唤醒您的天然美丽，增强您的曲线同时保持完全自然的外观和感觉。',
        // FAQ section
        'faqs': '常见问题',
        'faq_subtitle': '关于我们女神曲线增强项目的专家见解',
        'faq_how_works': '疗程如何运作？',
        'faq_how_works_answer': '我们的女神曲线疗程使用先进的生物刺激技术和天然活性成分的独特组合，在细胞层面活化乳房组织，促进天然紧实和增强。',
        'faq_sessions': '建议多少次疗程？',
        'faq_sessions_answer': '虽然许多客户在2-3次疗程后就注意到改善，我们通常建议进行6-8次疗程以获得最佳效果，然后每3-4个月进行维护疗程以持续增强效果。',
        'faq_painful': '疗程会疼痛吗？',
        'faq_painful_answer': '不会，疗程完全非侵入性且无痛。大多数客户将其描述为温暖、放松的体验，温和的刺激实际上相当舒适。',
        'faq_duration': '效果能持续多久？',
        'faq_duration_answer': '通过适当的维护疗程，效果可以持续数年。疗程刺激您身体的自然过程，定期维护有助于长期保持增强的紧实度、形状和体积。',
        'ready_transform': '准备好天然转变了吗？',
        'experience_revolutionary': '体验我们革命性的女神曲线疗程进行天然增强。',
        'book_consultation': '预约咨询',
        // Final booking section
        'embrace_goddess': '拥抱内在女神',
        'embrace_goddess_desc': '体验我们女神曲线疗程的变革性益处。立即预约咨询，开始您的天然增强和自信之旅。',
        'book_appointment': '预约疗程',
        'advanced_technology': '先进技术',
        'advanced_technology_desc': '细胞层面活化',
        'natural_enhancement_feature': '天然增强',
        'natural_enhancement_feature_desc': '看起来和感觉都真实的效果',
        'no_side_effects': '无副作用',
        'no_side_effects_desc': '完全安全且非侵入性'
      }
    }
    
    const currentLang = language === 'zh-Hant' ? 'zh-Hant' : (language === 'zh-Hans' ? 'zh-Hans' : 'en')
    return uiText[currentLang]?.[key] || uiText['en']?.[key] || key
  }
  
  // Set up the carousel API and event listener
  React.useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap())
    })
  }, [api])

  // Handle indicator clicks
  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  // Instead of using framer motion, use a simpler approach
  const FadeInSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
      <div className={`animate-fade-in ${className}`}>
        {children}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">{getUIText('loading')}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-white text-gray-800">
      {/* Hero Section with Dynamic Content */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-50 to-blue-50"></div>
        
        {/* Tech pattern overlay */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full tech-pattern-bg opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 lg:col-span-5">
              <div>
                <div className="mb-4">
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800 mb-4">
                    <span className="text-teal-600">{getTitle()}</span>
                  </h1>
                </div>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="rounded-md bg-slate-50 p-4 border-l-4 border-teal-500">
                    <p className="text-sm text-gray-700 font-medium">{getUIText('natural_enhancement')}</p>
                    <p className="text-xs text-gray-500">{getUIText('natural_enhancement_desc')}</p>
                  </div>
                  <div className="rounded-md bg-slate-50 p-4 border-l-4 border-teal-500">
                    <p className="text-sm text-gray-700 font-medium">{getUIText('non_invasive')}</p>
                    <p className="text-xs text-gray-500">{getUIText('non_invasive_desc')}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                  {getDescription()}
                </p>
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-md transition-colors">
                  {getUIText('book_now')}
                </button>
              </div>
            </div>
            <div className="md:col-span-6 lg:col-span-7 relative">
              <div className="relative h-[500px] rounded-xl overflow-hidden">
                <div className="absolute right-0 top-0 w-full h-full">
                  {/* Hero image */}
                  <div className="relative w-full h-full bg-gradient-to-r from-teal-50 to-blue-50">
                    <img
                      src="/images/placeholders/goddess-curves-hero.jpg" 
                      alt={getTitle()}
                      className="w-full h-full object-cover"
                    />
                    <div className="w-full h-full bg-gradient-to-r from-white to-transparent absolute top-0 z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Dynamic Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              <span className="text-teal-600">{getUIText('treatment_benefits')}</span>
            </h2>
            <p className="text-gray-600 text-lg">
              {getLocalizedContent('long_description', 'Our revolutionary approach uses advanced technologies and natural methods to enhance beauty and wellness from within.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getBenefits().slice(0, 3).map((benefit: string, index: number) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-70"></div>
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit}</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                    {getUIText('benefits_generic_desc')}
                </p>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with Data Visualization */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-10">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  <span className="text-teal-600">{getUIText('visible_transformations')}</span>
                </h2>
                <p className="text-gray-600 mb-4">
                  {getUIText('visible_transformations_desc')}
                </p>
                <div className="w-24 h-1 bg-teal-600"></div>
              </div>
              
              <Tabs defaultValue="enhancement" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border border-gray-200">
                  <TabsTrigger value="enhancement" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    {getUIText('enhancement_tab')}
                  </TabsTrigger>
                  <TabsTrigger value="firmness" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    {getUIText('firmness_tab')}
                  </TabsTrigger>
                  <TabsTrigger value="noninvasive" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    {getUIText('non_invasive_tab')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="enhancement" className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">{getUIText('natural_fullness')}</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '85%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">85%</span>
                        </div>
                        <p className="text-gray-600">{getUIText('natural_fullness_desc')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" y1="9" x2="9.01" y2="9" />
                          <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">{getUIText('enhanced_confidence')}</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '92%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">92%</span>
                        </div>
                        <p className="text-gray-600">{getUIText('enhanced_confidence_desc')}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="firmness" className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8" />
                          <path d="M12 4C7.03 4 3 7.582 3 12h18c0-4.418-4.03-8-9-8Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">{getUIText('improved_firmness')}</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '87%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">87%</span>
                        </div>
                        <p className="text-gray-600">{getUIText('improved_firmness_desc')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="3" y1="9" x2="21" y2="9" />
                          <line x1="9" y1="21" x2="9" y2="9" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">{getUIText('youthful_appearance')}</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '83%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">83%</span>
                        </div>
                        <p className="text-gray-600">{getUIText('youthful_appearance_desc')}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="noninvasive" className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.342a2 2 0 0 0-.602-1.43l-4.44-4.342A2 2 0 0 0 13.56 2H6a2 2 0 0 0-2 2z" />
                          <path d="M9 13h6" />
                          <path d="M9 17h3" />
                          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">{getUIText('safe_natural')}</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '100%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">100%</span>
                        </div>
                        <p className="text-gray-600">{getUIText('safe_natural_desc')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
                          <path d="M2 20h20" />
                          <path d="M14 12v.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">{getUIText('zero_downtime')}</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '100%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">100%</span>
                        </div>
                        <p className="text-gray-600">{getUIText('zero_downtime_desc')}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="relative rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 p-8">
              <div className="absolute top-0 right-0 h-24 w-24 bg-teal-50"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 text-gray-800">{getUIText('transformation_trust')}</h3>
                
                <div className="mb-8 relative">
                  <div className="text-teal-600 text-4xl absolute -top-2 -left-2">"</div>
                  <p className="text-gray-600 italic pl-6 pr-4">
                    {getUIText('testimonial_text')}
                  </p>
                  <div className="text-teal-600 text-4xl absolute -bottom-8 right-0">"</div>
                </div>
                
                <div className="flex items-center mt-10">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{getUIText('testimonial_name')}</p>
                    <p className="text-sm text-gray-500">{getUIText('testimonial_role')}</p>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center">
                  <div className="mr-2 text-sm text-gray-500">{getUIText('experience_rating')}</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="relative py-16 bg-slate-700 text-white overflow-hidden">
        <div className="absolute inset-0 tech-pattern-bg opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white">
              <span className="text-teal-400">{getUIText('perfect_for')}</span>
            </h2>
            <p className="text-gray-300 text-lg">
              {getUIText('perfect_for_desc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 22h14" />
                  <path d="M5 2h14" />
                  <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                  <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{getUIText('post_pregnancy')}</h3>
              <p className="text-gray-300 text-sm">
                {getUIText('post_pregnancy_desc')}
              </p>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{getUIText('natural_enhancement_title')}</h3>
              <p className="text-gray-300 text-sm">
                {getUIText('natural_enhancement_card_desc')}
              </p>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 14.14 14.14" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{getUIText('age_related_changes')}</h3>
              <p className="text-gray-300 text-sm">
                {getUIText('age_related_changes_desc')}
              </p>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{getUIText('asymmetry_correction')}</h3>
              <p className="text-gray-300 text-sm">
                {getUIText('asymmetry_correction_desc')}
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-white text-lg max-w-2xl mx-auto">
              {getUIText('awakens_natural_beauty')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section with Tech Elements */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              {getUIText('faqs')}
            </h2>
            <p className="text-gray-600 text-lg">
              {getUIText('faq_subtitle')}
            </p>
            <div className="w-24 h-1 bg-teal-600 mx-auto mt-6"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">{getUIText('faq_how_works')}</h3>
                <p className="text-gray-600 relative z-10">
                  {getUIText('faq_how_works_answer')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">{getUIText('faq_sessions')}</h3>
                <p className="text-gray-600 relative z-10">
                  {getUIText('faq_sessions_answer')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">{getUIText('faq_painful')}</h3>
                <p className="text-gray-600 relative z-10">
                  {getUIText('faq_painful_answer')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">{getUIText('faq_duration')}</h3>
                <p className="text-gray-600 relative z-10">
                  {getUIText('faq_duration_answer')}
                </p>
              </div>
            </div>
            
            <div className="mt-12 bg-teal-600 rounded-lg p-8 text-white shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{getUIText('ready_transform')}</h3>
                <p>{getUIText('experience_revolutionary')}</p>
              </div>
              <button className="bg-white text-teal-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                {getUIText('book_consultation')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="relative py-20 bg-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 tech-pattern-bg opacity-30"></div>
        
        {/* Tech elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-teal-400/20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full border border-teal-400/30"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-teal-600/5"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              <span className="text-teal-400">{getUIText('embrace_goddess')}</span>
            </h2>
            <p className="text-gray-300 text-lg mb-10">
              {getUIText('embrace_goddess_desc')}
            </p>
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-10 rounded-md">
              {getUIText('book_appointment')}
            </button>
            
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-teal-400 font-bold mb-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m4.9 4.9 14.2 14.2" />
                  </svg>
                  {getUIText('advanced_technology')}
                </div>
                <p className="text-gray-400">{getUIText('advanced_technology_desc')}</p>
              </div>
              
              <div className="text-center">
                <div className="text-teal-400 font-bold mb-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  {getUIText('natural_enhancement_feature')}
                </div>
                <p className="text-gray-400">{getUIText('natural_enhancement_feature_desc')}</p>
              </div>
              
              <div className="text-center">
                <div className="text-teal-400 font-bold mb-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.8 11.3 2 22l10.7-3.79" />
                    <path d="M4 3h.01" />
                    <path d="M22 8h.01" />
                    <path d="M15 2h.01" />
                    <path d="M22 20h.01" />
                    <path d="m22 2-20 20" />
                  </svg>
                  {getUIText('no_side_effects')}
                </div>
                <p className="text-gray-400">{getUIText('no_side_effects_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
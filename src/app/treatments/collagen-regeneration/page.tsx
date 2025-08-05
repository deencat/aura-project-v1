"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import TreatmentImage from '@/components/TreatmentImage'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

export default function CollagenRegenerationPage() {
  const [serviceData, setServiceData] = useState<ServiceData | null>(null)
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  // Fetch service data from API
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/api/services/12')
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
    return getLocalizedContent('name', 'Collagen Regeneration')
  }

  // Get service description
  const getDescription = () => {
    return getLocalizedContent('short_description', 'Boost your skin\'s natural collagen production for improved elasticity, firmness, and a more youthful appearance.')
  }

  // Get service benefits array
  const getBenefits = (): string[] => {
    const benefits = getLocalizedContent('benefits', 'Improved skin elasticity\nReduced fine lines and wrinkles\nIncreased firmness\nEnhanced skin texture\nYouthful glow restoration\nNatural collagen boost')
    return benefits.split('\n').filter((benefit: string) => benefit.trim())
  }

  // Get localized UI text
  const getUIText = (key: string): string => {
    const uiText: Record<string, Record<string, string>> = {
      'en': {
        'loading': 'Loading...',
        'book_treatment': 'Book Treatment',
        'learn_more': 'Learn More',
        'book_now': 'Book Now',
        'anti_aging': 'Anti-Aging',
        'skin_elasticity': 'Skin Elasticity',
        'firming': 'Firming',
        'fine_lines': 'Fine Lines',
        'wrinkles': 'Wrinkles',
        'youthful_glow': 'Youthful Glow',
        'technology_benefits': 'Technology Benefits',
        'technology_benefits_desc': 'Experience the transformative power of advanced collagen regeneration',
        'improved_elasticity': 'Improved Skin Elasticity',
        'improved_elasticity_desc': 'Restores your skin\'s natural bounce and flexibility, helping it return to its original shape after stretching or contracting.',
        'reduced_lines': 'Reduced Fine Lines & Wrinkles',
        'reduced_lines_desc': 'Smooths out existing fine lines and wrinkles while preventing new ones from forming by strengthening the skin\'s structure.',
        'increased_firmness': 'Increased Firmness',
        'increased_firmness_desc': 'Tightens loose skin and improves its overall firmness, giving your face a more sculpted and youthful appearance.',
        'enhanced_texture': 'Enhanced Skin Texture',
        'enhanced_texture_desc': 'Creates smoother, more refined skin texture by promoting cell turnover and reducing the appearance of pores and scars.',
        'how_it_works': 'How It Works',
        'how_it_works_desc': 'Our comprehensive approach to collagen regeneration',
        'thermal_energy': 'Thermal Energy Delivery',
        'thermal_energy_desc': 'Our technology delivers controlled thermal energy deep into the dermis layer, precisely targeting the collagen-producing cells.',
        'cellular_activation': 'Cellular Activation',
        'cellular_activation_desc': 'The thermal energy activates fibroblast cells, which are responsible for producing new collagen and elastin fibers.',
        'collagen_synthesis': 'Collagen Synthesis',
        'collagen_synthesis_desc': 'Stimulated cells begin producing new collagen, which gradually rebuilds and strengthens your skin\'s structure.',
        'regeneration_process': 'Regeneration Process',
        'regeneration_process_desc': 'Over the following weeks, your skin continues to improve as new collagen matures and integrates.',
        'expected_results': 'Expected Results',
        'expected_results_desc': 'Visible improvements in skin quality and appearance',
        'immediate_improvement': 'Immediate Improvement',
        'immediate_improvement_desc': 'Skin feels tighter and smoother immediately after treatment.',
        'progressive_enhancement': 'Progressive Enhancement',
        'progressive_enhancement_desc': 'Continued improvement over 3-6 months as new collagen develops.',
        'long_lasting': 'Long-Lasting Results',
        'long_lasting_desc': 'Effects can last 12-18 months with proper skincare maintenance.',
        'faqs': 'FAQs',
        'faq_subtitle': 'Common questions about Collagen Regeneration treatment',
        'faq_how_works': 'How does collagen regeneration work?',
        'faq_how_works_answer': 'The treatment uses thermal energy to stimulate fibroblast cells in the dermis layer, which produce new collagen and elastin fibers. This process gradually rebuilds and strengthens your skin\'s structure over time.',
        'faq_sessions': 'How many sessions do I need?',
        'faq_sessions_answer': 'Most clients see excellent results with 3-4 sessions spaced 4-6 weeks apart. Your aesthetic practitioner will create a personalized treatment plan based on your skin condition and goals.',
        'faq_downtime': 'Is there any downtime?',
        'faq_downtime_answer': 'There\'s minimal to no downtime. You may experience mild redness for a few hours after treatment. You can return to normal activities immediately.',
        'faq_suitable': 'Who is suitable for this treatment?',
        'faq_suitable_answer': 'This treatment is suitable for most adults with aging concerns, fine lines, wrinkles, or loss of skin elasticity. A consultation will determine if you\'re a good candidate.',
        'ready_transform': 'Ready to Regenerate Your Collagen?',
        'ready_transform_desc': 'Restore your skin\'s youthful structure and enjoy lasting anti-aging benefits.',
        'book_consultation': 'Book Consultation'
      },
      'zh-Hant': {
        'loading': '載入中...',
        'book_treatment': '預約療程',
        'learn_more': '了解更多',
        'book_now': '立即預約',
        'anti_aging': '抗老化',
        'skin_elasticity': '肌膚彈性',
        'firming': '緊緻',
        'fine_lines': '細紋',
        'wrinkles': '皺紋',
        'youthful_glow': '年輕光澤',
        'technology_benefits': '技術優勢',
        'technology_benefits_desc': '體驗先進膠原蛋白再生的變革力量',
        'improved_elasticity': '改善肌膚彈性',
        'improved_elasticity_desc': '恢復肌膚天然彈性和柔韌性，幫助肌膚在拉伸或收縮後回復原狀。',
        'reduced_lines': '減少細紋和皺紋',
        'reduced_lines_desc': '撫平現有細紋和皺紋，同時通過強化肌膚結構預防新紋路形成。',
        'increased_firmness': '增強緊緻度',
        'increased_firmness_desc': '收緊鬆弛肌膚，改善整體緊緻度，讓面部輪廓更加立體年輕。',
        'enhanced_texture': '提升肌膚質感',
        'enhanced_texture_desc': '通過促進細胞更新，減少毛孔和疤痕外觀，創造更光滑細膩的肌膚質感。',
        'how_it_works': '作用原理',
        'how_it_works_desc': '我們全面的膠原蛋白再生方法',
        'thermal_energy': '熱能傳導',
        'thermal_energy_desc': '我們的技術將受控熱能深入真皮層，精準針對膠原蛋白生成細胞。',
        'cellular_activation': '細胞激活',
        'cellular_activation_desc': '熱能激活纖維母細胞，這些細胞負責產生新的膠原蛋白和彈性纖維。',
        'collagen_synthesis': '膠原蛋白合成',
        'collagen_synthesis_desc': '受刺激的細胞開始產生新膠原蛋白，逐步重建和強化肌膚結構。',
        'regeneration_process': '再生過程',
        'regeneration_process_desc': '在接下來的數週內，隨著新膠原蛋白成熟整合，肌膚持續改善。',
        'expected_results': '預期效果',
        'expected_results_desc': '肌膚質量和外觀的明顯改善',
        'immediate_improvement': '即時改善',
        'immediate_improvement_desc': '療程後肌膚立即感覺更緊緻光滑。',
        'progressive_enhancement': '漸進提升',
        'progressive_enhancement_desc': '隨著新膠原蛋白生成，3-6個月內持續改善。',
        'long_lasting': '持久效果',
        'long_lasting_desc': '在適當護膚維護下，效果可持續12-18個月。',
        'faqs': '常見問題',
        'faq_subtitle': '關於膠原蛋白再生療程的常見問題',
        'faq_how_works': '膠原蛋白再生如何運作？',
        'faq_how_works_answer': '療程使用熱能刺激真皮層的纖維母細胞，產生新的膠原蛋白和彈性纖維。這個過程逐步重建和強化肌膚結構。',
        'faq_sessions': '需要多少次療程？',
        'faq_sessions_answer': '大多數客戶通過3-4次療程獲得優異效果，間隔4-6週。美容師會根據您的肌膚狀況和目標制定個人化療程計劃。',
        'faq_downtime': '需要恢復期嗎？',
        'faq_downtime_answer': '恢復期極短或無需恢復期。療程後可能出現數小時輕微泛紅。可立即恢復正常活動。',
        'faq_suitable': '誰適合這個療程？',
        'faq_suitable_answer': '這個療程適合大多數有老化問題、細紋、皺紋或肌膚彈性流失的成年人。諮詢將確定您是否為合適候選人。',
        'ready_transform': '準備再生您的膠原蛋白嗎？',
        'ready_transform_desc': '恢復肌膚年輕結構，享受持久的抗老效果。',
        'book_consultation': '預約諮詢'
      },
      'zh-Hans': {
        'loading': '载入中...',
        'book_treatment': '预约疗程',
        'learn_more': '了解更多',
        'book_now': '立即预约',
        'anti_aging': '抗老化',
        'skin_elasticity': '肌肤弹性',
        'firming': '紧致',
        'fine_lines': '细纹',
        'wrinkles': '皱纹',
        'youthful_glow': '年轻光泽',
        'technology_benefits': '技术优势',
        'technology_benefits_desc': '体验先进胶原蛋白再生的变革力量',
        'improved_elasticity': '改善肌肤弹性',
        'improved_elasticity_desc': '恢复肌肤天然弹性和柔韧性，帮助肌肤在拉伸或收缩后回复原状。',
        'reduced_lines': '减少细纹和皱纹',
        'reduced_lines_desc': '抚平现有细纹和皱纹，同时通过强化肌肤结构预防新纹路形成。',
        'increased_firmness': '增强紧致度',
        'increased_firmness_desc': '收紧松弛肌肤，改善整体紧致度，让面部轮廓更加立体年轻。',
        'enhanced_texture': '提升肌肤质感',
        'enhanced_texture_desc': '通过促进细胞更新，减少毛孔和疤痕外观，创造更光滑细腻的肌肤质感。',
        'how_it_works': '作用原理',
        'how_it_works_desc': '我们全面的胶原蛋白再生方法',
        'thermal_energy': '热能传导',
        'thermal_energy_desc': '我们的技术将受控热能深入真皮层，精准针对胶原蛋白生成细胞。',
        'cellular_activation': '细胞激活',
        'cellular_activation_desc': '热能激活纤维母细胞，这些细胞负责产生新的胶原蛋白和弹性纤维。',
        'collagen_synthesis': '胶原蛋白合成',
        'collagen_synthesis_desc': '受刺激的细胞开始产生新胶原蛋白，逐步重建和强化肌肤结构。',
        'regeneration_process': '再生过程',
        'regeneration_process_desc': '在接下来的数周内，随着新胶原蛋白成熟整合，肌肤持续改善。',
        'expected_results': '预期效果',
        'expected_results_desc': '肌肤质量和外观的明显改善',
        'immediate_improvement': '即时改善',
        'immediate_improvement_desc': '疗程后肌肤立即感觉更紧致光滑。',
        'progressive_enhancement': '渐进提升',
        'progressive_enhancement_desc': '随着新胶原蛋白生成，3-6个月内持续改善。',
        'long_lasting': '持久效果',
        'long_lasting_desc': '在适当护肤维护下，效果可持续12-18个月。',
        'faqs': '常见问题',
        'faq_subtitle': '关于胶原蛋白再生疗程的常见问题',
        'faq_how_works': '胶原蛋白再生如何运作？',
        'faq_how_works_answer': '疗程使用热能刺激真皮层的纤维母细胞，产生新的胶原蛋白和弹性纤维。这个过程逐步重建和强化肌肤结构。',
        'faq_sessions': '需要多少次疗程？',
        'faq_sessions_answer': '大多数客户通过3-4次疗程获得优异效果，间隔4-6周。美容师会根据您的肌肤状况和目标制定个人化疗程计划。',
        'faq_downtime': '需要恢复期吗？',
        'faq_downtime_answer': '恢复期极短或无需恢复期。疗程后可能出现数小时轻微泛红。可立即恢复正常活动。',
        'faq_suitable': '谁适合这个疗程？',
        'faq_suitable_answer': '这个疗程适合大多数有老化问题、细纹、皱纹或肌肤弹性流失的成年人。咨询将确定您是否为合适候选人。',
        'ready_transform': '准备再生您的胶原蛋白吗？',
        'ready_transform_desc': '恢复肌肤年轻结构，享受持久的抗老效果。',
        'book_consultation': '预约咨询'
      }
    }
    
    const currentLang = language === 'zh-Hant' ? 'zh-Hant' : (language === 'zh-Hans' ? 'zh-Hans' : 'en')
    return uiText[currentLang]?.[key] || uiText['en']?.[key] || key
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">{getUIText('loading')}</div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative py-20 min-h-[700px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/treatments/facials/collagen-regeneration/hero.jpg')"
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div className="text-white">
              <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
                {getTitle().split(' ').map((word, index) => (
                  <span key={index}>
                    {index === 1 || (language.startsWith('zh') && index === 2) ? (
                      <span className="text-rose-300">{word}</span>
                    ) : (
                      word
                    )}
                    {index < getTitle().split(' ').length - 1 && ' '}
                  </span>
                ))}
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-rose-300 border border-rose-300/50 rounded-full px-4 py-1 text-sm font-medium">{getUIText('anti_aging')}</span>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-rose-300 border border-rose-300/50 rounded-full px-4 py-1 text-sm font-medium">{getUIText('skin_elasticity')}</span>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-rose-300 border border-rose-300/50 rounded-full px-4 py-1 text-sm font-medium">{getUIText('firming')}</span>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-rose-300 border border-rose-300/50 rounded-full px-4 py-1 text-sm font-medium">{getUIText('fine_lines')}</span>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-rose-300 border border-rose-300/50 rounded-full px-4 py-1 text-sm font-medium">{getUIText('wrinkles')}</span>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-rose-300 border border-rose-300/50 rounded-full px-4 py-1 text-sm font-medium">{getUIText('youthful_glow')}</span>
              </div>
              <p className="mt-6 text-lg text-white/90 leading-relaxed drop-shadow-md">
                {getDescription()}
              </p>
              <div className="mt-8">
                <Button className="rounded-full bg-rose-500 hover:bg-rose-600 px-8 py-3 text-white shadow-lg hover:shadow-xl transition-all duration-300" data-testid="hero-book-now">
                  {getUIText('book_now')}
                </Button>
              </div>
            </div>
            <div>
              {/* Empty space to maintain grid layout and focus on background image */}
            </div>
          </div>
        </div>
      </section>
      
      {/* Treatment Description */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              {getTitle()}: <span className="text-primary">{getUIText('technology_benefits')}</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              {getUIText('technology_benefits_desc')}
            </p>
            <p className="mt-4 text-lg text-gray-600">
              {getLocalizedContent('long_description', 'Our Collagen Regeneration treatment utilizes advanced technology to stimulate your skin\'s natural collagen production process, revitalizing your skin from within and restoring its youthful appearance.')}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-100">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </div>
              <h3 className="mb-4 text-xl font-bold text-primary">{getUIText('improved_elasticity')}</h3>
                <p className="text-gray-600">
                {getUIText('improved_elasticity_desc')}
                </p>
              </div>
              
            <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-100">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </div>
              <h3 className="mb-4 text-xl font-bold text-primary">{getUIText('reduced_lines')}</h3>
                <p className="text-gray-600">
                {getUIText('reduced_lines_desc')}
                </p>
              </div>
              
            <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-100">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.13 12.03a7.48 7.48 0 0 0 0 0"/><path d="M5.13 12.03c.13 1.72.95 3.4 2.46 4.45"/><path d="M5.13 12.03a7.5 7.5 0 1 1 8-7.54"/><path d="m13 18-4.5 4.5"/><path d="m17 14 3.5-3.5"/><path d="m14 14 3-3"/><path d="m11 17 2-2"/></svg>
                </div>
              <h3 className="mb-4 text-xl font-bold text-primary">{getUIText('increased_firmness')}</h3>
                <p className="text-gray-600">
                {getUIText('increased_firmness_desc')}
                </p>
              </div>
              
            <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-100">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="m8 11 4 4 4-4"/><path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/></svg>
                </div>
              <h3 className="mb-4 text-xl font-bold text-primary">{getUIText('enhanced_texture')}</h3>
                <p className="text-gray-600">
                {getUIText('enhanced_texture_desc')}
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              {getUIText('how_it_works').split(' ').map((word, index) => (
                <span key={index}>
                  {index === 1 || index === 2 ? (
                    <span className="text-primary">{word}</span>
                  ) : (
                    word
                  )}
                  {index < getUIText('how_it_works').split(' ').length - 1 && ' '}
                </span>
              ))}
            </h2>
            <p className="mt-4 text-gray-600">
              {getUIText('how_it_works_desc')}
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-12">
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <span>1</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-primary">{getUIText('thermal_energy')}</h3>
                  <p className="text-gray-600">
                    {getUIText('thermal_energy_desc')}
                  </p>
                </div>
                
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <span>2</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-primary">{getUIText('cellular_activation')}</h3>
                  <p className="text-gray-600">
                    {getUIText('cellular_activation_desc')}
                  </p>
                </div>
              </div>
              
              <div className="space-y-12">
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <span>3</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-primary">{getUIText('collagen_synthesis')}</h3>
                  <p className="text-gray-600">
                    {getUIText('collagen_synthesis_desc')}
                  </p>
                </div>
                
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <span>4</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-primary">{getUIText('regeneration_process')}</h3>
                  <p className="text-gray-600">
                    {getUIText('regeneration_process_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Expected Results Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              {getUIText('expected_results').split(' ').map((word, index) => (
                <span key={index}>
                  {index === 1 ? (
                    <span className="text-primary">{word}</span>
                  ) : (
                    word
                  )}
                  {index < getUIText('expected_results').split(' ').length - 1 && ' '}
                </span>
              ))}
            </h2>
            <p className="mt-4 text-gray-600">
              {getUIText('expected_results_desc')}
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="border-primary/20 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/><path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/><path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/><path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/></svg>
                </div>
                  <h3 className="mb-2 text-lg font-bold text-primary">{getUIText('immediate_improvement')}</h3>
                  <p className="text-gray-600 text-sm">
                    {getUIText('immediate_improvement_desc')}
                </p>
              </CardContent>
            </Card>
            
              <Card className="border-primary/20 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M8 6l4-4 4 4"/><path d="M8 18l4 4 4-4"/></svg>
                </div>
                  <h3 className="mb-2 text-lg font-bold text-primary">{getUIText('progressive_enhancement')}</h3>
                  <p className="text-gray-600 text-sm">
                    {getUIText('progressive_enhancement_desc')}
                </p>
              </CardContent>
            </Card>
            
              <Card className="border-primary/20 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                </div>
                  <h3 className="mb-2 text-lg font-bold text-primary">{getUIText('long_lasting')}</h3>
                  <p className="text-gray-600 text-sm">
                    {getUIText('long_lasting_desc')}
                </p>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                {getUIText('faqs')}
            </h2>
              <p className="mt-4 text-gray-600">
                {getUIText('faq_subtitle')}
              </p>
            </div>
            
            <div className="mt-12">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="how-works" className="bg-white rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    {getUIText('faq_how_works')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {getUIText('faq_how_works_answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sessions" className="bg-white rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    {getUIText('faq_sessions')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {getUIText('faq_sessions_answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="downtime" className="bg-white rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    {getUIText('faq_downtime')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {getUIText('faq_downtime_answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="suitable" className="bg-white rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    {getUIText('faq_suitable')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {getUIText('faq_suitable_answer')}
                  </AccordionContent>
                </AccordionItem>
            </Accordion>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            {getUIText('ready_transform')}
          </h2>
          <p className="mt-4 text-lg text-white/90">
            {getUIText('ready_transform_desc')}
          </p>
          <div className="mt-8">
            <Button className="rounded-full bg-white px-8 py-3 text-primary hover:bg-gray-100">
              {getUIText('book_consultation')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 
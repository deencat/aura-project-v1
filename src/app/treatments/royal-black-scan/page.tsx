"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import TreatmentImage from '@/components/TreatmentImage'
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

export default function RoyalBlackScanPage() {
  const [serviceData, setServiceData] = useState<ServiceData | null>(null)
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  // Fetch service data from API
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/api/services/10')
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
    return getLocalizedContent('name', 'Royal Black Scan')
  }

  // Get service description
  const getDescription = () => {
    return getLocalizedContent('short_description', 'Advanced technology that targets all types of spots, pigmentation, and skin blemishes with precision.')
  }

  // Get service benefits array
  const getBenefits = (): string[] => {
    const benefits = getLocalizedContent('benefits', 'Targets all spot types\nPrecise wavelength technology\nStimulates collagen production')
    return benefits.split('\n').filter((benefit: string) => benefit.trim())
  }

  // Get localized UI text
  const getUIText = (key: string): string => {
    const uiText: Record<string, Record<string, string>> = {
      'en': {
        'loading': 'Loading...',
        'book_treatment': 'Book Treatment',
        'learn_more': 'Learn More',
        'hormonal_spots': 'Hormonal Spots',
        'freckles': 'Freckles',
        'age_spots': 'Age Spots',
        'liver_spots': 'Liver Spots',
        'sun_spots': 'Sun Spots',
        'pigmentation': 'Pigmentation',
        'comprehensive_treatment': 'Comprehensive Treatment',
        'restore_flawless_skin': 'Restore Flawless Skin',
        'technology_advantages': 'Technology Advantages',
        'technology_advantages_desc': 'The Royal Black Scan is today\'s top technology for solving spot problems',
        'advanced_wavelength': 'Advanced Wavelength Technology',
        'advanced_wavelength_desc': 'The Royal Black Scan uses precise 1064nm/755nm wavelength technology. These two wavelengths target different types of pigment spots. The 1064nm wavelength treats stubborn deep pigmentation, while the 755nm wavelength addresses lighter surface pigmentation.',
        'optical_principle': 'Optical Principle Application',
        'optical_principle_desc': 'The core technology uses advanced optical principles, with the laser beam penetrating the skin surface in an extremely short time, directly reaching the deep location where spots form, making the treatment process more effective and rapid.',
        'targets_various_spots': 'Targets Various Spot Types',
        'targets_various_spots_desc': 'The technology effectively treats not only black spots but also addresses various types of spot issues, such as age spots, freckles, and hormonal spots. It also improves overall skin quality, helping to reduce uneven skin texture and skin laxity.',
        'stimulates_collagen': 'Stimulates Collagen Production',
        'stimulates_collagen_desc': 'The technology stimulates collagen production in the deep layer of the skin. When the skin absorbs the energy, it not only breaks down the melanin deposits but also promotes collagen regeneration, helping to improve skin elasticity and reduce the signs of aging.',
        'treatment_process': 'Treatment Process',
        'treatment_process_desc': 'Our comprehensive approach ensures optimal results',
        'consultation_analysis': 'Consultation & Skin Analysis',
        'consultation_analysis_desc': 'Our specialists analyze your skin type and condition to identify the specific pigmentation issues.',
        'customized_plan': 'Customized Treatment Plan',
        'customized_plan_desc': 'Based on the analysis, we create a personalized treatment protocol targeting your specific needs.',
        'preparation_protection': 'Preparation & Protection',
        'preparation_protection_desc': 'Your skin is carefully cleansed and prepared, with proper protection applied to surrounding areas.',
        'technology_application': 'Advanced Technology Application',
        'technology_application_desc': 'The Royal Black Scan technology is applied to precisely target and break down the pigmentation.',
        'post_treatment_care': 'Post-Treatment Care',
        'post_treatment_care_desc': 'Soothing serums and SPF protection are applied to enhance results and protect the treated skin.',
        'expected_results': 'Expected Results',
        'expected_results_desc': 'See the transformation that Royal Black Scan can deliver',
        'visible_improvement': 'Visible Improvement',
        'visible_improvement_desc': 'Most clients see noticeable reduction in spots and pigmentation within 2-4 weeks after treatment.',
        'skin_texture': 'Enhanced Skin Texture',
        'skin_texture_desc': 'Beyond spot removal, experience smoother, more even-toned skin with improved overall texture.',
        'long_lasting': 'Long-Lasting Results',
        'long_lasting_desc': 'With proper sun protection and care, results can last for years with maintenance treatments.',
        'faqs': 'FAQs',
        'faq_subtitle': 'Common questions about Royal Black Scan treatment',
        'faq_how_works': 'How does the Royal Black Scan work?',
        'faq_how_works_answer': 'The treatment uses advanced laser technology with specific wavelengths (1064nm and 755nm) to target melanin deposits in the skin. The laser energy breaks down the pigment particles, which are then naturally eliminated by the body\'s immune system.',
        'faq_sessions': 'How many sessions will I need?',
        'faq_sessions_answer': 'Most clients require 3-6 sessions spaced 4-6 weeks apart for optimal results. The exact number depends on the type, size, and depth of pigmentation being treated.',
        'faq_painful': 'Is the treatment painful?',
        'faq_painful_answer': 'Most clients describe the sensation as similar to a rubber band snapping against the skin. We use cooling techniques and topical numbing to minimize discomfort.',
        'faq_downtime': 'Is there any downtime?',
        'faq_downtime_answer': 'There\'s minimal downtime. You may experience slight redness and darkening of treated spots for 7-14 days as they naturally shed. Most clients return to normal activities immediately.',
        'ready_transform': 'Ready to Transform Your Skin?',
        'ready_transform_desc': 'Take the first step towards flawless, spot-free skin with our advanced Royal Black Scan treatment.',
        'book_consultation': 'Book Consultation',
        'book_now': 'BOOK NOW'
      },
      'zh-Hant': {
        'loading': '載入中...',
        'book_treatment': '預約療程',
        'learn_more': '了解更多',
        'hormonal_spots': '荷爾蒙斑',
        'freckles': '雀斑',
        'age_spots': '老年斑',
        'liver_spots': '肝斑',
        'sun_spots': '日曬斑',
        'pigmentation': '色素沉著',
        'comprehensive_treatment': '全面療程',
        'restore_flawless_skin': '恢復完美肌膚',
        'technology_advantages': '技術優勢',
        'technology_advantages_desc': '女皇激光掃斑術是當今解決斑點問題的頂尖技術',
        'advanced_wavelength': '先進波長技術',
        'advanced_wavelength_desc': '女皇激光掃斑術採用革命性1064nm/755nm蜂巢激光技術。深層波長精準擊碎頑固色斑，表層波長處理淺層色素，雙重激光技術一掃即淨，重現無瑕美肌。',
        'optical_principle': '光學原理應用',
        'optical_principle_desc': '核心技術使用先進的光學原理，激光束在極短時間內穿透皮膚表面，直接到達斑點形成的深層位置，使治療過程更有效、更快速。',
        'targets_various_spots': '針對各種斑點類型',
        'targets_various_spots_desc': '該技術不僅有效治療黑斑，還能處理各種類型的斑點問題，如老年斑、雀斑和荷爾蒙斑。它還能改善整體肌膚質量，有助於減少不均勻的肌膚紋理和皮膚鬆弛。',
        'stimulates_collagen': '刺激膠原蛋白生成',
        'stimulates_collagen_desc': '該技術刺激皮膚深層的膠原蛋白生成。當皮膚吸收能量時，不僅分解黑色素沉積，還促進膠原蛋白再生，有助於改善皮膚彈性並減少衰老跡象。',
        'treatment_process': '療程流程',
        'treatment_process_desc': '我們的全面方法確保最佳效果',
        'consultation_analysis': '諮詢與皮膚分析',
        'consultation_analysis_desc': '我們的專家分析您的皮膚類型和狀況，以識別特定的色素沉著問題。',
        'customized_plan': '定制療程計劃',
        'customized_plan_desc': '基於分析，我們制定針對您特定需求的個性化療程方案。',
        'preparation_protection': '準備與保護',
        'preparation_protection_desc': '仔細清潔和準備您的皮膚，並對周圍區域施加適當保護。',
        'technology_application': '女皇激光技術應用',
        'technology_application_desc': '應用女皇激光掃斑術精準針對並擊碎頑固色斑，星級美肌即時重現。',
        'post_treatment_care': '療程後護理',
        'post_treatment_care_desc': '應用舒緩精華和防曬保護，以增強效果並保護治療後的皮膚。',
        'expected_results': '預期效果',
        'expected_results_desc': '見證女皇激光掃斑術能帶來的星級轉變',
        'visible_improvement': '明顯改善',
        'visible_improvement_desc': '大多數客戶在療程後2-4週內看到斑點和色素沉著的明顯減少。',
        'skin_texture': '增強肌膚質地',
        'skin_texture_desc': '除了祛斑，還能體驗更光滑、更均勻的膚色和改善的整體肌膚質地。',
        'long_lasting': '持久效果',
        'long_lasting_desc': '通過適當的防曬和護理，效果可持續數年，並可通過維護療程保持。',
        'faqs': '常見問題',
        'faq_subtitle': '關於女皇激光掃斑術療程的常見問題',
        'faq_how_works': '女皇激光掃斑術如何運作？',
        'faq_how_works_answer': '療程使用先進的激光技術，具有特定波長（1064nm和755nm）來針對皮膚中的黑色素沉積。激光能量分解色素顆粒，然後由身體的免疫系統自然消除。',
        'faq_sessions': '我需要多少次療程？',
        'faq_sessions_answer': '大多數客戶需要3-6次療程，間隔4-6週，以獲得最佳效果。確切次數取決於治療的色素沉著類型、大小和深度。',
        'faq_painful': '療程會疼痛嗎？',
        'faq_painful_answer': '大多數客戶將感覺描述為類似橡皮筋彈在皮膚上。我們使用冷卻技術和局部麻醉來減少不適。',
        'faq_downtime': '有恢復期嗎？',
        'faq_downtime_answer': '恢復期很少。您可能會在7-14天內經歷輕微紅腫和治療斑點變暗，因為它們會自然脫落。大多數客戶可立即恢復正常活動。',
        'ready_transform': '準備好轉變您的肌膚了嗎？',
        'ready_transform_desc': '邁出第一步，通過我們頂尖的女皇激光掃斑術獲得完美無瑕的星級美肌。',
        'book_consultation': '預約諮詢',
        'book_now': '立即預約'
      },
      'zh-Hans': {
        'loading': '载入中...',
        'book_treatment': '预约疗程',
        'learn_more': '了解更多',
        'hormonal_spots': '荷尔蒙斑',
        'freckles': '雀斑',
        'age_spots': '老年斑',
        'liver_spots': '肝斑',
        'sun_spots': '日晒斑',
        'pigmentation': '色素沉着',
        'comprehensive_treatment': '全面疗程',
        'restore_flawless_skin': '恢复完美肌肤',
        'technology_advantages': '技术优势',
        'technology_advantages_desc': '女皇激光扫斑术是当今解决斑点问题的顶尖技术',
        'advanced_wavelength': '先进波长技术',
        'advanced_wavelength_desc': '女皇激光扫斑术采用革命性1064nm/755nm蜂巢激光技术。深层波长精准击碎顽固色斑，表层波长处理浅层色素，双重激光技术一扫即净，重现无瑕美肌。',
        'optical_principle': '光学原理应用',
        'optical_principle_desc': '核心技术使用先进的光学原理，激光束在极短时间内穿透皮肤表面，直接到达斑点形成的深层位置，使治疗过程更有效、更快速。',
        'targets_various_spots': '针对各种斑点类型',
        'targets_various_spots_desc': '该技术不仅有效治疗黑斑，还能处理各种类型的斑点问题，如老年斑、雀斑和荷尔蒙斑。它还能改善整体肌肤质量，有助于减少不均匀的肌肤纹理和皮肤松弛。',
        'stimulates_collagen': '刺激胶原蛋白生成',
        'stimulates_collagen_desc': '该技术刺激皮肤深层的胶原蛋白生成。当皮肤吸收能量时，不仅分解黑色素沉积，还促进胶原蛋白再生，有助于改善皮肤弹性并减少衰老迹象。',
        'treatment_process': '疗程流程',
        'treatment_process_desc': '我们的全面方法确保最佳效果',
        'consultation_analysis': '咨询与皮肤分析',
        'consultation_analysis_desc': '我们的专家分析您的皮肤类型和状况，以识别特定的色素沉着问题。',
        'customized_plan': '定制疗程计划',
        'customized_plan_desc': '基于分析，我们制定针对您特定需求的个性化疗程方案。',
        'preparation_protection': '准备与保护',
        'preparation_protection_desc': '仔细清洁和准备您的皮肤，并对周围区域施加适当保护。',
        'technology_application': '女皇激光技术应用',
        'technology_application_desc': '应用女皇激光扫斑术精准针对并击碎顽固色斑，星级美肌即时重现。',
        'post_treatment_care': '疗程后护理',
        'post_treatment_care_desc': '应用舒缓精华和防晒保护，以增强效果并保护治疗后的皮肤。',
        'expected_results': '预期效果',
        'expected_results_desc': '见证女皇激光扫斑术能带来的星级转变',
        'visible_improvement': '明显改善',
        'visible_improvement_desc': '大多数客户在疗程后2-4周内看到斑点和色素沉着的明显减少。',
        'skin_texture': '增强肌肤质地',
        'skin_texture_desc': '除了祛斑，还能体验更光滑、更均匀的肤色和改善的整体肌肤质地。',
        'long_lasting': '持久效果',
        'long_lasting_desc': '通过适当的防晒和护理，效果可持续数年，并可通过维护疗程保持。',
        'faqs': '常见问题',
        'faq_subtitle': '关于女皇激光扫斑术疗程的常见问题',
        'faq_how_works': '女皇激光扫斑术如何运作？',
        'faq_how_works_answer': '疗程使用先进的激光技术，具有特定波长（1064nm和755nm）来针对皮肤中的黑色素沉积。激光能量分解色素颗粒，然后由身体的免疫系统自然消除。',
        'faq_sessions': '我需要多少次疗程？',
        'faq_sessions_answer': '大多数客户需要3-6次疗程，间隔4-6周，以获得最佳效果。确切次数取决于治疗的色素沉着类型、大小和深度。',
        'faq_painful': '疗程会疼痛吗？',
        'faq_painful_answer': '大多数客户将感觉描述为类似橡皮筋弹在皮肤上。我们使用冷却技术和局部麻醉来减少不适。',
        'faq_downtime': '有恢复期吗？',
        'faq_downtime_answer': '恢复期很少。您可能会在7-14天内经历轻微红肿和治疗斑点变暗，因为它们会自然脱落。大多数客户可立即恢复正常活动。',
        'ready_transform': '准备好转变您的肌肤了吗？',
        'ready_transform_desc': '迈出第一步，通过我们顶尖的女皇激光扫斑术获得完美无瑕的星级美肌。',
        'book_consultation': '预约咨询',
        'book_now': '立即预约'
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
      <section className="relative flex min-h-[70vh] items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <TreatmentImage 
            category="treatments"
            treatment="royal-black-scan"
            type="hero"
            alt={getTitle()}
            fill
            className="object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                {getTitle().split(' ').map((word, index) => (
                  <span key={index}>
                    {index === 1 ? (
                      <span className="text-yellow-300">{word}</span>
                    ) : (
                      word
                    )}
                    {index < getTitle().split(' ').length - 1 && ' '}
                  </span>
                ))}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-100">
                {getDescription()}
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 text-sm text-white">{getUIText('hormonal_spots')}</span>
                  <span className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 text-sm text-white">{getUIText('freckles')}</span>
                  <span className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 text-sm text-white">{getUIText('age_spots')}</span>
                  <span className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 text-sm text-white">{getUIText('liver_spots')}</span>
                  <span className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 text-sm text-white">{getUIText('sun_spots')}</span>
                  <span className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 text-sm text-white">{getUIText('pigmentation')}</span>
                  <span className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 text-sm text-white">{getUIText('comprehensive_treatment')}</span>
                </div>
              </div>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Button className="rounded-full bg-yellow-400 px-8 py-3 text-sm font-medium text-black hover:bg-yellow-300" data-testid="hero-book-now">
                  {getUIText('book_treatment')}
                </Button>
                <Button variant="outline" className="rounded-full border-white bg-white/10 backdrop-blur-sm px-8 py-3 text-sm font-medium text-white hover:bg-white hover:text-black">
                  {getUIText('learn_more')}
                </Button>
              </div>
            </div>
            
            {/* Empty div for grid layout balance */}
            <div className="hidden md:block"></div>
          </div>
        </div>
      </section>
      
      {/* Treatment Info Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              {getUIText('restore_flawless_skin').split(' ').map((word, index) => (
                <span key={index}>
                  {index === 1 ? (
                    <span className="text-primary">{word}</span>
                  ) : (
                    word
                  )}
                  {index < getUIText('restore_flawless_skin').split(' ').length - 1 && ' '}
                </span>
              ))}
            </h2>
            
            <div className="mt-8 space-y-6 text-gray-700">
              <p>
                {getLocalizedContent('long_description', 'Using cutting-edge technology, we precisely target and break down all types of spots on your skin. The Royal Black Scan is a non-invasive treatment that effectively reduces and eliminates spots on the skin.')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Advantages Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl text-center">
              {getUIText('technology_advantages').split(' ').map((word, index) => (
                <span key={index}>
                  {index === 1 ? (
                    <span className="text-primary">{word}</span>
                  ) : (
                    word
                  )}
                  {index < getUIText('technology_advantages').split(' ').length - 1 && ' '}
                </span>
              ))}
            </h2>
            <p className="mt-4 text-center text-gray-600">
              {getUIText('technology_advantages_desc')}
            </p>
            
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="14.31" y1="8" x2="20.05" y2="17.94"/><line x1="9.69" y1="8" x2="21.17" y2="8"/><line x1="7.38" y1="12" x2="13.12" y2="2.06"/><line x1="9.69" y1="16" x2="3.95" y2="6.06"/><line x1="14.31" y1="16" x2="2.83" y2="16"/><line x1="16.62" y1="12" x2="10.88" y2="21.94"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">{getUIText('advanced_wavelength')}</h3>
                <p className="text-gray-600">
                  {getUIText('advanced_wavelength_desc')}
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 22 4-10 4 10"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">{getUIText('optical_principle')}</h3>
                <p className="text-gray-600">
                  {getUIText('optical_principle_desc')}
                </p>
                  </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">{getUIText('targets_various_spots')}</h3>
                <p className="text-gray-600">
                  {getUIText('targets_various_spots_desc')}
                </p>
                  </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">{getUIText('stimulates_collagen')}</h3>
                <p className="text-gray-600">
                  {getUIText('stimulates_collagen_desc')}
                </p>
                  </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              {getUIText('treatment_process').split(' ').map((word, index) => (
                <span key={index}>
                  {index === 1 ? (
                    <span className="text-primary">{word}</span>
                  ) : (
                    word
                  )}
                  {index < getUIText('treatment_process').split(' ').length - 1 && ' '}
                </span>
              ))}
          </h2>
            <p className="mt-4 text-gray-600">
              {getUIText('treatment_process_desc')}
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="relative">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gray-200"></div>
              
              <div className="space-y-12">
                {[
                  {
                    step: '01',
                    title: getUIText('consultation_analysis'),
                    description: getUIText('consultation_analysis_desc')
                  },
                  {
                    step: '02',
                    title: getUIText('customized_plan'),
                    description: getUIText('customized_plan_desc')
                  },
                  {
                    step: '03',
                    title: getUIText('preparation_protection'),
                    description: getUIText('preparation_protection_desc')
                  },
                  {
                    step: '04',
                    title: getUIText('technology_application'),
                    description: getUIText('technology_application_desc')
                  },
                  {
                    step: '05',
                    title: getUIText('post_treatment_care'),
                    description: getUIText('post_treatment_care_desc')
                  }
                ].map((item, index) => (
                  <div key={index} className="relative flex gap-8">
                    <div className="flex-none">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                        <span className="text-sm font-bold">{item.step}</span>
                      </div>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-xl font-bold text-black">{item.title}</h3>
                      <p className="mt-2 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Expected Results Section */}
      <section className="bg-gray-50 py-20">
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
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                  </div>
                  <h3 className="mb-4 text-xl font-bold">{getUIText('visible_improvement')}</h3>
                  <p className="text-gray-600">{getUIText('visible_improvement_desc')}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 22 4-10 4 10"/></svg>
                  </div>
                  <h3 className="mb-4 text-xl font-bold">{getUIText('skin_texture')}</h3>
                  <p className="text-gray-600">{getUIText('skin_texture_desc')}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                </div>
                  <h3 className="mb-4 text-xl font-bold">{getUIText('long_lasting')}</h3>
                  <p className="text-gray-600">{getUIText('long_lasting_desc')}</p>
                </CardContent>
              </Card>
              </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="bg-white py-20">
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
                <AccordionItem value="item-1" className="border border-gray-200 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                    {getUIText('faq_how_works')}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {getUIText('faq_how_works_answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border border-gray-200 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                    {getUIText('faq_sessions')}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {getUIText('faq_sessions_answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border border-gray-200 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                    {getUIText('faq_painful')}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {getUIText('faq_painful_answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="border border-gray-200 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                    {getUIText('faq_downtime')}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {getUIText('faq_downtime_answer')}
                  </AccordionContent>
                </AccordionItem>
            </Accordion>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            {getUIText('ready_transform')}
          </h2>
          <p className="mt-4 text-lg opacity-90">
            {getUIText('ready_transform_desc')}
          </p>
          <div className="mt-8">
            <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-medium">
              {getUIText('book_consultation')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 
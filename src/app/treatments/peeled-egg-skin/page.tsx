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

export default function PeeledEggSkinPage() {
  const [serviceData, setServiceData] = useState<ServiceData | null>(null)
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  // Fetch service data from API
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/api/services/11')
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
    return getLocalizedContent('name', 'Peeled Egg Skin')
  }

  // Get service description
  const getDescription = () => {
    return getLocalizedContent('short_description', 'Advanced Korean ultrasonic pulse technology that deeply cleanses pores and reveals silky smooth skin like a freshly peeled egg.')
  }

  // Get service benefits array
  const getBenefits = (): string[] => {
    const benefits = getLocalizedContent('benefits', 'Silky smooth texture\nDeep cleansing purification\nRadiant firmness enhancement')
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
        'silky_smooth': 'Silky Smooth',
        'deep_cleansing': 'Deep Cleansing', 
        'radiant_firmness': 'Radiant Firmness',
        'gentle_care': 'Gentle Care',
        'comprehensive_treatment': 'Comprehensive Treatment',
        'korean_technology': 'Korean Technology',
        'treatment_quartet': 'Treatment Quartet',
        'treatment_quartet_desc': 'According to your skin\'s condition, we carefully select potent serums to infuse multiple nutrients deep into the skin, providing comprehensive repair and leaving your complexion as smooth, delicate, and flawless as a freshly peeled egg!',
        'one_session_benefits': 'With just one session, you can address multiple skin concerns at once. From deep cleansing, detoxification, and firming to intensive serum infusion, enjoy four benefits in one treatment and instantly reveal your silky, radiant, "peeled egg" skin!',
        'silky_smooth_texture': 'Silky Smooth Texture',
        'silky_smooth_desc': 'The core goal of our Peeled Egg Skin treatment is to transform your skin texture. Through specialized brightening essences, your skin tone becomes more even and radiant, with a dewy glow that others will envy. The treatment makes your skin softer and more vibrant, radiating with a healthy, youthful appearance.',
        'deep_cleansing_purification': 'Deep Cleansing Purification',
        'deep_cleansing_desc': 'Using ultrasonic pulse vibration technology, we deeply cleanse your pores, thoroughly removing hidden impurities, old keratin, and dead skin cells that regular cleansing and makeup removal can\'t reach. This thorough purification not only leaves your skin refreshed but also enhances the absorption of skincare products.',
        'radiant_firmness_enhancement': 'Radiant Firmness Enhancement',
        'radiant_firmness_desc': 'The third step of our Peeled Egg Skin treatment focuses on enhancing skin radiance and firmness. Our beauticians\' exclusive massage techniques promote facial lymphatic circulation, helping to drain excess water and toxins. Premium essences are carefully selected to make your skin appear more youthful and elastic, restoring its natural glow.',
        'gentle_nourishment': 'Gentle Nourishment',
        'gentle_nourishment_desc': 'The final step is gentle nourishment, which provides essential hydration and protection for your skin. According to your skin\'s condition, we carefully select potent serums to infuse multiple nutrients deep into the skin, providing comprehensive repair and ensuring it stays constantly hydrated, soft, and healthy.',
        'treatment_process': 'Treatment Process',
        'treatment_process_desc': 'Our comprehensive four-step approach ensures optimal results',
        'step_cleansing': 'Deep Ultrasonic Cleansing',
        'step_cleansing_desc': 'Advanced Korean ultrasonic technology removes deep impurities and dead skin cells from pores.',
        'step_drainage': 'Lymphatic Drainage Massage',
        'step_drainage_desc': 'Professional massage techniques promote circulation and eliminate toxins and excess fluids.',
        'step_infusion': 'Customized Serum Infusion',
        'step_infusion_desc': 'Potent serums are selected based on your skin condition and infused deep into the skin.',
        'step_protection': 'Hydration & Protection',
        'step_protection_desc': 'Final step provides lasting hydration and protection to maintain your "peeled egg" skin.',
        'expected_results': 'Expected Results',
        'expected_results_desc': 'Transform your skin with visible improvements after just one session',
        'immediate_smoothness': 'Immediate Smoothness',
        'immediate_smoothness_desc': 'Feel the silky smooth texture of "peeled egg" skin immediately after treatment.',
        'enhanced_absorption': 'Enhanced Product Absorption',
        'enhanced_absorption_desc': 'Your skincare products will absorb better and work more effectively on cleansed skin.',
        'radiant_glow': 'Radiant Natural Glow',
        'radiant_glow_desc': 'Experience a healthy, youthful radiance that lasts for weeks after treatment.',
        'faqs': 'FAQs',
        'faq_subtitle': 'Common questions about Peeled Egg Skin treatment',
        'faq_how_works': 'How does the Peeled Egg Skin treatment work?',
        'faq_how_works_answer': 'The treatment uses advanced Korean ultrasonic pulse technology to deeply cleanse pores and remove impurities. Combined with professional massage techniques and customized serum infusion, it provides comprehensive skin renewal in four steps.',
        'faq_sessions': 'How often should I get this treatment?',
        'faq_sessions_answer': 'For optimal results, we recommend monthly treatments. However, the frequency can be adjusted based on your skin condition and concerns. Your aesthetician will provide personalized recommendations.',
        'faq_suitable': 'Is this treatment suitable for sensitive skin?',
        'faq_suitable_answer': 'Yes, the treatment is gentle and suitable for most skin types, including sensitive skin. The ultrasonic technology is non-invasive, and we customize the serum selection based on your skin\'s specific needs.',
        'faq_downtime': 'Is there any downtime after treatment?',
        'faq_downtime_answer': 'There\'s no downtime required. Your skin will feel immediately smoother and look more radiant. We recommend avoiding harsh products for 24 hours and using gentle moisturizer and SPF protection.',
        'ready_transform': 'Ready to Reveal Your Peeled Egg Skin?',
        'ready_transform_desc': 'Experience the transformative power of our advanced Korean technology and reveal your smoothest, most radiant skin.',
        'book_consultation': 'Book Consultation'
      },
      'zh-Hant': {
        'loading': '載入中...',
        'book_treatment': '預約療程',
        'learn_more': '了解更多',
        'book_now': '立即預約',
        'silky_smooth': '絲滑嫩白',
        'deep_cleansing': '深層潔淨',
        'radiant_firmness': '緊緻透亮',
        'gentle_care': '溫和呵護',
        'comprehensive_treatment': '全面療程',
        'korean_technology': '韓式技術',
        'treatment_quartet': '肌膚護理四重奏',
        'treatment_quartet_desc': '根據您的肌膚狀況，精心挑選強效精華，將多重營養深層注入肌膚，提供全面修護，讓肌膚如剝殼雞蛋般光滑細膩無瑕！',
        'one_session_benefits': '一次療程即可同時解決多種肌膚問題。從深層潔淨、排毒、緊緻到精華深層注入，一個療程享受四重功效，即時展現絲滑透亮的「剝殼雞蛋肌」！',
        'silky_smooth_texture': '絲滑嫩白質感',
        'silky_smooth_desc': '剝殼雞蛋肌療程的核心目標是改善肌膚質感。透過專業亮白精華，讓膚色更加均勻透亮，呈現令人羨慕的水潤光澤。療程讓肌膚更加柔軟有活力，散發健康青春的光采。',
        'deep_cleansing_purification': '深層潔淨淨化',
        'deep_cleansing_desc': '運用超聲波脈衝震動技術，深層潔淨毛孔，徹底清除一般清潔及卸妝無法觸及的隱藏污垢、老化角質及死皮細胞。這種徹底淨化不僅讓肌膚煥然一新，更能提升護膚品的吸收效果。',
        'radiant_firmness_enhancement': '緊緻透亮提升',
        'radiant_firmness_desc': '剝殼雞蛋肌療程的第三步聚焦於提升肌膚光澤和緊緻度。美容師的獨家按摩手法促進面部淋巴循環，協助排走多餘水分及毒素。精選頂級精華讓肌膚顯得更加年輕有彈性，重現天然光澤。',
        'gentle_nourishment': '溫和滋養呵護',
        'gentle_nourishment_desc': '最後一步是溫和滋養，為肌膚提供必需的水分和保護。根據肌膚狀況，精心挑選強效精華，將多重營養深層注入肌膚，提供全面修護，確保肌膚持續水潤、柔軟、健康。',
        'treatment_process': '療程流程',
        'treatment_process_desc': '我們的全面四步驟方法確保最佳效果',
        'step_cleansing': '深層超聲波潔淨',
        'step_cleansing_desc': '先進韓式超聲波技術清除毛孔深層污垢和死皮細胞。',
        'step_drainage': '淋巴排毒按摩',
        'step_drainage_desc': '專業按摩手法促進循環，排除毒素和多餘水分。',
        'step_infusion': '客製精華注入',
        'step_infusion_desc': '根據肌膚狀況選擇強效精華，深層注入肌膚。',
        'step_protection': '保濕與保護',
        'step_protection_desc': '最後步驟提供持久保濕和保護，維持「剝殼雞蛋肌」效果。',
        'expected_results': '預期效果',
        'expected_results_desc': '一次療程即可見肌膚明顯改善',
        'immediate_smoothness': '即時絲滑感',
        'immediate_smoothness_desc': '療程後立即感受「剝殼雞蛋肌」的絲滑質感。',
        'enhanced_absorption': '提升護膚品吸收',
        'enhanced_absorption_desc': '潔淨後的肌膚讓護膚品更好吸收，發揮更佳效果。',
        'radiant_glow': '自然透亮光澤',
        'radiant_glow_desc': '體驗健康青春的光澤，效果可持續數週。',
        'faqs': '常見問題',
        'faq_subtitle': '關於剝殼雞蛋肌療程的常見問題',
        'faq_how_works': '剝殼雞蛋肌療程如何運作？',
        'faq_how_works_answer': '療程使用先進韓式超聲波脈衝技術深層潔淨毛孔並清除污垢。結合專業按摩手法和客製精華注入，通過四個步驟提供全面肌膚更新。',
        'faq_sessions': '多久應該做一次這個療程？',
        'faq_sessions_answer': '為獲得最佳效果，我們建議每月進行療程。但頻率可根據您的肌膚狀況和需求調整。美容師會提供個人化建議。',
        'faq_suitable': '這個療程適合敏感肌膚嗎？',
        'faq_suitable_answer': '是的，療程溫和，適合大多數肌膚類型，包括敏感肌膚。超聲波技術是非侵入性的，我們會根據您肌膚的特定需求客製精華選擇。',
        'faq_downtime': '療程後需要恢復期嗎？',
        'faq_downtime_answer': '無需恢復期。療程後肌膚會立即感覺更光滑，看起來更透亮。我們建議24小時內避免使用刺激性產品，使用溫和保濕霜和防曬保護。',
        'ready_transform': '準備展現您的剝殼雞蛋肌嗎？',
        'ready_transform_desc': '體驗我們先進韓式技術的變革力量，展現您最光滑、最透亮的肌膚。',
        'book_consultation': '預約諮詢'
      },
      'zh-Hans': {
        'loading': '载入中...',
        'book_treatment': '预约疗程',
        'learn_more': '了解更多',
        'book_now': '立即预约',
        'silky_smooth': '丝滑嫩白',
        'deep_cleansing': '深层洁净',
        'radiant_firmness': '紧致透亮',
        'gentle_care': '温和呵护',
        'comprehensive_treatment': '全面疗程',
        'korean_technology': '韩式技术',
        'treatment_quartet': '肌肤护理四重奏',
        'treatment_quartet_desc': '根据您的肌肤状况，精心挑选强效精华，将多重营养深层注入肌肤，提供全面修护，让肌肤如剥壳鸡蛋般光滑细腻无瑕！',
        'one_session_benefits': '一次疗程即可同时解决多种肌肤问题。从深层洁净、排毒、紧致到精华深层注入，一个疗程享受四重功效，即时展现丝滑透亮的"剥壳鸡蛋肌"！',
        'silky_smooth_texture': '丝滑嫩白质感',
        'silky_smooth_desc': '剥壳鸡蛋肌疗程的核心目标是改善肌肤质感。透过专业亮白精华，让肤色更加均匀透亮，呈现令人羡慕的水润光泽。疗程让肌肤更加柔软有活力，散发健康青春的光采。',
        'deep_cleansing_purification': '深层洁净净化',
        'deep_cleansing_desc': '运用超声波脉冲震动技术，深层洁净毛孔，彻底清除一般清洁及卸妆无法触及的隐藏污垢、老化角质及死皮细胞。这种彻底净化不仅让肌肤焕然一新，更能提升护肤品的吸收效果。',
        'radiant_firmness_enhancement': '紧致透亮提升',
        'radiant_firmness_desc': '剥壳鸡蛋肌疗程的第三步聚焦于提升肌肤光泽和紧致度。美容师的独家按摩手法促进面部淋巴循环，协助排走多余水分及毒素。精选顶级精华让肌肤显得更加年轻有弹性，重现天然光泽。',
        'gentle_nourishment': '温和滋养呵护',
        'gentle_nourishment_desc': '最后一步是温和滋养，为肌肤提供必需的水分和保护。根据肌肤状况，精心挑选强效精华，将多重营养深层注入肌肤，提供全面修护，确保肌肤持续水润、柔软、健康。',
        'treatment_process': '疗程流程',
        'treatment_process_desc': '我们的全面四步骤方法确保最佳效果',
        'step_cleansing': '深层超声波洁净',
        'step_cleansing_desc': '先进韩式超声波技术清除毛孔深层污垢和死皮细胞。',
        'step_drainage': '淋巴排毒按摩',
        'step_drainage_desc': '专业按摩手法促进循环，排除毒素和多余水分。',
        'step_infusion': '客制精华注入',
        'step_infusion_desc': '根据肌肤状况选择强效精华，深层注入肌肤。',
        'step_protection': '保湿与保护',
        'step_protection_desc': '最后步骤提供持久保湿和保护，维持"剥壳鸡蛋肌"效果。',
        'expected_results': '预期效果',
        'expected_results_desc': '一次疗程即可见肌肤明显改善',
        'immediate_smoothness': '即时丝滑感',
        'immediate_smoothness_desc': '疗程后立即感受"剥壳鸡蛋肌"的丝滑质感。',
        'enhanced_absorption': '提升护肤品吸收',
        'enhanced_absorption_desc': '洁净后的肌肤让护肤品更好吸收，发挥更佳效果。',
        'radiant_glow': '自然透亮光泽',
        'radiant_glow_desc': '体验健康青春的光泽，效果可持续数周。',
        'faqs': '常见问题',
        'faq_subtitle': '关于剥壳鸡蛋肌疗程的常见问题',
        'faq_how_works': '剥壳鸡蛋肌疗程如何运作？',
        'faq_how_works_answer': '疗程使用先进韩式超声波脉冲技术深层洁净毛孔并清除污垢。结合专业按摩手法和客制精华注入，通过四个步骤提供全面肌肤更新。',
        'faq_sessions': '多久应该做一次这个疗程？',
        'faq_sessions_answer': '为获得最佳效果，我们建议每月进行疗程。但频率可根据您的肌肤状况和需求调整。美容师会提供个人化建议。',
        'faq_suitable': '这个疗程适合敏感肌肤吗？',
        'faq_suitable_answer': '是的，疗程温和，适合大多数肌肤类型，包括敏感肌肤。超声波技术是非侵入性的，我们会根据您肌肤的特定需求客制精华选择。',
        'faq_downtime': '疗程后需要恢复期吗？',
        'faq_downtime_answer': '无需恢复期。疗程后肌肤会立即感觉更光滑，看起来更透亮。我们建议24小时内避免使用刺激性产品，使用温和保湿霜和防晒保护。',
        'ready_transform': '准备展现您的剥壳鸡蛋肌吗？',
        'ready_transform_desc': '体验我们先进韩式技术的变革力量，展现您最光滑、最透亮的肌肤。',
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
          backgroundImage: "url('/images/treatments/facials/peeled-egg-skin/hero.jpg')"
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
                      <span className="text-amber-300">{word}</span>
                    ) : (
                      word
                    )}
                    {index < getTitle().split(' ').length - 1 && ' '}
                  </span>
                ))}
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-amber-300 border border-amber-300/50 rounded-full px-4 py-1 text-sm font-medium">{getUIText('silky_smooth')}</span>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-amber-300 border border-amber-300/50 rounded-full px-4 py-1 text-sm font-medium">{getUIText('deep_cleansing')}</span>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-amber-300 border border-amber-300/50 rounded-full px-4 py-1 text-sm font-medium">{getUIText('radiant_firmness')}</span>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-amber-300 border border-amber-300/50 rounded-full px-4 py-1 text-sm font-medium">{getUIText('gentle_care')}</span>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-amber-300 border border-amber-300/50 rounded-full px-4 py-1 text-sm font-medium">{getUIText('korean_technology')}</span>
              </div>
              <p className="mt-6 text-lg text-white/90 leading-relaxed drop-shadow-md">
                {getDescription()}
              </p>
              <div className="mt-8">
                <Button className="rounded-full bg-amber-500 hover:bg-amber-600 px-8 py-3 text-white shadow-lg hover:shadow-xl transition-all duration-300" data-testid="hero-book-now">
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
              {getTitle()}: <span className="text-primary">{getUIText('treatment_quartet')}</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              {getUIText('treatment_quartet_desc')}
            </p>
            <p className="mt-4 text-lg text-gray-600">
              {getUIText('one_session_benefits')}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">{getUIText('silky_smooth_texture')}</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  {getUIText('silky_smooth_desc')}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">{getUIText('deep_cleansing_purification')}</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  {getUIText('deep_cleansing_desc')}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">{getUIText('radiant_firmness_enhancement')}</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  {getUIText('radiant_firmness_desc')}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">{getUIText('gentle_nourishment')}</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  {getUIText('gentle_nourishment_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-20">
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
                    title: getUIText('step_cleansing'),
                    description: getUIText('step_cleansing_desc')
                  },
                  {
                    step: '02',
                    title: getUIText('step_drainage'),
                    description: getUIText('step_drainage_desc')
                  },
                  {
                    step: '03',
                    title: getUIText('step_infusion'),
                    description: getUIText('step_infusion_desc')
                  },
                  {
                    step: '04',
                    title: getUIText('step_protection'),
                    description: getUIText('step_protection_desc')
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
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 22 4-10 4 10"/></svg>
              </div>
                  <h3 className="mb-4 text-xl font-bold">{getUIText('immediate_smoothness')}</h3>
                  <p className="text-gray-600">{getUIText('immediate_smoothness_desc')}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
              </div>
                  <h3 className="mb-4 text-xl font-bold">{getUIText('enhanced_absorption')}</h3>
                  <p className="text-gray-600">{getUIText('enhanced_absorption_desc')}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
              </div>
                  <h3 className="mb-4 text-xl font-bold">{getUIText('radiant_glow')}</h3>
                  <p className="text-gray-600">{getUIText('radiant_glow_desc')}</p>
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
                    {getUIText('faq_suitable')}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {getUIText('faq_suitable_answer')}
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

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            {getUIText('ready_transform')}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/90">
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
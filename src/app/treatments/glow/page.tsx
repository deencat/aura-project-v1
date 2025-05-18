"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TreatmentImage from '@/components/TreatmentImage'
import LocalizedServiceContent from '@/components/LocalizedServiceContent'
import { useLanguage } from '@/contexts/LanguageContext'
import type { CarouselApi } from "@/components/ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

// Define the service data with multilingual content
const glowService = {
  id: 101,
  slug: 'treatments/glow',
  category: 'Facial Services',
  price: '$1,200',
  duration: '60-75 min',
  status: 'Active',
  name: 'Luminous Glow Treatment',
  short_description: 'Our Luminous Glow Treatment is a revolutionary facial experience designed to restore your skin\'s natural radiance while providing deep hydration and illumination for a youthful, glowing complexion.',
  long_description: 'Our Luminous Glow Treatment goes beyond standard facials by targeting multiple layers of the skin to boost natural luminosity and address the root causes of dullness. Using a combination of vitamin-rich serums, hydrating agents, and specialized technology, we revitalize and refresh your skin from within.\n\nExperience the transformative power of our Luminous Glow Treatment as it brightens, balances, and rejuvenates your complexion, revealing the naturally radiant skin that has been hiding beneath the surface.',
  benefits: 'Instant Illumination\nHydration Boost\nEven Complexion\nAntioxidant Protection\nEnhanced Product Absorption',
  suitable_for: 'All skin types, including sensitive skin. Especially beneficial for those with dull, dehydrated, or uneven skin tone.',
  contraindications: 'Active skin infections, open wounds, severe acne, recent sunburn, or recent cosmetic procedures.',
  preparation: 'Avoid retinol products 48 hours before treatment. Arrive with clean skin if possible.',
  aftercare: 'Use gentle skincare products for 24 hours. Apply SPF daily. Drink plenty of water to enhance results.',
  
  // Multilingual data
  multilingual: {
    english: {
      name: 'Luminous Glow Treatment',
      short_description: 'Our Luminous Glow Treatment is a revolutionary facial experience designed to restore your skin\'s natural radiance while providing deep hydration and illumination for a youthful, glowing complexion.',
      long_description: 'Our Luminous Glow Treatment goes beyond standard facials by targeting multiple layers of the skin to boost natural luminosity and address the root causes of dullness. Using a combination of vitamin-rich serums, hydrating agents, and specialized technology, we revitalize and refresh your skin from within.\n\nExperience the transformative power of our Luminous Glow Treatment as it brightens, balances, and rejuvenates your complexion, revealing the naturally radiant skin that has been hiding beneath the surface.',
      benefits: 'Instant Illumination\nHydration Boost\nEven Complexion\nAntioxidant Protection\nEnhanced Product Absorption',
      suitable_for: 'All skin types, including sensitive skin. Especially beneficial for those with dull, dehydrated, or uneven skin tone.',
      contraindications: 'Active skin infections, open wounds, severe acne, recent sunburn, or recent cosmetic procedures.',
      preparation: 'Avoid retinol products 48 hours before treatment. Arrive with clean skin if possible.',
      aftercare: 'Use gentle skincare products for 24 hours. Apply SPF daily. Drink plenty of water to enhance results.',
    },
    traditional_chinese: {
      name: '亮膚煥采療程',
      short_description: '我們的亮膚煥采療程是一種革命性的面部體驗，旨在恢復您皮膚的自然光彩，同時提供深層保濕和亮白效果，讓您擁有年輕、閃亮的膚色。',
      long_description: '我們的亮膚煥采療程超越了標準面部護理，通過針對皮膚的多個層次來提升自然亮度並解決暗沉的根本原因。使用富含維生素的精華液、保濕劑和專業技術的組合，我們從內部活化和煥新您的皮膚。\n\n體驗我們亮膚煥采療程的變革力量，它能夠亮白、平衡和煥活您的膚色，揭示隱藏在表面之下的天然亮麗肌膚。',
      benefits: '即時亮白\n保濕提升\n均勻膚色\n抗氧化保護\n增強產品吸收',
      suitable_for: '所有膚質，包括敏感肌膚。特別適合膚色暗沉、乾燥或不均勻的人士。',
      contraindications: '活躍的皮膚感染、開放性傷口、嚴重痤瘡、近期曬傷或近期接受美容程序。',
      preparation: '治療前48小時避免使用視黃醇產品。如有可能，請保持皮膚清潔。',
      aftercare: '24小時內使用溫和的護膚產品。每天使用防曬霜。多喝水以增強效果。',
    },
    simplified_chinese: {
      name: '亮肤焕采疗程',
      short_description: '我们的亮肤焕采疗程是一种革命性的面部体验，旨在恢复您皮肤的自然光彩，同时提供深层保湿和亮白效果，让您拥有年轻、闪亮的肤色。',
      long_description: '我们的亮肤焕采疗程超越了标准面部护理，通过针对皮肤的多个层次来提升自然亮度并解决暗沉的根本原因。使用富含维生素的精华液、保湿剂和专业技术的组合，我们从内部活化和焕新您的皮肤。\n\n体验我们亮肤焕采疗程的变革力量，它能够亮白、平衡和焕活您的肤色，揭示隐藏在表面之下的天然亮丽肌肤。',
      benefits: '即时亮白\n保湿提升\n均匀肤色\n抗氧化保护\n增强产品吸收',
      suitable_for: '所有肤质，包括敏感肌肤。特别适合肤色暗沉、干燥或不均匀的人士。',
      contraindications: '活跃的皮肤感染、开放性伤口、严重痤疮、近期晒伤或近期接受美容程序。',
      preparation: '治疗前48小时避免使用视黄醇产品。如有可能，请保持皮肤清洁。',
      aftercare: '24小时内使用温和的护肤产品。每天使用防晒霜。多喝水以增强效果。',
    }
  }
}

// Benefits data with multilingual support
const benefitsData = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a2 2 0 0 0 0 4 2 2 0 0 0 0-4z"></path><path d="M12 18a2 2 0 0 0 0 4 2 2 0 0 0 0-4z"></path><path d="M5 5a2 2 0 0 0 0 4 2 2 0 0 0 0-4z"></path><path d="M19 5a2 2 0 0 0 0 4 2 2 0 0 0 0-4z"></path><path d="M5 19a2 2 0 0 0 0-4 2 2 0 0 0 0 4z"></path><path d="M19 19a2 2 0 0 0 0-4 2 2 0 0 0 0 4z"></path></svg>,
    title: {
      en: 'Instant Illumination',
      'zh-Hant': '即時亮白',
      'zh-Hans': '即时亮白'
    },
    description: {
      en: 'Experience immediate brightening and radiance restoration even after the first session',
      'zh-Hant': '即使在第一次療程後也能體驗即時亮白和光彩恢復',
      'zh-Hans': '即使在第一次疗程后也能体验即时亮白和光彩恢复'
    }
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.95 1 4.8a7.587 7.587 0 0 1 .5 2.5V20"></path><path d="M19.8 17.8a7.5 7.5 0 0 0-3.9-5.1"></path><path d="M22 20a9 9 0 0 0-9.3-9"></path></svg>,
    title: {
      en: 'Hydration Boost',
      'zh-Hant': '保濕提升',
      'zh-Hans': '保湿提升'
    },
    description: {
      en: 'Intensely hydrates all skin layers for plump, dewy, and youthful-looking skin',
      'zh-Hant': '深層保濕所有皮膚層，使皮膚豐盈、水潤且年輕',
      'zh-Hans': '深层保湿所有皮肤层，使皮肤丰盈、水润且年轻'
    }
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v6a6 6 0 0 0 12 0V2"></path><path d="M6 12v6a6 6 0 0 0 12 0v-6"></path></svg>,
    title: {
      en: 'Even Complexion',
      'zh-Hant': '均勻膚色',
      'zh-Hans': '均匀肤色'
    },
    description: {
      en: 'Balances skin tone and reduces hyperpigmentation for a more uniform appearance',
      'zh-Hant': '平衡膚色並減少色素沉著，使外觀更加均勻',
      'zh-Hans': '平衡肤色并减少色素沉着，使外观更加均匀'
    }
  }
]

export default function GlowTreatmentPage() {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = 5
  const { t, language } = useLanguage()

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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                <LocalizedServiceContent service={glowService} field="name" />
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">{t('intense_hydration', 'Intense Hydration')}</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">{t('radiant_complexion', 'Radiant Complexion')}</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">{t('even_skin_tone', 'Even Skin Tone')}</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">{t('brightening_effect', 'Brightening Effect')}</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                <LocalizedServiceContent service={glowService} field="short_description" />
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="rounded-full bg-primary px-8 py-3 text-white hover:bg-primary/90">
                    {t('book_now', 'Book Now')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <TreatmentImage 
                category="facials"
                treatment="glow"
                type="hero"
                alt={language === 'en' ? "Luminous Glow Treatment" : language === 'zh-Hant' ? "亮膚煥采療程" : "亮肤焕采疗程"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Description */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              <LocalizedServiceContent service={glowService} field="name" />
            </h2>
            <div className="mt-6 text-lg text-gray-600">
              <LocalizedServiceContent 
                service={glowService} 
                field="long_description" 
                as="div"
              />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">{t('multi_layer_hydration', 'Multi-Layer Hydration')}</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  {t('multi_layer_hydration_desc', 'Our treatment uses a specialized multi-layer hydration system that delivers moisture to different skin depths, ensuring comprehensive hydration that lasts long after your treatment has ended.')}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">{t('vitamin_infusion', 'Vitamin Infusion')}</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  {t('vitamin_infusion_desc', 'We infuse your skin with a potent blend of vitamins, including Vitamin C, B3, and E, which work together to brighten your complexion, even skin tone, and protect against environmental stressors.')}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">{t('light_therapy', 'Light Therapy Enhancement')}</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  {t('light_therapy_desc', 'Our advanced light therapy technology stimulates collagen production and cellular renewal while enhancing the absorption of active ingredients, resulting in a more profound brightening effect.')}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">{t('advanced_exfoliation', 'Advanced Exfoliation')}</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  {t('advanced_exfoliation_desc', 'Our gentle yet effective exfoliation process removes dead skin cells and impurities that cause dullness, instantly revealing fresher, more luminous skin while preparing it to receive maximum benefits from the treatment.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              {t('benefits', 'Benefits')} <span className="text-primary"><LocalizedServiceContent service={glowService} field="name" /></span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              {t('experience_transformative_results', 'Experience transformative results with our advanced radiance therapy')}
            </p>
          </div>

          {/* Photo Gallery */}
          <div className="mt-12 mb-16 mx-auto max-w-4xl">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Carousel 
                className="w-full" 
                setApi={setApi}
              >
                <CarouselContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <CarouselItem key={num} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2">
                        <div className="overflow-hidden rounded-lg bg-white">
                          <div className="aspect-square relative">
                            <TreatmentImage 
                              category="facials"
                              treatment="glow"
                              type="benefits"
                              index={num}
                              alt={["Instant Radiance", "Deep Hydration", "Even Skin Tone", "Reduced Dullness", "Long-Lasting Results"][num-1]}
                              className="w-full h-full transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {t([
                                "instant_radiance", 
                                "deep_hydration", 
                                "even_skin_tone", 
                                "reduced_dullness", 
                                "long_lasting_results"
                              ][num-1], [
                                "Instant Radiance", 
                                "Deep Hydration", 
                                "Even Skin Tone", 
                                "Reduced Dullness", 
                                "Long-Lasting Results"
                              ][num-1])}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {t([
                                "instant_radiance_desc", 
                                "deep_hydration_desc", 
                                "even_skin_tone_desc", 
                                "reduced_dullness_desc", 
                                "long_lasting_results_desc"
                              ][num-1], [
                                "Immediate boost in skin luminosity and glow",
                                "Profound moisture that lasts for days",
                                "Visibly more balanced and even complexion",
                                "Elimination of signs of tiredness and fatigue",
                                "Results that continue to improve over time"
                              ][num-1])}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:left-4 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-2 md:right-4 bg-white/80 hover:bg-white" />
              </Carousel>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeIndex === index ? 'bg-primary w-8' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefitsData.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-8 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title[language]}</h3>
                <p className="text-gray-600">
                  {benefit.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center">
              {t('faq', 'Frequently Asked Questions')}
            </h2>
            
            <div className="mt-12 space-y-6">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {t('faq_different', 'What makes the Luminous Glow Treatment different from regular facials?')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {t('faq_different_answer', 'Our Luminous Glow Treatment stands apart from standard facials through its multi-layered approach to skin brightening and hydration. While regular facials typically focus on surface cleansing and basic hydration, our treatment uses advanced technology to deliver active ingredients deep into the skin for lasting radiance. We combine vitamin infusion, light therapy, and specialized exfoliation techniques not found in conventional facials, resulting in immediately visible and longer-lasting luminosity.')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {t('faq_downtime', 'How long does the treatment take and is there any downtime?')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {t('faq_downtime_answer', 'The Luminous Glow Treatment typically takes 60-75 minutes to complete. One of the major advantages of this treatment is that there is virtually no downtime. You may experience a slight flush immediately after treatment due to increased circulation, but this typically subsides within an hour. You can apply makeup and resume normal activities immediately following your appointment, making it perfect for a pre-event glow boost or as part of your regular skincare routine.')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {t('faq_sessions', 'How many sessions do I need to see optimal results?')}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {t('faq_sessions_answer', 'While you\'ll notice an immediate improvement in your skin\'s radiance after just one session, we recommend a series of 4-6 treatments spaced 2-3 weeks apart for optimal and lasting results. This treatment schedule allows for progressive improvement in skin luminosity, texture, and tone. After completing the initial series, monthly maintenance sessions can help sustain your results. Our specialists will create a personalized treatment plan based on your specific skin concerns and goals.')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Suitable For and Contraindications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
                  {t('suitable_for', 'Suitable For')}
                </h2>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <LocalizedServiceContent service={glowService} field="suitable_for" as="p" />
                </div>
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
                  {t('contraindications', 'Contraindications')}
                </h2>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <LocalizedServiceContent service={glowService} field="contraindications" as="p" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Now Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            {t('ready_for', 'Ready for')} <span className="text-primary"><LocalizedServiceContent service={glowService} field="name" /></span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            {t('glow_cta', 'Experience the transformation of our exclusive Luminous Glow Treatment—reveal your skin\'s natural radiance, achieve that coveted dewy complexion, and step out with the confidence that comes from truly glowing skin!')}
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button className="rounded-full bg-primary px-8 py-3 text-white hover:bg-primary/90">
                {t('book_your_treatment', 'Book Your Treatment')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
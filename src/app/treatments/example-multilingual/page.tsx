"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TreatmentImage from '@/components/TreatmentImage'
import LocalizedServiceContent from '@/components/LocalizedServiceContent'
import { useLanguage } from '@/contexts/LanguageContext'

// Example service data with multilingual content
const exampleService = {
  id: 999,
  slug: 'treatments/example-multilingual',
  category: 'Example Category',
  price: '$1,200',
  duration: '60 min',
  status: 'Active',
  name: 'Example Multilingual Treatment',
  short_description: 'This is an example of a multilingual treatment page that demonstrates how to use the LocalizedServiceContent component.',
  long_description: 'This treatment page shows how to implement multilingual content using the LocalizedServiceContent component. The component automatically displays content in the user\'s selected language based on the LanguageContext.',
  benefits: 'Demonstrates multilingual support\nShows how to use LocalizedServiceContent\nProvides a template for other pages',
  suitable_for: 'All skin types and conditions',
  contraindications: 'None - this is an example page',
  preparation: 'No preparation needed',
  aftercare: 'No aftercare needed',
  
  // Multilingual data
  multilingual: {
    english: {
      name: 'Example Multilingual Treatment',
      short_description: 'This is an example of a multilingual treatment page that demonstrates how to use the LocalizedServiceContent component.',
      long_description: 'This treatment page shows how to implement multilingual content using the LocalizedServiceContent component. The component automatically displays content in the user\'s selected language based on the LanguageContext.',
      benefits: 'Demonstrates multilingual support\nShows how to use LocalizedServiceContent\nProvides a template for other pages',
      suitable_for: 'All skin types and conditions',
      contraindications: 'None - this is an example page',
      preparation: 'No preparation needed',
      aftercare: 'No aftercare needed',
    },
    traditional_chinese: {
      name: '多語言治療範例',
      short_description: '這是一個多語言治療頁面的範例，展示如何使用LocalizedServiceContent組件。',
      long_description: '此治療頁面展示了如何使用LocalizedServiceContent組件實現多語言內容。該組件根據LanguageContext自動以用戶選擇的語言顯示內容。',
      benefits: '展示多語言支持\n展示如何使用LocalizedServiceContent\n為其他頁面提供模板',
      suitable_for: '所有膚質和狀況',
      contraindications: '無 - 這是一個示例頁面',
      preparation: '無需準備',
      aftercare: '無需後續護理',
    },
    simplified_chinese: {
      name: '多语言治疗示例',
      short_description: '这是一个多语言治疗页面的示例，展示如何使用LocalizedServiceContent组件。',
      long_description: '此治疗页面展示了如何使用LocalizedServiceContent组件实现多语言内容。该组件根据LanguageContext自动以用户选择的语言显示内容。',
      benefits: '展示多语言支持\n展示如何使用LocalizedServiceContent\n为其他页面提供模板',
      suitable_for: '所有肤质和状况',
      contraindications: '无 - 这是一个示例页面',
      preparation: '无需准备',
      aftercare: '无需后续护理',
    }
  }
}

export default function ExampleMultilingualPage() {
  const { t } = useLanguage()
  
  // Helper function to format benefits as HTML
  const formatBenefits = (benefits: string) => {
    return benefits.split('\n').map((benefit, index) => (
      `<div class="flex items-start mb-2" key=${index}>
        <div class="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
        <p>${benefit}</p>
      </div>`
    )).join('')
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                <LocalizedServiceContent service={exampleService} field="name" />
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">
                  {exampleService.duration}
                </span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">
                  {exampleService.price}
                </span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                <LocalizedServiceContent service={exampleService} field="short_description" />
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
                category="example"
                treatment="multilingual"
                type="hero"
                alt="Example Multilingual Treatment"
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
              <LocalizedServiceContent service={exampleService} field="name" />
            </h2>
            <div className="mt-6 text-lg text-gray-600">
              <LocalizedServiceContent 
                service={exampleService} 
                field="long_description" 
                as="p" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
              {t('benefits', 'Benefits')}
            </h2>
            
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <LocalizedServiceContent 
                service={{
                  ...exampleService,
                  benefits: formatBenefits(exampleService.benefits),
                  multilingual: {
                    english: {
                      ...exampleService.multilingual.english,
                      benefits: formatBenefits(exampleService.multilingual.english.benefits)
                    },
                    traditional_chinese: {
                      ...exampleService.multilingual.traditional_chinese,
                      benefits: formatBenefits(exampleService.multilingual.traditional_chinese.benefits)
                    },
                    simplified_chinese: {
                      ...exampleService.multilingual.simplified_chinese,
                      benefits: formatBenefits(exampleService.multilingual.simplified_chinese.benefits)
                    }
                  }
                }} 
                field="benefits" 
                as="div" 
                dangerouslySetInnerHTML={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Suitable For */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
                  {t('suitable_for', 'Suitable For')}
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <LocalizedServiceContent service={exampleService} field="suitable_for" as="p" />
                </div>
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
                  {t('contraindications', 'Contraindications')}
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <LocalizedServiceContent service={exampleService} field="contraindications" as="p" />
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
            {t('ready_for', 'Ready for')} <span className="text-primary"><LocalizedServiceContent service={exampleService} field="name" /></span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            <LocalizedServiceContent service={exampleService} field="short_description" />
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button className="rounded-full bg-primary px-8 py-3 text-white hover:bg-primary/90">
                {t('book_now', 'Book Now')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
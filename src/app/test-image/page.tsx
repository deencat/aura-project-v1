'use client'

import React from 'react'
import Image from 'next/image'
import TreatmentImage from '@/components/TreatmentImage'

export default function TestImagePage() {
  return (
    <div className="flex flex-col min-h-screen p-8 bg-white">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-8">Image Testing Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">1. Next.js Image (spa01.jpg)</h2>
            <div className="aspect-video bg-gray-200 relative">
              <Image 
                src="/images/placeholders/spa01.jpg"
                alt="Spa Image" 
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">2. Next.js Image (lymphatic-hero-1.jpg)</h2>
            <div className="aspect-video bg-gray-200 relative">
              <Image 
                src="/images/placeholders/lymphatic-hero-1.jpg"
                alt="Lymphatic Hero" 
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">3. TreatmentImage Hero</h2>
            <div className="aspect-video bg-gray-200 relative">
              <TreatmentImage 
                category="body-care"
                treatment="lymphatic-detox"
                type="hero"
                alt="Lymphatic Detox Hero"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">4. TreatmentImage Gallery</h2>
            <div className="aspect-video bg-gray-200 relative">
              <TreatmentImage 
                category="facial-treatments"
                treatment="collagen-regeneration"
                type="gallery"
                index={1}
                alt="Collagen Regeneration Gallery"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">5. TreatmentImage Benefits</h2>
            <div className="aspect-video bg-gray-200 relative">
              <TreatmentImage 
                category="new-doublo"
                treatment="v-line"
                type="benefits"
                alt="V-Line Benefits"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">6. TreatmentImage with Priority</h2>
            <div className="aspect-video bg-gray-200 relative">
              <TreatmentImage 
                category="new-doublo"
                treatment="sculpt-lift"
                type="hero"
                alt="Sculpt & Lift Hero"
                width={600}
                height={400}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
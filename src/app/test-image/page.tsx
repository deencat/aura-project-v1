import React from 'react'
import Image from 'next/image'

export default function TestImagePage() {
  return (
    <div className="flex flex-col min-h-screen p-8 bg-white">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-8">Image Testing Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">1. Basic img tag (spa01.jpg)</h2>
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src="/images/placeholders/spa01.jpg" 
                alt="Spa Image" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">2. Basic img tag (lymphatic-hero-1.jpg)</h2>
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src="/images/placeholders/lymphatic-hero-1.jpg" 
                alt="Lymphatic Hero" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">3. Next.js Image (spa01.jpg)</h2>
            <div className="aspect-video bg-gray-200 relative">
              <Image 
                src="/images/placeholders/spa01.jpg"
                alt="Spa Image"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">4. Next.js Image (lymphatic-hero-1.jpg)</h2>
            <div className="aspect-video bg-gray-200 relative">
              <Image 
                src="/images/placeholders/lymphatic-hero-1.jpg"
                alt="Lymphatic Hero"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">5. CSS Background (spa01.jpg)</h2>
            <div 
              className="aspect-video bg-gray-200"
              style={{
                backgroundImage: `url('/images/placeholders/spa01.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">6. CSS Background (lymphatic-hero-1.jpg)</h2>
            <div 
              className="aspect-video bg-gray-200"
              style={{
                backgroundImage: `url('/images/placeholders/lymphatic-hero-1.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
} 
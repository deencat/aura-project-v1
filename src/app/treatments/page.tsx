import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '@/components/PlaceholderImage'

const treatments = [
  {
    id: 'royal-black-scan',
    title: 'Royal Black Scan',
    description: 'Deep cleansing treatment that eliminates impurities and revitalizes your skin.',
    image: '/placeholder-treatment-1.jpg'
  },
  {
    id: 'smooth-egg-skin',
    title: 'Smooth Egg Skin',
    description: 'Achieve smooth, radiant skin with this advanced treatment targeting dullness and texture.',
    image: '/placeholder-treatment-2.jpg'
  },
  {
    id: 'collagen-regeneration',
    title: 'Collagen Regeneration',
    description: 'Boost your skin&apos;s natural collagen production for firmer, more youthful-looking skin.',
    image: '/placeholder-treatment-3.jpg'
  },
  {
    id: 'smart-rescue',
    title: '360 Smart Rescue',
    description: 'Comprehensive treatment that addresses multiple skin concerns in one session.',
    image: '/placeholder-treatment-4.jpg'
  },
  {
    id: 'farewell-puffy',
    title: 'Farewell Puffy Face',
    description: 'Reduce facial puffiness and define your facial contours with this specialized treatment.',
    image: '/placeholder-treatment-5.jpg'
  },
  {
    id: 'desert-skin-rescue',
    title: 'Desert Skin Rescue',
    description: 'Intense hydration for dry, dehydrated skin that restores moisture balance.',
    image: '/placeholder-treatment-6.jpg'
  },
  {
    id: 'porcelain-skin',
    title: 'Royal Porcelain Skin',
    description: 'Achieve a flawless complexion with this premium treatment for clear, even-toned skin.',
    image: '/placeholder-treatment-7.jpg'
  },
  {
    id: 'crystal-needling',
    title: 'Crystal Micro-Needling',
    description: 'Advanced micro-needling treatment that stimulates collagen and improves skin texture.',
    image: '/placeholder-treatment-8.jpg'
  }
]

export default function TreatmentsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Premium Beauty <span className="text-primary">Treatments</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Discover our range of tech-forward beauty treatments designed to enhance your natural beauty and restore your skin's radiance.
            </p>
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {treatments.map((treatment, index) => (
              <Card key={treatment.id} className="overflow-hidden border border-gray-200 transition-shadow hover:shadow-md">
                <div className="relative aspect-[3/2] w-full">
                  <PlaceholderImage 
                    type="treatment" 
                    number={index + 1}
                    aspectRatio="aspect-[3/2]"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{treatment.title}</h3>
                  <p className="mb-4 text-gray-600">{treatment.description}</p>
                  <Link href={`/treatments/${treatment.id}`}>
                    <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              The <span className="text-primary">Benefits</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Experience the advantages of our advanced beauty technology and expert care.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="mb-4 text-xl font-bold">Safe & Effective</h3>
              <p className="text-gray-600">
                All our treatments are FDA-approved and administered by certified professionals, ensuring your safety and optimal results.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>
              </div>
              <h3 className="mb-4 text-xl font-bold">Personalized Care</h3>
              <p className="text-gray-600">
                We customize each treatment plan to address your unique concerns and goals, providing a truly personalized experience.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
              </div>
              <h3 className="mb-4 text-xl font-bold">Advanced Technology</h3>
              <p className="text-gray-600">
                Our state-of-the-art equipment and innovative techniques ensure you receive the most effective treatments available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ready to <span className="text-primary">Transform</span> Your Skin?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Book a consultation with our expert team to discover the perfect treatment plan for your unique needs.
          </p>
          <div className="mt-10">
            <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90">
              Book Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 
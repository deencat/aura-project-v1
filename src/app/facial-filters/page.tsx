import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '@/components/PlaceholderImage'

const facialFilters = [
  { id: 1, title: 'Youth Filter', slug: 'youth-filter', description: 'AI-powered treatment that targets signs of aging for a more youthful appearance.' },
  { id: 2, title: 'Perfect Skin', slug: 'perfect-skin', description: 'Advanced filter that analyzes skin conditions to create a flawless complexion.' },
  { id: 3, title: 'Contour Pro', slug: 'contour-pro', description: 'Personalized facial contouring that enhances your natural bone structure.' },
  { id: 4, title: 'Glow Boost', slug: 'glow-boost', description: 'Illuminating treatment that brings radiance and vitality to dull skin.' },
  { id: 5, title: 'Hydration Plus', slug: 'hydration-plus', description: 'Deep hydration system that locks in moisture for plump, dewy skin.' },
  { id: 6, title: 'Sculpt & Define', slug: 'sculpt-define', description: 'Precision facial sculpting that creates defined features and reduces puffiness.' },
]

export default function FacialFiltersPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              AI Facial <span className="text-primary">Filters</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Revolutionary treatments using artificial intelligence to analyze your unique facial features and deliver personalized results.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                The <span className="text-primary">Future</span> of Facial Treatments
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Our AI facial filters represent the cutting edge of beauty technology, using sophisticated algorithms to analyze your unique features and deliver personalized treatments that surpass traditional methods.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>AI-powered analysis for highly personalized treatments</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Advanced technology that adapts to your changing skin needs</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Immediate visible results with cumulative long-term benefits</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="aspect-square overflow-hidden rounded-lg">
                <PlaceholderImage 
                  type="benefits" 
                  number={2}
                  aspectRatio="aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              Cutting-Edge <span className="text-primary">Technology</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Our AI facial filters use advanced algorithms to assess your skin condition, facial structure, and aesthetic goals to create a customized treatment plan that delivers remarkable results.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Grid */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Available <span className="text-primary">Filters</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {facialFilters.map((filter) => (
              <Card key={filter.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-[4/3] w-full">
                  <PlaceholderImage 
                    type="treatment" 
                    number={filter.id}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{filter.title}</h3>
                  <p className="mb-4 text-gray-600">{filter.description}</p>
                  <Link href={`/facial-filters/${filter.slug}`}>
                    <Button className="w-full rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            What Our <span className="text-primary">Clients</span> Say
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "The Youth Filter treatment took years off my appearance. The results were immediate and my friends all noticed!"
              </p>
              <p className="font-bold">— Jennifer R.</p>
            </div>
            
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "Perfect Skin filter completely transformed my complexion. I've never received so many compliments on my skin."
              </p>
              <p className="font-bold">— David M.</p>
            </div>
            
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "The Contour Pro treatment gave me cheekbones I never knew I had! The results look so natural."
              </p>
              <p className="font-bold">— Melissa T.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
            Experience The <span className="text-primary">Future</span> Of Beauty
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Book a consultation today to discover which AI facial filter is right for your unique beauty goals.
          </p>
          <Button className="mt-8 rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
            Book A Consultation
          </Button>
        </div>
      </section>
    </div>
  )
} 
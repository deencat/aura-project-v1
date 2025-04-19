import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '@/components/PlaceholderImage'

const facialTreatments = [
  { id: 1, title: 'Hydrating Facial', slug: 'hydrating-facial', description: 'Deep hydration treatment that replenishes moisture and restores radiance to dry, dull skin.' },
  { id: 2, title: 'Anti-Aging Facial', slug: 'anti-aging-facial', description: 'Comprehensive treatment targeting fine lines, wrinkles, and loss of elasticity for a more youthful appearance.' },
  { id: 3, title: 'Acne Control', slug: 'acne-control', description: 'Specialized treatment to clear breakouts, reduce inflammation, and prevent future acne concerns.' },
  { id: 4, title: 'Brightening Facial', slug: 'brightening-facial', description: 'Targeted treatment that fades hyperpigmentation and evens skin tone for a luminous complexion.' },
  { id: 5, title: 'Microdermabrasion', slug: 'microdermabrasion', description: 'Professional exfoliation that removes dead skin cells to reveal smoother, fresher skin underneath.' },
  { id: 6, title: 'Oxygen Facial', slug: 'oxygen-facial', description: 'Infuses skin with pure oxygen and vital nutrients for instant rejuvenation and a healthy glow.' },
]

export default function FacialPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Advanced <span className="text-primary">Facial</span> Treatments
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Customized facial therapies designed to address your unique skin concerns and reveal your natural beauty.
            </p>
          </div>
        </div>
      </section>

      {/* About Our Facials */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="aspect-[3/4] overflow-hidden rounded-lg">
                <PlaceholderImage 
                  type="beauty" 
                  number={2}
                  aspectRatio="aspect-[3/4]"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                The <span className="text-primary">Science</span> of Beautiful Skin
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Our facial treatments combine cutting-edge technology with proven skincare ingredients to deliver exceptional results. Each treatment is customized to your unique skin profile and concerns.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Professional skin analysis before every treatment</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Medical-grade products and equipment</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Qualified estheticians with specialized training</p>
                </div>
              </div>
              <div className="mt-8">
                <Button className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90">
                  Learn Our Approach
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Our <span className="text-primary">Signature</span> Facials
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {facialTreatments.map((treatment) => (
              <Card key={treatment.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-[4/3] w-full">
                  <PlaceholderImage 
                    type="treatment" 
                    number={treatment.id}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{treatment.title}</h3>
                  <p className="mb-4 text-gray-600">{treatment.description}</p>
                  <Link href={`/facial/${treatment.slug}`}>
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
      
      {/* Results Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              Visible <span className="text-primary">Results</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Our clients experience dramatic improvements after their facial treatments
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                98%
              </div>
              <h3 className="mt-4 text-lg font-semibold">Improved Texture</h3>
              <p className="text-gray-600">Report smoother, more refined skin texture</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                94%
              </div>
              <h3 className="mt-4 text-lg font-semibold">Enhanced Radiance</h3>
              <p className="text-gray-600">Notice a significant improvement in skin brightness</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                92%
              </div>
              <h3 className="mt-4 text-lg font-semibold">Increased Hydration</h3>
              <p className="text-gray-600">Experience longer-lasting skin hydration</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                90%
              </div>
              <h3 className="mt-4 text-lg font-semibold">Reduced Signs of Aging</h3>
              <p className="text-gray-600">See noticeable reduction in fine lines</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial */}
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 text-4xl text-yellow-400">★★★★★</div>
            <p className="mb-8 text-xl italic text-gray-700">
              "I've tried many facial treatments over the years, but nothing compares to the results I've seen here. My skin looks years younger, and the personalized approach makes all the difference."
            </p>
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <PlaceholderImage 
                  type="avatar" 
                  number={1}
                  aspectRatio="aspect-square"
                />
              </div>
              <div className="ml-4 text-left">
                <p className="font-semibold">Jennifer R.</p>
                <p className="text-sm text-gray-600">Loyal Client for 3 Years</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
            Ready for <span className="text-primary">Radiant</span> Skin?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Schedule your personalized facial consultation today and take the first step toward healthier, more beautiful skin.
          </p>
          <Button className="mt-8 rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
            Book Your Facial
          </Button>
        </div>
      </section>
    </div>
  )
} 
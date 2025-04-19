import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '@/components/PlaceholderImage'

const facialServices = [
  { id: 1, title: 'Classic Facial', slug: 'classic-facial', description: 'A thorough cleansing, exfoliation, and hydration treatment customized to your skin type.' },
  { id: 2, title: 'Anti-Aging Facial', slug: 'anti-aging-facial', description: 'Advanced techniques and potent ingredients to reduce fine lines and restore youthful glow.' },
  { id: 3, title: 'Brightening Facial', slug: 'brightening-facial', description: 'Specialized treatment to reduce hyperpigmentation and even skin tone for radiant skin.' },
  { id: 4, title: 'Hydrating Facial', slug: 'hydrating-facial', description: 'Deep moisture replenishment for dry, dehydrated skin using hyaluronic-rich formulations.' },
  { id: 5, title: 'Acne Control Facial', slug: 'acne-control-facial', description: 'Targeted treatment to clear congestion, reduce inflammation, and prevent breakouts.' },
  { id: 6, title: 'Sensitive Skin Facial', slug: 'sensitive-skin-facial', description: 'Gentle approach with calming ingredients to strengthen and soothe reactive skin.' },
  { id: 7, title: 'Men\'s Facial', slug: 'mens-facial', description: 'Specialized treatment addressing the unique skincare needs of male skin.' },
  { id: 8, title: 'Express Facial', slug: 'express-facial', description: 'Quick but effective 30-minute treatment for those with limited time.' },
]

export default function FacialServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Facial <span className="text-primary">Services</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Customized facial treatments designed to address your unique skin concerns, restoring balance and revealing your skin's natural radiance.
            </p>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                Our <span className="text-primary">Approach</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Every facial begins with a thorough skin analysis to identify your unique concerns and goals. Our expert estheticians then customize each treatment using premium products and techniques specifically chosen for your skin.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>In-depth consultation and skin analysis</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Custom-tailored treatment protocols</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Premium, medical-grade skincare products</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="aspect-square overflow-hidden rounded-lg">
                <PlaceholderImage 
                  type="benefits" 
                  number={1}
                  aspectRatio="aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              What to <span className="text-primary">Expect</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Our facial services follow a comprehensive multi-step approach to ensure you receive maximum benefits from your treatment.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="mb-2 font-bold">Consultation</h3>
              <p className="text-gray-600">Understanding your goals, concerns, and skin history</p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="mb-2 font-bold">Cleansing</h3>
              <p className="text-gray-600">Thorough removal of makeup, impurities, and environmental pollutants</p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="mb-2 font-bold">Treatment</h3>
              <p className="text-gray-600">Targeted procedures addressing your specific skin concerns</p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="mb-2 font-bold">Aftercare</h3>
              <p className="text-gray-600">Customized recommendations to maintain and enhance results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Our Facial <span className="text-primary">Services</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {facialServices.map((service) => (
              <Card key={service.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-[4/3] w-full">
                  <PlaceholderImage 
                    type="treatment" 
                    number={service.id}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                  <p className="mb-4 text-gray-600">{service.description}</p>
                  <Link href={`/facial-services/${service.slug}`}>
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

      {/* Products Section */}
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <PlaceholderImage 
                  type="about" 
                  number={1}
                  aspectRatio="aspect-[4/3]"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                <span className="text-primary">Premium</span> Products
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Our facials feature carefully selected, results-oriented skincare products from prestigious professional brands known for their purity, potency, and effectiveness.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                After your treatment, our experts can recommend a personalized home care regimen to extend and enhance the benefits of your facial.
              </p>
              <Button className="mt-8 rounded-full bg-primary px-8 py-2 text-sm font-medium text-white hover:bg-primary/90">
                Explore Our Product Lines
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "The Anti-Aging Facial has taken years off my appearance. My skin looks firmer and more radiant after just one session."
              </p>
              <p className="font-bold">— Rebecca M.</p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "As someone with extremely sensitive skin, I was nervous to try a facial. The Sensitive Skin Facial was gentle yet effective, and my skin has never looked better."
              </p>
              <p className="font-bold">— Daniel W.</p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "The Brightening Facial transformed my dull, uneven complexion. The dark spots that bothered me for years have significantly faded."
              </p>
              <p className="font-bold">— Aisha K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
            Ready for <span className="text-primary">Radiant Skin</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Book your facial appointment today and take the first step toward healthier, more luminous skin.
          </p>
          <Button className="mt-8 rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
            Book Your Facial
          </Button>
        </div>
      </section>
    </div>
  )
} 
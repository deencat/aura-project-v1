import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '@/components/PlaceholderImage'

const specializedServices = [
  { id: 1, title: 'Smooth Egg Skin', slug: 'smooth-egg-skin', description: 'Advanced exfoliation technique resulting in flawless, egg-smooth skin.' },
  { id: 2, title: 'Ultrasonic Peeling', slug: 'ultrasonic-peeling', description: 'High-frequency vibrations to deeply cleanse and refresh your complexion.' },
  { id: 3, title: 'LED Light Therapy', slug: 'led-light-therapy', description: 'Targeted light wavelengths to address specific skin concerns and promote healing.' },
  { id: 4, title: 'Oxygen Infusion', slug: 'oxygen-infusion', description: 'Pure oxygen and nutrients pushed deep into the skin for immediate rejuvenation.' },
  { id: 5, title: 'Microcurrent Facelift', slug: 'microcurrent-facelift', description: 'Non-invasive facial toning using gentle electrical currents to lift and firm.' },
  { id: 6, title: 'Cryotherapy', slug: 'cryotherapy', description: 'Controlled cold exposure to reduce inflammation and tighten the skin.' },
  { id: 7, title: 'Radiofrequency Treatment', slug: 'radiofrequency-treatment', description: 'Deep thermal energy to stimulate collagen production and skin tightening.' },
  { id: 8, title: 'Aqua Facial', slug: 'aqua-facial', description: 'Multi-step treatment combining cleansing, exfoliation, extraction, and hydration.' },
]

export default function SpecializedServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Specialized <span className="text-primary">Services</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Advanced treatments using cutting-edge technology and techniques to target specific skin concerns with exceptional precision.
            </p>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                <span className="text-primary">Innovative</span> Technology
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Our specialized services utilize the latest advancements in beauty technology to deliver targeted treatments that address specific concerns with unprecedented precision and effectiveness.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Cutting-edge equipment from industry-leading manufacturers</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Scientifically-proven treatment protocols for optimal results</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Continuous staff training on the latest techniques and technologies</p>
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

      {/* Technology Showcase */}
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              Our <span className="text-primary">Technology</span> Suite
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              We've invested in the most advanced beauty technologies available, allowing us to offer treatments that deliver consistent, measurable results for all skin types and concerns.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Specialized <span className="text-primary">Treatments</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {specializedServices.map((service) => (
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
                  <Link href={`/specialized-services/${service.slug}`}>
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
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <PlaceholderImage 
                  type="about" 
                  number={2}
                  aspectRatio="aspect-[4/3]"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                <span className="text-primary">Proven</span> Results
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Our specialized services are designed to deliver visible, measurable results from the very first treatment, with even more dramatic improvements seen with consistent sessions.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                We track your progress using advanced imaging technology, allowing us to fine-tune your treatment plan for optimal outcomes.
              </p>
              <Button className="mt-8 rounded-full bg-primary px-8 py-2 text-sm font-medium text-white hover:bg-primary/90">
                See Before & After Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Client <span className="text-primary">Success Stories</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "The Smooth Egg Skin treatment completely transformed my complexion. After struggling with texture issues for years, my skin is finally smooth and radiant."
              </p>
              <p className="font-bold">— Sophia T.</p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "Microcurrent Facelift has been a game-changer for me. I've seen a noticeable lift in my jawline and cheekbones after just three sessions."
              </p>
              <p className="font-bold">— Michael K.</p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "LED Light Therapy helped clear my stubborn acne when nothing else worked. The staff was knowledgeable and created a personalized treatment plan just for me."
              </p>
              <p className="font-bold">— Jasmine R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
            Find Your <span className="text-primary">Perfect Treatment</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Schedule a complimentary skin analysis consultation to determine which specialized services are best suited to your unique concerns and goals.
          </p>
          <Button className="mt-8 rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
            Book Your Consultation
          </Button>
        </div>
      </section>
    </div>
  )
} 
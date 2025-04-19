import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '@/components/PlaceholderImage'

const premiumTreatments = [
  { id: 1, title: 'Royal Black Scan', slug: 'royal-black-scan', description: 'Exclusive high-end facial treatment with black diamond dust and 24K gold elements.' },
  { id: 2, title: 'Gold Radiance', slug: 'gold-radiance', description: 'Luxurious treatment using pure gold elements to impart radiance and youthful glow.' },
  { id: 3, title: 'Diamond Microdermabrasion', slug: 'diamond-microdermabrasion', description: 'Premium exfoliation treatment using real diamond particles for superior results.' },
  { id: 4, title: 'Caviar Infusion', slug: 'caviar-infusion', description: 'Elite facial using rare caviar extracts to nourish and regenerate skin cells.' },
  { id: 5, title: 'Platinum Lift', slug: 'platinum-lift', description: 'Advanced lifting treatment infused with platinum particles for immediate firmness.' },
  { id: 6, title: 'Truffle Rejuvenation', slug: 'truffle-rejuvenation', description: 'Rare truffle extracts combined with peptides for unparalleled skin renewal.' },
  { id: 7, title: 'Orchid Stem Cell Therapy', slug: 'orchid-stem-cell', description: 'Revolutionary anti-aging treatment using rare orchid stem cells.' },
  { id: 8, title: 'Champagne Elixir', slug: 'champagne-elixir', description: 'Effervescent treatment infused with champagne extracts for brightening and toning.' },
]

export default function PremiumBeautyPage() {
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
              Experience the height of luxury with our exclusive premium treatments, featuring rare and precious ingredients for extraordinary results.
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
                <span className="text-primary">Luxury</span> Meets Results
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Our premium beauty treatments combine the most exclusive ingredients with cutting-edge technologies to deliver extraordinary results that are visible from the very first session.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Rare, precious ingredients with proven efficacy</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Exclusive techniques developed by master aestheticians</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Comprehensive approach targeting multiple skin concerns simultaneously</p>
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

      {/* Luxury Experience Section */}
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              The <span className="text-primary">Luxury</span> Experience
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Each premium treatment includes a personalized consultation, relaxation rituals, and a curated selection of products tailored to your unique needs for an unforgettable beauty experience.
            </p>
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Exclusive <span className="text-primary">Treatments</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {premiumTreatments.map((treatment) => (
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
                  <Link href={`/premium-beauty/${treatment.slug}`}>
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
            What Our <span className="text-primary">VIP Clients</span> Say
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "The Royal Black Scan treatment was unlike anything I've ever experienced. My skin has never looked more radiant and youthful."
              </p>
              <p className="font-bold">— Victoria S.</p>
            </div>
            
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "Gold Radiance has become my pre-event essential. The compliments I receive after each treatment are worth every penny."
              </p>
              <p className="font-bold">— Alexander W.</p>
            </div>
            
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "The Diamond Microdermabrasion completely transformed my skin's texture. I'm absolutely addicted to the results."
              </p>
              <p className="font-bold">— Catherine L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Membership */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg md:p-12">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                Exclusive <span className="text-primary">VIP Membership</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                Join our exclusive membership program for priority booking, special pricing on premium treatments, and access to members-only events.
              </p>
              <Button className="mt-8 rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
                Inquire About Membership
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
            Experience <span className="text-primary">Unparalleled Luxury</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Book a consultation today to discover which premium treatment is perfect for your skincare needs and goals.
          </p>
          <Button className="mt-8 rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
            Book A Consultation
          </Button>
        </div>
      </section>
    </div>
  )
} 
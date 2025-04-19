import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import PlaceholderImage from '@/components/PlaceholderImage'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gray-50">
        <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              <span className="block">Aura Beauty</span>
              <span className="mt-2 block text-primary">Transform Your Skin</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-600">
              Advanced beauty treatments using cutting-edge technology to enhance your natural beauty.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href="/treatments">
                <Button className="rounded-full bg-primary px-8 py-6 text-base font-medium uppercase tracking-wide text-white transition hover:bg-primary/90">
                  Explore Treatments
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="rounded-full border-primary px-8 py-6 text-base font-medium uppercase tracking-wide text-primary transition hover:bg-primary/10">
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Our <span className="text-primary">Story</span>
            </h2>
            <div className="mt-6 text-lg leading-relaxed text-gray-600">
              <p className="mb-4">
                Aura Beauty is dedicated to providing diverse, effective, and safe beauty treatments. We bring together professional equipment and techniques from around the world to deliver the most caring, suitable, and optimal service experience for every client.
              </p>
              <p>
                We protect and enhance every inch of your skin, inside and out, helping you achieve your beauty goals with personalized care.
              </p>
            </div>
            <div className="mt-10">
              <Link href="/about">
                <Button variant="ghost" className="rounded-full text-primary hover:bg-primary/10 hover:text-primary">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Treatments */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center font-serif text-3xl font-bold md:text-4xl">
            Signature <span className="text-primary">Treatments</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Treatment 1 */}
            <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <PlaceholderImage 
                  type="treatment" 
                  number={1} 
                  aspectRatio="aspect-[4/3]"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">Royal Black Scan</h3>
                <p className="mb-4 text-gray-600">Advanced technology that targets all types of spots, pigmentation, and skin blemishes with precision.</p>
                <Link href="/treatments/royal-black-scan">
                  <Button className="w-full rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Treatment 2 */}
            <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <PlaceholderImage 
                  type="treatment" 
                  number={2} 
                  aspectRatio="aspect-[4/3]"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">Peeled Egg Skin</h3>
                <p className="mb-4 text-gray-600">Revolutionary treatment that creates silky smooth, flawless skin texture with a radiant complexion.</p>
                <Link href="/treatments/peeled-egg-skin">
                  <Button className="w-full rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Treatment 3 */}
            <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <PlaceholderImage 
                  type="treatment" 
                  number={3} 
                  aspectRatio="aspect-[4/3]"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">Collagen Regeneration</h3>
                <p className="mb-4 text-gray-600">Boost your skin's natural collagen production for improved elasticity and youthful appearance.</p>
                <Link href="/treatments/collagen-regeneration">
                  <Button className="w-full rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/treatments">
              <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90">
                View All Treatments
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center font-serif text-3xl font-bold md:text-4xl">
            Our <span className="text-primary">Services</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Category 1 */}
            <div className="overflow-hidden rounded-lg bg-gray-50 transition-all hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden">
                <PlaceholderImage 
                  type="beauty" 
                  number={1} 
                  aspectRatio="aspect-square"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="mb-2 text-xl font-bold">Premium Beauty Treatments</h3>
                <Link href="/treatments">
                  <Button variant="ghost" className="mt-2 text-primary hover:bg-primary/10 hover:text-primary">
                    Explore
                  </Button>
                </Link>
              </div>
            </div>

            {/* Category 2 */}
            <div className="overflow-hidden rounded-lg bg-gray-50 transition-all hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden">
                <PlaceholderImage 
                  type="beauty" 
                  number={2} 
                  aspectRatio="aspect-square"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="mb-2 text-xl font-bold">Body Care Treatments</h3>
                <Link href="/body-care">
                  <Button variant="ghost" className="mt-2 text-primary hover:bg-primary/10 hover:text-primary">
                    Explore
                  </Button>
                </Link>
              </div>
            </div>

            {/* Category 3 */}
            <div className="overflow-hidden rounded-lg bg-gray-50 transition-all hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden">
                <PlaceholderImage 
                  type="beauty" 
                  number={3} 
                  aspectRatio="aspect-square"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="mb-2 text-xl font-bold">AI Facial Filters</h3>
                <Link href="/facial-filters">
                  <Button variant="ghost" className="mt-2 text-primary hover:bg-primary/10 hover:text-primary">
                    Explore
                  </Button>
                </Link>
              </div>
            </div>

            {/* Category 4 */}
            <div className="overflow-hidden rounded-lg bg-gray-50 transition-all hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden">
                <PlaceholderImage 
                  type="beauty" 
                  number={4} 
                  aspectRatio="aspect-square"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="mb-2 text-xl font-bold">Cell Beauty Technology</h3>
                <Link href="/cell-beauty">
                  <Button variant="ghost" className="mt-2 text-primary hover:bg-primary/10 hover:text-primary">
                    Explore
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="bg-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-center font-serif text-3xl font-bold md:text-4xl">
              Limited <span className="text-primary">Offers</span>
            </h2>
            <div className="overflow-hidden rounded-lg bg-white p-8 shadow-md">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="w-full md:w-2/3">
                  <h3 className="mb-4 text-2xl font-bold">New Client Special</h3>
                  <p className="mb-4 text-lg text-gray-600">
                    Experience our premium treatments with 20% off your first visit. Discover the difference professional care can make.
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      <span>Valid for all first-time clients</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      <span>Applies to any treatment over $100</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      <span>Includes a free skin consultation</span>
                    </li>
                  </ul>
                  <Link href="/contact">
                    <Button className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90">
                      Book Now
                    </Button>
                  </Link>
                </div>
                <div className="h-40 w-full overflow-hidden rounded-lg md:w-1/3">
                  <PlaceholderImage 
                    type="beauty" 
                    number={1} 
                    aspectRatio="aspect-[1/1]"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ready to <span className="text-primary">Transform</span> Your Skin?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Schedule a consultation with our expert team to discover the perfect treatment plan for your unique needs.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
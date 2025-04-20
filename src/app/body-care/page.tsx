import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '@/components/PlaceholderImage'

const bodyCareServices = [
  { id: 1, title: '2-in-1 Lymphatic Detox', slug: 'lymphatic-detox', description: 'Advanced dual-action treatment that enhances circulation, reduces bloating, and eliminates toxins for total body wellness.' },
  { id: 2, title: 'Body Sculpting', slug: 'body-sculpting', description: 'Non-invasive techniques that target stubborn fat cells to contour and shape your body.' },
  { id: 3, title: 'Cellulite Reduction', slug: 'cellulite-reduction', description: 'Advanced treatments that smooth and firm skin affected by cellulite.' },
  { id: 4, title: 'Skin Tightening', slug: 'skin-tightening', description: 'Focused treatments that firm loose skin and improve overall elasticity.' },
  { id: 5, title: 'Body Hydration', slug: 'body-hydration', description: 'Deep moisturizing treatments that transform dry, dull skin into smooth, radiant surfaces.' },
  { id: 6, title: 'Detox Wraps', slug: 'detox-wraps', description: 'Luxurious body wraps that draw out impurities while nourishing your skin.' },
  { id: 7, title: 'Anti-Aging Body Treatments', slug: 'anti-aging-body', description: 'Comprehensive treatments that address signs of aging on the body, not just the face.' },
]

export default function BodyCarePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Body <span className="text-primary">Care</span> Treatments
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Comprehensive treatments to sculpt, firm, and rejuvenate your entire body for total confidence.
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
                Your Body <span className="text-primary">Deserves</span> Attention
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                We often focus on facial treatments, but your body makes up 90% of your skin. Our specialized body care treatments ensure your entire body receives the care and attention it deserves.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Non-invasive solutions for common body concerns</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Customized treatment plans for your specific needs</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Clinically proven techniques with visible results</p>
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

      {/* Services Grid */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Our Body <span className="text-primary">Care</span> Services
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {bodyCareServices.map((service) => (
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
                  <Link href={`/body-care/${service.slug}`}>
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
      
      {/* Testimonials */}
      <section className="bg-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            What Our <span className="text-primary">Clients</span> Say
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "After three sessions of body sculpting, I've noticed a significant difference in my problem areas. The results are amazing!"
              </p>
              <p className="font-bold">— Rebecca T.</p>
            </div>
            
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "The cellulite reduction treatment worked wonders for me. My skin is smoother than it's been in years."
              </p>
              <p className="font-bold">— Michael K.</p>
            </div>
            
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-2 text-yellow-400">★★★★★</div>
              <p className="mb-4 italic text-gray-600">
                "I've tried many body treatments before, but the results I've seen here are truly exceptional. Highly recommend!"
              </p>
              <p className="font-bold">— Sarah L.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
            Ready to <span className="text-primary">Transform</span> Your Body?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Schedule a consultation with our body care specialists to create a personalized treatment plan.
          </p>
          <Button className="mt-8 rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
            Book Consultation
          </Button>
        </div>
      </section>
    </div>
  )
} 
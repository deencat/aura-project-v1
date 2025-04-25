import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '@/components/PlaceholderImage'

const treatments = [
  { 
    id: 1, 
    title: 'Sculpt & Lift', 
    subtitle: 'Redefine Your Features',
    slug: 'sculpt-lift', 
    description: 'Achieve a naturally lifted appearance with our advanced ultrasound technology that targets sagging skin with precision.',
    benefits: ['Instantly lifted contours', 'Reduced sagging', 'Natural-looking results', 'No downtime'],
    idealFor: 'Those experiencing early signs of facial sagging or who desire more defined facial contours.'
  },
  { 
    id: 2, 
    title: 'V-Line Perfection', 
    subtitle: 'The K-Beauty Jawline',
    slug: 'v-line', 
    description: 'Create the coveted V-shaped face with our precision jawline treatment that defines and contours with no surgery.',
    benefits: ['Slimmed jawline', 'Reduced double chin', 'Defined facial angles', 'K-beauty inspired results'],
    idealFor: 'Women seeking a more defined, slender jawline and the trendy V-shaped facial contour.'
  },
  { 
    id: 3, 
    title: 'Youth Revival', 
    subtitle: 'Turn Back the Clock',
    slug: 'youth-revival', 
    description: 'Rejuvenate your appearance with this comprehensive anti-aging treatment that targets wrinkles, fine lines, and skin laxity.',
    benefits: ['Reduced wrinkles', 'Improved skin elasticity', 'Refreshed appearance', 'Long-lasting results'],
    idealFor: 'Those concerned about early signs of aging or seeking preventative treatment to maintain youthful skin.'
  },
  { 
    id: 4, 
    title: 'Neck Rejuvenation', 
    subtitle: 'The Forgotten Beauty Zone',
    slug: 'neck-rejuvenation', 
    description: 'Focus on the often-neglected neck area with targeted therapy that reduces lines, tightens skin, and creates a more youthful profile.',
    benefits: ['Smoother neck skin', 'Reduced tech neck lines', 'Tightened appearance', 'Younger-looking profile'],
    idealFor: 'Anyone experiencing neck lines, sagging, or "tech neck" from looking down at devices.'
  },
]

export default function NewDoubloPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 py-20 text-center">
        <div className="absolute inset-0 bg-gray-900 overflow-hidden">
          <Image
            src="/images/backgrounds/new-doublo-hero.jpg"
            alt="New Doublo Technology"
            fill
            className="object-cover object-center opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        </div>
        
        <div className="container relative mx-auto max-w-5xl space-y-6 z-10">
          <span className="inline-block rounded-full bg-primary/80 px-4 py-2 text-sm font-medium text-white">
            New Technology Exclusive
          </span>
          
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            <span className="block">Meet The </span>
            <span className="text-primary">New Doublo™ HIFU</span>
            <span className="block text-2xl font-normal italic text-white md:text-3xl lg:text-4xl">
              Sculpt Your Beauty Story
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">
            Elevate your beauty with Hong Kong's most advanced facial sculpting technology. 
            The revolutionary New Doublo™ delivers instant lifting, tightening, and contouring 
            with zero downtime—perfect for your busy lifestyle.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/new-doublo/youth-revival">
              <Button size="lg" className="rounded-full bg-primary px-8 text-white hover:bg-primary/90">
                Discover Treatments
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full border-primary px-8 text-primary hover:bg-primary hover:text-white">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Introduction */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Revolutionary Technology</span>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              World's First <span className="text-primary">Dual-Action</span> Technology
            </h2>
            <p className="mt-4 text-gray-600">
              New Doublo™ combines Micro-Focused Ultrasound (MFU) with 4RF technology for 
              dramatic lifting results that continuously improve over time. The secret to 
              K-beauty's most enviable complexions is now in Hong Kong.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col rounded-lg bg-gray-50 p-8">
              <div className="mb-4 text-3xl font-bold text-primary">01</div>
              <h3 className="mb-3 text-xl font-bold">MFU Technology</h3>
              <p className="mb-6 text-gray-600">
                Micro-Focused Ultrasound energy targets with pinpoint precision at multiple depths, 
                stimulating collagen growth without damaging the skin surface—ideal for lifting and tightening.
              </p>
              <div className="mt-auto aspect-video w-full overflow-hidden rounded-lg">
                <PlaceholderImage 
                  page="new-doublo" 
                  section="technology" 
                  number={1} 
                  aspectRatio="aspect-video"
                />
              </div>
            </div>
            
            <div className="flex flex-col rounded-lg bg-gray-50 p-8">
              <div className="mb-4 text-3xl font-bold text-primary">02</div>
              <h3 className="mb-3 text-xl font-bold">4RF Technology</h3>
              <p className="mb-6 text-gray-600">
                The proprietary 4RF system delivers controlled thermal energy to tighten skin instantly 
                and create the coveted V-line effect popular in K-beauty trends.
              </p>
              <div className="mt-auto aspect-video w-full overflow-hidden rounded-lg">
                <PlaceholderImage 
                  page="new-doublo" 
                  section="technology" 
                  number={2} 
                  aspectRatio="aspect-video"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Difference Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Why Choose New Doublo™</span>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              The <span className="text-primary">Difference</span> You'll See
            </h2>
            <p className="mt-4 text-gray-600">
              Unlike traditional HIFU treatments, New Doublo™ delivers immediate visible results 
              that continue to improve over 90 days as collagen regenerates.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Zero Downtime</h3>
              <p className="text-gray-600">
                Return to your busy lifestyle immediately after treatment with no recovery time needed—perfect for Hong Kong's fast-paced lifestyle.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 8-8 8"/><path d="m8 8 8 8"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Non-Invasive</h3>
              <p className="text-gray-600">
                Achieve surgical-like results without needles, incisions, or anesthesia for a completely natural transformation.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M2 4h20"/><path d="M2 20h20"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Customizable</h3>
              <p className="text-gray-600">
                Personalized treatment plans address your unique needs and beauty goals with precision targeting for optimal results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Treatment Options</span>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              Sculpt Your <span className="text-primary">Perfect Look</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Choose from our signature New Doublo™ treatments, each designed to address specific concerns 
              while delivering stunning, natural-looking results.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {treatments.map((treatment) => (
              <Card key={treatment.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-[4/3] w-full">
                  <PlaceholderImage 
                    page="new-doublo" 
                    section="treatment" 
                    number={treatment.id} 
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-1 text-xl font-bold">{treatment.title}</h3>
                  <p className="mb-4 text-sm font-medium text-primary">{treatment.subtitle}</p>
                  <p className="mb-4 text-gray-600">{treatment.description}</p>
                  <Link href={`/new-doublo/${treatment.slug}`}>
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

      {/* Testimonial Section */}
      <section className="bg-gradient-to-r from-[#ffeae5] to-[#fff9f5] py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Real Results</span>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              Success <span className="text-primary">Stories</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Hear from real women in Hong Kong who have transformed their look with New Doublo™ treatments.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="mb-6 h-20 w-20 overflow-hidden rounded-full">
                  <PlaceholderImage 
                    type="avatar" 
                    number={1}
                    aspectRatio="aspect-square"
                  />
                </div>
                <p className="mb-6 text-center text-gray-600 italic">
                  "As a busy marketing executive, I needed something effective without the downtime. 
                  After just one New Doublo™ session, my colleagues asked if I went on holiday because 
                  I looked so refreshed and lifted!"
                </p>
                <h4 className="text-lg font-bold">Michelle, 32</h4>
                <p className="text-primary">Central, Hong Kong</p>
              </div>
            </div>
            
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="mb-6 h-20 w-20 overflow-hidden rounded-full">
                  <PlaceholderImage 
                    type="avatar" 
                    number={2}
                    aspectRatio="aspect-square"
                  />
                </div>
                <p className="mb-6 text-center text-gray-600 italic">
                  "I've been conscious about my jawline ever since I started taking more selfies. 
                  The V-Line treatment gave me that K-drama actress jawline I've always wanted. 
                  My Instagram photos have never looked better!"
                </p>
                <h4 className="text-lg font-bold">Sophia, 26</h4>
                <p className="text-primary">Tsim Sha Tsui, Hong Kong</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-lg bg-primary/10 p-10 text-center md:p-16">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Ready to <span className="text-primary">Transform</span> Your Look?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Schedule a complimentary consultation with our New Doublo™ experts to discover 
              the perfect treatment plan for your beauty goals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full bg-primary px-8 text-white hover:bg-primary/90">
                  Book Consultation
                </Button>
              </Link>
              <Link href="tel:+85212345678">
                <Button size="lg" variant="outline" className="rounded-full border-primary px-8 text-primary hover:bg-primary hover:text-white">
                  Call Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
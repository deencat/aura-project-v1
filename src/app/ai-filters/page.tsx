import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '@/components/PlaceholderImage'

const aiFilters = [
  { id: 1, title: 'Age Transformation', slug: 'age-transformation', description: 'Experience how you might look at different stages of life with our advanced age progression and regression filters.' },
  { id: 2, title: 'Glamour Effects', slug: 'glamour-effects', description: 'Instantly apply professional makeup looks and lighting effects for stunning photos and videos.' },
  { id: 3, title: 'Skin Perfecting', slug: 'skin-perfecting', description: 'Smooth skin texture, reduce blemishes, and create a flawless appearance in real-time.' },
  { id: 4, title: 'Fantasy Makeup', slug: 'fantasy-makeup', description: 'Transform into magical, otherworldly looks with artistic makeup effects not possible in real life.' },
  { id: 5, title: 'Hair Styling', slug: 'hair-styling', description: 'Try different hair colors, styles, and lengths without commitment using our virtual styling technology.' },
  { id: 6, title: 'Virtual Try-On', slug: 'virtual-try-on', description: 'Preview how treatments and procedures might look before committing to them.' },
]

export default function AIFiltersPage() {
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
              Experience the future of beauty with our cutting-edge AI facial filters. Preview potential treatments, experiment with different looks, and discover your best self through technology.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                Our <span className="text-primary">Technology</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Our AI filters utilize advanced machine learning algorithms and augmented reality to create hyper-realistic transformations that respond to your unique facial features in real-time.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Developed in collaboration with beauty experts and technology specialists, our filters provide an interactive experience that goes beyond simple overlays, offering true-to-life previews of various looks and treatments.
              </p>
              <div className="mt-8">
                <Button className="rounded-full bg-primary px-8 py-2 text-sm font-medium text-white hover:bg-primary/90">
                  Learn More About Our Technology
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <PlaceholderImage 
                  type="benefits" 
                  number={2}
                  aspectRatio="aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Experience our AI facial filters in three simple steps
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-3xl font-bold">1</span>
              </div>
              <h3 className="mb-3 text-xl font-bold">Scan Your Face</h3>
              <p className="text-gray-600">
                Our technology captures your facial features and analyzes your unique characteristics.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="mb-3 text-xl font-bold">Select a Filter</h3>
              <p className="text-gray-600">
                Choose from our wide range of AI filters designed for different transformations and looks.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="mb-3 text-xl font-bold">Experience the Magic</h3>
              <p className="text-gray-600">
                See yourself transformed in real-time with accurate, realistic results you can save and share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Grid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Explore Our <span className="text-primary">AI Filters</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {aiFilters.map((filter) => (
              <Card key={filter.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-[4/3] w-full">
                  <PlaceholderImage 
                    type="treatment" 
                    number={filter.id + 2}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{filter.title}</h3>
                  <p className="mb-4 text-gray-600">{filter.description}</p>
                  <Link href={`/ai-filters/${filter.slug}`}>
                    <Button className="w-full rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90">
                      Try This Filter
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before and After */}
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              Before & <span className="text-primary">After</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              See real examples of our AI filters in action
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg shadow-md">
              <div className="relative">
                <div className="aspect-[4/3] w-full">
                  <PlaceholderImage 
                    type="beauty" 
                    number={1}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white">
                  Before
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-md">
              <div className="relative">
                <div className="aspect-[4/3] w-full">
                  <PlaceholderImage 
                    type="beauty" 
                    number={2}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white">
                  After
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg shadow-md">
              <div className="relative">
                <div className="aspect-[4/3] w-full">
                  <PlaceholderImage 
                    type="beauty" 
                    number={3}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white">
                  Before
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-md">
              <div className="relative">
                <div className="aspect-[4/3] w-full">
                  <PlaceholderImage 
                    type="beauty" 
                    number={4}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white">
                  After
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Integration */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="aspect-[3/4] overflow-hidden rounded-lg">
                <PlaceholderImage 
                  type="beauty" 
                  number={5}
                  aspectRatio="aspect-[3/4]"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                Try Our <span className="text-primary">Mobile App</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Experience our AI filters on-the-go with our convenient mobile application. Perfect for trying out different looks before your appointment or exploring potential treatments from the comfort of your home.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90">
                  <span className="mr-2">↓</span> Download on App Store
                </Button>
                <Button className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90">
                  <span className="mr-2">↓</span> Get it on Google Play
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">Are the filters realistic?</h3>
              <p className="text-gray-600">
                Yes, our AI facial filters use advanced technology to create highly realistic transformations that account for your unique facial structure, skin tone, and features.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">Can I save and share my transformations?</h3>
              <p className="text-gray-600">
                Absolutely! You can save your transformations to your account gallery and share them via email or social media platforms directly from our app.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">How accurate are the treatment previews?</h3>
              <p className="text-gray-600">
                Our treatment previews provide a close approximation of potential results, but actual outcomes may vary based on individual factors. We recommend consulting with our specialists for personalized assessments.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">Is my facial data kept private?</h3>
              <p className="text-gray-600">
                We take privacy seriously. Your facial data is encrypted, never shared with third parties, and can be deleted at any time from your account settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ready to Try Our AI Filters?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg">
            Book an appointment today to experience our AI facial filters in-person or download our app to try them at home.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button className="rounded-full bg-white px-8 py-3 text-sm font-medium text-primary hover:bg-gray-100">
              Book Appointment
            </Button>
            <Button className="rounded-full border border-white bg-transparent px-8 py-3 text-sm font-medium text-white hover:bg-white/10">
              Download App
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 
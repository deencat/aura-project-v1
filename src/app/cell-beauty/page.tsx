import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '@/components/PlaceholderImage'

const cellBeautyTreatments = [
  { id: 1, title: 'Cell Rejuvenation', slug: 'cell-rejuvenation', description: 'Stimulates cellular renewal for healthier, more vibrant skin from within.' },
  { id: 2, title: 'DNA Repair Treatment', slug: 'dna-repair', description: 'Advanced therapy targeting cellular DNA to reverse damage and prevent aging.' },
  { id: 3, title: 'Stem Cell Therapy', slug: 'stem-cell', description: 'Utilizes stem cell technology to regenerate tissues and improve skin quality.' },
  { id: 4, title: 'Cellular Detox', slug: 'cellular-detox', description: 'Removes cellular toxins and waste to enhance overall skin health and appearance.' },
  { id: 5, title: 'Mitochondrial Boost', slug: 'mitochondrial-boost', description: 'Energizes skin cells by improving mitochondrial function for a radiant glow.' },
  { id: 6, title: 'Telomere Protection', slug: 'telomere-protection', description: 'Shields and extends cellular telomeres to slow down the aging process at a fundamental level.' },
]

export default function CellBeautyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Cell <span className="text-primary">Beauty</span> Treatments
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Cutting-edge cellular-level treatments that transform your skin at its most fundamental level.
            </p>
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              The <span className="text-primary">Science</span> of Beauty
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Our cell beauty treatments leverage breakthrough scientific research to address aging and skin concerns at the cellular level, where true transformation begins.
            </p>
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Available <span className="text-primary">Treatments</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cellBeautyTreatments.map((treatment) => (
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
                  <Link href={`/cell-beauty/${treatment.slug}`}>
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
      <section className="bg-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              Clinically <span className="text-primary">Proven</span> Results
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Our cell beauty treatments show measurable improvements in skin elasticity, density, and radiance after just a few sessions.
            </p>
            
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 text-4xl font-bold text-primary">92%</div>
                <p className="text-gray-600">Reported improved skin firmness within 4 weeks</p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 text-4xl font-bold text-primary">88%</div>
                <p className="text-gray-600">Experienced increased skin radiance and glow</p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 text-4xl font-bold text-primary">96%</div>
                <p className="text-gray-600">Would recommend our cell beauty treatments</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Booking CTA */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
            Transform Your Skin at a <span className="text-primary">Cellular Level</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Book a consultation with our experts to discover which cell beauty treatment is right for you.
          </p>
          <Button className="mt-8 rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
            Book Consultation
          </Button>
        </div>
      </section>
    </div>
  )
} 
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '@/components/PlaceholderImage'

const hairTreatments = [
  { id: 1, title: 'Hair Moisturizing', slug: 'hair-moisturizing', description: 'Deep conditioning treatment that restores moisture to dry, damaged hair.' },
  { id: 2, title: 'Scalp Treatment', slug: 'scalp-treatment', description: 'Therapeutic treatment that addresses scalp issues and promotes healthier hair growth.' },
  { id: 3, title: 'Keratin Treatment', slug: 'keratin-treatment', description: 'Smoothing treatment that eliminates frizz and adds incredible shine and manageability.' },
  { id: 4, title: 'Hair Color Refresh', slug: 'hair-color-refresh', description: 'Revitalize your color with treatments that enhance vibrancy and protect from fading.' },
  { id: 5, title: 'Split End Repair', slug: 'split-end-repair', description: 'Specialized treatment that seals and repairs damaged ends without losing length.' },
  { id: 6, title: 'Hair Detox', slug: 'hair-detox', description: 'Purifying treatment that removes product buildup and environmental pollutants.' },
]

export default function HairCarePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Luxurious <span className="text-primary">Hair Care</span> Treatments
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Transform your hair with our exclusive treatments designed to restore health, shine, and beauty to every strand.
            </p>
          </div>
        </div>
      </section>

      {/* About Hair Care */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                Your Hair <span className="text-primary">Deserves</span> the Best
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Our exclusive hair care treatments combine premium ingredients with advanced techniques to deliver exceptional results. Whether you're dealing with dryness, damage, or just want to enhance your natural beauty, our specialists create personalized treatment plans for your specific hair type and concerns.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Professional hair analysis before every treatment</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Premium, salon-exclusive product lines</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">✓</div>
                  <p>Skilled stylists with continuous education</p>
                </div>
              </div>
              <div className="mt-8">
                <Button className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90">
                  Our Hair Philosophy
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="aspect-[3/4] overflow-hidden rounded-lg">
                <PlaceholderImage 
                  type="beauty" 
                  number={3}
                  aspectRatio="aspect-[3/4]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Our <span className="text-primary">Signature</span> Hair Treatments
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {hairTreatments.map((treatment) => (
              <Card key={treatment.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-[4/3] w-full">
                  <PlaceholderImage 
                    type="treatment" 
                    number={treatment.id + 2}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{treatment.title}</h3>
                  <p className="mb-4 text-gray-600">{treatment.description}</p>
                  <Link href={`/hair-care/${treatment.slug}`}>
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
      
      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              The <span className="text-primary">Benefits</span> of Professional Hair Care
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Experience the difference expert treatments make for your hair's health and appearance
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full rounded-lg bg-gray-50 p-8 md:w-5/12">
              <h3 className="mb-4 text-xl font-bold">For Damaged Hair</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Restores hair's natural protein structure</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Rebuilds broken bonds from chemical processing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Protects from future thermal damage</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Improves elasticity and reduces breakage</span>
                </li>
              </ul>
            </div>
            
            <div className="w-full rounded-lg bg-gray-50 p-8 md:w-5/12">
              <h3 className="mb-4 text-xl font-bold">For Healthy Maintenance</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Enhances natural shine and softness</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Maintains color vibrancy and prevents fading</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Improves manageability and styling ease</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Promotes healthier, faster growing hair</span>
                </li>
              </ul>
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
              "After just one treatment, my hair feels completely transformed! The stylist took time to understand my hair concerns and recommended the perfect solution. My hair hasn't been this healthy and shiny in years."
            </p>
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <PlaceholderImage 
                  type="avatar" 
                  number={2}
                  aspectRatio="aspect-square"
                />
              </div>
              <div className="ml-4 text-left">
                <p className="font-semibold">Sophia M.</p>
                <p className="text-sm text-gray-600">Regular Client for 2 Years</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-black md:text-4xl">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-3 text-xl font-bold">How often should I get a professional hair treatment?</h3>
              <p className="text-gray-600">For most hair types, we recommend a professional treatment every 4-6 weeks. However, this can vary based on your hair's specific needs, damage level, and styling habits. Our specialists can create a personalized treatment schedule during your consultation.</p>
            </div>
            
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-3 text-xl font-bold">Will these treatments work for my hair type?</h3>
              <p className="text-gray-600">Absolutely! Our treatments are customized for each client's specific hair type and concerns. Whether you have fine, thick, curly, straight, processed, or natural hair, we have solutions designed to address your unique needs.</p>
            </div>
            
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-3 text-xl font-bold">How long do the results last?</h3>
              <p className="text-gray-600">Results typically last 3-5 weeks depending on the treatment type, your hair care routine, and environmental factors. Using our recommended home care products can significantly extend the benefits of your professional treatment.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
            Ready for <span className="text-primary">Beautiful</span> Hair?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Schedule your hair consultation today and discover the perfect treatment for your hair goals.
          </p>
          <Button className="mt-8 rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
            Book Your Consultation
          </Button>
        </div>
      </section>
    </div>
  )
} 
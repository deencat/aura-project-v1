"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TreatmentImage from '@/components/TreatmentImage'
import type { CarouselApi } from "@/components/ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Check } from 'lucide-react'

export default function LaserTreatmentPage() {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = 5

  // Set up the carousel API and event listener
  React.useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap())
    })
  }, [api])

  // Handle indicator clicks
  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                Advanced Laser <span className="text-primary">Treatment</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Wrinkle Reduction</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Scar Treatment</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Pigmentation Removal</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Minimal Downtime</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Are fine lines, wrinkles, acne scars, or hyperpigmentation affecting your confidence? Traditional treatments often require extensive downtime and may not provide lasting results.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Our Advanced Laser Treatment uses state-of-the-art fractional laser technology to target specific skin concerns with precision and minimal discomfort. By creating thousands of microscopic treatment zones in the skin, this advanced therapy stimulates natural collagen production while leaving surrounding tissue intact for faster healing.
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="rounded-full bg-primary px-8 py-3 text-white hover:bg-primary/90" data-testid="hero-book-now">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <TreatmentImage 
                category="treatments"
                treatment="laser-treatment"
                type="hero"
                alt="Advanced Laser Treatment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Description */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Our Laser Treatment: <span className="text-primary">Precision Skin Renewal</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Our advanced laser technology delivers focused energy to target specific skin concerns while preserving the surrounding healthy tissue. This precision approach means fewer treatments, faster healing, and more dramatic results compared to traditional methods.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              The treatment is customized to your unique skin concerns, whether you're looking to smooth fine lines, reduce acne scarring, even out skin tone, or address sun damage. Experience transformative results with minimal discomfort and downtime.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Wrinkle Reduction</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our laser treatment effectively targets fine lines and wrinkles by stimulating collagen production deep within the skin. As new collagen forms, the skin becomes firmer and more elastic, smoothing out wrinkles and giving you a naturally younger-looking appearance without the artificial look of some other treatments.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Scar Treatment</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Acne scars, surgical scars, and other skin irregularities can be significantly improved with our laser technology. The treatment breaks down scar tissue while stimulating the production of new, healthy skin cells. Over a series of treatments, even stubborn scars become less noticeable, restoring your skin's smooth texture.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Pigmentation Correction</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Dark spots, sun damage, and uneven skin tone are no match for our targeted laser therapy. The treatment precisely targets excess melanin in the skin, breaking it down while leaving surrounding tissue unaffected. Experience a more even, radiant complexion as pigmentation issues fade with each session.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Minimal Downtime</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Unlike traditional ablative laser treatments that require weeks of recovery, our advanced fractional laser technology offers minimal downtime. Most patients experience only mild redness and swelling for 1-3 days following treatment, allowing you to return to your normal activities quickly while still achieving remarkable skin transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Benefits of <span className="text-primary">Laser Treatment</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Experience transformative results with our advanced laser technology
            </p>
          </div>

          {/* Photo Gallery */}
          <div className="mt-12 mb-16 mx-auto max-w-4xl">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Carousel 
                className="w-full" 
                setApi={setApi}
              >
                <CarouselContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <CarouselItem key={num} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2">
                        <div className="overflow-hidden rounded-lg bg-white">
                          <div className="aspect-square relative">
                            <TreatmentImage 
                              category="treatments"
                              treatment="laser-treatment"
                              type="benefits"
                              index={num}
                              alt={["Before & After", "Treatment Process", "Skin Rejuvenation", "Client Results", "Advanced Technology"][num-1]}
                              fill
                              className="transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Before & After", "Treatment Process", "Skin Rejuvenation", "Client Results", "Advanced Technology"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "See the dramatic improvement in skin texture and tone",
                                "Precision laser technology in action",
                                "Watch years of damage fade away",
                                "Real transformations from our clients",
                                "State-of-the-art equipment for optimal results"
                              ][num-1]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:left-4 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-2 md:right-4 bg-white/80 hover:bg-white" />
              </Carousel>
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                      activeIndex === index ? "bg-primary" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Thorough Treatment</h3>
              <p className="text-gray-600">
                Our fractional laser technology targets multiple skin concerns simultaneously, delivering comprehensive results in fewer sessions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Enhanced Collagen</h3>
              <p className="text-gray-600">
                The treatment stimulates your body's natural collagen production, providing ongoing improvement for months after your session.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Radiant Complexion</h3>
              <p className="text-gray-600">
                Experience more even skin tone, reduced pigmentation, and an overall more youthful, glowing appearance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Improved Texture</h3>
              <p className="text-gray-600">
                Say goodbye to rough, uneven skin texture as the laser treatment smooths and refines your skin's surface.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Care</h3>
              <p className="text-gray-600">
                Each treatment is customized to your specific concerns and skin type for optimal, natural-looking results.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Long-lasting Results</h3>
              <p className="text-gray-600">
                Unlike topical treatments that provide temporary benefits, laser therapy offers lasting improvements to your skin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            
            <div className="mt-12 space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Is laser treatment suitable for all skin types?</h3>
                <p className="text-gray-600">
                  Our advanced laser system is designed to be safe for most skin types. During your consultation, our specialists will assess your skin and recommend the optimal treatment approach for your specific skin tone and concerns.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Is the treatment painful?</h3>
                <p className="text-gray-600">
                  Most clients describe the sensation as mild discomfort, similar to a rubber band snap. We apply a topical numbing cream before treatment to minimize any discomfort, and the advanced cooling system in our laser device helps maintain comfort throughout the procedure.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">How long does each session take?</h3>
                <p className="text-gray-600">
                  Treatment time varies depending on the area being treated. Most facial treatments take approximately 30-45 minutes, while larger body areas may require up to 60-90 minutes. Your consultation will provide a more accurate time estimate for your specific needs.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">What is the downtime after a laser treatment?</h3>
                <p className="text-gray-600">
                  Our fractional laser technology offers minimal downtime compared to traditional lasers. Most clients experience mild redness and slight swelling for 1-3 days. You can generally return to normal activities within 24-48 hours, though we recommend avoiding intense exercise and direct sun exposure for about a week.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">When will I see results?</h3>
                <p className="text-gray-600">
                  Many clients notice immediate improvements in skin texture and tone following their first treatment. However, the most significant results develop over time as collagen production increases. Optimal results typically appear 2-3 months after completing your recommended treatment series.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">How many treatments will I need?</h3>
                <p className="text-gray-600">
                  Most clients achieve their desired results after 3-5 sessions, spaced 4-6 weeks apart. However, the exact number of treatments depends on your specific skin concerns and goals. Your specialist will create a personalized treatment plan during your consultation.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Are there any pre-treatment requirements?</h3>
                <p className="text-gray-600">
                  Yes, we recommend avoiding sun exposure, tanning beds, and self-tanners for at least two weeks before treatment. You should also discontinue use of retinoids, glycolic acid, and other potentially irritating skincare products 3-5 days before your appointment. Your specialist will provide detailed pre-treatment instructions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Now */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Ready to Transform Your Skin?
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Schedule your consultation today and take the first step toward radiant, rejuvenated skin. Our specialists will create a personalized treatment plan to address your unique concerns.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button className="rounded-full bg-primary px-8 py-6 text-white hover:bg-primary/90 text-lg" data-testid="final-cta-book-treatment">
                  Book Your Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
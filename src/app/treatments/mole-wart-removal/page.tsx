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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function MoleWartRemovalPage() {
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
                Mole, Wart & Skin Growth <span className="text-primary">Removal</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Precision Targeting</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Minimal Recovery</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Advanced Laser</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Visible Results</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Utilizing advanced laser technology, we precisely target and remove various types of skin growths, including moles, warts, and other lesions. The laser energy is directed to the targeted area, where the water within skin cells rapidly absorbs the energy, generating high heat to vaporize the targeted tissue and destroy the cell structure.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                The treatment parameters are adjusted according to the size and depth of each lesion, ensuring focused removal while maximally protecting the surrounding healthy tissue, minimizing redness and swelling, and promoting faster recovery.
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="rounded-full bg-primary px-8 py-3 text-white hover:bg-primary/90">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <TreatmentImage 
                category="treatments"
                treatment="mole-wart-removal"
                type="hero"
                alt="Mole, Wart & Skin Growth Removal Treatment"
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
              Mole, Wart & Skin Growth Removal: <span className="text-primary">Innovative Laser Technology</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Our specialized treatment utilizes state-of-the-art laser technology that delivers precise energy to target unwanted skin growths. The laser energy is highly absorbed by the water content in the targeted cells, creating intense heat that effectively vaporizes the unwanted tissue while preserving the surrounding healthy skin.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Each treatment is customized based on the specific size and characteristics of your skin concern, ensuring optimal energy levels for effective removal with minimal side effects and faster recovery times.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Precision Targeting Technology</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our advanced laser system allows for incredible accuracy, focusing energy directly on the unwanted growth while minimizing impact to surrounding tissue. This precision approach significantly reduces the risk of scarring and promotes faster healing compared to traditional removal methods.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Customized Treatment Parameters</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Each treatment is tailored to the specific characteristics of your skin concern. Our specialists carefully adjust laser settings based on the size, depth, and location of the growth to ensure optimal results while maintaining the integrity of your skin's natural appearance.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Minimal Discomfort Protocol</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  We prioritize your comfort throughout the treatment process. Our procedure incorporates cooling technology and, when necessary, topical numbing agents to ensure you experience minimal discomfort during the removal process, making it a significantly more pleasant experience than traditional surgical methods.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Comprehensive Aftercare Support</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Your care doesn't end when the treatment is complete. We provide detailed aftercare instructions and medical-grade skincare products to promote optimal healing, reduce the risk of hyperpigmentation, and ensure your skin recovers beautifully with minimal downtime.
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
              Benefits of <span className="text-primary">Mole, Wart & Skin Growth Removal</span>
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
                              treatment="mole-wart-removal"
                              type="benefits"
                              index={num}
                              alt={["Before & After", "Treatment Process", "Precision Technology", "Healing Process", "Final Results"][num-1]}
                              fill
                              className="transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Before & After", "Treatment Process", "Precision Technology", "Healing Process", "Final Results"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "Real client transformations with our treatment",
                                "See how our advanced laser technology works",
                                "Targeted removal with minimal surrounding impact",
                                "Natural healing progression after treatment",
                                "Beautiful, clear skin after complete recovery"
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
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeIndex === index ? 'bg-primary w-8' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Precise Targeting</h3>
              <p className="text-gray-600">
                Advanced laser technology accurately targets specific growths while protecting surrounding healthy tissue
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Minimal Downtime</h3>
              <p className="text-gray-600">
                Brief recovery period with most clients resuming normal activities within 1-2 days
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44l2.45-5.44H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3.5a2.5 2.5 0 0 0 0-5Z"></path><path d="M16 2a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 1 2.5 2.5v7.5a2.5 2.5 0 0 0 5 0v-7.5A7.5 7.5 0 0 0 16 2Z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Reduced Scarring</h3>
              <p className="text-gray-600">
                Superior cosmetic results with significantly less scarring than traditional surgical methods
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Comfortable Experience</h3>
              <p className="text-gray-600">
                Advanced cooling technology and numbing protocols ensure minimal discomfort during treatment
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path><path d="M12 12 8 8"></path><path d="M12 16v-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Rapid Results</h3>
              <p className="text-gray-600">
                Visible improvement often seen after just one treatment, with complete clearance in 1-3 sessions
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"></path><path d="M13 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Customized Care</h3>
              <p className="text-gray-600">
                Treatment protocols tailored to your specific skin concerns and skin type for optimal results
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
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    What should I expect immediately after treatment?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    After treatment, the treated area may appear red and slightly swollen. In most cases, a small scab will form within 1-2 days. It's crucial to avoid touching or picking at this scab as it's part of the natural healing process. The area should be kept clean and moisturized according to our aftercare instructions. Most clients can resume normal activities immediately, though sun exposure should be strictly avoided during the healing period.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    What aftercare is required following the treatment?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Proper aftercare is essential for optimal healing. We recommend keeping the area clean by gently washing with mild soap and water twice daily. Apply the prescribed healing ointment to keep the area hydrated and protected. Avoid water immersion (swimming, long baths) for 1-2 days. Strict sun protection is crucial—apply SPF 50+ and reapply every 2 hours when outdoors. Avoid using exfoliants, retinoids, or harsh skincare products on the treated area until it has completely healed.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How many treatments will I need?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    The number of treatments required depends on the size, type, and depth of the skin growth being addressed. Many smaller growths can be completely removed in a single session. Larger or deeper growths may require 2-3 treatments spaced 4-6 weeks apart to achieve optimal results. During your consultation, our specialists will assess your specific condition and provide a personalized treatment plan detailing the expected number of sessions needed for your desired outcome.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    Is the treatment painful?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Most clients describe the sensation as mild discomfort rather than pain. The treatment incorporates advanced cooling technology to minimize discomfort. For sensitive areas or clients with lower pain thresholds, we offer topical numbing cream that's applied 30 minutes before treatment. The actual laser treatment is quite quick, typically lasting only seconds to minutes depending on the size of the area being treated. Many clients are pleasantly surprised by how comfortable the experience is compared to what they anticipated.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    Will there be scarring after the treatment?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    One of the key advantages of our laser treatment is the significantly reduced risk of scarring compared to traditional surgical removal methods. Our precision technology targets only the unwanted growth while minimizing impact to surrounding tissue. Following proper aftercare instructions is crucial to minimize scarring risk. In rare cases where the growth is very large or deep, some minimal scarring may occur, but it's typically much less noticeable than with surgical excision. Our specialists may recommend follow-up treatments with specialized scar-reducing products if necessary.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Book Now Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            Ready for <span className="text-primary">Clear, Beautiful Skin</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience our advanced Mole Wart Skin Growth Removal treatment and discover how our precision laser technology can transform your skin with minimal downtime and superior results.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button className="rounded-full bg-primary px-8 py-3 text-white hover:bg-primary/90">
                Book Your Treatment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
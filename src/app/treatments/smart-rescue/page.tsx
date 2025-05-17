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

export default function SmartRescuePage() {
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
                360° Smart <span className="text-primary">Rescue</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Immediate Relief</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Multi-Layer Repair</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Deep Hydration</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Barrier Protection</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Is your skin in distress? Dealing with irritation, dryness, sensitivity, or damage from environmental factors? Traditional skincare may provide temporary relief but often fails to address the root causes of these concerns.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Our "360° Smart Rescue" treatment provides comprehensive care using advanced Korean skin rescue technology to immediately calm irritated skin, repair damage at multiple levels, and strengthen your skin's natural protective barrier. This precision treatment targets distressed skin with a customized approach based on your specific concerns.
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
                treatment="smart-rescue"
                type="hero"
                alt="360° Smart Rescue Treatment"
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
              360° Smart Rescue: <span className="text-primary">Complete Skin Salvation</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Our 360° Smart Rescue treatment utilizes a proprietary blend of advanced ingredients and targeted delivery systems to provide immediate and long-lasting relief for compromised skin. The multi-step protocol works from the inside out to restore skin health and radiance.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Each treatment is customized to your skin's specific needs, ensuring you receive precisely what your skin requires to heal and thrive. Experience the transformative power of this comprehensive skin rescue system and watch as your skin transforms from distressed to radiant.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Immediate Soothing Relief</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The first step in our 360° Smart Rescue treatment is providing instant relief to irritated, sensitive skin. Our specialized cooling formulation contains powerful anti-inflammatory ingredients that work immediately upon application to reduce redness, calm irritation, and soothe discomfort, creating a foundation for deeper repair work.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Multi-Layer Skin Repair</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The next phase targets repair at multiple skin depths. Using advanced peptide technology and ceramide-rich formulations, we stimulate your skin's natural healing processes while simultaneously rebuilding damaged skin structures. This comprehensive approach ensures that repair occurs at every level, from surface to deep within.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Deep Hydration Infusion</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Distressed skin is often severely dehydrated. Our treatment includes multi-molecular hyaluronic acid infusion, delivering moisture to different skin layers for complete hydration. Combined with our proprietary humectant complex, this step locks in moisture and creates an optimal environment for healing and rejuvenation.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Barrier Function Restoration</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The final and critical step involves strengthening your skin's protective barrier to prevent future damage. We apply a specialized lipid-rich formula that mimics your skin's natural barrier composition, reinforcing its ability to protect against environmental stressors, retain moisture, and maintain long-term health and resilience.
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
              Benefits of <span className="text-primary">360° Smart Rescue</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Experience transformative results with our advanced skin rescue treatment
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
                              treatment="smart-rescue"
                              type="benefits"
                              index={num}
                              alt={["Before & After", "Treatment Process", "Skin Recovery", "Clinical Results", "Advanced Technology"][num-1]}
                              fill
                              className="transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Before & After", "Treatment Process", "Skin Recovery", "Clinical Results", "Advanced Technology"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "See the visible transformation in irritated and damaged skin",
                                "The multi-step rescue protocol in action",
                                "Watch as distressed skin becomes calm and healthy",
                                "Documented improvement in various skin conditions",
                                "Cutting-edge Korean rescue technology at work"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m14.83 9.17-4.24 4.24"></path><path d="m14.83 9.17-9.9-4.24"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Fast-Acting Relief</h3>
              <p className="text-gray-600">
                Provides immediate soothing of irritation, redness, and discomfort, typically within minutes of application
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Comprehensive Recovery</h3>
              <p className="text-gray-600">
                Addresses multiple skin concerns simultaneously for efficient, thorough healing and restoration
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 6c-3-3-7.4-3-10.4 0l-.8.8-.8-.8c-3-3-7.4-3-10.4 0-3 3-3 7.4 0 10.4L9 17.6l2 2 .4.4.4-.4 2-2 8.4-8.4c3-2.9 3-7.3 0-10.2z"></path><path d="M2.5 15 9 8.5"></path><path d="M15 9l-4.5 4.5"></path><path d="M16 17l-1.5 1.5"></path><path d="M22 12l-4.5 4.5"></path><path d="M19 9l-2 2"></path><path d="M15 4l-3.5 3.5"></path><path d="M22 2l-7 7"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Lasting Hydration</h3>
              <p className="text-gray-600">
                Delivers deep, multi-layered moisture that remains locked in for 24+ hours after treatment
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Visible Results</h3>
              <p className="text-gray-600">
                Clients typically see dramatic improvement after just one treatment, with optimal results after a series
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 9 6 6"></path><path d="m15 9-6 6"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Safe for All Skin Types</h3>
              <p className="text-gray-600">
                Specially formulated for even the most sensitive and reactive skin conditions without adverse effects
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Future Protection</h3>
              <p className="text-gray-600">
                Strengthens your skin's defensive capabilities to better withstand environmental challenges
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
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">What skin conditions can the 360° Smart Rescue treatment address?</h3>
                <p className="text-gray-600">
                  Our treatment is designed to address a wide range of skin concerns including irritation, redness, dryness, sensitivity, environmental damage, post-procedure recovery, sunburn, windburn, and compromised skin barriers. It's particularly effective for reactive skin and conditions where inflammation is present.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Is the treatment painful or uncomfortable?</h3>
                <p className="text-gray-600">
                  No, quite the opposite! The 360° Smart Rescue treatment is specifically designed to provide immediate comfort to distressed skin. Most clients describe the experience as deeply soothing and relaxing, with a cooling sensation that brings immediate relief to irritated skin.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">How quickly will I see results?</h3>
                <p className="text-gray-600">
                  Many clients experience immediate relief from discomfort and visible reduction in redness during the first treatment. More comprehensive improvements in skin texture, hydration, and overall health typically become apparent within 24-48 hours after treatment as the repair processes continue working.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Is there any downtime after the 360° Smart Rescue treatment?</h3>
                <p className="text-gray-600">
                  There is no downtime after this treatment. In fact, it's specifically designed to be used on skin that's already experiencing distress or recovery from other procedures. You can immediately return to your normal activities with a refreshed, soothed complexion.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">How many treatments will I need?</h3>
                <p className="text-gray-600">
                  For acute issues such as temporary irritation or environmental damage, a single treatment may provide sufficient relief and repair. For chronic conditions or more significant damage, we typically recommend a series of 3-6 treatments spaced 1-2 weeks apart, followed by monthly maintenance treatments.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Can the 360° Smart Rescue be combined with other treatments?</h3>
                <p className="text-gray-600">
                  Yes, this treatment works exceptionally well as a complementary therapy to other services. It's particularly valuable following more intensive treatments like chemical peels, laser procedures, or microneedling to accelerate healing and minimize post-procedure sensitivity and redness.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">What should I do before and after my treatment?</h3>
                <p className="text-gray-600">
                  Before your treatment, avoid harsh exfoliants or active ingredients like retinol for 24-48 hours. After treatment, we recommend using gentle cleansers and following with the specialized at-home care products we'll recommend to extend and enhance your results. Staying well-hydrated and avoiding excessive sun exposure will also optimize your results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Now Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            Ready for <span className="text-primary">360° Smart Rescue</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience the transformative power of our comprehensive skin rescue treatment at Aura Beauty. Book your appointment today and take the first step toward calmer, healthier, more resilient skin.
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
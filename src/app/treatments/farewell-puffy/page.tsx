"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PlaceholderImage from '@/components/PlaceholderImage'
import type { CarouselApi } from "@/components/ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function FarewellPuffyPage() {
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
                Farewell <span className="text-primary">Puffy</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Facial Tightening</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">V-Shape Face</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Defined Contours</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Fine Line Reduction</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Are you concerned about sagging skin, puffy cheeks, or lack of facial definition? Traditional methods often provide only temporary results without addressing the root causes of facial volume loss and skin laxity.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Our "Farewell Puffy" treatment is a revolutionary non-invasive face slimming and lifting technique that delivers results comparable to thread lifting procedures. Using focused ultrasonic energy to create invisible "energy threads" in the deeper dermis layer, this treatment stimulates collagen production and restructuring, enhancing skin elasticity and creating a natural lifting effect.
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
              <PlaceholderImage 
                page="farewell-puffy"
                section="hero"
                number={1}
                aspectRatio="aspect-[3/4]"
                className="object-cover w-full h-full"
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
              Farewell Puffy: <span className="text-primary">Sculpted Facial Contours</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Our Farewell Puffy treatment utilizes cutting-edge ultrasonic technology to deliver non-invasive facial contouring with results comparable to surgical interventions. This innovative approach targets specific facial zones to create a lifted, more defined appearance.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              By directing precise ultrasonic energy into the dermis layer, we create a network of collagen-stimulating energy pathways that enhance your skin's structural support system. The result is a visibly lifted, more sculpted facial profile with sharper contours and reduced puffiness.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Targeted Energy Delivery</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our treatment begins by precisely mapping facial contours to identify key treatment zones. Using specialized ultrasonic delivery techniques, we target specific facial areas with focused energy, creating invisible supportive structures beneath the skin. This targeted approach ensures optimal results for your unique facial structure.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Collagen Restructuring</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The ultrasonic energy stimulates deep collagen regeneration and remodeling within the dermis layer. This process creates a natural scaffolding effect, strengthening facial support structures and improving overall elasticity. The result is a gradual, natural-looking lift that continues to improve over time.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Fat Cell Reduction</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  For facial areas with excess volume, our focused ultrasonic energy gently affects subcutaneous fat cells, reducing their size and number. This targeted approach helps eliminate facial puffiness and creates more defined cheek and jawline contours without affecting surrounding tissues.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Skin Surface Refinement</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The final phase of treatment involves stimulating surface-level circulation and cellular renewal. This enhances skin texture and tone while reducing the appearance of fine lines. The comprehensive approach ensures that your face doesn't just have better contours, but also enjoys improved skin quality.
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
              Benefits of <span className="text-primary">Farewell Puffy</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Experience transformative facial contouring with our advanced non-invasive treatment
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
                            <PlaceholderImage 
                              page="farewell-puffy"
                              section="benefits"
                              number={num}
                              aspectRatio="aspect-square"
                              className="object-cover w-full h-full transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Before & After", "Treatment Process", "V-Shape Results", "Jaw Definition", "Long-lasting Effects"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "See the remarkable transformation in facial contours",
                                "The non-invasive ultrasonic procedure in action",
                                "Achieve a coveted V-shaped facial profile",
                                "Experience sharper, more defined jawline contours",
                                "Results that improve over time and last for years"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z"></path><path d="M8 22v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Non-Invasive Lifting</h3>
              <p className="text-gray-600">
                Achieve a surgical-like lift without incisions, anesthesia, or recovery time
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path><path d="M12 12 8 8"></path><path d="M12 16v-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Long-lasting Results</h3>
              <p className="text-gray-600">
                Effects continue improving for months and can last 2+ years with proper maintenance
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M8 2v4"></path><path d="M12 2v4"></path><path d="M16 2v4"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Natural-Looking</h3>
              <p className="text-gray-600">
                Progressive results that enhance your natural features without an artificial appearance
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Zero Downtime</h3>
              <p className="text-gray-600">
                Resume normal activities immediately following the treatment with no recovery period
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Comprehensive Improvement</h3>
              <p className="text-gray-600">
                Addresses multiple concerns: sagging, puffiness, jowls, and fine lines in one treatment
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Customized Treatment</h3>
              <p className="text-gray-600">
                Personalized approach based on your unique facial structure and specific concerns
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
                <h3 className="text-xl font-bold mb-3">How often should I have the Farewell Puffy treatment?</h3>
                <p className="text-gray-600">
                  We generally recommend treatments every 1-1.5 months, with 3-5 sessions comprising a complete treatment course. The exact number of sessions depends on your skin condition. Results from a full course can last 2+ years.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Are there any pre-treatment precautions?</h3>
                <p className="text-gray-600">
                  For two weeks before treatment, avoid intense heat therapies, exfoliation, AHAs, retinol, light-based treatments, microneedling, and RF treatments. The treatment is not suitable during pregnancy, for those with severe skin conditions, blood-thinning medications, electronic implants, metal implants, fillers, prosthetics, open wounds, severe acne, or keloid scars.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Are there any side effects?</h3>
                <p className="text-gray-600">
                  During the treatment, you may experience mild numbness or tingling sensations. After the treatment, some redness may occur, which typically subsides naturally within a few days.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">How does the treatment compare to thread lifting?</h3>
                <p className="text-gray-600">
                  Our Farewell Puffy treatment delivers comparable lifting results to thread lifting but without any invasive procedures. It uses ultrasonic energy to stimulate your own collagen production rather than introducing foreign materials, resulting in a more natural appearance with zero downtime.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">When will I see results?</h3>
                <p className="text-gray-600">
                  Many clients notice subtle improvements immediately after the first session. However, the most significant results develop gradually over 2-3 months as collagen remodeling occurs. For optimal results, completing the recommended treatment course is important.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Is the treatment painful?</h3>
                <p className="text-gray-600">
                  Most clients report minimal discomfort. You may feel a mild warming sensation and occasional tingling as the ultrasonic energy is delivered. Our technicians adjust the treatment intensity to ensure your comfort throughout the session.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">How can I maintain my results?</h3>
                <p className="text-gray-600">
                  To extend your results, we recommend regular maintenance treatments every 3-6 months following your initial course. Additionally, a consistent skincare routine, adequate hydration, healthy diet, sun protection, and avoiding excessive weight fluctuations will help maintain your results.
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
            Ready for <span className="text-primary">Farewell Puffy</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience the transformative power of our non-invasive facial contouring treatment at Aura Beauty. Book your appointment today and take the first step toward a more sculpted, defined facial profile.
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
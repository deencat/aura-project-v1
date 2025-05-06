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

export default function GlowTreatmentPage() {
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
                Luminous <span className="text-primary">Glow Treatment</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Intense Hydration</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Radiant Complexion</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Even Skin Tone</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Brightening Effect</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Our Luminous Glow Treatment is a revolutionary facial experience designed to restore your skin's natural radiance while providing deep hydration and illumination for a youthful, glowing complexion.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                This innovative treatment combines advanced hydrating technology with powerful brightening ingredients to restore luminosity to dull, tired skin, leaving you with an unmatched radiant glow that lasts.
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
                category="facials"
                treatment="glow"
                type="hero"
                alt="Luminous Glow Treatment"
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
              Luminous Glow: <span className="text-primary">Advanced Radiance Therapy</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Our Luminous Glow Treatment goes beyond standard facials by targeting multiple layers of the skin to boost natural luminosity and address the root causes of dullness. Using a combination of vitamin-rich serums, hydrating agents, and specialized technology, we revitalize and refresh your skin from within.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Experience the transformative power of our Luminous Glow Treatment as it brightens, balances, and rejuvenates your complexion, revealing the naturally radiant skin that has been hiding beneath the surface.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Multi-Layer Hydration</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our treatment uses a specialized multi-layer hydration system that delivers moisture to different skin depths, ensuring comprehensive hydration that lasts long after your treatment has ended.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Vitamin Infusion</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  We infuse your skin with a potent blend of vitamins, including Vitamin C, B3, and E, which work together to brighten your complexion, even skin tone, and protect against environmental stressors.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Light Therapy Enhancement</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our advanced light therapy technology stimulates collagen production and cellular renewal while enhancing the absorption of active ingredients, resulting in a more profound brightening effect.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Advanced Exfoliation</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our gentle yet effective exfoliation process removes dead skin cells and impurities that cause dullness, instantly revealing fresher, more luminous skin while preparing it to receive maximum benefits from the treatment.
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
              Benefits of <span className="text-primary">Luminous Glow Treatment</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Experience transformative results with our advanced radiance therapy
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
                              category="facials"
                              treatment="glow"
                              type="benefits"
                              index={num}
                              alt={["Instant Radiance", "Deep Hydration", "Even Skin Tone", "Reduced Dullness", "Long-Lasting Results"][num-1]}
                              className="w-full h-full transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Instant Radiance", "Deep Hydration", "Even Skin Tone", "Reduced Dullness", "Long-Lasting Results"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "Immediate boost in skin luminosity and glow",
                                "Profound moisture that lasts for days",
                                "Visibly more balanced and even complexion",
                                "Elimination of signs of tiredness and fatigue",
                                "Results that continue to improve over time"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a2 2 0 0 0 0 4 2 2 0 0 0 0-4z"></path><path d="M12 18a2 2 0 0 0 0 4 2 2 0 0 0 0-4z"></path><path d="M5 5a2 2 0 0 0 0 4 2 2 0 0 0 0-4z"></path><path d="M19 5a2 2 0 0 0 0 4 2 2 0 0 0 0-4z"></path><path d="M5 19a2 2 0 0 0 0-4 2 2 0 0 0 0 4z"></path><path d="M19 19a2 2 0 0 0 0-4 2 2 0 0 0 0 4z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Instant Illumination</h3>
              <p className="text-gray-600">
                Experience immediate brightening and radiance restoration even after the first session
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.95 1 4.8a7.587 7.587 0 0 1 .5 2.5V20"></path><path d="M19.8 17.8a7.5 7.5 0 0 0-3.9-5.1"></path><path d="M22 20a9 9 0 0 0-9.3-9"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Hydration Boost</h3>
              <p className="text-gray-600">
                Intensely hydrates all skin layers for plump, dewy, and youthful-looking skin
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v6a6 6 0 0 0 12 0V2"></path><path d="M6 12v6a6 6 0 0 0 12 0v-6"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Even Complexion</h3>
              <p className="text-gray-600">
                Balances skin tone and reduces hyperpigmentation for a more uniform appearance
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11v2a4.002 4.002 0 0 0 8 0v-2"></path><path d="M7 5h10"></path><path d="M8 9h8"></path><path d="M7 15h2"></path><path d="M15 15h2"></path><path d="M12 16v5"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Antioxidant Protection</h3>
              <p className="text-gray-600">
                Shields your skin against environmental damage with powerful antioxidants
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Enhanced Product Absorption</h3>
              <p className="text-gray-600">
                Prepares your skin to better receive and retain benefits from your skincare routine
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
                    What makes the Luminous Glow Treatment different from regular facials?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Our Luminous Glow Treatment stands apart from standard facials through its multi-layered approach to skin brightening and hydration. While regular facials typically focus on surface cleansing and basic hydration, our treatment uses advanced technology to deliver active ingredients deep into the skin for lasting radiance. We combine vitamin infusion, light therapy, and specialized exfoliation techniques not found in conventional facials, resulting in immediately visible and longer-lasting luminosity.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How long does the treatment take and is there any downtime?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    The Luminous Glow Treatment typically takes 60-75 minutes to complete. One of the major advantages of this treatment is that there is virtually no downtime. You may experience a slight flush immediately after treatment due to increased circulation, but this typically subsides within an hour. You can apply makeup and resume normal activities immediately following your appointment, making it perfect for a pre-event glow boost or as part of your regular skincare routine.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How many sessions do I need to see optimal results?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    While you'll notice an immediate improvement in your skin's radiance after just one session, we recommend a series of 4-6 treatments spaced 2-3 weeks apart for optimal and lasting results. This treatment schedule allows for progressive improvement in skin luminosity, texture, and tone. After completing the initial series, monthly maintenance sessions can help sustain your results. Our specialists will create a personalized treatment plan based on your specific skin concerns and goals.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    Is the Luminous Glow Treatment suitable for all skin types?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, our Luminous Glow Treatment has been designed to benefit all skin types, including sensitive skin. The treatment can be customized by adjusting the intensity and specific ingredients used based on your skin's needs and sensitivities. It's especially beneficial for those with dull, dehydrated, or uneven skin tone, but can be modified to address various concerns. During your consultation, our specialists will assess your skin and tailor the treatment accordingly.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    Can I combine this treatment with other facial services?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Absolutely! The Luminous Glow Treatment works wonderfully as a standalone service but can also be combined with many of our other facial treatments for enhanced results. Popular combinations include adding our treatment with microneedling for deeper product penetration, or with our targeted eye and lip treatments for comprehensive facial rejuvenation. Our skincare specialists can recommend the most beneficial combinations based on your specific skin goals and concerns.
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
            Ready for <span className="text-primary">Luminous Glow Treatment</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience the transformation of our exclusive Luminous Glow Treatment—reveal your skin's natural radiance, achieve that coveted dewy complexion, and step out with the confidence that comes from truly glowing skin!
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
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

export default function CeramicSkinRenewalPage() {
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
                <span className="text-primary">Ceramic Skin</span> Renewal
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Porcelain Finish</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Luminous Glow</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Texture Refinement</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Pore Minimization</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Our exclusive Ceramic Skin Renewal treatment delivers a flawless, porcelain-like complexion by combining advanced exfoliation technology with deep hydration and specialized ceramide-infused serums.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Experience the transformation as your skin achieves the smooth, radiant finish of fine porcelain—refined texture, minimized pores, and a luminous glow that reflects light beautifully.
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
                treatment="ceramic-skin-renewal"
                type="hero"
                alt="Ceramic Skin Renewal Treatment"
                fill
                objectFit="cover"
                priority
                fallbackBehavior="placeholder"
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
              Ceramic Skin Renewal: <span className="text-primary">The Art of Perfection</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Inspired by the flawless finish of fine porcelain, our Ceramic Skin Renewal treatment combines cutting-edge technology with luxurious formulations to transform your skin's appearance and texture.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              This multi-step treatment works at both the surface and cellular levels to refine texture, minimize pores, enhance luminosity, and create a smooth, even complexion that reflects light beautifully—just like fine ceramic.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Diamond Microdermabrasion</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our precision diamond-tip exfoliation system gently removes the outermost layer of dead skin cells, instantly revealing smoother, brighter skin. This controlled exfoliation creates the perfect canvas for the subsequent treatment steps while stimulating cellular renewal.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Ceramide Infusion</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our proprietary blend of ceramides, essential lipids, and hyaluronic acid is delivered deep into the skin using ultrasonic technology. This replenishes the skin's natural barrier, locks in moisture, and creates a smooth, refined surface texture.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Light Therapy</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Advanced LED light therapy stimulates collagen production and accelerates cellular repair. Different wavelengths target specific skin concerns—red light for anti-aging, blue light for purification, and near-infrared for deep tissue repair—resulting in firmer, more radiant skin.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Porcelain Finish Mask</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our exclusive cooling porcelain mask contains niacinamide, rice extract, and silk proteins that refine pores, even skin tone, and impart a luminous, light-reflecting quality to the skin. The mask also helps to set the treatment benefits for long-lasting results.
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
              Benefits of <span className="text-primary">Ceramic Skin Renewal</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Experience the transformative results of our signature porcelain skin treatment
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
                              treatment="ceramic-skin-renewal"
                              type="benefits"
                              index={num}
                              alt={["Refined Texture", "Minimized Pores", "Enhanced Luminosity", "Even Skin Tone", "Hydration Boost"][num-1]}
                              className="w-full h-full transition duration-500 hover:scale-110"
                              fallbackBehavior="placeholder"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Refined Texture", "Minimized Pores", "Enhanced Luminosity", "Even Skin Tone", "Hydration Boost"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "Smoother, softer skin with dramatically improved texture",
                                "Visibly reduced pore size for a flawless complexion",
                                "Radiant glow that reflects light beautifully",
                                "Reduced appearance of discoloration and redness",
                                "Deep, long-lasting hydration for plump, supple skin"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"></path><path d="M12 2v20"></path><path d="m4.93 4.93 14.14 14.14"></path><path d="m19.07 4.93-14.14 14.14"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Immediate Results</h3>
              <p className="text-gray-600">
                See visible improvement in skin texture and luminosity after just one treatment
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0-9 4.5 4.5 0 0 1 0-9Z"></path><path d="M12 8v8"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Cumulative Benefits</h3>
              <p className="text-gray-600">
                Progressive improvement with each session for truly transformative results
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Non-Invasive</h3>
              <p className="text-gray-600">
                Achieve remarkable results without needles, surgery, or aggressive treatments
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5 17.5 17.5"></path><path d="M17.5 6.5 6.5 17.5"></path><circle cx="12" cy="12" r="10"></circle></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Zero Downtime</h3>
              <p className="text-gray-600">
                Return to your daily activities immediately with a radiant glow
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5"></path><path d="M9 7V2"></path><path d="M15 7V2"></path><path d="M6 13V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0v-1H9v1a3 3 0 0 1-3 0Z"></path><path d="M12 17a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">All Skin Types</h3>
              <p className="text-gray-600">
                Customized protocols suitable for all skin types, tones, and concerns
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.95 1 4.8a7.587 7.587 0 0 1 .5 2.5V20"></path><path d="M19.8 17.8a7.5 7.5 0 0 0-3.9-5.1"></path><path d="M22 20a9 9 0 0 0-9.3-9"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Long-Lasting Results</h3>
              <p className="text-gray-600">
                Enjoy the benefits of your porcelain-like complexion for weeks after treatment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              The <span className="text-primary">Ceramic Skin Renewal</span> Experience
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Our signature treatment protocol for achieving flawless, porcelain-like skin
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">1</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Skin Analysis</h3>
                <p className="text-gray-600">
                  Our specialists perform a comprehensive assessment of your skin using advanced imaging technology to identify concerns, measure hydration levels, and customize your treatment protocol.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">2</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Deep Cleansing</h3>
                <p className="text-gray-600">
                  A gentle yet thorough cleansing process removes all impurities, makeup, and environmental pollutants from your skin, preparing it for the treatment steps to follow.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">3</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Diamond Microdermabrasion</h3>
                <p className="text-gray-600">
                  Our precision diamond-tip exfoliation system gently removes the outermost layer of dead skin cells, instantly revealing smoother, brighter skin and creating the perfect canvas for the next steps.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">4</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Ceramide Infusion</h3>
                <p className="text-gray-600">
                  Our proprietary blend of ceramides, essential lipids, and hyaluronic acid is delivered deep into the skin using ultrasonic technology, replenishing the skin's natural barrier and creating a smooth surface texture.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">5</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">LED Light Therapy</h3>
                <p className="text-gray-600">
                  Advanced LED light therapy stimulates collagen production and accelerates cellular repair. Different wavelengths target specific skin concerns, resulting in firmer, more radiant skin with a porcelain-like quality.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">6</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Porcelain Finish</h3>
                <p className="text-gray-600">
                  Our exclusive cooling porcelain mask contains niacinamide, rice extract, and silk proteins that refine pores, even skin tone, and impart a luminous, light-reflecting quality to the skin for that coveted ceramic finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            
            <div className="mt-12 space-y-6">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How soon will I see results from the Ceramic Skin Renewal treatment?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Most clients experience immediate results after their first Ceramic Skin Renewal treatment. You'll notice smoother texture, enhanced luminosity, and a visible "glow" right away. The full benefits continue to develop over the next 72 hours as the ceramides and active ingredients fully integrate with your skin. For optimal results, we recommend a series of 4-6 treatments spaced 2-3 weeks apart, which will progressively refine your skin's texture and tone for that true porcelain-like finish.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    Is there any downtime after the treatment?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    The Ceramic Skin Renewal treatment is specifically designed to deliver remarkable results with zero downtime. Unlike more aggressive treatments, there's no redness, peeling, or recovery period. In fact, many clients schedule their treatments before special events because of the immediate "glow" effect. You can apply makeup immediately afterward if desired, though many clients prefer to showcase their natural luminosity. We do recommend avoiding direct sun exposure for 24 hours after treatment and using the provided SPF protection.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    Is the Ceramic Skin Renewal treatment suitable for all skin types?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, one of the advantages of our Ceramic Skin Renewal treatment is its suitability for all skin types, tones, and concerns. The treatment is customized for each client based on their specific skin analysis. We adjust the diamond microdermabrasion intensity, ceramide formulation, and LED light therapy wavelengths to address your unique skin needs. Whether you have dry, oily, combination, sensitive, or mature skin, the treatment can be tailored to deliver optimal results without irritation or adverse effects.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How does this treatment differ from regular facials?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    The Ceramic Skin Renewal treatment goes far beyond a traditional facial. While regular facials typically focus on surface cleansing and temporary hydration, our treatment works at multiple skin levels to create lasting change. The combination of diamond microdermabrasion, ultrasonic ceramide infusion, and LED light therapy delivers active ingredients deeper into the skin and stimulates cellular renewal. Additionally, our exclusive porcelain finish mask contains specialized ingredients that create the distinctive light-reflecting quality that gives the treatment its name. The result is not just temporary improvement but progressive enhancement of your skin's texture, tone, and luminosity.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How can I maintain my results between treatments?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    To maintain and enhance your Ceramic Skin Renewal results, we provide a customized home care regimen featuring our professional-grade ceramide products. Key components include our Ceramic Essence Toner, Porcelain Perfecting Serum, and Luminous Barrier Cream. Daily sun protection is essential, as is gentle exfoliation 2-3 times per week. We recommend scheduling maintenance treatments every 4-6 weeks after completing your initial series. During your consultation, our specialists will create a personalized maintenance plan based on your skin's specific needs and your lifestyle factors.
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
            Ready for <span className="text-primary">Porcelain-Perfect Skin</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience the transformative Ceramic Skin Renewal treatment and discover the flawless, luminous complexion you've always desired—with zero downtime and immediate results!
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
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

export default function MicroNeedlingPage() {
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
                Advanced <span className="text-primary">Micro-Needling</span> Therapy
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Collagen Induction</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Skin Rejuvenation</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Scar Reduction</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Enhanced Product Absorption</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Our Advanced Micro-Needling Therapy uses state-of-the-art technology to create controlled micro-injuries that stimulate your skin's natural healing process, resulting in increased collagen production and skin rejuvenation.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                This minimally invasive treatment effectively addresses fine lines, wrinkles, acne scars, and uneven skin texture while enhancing the absorption of therapeutic serums for maximum benefits.
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
                category="facials"
                treatment="micro-needling"
                type="hero"
                alt="Advanced Micro-Needling Therapy"
                fill
                objectFit="cover"
                priority
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
              Micro-Needling: <span className="text-primary">Precision Skin Regeneration</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Our Advanced Micro-Needling Therapy uses ultra-fine needles to create thousands of invisible micro-perforations in the skin's surface. This controlled process triggers the body's wound healing response, stimulating collagen and elastin production without causing actual damage to the epidermis.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Combined with our specialized serums containing growth factors, peptides, and antioxidants, this treatment accelerates skin regeneration and delivers profound improvements in skin texture, firmness, and overall appearance.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Precision Technology</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our advanced micro-needling device features adjustable needle depth settings, allowing our specialists to customize treatment intensity based on your skin concerns and treatment area. This precision ensures optimal results with minimal discomfort.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Enhanced Serum Delivery</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The micro-channels created during treatment increase product absorption by up to 3000%, allowing our specialized serums to penetrate deeply into the skin where they can work most effectively to accelerate healing and rejuvenation.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Collagen Induction</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The controlled micro-injuries stimulate your skin's natural collagen and elastin production, resulting in firmer, more youthful skin. This process continues for up to 8 weeks after treatment, providing progressive improvement.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Minimal Downtime</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Unlike more aggressive treatments, our micro-needling therapy requires minimal recovery time. Most clients experience only mild redness for 24-48 hours, making this an ideal "lunchtime" procedure with maximum benefits.
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
              Benefits of <span className="text-primary">Micro-Needling Therapy</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Experience transformative results with our advanced skin regeneration treatment
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
                              treatment="micro-needling"
                              type="benefits"
                              index={num}
                              alt={["Reduced Fine Lines", "Improved Skin Texture", "Diminished Acne Scars", "Enhanced Product Absorption", "Minimized Pore Size"][num-1]}
                              className="w-full h-full transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Reduced Fine Lines", "Improved Skin Texture", "Diminished Acne Scars", "Enhanced Product Absorption", "Minimized Pore Size"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "Significant reduction in fine lines and wrinkles",
                                "Smoother, more refined skin texture",
                                "Visible improvement in acne scars and hyperpigmentation",
                                "Up to 3000% better absorption of skincare products",
                                "Noticeably smaller pores and improved skin clarity"
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
              <h3 className="text-xl font-bold mb-4">Targets Multiple Concerns</h3>
              <p className="text-gray-600">
                Addresses fine lines, wrinkles, scars, stretch marks, and uneven skin tone in one treatment
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0-9 4.5 4.5 0 0 1 0-9Z"></path><path d="M12 8v8"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Natural Results</h3>
              <p className="text-gray-600">
                Stimulates your body's own regenerative processes for natural-looking rejuvenation
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Safe for All Skin Types</h3>
              <p className="text-gray-600">
                Customizable treatment suitable for all skin types and tones with minimal risk
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5 17.5 17.5"></path><path d="M17.5 6.5 6.5 17.5"></path><circle cx="12" cy="12" r="10"></circle></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Minimal Downtime</h3>
              <p className="text-gray-600">
                Resume normal activities within 24-48 hours with only mild redness
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5"></path><path d="M9 7V2"></path><path d="M15 7V2"></path><path d="M6 13V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0v-1H9v1a3 3 0 0 1-3 0Z"></path><path d="M12 17a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Progressive Results</h3>
              <p className="text-gray-600">
                Continues to improve skin quality for weeks after treatment as collagen rebuilds
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.95 1 4.8a7.587 7.587 0 0 1 .5 2.5V20"></path><path d="M19.8 17.8a7.5 7.5 0 0 0-3.9-5.1"></path><path d="M22 20a9 9 0 0 0-9.3-9"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Customizable Treatment</h3>
              <p className="text-gray-600">
                Tailored to your specific skin concerns with adjustable intensity and specialized serums
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
              How <span className="text-primary">Micro-Needling</span> Works
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Understanding the science behind our advanced skin regeneration therapy
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">1</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Preparation</h3>
                <p className="text-gray-600">
                  Your skin is thoroughly cleansed and a topical numbing cream is applied for your comfort. Our specialist will discuss your concerns and customize the treatment accordingly.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">2</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Micro-Needling Process</h3>
                <p className="text-gray-600">
                  Using our advanced device, thousands of microscopic channels are created in the skin. The depth is precisely controlled based on your treatment area and skin concerns.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">3</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Serum Application</h3>
                <p className="text-gray-600">
                  Specialized serums containing growth factors, peptides, and antioxidants are applied to the skin, where they can now penetrate deeply through the micro-channels.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">4</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Healing Response</h3>
                <p className="text-gray-600">
                  Your skin initiates its natural healing process, increasing blood flow and triggering the production of new collagen and elastin fibers.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">5</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Recovery</h3>
                <p className="text-gray-600">
                  Mild redness and sensitivity may occur for 24-48 hours. A specialized post-treatment skincare regimen is provided to optimize healing and results.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">6</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Progressive Results</h3>
                <p className="text-gray-600">
                  Initial improvements are visible within days, but the most significant results develop over 4-8 weeks as new collagen forms and skin regenerates.
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
                    Is micro-needling painful?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Most clients report minimal discomfort during the procedure. We apply a topical numbing cream before treatment to ensure your comfort. You may feel a slight prickling sensation, but our advanced device is designed to minimize discomfort while maximizing results. After treatment, your skin may feel similar to a mild sunburn, but this typically subsides within 24 hours.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How many treatments will I need?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    While you'll notice improvements after a single session, most clients achieve optimal results with a series of 3-6 treatments spaced 4-6 weeks apart. The exact number depends on your specific skin concerns and goals. For acne scarring or more significant textural issues, 6 or more sessions may be recommended. We'll create a personalized treatment plan during your consultation based on your unique needs.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    What is the downtime after micro-needling?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    One of the advantages of micro-needling is its minimal downtime. Most clients experience mild redness, similar to a sunburn, for 24-48 hours after treatment. Some may also experience slight swelling, dryness, or flaking as the skin heals. You can typically return to your normal activities the following day, though we recommend avoiding makeup for 24 hours and sun exposure for at least 72 hours. We provide detailed aftercare instructions to ensure optimal healing and results.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    Is micro-needling safe for all skin types?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, micro-needling is generally safe for all skin types and tones, including darker skin. Unlike some laser treatments, micro-needling doesn't target pigment, so there's minimal risk of hyperpigmentation. However, certain conditions may make you unsuitable for treatment, including active acne, rosacea flares, open wounds, skin infections, or a history of keloid scarring. During your consultation, we'll review your medical history and skin condition to ensure micro-needling is appropriate for you.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How soon will I see results from micro-needling?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Many clients notice an immediate "glow" and improved skin texture within days of treatment as initial healing occurs. However, the most significant results develop gradually over time as collagen production increases. You'll typically see noticeable improvements in skin texture, tone, and firmness within 2-4 weeks after treatment. These results continue to improve for up to 6 months as collagen remodeling progresses. For concerns like acne scars or stretch marks, multiple treatments are usually needed to achieve optimal results.
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
            Ready for <span className="text-primary">Transformative Results</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience the power of Advanced Micro-Needling Therapy—rejuvenate your skin, boost collagen production, and achieve a smoother, more youthful complexion with minimal downtime!
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button className="rounded-full bg-primary px-8 py-3 text-white hover:bg-primary/90" data-testid="final-cta-book-treatment">
                Book Your Treatment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
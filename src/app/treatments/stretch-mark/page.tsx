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

export default function StretchMarkPage() {
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
                Advanced <span className="text-primary">Stretch Mark</span> Treatment
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Skin Rejuvenation</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Scar Reduction</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Texture Improvement</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Collagen Stimulation</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Our Advanced Stretch Mark Treatment combines cutting-edge technology with proven techniques to minimize the appearance of stretch marks and improve skin texture and tone.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                This comprehensive approach targets both new and mature stretch marks, stimulating collagen production and promoting skin regeneration for smoother, more even-toned skin.
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
                category="body-care"
                treatment="stretch-mark"
                type="hero"
                alt="Advanced Stretch Mark Treatment"
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
              Stretch Mark Treatment: <span className="text-primary">Multi-Dimensional Approach</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Our Advanced Stretch Mark Treatment utilizes a multi-dimensional approach that combines micro-needling, laser therapy, and specialized serums to target stretch marks at different layers of the skin.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              This comprehensive treatment stimulates collagen production, promotes cell turnover, and enhances skin elasticity, effectively reducing the appearance of both red/purple (new) and white/silver (mature) stretch marks.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Micro-Needling Technology</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our advanced micro-needling device creates thousands of microscopic channels in the skin, triggering the body's natural healing response and stimulating collagen and elastin production. This helps to rebuild and strengthen the skin's structure where stretch marks have caused damage.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Targeted Laser Therapy</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Precision laser technology delivers focused energy to the deeper layers of the skin, breaking down scar tissue and stimulating new cell growth. This is particularly effective for mature stretch marks that have developed a white or silvery appearance.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Growth Factor Serums</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our specialized serums contain growth factors, peptides, and antioxidants that penetrate deeply through the micro-channels created during treatment. These active ingredients accelerate healing, enhance collagen production, and improve overall skin quality.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Customized Protocols</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Each treatment is tailored to your specific stretch marks, taking into account their age, color, depth, and location. This personalized approach ensures optimal results for your unique skin concerns, whether treating post-pregnancy stretch marks, growth-related marks, or those caused by weight fluctuations.
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
              Benefits of <span className="text-primary">Stretch Mark Treatment</span>
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
                              category="body-care"
                              treatment="stretch-mark"
                              type="benefits"
                              index={num}
                              alt={["Reduced Appearance", "Improved Skin Texture", "Enhanced Skin Tone", "Increased Confidence", "Long-lasting Results"][num-1]}
                              className="w-full h-full transition duration-500 hover:scale-110"
                              fallbackBehavior="placeholder"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Reduced Appearance", "Improved Skin Texture", "Enhanced Skin Tone", "Increased Confidence", "Long-lasting Results"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "Significant reduction in the visibility of stretch marks",
                                "Smoother, more refined skin texture in treated areas",
                                "More even skin tone with reduced discoloration",
                                "Renewed confidence in your appearance",
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"></path><path d="M12 2v20"></path><path d="m4.93 4.93 14.14 14.14"></path><path d="m19.07 4.93-14.14 14.14"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Effective on All Types</h3>
              <p className="text-gray-600">
                Works on both new (red/purple) and mature (white/silver) stretch marks across all skin types
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0-9 4.5 4.5 0 0 1 0-9Z"></path><path d="M12 8v8"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Natural Healing</h3>
              <p className="text-gray-600">
                Stimulates your body's own regenerative processes for natural-looking improvement
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Safe & Comfortable</h3>
              <p className="text-gray-600">
                Minimally invasive treatment with topical numbing for maximum comfort
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
              <h3 className="text-xl font-bold mb-4">All Body Areas</h3>
              <p className="text-gray-600">
                Effective for stretch marks on abdomen, thighs, buttocks, breasts, arms, and back
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
              How Our <span className="text-primary">Stretch Mark Treatment</span> Works
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Understanding the science behind our advanced skin regeneration therapy
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">1</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Consultation & Assessment</h3>
                <p className="text-gray-600">
                  Our specialists evaluate your stretch marks, considering their age, color, depth, and location. We develop a personalized treatment plan tailored to your specific concerns and skin type.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">2</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Preparation</h3>
                <p className="text-gray-600">
                  The treatment area is thoroughly cleansed, and a topical numbing cream is applied for your comfort. We prepare the specialized serums and equipment based on your customized protocol.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">3</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Micro-Needling</h3>
                <p className="text-gray-600">
                  Using our advanced device, thousands of microscopic channels are created in the skin over the stretch marks. The depth is precisely controlled based on the treatment area and your skin's thickness.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">4</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Laser Treatment</h3>
                <p className="text-gray-600">
                  For mature stretch marks, targeted laser therapy is applied to break down scar tissue and stimulate new cell growth. The laser energy penetrates to the deeper layers of skin without damaging the surface.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">5</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Serum Application</h3>
                <p className="text-gray-600">
                  Specialized serums containing growth factors, peptides, and antioxidants are applied to the skin, where they can now penetrate deeply through the micro-channels to accelerate healing and collagen production.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">6</div>
              <div className="bg-gray-50 rounded-lg p-8 pt-12">
                <h3 className="text-xl font-bold mb-4">Recovery & Results</h3>
                <p className="text-gray-600">
                  You may experience mild redness and sensitivity for 24-48 hours. A specialized post-treatment skincare regimen is provided. Results develop gradually over 4-12 weeks as collagen remodeling occurs, with optimal results typically seen after a series of treatments.
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
                    Can all stretch marks be treated?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, our treatment is effective on all types of stretch marks, though results may vary based on several factors. New stretch marks (red or purple in color) typically respond more quickly to treatment than mature stretch marks (white or silver). However, our multi-dimensional approach combining micro-needling, laser therapy, and specialized serums can significantly improve even long-standing stretch marks. During your consultation, we'll assess your specific stretch marks and provide realistic expectations for improvement.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How many treatments will I need?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Most clients achieve optimal results with a series of 3-6 treatments spaced 4-6 weeks apart. The exact number depends on the age, depth, and extent of your stretch marks. Newer stretch marks may show significant improvement after just 2-3 sessions, while older, more established stretch marks typically require a full series of treatments. We'll create a personalized treatment plan during your consultation based on your unique needs and goals.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    Is the treatment painful?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Most clients report minimal discomfort during the procedure. We apply a topical numbing cream before treatment to ensure your comfort. You may feel a slight prickling sensation during the micro-needling portion and mild warmth during the laser treatment, but our advanced devices are designed to minimize discomfort while maximizing results. After treatment, your skin may feel similar to a mild sunburn, but this typically subsides within 24-48 hours.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    What is the downtime after treatment?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    One of the advantages of our stretch mark treatment is its minimal downtime. Most clients experience mild redness, similar to a sunburn, for 24-48 hours after treatment. Some may also experience slight swelling, dryness, or flaking as the skin heals. You can typically return to your normal activities the following day, though we recommend avoiding strenuous exercise, excessive heat (saunas, hot tubs), and sun exposure for at least 72 hours. We provide detailed aftercare instructions to ensure optimal healing and results.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    When will I see results?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Results develop gradually as your body produces new collagen and elastin. Many clients notice initial improvements in skin texture and stretch mark color within 2-4 weeks after the first treatment. However, the most significant results develop over time, with continued improvement for up to 6 months after completing your treatment series. Newer stretch marks typically respond more quickly, while mature stretch marks improve more gradually with each session. We recommend taking "before" photos to better track your progress throughout the treatment process.
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
            Ready to <span className="text-primary">Transform Your Skin</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience the power of our Advanced Stretch Mark Treatment—reduce the appearance of stretch marks, improve skin texture, and regain your confidence with minimal downtime!
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
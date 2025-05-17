"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import TreatmentImage from '@/components/TreatmentImage'
import type { CarouselApi } from "@/components/ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function CollagenRegenerationPage() {
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
      <section className="relative flex min-h-[50vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Collagen <span className="text-primary">Regeneration</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
                Boost your skin's natural collagen production for improved elasticity, firmness, and a more youthful appearance.
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Anti-Aging</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Skin Elasticity</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Firming</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Fine Lines</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Wrinkles</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Youthful Glow</span>
                </div>
              </div>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90">
                  Book Treatment
                </Button>
                <Button variant="outline" className="rounded-full border-primary px-8 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg">
                <TreatmentImage 
                  category="treatments"
                  treatment="collagen-regeneration"
                  type="hero"
                  alt="Collagen Regeneration Treatment"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Treatment Info Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              Restore Your Skin's <span className="text-primary">Youthful Structure</span>
            </h2>
            
            <div className="mt-8 space-y-6 text-gray-700">
              <p>
                Collagen is the essential protein responsible for your skin's structure, elasticity, and firmness. 
                As we age, our natural collagen production decreases, leading to wrinkles, fine lines, and sagging skin.
              </p>
              
              <p>
                Our Collagen Regeneration treatment utilizes advanced technology to stimulate your skin's natural 
                collagen production process, revitalizing your skin from within and restoring its youthful appearance.
              </p>
              
              <p>
                This non-invasive treatment penetrates deep into the dermis layer where collagen is produced, 
                activating fibroblast cells to create new collagen fibers that strengthen and tighten your skin.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Advantages Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl text-center">
              Treatment <span className="text-primary">Benefits</span>
            </h2>
            <p className="mt-4 text-center text-gray-600">
              Experience the transformative power of collagen regeneration
            </p>
            
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Improved Skin Elasticity</h3>
                <p className="text-gray-600">
                  Restores your skin's natural bounce and flexibility, helping it return to its original shape after stretching or contracting.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Reduced Fine Lines & Wrinkles</h3>
                <p className="text-gray-600">
                  Smooths out existing fine lines and wrinkles while preventing new ones from forming by strengthening the skin's structure.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.13 12.03a7.48 7.48 0 0 0 0 0"/><path d="M5.13 12.03c.13 1.72.95 3.4 2.46 4.45"/><path d="M5.13 12.03a7.5 7.5 0 1 1 8-7.54"/><path d="m13 18-4.5 4.5"/><path d="m17 14 3.5-3.5"/><path d="m14 14 3-3"/><path d="m11 17 2-2"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Increased Firmness</h3>
                <p className="text-gray-600">
                  Tightens loose skin and improves its overall firmness, giving your face a more sculpted and youthful appearance.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="m8 11 4 4 4-4"/><path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Enhanced Skin Texture</h3>
                <p className="text-gray-600">
                  Creates smoother, more refined skin texture by promoting cell turnover and reducing the appearance of pores and scars.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              How <span className="text-primary">It Works</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Our comprehensive approach to collagen regeneration
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-12">
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <span>1</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Thermal Energy Delivery</h3>
                  <p className="text-gray-600">
                    Our technology delivers controlled thermal energy deep into the dermis layer, precisely targeting the collagen-producing cells.
                  </p>
                </div>
                
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <span>2</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Collagen Fiber Remodeling</h3>
                  <p className="text-gray-600">
                    The thermal energy causes existing collagen fibers to contract and remodel, creating an immediate tightening effect.
                  </p>
                </div>
              </div>
              
              <div className="space-y-12">
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <span>3</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Fibroblast Activation</h3>
                  <p className="text-gray-600">
                    Fibroblast cells are stimulated to produce new collagen, elastin, and hyaluronic acid, the building blocks of youthful skin.
                  </p>
                </div>
                
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <span>4</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Progressive Results</h3>
                  <p className="text-gray-600">
                    Over the next 3-6 months, your skin continues to produce new collagen, resulting in progressive improvement in skin quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Treatment Areas Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Treatment <span className="text-primary">Areas</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Our collagen regeneration treatment can be applied to multiple areas
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="8" r="6"/><path d="M15.5 14h.5a2 2 0 0 1 2 2v2H6v-2a2 2 0 0 1 2-2h.5"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Face</h3>
                <p className="text-sm text-gray-600">
                  Reduces wrinkles and fine lines while improving overall facial contour
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Neck</h3>
                <p className="text-sm text-gray-600">
                  Tightens loose skin and reduces the appearance of "tech neck" lines
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M6 11V9a6 6 0 0 1 12 0v2"/><path d="M6 14v-2a6 6 0 0 1 12 0v2"/><path d="M6 19v-2a6 6 0 0 1 12 0v2"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Décolletage</h3>
                <p className="text-sm text-gray-600">
                  Smooths chest wrinkles and improves skin texture and tone
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M8.35 3.5 5.5 1.65a1 1 0 0 0-1 0l-1.5 1"/><path d="M4 22V4"/><path d="M4 12h17"/><path d="M15 22h4a2 2 0 0 0 2-2V7.5L17.5 3h-7a2 2 0 0 0-2 2v2"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Hands</h3>
                <p className="text-sm text-gray-600">
                  Reduces visible signs of aging on one of the most exposed body parts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Results Carousel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Transformative <span className="text-primary">Results</span>
            </h2>
            <p className="text-lg text-gray-700">
              See the remarkable difference our collagen regeneration treatment can make. Browse through our gallery of before and after photos showcasing real results from our satisfied clients.
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
                              page="collagen-regeneration"
                              section="results"
                              number={num}
                              aspectRatio="aspect-square"
                              className="object-cover w-full h-full transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Before & After", "Treatment Process", "Skin Rejuvenation", "Client Results", "Application Technique"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "See the dramatic improvement in skin firmness and elasticity",
                                "Advanced technology stimulating collagen production",
                                "Watch skin become firmer and more youthful",
                                "Real clients, real results from our treatments",
                                "Professional application ensures optimal results"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Safe & Effective</h3>
              <p className="text-gray-600">
                Our collagen regeneration treatment is non-invasive and clinically proven to provide safe, consistent results
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 18 6-6-6-6"/><path d="m18 6-6 6 6 6"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Gradual Improvement</h3>
              <p className="text-gray-600">
                Experience both immediate tightening and long-term improvement as new collagen forms over time
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Natural Results</h3>
              <p className="text-gray-600">
                Achieve a naturally youthful appearance that enhances your features without looking overdone
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl text-center mb-12">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How many treatments will I need?",
                  answer: "Most clients achieve optimal results with a series of 3-6 treatments spaced 4-6 weeks apart. Your specific treatment plan will be customized based on your age, skin condition, and desired results."
                },
                {
                  question: "Is the collagen regeneration treatment painful?",
                  answer: "Most clients experience minimal discomfort during the treatment. You may feel a warming sensation and mild tingling as the technology works to stimulate collagen production. Our technicians can adjust the intensity to ensure your comfort."
                },
                {
                  question: "When will I see results?",
                  answer: "Some clients notice initial improvement immediately after the first treatment, with skin appearing more lifted and toned. However, the most significant results develop gradually over 2-3 months as new collagen forms, with continued improvement for up to 6 months."
                },
                {
                  question: "How long do the results last?",
                  answer: "Results typically last 1-2 years, depending on your age, skin condition, and lifestyle factors. Maintenance treatments every 6-12 months are recommended to sustain optimal results as the natural aging process continues."
                },
                {
                  question: "Is there any downtime?",
                  answer: "The collagen regeneration treatment has minimal to no downtime. Some clients may experience mild redness or swelling immediately after treatment, but this typically subsides within a few hours. You can resume normal activities immediately."
                },
                {
                  question: "Who is a good candidate for this treatment?",
                  answer: "This treatment is ideal for individuals with mild to moderate skin laxity who want to improve skin firmness and reduce signs of aging without surgery. During your consultation, we'll determine if this treatment is right for your specific concerns and skin condition."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* Booking Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
            Experience the <span className="text-primary">Collagen Regeneration</span> Difference
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Book your consultation today to learn how our collagen regeneration treatment can help you achieve firmer, more youthful-looking skin.
          </p>
          <div className="mt-10">
            <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90">
              Book Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 
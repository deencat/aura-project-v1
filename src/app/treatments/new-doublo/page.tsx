"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import PlaceholderImage from '@/components/PlaceholderImage'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import type { CarouselApi } from "@/components/ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function NewDoubloPage() {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = 3

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
                New Doublo™ <span className="text-primary">Patented, World-First SD Synergy Lifting</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">MFU Technology</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">4RF Technology</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">SD Synergy Dotting</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Zero Downtime</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Anti-Aging</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Instantly Tighter, Lifted, and Sculpted—All in One Session
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Time waits for no one, and when the signs of aging show up, you want results—fast! Introducing New Doublo™ from Korea, the world's first device to combine MFU (Micro-Focused Ultrasound) and 4RF (Multi-Polar Radio Frequency) in its patented SD (Synergy Dotting) technology. This dual-action system precisely targets multiple skin depths, activating collagen and delivering lifting, tightening, and sculpting—all at once.
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
                page="new-doublo"
                section="hero"
                number={1}
                aspectRatio="aspect-[3/4]"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Description */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Why Choose <span className="text-primary">New Doublo™</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Experience the cutting-edge technology that delivers exceptional results in half the time of traditional treatments
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Double Lifting Power</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  MFU and 4RF work together for double the lifting power, delivering results 25% faster than traditional devices. This innovative combination provides immediate tightening while also stimulating long-term collagen production.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Patented SD Technology</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Patented SD Synergy Dotting technology with triple safety sensors ensures each shot is safe, effective, and takes just 0.2 seconds for visible fullness and lift. The precision targeting means more effective treatment with less discomfort.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Fully Customizable</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Ten specialized cartridges allow for fully customized treatments for every skin type and area—face, neck, eyes, or body, all covered. Each session is tailored to your specific needs and goals for optimal results.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Zero Downtime</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Non-invasive, zero downtime—enjoy instant results and return to your daily life immediately. Unlike surgical procedures, New Doublo™ provides visible improvements without recovery time or visible side effects.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <div className="w-full max-w-3xl rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-square relative">
                  <PlaceholderImage 
                    page="new-doublo"
                    section="device"
                    number={1}
                    aspectRatio="aspect-square"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div className="aspect-square relative">
                  <PlaceholderImage 
                    page="new-doublo"
                    section="device"
                    number={2}
                    aspectRatio="aspect-square"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Ergonomic Design</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Slim, flexible handpieces fit every facial curve, providing dense, even coverage for natural, long-lasting effects. The advanced design ensures comfort during treatment and allows practitioners to reach even difficult areas with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Candidates Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Who is <span className="text-primary">New Doublo™</span> Perfect For?
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              The ideal solution for anyone seeking natural-looking facial rejuvenation without surgery
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Facial Sagging Concerns</h3>
              <p className="text-gray-600">
                Those noticing facial, eye, or neck sagging and want sharper contours for a more youthful appearance
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h8"></path><path d="M4 18h12"></path><path d="M4 6h16"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Fine Lines & Wrinkles</h3>
              <p className="text-gray-600">
                Anyone troubled by jowls, double chin, fine lines, or wrinkles who wants a smoother, more defined profile
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Preventative Care</h3>
              <p className="text-gray-600">
                Anyone over 25 looking to prevent collagen loss and slow aging before more significant changes occur
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Neck & Body Concerns</h3>
              <p className="text-gray-600">
                Those wanting to improve neck lines, body contours, or skin texture for a more polished overall appearance
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Busy Lifestyles</h3>
              <p className="text-gray-600">
                Anyone seeking natural results, pain-free, and with no recovery time that fits into a busy schedule
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">All-in-One Results</h3>
              <p className="text-gray-600">
                Those seeking multiple improvements: lift, tighten, plump, and refine—all in a single treatment session
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Experience <span className="text-primary">Visible Results</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              New Doublo™ not only lifts your contours instantly, but also deeply stimulates collagen, smooths fine lines, and restores youthful radiance. Whether you want a V-shaped face, fuller cheeks, or all-over rejuvenation, New Doublo™ lets you experience the miracle of age reversal in just one session.
            </p>
          </div>

          {/* Photo Gallery */}
          <div className="mt-12 mb-16 mx-auto max-w-4xl">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Carousel 
                className="w-full" 
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {[1, 2, 3].map((num) => (
                    <CarouselItem key={num} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2">
                        <div className="overflow-hidden rounded-lg bg-white">
                          <div className="aspect-square relative">
                            <PlaceholderImage 
                              page="new-doublo"
                              section="results"
                              number={num}
                              aspectRatio="aspect-square"
                              className="object-cover w-full h-full transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Before & After", "V-Shape Lifting", "Skin Tightening"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "See the remarkable transformation after treatment",
                                "Achieve a sculpted V-shaped facial profile",
                                "Experience tighter, more youthful skin texture"
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
                    How does New Doublo™ technology work?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    New Doublo™ combines two powerful technologies: MFU (Micro-Focused Ultrasound) and 4RF (Multi-Polar Radio Frequency). The MFU delivers precise energy deep into the skin's structural layers to trigger collagen production, while the 4RF technology heats the surface layers for immediate tightening. The patented SD (Synergy Dotting) technology ensures even, safe delivery across all treatment areas.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How long does a New Doublo™ treatment take?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    A typical full-face treatment takes approximately 30-45 minutes, while specific targeted areas may require only 15-20 minutes. This is about 25% faster than traditional treatments due to the dual-action technology. The rapid 0.2-second application time per shot also contributes to the efficiency of the procedure.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    Is the New Doublo™ treatment painful?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Most clients report minimal discomfort during the procedure. You may experience a brief warming sensation or slight tingling as the energy is delivered, but the treatment is generally well-tolerated. Our technicians can adjust the energy levels to ensure your comfort throughout the session.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    When will I see results, and how long do they last?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Many clients notice immediate lifting and tightening effects after a single session. However, the full results develop over 2-3 months as collagen regeneration continues. Results typically last 12-18 months, depending on your skin condition and aging process. Maintenance treatments every 12 months can help sustain the rejuvenating effects.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How many treatments will I need?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Most clients achieve significant improvement with just one treatment. However, those with more advanced signs of aging may benefit from a series of 2-3 sessions spaced 4-6 weeks apart. During your consultation, we'll assess your specific needs and recommend a personalized treatment plan for optimal results.
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
            Ready for <span className="text-primary">Instant Rejuvenation</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience the revolutionary New Doublo™ technology and discover how this innovative dual-action treatment can transform your skin with immediate lifting, tightening, and sculpting results—all in a single session with zero downtime.
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
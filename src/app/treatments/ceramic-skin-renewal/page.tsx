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
                Signature Ceramic Skin <span className="text-primary">Renewal Treatment</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Silky Smooth Skin</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Radiant Renewal</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Reinforced Skin Barrier</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Flawless Complexion</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Our Signature Ceramic Skin Renewal Treatment is an exclusive innovation, uniquely developed in our clinic with a patented resurfacing technology and a proprietary active essence formula—truly one of a kind in the market.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Specially designed for those who pursue the ultimate flawless skin, this treatment gently dissolves aged keratin while deeply activating the skin's self-repairing abilities, thoroughly removing impurities from deep within for an instantly purified and luminous complexion.
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
                page="ceramic-skin-renewal"
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
              Signature Ceramic Skin Renewal: <span className="text-primary">Exclusive Innovation</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Unlike any other, our treatment not only balances oil and moisture levels but also rebuilds and fortifies the skin barrier from within, fundamentally improving skin quality. Our unique repairing formula effectively fades blemishes, refines pores, and reduces imperfections, restoring your skin's smoothness and unveiling an unprecedented healthy glow.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Experience this exclusive treatment only at our clinic—witness the miracle of signature ceramic skin renewal, regain flawless confidence, and discover the new gold standard in ultimate beauty that's available nowhere else!
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Patented Resurfacing Technology</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our exclusive patented technology gently yet effectively resurfaces the skin without causing irritation or downtime. This innovative approach sets our treatment apart from conventional methods, delivering superior results while maintaining the integrity of your skin's delicate structure.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Advanced Keratin Dissolution</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our treatment targets and gently dissolves aged keratin that dulls your complexion. By selectively removing this layer of buildup, we reveal the fresh, vibrant skin beneath while simultaneously activating your skin's natural self-repairing mechanisms for renewal from within.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Deep Barrier Reinforcement</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Unlike other treatments that focus only on surface improvements, our signature approach rebuilds and fortifies your skin's protective barrier from within. This fundamental strengthening process improves overall skin quality, enhances resilience against environmental stressors, and ensures long-lasting results.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Proprietary Active Essence</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The heart of our treatment is our proprietary active essence formula, available exclusively at our clinic. This unique blend of powerful ingredients works to fade blemishes, refine pores, balance oil and moisture levels, and fundamentally transform your skin to reveal an unprecedented healthy glow and flawless complexion.
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
              Benefits of <span className="text-primary">Signature Ceramic Skin Renewal</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Experience transformative results with our exclusive patented technology
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
                              page="ceramic-skin-renewal"
                              section="benefits"
                              number={num}
                              aspectRatio="aspect-square"
                              className="object-cover w-full h-full transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Before & After", "Exclusive Technology", "Deep Impurity Removal", "Barrier Reinforcement", "Gold Standard Results"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "Witness the dramatic transformation in skin quality",
                                "Our patented resurfacing technology in action",
                                "Thoroughly removing impurities from deep within",
                                "Rebuilding and fortifying the skin barrier",
                                "The new gold standard in ultimate beauty"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path><path d="M12 12 8 8"></path><path d="M12 16v-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Silky Smooth Texture</h3>
              <p className="text-gray-600">
                Dissolves aged keratin to reveal incredibly smooth, silky-soft skin texture
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44l2.45-5.44H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3.5a2.5 2.5 0 0 0 0-5Z"></path><path d="M16 2a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 1 2.5 2.5v7.5a2.5 2.5 0 0 0 5 0v-7.5A7.5 7.5 0 0 0 16 2Z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Deep Purification</h3>
              <p className="text-gray-600">
                Thoroughly removes impurities from deep within for an instantly purified complexion
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"></path><path d="M13 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Radiant Glow</h3>
              <p className="text-gray-600">
                Unveils an unprecedented healthy glow and luminous radiance that lasts
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Faded Blemishes</h3>
              <p className="text-gray-600">
                Our unique repairing formula effectively fades blemishes and reduces imperfections
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Exclusive Innovation</h3>
              <p className="text-gray-600">
                Experience this patented technology available exclusively at our clinic
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
                    What makes Signature Ceramic Skin Renewal different from other treatments?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Our Signature Ceramic Skin Renewal is truly one-of-a-kind, utilizing exclusive patented technology that's available only at our clinic. Unlike conventional treatments that work on the surface level, our innovative approach dissolves aged keratin, reinforces your skin barrier from within, and activates your skin's natural self-repair mechanisms. The results—silky smooth texture, radiant renewal, and flawless complexion—simply cannot be achieved with standard facial treatments.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How long does the treatment take and how often should I get it?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    The complete Signature Ceramic Skin Renewal treatment takes approximately 60-90 minutes. For optimal results, we recommend an initial series of 3-4 treatments spaced 2-3 weeks apart, followed by maintenance treatments every 4-8 weeks depending on your skin's specific needs. Our specialists will create a personalized treatment plan during your consultation.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    Is there any downtime after the Signature Ceramic Skin Renewal?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    One of the remarkable benefits of our patented technology is that it delivers transformative results with minimal to no downtime. Most clients experience a mild flush immediately after treatment which subsides within hours. Your skin may feel slightly sensitive for 24 hours, but you can return to normal activities immediately. Many clients report their skin looks its absolute best 2-3 days following treatment when the full benefits become visible.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    Is the Signature Ceramic Skin Renewal suitable for all skin types?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Our innovative treatment has been carefully formulated to benefit most skin types, including sensitive skin. The proprietary active essence is gentle yet effective, making it suitable for addressing various skin concerns from uneven texture and dullness to blemishes and weakened barrier. During your consultation, our specialists will assess your skin to confirm this treatment is appropriate for your specific needs and customize it accordingly.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How soon will I see results from the treatment?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Many clients notice immediate improvements in their skin's texture, clarity, and radiance after just one treatment. The silky smooth feeling and luminous glow are often apparent right away. However, the most impressive results develop over the following days as the skin's barrier strengthens and the full effects of the patented resurfacing technology manifest. The transformative benefits continue to improve with each session in your treatment series.
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
            Ready for <span className="text-primary">Signature Ceramic Skin Renewal</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience this exclusive treatment only at our clinic—witness the miracle of signature ceramic skin renewal, regain flawless confidence, and discover the new gold standard in ultimate beauty that's available nowhere else!
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
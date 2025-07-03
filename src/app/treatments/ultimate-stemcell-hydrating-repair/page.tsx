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

export default function UltimateStemcellHydratingRepairPage() {
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
                Ultimate Stemcell <span className="text-primary">Hydrating Repair</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Deep Hydration</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Elasticity Repair</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Radiant Brightening</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                During the dry autumn season, skin often feels tight and dehydrated, leading to issues such as fine lines, dull complexion, puffiness, and sensitivity. The Ultimate Stem Cell Hydrating & Radiance Repair Treatment is specially designed for severely dehydrated, fatigued, and lackluster skin.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Utilizing high-concentration stem cell essence combined with innovative penetration technology, active ingredients are delivered deep into the skin to rapidly replenish moisture, strengthen the skin barrier, and reduce the appearance of fine lines. This treatment also promotes cellular regeneration and repair, improves elasticity, and restores your skin's softness, plumpness, and radiant glow—revealing a youthful, healthy complexion.
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
                category="treatments"
                treatment="ultimate-stemcell-hydrating-repair"
                type="hero"
                alt="Ultimate Stemcell Hydrating Repair Treatment"
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
              Ultimate Stemcell Hydrating Repair: <span className="text-primary">Profound Rejuvenation</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Our Ultimate Stemcell Hydrating Repair treatment utilizes cutting-edge stem cell technology to deliver deep, transformative hydration that revives even the most severely dehydrated and fatigued skin. This comprehensive approach addresses both immediate moisture needs and long-term skin resilience.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              By harnessing the regenerative power of high-concentration plant-derived stem cells, we're able to activate your skin's natural repair mechanisms while simultaneously delivering intense hydration where it's needed most. The result is skin that not only looks more radiant immediately, but becomes healthier, more elastic, and more resistant to future dehydration.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Deep Cellular Hydration</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Our treatment begins by preparing your skin to receive maximum hydration. Using advanced delivery systems, we infuse multiple layers of your skin with a proprietary blend of hyaluronic acid complexes, each designed to target different skin depths. This multi-dimensional approach ensures that hydration reaches both surface layers for immediate relief and deeper tissues for lasting results.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Stem Cell Activation</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The heart of our treatment is a potent stem cell-derived essence that works at the cellular level to revitalize your skin. These powerful biological elements stimulate your skin's own rejuvenation processes, enhancing cellular repair and promoting the formation of new, healthy skin cells. This creates a stronger foundation for maintaining optimal hydration levels and improved elasticity.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Barrier Reinforcement</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Dehydrated skin often suffers from a compromised moisture barrier. Our treatment includes a specialized phase focused on rebuilding and strengthening this crucial protective layer. By restoring the ideal lipid balance and reinforcing cellular connections, we help your skin retain moisture more effectively and protect against environmental stressors that cause dehydration and premature aging.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Radiance Enhancement</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The final phase of our treatment focuses on bringing out your skin's natural radiance. Through gentle exfoliation and the application of illuminating actives, we remove dull surface cells and enhance light reflection for an immediately noticeable glow. This step transforms the appearance of previously dehydrated, lackluster skin, revealing a refreshed, luminous, and youthful complexion.
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
              Benefits of <span className="text-primary">Ultimate Stemcell Hydrating Repair</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Experience transformative hydration with our advanced stem cell technology
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
                              treatment="ultimate-stemcell-hydrating-repair"
                              type="benefits"
                              index={num}
                              alt={["Before & After", "Treatment Process", "Moisture Analysis", "Stem Cell Extraction", "Cellular Renewal"][num-1]}
                              fill
                              className="transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Before & After", "Treatment Process", "Moisture Analysis", "Stem Cell Extraction", "Cellular Renewal"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "See the visible transformation of severely dehydrated skin",
                                "Our multi-phase hydration protocol in action",
                                "Advanced technology to measure skin moisture levels",
                                "How we prepare our potent stem cell formula",
                                "Microscopic view of skin cell regeneration"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Immediate Relief</h3>
              <p className="text-gray-600">
                Experience instant relief from tightness, discomfort, and visible dryness from the first treatment
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path><path d="M12 12 8 8"></path><path d="M12 16v-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Long-lasting Hydration</h3>
              <p className="text-gray-600">
                Our multi-layer approach provides sustained hydration that continues working for days after treatment
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m14.31 8 5.74 9.94"></path><path d="M9.69 8h11.48"></path><path d="m7.38 12 5.74-9.94"></path><path d="M9.69 16 3.95 6.06"></path><path d="M14.31 16H2.83"></path><path d="m16.62 12-5.74 9.94"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Cellular Regeneration</h3>
              <p className="text-gray-600">
                Stem cell technology activates your skin's natural renewal processes for healthier, more resilient cells
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5q9.5-3 13.5 7.5"></path><path d="M9.5 14.5 4 21l6.5-1.5L12 14"></path><path d="M14.5 17.5 21 14l-6.5-1.5L12 7"></path><path d="M21 4.5q-9.5 3-13.5 12"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Enhanced Absorption</h3>
              <p className="text-gray-600">
                Improves your skin's ability to absorb and retain moisture from your daily skincare products
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Fine Line Reduction</h3>
              <p className="text-gray-600">
                Plumps and smooths dehydration lines for a more youthful, refreshed appearance
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4v16"></path><path d="M9 4v16"></path><path d="M14 4v16"></path><path d="M19 4v16"></path><path d="M4 9h16"></path><path d="M4 14h16"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Strengthened Barrier</h3>
              <p className="text-gray-600">
                Restores your skin's natural protective barrier to prevent future moisture loss and damage
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
                <h3 className="text-xl font-bold mb-3">What exactly is the Ultimate Stemcell Hydrating Repair treatment?</h3>
                <p className="text-gray-600">
                  The Ultimate Stemcell Hydrating Repair treatment is specifically designed to address severe skin dehydration, fatigue, and lackluster appearance. It uses high-concentration stem cell essence combined with innovative penetration technology to deliver active ingredients deep into the skin, rapidly replenishing moisture, strengthening the skin barrier, and reducing the appearance of fine lines.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">What are stem cells and how do they help my skin?</h3>
                <p className="text-gray-600">
                  Stem cells are celebrated in regenerative medicine for their ability to repair tissues, promote cell renewal, and combat aging. In our treatment, high-concentration plant-derived stem cells work to accelerate collagen production, improve skin elasticity and texture, reduce inflammation, and provide targeted skin repair. This comprehensive approach delivers a hydrating, rejuvenating effect that transforms dehydrated, fatigued skin.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">How quickly will I see results?</h3>
                <p className="text-gray-600">
                  Most clients experience immediate relief from dryness and tightness after their first session, with visibly plumper, more radiant skin. However, the most significant improvements in skin texture, resilience, elasticity, and long-term hydration develop over the course of 2-3 treatments as the stem cell technology stimulates your skin's natural renewal processes.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">How many treatments will I need?</h3>
                <p className="text-gray-600">
                  For optimal results, we typically recommend a series of 4-6 treatments spaced about 1-2 weeks apart, depending on your skin's condition. This allows for progressive improvement and deeper cellular transformation. After completing the initial series, monthly maintenance treatments can help sustain your results, especially during seasons that typically cause skin dehydration.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Is there any downtime after the treatment?</h3>
                <p className="text-gray-600">
                  There is no downtime with our Ultimate Stemcell Hydrating Repair treatment. You may experience a slight flushing immediately after the treatment due to increased circulation, but this typically subsides within an hour. Your skin will feel hydrated and comfortable, and you can resume your normal activities and apply makeup immediately if desired.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">How can I maintain my results at home?</h3>
                <p className="text-gray-600">
                  To extend and enhance your results, we'll recommend a personalized home care regimen focusing on gentle cleansing, hydrating serums, moisturizers appropriate for your skin type, and consistent sun protection. Daily hydration, a balanced diet rich in antioxidants, and limiting exposure to harsh environmental conditions will also help maintain your skin's newfound moisture balance and radiance.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Is this treatment suitable for all skin types?</h3>
                <p className="text-gray-600">
                  Yes, the Ultimate Stemcell Hydrating Repair treatment is suitable for all skin types experiencing dehydration, fatigue, or dullness, including sensitive skin. Our specialized formulations are designed to address these concerns without causing irritation or overwhelming the skin. During your consultation, we'll assess your specific needs and customize the treatment accordingly to ensure optimal results for your unique skin condition.
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
            Ready for <span className="text-primary">Ultimate Stemcell Hydrating Repair</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience the transformative power of deep hydration and cellular regeneration with our advanced stem cell technology at Aura Beauty. Book your treatment today and restore your skin's youthful radiance.
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
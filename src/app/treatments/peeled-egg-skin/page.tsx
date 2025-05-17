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

export default function PeeledEggSkinPage() {
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
                Peeled Egg Skin <span className="text-primary">Treatment</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Silky Smooth</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Deep Cleansing</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Radiant Firmness</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Gentle Care</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Is your skin feeling rough, dull, or burdened by excess dead skin, making it hard for skincare products to absorb? Traditional extraction may remove pore impurities, but it often risks damaging your skin.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Our "Peeled Egg Skin Treatment" uses advanced Korean ultrasonic pulse technology to deeply cleanse pores, thoroughly removing hidden impurities and old keratin. Combined with our professional beauticians' exclusive massage techniques, this treatment promotes facial lymphatic circulation, helping to drain excess water and toxins.
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
                treatment="peeled-egg-skin"
                type="hero"
                alt="Peeled Egg Skin Treatment"
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
              Peeled Egg Skin Treatment: <span className="text-primary">Skin Care Quartet</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              According to your skin's condition, we carefully select potent serums to infuse multiple nutrients deep into the skin, providing comprehensive repair and leaving your complexion as smooth, delicate, and flawless as a freshly peeled egg!
            </p>
            <p className="mt-4 text-lg text-gray-600">
              With just one session, you can address multiple skin concerns at once. From deep cleansing, detoxification, and firming to intensive serum infusion, enjoy four benefits in one treatment and instantly reveal your silky, radiant, "peeled egg" skin!
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Silky Smooth Texture</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The core goal of our Peeled Egg Skin treatment is to transform your skin texture. Through specialized brightening essences, your skin tone becomes more even and radiant, with a dewy glow that others will envy. The treatment makes your skin softer and more vibrant, radiating with a healthy, youthful appearance.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Deep Cleansing Purification</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Using ultrasonic pulse vibration technology, we deeply cleanse your pores, thoroughly removing hidden impurities, old keratin, and dead skin cells that regular cleansing and makeup removal can't reach. This thorough purification not only leaves your skin refreshed but also enhances the absorption of skincare products.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Radiant Firmness</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The third step of our Peeled Egg Skin treatment focuses on enhancing skin radiance and firmness. Our beauticians' exclusive massage techniques promote facial lymphatic circulation, helping to drain excess water and toxins. Premium essences are carefully selected to make your skin appear more youthful and elastic, restoring its natural glow.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Gentle Nourishment</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The final step is gentle nourishment, which provides essential hydration and protection for your skin. According to your skin's condition, we carefully select potent serums to infuse multiple nutrients deep into the skin, providing comprehensive repair and ensuring it stays constantly hydrated, soft, and healthy.
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
              Benefits of <span className="text-primary">Peeled Egg Skin</span> Treatment
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Experience transformative results with our advanced skincare treatment
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
                              treatment="peeled-egg-skin"
                              type="benefits"
                              index={num}
                              alt={["Before & After", "Treatment Process", "Skin Transformation", "Client Results", "Application Technique"][num-1]}
                              className="transition duration-500 hover:scale-110"
                              fill
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {["Before & After", "Treatment Process", "Skin Transformation", "Client Results", "Application Technique"][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                "See the dramatic difference in skin texture and clarity",
                                "Advanced ultrasonic technology in action",
                                "Watch skin become smoother and more radiant",
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
              <h3 className="text-xl font-bold mb-4">Thorough Cleansing</h3>
              <p className="text-gray-600">
                Removes all impurities from your pores that regular cleansing cannot reach, preventing acne and skin problems
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 18 6-6-6-6"/><path d="m18 6-6 6 6 6"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Enhanced Absorption</h3>
              <p className="text-gray-600">
                Improves your skin's ability to absorb skincare products, maximizing their effectiveness and value
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Radiant Complexion</h3>
              <p className="text-gray-600">
                Reveals brighter, more even-toned skin with a natural glow that looks healthy and youthful
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M12 16h3.5a3.5 3.5 0 1 1 0 7H12v-7z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Improved Texture</h3>
              <p className="text-gray-600">
                Transforms rough, uneven skin into a smooth, touchably soft surface resembling the texture of a freshly peeled egg
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Personalized Care</h3>
              <p className="text-gray-600">
                Treatment is customized to your specific skin condition and concerns for optimal results
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2"/><path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/><path d="M21 15a3 3 0 0 0-3-3"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Long-lasting Results</h3>
              <p className="text-gray-600">
                Enjoy the benefits of your treatment for weeks with proper home care and maintenance
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
                <h3 className="text-xl font-bold mb-3">Is the Peeled Egg Skin treatment suitable for all skin types?</h3>
                <p className="text-gray-600">
                  Yes, our Peeled Egg Skin treatment is suitable for all skin types. Our aestheticians will customize the treatment based on your specific skin condition and concerns to ensure optimal results.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Will the treatment cause any discomfort?</h3>
                <p className="text-gray-600">
                  The Peeled Egg Skin treatment is generally comfortable and relaxing. The ultrasonic technology used is gentle on the skin, and most clients find the experience pleasant. Our aestheticians prioritize your comfort throughout the treatment.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">How long does a typical Peeled Egg Skin treatment session take?</h3>
                <p className="text-gray-600">
                  A complete Peeled Egg Skin treatment typically takes 60-90 minutes, depending on your specific skin condition and any additional services selected.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Is there any downtime after the treatment?</h3>
                <p className="text-gray-600">
                  There is no downtime after the Peeled Egg Skin treatment. You can immediately return to your daily activities with a refreshed, glowing complexion. Some clients may experience slight redness which typically subsides within an hour.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">How soon will I see results from the Peeled Egg Skin treatment?</h3>
                <p className="text-gray-600">
                  Most clients notice immediate improvements in skin texture, clarity, and radiance after just one session. For optimal and long-lasting results, we recommend a series of treatments spaced 3-4 weeks apart.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">How often should I receive the Peeled Egg Skin treatment for best results?</h3>
                <p className="text-gray-600">
                  For optimal results, we recommend receiving the Peeled Egg Skin treatment every 3-4 weeks. Your skin is constantly exposed to environmental damage from sunlight and pollution, so regular treatments help maintain your skin's health and appearance.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Does the treatment include facial massage?</h3>
                <p className="text-gray-600">
                  Yes, our Peeled Egg Skin treatment includes professional facial massage techniques that help stimulate blood circulation and enhance the absorption of treatment essences.
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
            Ready for <span className="text-primary">Peeled Egg Skin</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience the transformative Peeled Egg Skin treatment at Aura Beauty. Book your appointment today and take the first step toward flawless, radiant skin.
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
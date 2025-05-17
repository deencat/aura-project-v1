"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TreatmentImage from '@/components/TreatmentImage'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function RadiantDefenseSynergyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                Radiant Defense Synergy Treatment: <span className="text-primary">Joint Benefits of Resveratrol & Immune Probiotics</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Resveratrol</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Probiotics</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Antioxidant</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Anti-Aging</span>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">Skin Immunity</span>
              </div>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Discover a new era of skincare with the powerful synergy of Resveratrol and Immune Probiotics. This innovative combination works on multiple levels to purify, renew, and defend your skin, revealing a naturally radiant and resilient complexion.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Resveratrol works to instantly purify and refresh your skin's foundation, while the probiotic formula strengthens your skin's natural defense system, combating dullness, fine lines, and other imperfections. This powerful antioxidant combination fights free radicals, creating a luminous, lit-from-within glow.
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
                treatment="radiant-defense-synergy"
                type="hero"
                alt="Radiant Defense Synergy Treatment"
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
              Key Joint <span className="text-primary">Benefits</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Our treatment harnesses the synergistic power of Resveratrol and Immune Probiotics to provide comprehensive skincare benefits that work on multiple levels for transformative results.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Deep Purification & Renewal</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Resveratrol, a potent natural polyphenol, delivers instant skin clarity by removing impurities and promoting cellular renewal. It helps even out skin tone, smooth roughness, and enhances absorption for optimal results.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Strengthened Skin Immunity</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Immune Probiotics, including advanced strains of beneficial bacteria, reinforce the skin's natural barrier. This helps balance the skin's micro-ecosystem, boost self-defense against environmental aggressors, and reduce sensitivity.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Antioxidant & Anti-Aging Power</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Both Resveratrol and Probiotics provide robust antioxidant protection, neutralizing free radicals and slowing the aging process. Together, they help diminish fine lines, improve elasticity, and maintain youthful vitality.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Soothing & Repairing</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  The combined action soothes irritation and redness, repairs environmental damage, and supports skin recovery from daily stressors. This leads to a calmer, more balanced complexion that can better defend against future challenges.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-1 gap-8">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Key Ingredients</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li><span className="font-medium">Resveratrol:</span> Potent natural polyphenol with antioxidant properties</li>
                  <li><span className="font-medium">Probiotics:</span> Lactobacillus, Bifidobacterium, and other beneficial bacteria</li>
                  <li><span className="font-medium">Gluconolactone/Glycolic Acid:</span> For gentle exfoliation and renewal</li>
                  <li><span className="font-medium">Melatonin:</span> Supports overnight skin repair and regeneration</li>
                  <li><span className="font-medium">Antioxidant & Defense Complexes:</span> Additional protection against environmental stressors</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-t-lg p-6">
                <h3 className="text-2xl font-bold text-primary">Who Is It For?</h3>
              </div>
              <div className="bg-gray-50 rounded-b-lg p-6 flex-1">
                <p className="text-gray-600">
                  Ideal for anyone seeking to improve skin texture, enhance defense against aging and environmental stress, and achieve a naturally glowing, flawless look. This treatment is suitable for all skin types, including sensitive and mature skin, as well as those concerned with early signs of aging or dealing with environmental damage.
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
              Benefits of <span className="text-primary">Radiant Defense Synergy</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Experience transformative results with our advanced skincare technology
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Instant Purification</h3>
              <p className="text-gray-600">
                Immediate removal of dead skin cells and impurities for a cleaner, clearer complexion
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M22 12h-4"></path><path d="M6 12H2"></path><path d="M12 6V2"></path><path d="M12 22v-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Enhanced Protection</h3>
              <p className="text-gray-600">
                Strengthened skin barrier function to defend against environmental aggressors
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6c0 2-2 4-4 4s-4-2-4-4 2-4 4-4 4 2 4 4z"></path><path d="M18 15v3m-3-3v3m-3-3v3m-3-3v3"></path><path d="M18 22H3a2 2 0 0 1-2-2V10h19.5"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Radiant, Dewy Glow</h3>
              <p className="text-gray-600">
                A lit-from-within radiance that gives your skin a luminous, supple, and healthy appearance
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h1"></path><path d="M6 12h1"></path><path d="M10 12h1"></path><path d="M14 12h1"></path><path d="M18 12h1"></path><path d="M22 12h1"></path><path d="M12 2v1"></path><path d="M12 6v1"></path><path d="M12 10v1"></path><path d="M12 14v1"></path><path d="M12 18v1"></path><path d="M12 22v1"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Minimized Imperfections</h3>
              <p className="text-gray-600">
                Reduced appearance of fine lines, uneven texture, and dullness
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">All Skin Types</h3>
              <p className="text-gray-600">
                Gentle yet effective for all skin types, including sensitive, rosacea-prone, and acne-prone skin
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21h10"></path><rect width="20" height="14" x="2" y="3" rx="2"></rect></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">No-Makeup Confidence</h3>
              <p className="text-gray-600">
                Skin so flawless you'll feel confident going makeup-free
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
                    Is the Radiant Defense Synergy Treatment suitable for all skin types?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, our treatment is suitable for all skin types, including sensitive skin, rosacea-prone skin, enlarged pores, dull or dry skin, flaking, itching, and damaged skin. The gentle yet effective formula is designed to address multiple concerns while respecting even the most delicate skin barriers.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    What immediate results can I expect after the treatment?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Immediately after treatment, you'll notice removal of dead skin cells, refined pores, brightened skin tone, and an overall illuminated appearance with a beautiful lit-from-within glow. Your skin will feel smoother, look clearer, and have a natural radiance that mimics professional lighting.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How do Resveratrol and Probiotics work together to benefit my skin?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Resveratrol works as a potent antioxidant to purify and renew your skin, while Probiotics strengthen your skin's natural defense mechanisms at the foundational level. Together, they create a synergistic effect that not only protects against environmental damage but also enhances your skin's natural ability to repair and rejuvenate itself, resulting in a healthier, more resilient complexion.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    How often should I receive this treatment for optimal results?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    For optimal results, we recommend an initial series of 4-6 treatments spaced 2-3 weeks apart, followed by monthly maintenance treatments. However, many clients see significant improvement after just one session. Your specific treatment plan will be customized based on your skin's unique needs and concerns during your consultation.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-medium">
                    Is there any downtime after the treatment?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    There is no downtime associated with our Radiant Defense Synergy Treatment. You can immediately resume your normal activities, and many clients choose to have this treatment before special events for an instant glow. Your skin may appear slightly flushed immediately after treatment, but this typically subsides within 30-60 minutes, leaving behind only the beautiful radiance.
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
            Ready for <span className="text-primary">Naturally Flawless Skin</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience our revolutionary Radiant Defense Synergy Treatment and discover how the powerful combination of Resveratrol and Immune Probiotics can transform your skin with deep purification, enhanced protection, and a natural, healthy glow.
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
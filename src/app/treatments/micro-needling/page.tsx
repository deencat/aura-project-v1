"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import TreatmentImage from '@/components/TreatmentImage'

export default function MicroNeedlingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Micro <span className="text-primary">Needling</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
                Unlock radiant skin with our advanced micro-needling treatment, stimulating natural collagen production for smoother, more youthful skin.
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Skin Rejuvenation</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Collagen Induction</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Acne Scars</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Fine Lines</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Uneven Texture</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Enlarged Pores</span>
                </div>
              </div>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90">
                    Book Treatment
                  </Button>
                </Link>
                <Button variant="outline" className="rounded-full border-primary px-8 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg">
                <TreatmentImage 
                  category="facial-treatments"
                  treatment="micro-needling"
                  type="hero"
                  alt="Micro Needling Treatment"
                  fill
                  className="object-cover"
                  priority
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
              Advanced <span className="text-primary">Skin Rejuvenation</span>
            </h2>
            
            <div className="mt-8 space-y-6 text-gray-700">
              <p>
                Micro-needling, also known as collagen induction therapy, is a minimally invasive procedure that uses fine needles 
                to create thousands of microscopic punctures in the top layer of your skin, triggering your body's natural wound healing process.
              </p>
              
              <p>
                This controlled skin injury stimulates the production of collagen and elastin, the two proteins responsible 
                for your skin's structure, strength, and elasticity. The result is smoother, firmer, more toned skin.
              </p>
              
              <p>
                Our advanced micro-needling treatments can be customized to address a variety of skin concerns, including 
                fine lines, wrinkles, acne scars, uneven skin texture, enlarged pores, and hyperpigmentation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl text-center">
              Treatment <span className="text-primary">Benefits</span>
            </h2>
            <p className="mt-4 text-center text-gray-600">
              Experience the transformative effects of micro-needling
            </p>
            
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.3 18a7 7 0 1 1 13.4 0"/><circle cx="12" cy="9" r="7"/><circle cx="12" cy="9" r="3"/><path d="M7 18h10"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Reduced Acne Scarring</h3>
                <p className="text-gray-600">
                  Breaks down scar tissue and stimulates new collagen formation, significantly improving the appearance of acne scars.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Minimized Fine Lines</h3>
                <p className="text-gray-600">
                  Promotes collagen production to smooth fine lines and wrinkles, especially around the eyes, mouth, and forehead.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Even Skin Tone</h3>
                <p className="text-gray-600">
                  Reduces hyperpigmentation, sun spots, and melasma by stimulating cell turnover and encouraging even melanin distribution.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Enhanced Product Absorption</h3>
                <p className="text-gray-600">
                  Creates microchannels in the skin that allow for better penetration and effectiveness of skincare products.
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
              The <span className="text-primary">Treatment Process</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Our professional micro-needling approach
            </p>
          </div>
          
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="relative aspect-[16/9] w-full mb-12 overflow-hidden rounded-lg">
              <TreatmentImage 
                category="facial-treatments"
                treatment="micro-needling"
                type="how-it-works"
                index={1}
                alt="Micro Needling Treatment Process"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-12">
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <span>1</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Consultation & Preparation</h3>
                  <p className="text-gray-600">
                    We begin with a thorough skin assessment and customized treatment plan. Your skin is cleansed and a topical numbing cream is applied for comfort.
                  </p>
                </div>
                
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <span>2</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Micro-Needling Procedure</h3>
                  <p className="text-gray-600">
                    Using a professional-grade device, we create thousands of microscopic channels in your skin, adjusting needle depth based on treatment area and concerns.
                  </p>
                </div>
              </div>
              
              <div className="space-y-12">
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <span>3</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Serums Application</h3>
                  <p className="text-gray-600">
                    Therapeutic serums containing growth factors, peptides, or hyaluronic acid are applied, deeply penetrating through the microchannels for enhanced results.
                  </p>
                </div>
                
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <span>4</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Recovery & Results</h3>
                  <p className="text-gray-600">
                    A soothing mask is applied to calm the skin. You'll notice immediate plumpness, with continued improvement over 4-6 weeks as collagen production increases.
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
              Micro-needling can effectively treat various areas of the body
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="8" r="6"/><path d="M15.5 14h.5a2 2 0 0 1 2 2v2H6v-2a2 2 0 0 1 2-2h.5"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Face</h3>
                <p className="text-sm text-gray-600">
                  Treats acne scars, fine lines, wrinkles, and improves overall skin texture and tone
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
                  Helps tighten loose skin and reduce fine lines and crepiness on the neck
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Chest/Décolletage</h3>
                <p className="text-sm text-gray-600">
                  Improves sun damage, uneven pigmentation, and texture issues on the chest area
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
                  Targets age spots, thin skin, and promotes a more youthful appearance of the hands
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 12c0-6-4-9-9-9s-9 3-9 9c0 6 4 9 9 9"/><path d="M9 15c0-6 3-9 9-9s9 3 9 9-3 9-9 9"/><circle cx="12" cy="12" r="1"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Scars</h3>
                <p className="text-sm text-gray-600">
                  Effective for reducing the appearance of various types of scars, including surgical and acne scars
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M5 7.5C5.82 4.6 8.71 3 12 3s6.18 1.6 7 4.5M5 19.5C5.82 16.6 8.71 15 12 15s6.18 1.6 7 4.5"/><path d="M5 12c0-2.37 3.97-4.5 7-4.5s7 2.13 7 4.5-3.97 4.5-7 4.5-7-2.13-7-4.5Z"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Stretch Marks</h3>
                <p className="text-sm text-gray-600">
                  Helps diminish the appearance of stretch marks on areas like the abdomen and thighs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Treatment <span className="text-primary">Results</span>
            </h2>
            <p className="mt-4 text-gray-600">
              See the transformation with micro-needling
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg">
              <div className="relative aspect-[4/3] w-full">
                <TreatmentImage 
                  category="facial-treatments"
                  treatment="micro-needling"
                  type="results"
                  index={1}
                  alt="Before Micro Needling Treatment"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-primary/80 px-4 py-2 text-white">
                  Before
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg">
              <div className="relative aspect-[4/3] w-full">
                <TreatmentImage 
                  category="facial-treatments"
                  treatment="micro-needling"
                  type="results"
                  index={2}
                  alt="After Micro Needling Treatment"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-primary/80 px-4 py-2 text-white">
                  After
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold md:text-4xl text-center">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            
            <div className="mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-medium">How painful is micro-needling?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Micro-needling is generally well-tolerated with minimal discomfort. We apply a topical numbing cream before treatment, which significantly reduces any sensation. Most clients describe feeling a mild prickling or light pressure during the procedure. Discomfort levels depend on the treatment area and needle depth being used.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-medium">How many treatments will I need?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Most clients see noticeable improvements after just one treatment. However, for optimal results, we typically recommend a series of 3-6 treatments spaced 4-6 weeks apart. The exact number depends on your specific skin concerns and goals. Maintenance treatments are recommended every 6-12 months to sustain results.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-medium">What is the downtime after treatment?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Downtime is minimal with micro-needling. Most clients experience mild redness and slight swelling, similar to a sunburn, which typically subsides within 24-48 hours. Your skin may feel tight and dry for a few days afterward. You can usually return to your normal activities the next day, though we recommend avoiding makeup for 24 hours and intense exercise or sun exposure for 2-3 days.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-medium">When will I see results?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    You'll notice an immediate glow and plumpness to your skin after treatment. However, the most significant improvements appear gradually as collagen production increases. Noticeable enhancements in skin texture and firmness typically develop within 2-4 weeks after treatment, with continued improvement for up to 6 months as collagen remodeling occurs.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-medium">Is micro-needling safe for all skin types?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, micro-needling is generally safe for all skin types and colors, including darker skin tones. Unlike some laser treatments, it doesn't target melanin, so there's minimal risk of hyperpigmentation. However, the treatment may not be suitable for those with active skin infections, acne breakouts, keloid scarring, or certain skin conditions. A consultation will determine if you're an appropriate candidate.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ready for <span className="text-primary">Rejuvenated Skin</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Experience the transformative power of micro-needling at Aura Beauty. Book your consultation today and take the first step toward smoother, more youthful skin.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button className="rounded-full bg-primary px-8 py-3 text-white hover:bg-primary/90">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
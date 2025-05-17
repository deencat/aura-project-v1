import React from 'react'
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
                  treatment="micro-needling"
                  type="hero"
                  alt="Micro-Needling Treatment"
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
          
          <div className="mx-auto mt-16 max-w-4xl">
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
                  question: "Is micro-needling painful?",
                  answer: "Most clients experience minimal discomfort during treatment. We apply a topical numbing cream before the procedure, which significantly reduces any sensation. Clients typically describe the feeling as a mild tingling or vibrating sensation."
                },
                {
                  question: "How many treatments will I need?",
                  answer: "The number of treatments depends on your specific skin concerns. For general skin rejuvenation, a series of 3-4 treatments spaced 4-6 weeks apart is typically recommended. For acne scars or more significant concerns, 6 or more sessions may be needed for optimal results."
                },
                {
                  question: "What is the downtime after micro-needling?",
                  answer: "Downtime is minimal. Most clients experience mild redness and sensitivity for 24-48 hours, similar to a mild sunburn. Some may also experience slight swelling or dryness. Most people can return to normal activities and wear makeup within 24-48 hours after treatment."
                },
                {
                  question: "When will I see results?",
                  answer: "Many clients notice an immediate 'glow' and plumpness to their skin following treatment. However, the most significant results appear gradually over 4-6 weeks as collagen production increases. Final results from a series of treatments can last up to a year or longer."
                },
                {
                  question: "Who is not a good candidate for micro-needling?",
                  answer: "Micro-needling is not recommended for people with active skin infections, acne breakouts, keloid scarring, or certain skin conditions like psoriasis or eczema in the treatment area. It's also not suitable for pregnant women or those taking certain medications. A consultation will determine if you're a good candidate."
                },
                {
                  question: "Can micro-needling be combined with other treatments?",
                  answer: "Yes, micro-needling works well with many other treatments. It can be combined with PRP (platelet-rich plasma) therapy, specialized serums, LED light therapy, or chemical peels for enhanced results. Our specialists can recommend the best combination for your specific skin concerns."
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
            Ready for <span className="text-primary">Transformative Results</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Book your micro-needling consultation today and take the first step toward healthier, more radiant skin.
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
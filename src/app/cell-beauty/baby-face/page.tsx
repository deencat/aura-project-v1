import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import TreatmentImage from '@/components/TreatmentImage'
import Link from 'next/link'

export default function BabyFacePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Baby Face <span className="text-primary">Contouring</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
                Sculpt and define facial contours while maintaining a youthful, baby-like appearance with our advanced contouring technology.
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Non-Invasive</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Natural Results</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Youthful Contours</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Face Lifting</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Skin Tightening</span>
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
                  treatment="baby-face"
                  type="hero"
                  alt="Baby Face Contouring Treatment"
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
              Achieve Perfect <span className="text-primary">Facial Harmony</span>
            </h2>
            
            <div className="mt-8 space-y-6 text-gray-700">
              <p>
                Our Baby Face Contouring treatment is designed to enhance your natural beauty while 
                maintaining the soft, youthful appearance that gives you that coveted "baby face" look. 
                This innovative approach combines advanced technology with artistic precision.
              </p>
              
              <p>
                Unlike traditional contouring methods that can create harsh lines, our technique focuses 
                on subtle enhancement that preserves the natural roundness and softness associated with 
                youthful features. The treatment targets specific areas to create definition while 
                maintaining overall facial harmony.
              </p>
              
              <p>
                Using cutting-edge technology, we can sculpt and lift facial contours without invasive 
                procedures. The treatment stimulates natural collagen production, resulting in tighter, 
                more defined features while preserving the gentle, youthful essence of your appearance.
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
              Technology <span className="text-primary">Advantages</span>
            </h2>
            <p className="mt-4 text-center text-gray-600">
              Advanced techniques for natural-looking facial enhancement
            </p>
            
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18m-9-9v18"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Precision Contouring Technology</h3>
                <p className="text-gray-600">
                  Our advanced contouring system uses precise energy delivery to target specific 
                  areas of the face, creating definition without compromising the natural softness 
                  that characterizes youthful features.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="m12 1 0 6m0 6 0 6m11-7-6 0m-6 0-6 0"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Natural Collagen Stimulation</h3>
                <p className="text-gray-600">
                  The treatment naturally stimulates collagen production in targeted areas, 
                  providing gradual lifting and tightening effects that enhance facial contours 
                  while maintaining a natural appearance.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Customizable Treatment Intensity</h3>
                <p className="text-gray-600">
                  Treatment parameters can be customized based on individual facial structure 
                  and desired outcomes, ensuring optimal results while preserving the unique 
                  characteristics that make each face beautiful.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Progressive Enhancement</h3>
                <p className="text-gray-600">
                  Results develop gradually over time, allowing for natural-looking enhancement 
                  that appears as if you've simply maintained your youthful appearance rather 
                  than having undergone treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              Treatment <span className="text-primary">Process</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Our comprehensive approach ensures natural-looking results
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="relative">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gray-200"></div>
              
              <div className="space-y-12">
                {[
                  {
                    step: '01',
                    title: 'Facial Analysis & Consultation',
                    description: 'Our specialists analyze your facial structure and discuss your aesthetic goals to create a personalized treatment plan.'
                  },
                  {
                    step: '02',
                    title: 'Customized Contouring Map',
                    description: 'We create a detailed facial mapping plan that identifies key areas for enhancement while preserving your natural features.'
                  },
                  {
                    step: '03',
                    title: 'Preparation & Comfort',
                    description: 'Your skin is carefully cleansed and prepared, with comfort measures applied to ensure a pleasant treatment experience.'
                  },
                  {
                    step: '04',
                    title: 'Precision Contouring Application',
                    description: 'Advanced technology is applied to targeted areas with precision, creating subtle definition and lifting effects.'
                  },
                  {
                    step: '05',
                    title: 'Post-Treatment Care',
                    description: 'Soothing serums and protective treatments are applied to optimize results and ensure proper healing.'
                  }
                ].map((item, index) => (
                  <div key={index} className="relative flex gap-8">
                    <div className="flex-none">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                        <span className="text-sm font-medium">{item.step}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results & Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Expected <span className="text-primary">Results</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Experience these transformative benefits while maintaining your youthful appearance
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {[
              'Enhanced facial definition and contours',
              'Natural-looking lifting effects',
              'Improved jawline and cheekbone prominence',
              'Maintained soft, youthful features',
              'Increased skin firmness and elasticity',
              'Subtle yet noticeable facial enhancement',
              'Boosted confidence and self-esteem',
              'Long-lasting natural-looking results'
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <p className="text-sm text-gray-600">{item}</p>
              </div>
            ))}
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
                  question: "Will I still look like myself after the treatment?",
                  answer: "Absolutely! Our Baby Face Contouring is designed to enhance your natural features while preserving your unique facial characteristics. The goal is to create subtle definition, not dramatic changes."
                },
                {
                  question: "How many sessions are typically needed?",
                  answer: "Most clients see noticeable improvement after 3-4 sessions, with optimal results achieved after 5-6 treatments. Sessions are typically spaced 4-6 weeks apart to allow for natural healing and collagen development."
                },
                {
                  question: "Is there any pain or discomfort?",
                  answer: "The treatment is generally comfortable, with most clients describing a mild warming sensation. We use various comfort measures to ensure a pleasant experience throughout the procedure."
                },
                {
                  question: "When will I see results?",
                  answer: "Some immediate tightening may be visible right after treatment, but the most significant results develop gradually over 2-3 months as natural collagen production increases."
                },
                {
                  question: "Can this treatment be combined with other procedures?",
                  answer: "Yes, Baby Face Contouring can be safely combined with other facial treatments for comprehensive rejuvenation. Our specialists will recommend the best combination based on your individual needs."
                },
                {
                  question: "Is there any downtime?",
                  answer: "There is minimal to no downtime. Some clients may experience mild redness or slight swelling for a few hours, but most people can return to their normal activities immediately."
                },
                {
                  question: "Who is a good candidate for this treatment?",
                  answer: "This treatment is ideal for individuals who want to enhance their facial contours while maintaining a youthful appearance. It's suitable for various ages and skin types, particularly those seeking natural-looking enhancement."
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
            Transform Your Look with <span className="text-primary">Baby Face Contouring</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Ready to enhance your natural beauty while maintaining your youthful appearance? Book your consultation today.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
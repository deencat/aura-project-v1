import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import TreatmentImage from '@/components/TreatmentImage'
import Link from 'next/link'

export default function StretchMarkRepairPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Stretch Mark <span className="text-primary">Repair</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
                Revolutionary cellular-level stretch mark repair using advanced regenerative technology to restore smooth, even skin texture.
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Cellular Regeneration</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Collagen Restoration</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Texture Smoothing</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Skin Renewal</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Non-Invasive</span>
                </div>
              </div>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90" data-testid="hero-book-now">
                  Book Treatment
                </Button>
                <Button variant="outline" className="rounded-full border-primary px-8 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div>
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg">
                <TreatmentImage 
                  category="treatments"
                  treatment="stretch-mark"
                  type="hero"
                  alt="Stretch Mark Repair Treatment"
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
              Cellular <span className="text-primary">Regeneration</span> Technology
            </h2>
            
            <div className="mt-8 space-y-6 text-gray-700">
              <p>
                Stretch marks occur when the skin stretches rapidly, causing the collagen and elastin fibers 
                to break down at the cellular level. Traditional treatments only address surface appearance, 
                but our Cell Beauty Stretch Mark Repair works at the deepest cellular level to truly regenerate damaged tissue.
              </p>
              
              <p>
                Using advanced cellular regeneration technology, we stimulate the production of new collagen, 
                elastin, and healthy skin cells. This comprehensive approach repairs the underlying structural 
                damage that causes stretch marks, resulting in smoother, more even-toned skin.
              </p>
              
              <p>
                Our treatment combines multiple modalities including micro-needling with growth factors, 
                radiofrequency energy, and specialized cellular renewal serums to achieve remarkable 
                improvements in stretch mark appearance and skin texture.
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
              Advanced <span className="text-primary">Technology</span>
            </h2>
            <p className="mt-4 text-center text-gray-600">
              Multi-modal approach for comprehensive stretch mark repair
            </p>
            
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6"/><path d="m15.5 8.5 4.24-4.24"/><path d="m4.26 19.74 4.24-4.24"/><path d="m8.5 8.5-4.24-4.24"/><path d="m19.74 19.74-4.24-4.24"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Precision Micro-Needling</h3>
                <p className="text-gray-600">
                  Advanced micro-needling technology creates controlled micro-channels in the skin, 
                  stimulating natural healing responses and allowing for deeper penetration of 
                  regenerative serums directly into the stretch mark tissue.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 22 4-10 4 10"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Radiofrequency Remodeling</h3>
                <p className="text-gray-600">
                  Controlled radiofrequency energy heats the deeper layers of skin, promoting 
                  collagen remodeling and new tissue formation. This helps restructure the 
                  damaged collagen matrix that causes stretch mark appearance.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Growth Factor Infusion</h3>
                <p className="text-gray-600">
                  Specialized growth factor serums containing peptides, stem cell extracts, and 
                  cellular regeneration compounds are delivered deep into the treatment area to 
                  accelerate healing and new tissue formation.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Cellular Regeneration Protocol</h3>
                <p className="text-gray-600">
                  Our proprietary cellular regeneration protocol combines all treatment modalities 
                  in a specific sequence to maximize cellular repair, collagen production, and 
                  overall skin regeneration for optimal results.
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
              Comprehensive cellular repair approach for lasting results
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="relative">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gray-200"></div>
              
              <div className="space-y-12">
                {[
                  {
                    step: '01',
                    title: 'Skin Analysis & Assessment',
                    description: 'Comprehensive evaluation of stretch mark severity, skin type, and treatment area to develop a personalized cellular repair protocol.'
                  },
                  {
                    step: '02',
                    title: 'Preparation & Numbing',
                    description: 'Gentle cleansing and application of topical numbing cream to ensure maximum comfort during the treatment process.'
                  },
                  {
                    step: '03',
                    title: 'Micro-Needling Application',
                    description: 'Precision micro-needling creates controlled micro-channels to stimulate natural healing and prepare for serum infusion.'
                  },
                  {
                    step: '04',
                    title: 'Growth Factor Infusion',
                    description: 'Specialized cellular regeneration serums are applied and driven deep into the tissue using advanced delivery techniques.'
                  },
                  {
                    step: '05',
                    title: 'Radiofrequency Treatment',
                    description: 'Controlled RF energy stimulates deep collagen remodeling and accelerates the cellular repair process.'
                  },
                  {
                    step: '06',
                    title: 'Post-Treatment Care',
                    description: 'Application of healing serums and protective treatments to optimize recovery and enhance results.'
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
              Transformative improvements through cellular regeneration
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {[
              'Significant reduction in stretch mark visibility',
              'Improved skin texture and smoothness',
              'Enhanced collagen and elastin production',
              'More even skin tone and pigmentation',
              'Increased skin firmness and elasticity',
              'Reduced appearance of indented marks',
              'Overall skin rejuvenation and renewal',
              'Long-lasting cellular-level improvements'
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
                  question: "How is this different from other stretch mark treatments?",
                  answer: "Our Cell Beauty approach works at the cellular level to regenerate damaged tissue, not just improve surface appearance. We combine multiple advanced technologies to achieve true structural repair of stretch marks."
                },
                {
                  question: "How many sessions will I need?",
                  answer: "Most clients see significant improvement after 4-6 sessions, with optimal results achieved after 6-8 treatments. The number of sessions depends on the age, severity, and size of the stretch marks."
                },
                {
                  question: "Is the treatment painful?",
                  answer: "We use topical numbing cream to minimize discomfort. Most clients describe the sensation as mild to moderate, similar to a light scratching feeling. The treatment is generally well-tolerated."
                },
                {
                  question: "Can all types of stretch marks be treated?",
                  answer: "Yes, our technology is effective on both new (red/purple) and old (white/silver) stretch marks. Newer stretch marks typically respond faster, but significant improvements can be achieved with older marks as well."
                },
                {
                  question: "When will I see results?",
                  answer: "Initial improvements in skin texture may be visible after 2-3 sessions. More significant changes in stretch mark appearance typically become noticeable after 4-6 sessions, with continued improvement over several months."
                },
                {
                  question: "Is there any downtime?",
                  answer: "Minimal downtime is required. You may experience mild redness and swelling for 24-48 hours. Most clients can return to normal activities immediately, avoiding strenuous exercise for 24 hours."
                },
                {
                  question: "Can this treatment be used on any body area?",
                  answer: "Yes, our stretch mark repair treatment can be safely used on all body areas where stretch marks occur, including the abdomen, thighs, arms, breasts, and buttocks."
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
            Transform Your Skin with <span className="text-primary">Cellular Regeneration</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Ready to experience true stretch mark repair at the cellular level? Book your consultation today.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90" data-testid="final-cta-book-treatment">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
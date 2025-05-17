import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import TreatmentImage from '@/components/TreatmentImage'

export default function RoyalBlackScanPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Royal <span className="text-primary">Black</span> Scan
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
                Advanced technology that targets all types of spots, pigmentation, and skin blemishes with precision.
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Hormonal Spots</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Freckles</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Age Spots</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Liver Spots</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Sun Spots</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Pigmentation</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Comprehensive Treatment</span>
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
                  treatment="royal-black-scan"
                  type="hero"
                  alt="Royal Black Scan Treatment"
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
              Restore <span className="text-primary">Flawless Skin</span>
            </h2>
            
            <div className="mt-8 space-y-6 text-gray-700">
              <p>
                Do you have various spots on your face? Freckles? Liver spots? Hormonal spots? Acne marks? 
                Enlarged pores? It's time to eliminate these concerns and restore perfect skin.
              </p>
              
              <p>
                Spot problems are a major concern for many seeking beauty treatments. These spots can be 
                caused by various factors, including sun exposure, genetics, stress, and aging. Spots on 
                your face can significantly detract from your appearance. If you're pursuing flawless facial 
                skin, our advanced Royal Black Scan treatment offers a highly effective solution.
              </p>
              
              <p>
                Using cutting-edge technology, we precisely target and break down all types of spots on your skin. 
                The Royal Black Scan is a non-invasive treatment that effectively reduces and eliminates spots on 
                the skin. Based on advanced scientific technology, it precisely targets spots while protecting 
                surrounding skin.
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
              The Royal Black Scan is today's top technology for solving spot problems
            </p>
            
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="14.31" y1="8" x2="20.05" y2="17.94"/><line x1="9.69" y1="8" x2="21.17" y2="8"/><line x1="7.38" y1="12" x2="13.12" y2="2.06"/><line x1="9.69" y1="16" x2="3.95" y2="6.06"/><line x1="14.31" y1="16" x2="2.83" y2="16"/><line x1="16.62" y1="12" x2="10.88" y2="21.94"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Advanced Wavelength Technology</h3>
                <p className="text-gray-600">
                  The Royal Black Scan uses precise 1064nm/755nm wavelength technology. These two wavelengths 
                  target different types of pigment spots. The 1064nm wavelength treats stubborn deep pigmentation, 
                  while the 755nm wavelength addresses lighter surface pigmentation.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 22 4-10 4 10"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Optical Principle Application</h3>
                <p className="text-gray-600">
                  The core technology uses advanced optical principles, with the laser beam penetrating 
                  the skin surface in an extremely short time, directly reaching the deep location where 
                  spots form, making the treatment process more effective and rapid.
                </p>
                  </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Targets Various Spot Types</h3>
                <p className="text-gray-600">
                  The technology effectively treats not only black spots but also addresses various types 
                  of spot issues, such as age spots, freckles, and hormonal spots. It also improves overall 
                  skin quality, helping to reduce uneven skin texture and skin laxity.
                </p>
                  </div>
              
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Stimulates Collagen Production</h3>
                <p className="text-gray-600">
                  The technology stimulates collagen production in the deep layer of the skin. When the skin 
                  absorbs the energy, it not only breaks down the melanin deposits but also promotes collagen 
                  regeneration, helping to improve skin elasticity and reduce the signs of aging.
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
              Our comprehensive approach ensures optimal results
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="relative">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gray-200"></div>
              
              <div className="space-y-12">
                {[
                  {
                    step: '01',
                    title: 'Consultation & Skin Analysis',
                    description: 'Our specialists analyze your skin type and condition to identify the specific pigmentation issues.'
                  },
                  {
                    step: '02',
                    title: 'Customized Treatment Plan',
                    description: 'Based on the analysis, we create a personalized treatment protocol targeting your specific needs.'
                  },
                  {
                    step: '03',
                    title: 'Preparation & Protection',
                    description: 'Your skin is carefully cleansed and prepared, with proper protection applied to surrounding areas.'
                  },
                  {
                    step: '04',
                    title: 'Advanced Technology Application',
                    description: 'The Royal Black Scan technology is applied to precisely target and break down the pigmentation.'
                  },
                  {
                    step: '05',
                    title: 'Post-Treatment Care',
                    description: 'Soothing serums and SPF protection are applied to enhance results and protect the treated skin.'
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
              Experience these transformative benefits after your treatment
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {[
              'Significant reduction of various pigmentation spots',
              'More even skin tone and texture',
              'Improved skin clarity and brightness',
              'Diminished freckles and age spots',
              'Reduced appearance of sun damage',
              'Minimized hormonal pigmentation',
              'Increased skin firmness from collagen stimulation',
              'Overall rejuvenated and refreshed appearance'
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
                  question: "How many sessions will I need?",
                  answer: "The number of sessions required varies depending on the type and severity of pigmentation. Most clients see significant improvement after 3-5 sessions, spaced 4-6 weeks apart."
                },
                {
                  question: "Is the treatment painful?",
                  answer: "Most clients describe the sensation as a mild warming or tingling feeling. The treatment is generally well-tolerated, and our technicians can adjust the intensity to ensure your comfort."
                },
                {
                  question: "Is there any downtime?",
                  answer: "The Royal Black Scan treatment has minimal to no downtime. Some clients may experience mild redness for a few hours after treatment, but this typically subsides quickly."
                },
                {
                  question: "Can all skin types be treated?",
                  answer: "Yes, the advanced technology used in our Royal Black Scan is suitable for all skin types. Our technicians will adjust the settings based on your specific skin type and condition."
                },
                {
                  question: "How long do results last?",
                  answer: "Results can be long-lasting, especially with proper skincare and sun protection. However, new pigmentation can develop over time due to aging and sun exposure, so maintenance treatments may be recommended."
                },
                {
                  question: "Can I have this treatment during summer?",
                  answer: "Yes, you can have this treatment year-round, including summer. However, strict sun protection is essential following treatment to prevent new pigmentation from forming."
                },
                {
                  question: "Can treatments be done on body areas too?",
                  answer: "Absolutely! The Royal Black Scan technology can be used not only on the face but also on various body areas where pigmentation issues occur."
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
            Experience the <span className="text-primary">Royal Black Scan</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Ready to transform your skin and eliminate pigmentation concerns? Book your appointment today.
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
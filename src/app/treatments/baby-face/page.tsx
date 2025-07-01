import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import TreatmentImage from '@/components/TreatmentImage'
import Link from 'next/link'

export default function BabyFaceContouringPage() {
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
                Achieve a youthful, naturally contoured appearance with our advanced non-invasive treatment that sculpts and defines facial features while maintaining that coveted baby-smooth complexion.
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Non-Invasive</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Youthful Glow</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Natural Contouring</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Baby-Smooth Skin</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Facial Sculpting</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">No Downtime</span>
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
              Sculpt Your <span className="text-primary">Perfect Baby Face</span>
            </h2>
            
            <div className="mt-8 space-y-6 text-gray-700">
              <p>
                The Baby Face Contouring treatment combines the best of both worlds: the smooth, porcelain-like 
                complexion of baby skin with the defined, sculpted features of professional contouring. This 
                innovative approach uses advanced technology to naturally enhance your facial structure while 
                maintaining that coveted youthful glow.
              </p>
              
              <p>
                Unlike traditional contouring methods or invasive procedures, our Baby Face Contouring treatment 
                works from within the skin layers to create natural-looking definition. The process stimulates 
                collagen production, tightens skin, and subtly reshapes facial contours for a more defined yet 
                naturally youthful appearance.
              </p>
              
              <p>
                This treatment is perfect for those who want to enhance their natural beauty without appearing 
                overdone or artificial. The result is a refreshed, youthful look with beautifully defined 
                features that maintain the soft, smooth quality of baby skin.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Treatment Benefits Carousel */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Treatment <span className="text-primary">Benefits</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Experience the perfect combination of youthful skin and defined features
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <CarouselItem key={num} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <div className="overflow-hidden rounded-lg bg-white">
                        <div className="aspect-square relative">
                          <TreatmentImage 
                            category="treatments"
                            treatment="baby-face"
                            type="benefits"
                            index={num}
                            alt={["Natural Contouring", "Youthful Glow", "Defined Features", "Smooth Texture", "Long-lasting Results"][num-1]}
                            fill
                            className="transition duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-4 text-center">
                          <h4 className="font-bold text-lg text-gray-800 mb-1">
                            {["Natural Contouring", "Youthful Glow", "Defined Features", "Smooth Texture", "Long-lasting Results"][num-1]}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {[
                              "Achieve natural-looking facial definition without harsh lines",
                              "Maintain that coveted baby-smooth, radiant complexion",
                              "Enhanced cheekbones, jawline, and facial structure",
                              "Silky-smooth skin texture that feels like baby skin",
                              "Results that improve over time and last for months"
                            ][num-1]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Our advanced dual-action approach for perfect baby face results
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-none">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <span className="text-sm font-medium">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Skin Analysis & Preparation</h3>
                    <p className="text-gray-600">
                      We analyze your facial structure and skin type to customize the treatment for your unique features and desired outcome.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-none">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <span className="text-sm font-medium">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Contouring Technology</h3>
                    <p className="text-gray-600">
                      Advanced ultrasound technology is applied to target specific areas, naturally enhancing your facial contours and definition.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-none">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <span className="text-sm font-medium">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Skin Smoothing Treatment</h3>
                    <p className="text-gray-600">
                      Specialized serums and techniques are used to achieve that baby-smooth skin texture while maintaining the enhanced contours.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-none">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <span className="text-sm font-medium">4</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Collagen Stimulation</h3>
                    <p className="text-gray-600">
                      The treatment stimulates natural collagen production to ensure long-lasting results and continued improvement over time.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-none">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <span className="text-sm font-medium">5</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Finishing & Protection</h3>
                    <p className="text-gray-600">
                      Hydrating and protective treatments are applied to seal in the results and maintain that perfect baby-smooth finish.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Expected <span className="text-primary">Results</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Transform your appearance with these incredible benefits
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[
              'Naturally enhanced facial contours',
              'Baby-smooth, silky skin texture',
              'Defined cheekbones and jawline',
              'Youthful, radiant complexion',
              'Improved skin elasticity and firmness',
              'Reduced appearance of fine lines',
              'Enhanced natural facial symmetry',
              'Long-lasting contouring effects',
              'No artificial or overdone appearance'
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
                  question: "What makes this different from traditional contouring?",
                  answer: "Unlike makeup contouring or invasive procedures, Baby Face Contouring works from within the skin to create natural-looking definition while maintaining the smooth, soft texture of baby skin. The results are permanent and look completely natural."
                },
                {
                  question: "How long do the results last?",
                  answer: "Results typically last 12-18 months and continue to improve over the first few months after treatment. Many clients see progressive enhancement as collagen production increases."
                },
                {
                  question: "Is there any downtime?",
                  answer: "There is minimal to no downtime with this treatment. Some clients may experience slight redness for a few hours, but you can return to normal activities immediately after treatment."
                },
                {
                  question: "Who is the ideal candidate?",
                  answer: "This treatment is perfect for anyone who wants to enhance their natural features while maintaining a youthful appearance. It's ideal for those seeking subtle definition without looking artificial or overdone."
                },
                {
                  question: "How many sessions will I need?",
                  answer: "Most clients achieve their desired results with 2-3 sessions, spaced 4-6 weeks apart. Your practitioner will create a personalized treatment plan based on your goals and facial structure."
                },
                {
                  question: "Can this be combined with other treatments?",
                  answer: "Yes, Baby Face Contouring can be combined with other facial treatments like our Glow treatment or collagen regeneration therapy for comprehensive skin rejuvenation."
                },
                {
                  question: "What age group is this suitable for?",
                  answer: "This treatment is suitable for adults of all ages who want to enhance their natural features. It's particularly popular among clients in their 20s-40s who want preventative and enhancement treatments."
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
            Get Your Perfect <span className="text-primary">Baby Face</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Ready to achieve naturally defined features with baby-smooth skin? Book your consultation today.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
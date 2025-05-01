import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import PlaceholderImage from '@/components/PlaceholderImage'
import TreatmentImage from '@/components/TreatmentImage'
import { Sparkles, Clock, Check, Star, ShieldCheck, Clock10 } from 'lucide-react'

export default function YouthRevivalPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 py-20">
        <div className="absolute inset-0 bg-gray-900 overflow-hidden">
          <video 
            className="absolute w-full h-full object-cover object-center opacity-80"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/images/treatments/new-doublo/youth-revival/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10" />
        </div>
        
        <div className="container relative mx-auto z-10">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-primary/80 px-4 py-2 text-sm font-medium text-white">
                <Sparkles className="mr-2 h-4 w-4" /> 
                全球首創「零感緊膚」技術
              </div>
              
              <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
                Youth <span className="text-primary">Revival</span>
                <span className="mt-2 block text-2xl font-normal italic text-white">The Next Generation HIFU</span>
              </h1>
              
              <p className="mt-6 text-lg leading-relaxed text-gray-200">
                Say goodbye to painful treatments and hello to immediate results. Our revolutionary New Doublo™ Youth Revival treatment combines MFU and 4RF technologies to deliver instant tightening, lifting and wrinkle reduction without pain or downtime.
              </p>
              
              <div className="mb-8 mt-6">
                <p className="mb-2 text-lg font-semibold text-white">Limited Time Offer:</p>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-primary">HK$1,680</span>
                  <span className="ml-3 text-lg text-gray-300 line-through">HK$2,980</span>
                  <span className="ml-3 rounded-md bg-primary/20 px-2 py-1 text-xs font-bold text-primary">SAVE 43%</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full bg-primary px-8 text-white hover:bg-primary/90">
                    Book Now
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="rounded-full border-primary px-8 text-primary hover:bg-primary hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              {/* This space intentionally left empty to create space for the hero image */}
            </div>
          </div>
        </div>
      </section>

      {/* Key Problems Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Targeting Your <span className="text-primary">Aging Signs</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Those fine lines and wrinkles telling your age story? Our Youth Revival treatment specifically targets the most common signs of aging.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-4 text-xl font-bold">Expression Lines</h3>
              <p className="mb-4 text-gray-600">
                Those "tiger lines" that extend from your nose to the corners of your mouth become especially visible when you smile. Often called "bitterness lines," they can make you look older and more tired than you feel.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-600"><span className="font-medium">Aging type:</span> Loss of collagen and muscle laxity make these lines more pronounced</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-600"><span className="font-medium">Muscle type:</span> Frequent facial expressions cause muscle contractions that create visible lines</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-600"><span className="font-medium">Structural type:</span> Prominent cheekbones and upper jaw can create tension that leads to these lines</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-4 text-xl font-bold">Other Aging Signs</h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Fine Lines & Wrinkles</h4>
                    <p className="text-gray-600">
                      Those first signs of aging appearing around eyes, forehead, and mouth that creams can't completely address.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Skin Laxity</h4>
                    <p className="text-gray-600">
                      The gradual loosening of skin that leads to sagging along the jawline and cheeks, creating a tired appearance.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Loss of Definition</h4>
                    <p className="text-gray-600">
                      Decreased definition in facial contours creating a less sculpted, more aged appearance.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Uneven Texture</h4>
                    <p className="text-gray-600">
                      Rougher skin texture and enlarged pores that make makeup application challenging.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultimate Solution Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              The <span className="text-primary">Ultimate</span> Solution
            </h2>
            <p className="mt-4 text-gray-600">
              New Doublo™ Youth Revival delivers what other treatments can't - remarkable results without the pain.
            </p>
          </div>
          
          <div className="mt-12 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8">
                <h3 className="text-xl font-bold mb-4">Double Technology, Double Results</h3>
                <p className="text-gray-600 mb-6">
                  New Doublo™ Youth Revival reaches the deepest 4.5mm SMAS fascia layer, tightening loose skin, stimulating collagen production, and plumping depressed areas for long-lasting results. Unlike traditional HIFU treatments, our advanced system targets multiple skin layers simultaneously with precise energy delivery.
                </p>
                
                <h4 className="font-bold text-lg mt-8 mb-3">World's First Dual Technology</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-gray-600"><span className="font-medium">"SD Dot Technology":</span> Delivers "semi-circular" energy waves that evenly distribute heat to the epidermis and dermis, tightening loose skin and stimulating collagen. This innovative approach ensures uniform treatment coverage, preventing hotspots while maximizing collagen stimulation.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-gray-600"><span className="font-medium">"FL Linear Technology":</span> Focuses high-intensity ultrasound on precise points, penetrating through to the SMAS fascia layer without damaging surrounding tissue. This patented delivery method reaches 4.5mm deep—30% deeper than standard treatments—while operating at a remarkable 0.2-second pulse rate for comfort.</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mt-6">
                  Our cutting-edge system utilizes 10MHz high-frequency ultrasound combined with 4RF technology, providing immediate visible lifting while stimulating long-term collagen remodeling. The result is a comprehensive rejuvenation that addresses multiple signs of aging in a single, pain-free session.
                </p>
              </div>
              
              <div className="md:w-1/2 bg-gray-100 flex justify-center items-center">
                <div className="p-8 w-full">
                  <div className="w-full rounded-lg overflow-hidden shadow-md">
                    <TreatmentImage 
                      category="new-doublo"
                      treatment="youth-revival"
                      type="technology"
                      index={1}
                      className="w-full h-auto object-contain"
                      alt="Youth Revival Technology"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Three Crucial <span className="text-primary">Questions</span> Answered
            </h2>
            <p className="mt-4 text-gray-600">
              When considering anti-aging treatments, these are the most important concerns our clients have:
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Does It Work?</h3>
              <p className="text-gray-600">
                <span className="font-medium text-primary">Yes!</span> New Doublo™ Youth Revival combines MFU and 4RF technologies for dual-action results: immediate tightening + long-term collagen stimulation. Our clients see visible results after just one session.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Is It Painful?</h3>
              <p className="text-gray-600">
                <span className="font-medium text-primary">Zero Pain!</span> Our patented technology uses high-speed actuators that deliver energy in just 0.2 seconds—25% faster than traditional HIFU treatments. This means you can achieve stunning results without anesthesia or discomfort.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Is It Safe?</h3>
              <p className="text-gray-600">
                <span className="font-medium text-primary">Absolutely!</span> New Doublo™ features patented Triple Safety Technology with contact sensors that prevent overtreatment or accidental energy discharge. The system automatically shuts off when not in contact with skin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Skin Transformation</span>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              Achieve <span className="text-primary">4-in-1</span> Results
            </h2>
            <p className="mt-4 text-gray-600">
              One treatment, four remarkable improvements to your skin's appearance and health.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Lifting Effect</h3>
              <p className="text-gray-600">
                Achieve immediate lifting of sagging skin around the jowls, cheeks, and neck area for a more defined facial contour.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Tightening</h3>
              <p className="text-gray-600">
                Experience noticeable skin tightening that reduces fine lines and wrinkles while improving overall skin firmness.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Plumping</h3>
              <p className="text-gray-600">
                Enjoy restored volume and plumpness as collagen production is stimulated, creating a more youthful, full appearance.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Smoother Texture</h3>
              <p className="text-gray-600">
                Benefit from refined skin texture with reduced pore size, creating a smoother canvas for makeup application.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-6">Double Satisfaction Guarantee</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We're so confident in the results of our Youth Revival treatment that we offer a double guarantee:
                <span className="block mt-4 font-medium">If you don't see visible results after your first session, we'll provide a second treatment at no additional cost.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Real Results</span>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              Before & <span className="text-primary">After</span>
            </h2>
            <p className="mt-4 text-gray-600">
              See the remarkable transformation our clients experience with just one Youth Revival treatment.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Before & After Card 1 */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="relative aspect-[4/3] w-full">
                <div className="w-full h-full">
                  <TreatmentImage 
                    category="new-doublo"
                    treatment="youth-revival"
                    type="before-after"
                    index={1}
                    className="w-full h-full object-cover"
                    alt="Before and After Youth Revival Treatment"
                  />
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold">Jawline Definition & Skin Tightening</h3>
                <p className="mt-2 text-gray-600">Client age: 48 | Single treatment | No downtime</p>
                <p className="mt-3 text-gray-600">
                  "I was amazed by how much definition I gained in my jawline after just one treatment. The sagging is noticeably reduced and my skin looks years younger."
                </p>
              </div>
            </div>
            
            {/* Before & After Card 2 */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="relative aspect-[4/3] w-full">
                <div className="w-full h-full">
                  <TreatmentImage 
                    category="new-doublo"
                    treatment="youth-revival"
                    type="before-after"
                    index={2}
                    className="w-full h-full object-cover"
                    alt="Before and After Youth Revival Treatment"
                  />
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold">Fine Lines & Expression Wrinkle Reduction</h3>
                <p className="mt-2 text-gray-600">Client age: 42 | Single treatment | No downtime</p>
                <p className="mt-3 text-gray-600">
                  "The fine lines around my eyes and mouth are significantly reduced. My skin feels firmer and looks so much smoother. I can't believe this was done without any pain!"
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm italic">Results may vary from person to person. Images are from actual clients who have consented to their use.</p>
            <Link href="/contact">
              <Button variant="outline" className="mt-6 rounded-full border-primary px-8 py-2 text-primary hover:bg-primary hover:text-white">
                Schedule Your Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg md:p-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Sparkles className="mr-2 h-4 w-4" /> 
                  Limited Time Promotion
                </div>
                <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
                  Special <span className="text-primary">First-Time</span> Offer
                </h2>
                <p className="mt-4 text-gray-600">
                  Experience our revolutionary Youth Revival treatment at an exclusive introductory price.
                </p>
                
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Complete Youth Revival treatment (45-60 min)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Personalized skin analysis</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Collagen-boosting serum application</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>LED therapy session for enhanced results</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Customized aftercare routine</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <p className="text-lg font-semibold">Limited Offer Price:</p>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-primary">HK$1,680</span>
                    <span className="ml-3 text-lg text-gray-500 line-through">HK$2,980</span>
                    <span className="ml-3 rounded-md bg-primary/20 px-2 py-1 text-xs font-bold text-primary">SAVE 43%</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    *Offer valid for first-time clients only. Limited spots available.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-4 text-xl font-bold">Book Your Youth Revival Session</h3>
                  <p className="mb-6 text-gray-600">
                    Secure your appointment now to lock in this special pricing. 
                    Free consultation included.
                  </p>
                  <Link href="/contact" className="block w-full">
                    <Button className="w-full rounded-full bg-primary py-6 text-white hover:bg-primary/90">
                      Book Now
                    </Button>
                  </Link>
                  <p className="mt-4 text-center text-sm text-gray-500">
                    Or call: <a href="tel:+85212345678" className="font-medium text-primary">+852 1234 5678</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Learn more about our revolutionary Youth Revival treatment.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-bold">How does New Doublo™ Youth Revival work?</h3>
              <p className="mt-3 text-gray-600">
                New Doublo™ Youth Revival combines two powerful technologies: MFU (Micro-Focused Ultrasound) and 4RF (Multi-Polar Radio Frequency). The MFU delivers precise energy deep into the SMAS fascia layer while 4RF targets the surface layers, providing immediate tightening and long-term collagen stimulation.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-bold">How long does a treatment take?</h3>
              <p className="mt-3 text-gray-600">
                A full facial treatment typically takes 45-60 minutes. Thanks to our high-speed technology, we can deliver 300 treatment pulses in just 5 minutes—25% faster than traditional HIFU treatments.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-bold">Is the treatment really pain-free?</h3>
              <p className="mt-3 text-gray-600">
                Yes! Most clients describe the sensation as a mild warming feeling. Our patented technology delivers energy so quickly that the nerves don't have time to register pain, unlike traditional HIFU treatments that can be quite uncomfortable.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-bold">How soon will I see results?</h3>
              <p className="mt-3 text-gray-600">
                Many clients notice immediate lifting and tightening effects after just one session. The results continue to improve over 2-3 months as collagen production increases. For optimal results, we recommend a series of 3-4 treatments spaced 4-6 weeks apart.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-bold">Is there any downtime?</h3>
              <p className="mt-3 text-gray-600">
                There is no downtime with New Doublo™ Youth Revival. You can immediately return to your normal activities, including applying makeup. Some clients may experience mild redness for 1-2 hours after treatment, but this subsides quickly.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-bold">How long do results last?</h3>
              <p className="mt-3 text-gray-600">
                Results typically last 12-18 months, depending on your skin's condition and aging process. We recommend maintenance treatments every 6-12 months to preserve your youthful appearance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ready To <span className="text-primary">Turn Back Time?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Experience the next generation of pain-free anti-aging technology with our Youth Revival treatment.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button size="lg" className="rounded-full bg-primary px-10 py-6 text-white hover:bg-primary/90">
                Book Your Youth Revival Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
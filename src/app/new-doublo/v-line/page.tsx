import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import PlaceholderImage from '@/components/PlaceholderImage'
import { Sparkles, Clock, Check, Star } from 'lucide-react'
import TreatmentImage from '@/components/TreatmentImage'

export default function VLinePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 py-20">
        <div className="absolute inset-0 bg-gray-900">
          <TreatmentImage
            category="new-doublo"
            treatment="v-line"
            type="hero"
            alt="V-Line Perfection Treatment"
            fill
            className="object-cover object-left opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/10" />
        </div>
        
        <div className="container relative mx-auto z-10">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              {/* This column is intentionally left mostly empty on desktop to avoid covering the face */}
              <div className="hidden md:block" aria-hidden="true">
                {/* Spacer for desktop layout */}
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="mb-4 inline-flex items-center rounded-full bg-primary/80 px-4 py-2 text-sm font-medium text-white">
                <Sparkles className="mr-2 h-4 w-4" /> 
                K-Beauty's Most Wanted Treatment
              </div>
              
              <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
                V-Line <span className="text-primary">Perfection</span>
                <span className="mt-2 block text-2xl font-normal italic text-white">The K-Beauty Jawline Secret</span>
              </h1>
              
              <p className="mt-6 text-lg leading-relaxed text-gray-200">
                Transform your facial contours with the coveted V-shaped jawline seen on 
                K-drama stars and social media influencers. Our non-surgical V-Line 
                treatment sculpts and defines your lower face for a slimmer, more youthful appearance.
              </p>
              
              <div className="mb-8 mt-6">
                <p className="mb-2 text-lg font-semibold text-white">Limited Time Offer:</p>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-primary">HK$1,980</span>
                  <span className="ml-3 text-lg text-gray-300 line-through">HK$2,480</span>
                  <span className="ml-3 rounded-md bg-primary/20 px-2 py-1 text-xs font-bold text-primary">SAVE 20%</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full bg-primary px-8 text-white hover:bg-primary/90">
                    Get Your V-Line
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="rounded-full border-primary px-8 text-primary hover:bg-primary hover:text-white">
                    Learn More
                  </Button>
                </Link>
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
              Why Everyone Wants the <span className="text-primary">V-Line</span>
            </h2>
            <p className="mt-4 text-gray-600">
              The V-shaped jawline is the hallmark of K-beauty and modern facial aesthetics, 
              creating a slimmer, more youthful face shape that's perfect for selfies.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Slimmer Jawline</h3>
              <p className="text-gray-600">
                Reduce the width of your lower face for a more delicate, feminine appearance that's coveted in East Asian beauty standards.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Defined Angles</h3>
              <p className="text-gray-600">
                Create sharper, more photogenic facial angles that enhance your features and eliminate roundness for a striking profile.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"/><path d="m3 3 18 18"/><path d="M10.5 13.5 3 21"/><path d="m21 3-7.5 7.5"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Reduced Double Chin</h3>
              <p className="text-gray-600">
                Minimize the appearance of under-chin fullness for a cleaner profile and more youthful look in all angles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <span className="text-sm font-medium uppercase tracking-wider text-primary">The Technology</span>
              <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
                How V-Line <span className="text-primary">Works</span>
              </h2>
              <p className="mt-4 text-gray-600">
                Our V-Line Perfection treatment uses New Doublo™'s advanced dual-action technology 
                to precisely target and reshape your jawline.
              </p>
              
              <div className="mt-8 space-y-6">
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Targeted Fat Reduction</h3>
                    <p className="text-gray-600">
                      MFU technology breaks down stubborn fat cells along the jawline and under the chin 
                      to create a slimmer lower face profile.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Muscle Toning</h3>
                    <p className="text-gray-600">
                      4RF technology tones and tightens the muscles that define your jawline, 
                      creating sharper angles and more definition.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Skin Tightening</h3>
                    <p className="text-gray-600">
                      Dual-action technology stimulates collagen production to tighten skin along the jawline, 
                      eliminating sagging and creating a more youthful appearance.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Progressive Results</h3>
                    <p className="text-gray-600">
                      While you'll see immediate improvements, results continue to enhance over 2-3 months 
                      as collagen remodeling creates an increasingly defined V-shape.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 relative mx-auto max-w-md">
              <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                <TreatmentImage 
                  category="new-doublo"
                  treatment="v-line"
                  type="how-it-works"
                  index={1}
                  alt="How V-Line Works"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 -right-64 -translate-y-1/2 w-[40rem] rounded-xl bg-white p-6 shadow-lg border border-gray-100">
                <div className="flex flex-col">
                  <h4 className="text-sm uppercase tracking-wider text-primary font-medium mb-4">Client Experiences</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Testimonial */}
                    <div className="mb-4">
                      <div className="mb-2 flex items-center">
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-100 mr-2 flex-shrink-0">
                          <Image
                            src="/images/treatments/avatars/client-1.jpg"
                            alt="Lily C."
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-xs">Lily C.</p>
                          <p className="text-xs text-gray-500">Age 25</p>
                        </div>
                      </div>
                      <div className="mb-1 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs italic text-gray-700">
                        "My jawline has never looked better! Completely changed my selfie game. After just one session, I noticed a visible difference."
                      </p>
                    </div>
                    
                    {/* Second Testimonial */}
                    <div className="mb-4">
                      <div className="mb-2 flex items-center">
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-100 mr-2 flex-shrink-0">
                          <Image
                            src="/images/treatments/avatars/client-2.jpg"
                            alt="Michelle T."
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-xs">Michelle T.</p>
                          <p className="text-xs text-gray-500">Age 32</p>
                        </div>
                      </div>
                      <div className="mb-1 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs italic text-gray-700">
                        "After two children, my jawline disappeared. V-Line sessions brought it back! Comfortable with minimal discomfort."
                      </p>
                    </div>
                    
                    {/* Third Testimonial */}
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-100 mr-2 flex-shrink-0">
                          <Image
                            src="/images/treatments/avatars/client-3.jpg"
                            alt="James K."
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-xs">James K.</p>
                          <p className="text-xs text-gray-500">Age 38</p>
                        </div>
                      </div>
                      <div className="mb-1 flex">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                        <Star className="h-3 w-3 text-gray-300" />
                      </div>
                      <p className="text-xs italic text-gray-700">
                        "As a male client, I was hesitant but wanted to reduce my double chin. Results were subtle yet effective - exactly what I wanted."
                      </p>
                    </div>
                    
                    {/* Fourth Testimonial */}
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-100 mr-2 flex-shrink-0">
                          <Image
                            src="/images/treatments/avatars/client-4.jpg"
                            alt="Sarah Wong"
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-xs">Sarah Wong.</p>
                          <p className="text-xs text-gray-500">Age 29</p>
                        </div>
                      </div>
                      <div className="mb-1 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs italic text-gray-700">
                        "I tried everything for my jawline. V-Line gave me results in weeks that I couldn't achieve in years. Professional and painless."
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-primary font-medium text-center">Verified Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Why Choose Us</span>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              V-Line Perfection vs. <span className="text-primary">Alternatives</span>
            </h2>
            <p className="mt-4 text-gray-600">
              See how our advanced treatment compares to other jawline contouring options.
            </p>
          </div>
          
          <div className="mt-12 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-r border-gray-200 p-4 text-left font-semibold">Feature</th>
                  <th className="border-b border-r border-gray-200 p-4 text-center font-semibold text-primary">
                    V-Line Perfection<br/><span className="text-xs font-normal">(New Doublo™)</span>
                  </th>
                  <th className="border-b border-r border-gray-200 p-4 text-center font-semibold">
                    Injectable Fillers<br/><span className="text-xs font-normal">(Temporary)</span>
                  </th>
                  <th className="border-b border-gray-200 p-4 text-center font-semibold">
                    Surgery<br/><span className="text-xs font-normal">(Invasive)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-r border-gray-200 p-4 font-medium">Recovery Time</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center text-primary">None</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center">1-3 days</td>
                  <td className="border-b border-gray-200 p-4 text-center">2-4 weeks</td>
                </tr>
                <tr>
                  <td className="border-b border-r border-gray-200 p-4 font-medium">Results Duration</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center text-primary">12-18 months</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center">6-12 months</td>
                  <td className="border-b border-gray-200 p-4 text-center">Permanent</td>
                </tr>
                <tr>
                  <td className="border-b border-r border-gray-200 p-4 font-medium">Pain Level</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center text-primary">Minimal</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center">Moderate</td>
                  <td className="border-b border-gray-200 p-4 text-center">High</td>
                </tr>
                <tr>
                  <td className="border-b border-r border-gray-200 p-4 font-medium">Natural Results</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center text-primary">★★★★★</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center">★★★☆☆</td>
                  <td className="border-b border-gray-200 p-4 text-center">★★★★☆</td>
                </tr>
                <tr>
                  <td className="border-r border-gray-200 p-4 font-medium">Safety Profile</td>
                  <td className="border-r border-gray-200 p-4 text-center text-primary">★★★★★</td>
                  <td className="border-r border-gray-200 p-4 text-center">★★★★☆</td>
                  <td className="p-4 text-center">★★★☆☆</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg md:p-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Sparkles className="mr-2 h-4 w-4" /> 
                  Limited Time Promotion
                </div>
                <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
                  K-Beauty <span className="text-primary">Special</span>
                </h2>
                <p className="mt-4 text-gray-600">
                  Transform your jawline with our exclusive V-Line Perfection package and save up to 30%
                </p>
                
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Complete V-Line treatment (45-60 min)</span>
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
                    <span>Complimentary facial massage</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Personalized aftercare routine</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <p className="text-lg font-semibold">Limited Offer Price:</p>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-primary">HK$1,980</span>
                    <span className="ml-3 text-lg text-gray-500 line-through">HK$2,480</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    *Offer valid until [Date]. Limited spots available.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-4 text-xl font-bold">Book Your V-Line Session</h3>
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

      {/* Final CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ready For Your <span className="text-primary">K-Drama</span> Jawline?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Join hundreds of satisfied clients who have achieved their dream V-Line profile with our advanced treatment.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button size="lg" className="rounded-full bg-primary px-10 py-6 text-white hover:bg-primary/90">
                Transform Your Look Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
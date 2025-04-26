import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import PlaceholderImage from '@/components/PlaceholderImage'
import { Sparkles, Clock, Check, Star, ShieldCheck, Zap } from 'lucide-react'

export default function NeckRejuvenationPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 py-20">
        <div className="absolute inset-0 bg-gray-900">
          <Image
            src="/images/backgrounds/new-doublo-hero-3.jpg"
            alt="Neck Rejuvenation Treatment"
            fill
            className="object-cover object-center opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10" />
        </div>
        
        <div className="container relative mx-auto z-10">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-primary/80 px-4 py-2 text-sm font-medium text-white">
                <Sparkles className="mr-2 h-4 w-4" /> 
                #無痛頸部逆齡 (Painless Neck Rejuvenation)
              </div>
              
              <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
                Neck <span className="text-primary">Rejuvenation</span>
                <span className="mt-2 block text-2xl font-normal italic text-white">The Secret To Looking Years Younger</span>
              </h1>
              
              <p className="mt-6 text-lg leading-relaxed text-gray-200">
                Your neck reveals your age before your face does. Our New Doublo™ Neck Rejuvenation targets 
                "tech neck" lines, sagging skin, and wrinkles with painless dual-technology for immediate 
                lifting and long-term tightening without surgery or downtime.
              </p>
              
              <div className="mb-8 mt-6">
                <p className="mb-2 text-lg font-semibold text-white">Exclusive Introductory Offer:</p>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-primary">HK$1,280</span>
                  <span className="ml-3 text-lg text-gray-300 line-through">HK$2,680</span>
                  <span className="ml-3 rounded-md bg-primary/20 px-2 py-1 text-xs font-bold text-primary">SAVE 52%</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full bg-primary px-8 text-white hover:bg-primary/90">
                    Book Your Treatment
                  </Button>
                </Link>
                <Link href="#neck-aging">
                  <Button size="lg" variant="outline" className="rounded-full border-primary px-8 text-primary hover:bg-primary hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              {/* This space intentionally left empty for hero image */}
            </div>
          </div>
        </div>
      </section>

      {/* Neck Aging Signs Section */}
      <section id="neck-aging" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Is Your Neck <span className="text-primary">Betraying</span> Your Age?
            </h2>
            <p className="mt-4 text-gray-600">
              Even with the most diligent skincare routine, your neck area can reveal your true age. 
              Learn why the neck ages faster and how New Doublo™ technology provides the solution.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-lg">
              <div className="aspect-[3/4] w-full">
                <PlaceholderImage 
                  page="new-doublo" 
                  section="neck"
                  number={1}
                  aspectRatio="aspect-[3/4]"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-xl font-bold text-white">Why Your Neck Ages Faster</h3>
                <p className="mt-2 text-gray-200">
                  The neck has thinner skin with less collagen, fewer oil glands, and constant movement - 
                  making it one of the first areas to show signs of aging.
                </p>
              </div>
            </div>
            
            <div className="space-y-6 pt-6 md:pt-0">
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-3 text-xl font-bold">Common Neck Aging Signs</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Horizontal Neck Lines</p>
                      <p className="text-gray-600">Distinct rings or "necklace lines" caused by constant neck movement and aging skin</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">"Tech Neck" Lines</p>
                      <p className="text-gray-600">Vertical lines from constantly looking down at phones and devices, accelerating aging</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Turkey Neck</p>
                      <p className="text-gray-600">Loose, sagging skin creating a droopy appearance similar to a turkey's wattle</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Crepey Texture</p>
                      <p className="text-gray-600">Thin, tissue paper-like skin that appears wrinkled and fragile</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Double Chin</p>
                      <p className="text-gray-600">Excess fat and loose skin creating a second chin, aging your profile</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-primary/5 p-6">
                <h3 className="mb-3 text-xl font-bold">Why Creams Aren't Enough</h3>
                <p className="text-gray-600">
                  Unlike the face, neck skin is thinner with less oil and collagen. Creams can hydrate but can't address structural 
                  issues like sagging, deep wrinkles, or fat accumulation. New Doublo™ technology reaches the structural SMAS 
                  layer where real change happens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Technology Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">First of Its Kind</span>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              <span className="text-primary">雙重技術</span> Dual-Technology
            </h2>
            <p className="mt-4 text-gray-600">
              Our New Doublo™ Neck Rejuvenation treatment combines two revolutionary technologies 
              for immediate results without pain - something traditional HIFU treatments can't offer.
            </p>
          </div>
          
          <div className="mt-12 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4">The Dual-Technology Power</h3>
                <p className="text-gray-600 mb-6">
                  Most treatments target only one layer of your neck area. New Doublo™ combines two 
                  precision technologies in a single treatment head to target multiple layers simultaneously.
                </p>
                
                <div className="mt-8 space-y-6">
                  <div className="relative pl-16">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold">SD Dot Technology</h4>
                    <p className="mt-2 text-gray-600">
                      Delivers "semi-circular" energy waves that evenly transfer heat to both the epidermis 
                      and dermis, tightening loose skin and stimulating collagen production for improved 
                      skin texture and firmness.
                    </p>
                  </div>
                  
                  <div className="relative pl-16">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>
                    </div>
                    <h4 className="text-lg font-bold">FL Linear Technology</h4>
                    <p className="mt-2 text-gray-600">
                      Focuses high-intensity ultrasound on precise points, penetrating all layers to reach 
                      the SMAS fascia (at 4.5mm depth) without damaging surrounding tissue. This creates 
                      a powerful lifting effect from the deepest layers.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 flex items-center justify-center">
                <div className="p-8 w-full">
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <PlaceholderImage 
                      page="new-doublo" 
                      section="neck"
                      number={2}
                      aspectRatio="aspect-video"
                    />
                  </div>
                  <div className="mt-8 flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-primary">0.2</span>
                      <span className="text-sm text-gray-500">seconds per pulse</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-primary">25%</span>
                      <span className="text-sm text-gray-500">faster than traditional HIFU</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-primary">0</span>
                      <span className="text-sm text-gray-500">pain during treatment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 mx-auto max-w-xl">
            <div className="rounded-lg bg-primary/5 p-6 border border-primary/10">
              <h4 className="text-center text-lg font-bold">Why the Neck Area Requires Dual-Technology</h4>
              <p className="mt-3 text-gray-600">
                The neck area has unique structural challenges that require more than just surface-level treatment. 
                The skin is thinner, has less fatty tissue support, and experiences constant movement. 
                Our dual technology addresses both surface texture and deeper structural issues simultaneously 
                for comprehensive rejuvenation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Key <span className="text-primary">Benefits</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Our New Doublo™ Neck Rejuvenation delivers a comprehensive approach to neck rejuvenation 
              with both immediate and long-term benefits.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-8">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Immediate Lifting</h3>
              <p className="text-gray-600">
                Experience visible tightening and improved contours immediately after your session. Most clients 
                notice a more defined jawline and reduced sagging right after the first treatment.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Ongoing Improvement</h3>
              <p className="text-gray-600">
                The collagen stimulation continues for 3-6 months after treatment, with maximum results visible 
                around 90 days. Your neck will look progressively smoother, tighter, and more youthful.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">No Downtime</h3>
              <p className="text-gray-600">
                Unlike surgical neck lifts, our treatment requires no recovery time. You can return to work, 
                socialize, or exercise immediately, with no visible signs that you've had a treatment.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="m12 16 4-4-4-4"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Long-Lasting Results</h3>
              <p className="text-gray-600">
                Enjoy results lasting 12-18 months from a single treatment. Maintenance sessions every 6-12 months 
                help preserve your rejuvenated neck appearance indefinitely.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5a5 5 0 0 1 7 0 5 5 0 0 0 7 0v9a5 5 0 0 1-7 0 5 5 0 0 0-7 0z"/><path d="M5 5v14"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Natural Results</h3>
              <p className="text-gray-600">
                Your results will look completely natural, with no scars or obvious signs of treatment. 
                Friends will notice your refreshed appearance without realizing what's changed.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Painless Experience</h3>
              <p className="text-gray-600">
                Traditional HIFU treatments can be painful. Our patented technology delivers energy in just 0.2 seconds—too 
                fast for pain receptors to register—allowing for a comfortable, relaxing experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Real Results</span>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              Before &amp; After <span className="text-primary">Transformation</span>
            </h2>
            <p className="mt-4 text-gray-600">
              See the remarkable results our clients have achieved with New Doublo™ Neck Rejuvenation
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg">
                <PlaceholderImage 
                  page="new-doublo" 
                  section="neck"
                  number={3}
                  aspectRatio="aspect-[4/3]"
                />
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Client Age: 48</p>
                    <p className="text-sm text-gray-500">Single Treatment</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm italic text-gray-600">
                  "After just one treatment, the horizontal lines on my neck that I've been struggling with for years were significantly reduced. People keep asking if I've lost weight because my jawline looks so much more defined now!"
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg">
                <PlaceholderImage 
                  page="new-doublo" 
                  section="neck"
                  number={4}
                  aspectRatio="aspect-[4/3]"
                />
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Client Age: 52</p>
                    <p className="text-sm text-gray-500">Two Treatments (8 weeks apart)</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm italic text-gray-600">
                  "I was most concerned about my 'turkey neck' and sagging skin. The improvement has been dramatic! The area under my chin is tighter, and the crepey texture is gone. Best of all, there was no pain during the treatment - a complete surprise compared to other HIFU treatments I've tried."
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                  <PlaceholderImage 
                    type="avatar" 
                    number={4}
                    aspectRatio="aspect-square"
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <h3 className="text-lg font-bold">Dr. Michelle Lee, Aesthetic Physician</h3>
                <p className="mt-4 text-gray-600 italic">
                  "The neck area has always been challenging to treat non-surgically because of its thin skin and constant movement. What impresses me most about New Doublo™ technology is its ability to reach the SMAS fascia layer while maintaining patient comfort. The dual-technology approach creates both immediate tightening and long-term collagen stimulation, achieving what used to require multiple different treatments."
                </p>
              </div>
            </div>
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
                  Limited Time Offer
                </div>
                <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
                  Exclusive <span className="text-primary">Neck Revival</span> Package
                </h2>
                <p className="mt-4 text-gray-600">
                  Transform your neck area with our comprehensive treatment package at an exclusive introductory price.
                </p>
                
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Complete Neck Rejuvenation treatment (30-45 min)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Personalized skin analysis</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Firming neck mask application</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Take-home neck firming serum</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Before & after photo documentation</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <p className="text-lg font-semibold">Exclusive First-Time Offer:</p>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-primary">HK$1,280</span>
                    <span className="ml-3 text-lg text-gray-500 line-through">HK$2,680</span>
                    <span className="ml-3 rounded-md bg-primary/20 px-2 py-1 text-xs font-bold text-primary">SAVE 52%</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    *Offer valid for new clients only. Limited spots available each month.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-4 text-xl font-bold">Book Your Neck Rejuvenation</h3>
                  <p className="mb-6 text-gray-600">
                    Secure your appointment now to lock in this special introductory price. 
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
                
                <div className="mt-6 rounded-lg border border-primary/20 p-4">
                  <h4 className="text-center font-medium">Our Satisfaction Guarantee</h4>
                  <p className="mt-2 text-sm text-center text-gray-600">
                    If you don't see visible improvement after your first session, 
                    your next treatment is complimentary.
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
              Learn more about our New Doublo™ Neck Rejuvenation treatment
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-bold">How does New Doublo™ Neck Rejuvenation compare to traditional HIFU?</h3>
              <p className="mt-3 text-gray-600">
                Traditional HIFU treatments target only one layer of tissue, can be painful, and typically take longer. 
                New Doublo™ uses dual-technology to target multiple layers simultaneously, delivers energy 25% faster to eliminate pain, 
                and provides both immediate and long-term results that traditional HIFU can't match.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-bold">How many treatments will I need?</h3>
              <p className="mt-3 text-gray-600">
                Most clients see significant improvement after just one treatment. For optimal results, 
                we recommend a series of 2-3 treatments spaced 4-6 weeks apart, especially for more advanced 
                neck aging or concerns. Maintenance sessions every 6-12 months help preserve your results.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-bold">Is there any downtime?</h3>
              <p className="mt-3 text-gray-600">
                There is no downtime with our Neck Rejuvenation treatment. You can immediately return to 
                your normal activities, including applying makeup and skincare products. Some clients may 
                experience slight redness for 1-2 hours, but this subsides quickly.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-bold">How soon will I see results?</h3>
              <p className="mt-3 text-gray-600">
                Many clients notice immediate lifting and tightening effects after their first session. 
                These initial results continue to improve over the next 90 days as new collagen forms. 
                The full transformation is typically visible 2-3 months after treatment.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-bold">Who is a good candidate for this treatment?</h3>
              <p className="mt-3 text-gray-600">
                This treatment is ideal for anyone concerned with neck lines, sagging skin, double chin, 
                or crepey texture. It works for all skin types and is suitable for adults of any age who 
                want to improve their neck appearance without surgery. Your consultation will determine 
                if you're an ideal candidate.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-bold">How does the treatment feel?</h3>
              <p className="mt-3 text-gray-600">
                Unlike traditional HIFU treatments, our patented technology delivers energy in just 0.2 seconds—too 
                fast for pain receptors to register. Most clients describe the sensation as a mild warming feeling 
                or slight tingling. No anesthesia or pain management is required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Reveal Your <span className="text-primary">Youthful Neck</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Don't let your neck reveal your age. Experience our revolutionary Neck Rejuvenation treatment 
            and enjoy the confidence that comes with a more youthful appearance.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button size="lg" className="rounded-full bg-primary px-10 py-6 text-white hover:bg-primary/90">
                Book Your Neck Rejuvenation Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
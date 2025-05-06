"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PlaceholderImage from '@/components/PlaceholderImage'

export default function StretchMarkPage() {
  // Instead of using framer motion, use a simpler approach
  const FadeInSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
      <div className={`animate-fade-in ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-white text-gray-800">
      {/* Hero Section with Modern Tech-Forward Design */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-50 to-blue-50"></div>
        
        {/* Tech pattern overlay */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full tech-pattern-bg opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 lg:col-span-5">
              <div>
                <div className="mb-4">
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800 mb-4">
                    <span className="text-teal-600">CellRevive</span> Stretch Mark Repair
                  </h1>
                </div>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="rounded-md bg-slate-50 p-4 border-l-4 border-teal-500">
                    <p className="text-sm text-gray-700 font-medium">Advanced treatment</p>
                    <p className="text-xs text-gray-500">Visible results in weeks</p>
                  </div>
                  <div className="rounded-md bg-slate-50 p-4 border-l-4 border-teal-500">
                    <p className="text-sm text-gray-700 font-medium">Cellular regeneration</p>
                    <p className="text-xs text-gray-500">Clinically proven success</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                  The breakthrough solution for stretch marks. Our revolutionary CellRevive Stretch Mark Repair treatment dramatically reduces the appearance of stretch marks using advanced cellular technology, giving you back smooth, even-toned skin and renewed confidence.
                </p>
                <Link href="/contact">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-md transition-colors">
                    BOOK NOW
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:col-span-6 lg:col-span-7 relative">
              <div className="relative h-[500px] rounded-xl overflow-hidden">
                <div className="absolute right-0 top-0 w-full h-full">
                  {/* Hero image */}
                  <div className="relative w-full h-full bg-gradient-to-r from-teal-50 to-blue-50">
                    <PlaceholderImage 
                      type="treatment" 
                      number={5}
                      aspectRatio="w-full h-full object-cover"
                    />
                    <div className="w-full h-full bg-gradient-to-r from-white to-transparent absolute top-0 z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Stretch Marks Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Understanding <span className="text-teal-600">Stretch Marks</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Stretch marks appear when your skin changes shape rapidly due to growth, weight changes or pregnancy. When the skin is stretched, the collagen and elastin fibers break, resulting in visible lines on the skin's surface.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <p className="text-lg text-gray-600 mb-6">
                These marks can appear anywhere the skin has been stretched, but they're most common on the:
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white">✓</div>
                  <p>Abdomen, especially after pregnancy</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white">✓</div>
                  <p>Breasts, during pregnancy and nursing</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white">✓</div>
                  <p>Hips, thighs and buttocks</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white">✓</div>
                  <p>Upper arms and lower back</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-md">
                <PlaceholderImage 
                  type="treatment" 
                  number={5}
                  aspectRatio="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-10">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  <span className="text-teal-600">Dual Approach</span> Technology
                </h2>
                <p className="text-gray-600 mb-4">
                  Our Stretch Mark Repair treatment combines cell-based therapy with advanced physical techniques for unparalleled results.
                </p>
                <div className="w-24 h-1 bg-teal-600"></div>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                          <line x1="12" y1="2" x2="12" y2="12"></line>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Cellular Regeneration</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '94%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">94%</span>
                        </div>
                        <p className="text-gray-600">Our proprietary cell-stimulating formulation penetrates deep into the dermis layer to activate fibroblast cells. This triggers the natural production of collagen and elastin, filling in stretch marks from the inside out.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Microneedling Matrix</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '90%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">90%</span>
                        </div>
                        <p className="text-gray-600">Our advanced microneedling technique creates microscopic channels in the skin's surface, allowing for deeper penetration of our cell-regenerating serums while stimulating the skin's natural healing response.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <PlaceholderImage 
                  type="technology" 
                  number={1}
                  aspectRatio="w-full h-auto object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <div className="mb-6">
                  <h3 className="text-white text-xl font-bold mb-2">Dual Approach Synergy</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Our technology combines both cellular regeneration and physical microneedling to deliver comprehensive results for stretch marks of all ages and types.
                  </p>
                </div>
                
                {/* Technology indicators as a vertical stack */}
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center">
                    <div className="bg-teal-500/60 backdrop-blur-sm text-white font-medium py-1.5 px-3 rounded-l-md w-40 text-center">
                      Cellular Therapy
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm h-8 flex-1 rounded-r-md">
                      <div className="h-full bg-gradient-to-r from-teal-500/60 to-transparent w-4/5"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-teal-500/60 backdrop-blur-sm text-white font-medium py-1.5 px-3 rounded-l-md w-40 text-center">
                      Microneedling
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm h-8 flex-1 rounded-r-md">
                      <div className="h-full bg-gradient-to-r from-teal-500/60 to-transparent w-3/4"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-teal-500/60 backdrop-blur-sm text-white font-medium py-1.5 px-3 rounded-l-md w-40 text-center">
                      Combined Effect
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm h-8 flex-1 rounded-r-md">
                      <div className="h-full bg-gradient-to-r from-teal-500/60 to-transparent w-11/12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              <span className="text-teal-600">Proven</span> Results
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our clients experience significant improvement in the appearance of stretch marks, with results visible after just a few sessions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]">
              <div className="h-80 overflow-hidden">
                <PlaceholderImage 
                  type="before-after" 
                  number={1}
                  aspectRatio="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Post-pregnancy stretch marks</h3>
                <p className="text-gray-600 text-sm">After 4 treatment sessions</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]">
              <div className="h-80 overflow-hidden">
                <PlaceholderImage 
                  type="before-after" 
                  number={2}
                  aspectRatio="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Thigh stretch marks</h3>
                <p className="text-gray-600 text-sm">After 6 treatment sessions</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]">
              <div className="h-80 overflow-hidden">
                <PlaceholderImage 
                  type="before-after" 
                  number={3}
                  aspectRatio="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Abdominal stretch marks</h3>
                <p className="text-gray-600 text-sm">After 5 treatment sessions</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 mx-auto max-w-4xl">
            <div className="rounded-xl bg-teal-50 p-8 shadow-md">
              <h3 className="mb-6 text-center text-2xl font-bold">Client Testimonial</h3>
              <p className="text-center text-lg italic text-gray-600">
                "After two pregnancies, I'd given up hope that my stretch marks would ever fade. After just 4 sessions of the Stretch Mark Repair treatment, they've lightened significantly. I can finally wear a swimsuit with confidence again!"
              </p>
              <p className="mt-4 text-center font-medium">— Emma T., 36</p>
              <div className="mt-4 flex justify-center">
                <div className="text-yellow-400 text-xl">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Your Treatment <span className="text-teal-600">Journey</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Our comprehensive approach ensures optimal results with minimal discomfort and downtime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-70"></div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white relative z-10">1</div>
              <div className="text-center relative z-10">
                <h3 className="text-lg font-bold mb-2">Consultation</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4 mx-auto"></div>
                <p className="text-gray-600">
                  In-depth assessment of your stretch marks and customized treatment plan.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-70"></div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white relative z-10">2</div>
              <div className="text-center relative z-10">
                <h3 className="text-lg font-bold mb-2">Preparation</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4 mx-auto"></div>
                <p className="text-gray-600">
                  Skin is cleansed and a numbing cream is applied for your comfort.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-70"></div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white relative z-10">3</div>
              <div className="text-center relative z-10">
                <h3 className="text-lg font-bold mb-2">Treatment</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4 mx-auto"></div>
                <p className="text-gray-600">
                  Our dual approach technology is applied to target areas.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-70"></div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white relative z-10">4</div>
              <div className="text-center relative z-10">
                <h3 className="text-lg font-bold mb-2">Aftercare</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4 mx-auto"></div>
                <p className="text-gray-600">
                  Application of specialized healing serums and post-treatment instructions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Frequently Asked <span className="text-teal-600">Questions</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Get answers to the most common questions about our stretch mark treatment.
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold mb-2">How many sessions will I need?</h3>
              <p className="text-gray-600">
                Most clients see significant improvement after 4-6 sessions, but this can vary depending on the age, depth, and extent of your stretch marks. During your consultation, our specialists will assess your specific needs and recommend a tailored treatment plan.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold mb-2">Is the treatment painful?</h3>
              <p className="text-gray-600">
                We apply a numbing cream before treatment to minimize discomfort. Most clients describe the sensation as a mild tingling or slight pressure. Our treatment is designed with your comfort in mind, and our technicians work to ensure a positive experience.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold mb-2">How long do results last?</h3>
              <p className="text-gray-600">
                Results are permanent as the treatment rebuilds collagen in the affected areas. However, new stretch marks can form if the skin experiences rapid stretching again. Maintaining a stable weight and following our aftercare recommendations will help preserve your results.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold mb-2">Is there any downtime?</h3>
              <p className="text-gray-600">
                Minimal downtime is expected. Some redness and sensitivity may occur for 24-48 hours post-treatment, but most clients return to normal activities immediately. We recommend avoiding direct sun exposure and using the specialized aftercare products provided after your treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Investment in <span className="text-teal-600">Your Confidence</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Our treatment packages are designed to provide optimal results for your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]">
              <div className="bg-teal-50 p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800">Single Session</h3>
              </div>
              <div className="p-8 text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">$259</div>
                <p className="text-sm text-gray-500 mb-6">Per treatment</p>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Initial consultation</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">One treatment session</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Aftercare products</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="w-full rounded-md bg-teal-600 hover:bg-teal-700 text-white py-3">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-xl border-2 border-teal-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</div>
              <div className="bg-teal-50 p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800">Package of 4</h3>
              </div>
              <div className="p-8 text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">$899</div>
                <p className="text-sm text-gray-500 mb-6">Save $137</p>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Initial consultation</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Four treatment sessions</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Aftercare products</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Complimentary follow-up</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="w-full rounded-md bg-teal-600 hover:bg-teal-700 text-white py-3">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]">
              <div className="bg-teal-50 p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800">Package of 6</h3>
              </div>
              <div className="p-8 text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">$1,199</div>
                <p className="text-sm text-gray-500 mb-6">Save $355</p>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Initial consultation</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Six treatment sessions</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Premium aftercare kit</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Two complimentary follow-ups</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="w-full rounded-md bg-teal-600 hover:bg-teal-700 text-white py-3">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Unleash Your Confidence Again
          </h2>
          <p className="max-w-3xl mx-auto text-lg mb-10 text-white/90">
            Our CellRevive Stretch Mark Repair treatment is not just a beauty procedure, but a gateway to rediscovering your confidence and comfort in your own skin. Say goodbye to hiding your stretch marks and hello to showing off your smooth, radiant skin.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-teal-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-lg shadow-lg transition-colors">
              BOOK YOUR FIRST TREATMENT NOW
            </Button>
          </Link>
          <p className="mt-4 text-white/80">
            Begin your journey to smoother, more beautiful skin today!
          </p>
        </div>
      </section>
    </div>
  )
} 
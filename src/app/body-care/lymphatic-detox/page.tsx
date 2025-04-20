"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CarouselApi } from "@/components/ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function LymphaticDetoxPage() {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = 3
  
  // Set up the carousel API and event listener
  React.useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap())
    })
  }, [api])

  // Handle indicator clicks
  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

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
                    <span className="text-teal-600">Dual-Action</span> Lymphatic Detox
                  </h1>
                </div>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="rounded-md bg-slate-50 p-4 border-l-4 border-teal-500">
                    <p className="text-sm text-gray-700 font-medium">Complete wellness solution</p>
                    <p className="text-xs text-gray-500">Detoxifies, reduces bloating, contours, and relaxes</p>
                  </div>
                  <div className="rounded-md bg-slate-50 p-4 border-l-4 border-teal-500">
                    <p className="text-sm text-gray-700 font-medium">Gentle treatment</p>
                    <p className="text-xs text-gray-500">No recovery time needed</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                  Urban life means stress, long hours sitting, and poor diet—leading to toxin buildup, swelling, fatigue, dull skin, and weakened immunity. Our Dual-Action Lymphatic Detox combines patented magnetic fork technology with expert manual techniques for deeper, faster results.
                </p>
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-md transition-colors">
                  BOOK NOW
                </button>
              </div>
            </div>
            <div className="md:col-span-6 lg:col-span-7 relative">
              <div className="relative h-[500px] rounded-xl overflow-hidden">
                <div className="absolute right-0 top-0 w-full h-full">
                  {/* Hero image */}
                  <div className="relative w-full h-full bg-gradient-to-r from-teal-50 to-blue-50">
                    <img
                      src="/images/placeholders/spa01.jpg" 
                      alt="Lymphatic Detox Treatment"
                      className="w-full h-full object-cover"
                    />
                    <div className="w-full h-full bg-gradient-to-r from-white to-transparent absolute top-0 z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              <span className="text-teal-600">Triple Pathway</span> Technology
            </h2>
            <p className="text-gray-600 text-lg">
              Our patented approach combines magnetic energy and expert manual techniques to deliver comprehensive results beyond what traditional methods can achieve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-70"></div>
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Magnetic Fork Technology</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                  Patented magnetic energy stimulates microcirculation at a cellular level, activating lymph flow in ways that manual techniques alone cannot reach.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-70"></div>
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 2-5.6 5.6a8 8 0 1 0 11.2 0L12 2Z" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Triple Detox Pathways</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                  Targets neck, underarm, and groin lymph hubs simultaneously to fully unblock your body's lymphatic network, boosting immunity and reducing inflammation.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-70"></div>
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
                  <path d="m7 10 3 3 7-7" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Expert Manual Techniques</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                  Our specialists use precise pressure and movement to clear lymph nodes and pathways, ensuring toxins and waste are thoroughly eliminated from the body.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Data Visualization */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-10">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  <span className="text-teal-600">Immediate</span> Tangible Results
                </h2>
                <p className="text-gray-600 mb-4">
                  Our advanced technology delivers visible improvements after just one session, with measurable long-term benefits for your overall wellness.
                </p>
                <div className="w-24 h-1 bg-teal-600"></div>
              </div>
              
              <Tabs defaultValue="immediate" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border border-gray-200">
                  <TabsTrigger value="immediate" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Immediate
                  </TabsTrigger>
                  <TabsTrigger value="metabolic" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Metabolic
                  </TabsTrigger>
                  <TabsTrigger value="noninvasive" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Non-Invasive
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="immediate" className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">De-bloat & Sculpt</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '85%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">85%</span>
                        </div>
                        <p className="text-gray-600">See visible reduction in puffiness and enhanced body contours after just one session.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" y1="9" x2="9.01" y2="9" />
                          <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Renewed Vitality</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '90%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">90%</span>
                        </div>
                        <p className="text-gray-600">Experience an immediate boost in energy levels as toxins are eliminated from your system.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="metabolic" className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8" />
                          <path d="M12 4C7.03 4 3 7.582 3 12h18c0-4.418-4.03-8-9-8Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Boosted Metabolism</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '78%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">78%</span>
                        </div>
                        <p className="text-gray-600">Accelerates waste removal and improves metabolic function for better energy flow throughout the body.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="3" y1="9" x2="21" y2="9" />
                          <line x1="9" y1="21" x2="9" y2="9" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Skin Radiance</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '83%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">83%</span>
                        </div>
                        <p className="text-gray-600">Clearer, more luminous skin as toxin removal reduces inflammation and improves circulation.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="noninvasive" className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.342a2 2 0 0 0-.602-1.43l-4.44-4.342A2 2 0 0 0 13.56 2H6a2 2 0 0 0-2 2z" />
                          <path d="M9 13h6" />
                          <path d="M9 17h3" />
                          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Gentle & Safe</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '100%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">100%</span>
                        </div>
                        <p className="text-gray-600">Non-invasive and painless process suitable for all body types with absolutely no discomfort.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
                          <path d="M2 20h20" />
                          <path d="M14 12v.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Zero Downtime</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '100%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">100%</span>
                        </div>
                        <p className="text-gray-600">Return to daily activities immediately after treatment with no recovery period required.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="relative rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 p-8">
              <div className="absolute top-0 right-0 h-24 w-24 bg-teal-50"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Customer Experience</h3>
                
                <div className="mb-8 relative">
                  <div className="text-teal-600 text-4xl absolute -top-2 -left-2">"</div>
                  <p className="text-gray-600 italic pl-6 pr-4">
                    The treatment was incredibly relaxing, and I noticed a visible reduction in bloating right away. My skin feels more hydrated and I have so much more energy. I've been recommending this treatment to all my friends!
                  </p>
                  <div className="text-teal-600 text-4xl absolute -bottom-8 right-0">"</div>
                </div>
                
                <div className="flex items-center mt-10">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Sarah M.</p>
                    <p className="text-sm text-gray-500">Wellness enthusiast</p>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center">
                  <div className="mr-2 text-sm text-gray-500">Experience Rating:</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="relative py-16 bg-slate-700 text-white overflow-hidden">
        <div className="absolute inset-0 tech-pattern-bg opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white">
              Ideal <span className="text-teal-400">For</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Our Dual-Action Lymphatic Detox is perfect for a wide range of individuals looking to improve their overall wellness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="5" width="16" height="16" rx="2" />
                  <rect x="9" y="2" width="6" height="6" rx="2" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Office Workers</h3>
              <p className="text-gray-300 text-sm">
                Those with sedentary jobs experiencing chronic swelling, cold limbs, or fatigue from long hours sitting.
              </p>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Wellness Seekers</h3>
              <p className="text-gray-300 text-sm">
                Anyone struggling with constipation, dull skin, or low immunity looking for total body revitalization.
              </p>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Body Sculptors</h3>
              <p className="text-gray-300 text-sm">
                Those seeking deep detox, body sculpting, and stress relief as part of their beauty regimen.
              </p>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 14.14 14.14" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Sensitive Individuals</h3>
              <p className="text-gray-300 text-sm">
                Those wanting powerful results without pain or downtime that other treatments may require.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-white text-lg max-w-2xl mx-auto">
              Our Dual-Action Lymphatic Detox reactivates your body's natural vitality, leaving you feeling light, refreshed, and renewed.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section with Tech Elements */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              FAQs
            </h2>
            <p className="text-gray-600 text-lg">
              Expert insights about our Dual-Action Lymphatic Detox treatment program
            </p>
            <div className="w-24 h-1 bg-teal-600 mx-auto mt-6"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">How does the magnetic technology work?</h3>
                <p className="text-gray-600 relative z-10">
                  Our patented magnetic fork technology creates gentle, targeted magnetic pulses that activate lymphatic vessels at a cellular level, stimulating microcirculation in ways manual techniques alone cannot reach.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">How many sessions do I need?</h3>
                <p className="text-gray-600 relative z-10">
                  While clients see visible improvements after just one session, we recommend a series of 4-6 treatments for optimal results, followed by monthly maintenance sessions to sustain the benefits long-term.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">Is there any downtime?</h3>
                <p className="text-gray-600 relative z-10">
                  Absolutely none. Our treatment is completely non-invasive and painless, allowing you to return to your daily activities immediately. Many clients schedule sessions during their lunch break and return to work right afterward.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">What should I do after treatment?</h3>
                <p className="text-gray-600 relative z-10">
                  For best results, drink plenty of water after your session to support the detoxification process. You may experience increased urination as your body eliminates excess fluid and toxins. Light exercise in the days following treatment can also enhance results.
                </p>
              </div>
            </div>
            
            <div className="mt-12 bg-teal-600 rounded-lg p-8 text-white shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to experience total wellness?</h3>
                <p>Experience all four benefits in one session—detox, de-bloat, sculpt, and relax.</p>
              </div>
              <button className="bg-white text-teal-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="relative py-20 bg-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 tech-pattern-bg opacity-30"></div>
        
        {/* Tech elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-teal-400/20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full border border-teal-400/30"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-teal-600/5"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Begin Your <span className="text-teal-400">Wellness</span> Journey Today
            </h2>
            <p className="text-gray-300 text-lg mb-10">
              Experience the transformative benefits of our Dual-Action Lymphatic Detox. Book your session today and take the first step toward total wellness—inside and out.
            </p>
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-10 rounded-md">
              BOOK APPOINTMENT
            </button>
            
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-teal-400 font-bold mb-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m4.9 4.9 14.2 14.2" />
                  </svg>
                  PATENTED TECHNOLOGY
                </div>
                <p className="text-gray-400">Unique triple-pathway approach</p>
              </div>
              
              <div className="text-center">
                <div className="text-teal-400 font-bold mb-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  MULTIPLE BENEFITS
                </div>
                <p className="text-gray-400">Complete wellness solution</p>
              </div>
              
              <div className="text-center">
                <div className="text-teal-400 font-bold mb-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.8 11.3 2 22l10.7-3.79" />
                    <path d="M4 3h.01" />
                    <path d="M22 8h.01" />
                    <path d="M15 2h.01" />
                    <path d="M22 20h.01" />
                    <path d="m22 2-20 20" />
                  </svg>
                  ZERO DOWNTIME
                </div>
                <p className="text-gray-400">Return to normal activities immediately</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
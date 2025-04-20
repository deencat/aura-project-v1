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

export default function BreastEnhancementPage() {
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
                    <span className="text-teal-600">Goddess</span> Curves
                  </h1>
                </div>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="rounded-md bg-slate-50 p-4 border-l-4 border-teal-500">
                    <p className="text-sm text-gray-700 font-medium">Natural enhancement</p>
                    <p className="text-xs text-gray-500">Firm, contour, and revitalize</p>
                  </div>
                  <div className="rounded-md bg-slate-50 p-4 border-l-4 border-teal-500">
                    <p className="text-sm text-gray-700 font-medium">Non-invasive solution</p>
                    <p className="text-xs text-gray-500">Safe, painless, no side effects</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                  Awaken Your Goddess Curves—Experience the Revolutionary "Cellular Breast Vitality" Transformation! Our exclusive techniques work at the cellular level to restore fullness and resilience from within.
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
                      src="/images/placeholders/goddess-curves-hero.jpg" 
                      alt="Goddess Curves Enhancement Treatment"
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
              <span className="text-teal-600">Triple Deep</span> Restoration
            </h2>
            <p className="text-gray-600 text-lg">
              Our revolutionary approach uses advanced technologies and natural methods to enhance beauty and wellness from within.
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
                <h3 className="text-xl font-bold mb-2 text-gray-800">Cellular-Level Activation</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                  Our exclusive "Breast Vitality Awakening" technique penetrates deep to reactivate dormant mammary cells, restoring fullness and resilience from within.
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
                <h3 className="text-xl font-bold mb-2 text-gray-800">Triple Deep Restoration</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                  Unblock lymph nodes, strengthen mammary glands, and boost collagen production—multi-layered repair for firmer, younger-looking contours.
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
                <h3 className="text-xl font-bold mb-2 text-gray-800">Natural Energy Infusion</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                  Harnessing pure, active natural ingredients with patented, non-invasive technology—safe, painless, and free from side effects.
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
                  <span className="text-teal-600">Visible</span> Transformations
                </h2>
                <p className="text-gray-600 mb-4">
                  Our advanced technology delivers noticeable enhancement after just a few sessions, with lasting benefits for your confidence and well-being.
                </p>
                <div className="w-24 h-1 bg-teal-600"></div>
              </div>
              
              <Tabs defaultValue="enhancement" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border border-gray-200">
                  <TabsTrigger value="enhancement" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Enhancement
                  </TabsTrigger>
                  <TabsTrigger value="firmness" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Firmness
                  </TabsTrigger>
                  <TabsTrigger value="noninvasive" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Non-Invasive
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="enhancement" className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Natural Fullness</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '85%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">85%</span>
                        </div>
                        <p className="text-gray-600">Experience improved volume and natural-looking results through cellular revitalization.</p>
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
                        <h4 className="font-bold mb-1 text-gray-800">Enhanced Confidence</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '92%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">92%</span>
                        </div>
                        <p className="text-gray-600">Feel more confident and comfortable in your body with improved proportions and symmetry.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="firmness" className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8" />
                          <path d="M12 4C7.03 4 3 7.582 3 12h18c0-4.418-4.03-8-9-8Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Improved Firmness</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '87%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">87%</span>
                        </div>
                        <p className="text-gray-600">Stimulates collagen production and tissue strengthening for noticeably firmer, uplifted contours.</p>
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
                        <h4 className="font-bold mb-1 text-gray-800">Youthful Appearance</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '83%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">83%</span>
                        </div>
                        <p className="text-gray-600">Rejuvenates and restores tissue for a more youthful, natural, and vibrant appearance.</p>
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
                        <h4 className="font-bold mb-1 text-gray-800">Safe & Natural</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '100%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">100%</span>
                        </div>
                        <p className="text-gray-600">Completely non-invasive approach with zero side effects, suitable for all body types.</p>
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
                        <p className="text-gray-600">Return to daily activities immediately with no recovery period or special post-care regimen.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="relative rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 p-8">
              <div className="absolute top-0 right-0 h-24 w-24 bg-teal-50"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Transformation You Can Trust</h3>
                
                <div className="mb-8 relative">
                  <div className="text-teal-600 text-4xl absolute -top-2 -left-2">"</div>
                  <p className="text-gray-600 italic pl-6 pr-4">
                    Not just fuller, but healthier and more confident—this is a true upgrade! My experience with the Goddess Curves treatment has been transformative. The results are natural and beautiful, and the boost to my confidence has been incredible.
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
                    <p className="font-medium text-gray-800">Jennifer L.</p>
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
              Perfect <span className="text-teal-400">For</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Our Goddess Curves treatment is ideal for women looking for natural enhancement and restoration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 22h14" />
                  <path d="M5 2h14" />
                  <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                  <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Post-Pregnancy</h3>
              <p className="text-gray-300 text-sm">
                Women looking to restore breast volume and firmness after pregnancy and breastfeeding.
              </p>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Natural Enhancement</h3>
              <p className="text-gray-300 text-sm">
                Those seeking fuller, firmer breasts without surgery or synthetic implants.
              </p>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 14.14 14.14" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Age-Related Changes</h3>
              <p className="text-gray-300 text-sm">
                Women experiencing loss of volume, firmness, or elasticity due to aging or hormonal changes.
              </p>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Asymmetry Correction</h3>
              <p className="text-gray-300 text-sm">
                Those looking to improve natural breast symmetry and proportions without invasive procedures.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-white text-lg max-w-2xl mx-auto">
              Our Goddess Curves treatment awakens your natural beauty, enhancing your curves while maintaining a completely natural look and feel.
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
              Expert insights about our Goddess Curves enhancement program
            </p>
            <div className="w-24 h-1 bg-teal-600 mx-auto mt-6"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">How does the treatment work?</h3>
                <p className="text-gray-600 relative z-10">
                  Our Goddess Curves treatment uses a unique combination of advanced bio-stimulation technology and natural active ingredients to revitalize mammary tissue at the cellular level, encouraging natural firmness and enhancement.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">How many sessions are recommended?</h3>
                <p className="text-gray-600 relative z-10">
                  While many clients notice improvements after just 2-3 sessions, we typically recommend a series of 6-8 treatments for optimal results, followed by maintenance sessions every 3-4 months to sustain enhancement.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">Is the treatment painful?</h3>
                <p className="text-gray-600 relative z-10">
                  No, the treatment is completely non-invasive and painless. Most clients describe it as a warm, relaxing experience with gentle stimulation that's actually quite pleasant.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">How long do results last?</h3>
                <p className="text-gray-600 relative z-10">
                  With proper maintenance sessions, results can last for years. The treatment stimulates your body's natural processes, and regular maintenance helps sustain the enhanced firmness, shape, and volume over time.
                </p>
              </div>
            </div>
            
            <div className="mt-12 bg-teal-600 rounded-lg p-8 text-white shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to transform naturally?</h3>
                <p>Experience our revolutionary Goddess Curves treatment for natural enhancement.</p>
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
              Embrace Your <span className="text-teal-400">Goddess</span> Within
            </h2>
            <p className="text-gray-300 text-lg mb-10">
              Experience the transformative benefits of our Goddess Curves treatment. Book your consultation today and begin your journey to natural enhancement and confidence.
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
                  ADVANCED TECHNOLOGY
                </div>
                <p className="text-gray-400">Cellular-level revitalization</p>
              </div>
              
              <div className="text-center">
                <div className="text-teal-400 font-bold mb-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  NATURAL ENHANCEMENT
                </div>
                <p className="text-gray-400">Results that look and feel real</p>
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
                  NO SIDE EFFECTS
                </div>
                <p className="text-gray-400">Completely safe and non-invasive</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
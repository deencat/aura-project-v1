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
import TreatmentImage from '@/components/TreatmentImage'

export default function PerfectButtocksPage() {
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
                    <span className="text-teal-600">Peach Lift</span> Sculpting Machine
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
                  Peach Lift Sculpting Machine combines High-Intensity Focused Electromagnetic and RF technologies for a groundbreaking, non-invasive body contouring experience. Each 30-minute session is equivalent to 20,000 squats or sit-ups, delivering simultaneous muscle building and fat reduction for a firmer, lifted, and more youthful buttocks.
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
                    <TreatmentImage
                      category="body-care"
                      treatment="perfect-buttocks"
                      type="hero"
                      alt="Peach Lift Sculpting Treatment"
                      fill
                      className="object-cover"
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
              <span className="text-teal-600">Revolutionary</span> Sculpting Technology
            </h2>
            <p className="text-gray-600 text-lg">
              Our advanced dual-technology approach delivers superior muscle building and fat reduction for the perfect buttocks contour.
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
                <h3 className="text-xl font-bold mb-2 text-gray-800">Muscle Building</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                  High-Intensity Focused Electromagnetic technology creates thousands of powerful muscle contractions, equivalent to 20,000 squats in just 30 minutes.
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
                <h3 className="text-xl font-bold mb-2 text-gray-800">Fat Reduction</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                  RF technology targets and eliminates stubborn fat cells while the intense muscle activity boosts metabolism for enhanced fat reduction.
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
                <h3 className="text-xl font-bold mb-2 text-gray-800">Non-Invasive Solution</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                  Achieve remarkable results without surgery, anesthesia, or downtime—resume normal activities immediately after each treatment session.
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
                  <span className="text-teal-600">Clinically</span> Proven Results
                </h2>
                <p className="text-gray-600 mb-4">
                  Our Peach Lift Sculpting Machine delivers measurable results with an average 17% muscle gain and 20% fat loss in treated areas.
                </p>
                <div className="w-24 h-1 bg-teal-600"></div>
              </div>
              
              <Tabs defaultValue="enhancement" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border border-gray-200">
                  <TabsTrigger value="enhancement" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Sculpting
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
                        <h4 className="font-bold mb-1 text-gray-800">Muscle Building</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '85%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">85%</span>
                        </div>
                        <p className="text-gray-600">Experience remarkable muscle growth and definition through supramaximal contractions.</p>
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
                        <p className="text-gray-600">Feel more confident with a firmer, lifted, and more youthful buttocks contour.</p>
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
                        <p className="text-gray-600">Achieve noticeably firmer, uplifted buttocks through intense muscle stimulation and collagen production.</p>
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
                        <p className="text-gray-600">Restore elasticity and tone for a more youthful, lifted appearance.</p>
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
                    I've tried countless workouts and treatments, but nothing compares to the Peach Lift Sculpting Machine! After just 4 sessions, I'm seeing incredible definition and lift that I never achieved with exercise alone. The treatment is comfortable, and I can immediately go back to my routine.
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
                    <p className="font-medium text-gray-800">Sarah K.</p>
                    <p className="text-sm text-gray-500">Fitness enthusiast</p>
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
              Our Peach Lift Sculpting Machine is ideal for anyone seeking a firmer, more sculpted buttocks
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
                Women looking to restore buttocks shape and firmness after pregnancy and childbirth.
              </p>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Fitness Enthusiasts</h3>
              <p className="text-gray-300 text-sm">
                Those seeking to enhance muscle definition and achieve the perfect contour without additional gym hours.
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
                Men and women experiencing loss of tone and firmness due to aging or lifestyle changes.
              </p>
            </div>
            
            <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-600 hover:border-teal-400 transition-colors">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Stubborn Fat Areas</h3>
              <p className="text-gray-300 text-sm">
                Those struggling with stubborn fat deposits that haven't responded to diet and exercise alone.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-white text-lg max-w-2xl mx-auto">
              Our Peach Lift Sculpting Machine delivers remarkable results for both men and women, helping you achieve your ideal shape with zero effort and no downtime.
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
              Expert insights about our Peach Lift Sculpting technology
            </p>
            <div className="w-24 h-1 bg-teal-600 mx-auto mt-6"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">How does the Peach Lift work?</h3>
                <p className="text-gray-600 relative z-10">
                  The Peach Lift combines High-Intensity Focused Electromagnetic technology with RF technology to simultaneously build muscle and reduce fat. The device induces powerful muscle contractions not achievable through voluntary exercises, while RF energy targets and eliminates fat cells.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">How many sessions are needed?</h3>
                <p className="text-gray-600 relative z-10">
                  Most clients see optimal results with just 4 sessions, each lasting 30 minutes, spaced 2-3 days apart. Results continue to improve for 2-4 weeks after treatment as muscle builds and fat cells are naturally eliminated.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">Is the treatment painful?</h3>
                <p className="text-gray-600 relative z-10">
                  No, the treatment isn't painful. You'll feel intense muscle contractions and a warming sensation, but most clients find it comfortable and even read or relax during sessions. There's no pain, anesthesia, or downtime required.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full"></div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 relative z-10">How long do results last?</h3>
                <p className="text-gray-600 relative z-10">
                  Results from the Peach Lift Sculpting Machine can last for 6-12 months or longer. We recommend maintenance sessions every 3-6 months to sustain optimal results. A healthy lifestyle will help extend the benefits.
                </p>
              </div>
            </div>
            
            <div className="mt-12 bg-teal-600 rounded-lg p-8 text-white shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to enhance your curves?</h3>
                <p className="text-teal-100">Experience the Peach Lift difference with just 4 short sessions.</p>
              </div>
              <button className="whitespace-nowrap px-6 py-3 bg-white text-teal-600 font-medium rounded-md hover:bg-teal-50 transition-colors">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
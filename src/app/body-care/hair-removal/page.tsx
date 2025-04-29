"use client"

import React, { useState } from 'react'
import Link from 'next/link'
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

export default function HairRemovalPage() {
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
                    <span className="text-teal-600">SnowGlow Smooth</span> Full-Body Laser Hair Removal
                  </h1>
                </div>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="rounded-md bg-slate-50 p-4 border-l-4 border-teal-500">
                    <p className="text-sm text-gray-700 font-medium">Permanent hair removal</p>
                    <p className="text-xs text-gray-500">Smooth, hair-free skin</p>
                  </div>
                  <div className="rounded-md bg-slate-50 p-4 border-l-4 border-teal-500">
                    <p className="text-sm text-gray-700 font-medium">Skin whitening</p>
                    <p className="text-xs text-gray-500">Enhanced radiance and glow</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                  The Beauty Secret of Hong Kong Women. Illuminate your beauty, unleash your confidence. Our revolutionary SnowGlow Smooth Full-Body Laser Hair Removal not only permanently removes unwanted hair but also whitens your skin, allowing your inner radiance to shine through.
                </p>
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-md transition-colors">
                  BOOK NOW
                </button>
              </div>
            </div>
            <div className="md:col-span-6 lg:col-span-7 relative">
              <div className="relative h-[500px] rounded-xl overflow-hidden">
                <div className="absolute right-0 top-0 w-full h-full">
                  {/* Hero video replacing the image */}
                  <div className="relative w-full h-full bg-gradient-to-r from-teal-50 to-blue-50">
                    <video 
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src="/images/placeholders/hair02.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="w-full h-full bg-gradient-to-r from-white to-transparent absolute top-0 z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urban Women Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              The <span className="text-teal-600">Perfect Choice</span> for Urban Women
            </h2>
            <p className="text-gray-600 text-lg">
              In the busy Hong Kong lifestyle, daily beauty routines often become time burdens. Traditional hair removal methods are not only time-consuming but can also cause skin issues.
            </p>
          </div>

          {/* Treatment Area Images */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-xl overflow-hidden shadow-md">
                <TreatmentImage 
                  category="body-care"
                  treatment="hair-removal"
                  type="how-it-works"
                  index={1}
                  alt="Hair Removal Treatment Areas - Face and Upper Body"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md">
                <TreatmentImage 
                  category="body-care"
                  treatment="hair-removal"
                  type="how-it-works"
                  index={2}
                  alt="Hair Removal Treatment Areas - Lower Body"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>
            <p className="text-center text-gray-500 mt-4 text-sm">
              Our treatment effectively targets all hair removal treatment areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-70"></div>
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Time Saving</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                  Say goodbye to daily shaving, waxing, or using depilatory creams. Our treatment permanently removes unwanted hair, freeing you from tedious routines.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-70"></div>
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Skin Health</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                  Completely resolves skin sensitivity, hyperpigmentation, and ingrown hairs caused by traditional hair removal methods.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-70"></div>
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2" />
                  <path d="M12 21v2" />
                  <path d="M4.2 4.2l1.4 1.4" />
                  <path d="M18.4 18.4l1.4 1.4" />
                  <path d="M1 12h2" />
                  <path d="M21 12h2" />
                  <path d="M4.2 19.8l1.4-1.4" />
                  <path d="M18.4 5.6l1.4-1.4" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Radiant Glow</h3>
                <div className="w-12 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600">
                  Specially designed for Hong Kong's hot and humid climate, our treatment not only removes hair but also brightens and whitens your skin for a radiant glow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Triple Wavelength Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-10">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  <span className="text-teal-600">Triple Wavelength</span> Technology
                </h2>
                <p className="text-gray-600 mb-4">
                  Surpassing traditional hair removal with our breakthrough triple wavelength laser technology, exceeding the limitations of dual wavelength technology in the market.
                </p>
                <div className="w-24 h-1 bg-teal-600"></div>
              </div>
              
              <Tabs defaultValue="wavelength1" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-white border border-gray-200 rounded-md">
                  <TabsTrigger 
                    value="wavelength1" 
                    className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-l-md transition-colors duration-200"
                  >
                    755nm
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wavelength2" 
                    className="data-[state=active]:bg-teal-500 data-[state=active]:text-white transition-colors duration-200"
                  >
                    808nm
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wavelength3" 
                    className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-r-md transition-colors duration-200"
                  >
                    1064nm
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="wavelength1" className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Melanin Targeting</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '92%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">92%</span>
                        </div>
                        <p className="text-gray-600">Precisely targets melanin in hair follicles, ideal for Asian skin tones.</p>
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
                        <h4 className="font-bold mb-1 text-gray-800">Fine Hair Removal</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '86%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">86%</span>
                        </div>
                        <p className="text-gray-600">Perfect for finer hair in areas like upper lip, underarms, and bikini line.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="wavelength2" className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8" />
                          <path d="M12 4C7.03 4 3 7.582 3 12h18c0-4.418-4.03-8-9-8Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Dermis Penetration</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '90%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">90%</span>
                        </div>
                        <p className="text-gray-600">Penetrates the dermis layer for effective treatment of coarse hair.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                          <circle cx="10" cy="13" r="2" />
                          <path d="m20 17-2-2-2 2" />
                          <path d="m14 17-2-2-2 2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Medium Hair Success</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '94%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">94%</span>
                        </div>
                        <p className="text-gray-600">Ideal for body areas with medium-thick hair like arms, legs, and back.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="wavelength3" className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="22" y1="12" x2="18" y2="12" />
                          <line x1="6" y1="12" x2="2" y2="12" />
                          <line x1="12" y1="6" x2="12" y2="2" />
                          <line x1="12" y1="22" x2="12" y2="18" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Deep Treatment</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '95%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">95%</span>
                        </div>
                        <p className="text-gray-600">Breakthrough long wavelength technology treating deep stubborn hair.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-.5" />
                          <path d="M14 2v6h6" />
                          <path d="M10 12H4a2 2 0 1 0 0 4h6" />
                          <path d="M17 17a5 5 0 0 0-10 0" />
                          <line x1="7" y1="17" x2="4" y2="17" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-gray-800">Collagen Stimulation</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '88%'}}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">88%</span>
                        </div>
                        <p className="text-gray-600">Stimulates collagen regeneration for improved skin texture and elasticity.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <TreatmentImage 
                category="body-care"
                treatment="hair-removal"
                type="technology"
                index={1}
                alt="Triple Wavelength Technology"
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <div className="mb-6">
                  <h3 className="text-white text-xl font-bold mb-2">Triple Wavelength Synergy</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Our technology simultaneously addresses hair of different depths and thicknesses, making the treatment more comprehensive than any other solution on the market.
                  </p>
                </div>
                
                {/* Wavelength indicators as a vertical stack */}
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center">
                    <div className="bg-teal-500/60 backdrop-blur-sm text-white font-medium py-1.5 px-3 rounded-l-md w-16 text-center">
                      755nm
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm h-8 flex-1 rounded-r-md">
                      <div className="h-full bg-gradient-to-r from-teal-500/60 to-transparent w-1/3"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-teal-500/60 backdrop-blur-sm text-white font-medium py-1.5 px-3 rounded-l-md w-16 text-center">
                      808nm
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm h-8 flex-1 rounded-r-md">
                      <div className="h-full bg-gradient-to-r from-teal-500/60 to-transparent w-2/3"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-teal-500/60 backdrop-blur-sm text-white font-medium py-1.5 px-3 rounded-l-md w-16 text-center">
                      1064nm
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm h-8 flex-1 rounded-r-md">
                      <div className="h-full bg-gradient-to-r from-teal-500/60 to-transparent w-9/12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Double Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              <span className="text-teal-600">SnowGlow Smooth</span>, Two Benefits in One
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our treatment offers dual benefits: permanent hair removal and skin whitening for a radiant glow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]">
              <div className="h-64 overflow-hidden">
                <TreatmentImage 
                  category="body-care"
                  treatment="hair-removal"
                  type="benefits"
                  index={1}
                  alt="Permanent Hair Removal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Permanent Hair Removal & Skin Rejuvenation</h3>
                <div className="w-16 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600 mb-6">
                  Clinically proven, our treatment achieves up to 95% permanent hair removal after 5-6 sessions while rejuvenating your skin.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Resolves ingrown hair problems, preventing melanin deposition</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Reduces pore size, improving overall skin texture</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Promotes collagen production, enhancing skin elasticity</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]">
              <div className="h-64 overflow-hidden">
                <TreatmentImage 
                  category="body-care"
                  treatment="hair-removal"
                  type="benefits"
                  index={2}
                  alt="Skin Whitening"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Whitened Skin, Radiant Glow</h3>
                <div className="w-16 h-1 bg-teal-600 mb-4"></div>
                <p className="text-gray-600 mb-6">
                  Our treatment not only removes hair but also simultaneously whitens the skin for a radiant, glowing appearance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Laser stimulates natural skin metabolism, fading hyperpigmentation</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Patented "Ice Fantasy" technology infuses whitening essence</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700">Inhibits melanin production, preventing post-sun hyperpigmentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Unleash Your Radiant Confidence
          </h2>
          <p className="max-w-3xl mx-auto text-lg mb-10 text-white/90">
            SnowGlow Smooth Full-Body Laser Hair Removal is not just a beauty treatment, but a revolution in the modern woman's lifestyle. Free yourself from tedious daily hair removal routines, bid farewell to skin problems, and reveal your confident, glowing self.
          </p>
          <button className="bg-white text-teal-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-lg shadow-lg transition-colors">
            BOOK YOUR FIRST EXPERIENCE NOW
          </button>
          <p className="mt-4 text-white/80">
            Begin a new life free of hair troubles and full of confidence!
          </p>
        </div>
      </section>
    </div>
  )
} 
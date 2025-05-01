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

  // Simple fade-in animation
  const FadeInSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
      <div className={`animate-fade-in ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-white text-gray-800">
      {/* Hero Section */}
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
                    <p className="text-sm text-gray-700 font-medium">Pain-free technology</p>
                    <p className="text-xs text-gray-500">Suitable for all skin types</p>
                  </div>
                  <div className="rounded-md bg-slate-50 p-4 border-l-4 border-teal-500">
                    <p className="text-sm text-gray-700 font-medium">Long-lasting results</p>
                    <p className="text-xs text-gray-500">Up to 90% permanent reduction</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                  Experience the revolutionary SnowGlow Smooth technology for permanent hair reduction. Our advanced triple-wavelength laser system delivers precise, pain-free results for all skin tones and hair types, leaving you with silky-smooth skin after just a few sessions.
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
                      treatment="hair-removal"
                      type="hero"
                      alt="SnowGlow Smooth Full-Body Laser Hair Removal"
                      fill
                      priority
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

      {/* Urban Women Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg h-[450px] relative">
                <TreatmentImage
                  category="body-care"
                  treatment="hair-removal"
                  type="how-it-works"
                  index={1}
                  alt="Urban woman with smooth skin"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                For the <span className="text-teal-600">Urban Woman</span> On the Go
              </h2>
              <div className="w-20 h-1 bg-teal-600 mb-6"></div>
              <p className="text-gray-600 mb-6">
                Modern urban living demands efficiency. SnowGlow Smooth technology offers busy professional women a permanent solution to the constant cycle of shaving, waxing, and plucking.
              </p>
              <p className="text-gray-600 mb-6">
                Our quick, pain-free treatments fit perfectly into your packed schedule. Each session takes as little as 15 minutes for smaller areas, allowing you to return immediately to your daily activities without downtime or side effects.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-800">Quick Sessions</h4>
                    <p className="text-sm text-gray-600">As fast as 15 minutes per area</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
                      <path d="m7 10 3 3 7-7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-800">Zero Downtime</h4>
                    <p className="text-sm text-gray-600">Return to activities immediately</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Triple Wavelength Technology Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              <span className="text-teal-600">Triple Wavelength</span> Technology
            </h2>
            <p className="text-gray-600">
              Our advanced laser system combines three different wavelengths to target all hair types and skin tones with unparalleled precision and comfort.
            </p>
            <div className="w-24 h-1 bg-teal-600 mx-auto mt-6"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-lg h-[350px] md:h-[500px] mb-8">
              <TreatmentImage
                category="body-care"
                treatment="hair-removal"
                type="technology"
                index={1}
                alt="Triple Wavelength Technology"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Wavelength indicators - now as a responsive grid instead of absolute positioning */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-lg p-5 shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-teal-100 mb-4 flex items-center justify-center mx-auto">
                  <span className="text-teal-600 font-bold">755</span>
                </div>
                <h4 className="font-bold text-teal-600 text-center mb-2">755nm Wavelength</h4>
                <p className="text-sm text-gray-600 text-center">
                  Perfect for fine hair and fair skin. This wavelength is highly absorbed by melanin, making it ideal for targeting lighter, finer hair follicles.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-teal-100 mb-4 flex items-center justify-center mx-auto">
                  <span className="text-teal-600 font-bold">808</span>
                </div>
                <h4 className="font-bold text-teal-600 text-center mb-2">808nm Wavelength</h4>
                <p className="text-sm text-gray-600 text-center">
                  Optimal for medium hair and skin tones. This versatile wavelength penetrates deeper into the skin for effective targeting of average thickness hair follicles.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-teal-100 mb-4 flex items-center justify-center mx-auto">
                  <span className="text-teal-600 font-bold">1064</span>
                </div>
                <h4 className="font-bold text-teal-600 text-center mb-2">1064nm Wavelength</h4>
                <p className="text-sm text-gray-600 text-center">
                  Specialized for darker skin tones. This longer wavelength bypasses melanin in the skin to safely target hair follicles in deeper tissue without damaging surrounding skin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                <span className="text-teal-600">Revolutionary</span> Benefits
              </h2>
              <div className="w-20 h-1 bg-teal-600 mb-8"></div>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                      <line x1="16" y1="8" x2="2" y2="22" />
                      <line x1="17.5" y1="15" x2="9" y2="15" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">All Skin Types & Tones</h3>
                    <p className="text-gray-600">
                      Our advanced triple-wavelength technology safely treats all Fitzpatrick skin types I-VI, making it ideal for diverse skin tones from very fair to very dark.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Pain-Free Experience</h3>
                    <p className="text-gray-600">
                      Our integrated cooling system maintains skin temperature at 5°C during treatment, preventing discomfort and eliminating the need for numbing creams or pain medication.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
                      <path d="m7 10 3 3 7-7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Permanent Results</h3>
                    <p className="text-gray-600">
                      Achieve up to 90% permanent hair reduction after a full treatment course, with visible results after just the first few sessions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden h-[500px] relative shadow-lg">
              <TreatmentImage
                category="body-care"
                treatment="hair-removal"
                type="benefits"
                index={1}
                alt="SnowGlow Smooth Benefits"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Experience Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-3 text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                The <span className="text-teal-400">Premium</span> Experience
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Our laser hair removal service combines luxury, comfort, and cutting-edge technology for an unparalleled experience
              </p>
              <div className="w-24 h-1 bg-teal-400 mx-auto mt-6"></div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-teal-400 transition-colors">
              <div className="w-16 h-16 bg-teal-400/20 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Personalized Treatment Plans</h3>
              <p className="text-gray-300">
                Our specialists create a customized treatment plan based on your skin type, hair characteristics, and desired results to ensure optimal outcomes.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-teal-400 transition-colors">
              <div className="w-16 h-16 bg-teal-400/20 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 14.14 14.14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Luxury Treatment Suites</h3>
              <p className="text-gray-300">
                Relax in our premium private treatment rooms with temperature control, aromatherapy, and soothing music for maximum comfort during your session.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-teal-400 transition-colors">
              <div className="w-16 h-16 bg-teal-400/20 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Expert Technicians</h3>
              <p className="text-gray-300">
                Our certified laser specialists have extensive experience with all skin types and stay current with the latest advancements in laser technology.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-gray-800/80 rounded-xl p-8 border border-gray-700">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="shrink-0">
                  <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-teal-400 text-xl mb-2">"Life-changing results!"</div>
                  <p className="text-gray-300 italic mb-4">
                    After years of painful waxing and ingrown hairs, the SnowGlow Smooth treatments have been a revelation. The process was completely comfortable, and I'm now 6 months hair-free with no signs of regrowth. Absolutely worth every penny!
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Michelle T.</p>
                      <p className="text-sm text-gray-400">Marketing Executive</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Experience Silky-Smooth, Hair-Free Skin Today
          </h2>
          <p className="text-white/90 max-w-3xl mx-auto mb-8">
            Join thousands of satisfied clients who have achieved permanent hair reduction with our revolutionary SnowGlow Smooth technology. Book your consultation now and take the first step toward effortless, smooth skin.
          </p>
          <button className="bg-white hover:bg-gray-100 text-teal-700 font-medium py-3 px-10 rounded-md transition-colors shadow-lg">
            SCHEDULE CONSULTATION
          </button>
        </div>
      </section>
    </div>
  )
} 
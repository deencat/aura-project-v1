import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import PlaceholderImage from '@/components/PlaceholderImage'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center bg-white text-black">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                Tech-Forward <span className="text-primary">Clarity</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
                There is a vision of the inner contour we see at life, the artistic recomposition
                where at Soul You break all that, the energy for Clarity and Shape your 
                transformation and going to grow your ingenuity and our clarity&apos;s future.
              </p>
              
              <div className="mt-10">
                <Button className="rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
                  Explore Treatments
                </Button>
              </div>
            </div>
            
            <div className="relative flex items-center justify-center">
              <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-lg">
                <PlaceholderImage 
                  type="beauty" 
                  aspectRatio="aspect-[3/4]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-4xl font-bold text-black md:text-5xl">
              Tech-Forward <span className="text-primary">Clarity</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border border-gray-200 bg-white transition-all hover:shadow-md">
              <CardContent className="flex flex-col items-start p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
            </div>
                <h3 className="mb-2 text-xl font-semibold">Analyze New Contours</h3>
                <p className="text-gray-600">
                  Facial technology brings insight to face with the
                  newest color techs and get balance briefly
                  extending.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 bg-white transition-all hover:shadow-md">
              <CardContent className="flex flex-col items-start p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Free Specialized Glowing</h3>
                <p className="text-gray-600">
                  Get care path to reveal skin transformation and enhance
                  confidence you experience. Use our Tach for tech, and resonance
                  usage.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 bg-white transition-all hover:shadow-md">
              <CardContent className="flex flex-col items-start p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Creating a end for Aura Procedures</h3>
                <p className="text-gray-600">
                  The safe of self confidence about Advanced
                  facial healing your harmony and clarity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Treatments */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-4xl font-bold text-black md:text-5xl">
              Tech-Forward <span className="text-primary">Clarity</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              There's another way about your future from the essential innovation
              focused on giving you the best path with on-demand facials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg">
              <AspectRatio ratio={4/3}>
                <PlaceholderImage 
                  type="treatment" 
                  number={1}
                  aspectRatio="aspect-[4/3]"
                />
              </AspectRatio>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <PlaceholderImage 
                    type="avatar" 
                    aspectRatio=""
                    className="h-full w-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">Recommended Treatments</h3>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Long Precision</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Face Management in detail</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Skin has a problem in both a nature</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Full R&R in</span>
                </div>
              </div>
              
              <div className="mt-8 flex">
                <div className="mr-6">
                  <div className="text-3xl font-semibold text-primary">11</div>
                  <div className="text-sm text-gray-500">total modules</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-primary">6%</div>
                  <div className="text-sm text-gray-500">face cleans</div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
                  Find More
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col items-center justify-between space-y-4 rounded-lg bg-white p-6 shadow-md md:flex-row md:space-y-0">
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/></svg>
              <span>Touch to send about team</span>
            </div>
            <Button className="rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
              Getting Started
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-lg">
              <AspectRatio ratio={3/4}>
                <PlaceholderImage 
                  type="benefits" 
                  aspectRatio="aspect-[3/4]"
                />
              </AspectRatio>
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-4xl font-bold text-black md:text-5xl">
                Lock festing my <span className="text-primary">Benefits</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Experience the power of advanced beauty technology with our comprehensive treatment solutions.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Royal Black Scan',
                  'Smooth Egg Skin',
                  'Collagen Regeneration',
                  '360 Smart Rescue',
                  'Farewell Puffy Face',
                  'Desert Skin Rescue'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                      {index + 1}
                    </div>
                    <span className="text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button className="rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
                  View All Treatments
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold text-black md:text-5xl">
            Ready to experience <span className="text-primary">transformation</span>?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
            Discover our tech-forward beauty treatments and unlock your natural radiance.
          </p>
          <Button className="rounded-full bg-primary px-10 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
            Book Consultation
          </Button>
        </div>
      </section>
    </div>
  )
} 
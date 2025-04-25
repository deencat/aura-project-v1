import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PlaceholderImage from '@/components/PlaceholderImage'
import { Sparkles, ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import Image from 'next/image'
import ResultsGraph from '@/components/ResultsGraph'

// Add types for component props
interface BeforeAfterSliderProps {
  clientName: string;
  age: string;
  concern: string;
  sessions: number;
}

interface FaqItemProps {
  question: string;
  answer: string;
}

// Add new SkinLayersInfographic component with updated colors
const SkinLayersInfographic = () => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-white to-gray-50 p-4">
      <h3 className="text-lg font-bold text-center mb-4">Treatment Penetration Depth</h3>
      <div className="relative h-[320px]">
        {/* Skin layer visualization */}
        <div className="absolute inset-x-0 h-full flex flex-col">
          {/* Epidermis Layer */}
          <div className="h-[15%] bg-gradient-to-b from-blue-50 to-blue-100 rounded-t-lg border-b border-gray-300 relative">
            <div className="absolute inset-0 flex items-center justify-end pr-4">
              <span className="text-xs font-medium">Epidermis</span>
            </div>
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-xs text-primary font-bold">0.5mm</span>
            </div>
          </div>
          
          {/* Dermis Layer */}
          <div className="h-[30%] bg-gradient-to-b from-blue-100 to-blue-200 border-b border-gray-300 relative">
            <div className="absolute inset-0 flex items-center justify-end pr-4">
              <span className="text-xs font-medium">Dermis</span>
            </div>
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-xs text-primary font-bold">1.5mm</span>
            </div>
          </div>
          
          {/* Subcutaneous Fat */}
          <div className="h-[20%] bg-gradient-to-b from-yellow-50 to-yellow-100 border-b border-gray-300 relative">
            <div className="absolute inset-0 flex items-center justify-end pr-4">
              <span className="text-xs font-medium">Subcutaneous</span>
            </div>
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-xs text-primary font-bold">3.0mm</span>
            </div>
          </div>
          
          {/* SMAS Layer */}
          <div className="h-[20%] bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300 relative">
            <div className="absolute inset-0 flex items-center justify-end pr-4">
              <span className="text-xs font-medium">SMAS Layer</span>
            </div>
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-xs text-primary font-bold">4.5mm</span>
            </div>
          </div>
          
          {/* Muscle Layer */}
          <div className="h-[15%] bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-lg relative">
            <div className="absolute inset-0 flex items-center justify-end pr-4">
              <span className="text-xs font-medium">Muscle</span>
            </div>
          </div>
        </div>
        
        {/* Energy visualization */}
        <div className="absolute left-1/2 top-0 h-full w-[1px] border-l-2 border-dashed border-gray-400"></div>
        
        {/* Treatment points */}
        <div className="absolute left-1/2 top-[15%] transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-yellow-400 rounded-full shadow-sm flex items-center justify-center z-20">
          <span className="text-[8px] font-bold">4RF</span>
        </div>
        
        <div className="absolute left-1/2 top-[35%] transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full shadow-sm flex items-center justify-center z-20">
          <span className="text-[8px] text-white font-bold">MFU</span>
        </div>
        
        <div className="absolute left-1/2 top-[70%] transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gray-600 rounded-full shadow-sm flex items-center justify-center z-20">
          <span className="text-[8px] text-white font-bold">MFU</span>
        </div>
      </div>
      <div className="text-xs text-center mt-3 px-2 text-gray-500">
        New Doublo™ technology targets multiple skin depths simultaneously for comprehensive lifting and contouring effects
      </div>
    </div>
  )
}

// Update component definitions with proper TypeScript types
const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ clientName, age, concern, sessions }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md bg-white">
      <div className="aspect-[4/3] w-full relative">
        <div className="absolute inset-0 flex">
          {/* Before image - left side */}
          <div className="w-1/2 relative overflow-hidden border-r border-white">
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs py-1 px-2 rounded-md z-10">
              BEFORE
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-200">
              <PlaceholderImage 
                page="new-doublo" 
                section="results-before"
                number={1} 
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </div>
          
          {/* After image - right side */}
          <div className="w-1/2 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs py-1 px-2 rounded-md z-10">
              AFTER
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100">
              <PlaceholderImage 
                page="new-doublo" 
                section="results-after"
                number={1} 
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </div>
          
          {/* Center slider line */}
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-white shadow-md z-10"></div>
          
          {/* Slider handle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg z-20 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
          </div>
          
          {/* Overlay text */}
          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-sm py-1 px-3 rounded-md z-10">
            Slide to compare
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary">{clientName}, {age}</p>
            <p className="text-xs text-gray-500">Results after {sessions} {sessions === 1 ? 'session' : 'sessions'}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Concern: {concern}</p>
            <p className="text-xs text-gray-500">No filters or editing</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add new TreatmentAreaVisualization component
const TreatmentAreaVisualization = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-center mb-6">Treatment Target Areas</h3>
      <div className="relative aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <PlaceholderImage 
            page="new-doublo" 
            section="face-diagram"
            number={1} 
            aspectRatio="aspect-[3/4]"
          />
        </div>
        
        {/* Forehead treatment area */}
        <div className="absolute top-[15%] left-[50%] transform -translate-x-1/2 w-[60%] h-[10%]">
          <div className="absolute inset-0 border-2 border-dashed border-primary/40 rounded-full"></div>
          <div className="absolute -right-24 top-0 bg-white/90 shadow-md rounded-lg p-2 text-xs">
            <p className="font-bold text-primary">Forehead</p>
            <p className="text-gray-600">Smooths frown lines</p>
          </div>
        </div>
        
        {/* Cheekbones treatment area */}
        <div className="absolute top-[40%] left-[30%] transform -translate-x-1/2 w-[20%] h-[15%]">
          <div className="absolute inset-0 border-2 border-dashed border-primary/60 rounded-full"></div>
          <div className="absolute -left-24 top-0 bg-white/90 shadow-md rounded-lg p-2 text-xs">
            <p className="font-bold text-primary">Cheekbones</p>
            <p className="text-gray-600">Defines & lifts</p>
          </div>
        </div>
        
        <div className="absolute top-[40%] right-[30%] transform translate-x-1/2 w-[20%] h-[15%]">
          <div className="absolute inset-0 border-2 border-dashed border-primary/60 rounded-full"></div>
          <div className="absolute -right-24 top-0 bg-white/90 shadow-md rounded-lg p-2 text-xs">
            <p className="font-bold text-primary">Cheekbones</p>
            <p className="text-gray-600">Defines & lifts</p>
          </div>
        </div>
        
        {/* Jawline treatment area */}
        <div className="absolute bottom-[25%] left-[50%] transform -translate-x-1/2 w-[70%] h-[10%]">
          <div className="absolute inset-0 border-2 border-dashed border-primary/80 rounded-full"></div>
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white/90 shadow-md rounded-lg p-2 text-xs">
            <p className="font-bold text-primary">Jawline</p>
            <p className="text-gray-600">Contours & sharpens</p>
          </div>
        </div>
        
        {/* Neck treatment area */}
        <div className="absolute bottom-[10%] left-[50%] transform -translate-x-1/2 w-[40%] h-[8%]">
          <div className="absolute inset-0 border-2 border-dashed border-primary/40 rounded-full"></div>
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white/90 shadow-md rounded-lg p-2 text-xs">
            <p className="font-bold text-primary">Neck</p>
            <p className="text-gray-600">Tightens loose skin</p>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        Our targeted approach addresses multiple areas in a single treatment
      </div>
    </div>
  )
}

// Redefine the FaqItem component with explicit types
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="rounded-lg bg-gray-50 transition-all duration-300 hover:shadow-md">
      <div className="cursor-pointer p-6">
        <h3 className="mb-3 text-lg font-bold flex items-center justify-between">
          {question}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </h3>
        <p className="text-gray-600">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function SculptLiftPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <Image
            src="/images/backgrounds/new-doublo-hero.jpg"
            alt="Sculpt & Lift Treatment"
            fill
            className="object-cover object-center opacity-80"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start">
          <div className="max-w-2xl">
            <div className="mb-3 inline-block px-4 py-1 bg-primary/80 text-white rounded-full text-sm font-medium">
              REVOLUTIONARY TECHNOLOGY
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Experience The Next Level In <span className="text-primary">Non-Surgical Lifting</span>
            </h1>
            <p className="text-white text-lg md:text-xl mb-8 max-w-xl">
              Achieve the lifted, sculpted face you've always wanted without surgery. Our advanced Doublo Sculpt & Lift treatment delivers visible results from the first session with zero downtime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white/90 rounded-lg p-4 shadow-lg max-w-xs">
                <h3 className="font-bold text-primary text-lg">✓ Clinically Proven</h3>
                <p className="text-gray-700">Visible lifting effect after just one treatment</p>
              </div>
              <div className="bg-white/90 rounded-lg p-4 shadow-lg max-w-xs">
                <h3 className="font-bold text-primary text-lg">✓ No Downtime</h3>
                <p className="text-gray-700">Return to daily activities immediately</p>
              </div>
            </div>
            <Link
              href="/booking"
              className="mt-8 inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              BOOK YOUR CONSULTATION NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="learn-more" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Why Choose <span className="text-primary">Sculpt & Lift</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Our signature treatment combines New Doublo™'s dual technologies to lift, contour, 
              and define your features without surgery or downtime.
            </p>
          </div>
          
          {/* Visual benefits with icons and percentages */}
          <div className="mt-16 mb-20 flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 text-center">
              <div className="relative mx-auto w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full bg-gray-100"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-primary">87%</span>
                    <span className="text-sm text-gray-600">Satisfaction</span>
                  </div>
                </div>
                <svg className="absolute inset-0" width="128" height="128" viewBox="0 0 128 128">
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="60" 
                    fill="none" 
                    stroke="#e5e7eb" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="60" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    strokeDasharray="377" 
                    strokeDashoffset="49" 
                    className="text-primary"
                    transform="rotate(-90 64 64)"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Client Satisfaction</h3>
              <p className="text-gray-600 text-sm">
                Clients report high satisfaction with visible results after first treatment
              </p>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 text-center">
              <div className="relative mx-auto w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full bg-gray-100"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-primary">0</span>
                    <span className="text-sm text-gray-600">Recovery Time</span>
                  </div>
                </div>
                <svg className="absolute inset-0" width="128" height="128" viewBox="0 0 128 128">
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="60" 
                    fill="none" 
                    stroke="#e5e7eb" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="60" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    strokeDasharray="377" 
                    strokeDashoffset="0" 
                    className="text-primary"
                    transform="rotate(-90 64 64)"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Zero Downtime</h3>
              <p className="text-gray-600 text-sm">
                Return to your normal activities immediately after treatment
              </p>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 text-center">
              <div className="relative mx-auto w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full bg-gray-100"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-primary">18</span>
                    <span className="text-sm text-gray-600">Months</span>
                  </div>
                </div>
                <svg className="absolute inset-0" width="128" height="128" viewBox="0 0 128 128">
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="60" 
                    fill="none" 
                    stroke="#e5e7eb" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="60" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    strokeDasharray="377" 
                    strokeDashoffset="94" 
                    className="text-primary"
                    transform="rotate(-90 64 64)"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Long-Lasting Results</h3>
              <p className="text-gray-600 text-sm">
                Results typically last 12-18 months with proper maintenance
              </p>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 text-center">
              <div className="relative mx-auto w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full bg-gray-100"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-primary">3x</span>
                    <span className="text-sm text-gray-600">Better</span>
                  </div>
                </div>
                <svg className="absolute inset-0" width="128" height="128" viewBox="0 0 128 128">
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="60" 
                    fill="none" 
                    stroke="#e5e7eb" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="60" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    strokeDasharray="377" 
                    strokeDashoffset="113" 
                    className="text-primary"
                    transform="rotate(-90 64 64)"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold">More Effective</h3>
              <p className="text-gray-600 text-sm">
                3x more effective than traditional HIFU treatments
              </p>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col rounded-lg bg-gray-50 p-8">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Instant Results</h3>
              <p className="text-gray-600">
                See visible lifting and contouring immediately after your first session—perfect for special events and photoshoots.
              </p>
            </div>
            
            <div className="flex flex-col rounded-lg bg-gray-50 p-8">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Natural Lift</h3>
              <p className="text-gray-600">
                Unlike fillers or surgery, our treatment stimulates your body's natural collagen production for genuine, long-lasting results.
              </p>
            </div>
            
            <div className="flex flex-col rounded-lg bg-gray-50 p-8">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7-3 5 3 5"/><path d="m19 7 3 5-3 5"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Multi-Dimensional</h3>
              <p className="text-gray-600">
                Targets different layers of skin and muscle for comprehensive contouring that addresses all facial structure concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Comparison Section */}
      <section className="bg-gray-50 py-20 border-t border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Advanced <span className="text-primary">Technology</span> Comparison
            </h2>
            <p className="mt-4 text-gray-600">
              See how our New Doublo™ Sculpt & Lift treatment compares to other facial treatments
            </p>
          </div>
          
          <div className="mt-12 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="py-4 px-6 bg-gray-100 text-center text-xs font-medium text-primary uppercase tracking-wider">
                    <div className="flex flex-col items-center">
                      <span className="text-base font-bold text-primary mb-1">New Doublo™</span>
                      <span className="text-xs">Sculpt & Lift</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex flex-col items-center">
                      <span className="text-base font-bold text-gray-700 mb-1">Traditional HIFU</span>
                      <span className="text-xs">Single Technology</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex flex-col items-center">
                      <span className="text-base font-bold text-gray-700 mb-1">Surgical Facelift</span>
                      <span className="text-xs">Invasive Procedure</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    Downtime
                  </td>
                  <td className="py-4 px-6 text-sm text-center bg-gray-50">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      None
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      None
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      2-4 Weeks
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    Immediate Results
                  </td>
                  <td className="py-4 px-6 text-sm text-center bg-gray-50">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Yes ✓
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Partial
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      After Healing
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    Dual Technology
                  </td>
                  <td className="py-4 px-6 text-sm text-center bg-gray-50">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Yes ✓
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      No
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      No
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    Multiple Depth Targeting
                  </td>
                  <td className="py-4 px-6 text-sm text-center bg-gray-50">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      3+ Depths
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      1-2 Depths
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Yes ✓
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    Natural Results
                  </td>
                  <td className="py-4 px-6 text-sm text-center bg-gray-50">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Yes ✓
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Yes ✓
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Varies
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    Cost-Effectiveness
                  </td>
                  <td className="py-4 px-6 text-sm text-center bg-gray-50">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      High
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Medium
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Low
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Treatment Details */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div>
                <span className="text-sm font-medium uppercase tracking-wider text-primary">The Process</span>
                <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
                  How It <span className="text-primary">Works</span>
                </h2>
                <p className="mt-4 text-gray-600">
                  The Sculpt & Lift treatment uses New Doublo™'s revolutionary dual-action technology 
                  to redefine your facial structure with precision.
                </p>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-primary">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Personalized Assessment</h3>
                      <p className="text-gray-600">
                        We analyze your facial structure, skin condition, and aesthetic goals to create a customized treatment plan.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-primary">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">MFU Deep Targeting</h3>
                      <p className="text-gray-600">
                        Micro-Focused Ultrasound energy penetrates deep into the skin's SMAS layer to lift and tighten from within.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-primary">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">4RF Precision Contouring</h3>
                      <p className="text-gray-600">
                        Advanced 4RF technology precisely contours key areas like cheekbones and jawline for defined features.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-primary">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Ongoing Collagen Stimulation</h3>
                      <p className="text-gray-600">
                        Results continue to improve for up to 90 days as new collagen fibers strengthen and lift your skin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative mx-auto max-w-md">
                <SkinLayersInfographic />
                <div className="absolute -bottom-4 -right-4 rounded-lg bg-white p-4 shadow-lg">
                  <p className="text-sm font-bold">Treatment Time: <span className="text-primary">45-60 minutes</span></p>
                </div>
              </div>
            </div>
            
            {/* Results timeline - replacing the problematic ResultsGraph component */}
            <div className="mt-16 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-center mb-6">How Results Develop Over Time</h3>
              <p className="text-center text-gray-600 mb-8">Our dual-technology approach delivers immediate results that continue to improve</p>
              
              <div className="relative">
                {/* Timeline bar */}
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2"></div>
                
                {/* Timeline points */}
                <div className="flex justify-between relative">
                  <div className="text-center">
                    <div className="w-4 h-4 rounded-full bg-primary mx-auto mb-2 relative z-10"></div>
                    <p className="font-medium">Day 1</p>
                    <p className="text-sm text-gray-600">Initial Results</p>
                    <p className="text-xs text-gray-500">30% Improvement</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300 mx-auto mb-3 relative z-10"></div>
                    <p className="text-sm text-gray-600">Week 2</p>
                    <p className="text-xs text-gray-500">40% Improvement</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-4 h-4 rounded-full bg-primary mx-auto mb-2 relative z-10"></div>
                    <p className="font-medium">Week 8</p>
                    <p className="text-sm text-gray-600">Enhanced Results</p>
                    <p className="text-xs text-gray-500">70% Improvement</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300 mx-auto mb-3 relative z-10"></div>
                    <p className="text-sm text-gray-600">Week 12</p>
                    <p className="text-xs text-gray-500">85% Improvement</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-4 h-4 rounded-full bg-primary mx-auto mb-2 relative z-10"></div>
                    <p className="font-medium">Week 16</p>
                    <p className="text-sm text-gray-600">Optimal Results</p>
                    <p className="text-xs text-gray-500">95% Improvement</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center text-sm text-gray-500">
                Results continue to improve over time as collagen production increases
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 text-primary mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 8v13H3V8"></path>
                    <path d="M1 3h22v5H1z"></path>
                    <path d="M10 12h4"></path>
                  </svg>
                </div>
                <p className="text-center font-medium">Day 1</p>
                <p className="text-center text-sm text-gray-600">
                  Immediate visible lifting and contouring effect
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 text-primary mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <p className="text-center font-medium">Weeks 2-8</p>
                <p className="text-center text-sm text-gray-600">
                  Continued improvement as collagen regenerates
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 text-primary mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p className="text-center font-medium">Week 12+</p>
                <p className="text-center text-sm text-gray-600">
                  Optimal results visible with improved facial contours
                </p>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center text-xl font-bold">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  Perfect For You If:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary" />
                    <span>You want more defined cheekbones and a sculpted face</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary" />
                    <span>You're noticing early signs of skin laxity or sagging</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary" />
                    <span>You prefer natural results without surgery or fillers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary" />
                    <span>You want a treatment with zero downtime</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-4 w-4 text-primary" />
                    <span>You're aged 25-35 and want preventative treatment</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center text-xl font-bold">
                  <XCircle className="mr-2 h-5 w-5 text-red-500" />
                  Not Recommended If:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <XCircle className="mr-2 mt-1 h-4 w-4 text-red-500" />
                    <span>You're pregnant or breastfeeding</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="mr-2 mt-1 h-4 w-4 text-red-500" />
                    <span>You have active skin infections in the treatment area</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="mr-2 mt-1 h-4 w-4 text-red-500" />
                    <span>You have a pacemaker or metal implants in the face/neck</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="mr-2 mt-1 h-4 w-4 text-red-500" />
                    <span>You've had dermal fillers in the last 2 weeks</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="mr-2 mt-1 h-4 w-4 text-red-500" />
                    <span>You have severe skin laxity (better options available)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Real <span className="text-primary">Results</span>
            </h2>
            <p className="mt-4 text-gray-600">
              See the transformation our clients experienced with the New Doublo™ Sculpt & Lift treatment.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <BeforeAfterSlider 
              clientName="Jenny"
              age="28"
              concern="Undefined jawline"
              sessions={1}
            />
            
            <BeforeAfterSlider 
              clientName="Mei"
              age="33"
              concern="Sagging cheeks"
              sessions={2}
            />
          </div>
          
          <div className="mt-16 py-6 px-8 bg-gray-50 rounded-2xl">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">What Our Clients Say</h3>
            </div>
            
            <div className="relative overflow-hidden">
              <div className="relative">
                <blockquote className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full overflow-hidden mb-4">
                    <PlaceholderImage 
                      page="new-doublo" 
                      section="testimonial"
                      number={1} 
                      aspectRatio="aspect-square"
                    />
                  </div>
                  <p className="italic text-gray-600 max-w-2xl mx-auto">
                    "I've tried numerous treatments for my sagging cheeks, but nothing worked as effectively as New Doublo's Sculpt & Lift. After just one session, my friends asked if I'd had surgery! The results are natural-looking and I'm absolutely thrilled."
                  </p>
                  <footer className="mt-4">
                    <p className="text-primary font-semibold">Sarah L.</p>
                    <p className="text-xs text-gray-500">Marketing Executive, Age 34</p>
                  </footer>
                </blockquote>
              </div>
              
              <div className="flex justify-center mt-8">
                <button className="w-2 h-2 mx-1 rounded-full bg-primary"></button>
                <button className="w-2 h-2 mx-1 rounded-full bg-gray-300"></button>
                <button className="w-2 h-2 mx-1 rounded-full bg-gray-300"></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Offer Section */}
      <section className="relative bg-gray-50 py-20">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-10 text-center shadow-lg md:p-16">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Limited Time <span className="text-primary">Offer</span>
            </h2>
            <p className="mt-6 text-xl text-gray-600">
              First-time clients receive <span className="font-bold text-primary">20% off</span> their initial Sculpt & Lift session
            </p>
            
            <div className="mt-6 rounded-lg bg-gray-50 p-6">
              <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="text-lg font-medium">Single Session:</p>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-primary">HK$1,880</span>
                    <span className="ml-3 text-lg text-gray-500 line-through">HK$2,350</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-lg font-medium">Package of 3:</p>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-primary">HK$4,980</span>
                    <span className="ml-3 text-lg text-gray-500 line-through">HK$7,050</span>
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-xs text-gray-500">
                *Offer valid for first-time clients only. Cannot be combined with other promotions.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full bg-primary px-8 text-white hover:bg-primary/90">
                  Book Your Session
                </Button>
              </Link>
              <Link href="tel:+85212345678">
                <Button size="lg" variant="outline" className="rounded-full border-primary px-8 text-primary hover:bg-primary hover:text-white">
                  Call For Inquiry
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Left column - FAQs */}
            <div className="space-y-4">
              <FaqItem 
                question="Is the Sculpt & Lift treatment painful?"
                answer="Most clients experience minimal discomfort—just a warm sensation and slight pressure. Our treatment uses the latest technology to minimize discomfort while maximizing results."
              />
              
              <FaqItem 
                question="How soon will I see results?"
                answer="You'll notice initial lifting immediately after treatment. Full results develop gradually over 2-3 months as collagen production increases, with optimal results appearing around 90 days."
              />
              
              <FaqItem 
                question="How long do the results last?"
                answer="Results typically last 12-18 months depending on your skin condition and maintenance routine. We recommend maintenance sessions every 6-12 months for optimal long-term results."
              />
              
              <FaqItem 
                question="Is there any downtime?"
                answer="No downtime! You can return to your normal activities immediately after treatment, making it perfect for busy professionals who can't take time off for recovery."
              />
              
              <FaqItem 
                question="How many sessions do I need?"
                answer="For optimal results, we recommend a series of 1-3 sessions spaced 4-6 weeks apart, depending on your age and skin condition. Your specialist will create a personalized treatment plan during your consultation."
              />
              
              <FaqItem 
                question="How is this different from other HIFU treatments?"
                answer="New Doublo™ combines MFU with proprietary 4RF technology for more comprehensive results than standard HIFU. It targets multiple layers with greater precision, delivering both immediate and long-term improvements."
              />
            </div>
            
            {/* Right column - Treatment area visualization */}
            <div className="flex items-center justify-center">
              <TreatmentAreaVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ready For <span className="text-primary">Instagram-Ready</span> Cheekbones?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Book your Sculpt & Lift consultation today and take the first step toward 
            a more defined, sculpted face—no filters needed.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button size="lg" className="rounded-full bg-primary px-10 py-6 text-white hover:bg-primary/90">
                Book Your Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
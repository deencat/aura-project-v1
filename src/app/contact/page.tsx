import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '@/components/PlaceholderImage'

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Get in touch with our team to book an appointment or learn more about our tech-forward beauty treatments.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Information Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                Send Us a <span className="text-primary">Message</span>
              </h2>
              
              <form className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="mb-2 block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="w-full rounded-md border-gray-300 bg-white p-3 text-sm shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Your first name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="last-name" className="mb-2 block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="w-full rounded-md border-gray-300 bg-white p-3 text-sm shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-md border-gray-300 bg-white p-3 text-sm shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full rounded-md border-gray-300 bg-white p-3 text-sm shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-md border-gray-300 bg-white p-3 text-sm shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <div>
                  <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
            
            <div>
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                Contact <span className="text-primary">Information</span>
              </h2>
              
              <div className="mt-8 space-y-8">
                <Card className="overflow-hidden border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Main Location</h3>
                    <div className="space-y-4 text-gray-700">
                      <p className="flex items-start">
                        <svg className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>7/F, Cameron Commercial Building, 18-20 Cameron Road, Tsim Sha Tsui</span>
                      </p>
                      <p className="flex items-start">
                        <svg className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <span>+852 9831 3610</span>
                      </p>
                      <p className="flex items-start">
                        <svg className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2"/>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                        <span>info@freshenpage.com</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">Opening Hours</h3>
                    <div className="space-y-2 text-gray-700">
                      <p className="flex justify-between">
                        <span>Monday - Saturday</span>
                        <span className="font-medium">12:00 PM - 9:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium">Closed</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <div className="aspect-[16/9] w-full">
                    <PlaceholderImage 
                      type="map" 
                      aspectRatio="aspect-[16/9]"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-primary hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-primary hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-primary hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ready to Begin Your <span className="text-primary">Beauty Journey</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Get in touch with us today to schedule your appointment or consultation.
          </p>
          <div className="mt-10">
            <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90">
              Book Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 
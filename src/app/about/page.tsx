import React from 'react'
import { Button } from '@/components/ui/button'
import PlaceholderImage from '@/components/PlaceholderImage'

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              About <span className="text-primary">Freshen Page</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Discover our tech-forward beauty approach and the story behind our innovative treatments.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="mt-8 space-y-6 text-gray-700">
                <p>
                  Freshen Page Beauty has been dedicated to providing diverse, effective, and safe treatments. Our beauty center brings together professional equipment and techniques from various sources to deliver the most attentive, suitable, and optimal service experience for each client, protecting every inch of your skin from the inside out.
                </p>
                <p>
                  Our primary mission at Freshen Page Beauty is to provide exceptional tech-forward beauty services to help each client achieve their beauty goals. Unlike typical beauty salons, at Freshen Page Beauty, our technicians deeply believe that each client is unique, so they design and provide personalized beauty treatments.
                </p>
                <p>
                  Our technicians carefully listen to your needs and develop beauty plans tailored for you. Our mission is to showcase every woman&apos;s most beautiful side and provide the highest quality service, making us a leading beauty center.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg">
                <PlaceholderImage 
                  type="about" 
                  aspectRatio="aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="mt-4 text-gray-600">
              We're committed to providing the best possible experience for our clients through these core values.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              </div>
              <h3 className="mb-4 text-xl font-bold">Safety First</h3>
              <p className="text-gray-600">
                We prioritize client safety and treatment quality. Our equipment is FDA-certified, maintained regularly, and our technical team receives strict professional training.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h3 className="mb-4 text-xl font-bold">Personalized Care</h3>
              <p className="text-gray-600">
                We believe every client is unique. Our technicians design personalized treatment plans after careful consultation, delivering results that meet your specific needs.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 22 4-10 4 10"/><path d="M12 11V2"/></svg>
              </div>
              <h3 className="mb-4 text-xl font-bold">Innovation</h3>
              <p className="text-gray-600">
                We continuously seek improvement and innovation. We listen to client feedback, enhance treatment content, and introduce the latest beauty technologies to meet client needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
              Our <span className="text-primary">Expert Team</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Meet our skilled professionals dedicated to helping you achieve your beauty goals.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md">
                <div className="aspect-[3/4] w-full bg-gray-100 relative">
                  <PlaceholderImage 
                    type="team" 
                    number={item}
                    aspectRatio="aspect-[3/4]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold">Sophia Chen</h3>
                  <p className="text-sm text-gray-500">Senior Beauty Technician</p>
                  <p className="mt-4 text-sm text-gray-700">
                    Certified in advanced facial treatments with 8+ years of experience in tech-forward beauty solutions.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Find answers to commonly asked questions about our services.
            </p>
          </div>
          
          <div className="mt-12 mx-auto max-w-3xl">
            <div className="space-y-6">
              {[
                {
                  question: 'Do you provide free initial consultations?',
                  answer: 'Yes, Freshen Page Beauty provides free initial consultations to help clients understand which treatments suit their needs and requirements. You can schedule a free consultation to learn more about our beauty treatment information.'
                },
                {
                  question: 'Can I specify a particular beauty technician?',
                  answer: 'Yes, at Freshen Page Beauty you can request any available beauty technician to provide your service. Please notify us when making your appointment if you would like to specify a particular technician.'
                },
                {
                  question: 'What are your operating hours?',
                  answer: 'Our operating hours are Monday to Saturday from 12:00 – 21:00. We are closed on Sundays and public holidays.'
                },
                {
                  question: 'Can I reschedule or cancel my appointment?',
                  answer: 'Yes, if you have an appointment at Freshen Page Beauty but are unable to attend, you can change the time or cancel the service according to our change/cancellation policy by calling us in advance.'
                }
              ].map((faq, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ready to Experience <span className="text-primary">Transformation</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Book your consultation today and discover the perfect treatment plan for your unique beauty goals.
          </p>
          <div className="mt-10">
            <Button className="rounded-full bg-primary px-8 py-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
              Book Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 
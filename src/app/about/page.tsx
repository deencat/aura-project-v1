import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PlaceholderImage from '@/components/PlaceholderImage'

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              About <span className="text-primary">Aura Beauty</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              We Care. We Beautify. Eternally.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                Our <span className="text-primary">Story</span>
              </h2>
            </div>
            <div className="text-lg leading-relaxed text-gray-600">
              <p className="mb-6">
                Aura Beauty Medical Aesthetic Center has always been committed to providing clients with diverse, effective, and safe treatment programs. Our beauty center brings together professional treatment equipment and techniques from different places, striving to provide each client with the most attentive, suitable, and optimal service experience, protecting every inch of your skin from the inside out.
              </p>
              <p>
                Founded with a passion for transforming the beauty industry, Aura Beauty has grown from a small clinic to a premier beauty destination. Our journey began with a simple belief: everyone deserves to feel confident and beautiful in their own skin. This philosophy has guided our approach to beauty treatments, focusing on natural enhancement rather than dramatic change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                Our <span className="text-primary">Mission</span>
              </h2>
            </div>
            <div className="text-lg leading-relaxed text-gray-600">
              <p className="mb-6">
                The primary mission of Aura Beauty Medical Aesthetic Center is to provide exceptional medical beauty services to help each client achieve their beauty goals. Unlike ordinary beauty salons, at Aura Beauty, our beauticians deeply believe that each client is unique, so they design and provide personalized beauty treatment programs. They listen carefully to your needs and formulate a beauty plan that suits you.
              </p>
              <p className="mb-6">
                Our mission is to showcase the most beautiful side of every woman, providing the highest quality service, making us the leading beauty center. Our professional team of beauticians undergoes rigorous training and certification. They not only possess the most professional beauty knowledge but also have rich practical experience in beauty treatments.
              </p>
              <p>
                Aura Beauty Medical Aesthetic Center is committed to introducing and applying the latest beauty technologies and the most advanced international-grade medical beauty equipment to ensure that our clients receive the highest quality beauty treatments. We continuously upgrade and update our equipment to maintain our leading position in the beauty industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                Our <span className="text-primary">Values</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Client-Centered</h3>
                <p className="text-gray-600">
                  We deeply understand that client satisfaction is the key to our success, so we center our approach on your needs and expectations.
                </p>
              </div>
              
              <div className="rounded-lg bg-gray-50 p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Safety First</h3>
                <p className="text-gray-600">
                  We prioritize client safety and treatment quality, using FDA-certified beauty equipment and maintaining strict quality control.
                </p>
              </div>
              
              <div className="rounded-lg bg-gray-50 p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">Innovation</h3>
                <p className="text-gray-600">
                  We continuously seek improvement and innovation, listening to client feedback and introducing the latest beauty technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                Our <span className="text-primary">Expert Team</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Our highly trained specialists bring years of experience and passion to every treatment
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((num) => (
                <div key={num} className="overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-[3/4] w-full">
                    <PlaceholderImage 
                      type="team" 
                      number={num} 
                      aspectRatio="aspect-[3/4]"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold">{`Dr. ${['Emma Wilson', 'Michael Chen', 'Sophia Rodriguez'][num-1]}`}</h3>
                    <p className="mb-4 text-primary">{['Lead Aesthetician', 'Skincare Specialist', 'Beauty Technologist'][num-1]}</p>
                    <p className="text-gray-600">
                      {[
                        'Specialized in advanced facial treatments with over 10 years of experience in the beauty industry.',
                        'Expert in cellular therapy and regenerative treatments, helping clients achieve natural results.',
                        'Pioneer in AI beauty technology, bringing cutting-edge solutions to our beauty center.'
                      ][num-1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                Why Choose <span className="text-primary">Aura Beauty</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">1</div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Advanced Technology</h3>
                  <p className="text-gray-600">
                    We invest in the latest beauty technologies to provide the most effective treatments available on the market.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">2</div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Customized Solutions</h3>
                  <p className="text-gray-600">
                    We understand that each client is unique, and we tailor our treatments to meet your specific needs and concerns.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">3</div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Expert Team</h3>
                  <p className="text-gray-600">
                    Our team of professionals is continuously trained on the latest techniques and technologies in the beauty industry.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">4</div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Lasting Results</h3>
                  <p className="text-gray-600">
                    We focus on treatments that provide not just immediate improvements but long-lasting beauty results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-3 text-xl font-bold">Do you offer consultations before treatments?</h3>
                <p className="text-gray-600">
                  Yes, we provide free initial consultations to help clients understand the treatments suitable for their needs and to offer personalized recommendations.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-3 text-xl font-bold">Are your treatments FDA-approved?</h3>
                <p className="text-gray-600">
                  Yes, all our beauty equipment and treatments are FDA-certified and regularly maintained to ensure client safety and optimal results.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-3 text-xl font-bold">How do I schedule an appointment?</h3>
                <p className="text-gray-600">
                  You can schedule an appointment through our website, by phone, or by visiting our center. We recommend booking in advance to secure your preferred time slot.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-3 text-xl font-bold">Do you offer payment plans?</h3>
                <p className="text-gray-600">
                  Yes, we offer various payment options, including installment plans, to make our treatments more accessible to clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Experience the <span className="text-primary">Aura Difference</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Book a consultation with our expert team and discover why so many clients trust us with their beauty needs.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
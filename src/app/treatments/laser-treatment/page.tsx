import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import PlaceholderImage from '@/components/PlaceholderImage'

export default function LaserTreatmentPage() {
  const [images, setImages] = useState([
    { src: '/placeholder-beauty.png', alt: 'Laser treatment results 1' },
    { src: '/placeholder-beauty.png', alt: 'Laser treatment results 2' },
    { src: '/placeholder-beauty.png', alt: 'Laser treatment results 3' },
    { src: '/placeholder-beauty.png', alt: 'Laser treatment results 4' },
    { src: '/placeholder-beauty.png', alt: 'Laser treatment results 5' },
  ])
  
  const [activeIndex, setActiveIndex] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (carouselRef.current) {
      // Calculate number of visible slides
      const containerWidth = carouselRef.current.offsetWidth
      const slideWidth = 280 // Width of each slide + gap
      const visibleSlides = Math.floor(containerWidth / slideWidth)
      
      setTotalSlides(Math.max(1, images.length - visibleSlides + 1))
    }
  }, [images.length])

  const scrollTo = (index: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current
      const scrollWidth = container.scrollWidth
      const containerWidth = container.offsetWidth
      const maxScroll = scrollWidth - containerWidth
      
      const targetScroll = (index / (totalSlides - 1)) * maxScroll
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
      
      setActiveIndex(index)
    }
  }

  const handleScroll = () => {
    if (carouselRef.current && totalSlides > 1) {
      const container = carouselRef.current
      const scrollLeft = container.scrollLeft
      const containerWidth = container.offsetWidth
      const scrollWidth = container.scrollWidth
      const maxScroll = scrollWidth - containerWidth
      
      // Calculate current index based on scroll position
      const currentIndex = Math.round((scrollLeft / maxScroll) * (totalSlides - 1))
      setActiveIndex(currentIndex)
    }
  }

  useEffect(() => {
    const carousel = carouselRef.current
    
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll)
      
      return () => {
        carousel.removeEventListener('scroll', handleScroll)
      }
    }
  }, [totalSlides])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6">
                Advanced <span className="text-primary">Laser Treatment</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Our state-of-the-art laser therapy delivers targeted light energy deep into your skin to address multiple concerns at once - from fine lines and wrinkles to pigmentation, scarring and more.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <h3 className="font-bold text-primary">Precision Targeting</h3>
                  <p className="text-sm mt-2">Treats specific concerns without affecting surrounding tissue</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <h3 className="font-bold text-primary">Quick Recovery</h3>
                  <p className="text-sm mt-2">Minimal downtime with noticeable results</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <h3 className="font-bold text-primary">Skin Renewal</h3>
                  <p className="text-sm mt-2">Stimulates collagen for lasting improvements</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <h3 className="font-bold text-primary">Multiple Benefits</h3>
                  <p className="text-sm mt-2">Addresses several skin concerns simultaneously</p>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="rounded-full bg-primary text-white hover:bg-primary/90">
                    Book Your Treatment
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image 
                src="/placeholder-beauty.png"
                alt="Laser treatment"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Description */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Revolutionary Laser <span className="text-primary">Technology</span>
            </h2>
            <p className="text-lg text-gray-700">
              Our advanced laser treatment harnesses the power of cutting-edge technology to deliver transformative results for your skin. Using precise wavelengths of light energy, this non-invasive treatment penetrates deep into the dermis to stimulate natural healing processes and collagen production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-4">The Science Behind Our Laser Treatment</h3>
              <p className="text-gray-700 mb-6">
                Our laser technology works by delivering concentrated beams of light energy to target specific skin concerns without damaging surrounding tissues. The light energy converts to heat as it reaches deeper skin layers, triggering your body's natural healing response and stimulating collagen and elastin production - the essential building blocks of youthful, healthy skin.
              </p>
              <p className="text-gray-700 mb-6">
                The precision of our laser treatment allows us to address various skin concerns simultaneously, including fine lines, wrinkles, sun damage, hyperpigmentation, uneven skin tone, acne scars, and vascular lesions. The treatment is customized to your specific skin needs, ensuring optimal results with minimal discomfort.
              </p>
              <h3 className="text-2xl font-bold mb-4">What to Expect</h3>
              <p className="text-gray-700">
                During your treatment, you'll experience a mild warming sensation as the laser works its magic. The procedure typically takes 30-60 minutes, depending on the treatment area and your specific concerns. Many clients see visible improvements after just one session, with progressive enhancement over the following weeks as collagen continues to rebuild.
              </p>
            </div>
            <div className="bg-primary/5 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Treatment Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-3">✓</span>
                  <div>
                    <span className="font-bold">Treats Multiple Concerns:</span> Addresses fine lines, wrinkles, sun damage, hyperpigmentation, and acne scars in a single session
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">✓</span>
                  <div>
                    <span className="font-bold">Boosts Collagen Production:</span> Stimulates natural collagen synthesis for long-lasting skin firmness and elasticity
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">✓</span>
                  <div>
                    <span className="font-bold">Minimal Downtime:</span> Return to your daily activities with little to no recovery time
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">✓</span>
                  <div>
                    <span className="font-bold">Progressive Results:</span> See continuous improvement in skin quality for weeks after treatment
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">✓</span>
                  <div>
                    <span className="font-bold">Non-Invasive Solution:</span> Achieve significant improvements without surgery or extensive recovery
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">✓</span>
                  <div>
                    <span className="font-bold">Customizable Treatments:</span> Tailored to your specific skin concerns and goals
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">✓</span>
                  <div>
                    <span className="font-bold">Improves Skin Texture:</span> Creates smoother, more refined skin surface
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results Carousel */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Transformative <span className="text-primary">Results</span>
            </h2>
            <p className="text-lg text-gray-700">
              See the remarkable difference our laser treatments can make. Browse through our gallery of before and after photos showcasing real results from our satisfied clients.
            </p>
          </div>

          <div className="relative mt-10">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto scrollbar-hide gap-6 py-4 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none' }}
            >
              {images.map((image, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-64 h-80 relative rounded-lg overflow-hidden snap-center"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeIndex === index ? 'bg-primary w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Wrinkle Reduction</h3>
              <p className="text-gray-600">
                Diminishes the appearance of fine lines and wrinkles by stimulating collagen production in the skin
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 18 6-6-6-6"/><path d="m18 6-6 6 6 6"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Scar Improvement</h3>
              <p className="text-gray-600">
                Reduces the appearance of acne scars and other imperfections by promoting tissue regeneration
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Even Skin Tone</h3>
              <p className="text-gray-600">
                Targets pigmentation issues like sun spots, age spots, and melasma for a more uniform complexion
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M12 16h3.5a3.5 3.5 0 1 1 0 7H12v-7z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Improved Texture</h3>
              <p className="text-gray-600">
                Smooths rough skin texture by promoting cell turnover and regeneration of healthy skin cells
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Customized Approach</h3>
              <p className="text-gray-600">
                Treatment parameters are tailored to your specific skin type, concerns, and goals for optimal results
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2"/><path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/><path d="M21 15a3 3 0 0 0-3-3"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Long-term Results</h3>
              <p className="text-gray-600">
                Enjoy lasting improvements with a recommended treatment schedule and proper skincare maintenance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            
            <div className="mt-12 space-y-6">
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Is laser treatment painful?</h3>
                <p className="text-gray-600">
                  Most clients experience minimal discomfort during laser treatment. You may feel a warm sensation or mild tingling, similar to a rubber band snap against the skin. We offer topical numbing cream for those with sensitive skin to ensure your comfort throughout the procedure.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">How many sessions will I need?</h3>
                <p className="text-gray-600">
                  The number of sessions varies depending on your specific skin concerns and treatment goals. While many clients see visible improvement after just one session, a series of 3-6 treatments spaced 4-6 weeks apart is typically recommended for optimal results. Our specialists will create a personalized treatment plan during your consultation.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">What is the downtime after laser treatment?</h3>
                <p className="text-gray-600">
                  One of the benefits of our advanced laser treatment is minimal downtime. Most clients experience mild redness for a few hours to 1-2 days after treatment. You can typically return to normal activities immediately, though we recommend avoiding intense exercise, excessive heat, and direct sun exposure for 24-48 hours post-treatment.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Is laser treatment safe for all skin tones?</h3>
                <p className="text-gray-600">
                  Our laser technology is designed to be safe for a wide range of skin tones. However, certain laser types may be better suited for specific skin colors. During your consultation, our specialists will evaluate your skin and recommend the most appropriate laser treatment for your unique complexion.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">How should I prepare for my laser treatment?</h3>
                <p className="text-gray-600">
                  For the best results, we recommend avoiding sun exposure, tanning beds, and self-tanners for at least 2 weeks before treatment. You should also discontinue use of retinoids, glycolic acid, and other potentially irritating skincare products 3-5 days before your appointment. Your specialist will provide detailed pre-treatment instructions during your consultation.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">What should I do after my laser treatment?</h3>
                <p className="text-gray-600">
                  Post-treatment care includes avoiding direct sun exposure and using broad-spectrum SPF 30+ sunscreen daily. Gentle skincare products are recommended for a few days after treatment. Your specialist will provide a detailed aftercare plan tailored to your specific treatment and skin condition.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-3">Are the results permanent?</h3>
                <p className="text-gray-600">
                  Laser treatment results can be long-lasting, but they are not permanent as the natural aging process continues. Maintenance sessions every 6-12 months are typically recommended to preserve your results. Consistent use of quality skincare products and sun protection will help extend the benefits of your treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Now Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            Ready for <span className="text-primary">Transformative Results</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
            Experience the power of advanced laser technology at Aura Beauty. Book your consultation today and take the first step toward radiant, rejuvenated skin.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button className="rounded-full bg-primary px-8 py-3 text-white hover:bg-primary/90">
                Book Your Treatment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
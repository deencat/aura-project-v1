'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const premiumTreatments = [
  { title: 'Royal Black Scan', href: '/treatments/royal-black-scan', description: 'Advanced technology for spots, pigmentation, and blemishes' },
  { title: 'Peeled Egg Skin', href: '/treatments/peeled-egg-skin', description: 'Creates silky smooth, flawless skin texture with radiant complexion' },
  { title: 'Collagen Regeneration', href: '/treatments/collagen-regeneration', description: 'Boosts natural collagen production for youthful appearance' },
  { title: '360 Smart Rescue', href: '/treatments/smart-rescue', description: 'Complete skin revival addressing multiple concerns' },
  { title: 'Farewell Puffy Face', href: '/treatments/farewell-puffy', description: 'Reduces facial puffiness and bloating' },
  { title: 'Ultimate Stemcell Hydrating Repair', href: '/treatments/ultimate-stemcell-hydrating-repair', description: 'Deep hydration and cellular regeneration for dehydrated skin' },
  { title: 'Ceramic Skin Renewal', href: '/treatments/ceramic-skin-renewal', description: 'Achieve a flawless, porcelain-like complexion' },
  { title: 'Mole, Wart & Skin Growth Removal', href: '/treatments/mole-wart-removal', description: 'Precision laser technology for removal of moles, warts, and skin growths' },
  { title: 'Radiant Defense Synergy Treatment', href: '/treatments/radiant-defense-synergy', description: 'Revolutionary combination of Resveratrol and Probiotics for flawless, lit-from-within skin' },
  { title: 'New Doublo™', href: '/treatments/new-doublo', description: 'World\'s first dual-action MFU and 4RF technology for instant lifting and sculpting results' },
]

const bodyCareServices = [
  { title: 'Body Sculpting', href: '/body-care/body-sculpting', description: 'Non-invasive targeting of stubborn fat cells' },
  { title: 'Cellulite Reduction', href: '/body-care/cellulite-reduction', description: 'Advanced treatments to smooth skin affected by cellulite' },
  { title: 'Skin Tightening', href: '/body-care/skin-tightening', description: 'Treatments that firm loose skin and improve elasticity' },
  { title: 'Detox Wraps', href: '/body-care/detox-wraps', description: 'Draws out impurities while nourishing your skin' },
  { title: 'Hair Removal', href: '/body-care/hair-removal', description: 'Full-body solutions for smooth, hair-free skin' },
  { title: 'Stretch Mark Repair', href: '/body-care/stretch-mark', description: 'Minimizes the appearance of stretch marks' },
]

const facialFilters = [
  { title: 'Youth Filter', href: '/facial-filters/youth-filter', description: 'AI-powered treatment targeting signs of aging' },
  { title: 'Perfect Skin', href: '/facial-filters/perfect-skin', description: 'Creates a flawless complexion with AI analysis' },
  { title: 'Contour Pro', href: '/facial-filters/contour-pro', description: 'Enhances natural bone structure with personalized contouring' },
  { title: 'Glow Boost', href: '/facial-filters/glow-boost', description: 'Illuminating treatment for radiance and vitality' },
]

const cellBeautyTreatments = [
  { title: 'Cell Rejuvenation', href: '/cell-beauty/cell-rejuvenation', description: 'Stimulates cellular renewal for healthier skin' },
  { title: 'DNA Repair Treatment', href: '/cell-beauty/dna-repair', description: 'Advanced therapy targeting cellular DNA damage' },
  { title: 'Stem Cell Therapy', href: '/cell-beauty/stem-cell', description: 'Utilizes stem cell technology to regenerate tissues' },
  { title: 'Cellular Detox', href: '/cell-beauty/cellular-detox', description: 'Removes cellular toxins to enhance skin health' },
]

export function MainNavigation() {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const handleMouseEnter = (title: string) => {
    setActiveItem(title)
  }

  const handleMouseLeave = () => {
    setActiveItem(null)
  }

  const mainMenuItems = [
    { title: 'Home', href: '/' },
    { 
      title: 'Premium Beauty', 
      href: '/treatments',
      submenu: premiumTreatments
    },
    { 
      title: 'Body Care', 
      href: '/body-care',
      submenu: bodyCareServices
    },
    { 
      title: 'Facial Services', 
      href: '/facial',
      submenu: facialFilters
    },
    {
      title: 'Cell Beauty',
      href: '/cell-beauty',
      submenu: cellBeautyTreatments
    },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ]

  return (
    <div className="container flex h-16 items-center px-0">
      <div className="mr-8 flex">
        <Link href="/" className="font-serif text-2xl font-bold">
          <span className="mr-1">Aura</span>
          <span className="text-primary">Beauty</span>
        </Link>
      </div>

      <div className="hidden flex-1 items-center justify-between md:flex">
        <nav className="flex space-x-1">
          {mainMenuItems.map((item) => (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => item.submenu && handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href ? "text-primary" : "text-gray-700 hover:text-primary",
                )}
              >
                {item.title}
                {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
              </Link>

              {item.submenu && activeItem === item.title && (
                <div className="absolute left-0 top-full z-50 mt-1 min-w-[240px] origin-top-left rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 transition">
                  <div className="grid grid-cols-1 gap-2 p-2">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="rounded-md px-3 py-2 text-sm hover:bg-gray-50 hover:text-primary"
                      >
                        <div className="font-medium">{subItem.title}</div>
                        <p className="mt-1 text-xs text-gray-500">{subItem.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-primary">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/contact">
            <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 
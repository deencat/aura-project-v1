import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const premiumTreatments = [
  { title: 'Royal Black Scan', href: '/treatments/royal-black-scan', description: 'Advanced technology for spots, pigmentation, and blemishes' },
  { title: 'Peeled Egg Skin', href: '/treatments/peeled-egg-skin', description: 'Creates silky smooth, flawless skin texture with radiant complexion' },
  { title: 'Collagen Regeneration', href: '/treatments/collagen-regeneration', description: 'Boosts natural collagen production for youthful appearance' },
  { title: '360 Smart Rescue', href: '/treatments/smart-rescue', description: 'Complete skin revival addressing multiple concerns' },
  { title: 'Farewell Puffy Face', href: '/treatments/farewell-puffy', description: 'Reduces facial puffiness and bloating' },
  { title: 'Desert Skin Rescue', href: '/treatments/desert-skin-rescue', description: 'Intensive hydration for extremely dry skin' },
  { title: 'Royal Porcelain Skin', href: '/treatments/porcelain-skin', description: 'Achieve a flawless, porcelain-like complexion' },
  { title: 'Crystal Micro-Needling', href: '/treatments/crystal-needling', description: 'Advanced micro-needling with crystal technology' },
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

const hairCareServices = [
  { title: 'Hair Moisturizing', href: '/hair-care/hair-moisturizing', description: 'Deep conditioning for dry, damaged hair' },
  { title: 'Scalp Treatment', href: '/hair-care/scalp-treatment', description: 'Promotes healthier hair growth' },
  { title: 'Keratin Treatment', href: '/hair-care/keratin-treatment', description: 'Eliminates frizz and adds shine' },
  { title: 'Hair Color Refresh', href: '/hair-care/hair-color-refresh', description: 'Enhances vibrancy and protects from fading' },
]

export function MainNavigation() {
  const pathname = usePathname()

  return (
    <div className="container flex h-16 items-center">
      <div className="mr-4 flex">
        <Link href="/" className="font-serif text-2xl font-bold">
          <span className="mr-1">Aura</span>
          <span className="text-primary">Beauty</span>
        </Link>
      </div>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={pathname === '/'}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Premium Beauty Treatments</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                {premiumTreatments.map((treatment) => (
                  <ListItem
                    key={treatment.title}
                    title={treatment.title}
                    href={treatment.href}
                  >
                    {treatment.description}
                  </ListItem>
                ))}
                <div className="col-span-2 mt-4 border-t pt-4">
                  <Link href="/treatments" className="text-sm font-medium text-primary">
                    View all treatments →
                  </Link>
                </div>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Body Care</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                {bodyCareServices.map((service) => (
                  <ListItem
                    key={service.title}
                    title={service.title}
                    href={service.href}
                  >
                    {service.description}
                  </ListItem>
                ))}
                <div className="col-span-2 mt-4 border-t pt-4">
                  <Link href="/body-care" className="text-sm font-medium text-primary">
                    View all body care treatments →
                  </Link>
                </div>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Facial Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-3 lg:w-[700px]">
                <li className="col-span-1 row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                      href="/facial"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium text-white">
                        Facial Treatments
                      </div>
                      <p className="text-sm leading-tight text-white/90">
                        Advanced facial therapies for radiant, youthful skin
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li className="col-span-2 row-span-1">
                  <div className="mb-2 mt-4 text-lg font-medium">AI Facial Filters</div>
                </li>
                {facialFilters.map((filter) => (
                  <ListItem
                    key={filter.title}
                    title={filter.title}
                    href={filter.href}
                  >
                    {filter.description}
                  </ListItem>
                ))}
                <div className="col-span-3 mt-4 border-t pt-4">
                  <div className="flex justify-between">
                    <Link href="/facial" className="text-sm font-medium text-primary">
                      View all facial treatments →
                    </Link>
                    <Link href="/facial-filters" className="text-sm font-medium text-primary">
                      View all AI filters →
                    </Link>
                  </div>
                </div>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Specialized Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                <div className="col-span-2 mb-2">
                  <div className="mb-2 text-lg font-medium text-primary">Cell Beauty Technology</div>
                  <p className="text-sm text-gray-600">Cutting-edge cellular-level treatments that transform your skin at its fundamental level</p>
                </div>
                {cellBeautyTreatments.map((treatment) => (
                  <ListItem
                    key={treatment.title}
                    title={treatment.title}
                    href={treatment.href}
                  >
                    {treatment.description}
                  </ListItem>
                ))}
                <div className="col-span-2 mt-4 border-t pt-4 mb-4">
                  <Link href="/cell-beauty" className="text-sm font-medium text-primary">
                    View all cell beauty treatments →
                  </Link>
                </div>

                <div className="col-span-2 mb-2">
                  <div className="mb-2 text-lg font-medium text-primary">Hair Care</div>
                  <p className="text-sm text-gray-600">Luxurious treatments to restore health, shine, and beauty to every strand</p>
                </div>
                {hairCareServices.map((service) => (
                  <ListItem
                    key={service.title}
                    title={service.title}
                    href={service.href}
                  >
                    {service.description}
                  </ListItem>
                ))}
                <div className="col-span-2 mt-4 border-t pt-4">
                  <Link href="/hair-care" className="text-sm font-medium text-primary">
                    View all hair care services →
                  </Link>
                </div>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={pathname === '/about'}
              >
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={pathname === '/contact'}
              >
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="ml-auto flex items-center space-x-4">
        <Link href="/contact" className="hidden sm:block">
          <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90">
            Book Now
          </Button>
        </Link>
        <div className="block md:hidden">
          <Button variant="ghost" size="icon" className="text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}) 
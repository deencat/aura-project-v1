"use client"

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Save,
  Languages,
  ImagePlus,
  AlertCircle,
  X,
  Check,
  Image as ImageIcon,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import PlaceholderImage from '@/components/PlaceholderImage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageImagesTabs } from '@/components/PageImagesTabs'
import { purgeImageCache, getCacheBustedImageUrl } from '@/utils/imageUtils'

// Define types for the application
interface ServiceSection {
  id: string;
  name: string;
  type: string;
}

interface ServiceTemplate {
  name: string;
  sections: ServiceSection[];
}

interface ServiceTemplates {
  [key: string]: ServiceTemplate;
}

interface ServiceImageSet {
  template?: string;
  hero?: string | null;
  hero_type?: 'image' | 'video'; // Add media type field for hero
  how_it_works?: string[];
  benefits?: string[];
  results?: string[];
  testimonials?: string | null;
  before_after?: string[];
  technology?: string | null;
  comparison?: string | null;
  [key: string]: string | string[] | undefined | null | 'image' | 'video';
}

interface ServiceMockImages {
  [key: string]: ServiceImageSet;
}

interface ServiceFormData {
  name: string;
  slug: string;
  category: string;
  price: string;
  duration: string;
  short_description: string;
  long_description: string;
  benefits: string;
  suitable_for: string;
  contraindications: string;
  preparation: string;
  aftercare: string;
  status: string;
  [key: string]: string;
}

interface MediaItem {
  id: number;
  path: string;
  name: string;
  type: string;
  size: string;
}

interface Service {
  id: number;
  name: string;
  category: string;
  price: string;
  duration: string;
  status: string;
  slug: string;
  short_description: string;
  long_description: string;
  benefits: string;
  suitable_for: string;
  contraindications: string;
  preparation: string;
  aftercare: string;
}

// Categories for dropdown - matching the categories in the services page
const categories = [
  { id: 1, name: 'Body Care' },
  { id: 2, name: 'New Doublo' },
  { id: 3, name: 'Facial Services' },
  { id: 4, name: 'Premium Beauty' },
  { id: 5, name: 'Specialized Services' },
  { id: 6, name: 'Cell Beauty' },
]

// Mock data for services - same as in services page
const mockServices: Service[] = [
  {
    id: 1,
    name: 'Lymphatic Detox',
    category: 'Body Care',
    price: '$980',
    duration: '90 min',
    status: 'Active',
    slug: 'body-care/lymphatic-detox',
    short_description: 'An advanced lymphatic drainage treatment that detoxifies and rejuvenates the body.',
    long_description: 'Our Lymphatic Detox treatment uses patented technology to stimulate lymphatic flow, helping to eliminate toxins and reduce water retention. This treatment is excellent for improving circulation, reducing inflammation, and enhancing overall well-being.',
    benefits: 'Reduces water retention\nImproves circulation\nEnhances detoxification\nReduces inflammation\nPromotes healing',
    suitable_for: 'Anyone seeking detoxification, individuals with water retention issues, those with sluggish metabolism.',
    contraindications: 'Pregnancy, active cancer, acute infections, heart conditions, deep vein thrombosis.',
    preparation: 'Stay hydrated before the treatment. Avoid large meals 2 hours prior.',
    aftercare: 'Drink plenty of water. Avoid alcohol and caffeine for 24 hours after treatment.'
  },
  {
    id: 2,
    name: 'Stretch Mark Treatment',
    category: 'Body Care',
    price: '$850',
    duration: '75 min',
    status: 'Active',
    slug: 'body-care/stretch-mark',
    short_description: 'Innovative treatment that diminishes the appearance of stretch marks.',
    long_description: 'Our comprehensive Stretch Mark Treatment combines micro-needling, laser therapy, and specialized serums to break down scar tissue and stimulate collagen production, significantly reducing the appearance of stretch marks.',
    benefits: 'Reduces stretch mark visibility\nImproves skin texture\nStimulates collagen production\nEvens skin tone\nBoosts confidence',
    suitable_for: 'Those with stretch marks from pregnancy, weight changes, or growth spurts.',
    contraindications: 'Pregnancy, skin infections, open wounds, certain skin conditions, recent sunburn.',
    preparation: 'Avoid sun exposure and retinol products for one week before treatment.',
    aftercare: 'Apply provided soothing cream. Avoid sun exposure and strenuous exercise for 48 hours.'
  },
  {
    id: 3,
    name: 'Hair Removal',
    category: 'Body Care',
    price: '$650',
    duration: '60 min',
    status: 'Active',
    slug: 'body-care/hair-removal',
    short_description: 'Permanent hair reduction using advanced laser technology.',
    long_description: 'Our Hair Removal treatment uses state-of-the-art laser technology to target hair follicles, permanently reducing hair growth. The procedure is quick, effective, and suitable for most skin types.',
    benefits: 'Permanent hair reduction\nSmooth skin\nNo more shaving or waxing\nTreats large areas quickly\nMinimal discomfort',
    suitable_for: 'Anyone looking for permanent hair reduction on face or body.',
    contraindications: 'Pregnancy, certain skin conditions, recent tanning, photosensitivity disorders.',
    preparation: 'Shave the area 24 hours before. Avoid sun exposure, tanning, and bleaching.',
    aftercare: 'Apply sunscreen. Avoid hot showers, saunas, and sun exposure for 48 hours.'
  },
  {
    id: 4,
    name: 'Perfect Buttocks',
    category: 'Body Care',
    price: '$1,100',
    duration: '90 min',
    status: 'Active',
    slug: 'body-care/perfect-buttocks',
    short_description: 'Non-invasive treatment to lift, firm and shape the buttocks area.',
    long_description: 'Our Perfect Buttocks treatment combines radiofrequency, vacuum technology, and specialized massage techniques to lift, firm, and shape the buttocks without surgery. The treatment stimulates collagen production and improves circulation for visible results.',
    benefits: 'Lifts and firms buttocks\nReduces cellulite appearance\nImproves skin texture\nEnhances shape\nNo downtime',
    suitable_for: 'Those looking to enhance buttocks shape and firmness without surgery.',
    contraindications: 'Pregnancy, pacemakers, metal implants in the area, certain skin conditions.',
    preparation: 'Stay hydrated. Avoid caffeine and alcohol 24 hours before treatment.',
    aftercare: 'Drink plenty of water. Follow recommended exercise regimen for enhanced results.'
  },
  {
    id: 5,
    name: 'Breast Enhancement',
    category: 'Body Care',
    price: '$1,200',
    duration: '90 min',
    status: 'Active',
    slug: 'body-care/breast-enhancement',
    short_description: 'Non-surgical treatment to improve breast firmness and appearance.',
    long_description: 'Our Breast Enhancement treatment uses advanced technology to stimulate tissue regeneration and collagen production, resulting in firmer, more lifted breasts. This non-invasive alternative to surgery is safe and effective.',
    benefits: 'Improves firmness and lift\nEnhances shape\nStimulates collagen production\nImproves skin texture\nNo surgical risks',
    suitable_for: 'Women looking to enhance breast appearance without surgery.',
    contraindications: 'Pregnancy, breastfeeding, breast implants, history of breast cancer, certain skin conditions.',
    preparation: 'Wear comfortable clothing. Avoid applying lotions or creams to the area.',
    aftercare: 'Wear supportive bra for 24 hours. Avoid strenuous exercise for 48 hours.'
  },
  {
    id: 6,
    name: 'Neck Rejuvenation',
    category: 'New Doublo',
    price: '$1,350',
    duration: '60 min',
    status: 'Active',
    slug: 'new-doublo/neck-rejuvenation',
    short_description: 'Advanced treatment to address signs of aging on the neck.',
    long_description: 'Our Neck Rejuvenation treatment uses New Doublo technology to target sagging, wrinkles, and fine lines on the neck area. The treatment stimulates collagen production deep within the skin for visible lifting and tightening.',
    benefits: 'Reduces neck wrinkles\nTightens sagging skin\nDefines jawline\nImproves skin texture\nLong-lasting results',
    suitable_for: 'Those concerned with neck aging, tech neck, or loss of definition.',
    contraindications: 'Pregnancy, pacemakers, autoimmune disorders, certain skin conditions, recent fillers.',
    preparation: 'Avoid blood thinners for 1 week if approved by doctor. Remove jewelry from treatment area.',
    aftercare: 'Apply sunscreen. Avoid extreme heat and strenuous exercise for 48 hours.'
  },
  {
    id: 7,
    name: 'Youth Revival',
    category: 'New Doublo',
    price: '$1,450',
    duration: '75 min',
    status: 'Active',
    slug: 'new-doublo/youth-revival',
    short_description: 'Comprehensive facial rejuvenation using New Doublo technology.',
    long_description: 'Our Youth Revival treatment is a comprehensive anti-aging solution that uses New Doublo technology to target multiple signs of aging simultaneously. The treatment stimulates collagen production at multiple depths for complete facial rejuvenation.',
    benefits: 'Reduces wrinkles and fine lines\nImproves skin elasticity\nLifts sagging areas\nDefines facial contours\nProvides natural-looking results',
    suitable_for: 'Those looking for overall facial rejuvenation and anti-aging benefits.',
    contraindications: 'Pregnancy, autoimmune disorders, skin infections, recent dermal fillers, certain medications.',
    preparation: 'Discontinue retinol products 5 days before. Arrive with clean skin (no makeup).',
    aftercare: 'Apply only recommended products for 24 hours. Use sunscreen diligently.'
  },
  {
    id: 8,
    name: 'V-Line Perfection',
    category: 'New Doublo',
    price: '$1,500',
    duration: '60 min',
    status: 'Active',
    slug: 'new-doublo/v-line',
    short_description: 'Sculpt a defined V-shaped jawline without surgery.',
    long_description: 'Our V-Line Perfection treatment uses New Doublo technology to sculpt and define the jawline for a coveted V-shape appearance. The treatment targets excess fat under the chin and tightens the skin along the jawline.',
    benefits: 'Creates V-shaped jawline\nReduces double chin\nDefines facial contours\nTightens skin\nNo surgical incisions',
    suitable_for: 'Those looking to define their jawline and achieve a V-shape face profile.',
    contraindications: 'Pregnancy, severe skin laxity, pacemakers, metal implants in the area, certain medications.',
    preparation: 'Avoid blood thinners if approved by doctor. Remove all jewelry from face and neck.',
    aftercare: 'Apply cold compress if needed. Keep head elevated while sleeping for first night.'
  },
  {
    id: 9,
    name: 'Sculpt & Lift',
    category: 'New Doublo',
    price: '$1,400',
    duration: '60 min',
    status: 'Active',
    slug: 'new-doublo/sculpt-lift',
    short_description: 'Precision facial sculpting and lifting for enhanced definition.',
    long_description: 'Our Sculpt & Lift treatment harnesses the power of New Doublo technology to precisely target and enhance facial contours. The treatment provides noticeable lifting and sculpting effects without the downtime of surgery.',
    benefits: 'Lifts sagging facial areas\nEnhances cheekbones\nDefines jawline\nImproves skin texture\nNatural-looking results',
    suitable_for: 'Those seeking facial definition and lift without surgery.',
    contraindications: 'Pregnancy, autoimmune disorders, recent facial surgery, certain skin conditions.',
    preparation: 'Discontinue retinol products 5 days before. Avoid alcohol for 24 hours before treatment.',
    aftercare: 'Apply sunscreen diligently. Maintain hydration for enhanced results.'
  }
]

// Service page templates with their sections
const serviceTemplates: ServiceTemplates = {
  'body-care': {
    name: 'Body Care Template',
    sections: [
      { id: 'hero', name: 'Hero Section', type: 'single' },
      { id: 'how_it_works', name: 'How It Works', type: 'multiple' },
      { id: 'benefits', name: 'Benefits', type: 'multiple' },
      { id: 'results', name: 'Results', type: 'multiple' },
      { id: 'testimonials', name: 'Testimonials', type: 'single' },
      { id: 'pricing', name: 'Pricing', type: 'single' },
      { id: 'faq', name: 'FAQ', type: 'single' }
    ]
  },
  'new-doublo': {
    name: 'New Doublo Template',
    sections: [
      { id: 'hero', name: 'Hero Section', type: 'single' },
      { id: 'before_after', name: 'Before & After', type: 'multiple' },
      { id: 'technology', name: 'Technology', type: 'single' },
      { id: 'comparison', name: 'Comparison', type: 'single' },
      { id: 'testimonials', name: 'Testimonials', type: 'single' }
    ]
  },
  'facial-services': {
    name: 'Facial Services Template',
    sections: [
      { id: 'hero', name: 'Hero Section', type: 'single' },
      { id: 'process', name: 'Treatment Process', type: 'multiple' },
      { id: 'ingredients', name: 'Key Ingredients', type: 'multiple' },
      { id: 'results', name: 'Results', type: 'multiple' },
      { id: 'side_effects', name: 'Side Effects', type: 'single' },
      { id: 'aftercare', name: 'Aftercare', type: 'single' },
      { id: 'pricing', name: 'Pricing', type: 'single' },
      { id: 'faq', name: 'FAQ', type: 'single' }
    ]
  },
  'default': {
    name: 'Default Template',
    sections: [
      { id: 'hero', name: 'Hero Section', type: 'single' },
      { id: 'gallery', name: 'Gallery Images', type: 'multiple' }
    ]
  }
};

// Mock media library images
const mockMediaLibrary: MediaItem[] = [
  { id: 1, path: '/images/placeholders/spa01.jpg', name: 'Spa Image', type: 'image/jpeg', size: '245 KB' },
  { id: 2, path: '/images/treatments/new-doublo/sculpt-lift/hero.jpg', name: 'Sculpt & Lift Hero', type: 'image/jpeg', size: '312 KB' },
  { id: 3, path: '/images/treatments/new-doublo/sculpt-lift/before-after-1.jpg', name: 'Sculpt & Lift Before/After 1', type: 'image/jpeg', size: '178 KB' },
  { id: 4, path: '/images/treatments/new-doublo/sculpt-lift/before-after-2.jpg', name: 'Sculpt & Lift Before/After 2', type: 'image/jpeg', size: '425 KB' },
  { id: 5, path: '/images/treatments/new-doublo/sculpt-lift/technology.jpg', name: 'Sculpt & Lift Technology', type: 'image/jpeg', size: '156 KB' },
  { id: 6, path: '/images/treatments/new-doublo/sculpt-lift/comparison.jpg', name: 'Sculpt & Lift Comparison', type: 'image/jpeg', size: '289 KB' },
  { id: 7, path: '/images/treatments/new-doublo/v-line/hero.jpg', name: 'V-Line Hero', type: 'image/jpeg', size: '341 KB' },
  { id: 8, path: '/images/treatments/new-doublo/v-line/technology.jpg', name: 'V-Line Technology', type: 'image/jpeg', size: '203 KB' },
  { id: 9, path: '/images/treatments/lymphatic/hero.jpg', name: 'Lymphatic Hero', type: 'image/jpeg', size: '275 KB' },
  { id: 10, path: '/images/placeholders/new-doublo-hero.jpg', name: 'New Doublo Hero', type: 'image/jpeg', size: '188 KB' },
  { id: 11, path: '/images/treatments/new-doublo/youth-revival/hero.mp4', name: 'Youth Revival Hero Video', type: 'video/mp4', size: '4.2 MB' },
];

// Helper function to verify if an image exists with a HEAD request
const verifyImageExists = async (imagePath: string): Promise<boolean> => {
  try {
    const response = await fetch(imagePath, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Utility function to generate image paths from slug
const getImagePathsFromSlug = (slug: string): ServiceImageSet => {
  // Parse the slug to determine category and service name 
  const [category, serviceName] = slug.split('/');
  
  // Base path for images based consistently on the slug
  const basePath = `/images/treatments/${slug}`;
  
  // Determine template type from category
  const templateType = category || 'default';
  const imageSet: ServiceImageSet = { template: templateType };
  
  // Add paths based on template type
  if (category === 'body-care') {
    imageSet.hero = `${basePath}/hero.jpg`;
    imageSet.hero_type = 'image';
    imageSet.how_it_works = [1, 2, 3].map(n => `${basePath}/process-${n}.jpg`);
    imageSet.benefits = [1, 2].map(n => `${basePath}/benefit-${n}.jpg`);
    imageSet.results = [1, 2].map(n => `${basePath}/results-${n}.jpg`);
    imageSet.testimonials = `${basePath}/testimonial.jpg`;
  } else if (category === 'new-doublo') {
    // Special case for youth-revival which has a video hero
    if (serviceName === 'youth-revival') {
      imageSet.hero = `${basePath}/hero.mp4`;
      imageSet.hero_type = 'video';
    } else {
      imageSet.hero = `${basePath}/hero.jpg`;
      imageSet.hero_type = 'image';
    }
    imageSet.before_after = [1, 2].map(n => `${basePath}/before-after-${n}.jpg`);
    imageSet.technology = `${basePath}/technology.jpg`;
    imageSet.comparison = `${basePath}/comparison.jpg`;
    imageSet.testimonials = `${basePath}/testimonial.jpg`;
  } else if (category === 'facial-services') {
    imageSet.hero = `${basePath}/hero.jpg`;
    imageSet.hero_type = 'image';
    imageSet.how_it_works = [1, 2, 3].map(n => `${basePath}/process-${n}.jpg`);
    imageSet.benefits = [1, 2].map(n => `${basePath}/benefit-${n}.jpg`);
    imageSet.results = [1, 2].map(n => `${basePath}/results-${n}.jpg`);
  } else {
    // Default structure
    imageSet.hero = `${basePath}/hero.jpg`;
    imageSet.hero_type = 'image';
    imageSet.gallery = [1, 2, 3, 4].map(n => `${basePath}/gallery-${n}.jpg`);
  }
  
  return imageSet;
};

// Mock images for services, organized by sections
const generateMockServiceImages = (): ServiceMockImages => {
  const mockData: ServiceMockImages = {};
  
  // Common treatments to create mock data for
  const services = [
    'body-care/lymphatic-detox',
    'body-care/stretch-mark',
    'new-doublo/v-line',
    'new-doublo/sculpt-lift',
    'new-doublo/neck-rejuvenation',
    'new-doublo/youth-revival'
  ];
  
  // Generate mock data based on slugs
  services.forEach(slug => {
    mockData[slug] = getImagePathsFromSlug(slug);
  });
  
  // We can still add overrides or custom paths if needed for specific services
  // For example, if a service has images in a unique location:
  // mockData['some-category/special-service'].hero = '/some/custom/path.jpg';
  
  return mockData;
};

const serviceMockImages: ServiceMockImages = generateMockServiceImages();

// Function to retrieve actual images from the service page
const fetchActualPageImages = async (slug: string): Promise<ServiceImageSet> => {
  // Real implementation to analyze the page content and extract images
  
  try {
    // First try to get images from the API
    try {
      const response = await fetch(`/api/services/${slug}/images`);
      if (response.ok) {
        const data = await response.json();
        return data.images;
      }
    } catch (apiError) {
      console.log('API fetch failed, falling back to file system checks', apiError);
    }
    
    // Get expected image paths based on slug
    const expectedImages = getImagePathsFromSlug(slug);
    
    // Create the image set structure
    const imageSet: ServiceImageSet = { template: expectedImages.template };
    
    // Determine which sections to check based on template type
    const templateType = slug.split('/')[0];
    let templateSections: string[] = [];
    
    // Get sections based on template type
    if (templateType === 'body-care') {
      templateSections = ['hero', 'how_it_works', 'benefits', 'results', 'testimonials'];
    } else if (templateType === 'new-doublo') {
      templateSections = ['hero', 'before_after', 'technology', 'comparison', 'testimonials'];
    } else if (templateType === 'facial-services') {
      templateSections = ['hero', 'process', 'ingredients', 'results', 'side_effects', 'aftercare'];
    } else {
      templateSections = ['hero', 'gallery'];
    }
    
    // Verify which images actually exist
    for (const section of templateSections) {
      if (section === 'hero' && expectedImages.hero) {
        const heroPath = expectedImages.hero;
        const isVideoHero = expectedImages.hero_type === 'video';
        
        // First try with the expected extension
        if (await verifyImageExists(heroPath)) {
          imageSet.hero = heroPath;
          imageSet.hero_type = isVideoHero ? 'video' : 'image';
        } else {
          // If not found, try alternative extension
          let alternativeHeroPath = null;
          
          if (heroPath.endsWith('.jpg')) {
            alternativeHeroPath = heroPath.replace(/\.jpg$/, '.mp4');
          } else if (heroPath.endsWith('.mp4')) {
            alternativeHeroPath = heroPath.replace(/\.mp4$/, '.jpg');
          }
          
          if (alternativeHeroPath && await verifyImageExists(alternativeHeroPath)) {
            imageSet.hero = alternativeHeroPath;
            imageSet.hero_type = alternativeHeroPath.endsWith('.mp4') ? 'video' : 'image';
            console.log(`Found hero with alternative extension: ${alternativeHeroPath}`);
          } else {
            // For debugging, we'll try a fallback
            console.log(`Hero not found at ${heroPath} or alternative path, checking in fallback locations`);
          }
        }
      } else if ((section === 'how_it_works' || section === 'process') && expectedImages.how_it_works) {
        const sectionImages: string[] = [];
        for (const imagePath of expectedImages.how_it_works) {
          if (await verifyImageExists(imagePath)) {
            sectionImages.push(imagePath);
          }
        }
        if (sectionImages.length > 0) {
          imageSet.how_it_works = sectionImages;
        }
      } else if (section === 'benefits' && expectedImages.benefits) {
        const benefitImages: string[] = [];
        for (const imagePath of expectedImages.benefits) {
          if (await verifyImageExists(imagePath)) {
            benefitImages.push(imagePath);
          }
        }
        if (benefitImages.length > 0) {
          imageSet.benefits = benefitImages;
        }
      } else if (section === 'results' && expectedImages.results) {
        const resultImages: string[] = [];
        for (const imagePath of expectedImages.results) {
          if (await verifyImageExists(imagePath)) {
            resultImages.push(imagePath);
          }
        }
        if (resultImages.length > 0) {
          imageSet.results = resultImages;
        }
      } else if (section === 'before_after' && expectedImages.before_after) {
        const beforeAfterImages: string[] = [];
        for (const imagePath of expectedImages.before_after) {
          if (await verifyImageExists(imagePath)) {
            beforeAfterImages.push(imagePath);
          }
        }
        if (beforeAfterImages.length > 0) {
          imageSet.before_after = beforeAfterImages;
        }
      } else if (section === 'technology' && expectedImages.technology) {
        if (await verifyImageExists(expectedImages.technology)) {
          imageSet.technology = expectedImages.technology;
        }
      } else if (section === 'comparison' && expectedImages.comparison) {
        if (await verifyImageExists(expectedImages.comparison)) {
          imageSet.comparison = expectedImages.comparison;
        }
      } else if (section === 'testimonials' && expectedImages.testimonials) {
        if (await verifyImageExists(expectedImages.testimonials)) {
          imageSet.testimonials = expectedImages.testimonials;
        }
      } else if (section === 'gallery' && expectedImages.gallery) {
        const galleryImages: string[] = [];
        for (const imagePath of expectedImages.gallery) {
          if (await verifyImageExists(imagePath)) {
            galleryImages.push(imagePath);
          }
        }
        if (galleryImages.length > 0) {
          imageSet[section] = galleryImages;
        }
      }
    }
    
    // Analyze DOM on the service page for images (if needed)
    try {
      // In a real implementation, this would analyze the HTML of the service page
      // For example, we could use a headless browser to render the page and extract images
      // Or use server-side rendering to get the actual images displayed on the page
      // For now, we'll use our verified file paths
    } catch (domError) {
      console.log('DOM analysis error', domError);
    }
    
    // If we have no images but have mock data for this slug, use that as fallback
    if (Object.keys(imageSet).length <= 1 && serviceMockImages[slug]) { // Only has template property
      return serviceMockImages[slug];
    }
    
    return imageSet;
  } catch (error) {
    console.error('Error fetching page images:', error);
    
    // Fallback to empty structure if there's an error
    return getImagePathsFromSlug(slug); // Use our utility function for consistency
  }
};

// Synchronous wrapper for fetchActualPageImages to maintain compatibility
const fetchActualPageImagesSync = (slug: string): ServiceImageSet => {
  // For known services, return the mock images directly for now
  // This avoids any async issues until we update all the calling code
  if (serviceMockImages[slug as keyof typeof serviceMockImages]) {
    return serviceMockImages[slug as keyof typeof serviceMockImages];
  }

  // Return the expected paths without verification
  return getImagePathsFromSlug(slug);
};

// Helper function to render the appropriate media element
const renderMedia = (
  src?: string, 
  mediaType: 'image' | 'video' = 'image', 
  aspectRatio: string = 'aspect-[3/2]',
  onPlay?: () => void,
  category?: string,
  slug?: string
) => {
  if (!src) return (
    <div className={`flex items-center justify-center ${aspectRatio} bg-gray-100`}>
      <ImageIcon className="h-16 w-16 text-gray-300" />
    </div>
  );
  
  // Apply cache-busting for images
  const cachedSrc = mediaType === 'image' ? getCacheBustedImageUrl(src, category, slug) : src;
  
  if (mediaType === 'video') {
    return (
      <video 
        src={cachedSrc}
        className={`w-full ${aspectRatio} object-cover`}
        controls
        loop
        muted
        playsInline
        onPlay={onPlay}
      />
    );
  }
  
  return (
    <PlaceholderImage 
      className={`w-full ${aspectRatio}`}
      imageUrl={cachedSrc}
    />
  );
};

// Add image preview enhancement to display original vs current image
interface ImagePreviewProps {
  currentImage?: string;
  originalImage?: string;
  className?: string;
  aspectRatio?: string;
  mediaType?: 'image' | 'video';
  category?: string;
  slug?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  currentImage, 
  originalImage, 
  className = '', 
  aspectRatio = 'aspect-[3/2]',
  mediaType = 'image',
  category,
  slug
}) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  
  // For videos, we need special handling to ensure controls are usable
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (mediaType === 'video') {
      // Only show original after a delay if it's a video and not currently playing
      if (isHovering && !isPlayingVideo) {
        timer = setTimeout(() => {
          setShowOriginal(true);
        }, 1500); // 1.5 second delay before showing original
      } else {
        setShowOriginal(false);
      }
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isHovering, mediaType, isPlayingVideo]);
  
  // Special handler for video elements
  const handleVideoInteraction = (e: React.MouseEvent) => {
    if (mediaType === 'video') {
      // Prevent showing original when interacting with video controls
      e.stopPropagation();
      setIsPlayingVideo(true);
    }
  };
  
  // Handler for video playback
  const handleVideoPlay = () => {
    setIsPlayingVideo(true);
  };
  
  return (
    <div 
      className={`relative ${className} border rounded-md overflow-hidden bg-gray-50`}
      onMouseEnter={() => {
        setIsHovering(true);
        // For images, show original immediately
        if (mediaType === 'image' && originalImage) {
          setShowOriginal(true);
        }
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setShowOriginal(false);
        // Reset playing state when mouse leaves
        if (!isPlayingVideo) {
          setIsPlayingVideo(false);
        }
      }}
    >
      {currentImage ? (
        <>
          {mediaType === 'video' ? (
            <div onClick={handleVideoInteraction}>
              {renderMedia(
                showOriginal ? originalImage : currentImage, 
                mediaType, 
                aspectRatio, 
                handleVideoPlay,
                category,
                slug
              )}
            </div>
          ) : (
            renderMedia(
              showOriginal ? originalImage : currentImage, 
              mediaType, 
              aspectRatio,
              undefined,
              category,
              slug
            )
          )}
          {originalImage && originalImage !== currentImage && showOriginal && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md">
              Original
            </div>
          )}
          {originalImage && originalImage !== currentImage && !showOriginal && isHovering && !isPlayingVideo && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md">
              {mediaType === 'video' ? 'Hover 1.5s to see original' : 'Modified'}
            </div>
          )}
        </>
      ) : originalImage ? (
        <>
          {renderMedia(
            originalImage, 
            mediaType, 
            aspectRatio, 
            mediaType === 'video' ? handleVideoPlay : undefined,
            category,
            slug
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <p className="font-medium">Original {mediaType === 'video' ? 'Video' : 'Image'}</p>
              <p className="text-xs mt-1">Click to use this {mediaType === 'video' ? 'video' : 'image'}</p>
            </div>
          </div>
        </>
      ) : (
        <div className={`flex items-center justify-center ${aspectRatio} bg-gray-100`}>
          {mediaType === 'video' ? 
            <div className="flex flex-col items-center">
              <svg className="h-16 w-16 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 10L18 14M18 10L14 14M6 10C6 10 9 7 12 7C15 7 18 10 18 10C18 10 15 13 12 13C9 13 6 10 6 10Z" />
              </svg>
              <span className="text-xs text-gray-400 mt-2">No Video Selected</span>
            </div>
            : <ImageIcon className="h-16 w-16 text-gray-300" />
          }
        </div>
      )}
    </div>
  );
};

export default function EditServicePage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  const [activeTab, setActiveTab] = useState('english')
  const [activeImageTab, setActiveImageTab] = useState('hero')
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false)
  const [selectedMediaTarget, setSelectedMediaTarget] = useState<{ section: string, index: number }>({ section: 'hero', index: 0 })
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [serviceTemplate, setServiceTemplate] = useState<string>('default')
  const [sectionImages, setSectionImages] = useState<ServiceImageSet>({})
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    slug: '',
    category: '',
    price: '',
    duration: '',
    short_description: '',
    long_description: '',
    benefits: '',
    suitable_for: '',
    contraindications: '',
    preparation: '',
    aftercare: '',
    status: '',
  })
  const [originalImages, setOriginalImages] = useState<ServiceImageSet>({});
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Determine the template based on category
  const getTemplateFromCategory = (category: string) => {
    const categoryMap: Record<string, string> = {
      'Body Care': 'body-care',
      'New Doublo': 'new-doublo',
      'Facial Services': 'facial-services'
    };
    return categoryMap[category] || 'default';
  }

  // Get active template sections
  const getTemplateSections = () => {
    return serviceTemplates[serviceTemplate as keyof typeof serviceTemplates]?.sections || serviceTemplates['default'].sections;
  }

  // Load service data - update to include original images
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const service = mockServices.find(service => service.id === id);
      
      if (service) {
        setFormData({
          name: service.name || '',
          slug: service.slug || '',
          category: service.category || '',
          price: service.price || '',
          duration: service.duration || '',
          short_description: service.short_description || '',
          long_description: service.long_description || '',
          benefits: service.benefits || '',
          suitable_for: service.suitable_for || '',
          contraindications: service.contraindications || '',
          preparation: service.preparation || '',
          aftercare: service.aftercare || '',
          status: service.status || '',
        })

        // Set template based on service category
        const template = getTemplateFromCategory(service.category);
        setServiceTemplate(template);

        // Ensure 'hero' tab is always selected initially
        setActiveImageTab('hero');

        // Load actual images from the page using promises
        fetchActualPageImages(service.slug)
          .then(actualImages => {
        setOriginalImages(actualImages);

        // Set service images if they exist, otherwise use actuals
        if (serviceMockImages[service.slug as keyof typeof serviceMockImages]) {
          const templateImages: Record<string, any> = {};
          Object.keys(serviceMockImages[service.slug as keyof typeof serviceMockImages]).forEach(key => {
            if (key !== 'template') {
              templateImages[key] = serviceMockImages[service.slug as keyof typeof serviceMockImages][key];
            }
          });
          setSectionImages(templateImages);
        } else {
          // Use actual images as starting point
          setSectionImages(actualImages);
        }
          })
          .catch(error => {
            console.error('Error loading service images:', error);
            
            // Fall back to synchronous version if async fails
            const fallbackImages = fetchActualPageImagesSync(service.slug);
            setOriginalImages(fallbackImages);
            setSectionImages(fallbackImages);
          })
          .finally(() => {
        setLoading(false);
          });
      } else {
        setNotFound(true);
        setLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Update template when category changes
  useEffect(() => {
    if (formData.category) {
      const template = getTemplateFromCategory(formData.category);
      setServiceTemplate(template);
      
      // Set active tab to first section of new template
      const sections = serviceTemplates[template as keyof typeof serviceTemplates]?.sections || serviceTemplates['default'].sections;
      if (sections.length > 0) {
        setActiveImageTab(sections[0].id);
      }
    }
  }, [formData.category]);

  // Open media library dialog
  const openMediaDialog = (section: string, index = 0) => {
    setSelectedMediaTarget({ section, index });
    setSelectedMedia(null);
    setMediaDialogOpen(true);
  }

  // Select an image from media library
  const handleSelectMedia = (media: any) => {
    setSelectedMedia(media);
  }

  // Confirm media selection
  const handleConfirmMediaSelection = () => {
    if (selectedMedia) {
      const { section, index } = selectedMediaTarget;
      const currentSection = getTemplateSections().find(s => s.id === section);
      
      if (currentSection?.type === 'single') {
        // For single image sections
        setSectionImages({
          ...sectionImages,
          [section]: selectedMedia.path,
          // If this is the hero section, set the hero_type based on the file type
          ...(section === 'hero' && {
            hero_type: selectedMedia.type.startsWith('video/') ? 'video' : 'image'
          })
        });
      } else {
        // For multiple image sections
        const currentImages = Array.isArray(sectionImages[section]) ? [...sectionImages[section]] : [];
        
        if (index < currentImages.length) {
          // Replace existing image
          currentImages[index] = selectedMedia.path;
        } else {
          // Add new image
          currentImages.push(selectedMedia.path);
        }
        
        setSectionImages({
          ...sectionImages,
          [section]: currentImages
        });
      }
    }
    setMediaDialogOpen(false);
  }

  // Remove image
  const handleRemoveImage = (section: string, index = 0) => {
    const currentSection = getTemplateSections().find(s => s.id === section);
    
    if (currentSection?.type === 'single') {
      // For single image sections, just remove the path
      const updatedImages = { ...sectionImages } as Record<string, any>;
      delete updatedImages[section];
      setSectionImages(updatedImages);
    } else {
      // For multiple image sections, remove from array
      const currentImages = Array.isArray(sectionImages[section]) ? [...sectionImages[section]] : [];
      currentImages.splice(index, 1);
      
      setSectionImages({
        ...sectionImages,
        [section]: currentImages
      });
    }
  }

  // Update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Auto-generate slug from name if category exists
    if (name === 'name' && formData.category) {
      const categorySlug = formData.category.toLowerCase().replace(/\s+/g, '-')
      const nameSlug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')
      
      setFormData({
        ...formData,
        [name]: value,
        slug: `${categorySlug}/${nameSlug}`,
      })
    } else if (name === 'category' && formData.name) {
      const categorySlug = value.toLowerCase().replace(/\s+/g, '-')
      const nameSlug = formData.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')
      
      setFormData({
        ...formData,
        [name]: value,
        slug: `${categorySlug}/${nameSlug}`,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show saving state
    setSaving(true);
    
    // Include image data in the form submission
    const formDataWithImages = {
      ...formData,
      template: serviceTemplate,
      section_images: sectionImages
    };
    console.log('Form submitted:', formDataWithImages);
    
    try {
      // Make a real API call to update the service
      const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formDataWithImages),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update service: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Service updated successfully:', result);
      
      // Force a cache purge to ensure updated images show on the public-facing pages
      try {
        if (typeof purgeImageCache === 'function') {
          const categorySlug = formData.category.toLowerCase().replace(/\s+/g, '-');
          const treatmentSlug = formData.slug.split('/')[1];
          console.log(`Purging image cache for ${categorySlug}/${treatmentSlug}`);
          purgeImageCache(categorySlug, treatmentSlug);
        }
      } catch (error) {
        console.error('Error purging image cache:', error);
      }
      
      // Show success message
      setSuccessMessage('Service updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Redirect back to services list after a short delay
      setTimeout(() => router.push('/admin/services'), 1500);
    } catch (error) {
      console.error('Error updating service:', error);
      setErrorMessage('Failed to update service. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setSaving(false);
    }
  }

  // Add a function to manually purge image cache
  const handleRefreshImages = () => {
    try {
      setSaving(true);
      
      const categorySlug = formData.category.toLowerCase().replace(/\s+/g, '-');
      const treatmentSlug = formData.slug.split('/')[1];
      
      console.log(`Manually purging image cache for ${categorySlug}/${treatmentSlug}`);
      purgeImageCache(categorySlug, treatmentSlug);
      
      // Show success message
      setSuccessMessage('Image cache refreshed. Changes should be visible now.');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Force reload the current images by updating state
      setSectionImages({...sectionImages});
    } catch (error) {
      console.error('Error refreshing image cache:', error);
      setErrorMessage('Failed to refresh image cache. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setSaving(false);
    }
  }

  // Add this helper function before the return statement
  const getMediaDialogDescription = (): string => {
    const { section, index } = selectedMediaTarget;
    const currentSection = getTemplateSections().find(s => s.id === section);
    if (!currentSection) {
      return 'Select an image';
    }
    if (currentSection.type === 'multiple') {
      return `Select image for ${currentSection.name} (Position ${index + 1})`;
    }
    return `Select image for ${currentSection.name}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading service data...</p>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/services">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Services
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
          </div>
        </div>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Service with ID {id} not found. Please return to the services list and select a valid service.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const renderSectionImageControls = () => {
    const sections = getTemplateSections();
    const activeSection = sections.find((section: ServiceSection) => section.id === activeImageTab);
    
    if (!activeSection) return null;
    
    // Format category for cache-busting (lowercase with hyphens)
    const categorySlug = formData.category.toLowerCase().replace(/\s+/g, '-');
    const treatmentSlug = formData.slug.split('/')[1] || '';

    if (activeSection.type === 'single') {
      // Single image section
      const imagePath = sectionImages[activeSection.id];
      const originalImagePath = originalImages[activeSection.id];
      
      // Determine if this is a video (for hero section in youth-revival)
      const isVideo = activeSection.id === 'hero' && 
                     (sectionImages.hero_type === 'video' || 
                      (formData.slug === 'new-doublo/youth-revival' && activeSection.id === 'hero'));
      
      return (
        <div className="space-y-4">
          <ImagePreview 
            currentImage={imagePath?.toString()} 
            originalImage={originalImagePath?.toString()}
            mediaType={isVideo ? 'video' : 'image'}
            category={categorySlug}
            slug={treatmentSlug}
          />
           
          {/* Add media type toggle buttons for hero section */}
          {activeSection.id === 'hero' && (
            <div className="flex mb-2 bg-gray-100 p-1 rounded-md">
              <button
                type="button"
                onClick={() => {
                  // Convert video to image by changing extension and type
                  let newPath = imagePath?.toString() || '';
                  if (newPath.endsWith('.mp4')) {
                    newPath = newPath.replace(/\.mp4$/, '.jpg');
                  }
                  setSectionImages({
                    ...sectionImages,
                    hero_type: 'image',
                    hero: newPath || null
                  });
                }}
                className={`flex-1 py-1 px-2 text-xs rounded ${!isVideo ? 'bg-white shadow-sm' : ''}`}
              >
                <span className="flex items-center justify-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  Image
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  // Convert image to video by changing extension and type
                  let newPath = imagePath?.toString() || '';
                  if (newPath.endsWith('.jpg')) {
                    newPath = newPath.replace(/\.jpg$/, '.mp4');
                  }
                  setSectionImages({
                    ...sectionImages,
                    hero_type: 'video',
                    hero: newPath || null
                  });
                }}
                className={`flex-1 py-1 px-2 text-xs rounded ${isVideo ? 'bg-white shadow-sm' : ''}`}
              >
                <span className="flex items-center justify-center gap-1">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                    <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
                  </svg>
                  Video
                </span>
              </button>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              className="flex-1 items-center justify-center gap-2"
              onClick={() => openMediaDialog(activeSection.id)}
            >
              {isVideo ? 
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                    <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
                  </svg>
                  {imagePath ? `Change Video` : `Select Video`}
                </span> 
                : 
                <span className="flex items-center gap-2">
              <ImagePlus className="h-4 w-4" />
              {imagePath ? `Change Image` : `Select Image`}
                </span>
              }
            </Button>
            
            {imagePath && originalImagePath && imagePath !== originalImagePath && (
              <Button 
                variant="outline"
                onClick={() => {
                  setSectionImages({
                    ...sectionImages,
                    [activeSection.id]: originalImagePath,
                    ...(isVideo && { hero_type: 'video' })
                  });
                }}
              >
                Reset to Original
              </Button>
            )}
            
            {imagePath && (
              <Button 
                variant="destructive" 
                size="icon"
                onClick={() => handleRemoveImage(activeSection.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <p className="text-xs text-gray-500">
            {isVideo ? 
              'Recommended format: MP4. Max file size: 10MB.' : 
              'Recommended size: 1200 x 800 pixels. Max file size: 2MB.'}
            {originalImagePath && originalImagePath !== imagePath && 
              ` Hover to see the original ${isVideo ? 'video' : 'image'} from the page.`}
          </p>
        </div>
      );
    } else {
      // Multiple images section
      const images = Array.isArray(sectionImages[activeSection.id]) 
        ? sectionImages[activeSection.id] as string[] 
        : [];
      const originalSectionImages = Array.isArray(originalImages[activeSection.id]) 
        ? originalImages[activeSection.id] as string[] 
        : [];
      
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {images.map((image: string, index: number) => {
              const originalImage = originalSectionImages[index];
              return (
                <div key={index} className="relative group">
                  <ImagePreview
                    currentImage={image}
                    originalImage={originalImage}
                    aspectRatio="aspect-square"
                    category={categorySlug}
                    slug={treatmentSlug}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="mr-1"
                        onClick={() => handleRemoveImage(activeSection.id, index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => openMediaDialog(activeSection.id, index)}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      {originalImage && image !== originalImage && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const newImages = [...images];
                            newImages[index] = originalImage;
                            setSectionImages({
                              ...sectionImages,
                              [activeSection.id]: newImages
                            });
                          }}
                        >
                          Reset
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div 
              className="border border-dashed rounded-md flex items-center justify-center aspect-square bg-gray-50 cursor-pointer hover:bg-gray-100"
              onClick={() => openMediaDialog(activeSection.id, images.length)}
            >
              <ImagePlus className="h-6 w-6 text-gray-400" />
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
            {activeSection.name} images. Recommended size: 800 x 800 pixels.
            {originalSectionImages.length > 0 && " Hover to see controls and view original images."}
          </p>
        </div>
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/services">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Edit Service: {formData.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            className="flex items-center gap-2" 
            onClick={handleRefreshImages}
            disabled={saving}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Images
          </Button>
          <Button 
            className="flex items-center gap-2" 
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
              <Save className="h-4 w-4" />
              Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Success/Error messages */}
      {successMessage && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4 text-green-500" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      {/* Language Tabs */}
      <Card>
        <div className="flex items-center border-b">
          <button
            className={`flex items-center gap-2 px-4 py-3 font-medium ${
              activeTab === 'english' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('english')}
          >
            <Languages className="h-4 w-4" />
            English
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-3 font-medium ${
              activeTab === 'traditional_chinese' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('traditional_chinese')}
          >
            <Languages className="h-4 w-4" />
            Traditional Chinese
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-3 font-medium ${
              activeTab === 'simplified_chinese' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('simplified_chinese')}
          >
            <Languages className="h-4 w-4" />
            Simplified Chinese
          </button>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Main Form */}
        <div className="md:col-span-2 space-y-8">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Lymphatic Detox"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    placeholder="e.g. body-care/lymphatic-detox"
                    value={formData.slug}
                    onChange={handleChange}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This will be used in the URL: /{formData.slug || 'example/slug'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      placeholder="e.g. $1,200"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      placeholder="e.g. 120 min"
                      value={formData.duration}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="short_description">Short Description</Label>
                  <Textarea
                    id="short_description"
                    name="short_description"
                    placeholder="Brief description of the service (displayed in listings)"
                    rows={3}
                    value={formData.short_description}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="long_description">Full Description</Label>
                  <Textarea
                    id="long_description"
                    name="long_description"
                    placeholder="Detailed description of the service"
                    rows={8}
                    value={formData.long_description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </Card>
          
          {/* Additional Details */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold">Additional Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="benefits">Benefits</Label>
                <Textarea
                  id="benefits"
                  name="benefits"
                  placeholder="List the benefits of this service"
                  rows={4}
                  value={formData.benefits}
                  onChange={handleChange}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Each benefit on a new line or separated by commas
                </p>
              </div>
              
              <div>
                <Label htmlFor="suitable_for">Suitable For</Label>
                <Textarea
                  id="suitable_for"
                  name="suitable_for"
                  placeholder="Who is this service suitable for?"
                  rows={3}
                  value={formData.suitable_for}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="contraindications">Contraindications</Label>
                <Textarea
                  id="contraindications"
                  name="contraindications"
                  placeholder="Any contraindications or warnings"
                  rows={3}
                  value={formData.contraindications}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="preparation">Preparation</Label>
                  <Textarea
                    id="preparation"
                    name="preparation"
                    placeholder="How should clients prepare for this service?"
                    rows={3}
                    value={formData.preparation}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="aftercare">Aftercare</Label>
                  <Textarea
                    id="aftercare"
                    name="aftercare"
                    placeholder="What aftercare is recommended?"
                    rows={3}
                    value={formData.aftercare}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold">Page Template</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Using template: <span className="font-medium">{serviceTemplates[serviceTemplate]?.name || 'Default'}</span>
              </p>
              <p className="text-xs text-gray-500">
                The template is automatically selected based on the service category. Different templates have different image sections.
              </p>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold">Page Images</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-5">
                {/* Image Section Selector with Visual Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {getTemplateSections().map((section) => (
                    <div
                      key={section.id}
                      onClick={() => setActiveImageTab(section.id)}
                      className={`rounded-md border p-2 cursor-pointer transition-all ${
                        activeImageTab === section.id 
                          ? 'bg-primary/10 border-primary shadow-sm' 
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          activeImageTab === section.id ? 'bg-primary text-white' : 'bg-gray-100'
                        }`}>
                          {section.id === 'hero' ? (
                            <ImageIcon className="h-3 w-3" />
                          ) : section.id === 'before_after' ? (
                            <span className="text-xs">B/A</span>
                          ) : section.id === 'technology' ? (
                            <span className="text-xs">T</span>
                          ) : section.id === 'comparison' ? (
                            <span className="text-xs">C</span>
                          ) : (
                            <span className="text-xs">{section.name.charAt(0)}</span>
                          )}
                        </div>
                        <span className="text-xs font-medium">{section.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Image Content */}
                <div className="border rounded-md p-4 bg-white">
                  <h3 className="font-medium mb-4">{getTemplateSections().find(s => s.id === activeImageTab)?.name || 'Section'}</h3>
                  {renderSectionImageControls()}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Media Library Dialog */}
      <Dialog open={mediaDialogOpen} onOpenChange={setMediaDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Media Library</DialogTitle>
            <DialogDescription>
              {getMediaDialogDescription()}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
            {mockMediaLibrary.map((media) => (
              <div 
                key={media.id} 
                className={`border rounded-md overflow-hidden cursor-pointer ${
                  selectedMedia?.id === media.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleSelectMedia(media)}
              >
                <div className="relative">
                  <PlaceholderImage 
                    className="aspect-square w-full" 
                    imageUrl={media.path} 
                  />
                  {selectedMedia?.id === media.id && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium truncate">{media.name}</p>
                  <p className="text-xs text-gray-500">{media.size}</p>
                </div>
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setMediaDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmMediaSelection} disabled={!selectedMedia}>
              Select Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
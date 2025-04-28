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
  Image as ImageIcon
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
const mockServices = [
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

// Mock images for services, organized by sections
const serviceMockImages = {
  'body-care/lymphatic-detox': {
    template: 'body-care',
    hero: '/images/treatments/lymphatic/hero.jpg',
    how_it_works: [
      '/images/treatments/lymphatic/process-1.jpg',
      '/images/treatments/lymphatic/process-2.jpg',
      '/images/treatments/lymphatic/process-3.jpg',
    ],
    benefits: [
      '/images/treatments/lymphatic/benefit-1.jpg',
      '/images/treatments/lymphatic/benefit-2.jpg',
    ],
    results: [
      '/images/treatments/lymphatic/results-1.jpg',
      '/images/treatments/lymphatic/results-2.jpg',
    ],
    testimonials: '/images/treatments/lymphatic/testimonial.jpg'
  },
  'body-care/stretch-mark': {
    template: 'body-care',
    hero: '/images/treatments/stretch-mark/hero.jpg',
    how_it_works: [
      '/images/treatments/stretch-mark/process-1.jpg',
      '/images/treatments/stretch-mark/process-2.jpg',
    ],
    benefits: [
      '/images/treatments/stretch-mark/benefit-1.jpg',
      '/images/treatments/stretch-mark/benefit-2.jpg',
    ],
    results: [
      '/images/treatments/stretch-mark/results-1.jpg',
    ]
  },
  'new-doublo/v-line': {
    template: 'new-doublo',
    hero: '/images/treatments/v-line/hero.jpg',
    before_after: [
      '/images/treatments/v-line/before-after-1.jpg',
      '/images/treatments/v-line/before-after-2.jpg',
    ],
    technology: '/images/treatments/v-line/technology.jpg',
    comparison: '/images/treatments/v-line/comparison.jpg',
    testimonials: '/images/treatments/v-line/testimonial.jpg'
  }
};

// Service page templates with their sections
const serviceTemplates = {
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
const mockMediaLibrary = [
  { id: 1, path: '/images/media/image-1.jpg', name: 'Image 1', type: 'image/jpeg', size: '245 KB' },
  { id: 2, path: '/images/media/image-2.jpg', name: 'Image 2', type: 'image/jpeg', size: '312 KB' },
  { id: 3, path: '/images/media/image-3.jpg', name: 'Image 3', type: 'image/jpeg', size: '178 KB' },
  { id: 4, path: '/images/media/image-4.jpg', name: 'Image 4', type: 'image/jpeg', size: '425 KB' },
  { id: 5, path: '/images/media/image-5.jpg', name: 'Image 5', type: 'image/jpeg', size: '156 KB' },
  { id: 6, path: '/images/media/image-6.jpg', name: 'Image 6', type: 'image/jpeg', size: '289 KB' },
  { id: 7, path: '/images/media/image-7.jpg', name: 'Image 7', type: 'image/jpeg', size: '341 KB' },
  { id: 8, path: '/images/media/image-8.jpg', name: 'Image 8', type: 'image/jpeg', size: '203 KB' },
];

// Function to retrieve actual images from the service page
const fetchActualPageImages = (slug) => {
  // This is a mock function that would normally fetch images from the API or page renderer
  // In a real implementation, this would analyze the page content to extract images
  
  // Default empty structure
  const defaultImages = {
    hero: null,
    how_it_works: [],
    benefits: [],
    results: [],
    testimonials: null,
    before_after: [],
    technology: null,
    comparison: null
  };
  
  // If we don't have mock images for this slug, check if we can parse from actual page
  if (!serviceMockImages[slug]) {
    // In the prototype, we'll return placeholder image paths matching the section names
    const template = slug.split('/')[0];
    const pageType = slug.split('/')[1];
    
    // Generate placeholder paths that would simulate what we'd get from a real page
    return {
      hero: `/images/actual/${template}/${pageType}/hero.jpg`,
      how_it_works: [1, 2, 3].map(n => `/images/actual/${template}/${pageType}/process-${n}.jpg`),
      benefits: [1, 2].map(n => `/images/actual/${template}/${pageType}/benefit-${n}.jpg`),
      results: [1, 2].map(n => `/images/actual/${template}/${pageType}/result-${n}.jpg`),
      testimonials: `/images/actual/${template}/${pageType}/testimonial.jpg`,
      before_after: [1, 2].map(n => `/images/actual/${template}/${pageType}/before-after-${n}.jpg`),
      technology: `/images/actual/${template}/${pageType}/technology.jpg`,
      comparison: `/images/actual/${template}/${pageType}/comparison.jpg`,
    };
  }
  
  return serviceMockImages[slug] || defaultImages;
};

// Add image preview enhancement to display original vs current image
const ImagePreview = ({ currentImage, originalImage, className = '', aspectRatio = 'aspect-[3/2]' }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  
  return (
    <div 
      className={`relative ${className} border rounded-md overflow-hidden bg-gray-50`}
      onMouseEnter={() => originalImage && setShowOriginal(true)}
      onMouseLeave={() => setShowOriginal(false)}
    >
      {currentImage ? (
        <>
          <PlaceholderImage 
            className={`w-full ${aspectRatio}`}
            imageUrl={showOriginal ? originalImage : currentImage}
          />
          {originalImage && originalImage !== currentImage && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md">
              {showOriginal ? 'Original' : 'Modified'}
            </div>
          )}
        </>
      ) : originalImage ? (
        <>
          <PlaceholderImage 
            className={`w-full ${aspectRatio}`} 
            imageUrl={originalImage}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <p className="font-medium">Original Image</p>
              <p className="text-xs mt-1">Click to use this image</p>
            </div>
          </div>
        </>
      ) : (
        <div className={`flex items-center justify-center ${aspectRatio} bg-gray-100`}>
          <ImageIcon className="h-16 w-16 text-gray-300" />
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
  const [selectedMediaTarget, setSelectedMediaTarget] = useState({ section: 'hero', index: 0 })
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [serviceTemplate, setServiceTemplate] = useState('default')
  const [sectionImages, setSectionImages] = useState({})
  const [formData, setFormData] = useState({
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
  const [originalImages, setOriginalImages] = useState({});

  // Determine the template based on category
  const getTemplateFromCategory = (category) => {
    const categoryMap = {
      'Body Care': 'body-care',
      'New Doublo': 'new-doublo',
      'Facial Services': 'facial-services'
    };
    return categoryMap[category] || 'default';
  }

  // Get active template sections
  const getTemplateSections = () => {
    return serviceTemplates[serviceTemplate]?.sections || serviceTemplates['default'].sections;
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

        // Load actual images from the page
        const actualImages = fetchActualPageImages(service.slug);
        setOriginalImages(actualImages);

        // Set service images if they exist, otherwise use actuals
        if (serviceMockImages[service.slug]) {
          const templateImages = {};
          Object.keys(serviceMockImages[service.slug]).forEach(key => {
            if (key !== 'template') {
              templateImages[key] = serviceMockImages[service.slug][key];
            }
          });
          setSectionImages(templateImages);
        } else {
          // Use actual images as starting point
          setSectionImages(actualImages);
        }

        setLoading(false);
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
      const sections = serviceTemplates[template]?.sections || serviceTemplates['default'].sections;
      if (sections.length > 0) {
        setActiveImageTab(sections[0].id);
      }
    }
  }, [formData.category]);

  // Open media library dialog
  const openMediaDialog = (section, index = 0) => {
    setSelectedMediaTarget({ section, index });
    setSelectedMedia(null);
    setMediaDialogOpen(true);
  }

  // Select an image from media library
  const handleSelectMedia = (media) => {
    setSelectedMedia(media);
  }

  // Confirm media selection
  const handleConfirmMediaSelection = () => {
    if (selectedMedia) {
      const { section, index } = selectedMediaTarget;
      const currentSection = getTemplateSections().find(s => s.id === section);
      
      if (currentSection.type === 'single') {
        // For single image sections
        setSectionImages({
          ...sectionImages,
          [section]: selectedMedia.path
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
  const handleRemoveImage = (section, index = 0) => {
    const currentSection = getTemplateSections().find(s => s.id === section);
    
    if (currentSection.type === 'single') {
      // For single image sections, just remove the path
      const updatedImages = { ...sectionImages };
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
  const handleChange = (e) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Include image data in the form submission
    const formDataWithImages = {
      ...formData,
      template: serviceTemplate,
      section_images: sectionImages
    };
    console.log('Form submitted:', formDataWithImages);
    // Here you would normally send the data to an API
    alert('Service updated successfully (mock)');
    router.push('/admin/services');
  }

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
    const activeSection = sections.find(section => section.id === activeImageTab);
    
    if (!activeSection) return null;

    if (activeSection.type === 'single') {
      // Single image section
      const imagePath = sectionImages[activeSection.id];
      const originalImagePath = originalImages[activeSection.id];
      
      return (
        <div className="space-y-4">
          <ImagePreview 
            currentImage={imagePath} 
            originalImage={originalImagePath}
          />
          
          <div className="flex gap-2">
            <Button 
              className="flex-1 items-center justify-center gap-2"
              onClick={() => openMediaDialog(activeSection.id)}
            >
              <ImagePlus className="h-4 w-4" />
              {imagePath ? `Change Image` : `Select Image`}
            </Button>
            
            {imagePath && originalImagePath && imagePath !== originalImagePath && (
              <Button 
                variant="outline"
                onClick={() => {
                  setSectionImages({
                    ...sectionImages,
                    [activeSection.id]: originalImagePath
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
            Recommended size: 1200 x 800 pixels. Max file size: 2MB.
            {originalImagePath && originalImagePath !== imagePath && 
              " Hover to see the original image from the page."}
          </p>
        </div>
      );
    } else {
      // Multiple images section
      const images = Array.isArray(sectionImages[activeSection.id]) ? sectionImages[activeSection.id] : [];
      const originalSectionImages = Array.isArray(originalImages[activeSection.id]) ? originalImages[activeSection.id] : [];
      
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {images.map((image, index) => {
              const originalImage = originalSectionImages[index];
              return (
                <div key={index} className="relative group">
                  <ImagePreview
                    currentImage={image}
                    originalImage={originalImage}
                    aspectRatio="aspect-square"
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
        <Button className="flex items-center gap-2" onClick={handleSubmit}>
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
      
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
              <Tabs value={activeImageTab} onValueChange={setActiveImageTab}>
                <div className="relative max-w-full">
                  {getTemplateSections().length > 3 && (
                    <>
                      <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
                      <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
                    </>
                  )}
                  <TabsList 
                    className={`mb-4 w-full ${
                      getTemplateSections().length > 3 
                        ? 'overflow-x-auto flex-nowrap max-w-full pb-1 px-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400' 
                        : ''
                    }`}
                  >
                    {getTemplateSections().map(section => (
                      <TabsTrigger 
                        key={section.id} 
                        value={section.id} 
                        className="flex-shrink-0 min-w-max px-4 whitespace-nowrap mx-1"
                      >
                        {section.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                <TabsContent value={activeImageTab} className="mt-2">
                  {renderSectionImageControls()}
                </TabsContent>
              </Tabs>
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
              {(() => {
                const { section, index } = selectedMediaTarget;
                const currentSection = getTemplateSections().find(s => s.id === section);
                if (currentSection.type === 'multiple') {
                  return `Select image for ${currentSection.name} (Position ${index + 1})`;
                }
                return `Select image for ${currentSection.name}`;
              })()}
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
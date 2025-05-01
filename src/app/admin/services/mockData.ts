/**
 * Mock data for services
 */

export interface Service {
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

// Mock data for services - same as in the services edit page
export const mockServices: Service[] = [
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
]; 
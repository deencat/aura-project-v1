 'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import PlaceholderImage from '@/components/PlaceholderImage'
import { FeaturedContent } from '@/components/FeaturedContent'
import { BlogPost } from '@/utils/blogUtils'
import { Testimonial } from '@/utils/testimonialUtils'
import { useLanguage } from '@/contexts/LanguageContext'

// Mock blog posts data - in a real app, this would come from your API
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Benefits of Regular Facials",
    slug: "benefits-of-regular-facials",
    category: "Facial Treatments",
    content: "Regular facials can significantly improve your skin's health and appearance. They help to deeply cleanse pores, exfoliate dead skin cells, and hydrate the skin.",
    metaDescription: "Discover how regular facial treatments can improve skin health, reduce signs of aging, and provide relaxation benefits for overall wellbeing.",
    author: "Sarah Johnson",
    publishDate: "2023-08-15",
    status: "Published",
    featuredImage: "/images/placeholder.jpg",
    multilingual: {
      english: {
        title: "The Benefits of Regular Facials",
        content: "Regular facials can significantly improve your skin's health and appearance. They help to deeply cleanse pores, exfoliate dead skin cells, and hydrate the skin.",
        metaDescription: "Discover how regular facial treatments can improve skin health, reduce signs of aging, and provide relaxation benefits for overall wellbeing."
      },
      traditional_chinese: {
        title: "定期面部護理的好處",
        content: "定期進行面部護理可以顯著改善皮膚健康和外觀。它們有助於深層清潔毛孔，去除死皮細胞，並為皮膚補充水分。",
        metaDescription: "了解定期面部護理如何改善皮膚健康，減少衰老跡象，並為整體健康提供放鬆益處。"
      },
      simplified_chinese: {
        title: "定期面部护理的好处",
        content: "定期进行面部护理可以显著改善皮肤健康和外观。它们有助于深层清洁毛孔，去除死皮细胞，并为皮肤补充水分。",
        metaDescription: "了解定期面部护理如何改善皮肤健康，减少衰老迹象，并为整体健康提供放松益处。"
      }
    }
  },
  {
    id: 2,
    title: "5 Things to Know Before Getting a Chemical Peel",
    slug: "things-to-know-before-chemical-peel",
    category: "Specialized Services",
    content: "Chemical peels are powerful treatments that can transform your skin, but there are important things to know before you book your appointment.",
    metaDescription: "Learn the essential facts about chemical peels before your treatment, including preparation, aftercare, and what results to expect.",
    author: "Dr. Emily Chen",
    publishDate: "2023-09-02",
    status: "Published",
    featuredImage: "/images/placeholder.jpg",
    multilingual: {
      english: {
        title: "5 Things to Know Before Getting a Chemical Peel",
        content: "Chemical peels are powerful treatments that can transform your skin, but there are important things to know before you book your appointment.",
        metaDescription: "Learn the essential facts about chemical peels before your treatment, including preparation, aftercare, and what results to expect."
      },
      traditional_chinese: {
        title: "化學換膚前需要知道的5件事",
        content: "化學換膚是一種強效的護理，可以徹底改變你的皮膚，但在預約前有一些重要的事情需要了解。",
        metaDescription: "了解化學換膚前的必備知識，包括準備工作、術後護理和預期效果。"
      },
      simplified_chinese: {
        title: "化学换肤前需要知道的5件事",
        content: "化学换肤是一种强效的护理，可以彻底改变你的皮肤，但在预约前有一些重要的事情需要了解。",
        metaDescription: "了解化学换肤前的必备知识，包括准备工作、术后护理和预期效果。"
      }
    }
  },
  {
    id: 3,
    title: "Skincare Routine for Combination Skin",
    slug: "skincare-routine-combination-skin",
    category: "Skincare Tips",
    content: "Combination skin presents unique challenges that require a balanced approach to skincare. Learn how to manage both oily and dry areas effectively.",
    metaDescription: "Discover the perfect skincare routine for combination skin with tips on managing both oily and dry areas for a balanced, healthy complexion.",
    author: "Lisa Wang",
    publishDate: "2023-10-10",
    status: "Published",
    featuredImage: "/images/placeholder.jpg",
    multilingual: {
      english: {
        title: "Skincare Routine for Combination Skin",
        content: "Combination skin presents unique challenges that require a balanced approach to skincare. Learn how to manage both oily and dry areas effectively.",
        metaDescription: "Discover the perfect skincare routine for combination skin with tips on managing both oily and dry areas for a balanced, healthy complexion."
      },
      traditional_chinese: {
        title: "混合性肌膚的護膚程序",
        content: "混合性肌膚帶來獨特的挑戰，需要平衡的護理方法。學習如何有效管理油性和乾性區域。",
        metaDescription: "發現適合混合性肌膚的完美護膚程序，掌握管理油性和乾性區域的技巧，讓肌膚健康平衡。"
      },
      simplified_chinese: {
        title: "混合性肌肤的护肤程序",
        content: "混合性肌肤带来独特的挑战，需要平衡的护理方法。学习如何有效管理油性和干性区域。",
        metaDescription: "发现适合混合性肌肤的完美护肤程序，掌握管理油性和干性区域的技巧，让肌肤健康平衡。"
      }
    }
  }
]

// Mock testimonials data - in a real app, this would come from your API
const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    clientName: "Emma Thompson",
    service: "Royal Black Scan",
    rating: 5,
    date: "2023-08-15",
    status: "Published",
    featured: true,
    content: "The Royal Black Scan treatment was amazing! My skin looks younger and more radiant than it has in years. The staff was professional and made me feel comfortable throughout the entire process.",
    multilingual: {
      english: {
        clientName: "Emma Thompson",
        content: "The Royal Black Scan treatment was amazing! My skin looks younger and more radiant than it has in years. The staff was professional and made me feel comfortable throughout the entire process."
      },
      traditional_chinese: {
        clientName: "艾瑪·湯普森",
        content: "皇家黑掃描療程真的很棒！我的皮膚看起來比過去幾年更年輕、更有光澤。工作人員非常專業，讓我在整個過程中感到舒適。"
      },
      simplified_chinese: {
        clientName: "艾玛·汤普森",
        content: "皇家黑扫描疗程真的很棒！我的皮肤看起来比过去几年更年轻、更有光泽。工作人员非常专业，让我在整个过程中感到舒适。"
      }
    }
  },
  {
    id: 2,
    clientName: "Michael Wang",
    service: "Collagen Regeneration",
    rating: 4,
    date: "2023-09-22",
    status: "Published",
    featured: false,
    content: "After just three sessions of the Collagen Regeneration treatment, I noticed significant improvement in my skin elasticity. My friends keep asking what my secret is!",
    multilingual: {
      english: {
        clientName: "Michael Wang",
        content: "After just three sessions of the Collagen Regeneration treatment, I noticed significant improvement in my skin elasticity. My friends keep asking what my secret is!"
      },
      traditional_chinese: {
        clientName: "王明輝",
        content: "僅僅三次膠原蛋白再生療程後，我就注意到我的皮膚彈性有了顯著改善。我的朋友們一直在問我的秘密是什麼！"
      },
      simplified_chinese: {
        clientName: "王明辉",
        content: "仅仅三次胶原蛋白再生疗程后，我就注意到我的皮肤弹性有了显著改善。我的朋友们一直在问我的秘密是什么！"
      }
    }
  },
  {
    id: 3,
    clientName: "Sarah Johnson",
    service: "Lymphatic Detox",
    rating: 5,
    date: "2023-10-05",
    status: "Published",
    featured: true,
    content: "The Lymphatic Detox treatment helped reduce my bloating and water retention. I feel lighter and more energetic. Will definitely be coming back for more sessions.",
    multilingual: {
      english: {
        clientName: "Sarah Johnson",
        content: "The Lymphatic Detox treatment helped reduce my bloating and water retention. I feel lighter and more energetic. Will definitely be coming back for more sessions."
      },
      traditional_chinese: {
        clientName: "莎拉·約翰遜",
        content: "淋巴排毒療程幫助減少了我的腹脹和水腫。我感覺更輕盈，更有活力。一定會回來做更多療程。"
      },
      simplified_chinese: {
        clientName: "莎拉·约翰逊",
        content: "淋巴排毒疗程帮助减少了我的腹胀和水肿。我感觉更轻盈，更有活力。一定会回来做更多疗程。"
      }
    }
  }
]

export default function Home() {
  const { language, t } = useLanguage()

  const copy =
    language === 'zh-Hant'
      ? {
          heroTitle: '煥亮你的肌膚',
          heroDescription:
            '運用前沿科技，進行高效美肌療程，襯托你天生的自然光采。',
          heroExplore: '探索療程',
          heroBook: '預約諮詢',

          storyPrefix: '我們的',
          storyEmphasis: '故事',
          storyP1:
            'SW Beauty 致力提供多元、有效且安全的美肌療程。匯聚來自世界各地的專業設備與技術，為每位客戶呈獻最貼心、最合適、最理想的服務體驗。',
          storyP2:
            '我們由內而外呵護每一吋肌膚，透過度身訂造的護理方案，陪你達成美麗目標。',
          aboutLearnMore: '了解更多我們的理念',

          signaturePrefix: '招牌',
          signatureEmphasis: '療程',
          treatment1Desc: '先進科技，精準針對各類色斑、膚色不均與肌膚瑕疵。',
          treatment2Desc: '革新式療程，打造絲滑細緻、宛如天生般的亮滑膚質與光采。',
          treatment3Desc: '提升肌膚自然膠原生成，改善彈性與年輕感。',
          viewAllTreatments: '查看所有療程',

          servicesPrefix: '我們的',
          servicesEmphasis: '服務',
          categoryPremium: '尊貴美容療程',
          categoryBody: '身體護理療程',
          categoryAi: 'AI 面部濾鏡療程',
          categoryCell: '細胞美容科技',
          exploreLabel: '探索',

          offersPrefix: '限量',
          offersEmphasis: '優惠',
          offerTitle: '新客專享',
          offerDescription: '首趟即享 20% 折扣，體驗我們的尊貴美肌療程。感受專業護理帶來的不同。',
          offerBullets: ['只限首次客戶使用', '適用於任何 $100 以上的療程', '優惠至 2023 年 12 月 31 日止'],
          offerBook: '立即預約',

          contactTitle: '準備好煥亮你的美麗？',
          contactDescription: '預約與我們的美肌專家會面，為你量身尋找最合適的療程建議。',
          contactButton: '立即聯絡我們',
        }
      : language === 'zh-Hans'
        ? {
            heroTitle: '焕亮你的肌肤',
            heroDescription: '运用前沿科技，进行高效美肌疗程，衬托你天生的自然光采。',
            heroExplore: '探索疗程',
            heroBook: '预约咨询',

            storyPrefix: '我们的',
            storyEmphasis: '故事',
            storyP1:
              'SW Beauty 致力提供多元、有效且安全的美肌疗程。汇聚来自世界各地的专业设备与技术，为每位客户呈献最贴心、最合适、最理想的服务体验。',
            storyP2: '我们由内而外呵护每一寸肌肤，通过量身定制的护理方案，陪你达成美丽目标。',
            aboutLearnMore: '了解更多我们的理念',

            signaturePrefix: '招牌',
            signatureEmphasis: '疗程',
            treatment1Desc: '先进科技，精准针对各类色斑、肤色不均与肌肤瑕疵。',
            treatment2Desc: '革新式疗程，打造丝滑细致、如同天生般的亮滑肤质与光采。',
            treatment3Desc: '提升肌肤自然胶原生成，改善弹性与年轻感。',
            viewAllTreatments: '查看所有疗程',

            servicesPrefix: '我们的',
            servicesEmphasis: '服务',
            categoryPremium: '尊贵美容疗程',
            categoryBody: '身体护理疗程',
            categoryAi: 'AI 面部滤镜疗程',
            categoryCell: '细胞美容科技',
            exploreLabel: '探索',

            offersPrefix: '限量',
            offersEmphasis: '优惠',
            offerTitle: '新客专享',
            offerDescription: '首趟即享 20% 折扣，体验我们的尊贵美肌疗程。感受专业护理带来的不同。',
            offerBullets: ['仅限首次客户使用', '适用于任何 $100 以上的疗程', '优惠至 2023 年 12 月 31 日止'],
            offerBook: '立即预约',

            contactTitle: '准备好焕亮你的美丽？',
            contactDescription: '预约与我们美肌专家会面，为你量身寻找最合适的疗程建议。',
            contactButton: '立即联系我们',
          }
        : {
            heroTitle: 'Transform Your Skin',
            heroDescription: 'Advanced beauty treatments using cutting-edge technology to enhance your natural beauty.',
            heroExplore: 'Explore Treatments',
            heroBook: 'Book a Consultation',

            storyPrefix: 'Our',
            storyEmphasis: 'Story',
            storyP1:
              'SW Beauty is dedicated to providing diverse, effective, and safe beauty treatments. We bring together professional equipment and techniques from around the world to deliver the most caring, suitable, and optimal service experience for every client.',
            storyP2: 'We protect and enhance every inch of your skin, inside and out, helping you achieve your beauty goals with personalized care.',
            aboutLearnMore: 'Learn More About Us',

            signaturePrefix: 'Signature',
            signatureEmphasis: 'Treatments',
            treatment1Desc:
              'Advanced technology that targets all types of spots, pigmentation, and skin blemishes with precision.',
            treatment2Desc:
              'Revolutionary treatment that creates silky smooth, flawless skin texture with a radiant complexion.',
            treatment3Desc: "Boost your skin's natural collagen production for improved elasticity and youthful appearance.",
            viewAllTreatments: 'View All Treatments',

            servicesPrefix: 'Our',
            servicesEmphasis: 'Services',
            categoryPremium: 'Premium Beauty Treatments',
            categoryBody: 'Body Care Treatments',
            categoryAi: 'AI Facial Filters',
            categoryCell: 'Cell Beauty Technology',
            exploreLabel: 'Explore',

            offersPrefix: 'Limited',
            offersEmphasis: 'Offers',
            offerTitle: 'New Client Special',
            offerDescription:
              'Experience our premium treatments with 20% off your first visit. Discover the difference professional care can make.',
            offerBullets: [
              'Valid for first-time clients only',
              'Applicable to any treatment over $100',
              'Offer expires December 31, 2023',
            ],
            offerBook: 'Book Now',

            contactTitle: 'Ready to Transform Your Beauty?',
            contactDescription:
              'Book a consultation with our beauty experts and discover the perfect treatments for your unique needs.',
            contactButton: 'Contact Us Today',
          }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh]">
        <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
              <span className="block">SW Beauty</span>
              <span className="mt-2 block text-primary">{copy.heroTitle}</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-foreground/70">
              {copy.heroDescription}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href="/treatments">
                <Button className="px-8 py-6 text-base font-medium uppercase tracking-wide">
                  {copy.heroExplore}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 py-6 text-base font-medium uppercase tracking-wide">
                  {copy.heroBook}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              {copy.storyPrefix} <span className="text-primary">{copy.storyEmphasis}</span>
            </h2>
            <div className="mt-6 text-lg leading-relaxed text-foreground/70">
              <p className="mb-4">
                {copy.storyP1}
              </p>
              <p>
                {copy.storyP2}
              </p>
            </div>
            <div className="mt-10">
              <Link href="/about">
                <Button variant="ghost" className="text-primary hover:bg-white/50 hover:text-foreground">
                  {copy.aboutLearnMore}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Treatments */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center font-serif text-3xl font-bold md:text-4xl">
            {copy.signaturePrefix} <span className="text-primary">{copy.signatureEmphasis}</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Treatment 1 */}
            <div className="group overflow-hidden rounded-2xl border border-white/55 bg-aura-card shadow-[0_10px_40px_-25px_rgba(198,62,110,0.55)] backdrop-blur-md transition hover:shadow-[0_16px_60px_-30px_rgba(198,62,110,0.70)]">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <PlaceholderImage 
                  type="treatment" 
                  number={1} 
                  aspectRatio="aspect-[4/3]"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">{t('royal_black_scan', 'Royal Black Scan')}</h3>
                <p className="mb-5 text-foreground/70">{copy.treatment1Desc}</p>
                <Link href="/treatments/royal-black-scan">
                  <Button className="w-full px-6 py-2 text-sm font-medium">
                    {t('learn_more', 'Learn More')}
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Treatment 2 */}
            <div className="group overflow-hidden rounded-2xl border border-white/55 bg-aura-card shadow-[0_10px_40px_-25px_rgba(198,62,110,0.55)] backdrop-blur-md transition hover:shadow-[0_16px_60px_-30px_rgba(198,62,110,0.70)]">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <PlaceholderImage 
                  type="treatment" 
                  number={2} 
                  aspectRatio="aspect-[4/3]"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">{t('peeled_egg_skin', 'Peeled Egg Skin')}</h3>
                <p className="mb-5 text-foreground/70">{copy.treatment2Desc}</p>
                <Link href="/treatments/peeled-egg-skin">
                  <Button className="w-full px-6 py-2 text-sm font-medium">
                    {t('learn_more', 'Learn More')}
                  </Button>
                </Link>
              </div>

            </div>

            {/* Treatment 3 */}
            <div className="group overflow-hidden rounded-2xl border border-white/55 bg-aura-card shadow-[0_10px_40px_-25px_rgba(198,62,110,0.55)] backdrop-blur-md transition hover:shadow-[0_16px_60px_-30px_rgba(198,62,110,0.70)]">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <PlaceholderImage 
                  type="treatment" 
                  number={3} 
                  aspectRatio="aspect-[4/3]"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">{t('collagen_regeneration', 'Collagen Regeneration')}</h3>
                <p className="mb-5 text-foreground/70">{copy.treatment3Desc}</p>
                <Link href="/treatments/collagen-regeneration">
                  <Button className="w-full px-6 py-2 text-sm font-medium">
                    {t('learn_more', 'Learn More')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/treatments">
              <Button className="px-8 py-3 text-sm font-medium">
                {copy.viewAllTreatments}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center font-serif text-3xl font-bold md:text-4xl">
            {copy.servicesPrefix} <span className="text-primary">{copy.servicesEmphasis}</span>
            </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Category 1 */}
            <div className="overflow-hidden rounded-2xl border border-white/55 bg-aura-card shadow-[0_10px_40px_-25px_rgba(198,62,110,0.55)] backdrop-blur-md transition hover:shadow-[0_16px_60px_-30px_rgba(198,62,110,0.70)]">
              <div className="aspect-square w-full overflow-hidden">
                <PlaceholderImage 
                  type="beauty" 
                  number={1} 
                  aspectRatio="aspect-square"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="mb-2 text-xl font-bold">{copy.categoryPremium}</h3>
                <Link href="/treatments">
                  <Button variant="ghost" className="mt-2 text-primary hover:bg-white/50 hover:text-foreground">
                    {copy.exploreLabel}
                  </Button>
                </Link>
          </div>
            </div>
            
            {/* Category 2 */}
            <div className="overflow-hidden rounded-2xl border border-white/55 bg-aura-card shadow-[0_10px_40px_-25px_rgba(198,62,110,0.55)] backdrop-blur-md transition hover:shadow-[0_16px_60px_-30px_rgba(198,62,110,0.70)]">
              <div className="aspect-square w-full overflow-hidden">
                <PlaceholderImage 
                  type="beauty" 
                  number={2} 
                  aspectRatio="aspect-square"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="mb-2 text-xl font-bold">{copy.categoryBody}</h3>
                <Link href="/body-care">
                  <Button variant="ghost" className="mt-2 text-primary hover:bg-white/50 hover:text-foreground">
                    {copy.exploreLabel}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Category 3 */}
            <div className="overflow-hidden rounded-2xl border border-white/55 bg-aura-card shadow-[0_10px_40px_-25px_rgba(198,62,110,0.55)] backdrop-blur-md transition hover:shadow-[0_16px_60px_-30px_rgba(198,62,110,0.70)]">
              <div className="aspect-square w-full overflow-hidden">
                <PlaceholderImage 
                  type="beauty" 
                  number={3} 
                  aspectRatio="aspect-square"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
          </div>
              <div className="p-6 text-center">
                <h3 className="mb-2 text-xl font-bold">{copy.categoryAi}</h3>
                <Link href="/facial-filters">
                  <Button variant="ghost" className="mt-2 text-primary hover:bg-white/50 hover:text-foreground">
                    {copy.exploreLabel}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Category 4 */}
            <div className="overflow-hidden rounded-2xl border border-white/55 bg-aura-card shadow-[0_10px_40px_-25px_rgba(198,62,110,0.55)] backdrop-blur-md transition hover:shadow-[0_16px_60px_-30px_rgba(198,62,110,0.70)]">
              <div className="aspect-square w-full overflow-hidden">
                <PlaceholderImage 
                  type="beauty" 
                  number={4} 
                  aspectRatio="aspect-square"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="mb-2 text-xl font-bold">{copy.categoryCell}</h3>
                <Link href="/cell-beauty">
                  <Button variant="ghost" className="mt-2 text-primary hover:bg-white/50 hover:text-foreground">
                    {copy.exploreLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-center font-serif text-3xl font-bold md:text-4xl">
              {copy.offersPrefix} <span className="text-primary">{copy.offersEmphasis}</span>
            </h2>
            <div className="overflow-hidden rounded-2xl border border-white/55 bg-aura-card p-8 shadow-[0_16px_60px_-30px_rgba(198,62,110,0.70)] backdrop-blur-md">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="w-full md:w-2/3">
                  <h3 className="mb-4 text-2xl font-bold">{copy.offerTitle}</h3>
                  <p className="mb-5 text-lg text-foreground/70">
                    {copy.offerDescription}
                  </p>
                  <ul className="mb-6 space-y-2">
                    {copy.offerBullets.map((b) => (
                      <li key={b} className="flex items-center">
                        <span className="mr-2 text-primary">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button className="px-6 py-2 text-sm font-medium">
                      {copy.offerBook}
                    </Button>
                  </Link>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="overflow-hidden rounded-2xl">
                    <PlaceholderImage 
                      type="offer" 
                      number={1} 
                      aspectRatio="aspect-square"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts and Testimonials */}
      <FeaturedContent 
        blogPosts={mockBlogPosts}
        testimonials={mockTestimonials}
        className="bg-transparent"
      />

      {/* Contact CTA */}
      <section className="py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">{copy.contactTitle}</h2>
            <p className="mb-10 text-lg">{copy.contactDescription}</p>
            <Link href="/contact">
              <Button variant="outline" className="border-white/70 bg-white/10 px-8 py-3 text-sm font-medium text-white hover:bg-white/30">
                {copy.contactButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
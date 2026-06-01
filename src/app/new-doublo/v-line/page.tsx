'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, Check, Star } from 'lucide-react'
import TreatmentImage from '@/components/TreatmentImage'
import { useLanguage } from '@/contexts/LanguageContext'

const REVIEW_AVATAR_ACCENTS = ['bg-primary', 'bg-rose-500', 'bg-sky-600', 'bg-amber-600'] as const

function ReviewAvatar({ name, accentIndex }: { name: string; accentIndex: number }) {
  const match = name.match(/[A-Za-z\u4e00-\u9fff]/)
  const letter = match
    ? /[A-Za-z]/.test(match[0])
      ? match[0].toUpperCase()
      : match[0]
    : '?'
  const bg = REVIEW_AVATAR_ACCENTS[accentIndex % REVIEW_AVATAR_ACCENTS.length]
  return (
    <div
      className={`mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${bg}`}
      aria-hidden
    >
      {letter}
    </div>
  )
}

export default function VLinePage() {
  const { language } = useLanguage()

  const copy =
    language === 'zh-Hant'
      ? {
          pill: '韓系人氣療程',
          titleA: 'V‑Line',
          titleB: 'Perfection',
          subtitle: '韓系V面下顎線秘密',
          heroDesc:
            '打造人人都想要的 V 字下顎線輪廓，令面形更俐落、更顯年輕。無需開刀的 V‑Line 療程可針對下顎線與雙下巴位置作出塑形與緊緻。',
          limitedOffer: '限時優惠：',
          save: '節省 20%',
          ctaPrimary: '立即體驗 V‑Line',
          ctaSecondary: '了解更多',

          benefitsTitle: '為何人人都想要',
          benefitsEmphasis: 'V‑Line',
          benefitsDesc:
            'V 字下顎線是韓系美學與現代面部輪廓的代表，令面形更修長、更上鏡。',
          b1Title: '下顎線更修長',
          b1Body: '針對下半面輪廓，改善寬闊感，打造更細緻的面形線條。',
          b2Title: '角度更立體',
          b2Body: '加強面部輪廓線條與層次感，令側面更上鏡、輪廓更分明。',
          b3Title: '淡化雙下巴',
          b3Body: '改善下巴底部飽滿感，令輪廓更乾淨俐落，任何角度更顯年輕。',

          techLabel: '療程科技',
          howTitleA: 'V‑Line',
          howTitleB: '原理',
          howDesc:
            'V‑Line Perfection 採用 New Doublo™ 先進雙重能量科技，針對下顎線作出精準塑形與緊緻。',
          step1Title: '針對性脂肪管理',
          step1Body: 'MFU 針對下顎線及雙下巴位置的頑固脂肪，令下半面更修長。',
          step2Title: '肌肉緊實塑形',
          step2Body: '4RF 強化下顎線相關肌群緊緻度，令角度更清晰、更立體。',
          step3Title: '緊緻拉提',
          step3Body: '刺激膠原增生，改善鬆弛，令下顎線更緊緻、輪廓更年輕。',
          step4Title: '漸進式改善',
          step4Body: '即時可見改善，同時於 2–3 個月內持續提升，V 面線條更明顯。',
          experiences: '客人分享',
          verified: '已驗證客戶',
          testimonials: [
            {
              name: '陳小姐',
              ageLine: '25 歲',
              stars: 5,
              quote: '「下顎線從未試過咁靚！自拍效果大提升，一次療程已經見到分別。」',
            },
            {
              name: '唐小姐',
              ageLine: '32 歲',
              stars: 5,
              quote: '「生完兩個小朋友之後下顎線唔見咗，做完 V‑Line 又返嚟！過程舒適，唔算痛。」',
            },
            {
              name: '何先生',
              ageLine: '38 歲',
              stars: 4,
              quote: '「作為男士，本來有啲猶豫，但想改善雙下巴。效果自然但有感，正正係我想要。」',
            },
            {
              name: '黃小姐',
              ageLine: '29 歲',
              stars: 5,
              quote: '「為咗下顎線試過好多方法，V‑Line 幾星期就有改善，專業又舒服。」',
            },
          ],

          compareLabel: '為何選擇我們',
          compareTitleA: 'V‑Line Perfection vs.',
          compareTitleB: '其他選項',
          compareDesc: '比較不同下顎線塑形方案的效果與恢復期。',
          thFeature: '項目',
          thVline: 'V‑Line Perfection',
          thVlineNote: '（New Doublo™）',
          thFillers: '填充針／注射',
          thFillersNote: '（短暫）',
          thSurgery: '手術',
          thSurgeryNote: '（侵入式）',
          rowRecovery: '恢復期',
          rowDuration: '維持時間',
          rowPain: '痛感',
          rowNatural: '自然度',
          rowSafety: '安全度',
          none: '無',
          days13: '1–3 日',
          weeks24: '2–4 週',
          months1218: '12–18 個月',
          months612: '6–12 個月',
          permanent: '永久',
          minimal: '輕微',
          moderate: '中等',
          high: '高',
          varies: '視乎情況',
          costHigh: '高',
          costMedium: '中',
          costLow: '低',

          promoPill: '限時推廣',
          promoTitleA: '韓系',
          promoTitleB: '限定優惠',
          promoDesc: '以限定優惠體驗 V‑Line Perfection 套餐，最高可節省 30%。',
          promoList: [
            '完整 V‑Line 療程（45–60 分鐘）',
            '膠原活肌精華導入',
            'LED 光療加強效果',
            '附送面部按摩',
            '個人化術後護理建議',
          ],
          promoPriceLabel: '優惠價：',
          promoNote: '*優惠至 [日期]。名額有限。',
          bookBoxTitle: '預約 V‑Line 療程',
          bookBoxDesc: '立即預約鎖定優惠價，包含免費諮詢。',
          bookNow: '立即預約',
          callLabel: '或致電：',

          finalTitleA: '準備好擁有你的',
          finalTitleB: '韓劇同款',
          finalTitleC: '下顎線？',
          finalDesc: '加入眾多滿意客戶，一同體驗更俐落的 V‑Line 輪廓。',
          finalCta: '立即提升輪廓',
        }
      : language === 'zh-Hans'
        ? {
            pill: '韩系人气疗程',
            titleA: 'V‑Line',
            titleB: 'Perfection',
            subtitle: '韩系V面下颌线秘密',
            heroDesc:
              '打造人人都想要的 V 字下颌线轮廓，让脸型更利落、更显年轻。无需开刀的 V‑Line 疗程可针对下颌线与双下巴位置进行塑形与紧致。',
            limitedOffer: '限时优惠：',
            save: '立省 20%',
            ctaPrimary: '立即体验 V‑Line',
            ctaSecondary: '了解更多',

            benefitsTitle: '为何人人都想要',
            benefitsEmphasis: 'V‑Line',
            benefitsDesc:
              'V 字下颌线是韩系美学与现代面部轮廓的代表，让脸型更修长、更上镜。',
            b1Title: '下颌线更修长',
            b1Body: '针对下半脸轮廓，改善宽阔感，打造更细致的脸型线条。',
            b2Title: '角度更立体',
            b2Body: '强化面部轮廓线条与层次感，让侧脸更上镜、轮廓更分明。',
            b3Title: '淡化双下巴',
            b3Body: '改善下巴底部饱满感，让轮廓更干净利落，各个角度更显年轻。',

            techLabel: '疗程科技',
            howTitleA: 'V‑Line',
            howTitleB: '原理',
            howDesc:
              'V‑Line Perfection 采用 New Doublo™ 先进双重能量科技，针对下颌线进行精准塑形与紧致。',
            step1Title: '针对性脂肪管理',
            step1Body: 'MFU 针对下颌线及双下巴位置的顽固脂肪，让下半脸更修长。',
            step2Title: '肌肉紧实塑形',
            step2Body: '4RF 强化下颌线相关肌群紧致度，让角度更清晰、更立体。',
            step3Title: '紧致拉提',
            step3Body: '刺激胶原增生，改善松弛，让下颌线更紧致、轮廓更年轻。',
            step4Title: '渐进式改善',
            step4Body: '即时可见改善，并在 2–3 个月内持续提升，V 面线条更明显。',
            experiences: '客户分享',
            verified: '已验证客户',
            testimonials: [
              {
                name: '陈小姐',
                ageLine: '25 岁',
                stars: 5,
                quote: '「下颌线从没这么好看过！自拍效果大提升，一次疗程就看到明显变化。」',
              },
              {
                name: '唐小姐',
                ageLine: '32 岁',
                stars: 5,
                quote: '「生完两个孩子后下颌线不见了，做完 V‑Line 又回来了！过程舒适，不太痛。」',
              },
              {
                name: '何先生',
                ageLine: '38 岁',
                stars: 4,
                quote: '「作为男士一开始有点犹豫，但想改善双下巴。效果自然但有感，正是我想要的。」',
              },
              {
                name: '黄小姐',
                ageLine: '29 岁',
                stars: 5,
                quote: '「为了下颌线试过很多方法，V‑Line 几周就见到改善，专业又舒服。」',
              },
            ],

            compareLabel: '为何选择我们',
            compareTitleA: 'V‑Line Perfection vs.',
            compareTitleB: '其他选项',
            compareDesc: '比较不同下颌线塑形方案的效果与恢复期。',
            thFeature: '项目',
            thVline: 'V‑Line Perfection',
            thVlineNote: '（New Doublo™）',
            thFillers: '填充针／注射',
            thFillersNote: '（短暂）',
            thSurgery: '手术',
            thSurgeryNote: '（侵入式）',
            rowRecovery: '恢复期',
            rowDuration: '维持时间',
            rowPain: '痛感',
            rowNatural: '自然度',
            rowSafety: '安全度',
            none: '无',
            days13: '1–3 天',
            weeks24: '2–4 周',
            months1218: '12–18 个月',
            months612: '6–12 个月',
            permanent: '永久',
            minimal: '轻微',
            moderate: '中等',
            high: '高',
            varies: '视情况而定',
            costHigh: '高',
            costMedium: '中',
            costLow: '低',

            promoPill: '限时推广',
            promoTitleA: '韩系',
            promoTitleB: '限定优惠',
            promoDesc: '以限定优惠体验 V‑Line Perfection 套餐，最高可立省 30%。',
            promoList: [
              '完整 V‑Line 疗程（45–60 分钟）',
              '胶原活肌精华导入',
              'LED 光疗加强效果',
              '附赠面部按摩',
              '个性化术后护理建议',
            ],
            promoPriceLabel: '优惠价：',
            promoNote: '*优惠至 [日期]。名额有限。',
            bookBoxTitle: '预约 V‑Line 疗程',
            bookBoxDesc: '立即预约锁定优惠价，包含免费咨询。',
            bookNow: '立即预约',
            callLabel: '或致电：',

            finalTitleA: '准备好拥有你的',
            finalTitleB: '韩剧同款',
            finalTitleC: '下颌线？',
            finalDesc: '加入众多满意客户，一同体验更利落的 V‑Line 轮廓。',
            finalCta: '立即提升轮廓',
          }
        : {
            pill: "K-Beauty's Most Wanted Treatment",
            titleA: 'V-Line',
            titleB: 'Perfection',
            subtitle: 'The K-Beauty Jawline Secret',
            heroDesc:
              'Transform your facial contours with the coveted V-shaped jawline seen on K-drama stars and social media influencers. Our non-surgical V-Line treatment sculpts and defines your lower face for a slimmer, more youthful appearance.',
            limitedOffer: 'Limited Time Offer:',
            save: 'SAVE 20%',
            ctaPrimary: 'Get Your V-Line',
            ctaSecondary: 'Learn More',

            benefitsTitle: 'Why Everyone Wants the',
            benefitsEmphasis: 'V-Line',
            benefitsDesc:
              "The V-shaped jawline is the hallmark of K-beauty and modern facial aesthetics, creating a slimmer, more youthful face shape that's perfect for selfies.",
            b1Title: 'Slimmer Jawline',
            b1Body:
              "Reduce the width of your lower face for a more delicate, feminine appearance that's coveted in East Asian beauty standards.",
            b2Title: 'Defined Angles',
            b2Body:
              'Create sharper, more photogenic facial angles that enhance your features and eliminate roundness for a striking profile.',
            b3Title: 'Reduced Double Chin',
            b3Body:
              'Minimize the appearance of under-chin fullness for a cleaner profile and more youthful look in all angles.',

            techLabel: 'The Technology',
            howTitleA: 'How V-Line',
            howTitleB: 'Works',
            howDesc:
              "Our V-Line Perfection treatment uses New Doublo™'s advanced dual-action technology to precisely target and reshape your jawline.",
            step1Title: 'Targeted Fat Reduction',
            step1Body:
              "MFU technology breaks down stubborn fat cells along the jawline and under the chin to create a slimmer lower face profile.",
            step2Title: 'Muscle Toning',
            step2Body:
              '4RF technology tones and tightens the muscles that define your jawline, creating sharper angles and more definition.',
            step3Title: 'Skin Tightening',
            step3Body:
              'Dual-action technology stimulates collagen production to tighten skin along the jawline, eliminating sagging and creating a more youthful appearance.',
            step4Title: 'Progressive Results',
            step4Body:
              "While you'll see immediate improvements, results continue to enhance over 2-3 months as collagen remodeling creates an increasingly defined V-shape.",
            experiences: 'Client Experiences',
            verified: 'Verified Clients',
            testimonials: [
              {
                name: 'Lily C.',
                ageLine: 'Age 25',
                stars: 5,
                quote:
                  'My jawline has never looked better! Completely changed my selfie game. After just one session, I noticed a visible difference.',
              },
              {
                name: 'Michelle T.',
                ageLine: 'Age 32',
                stars: 5,
                quote:
                  'After two children, my jawline disappeared. V-Line sessions brought it back! Comfortable with minimal discomfort.',
              },
              {
                name: 'James K.',
                ageLine: 'Age 38',
                stars: 4,
                quote:
                  'As a male client, I was hesitant but wanted to reduce my double chin. Results were subtle yet effective - exactly what I wanted.',
              },
              {
                name: 'Sarah Wong',
                ageLine: 'Age 29',
                stars: 5,
                quote:
                  "I tried everything for my jawline. V-Line gave me results in weeks that I couldn't achieve in years. Professional and painless.",
              },
            ],

            compareLabel: 'Why Choose Us',
            compareTitleA: 'V-Line Perfection vs.',
            compareTitleB: 'Alternatives',
            compareDesc: 'See how our advanced treatment compares to other jawline contouring options.',
            thFeature: 'Feature',
            thVline: 'V-Line Perfection',
            thVlineNote: '(New Doublo™)',
            thFillers: 'Injectable Fillers',
            thFillersNote: '(Temporary)',
            thSurgery: 'Surgery',
            thSurgeryNote: '(Invasive)',
            rowRecovery: 'Recovery Time',
            rowDuration: 'Results Duration',
            rowPain: 'Pain Level',
            rowNatural: 'Natural Results',
            rowSafety: 'Safety Profile',
            none: 'None',
            days13: '1-3 days',
            weeks24: '2-4 weeks',
            months1218: '12-18 months',
            months612: '6-12 months',
            permanent: 'Permanent',
            minimal: 'Minimal',
            moderate: 'Moderate',
            high: 'High',
            varies: 'Varies',
            costHigh: 'High',
            costMedium: 'Medium',
            costLow: 'Low',

            promoPill: 'Limited Time Promotion',
            promoTitleA: 'K-Beauty',
            promoTitleB: 'Special',
            promoDesc:
              'Transform your jawline with our exclusive V-Line Perfection package and save up to 30%',
            promoList: [
              'Complete V-Line treatment (45-60 min)',
              'Collagen-boosting serum application',
              'LED therapy session for enhanced results',
              'Complimentary facial massage',
              'Personalized aftercare routine',
            ],
            promoPriceLabel: 'Limited Offer Price:',
            promoNote: '*Offer valid until [Date]. Limited spots available.',
            bookBoxTitle: 'Book Your V-Line Session',
            bookBoxDesc: 'Secure your appointment now to lock in this special pricing. Free consultation included.',
            bookNow: 'Book Now',
            callLabel: 'Or call:',

            finalTitleA: 'Ready For Your',
            finalTitleB: 'K-Drama',
            finalTitleC: 'Jawline?',
            finalDesc:
              'Join hundreds of satisfied clients who have achieved their dream V-Line profile with our advanced treatment.',
            finalCta: 'Transform Your Look Today',
          }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 py-20">
        <div className="absolute inset-0 bg-gray-900">
          <TreatmentImage
            category="new-doublo"
            treatment="v-line"
            type="hero"
            alt="V-Line Perfection Treatment"
            fill
            className="object-cover object-left opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/10" />
        </div>
        
        <div className="container relative mx-auto z-10">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              {/* This column is intentionally left mostly empty on desktop to avoid covering the face */}
              <div className="hidden md:block" aria-hidden="true">
                {/* Spacer for desktop layout */}
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="mb-4 inline-flex items-center rounded-full bg-primary/80 px-4 py-2 text-sm font-medium text-white">
                <Sparkles className="mr-2 h-4 w-4" /> 
                {copy.pill}
              </div>
              
              <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
                {copy.titleA} <span className="text-primary">{copy.titleB}</span>
                <span className="mt-2 block text-2xl font-normal italic text-white">{copy.subtitle}</span>
              </h1>
              
              <p className="mt-6 text-lg leading-relaxed text-gray-200">
                {copy.heroDesc}
              </p>
              
              <div className="mb-8 mt-6">
                <p className="mb-2 text-lg font-semibold text-white">{copy.limitedOffer}</p>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-primary">HK$1,980</span>
                  <span className="ml-3 text-lg text-gray-300 line-through">HK$2,480</span>
                  <span className="ml-3 rounded-md bg-primary/20 px-2 py-1 text-xs font-bold text-primary">{copy.save}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full bg-primary px-8 text-white hover:bg-primary/90">
                    {copy.ctaPrimary}
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="rounded-full border-primary px-8 text-primary hover:bg-primary hover:text-white">
                    {copy.ctaSecondary}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              {copy.benefitsTitle} <span className="text-primary">{copy.benefitsEmphasis}</span>
            </h2>
            <p className="mt-4 text-gray-600">
              {copy.benefitsDesc}
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">{copy.b1Title}</h3>
              <p className="text-gray-600">
                {copy.b1Body}
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">{copy.b2Title}</h3>
              <p className="text-gray-600">
                {copy.b2Body}
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"/><path d="m3 3 18 18"/><path d="M10.5 13.5 3 21"/><path d="m21 3-7.5 7.5"/></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">{copy.b3Title}</h3>
              <p className="text-gray-600">
                {copy.b3Body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <span className="text-sm font-medium uppercase tracking-wider text-primary">{copy.techLabel}</span>
              <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
                {copy.howTitleA} <span className="text-primary">{copy.howTitleB}</span>
              </h2>
              <p className="mt-4 text-gray-600">
                {copy.howDesc}
              </p>
              
              <div className="mt-8 space-y-6">
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{copy.step1Title}</h3>
                    <p className="text-gray-600">
                      {copy.step1Body}
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{copy.step2Title}</h3>
                    <p className="text-gray-600">
                      {copy.step2Body}
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{copy.step3Title}</h3>
                    <p className="text-gray-600">
                      {copy.step3Body}
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{copy.step4Title}</h3>
                    <p className="text-gray-600">
                      {copy.step4Body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 relative mx-auto max-w-md">
              <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                <TreatmentImage 
                  category="new-doublo"
                  treatment="v-line"
                  type="how-it-works"
                  index={1}
                  alt="How V-Line Works"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 -right-64 -translate-y-1/2 w-[40rem] rounded-xl bg-white p-6 shadow-lg border border-gray-100">
                <div className="flex flex-col">
                  <h4 className="text-sm uppercase tracking-wider text-primary font-medium mb-4">{copy.experiences}</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {copy.testimonials.map((t, idx) => (
                      <div key={`${t.name}-${idx}`} className={idx < 2 ? 'mb-4' : ''}>
                        <div className="mb-2 flex items-center">
                          <ReviewAvatar name={t.name} accentIndex={idx} />
                          <div>
                            <p className="text-xs font-bold text-gray-900">{t.name}</p>
                            <p className="text-xs text-gray-500">{t.ageLine}</p>
                          </div>
                        </div>
                        <div className="mb-1 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < t.stars ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs italic text-gray-700">{t.quote}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-xs text-primary font-medium text-center">{copy.verified}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">{copy.compareLabel}</span>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              {copy.compareTitleA} <span className="text-primary">{copy.compareTitleB}</span>
            </h2>
            <p className="mt-4 text-gray-600">
              {copy.compareDesc}
            </p>
          </div>
          
          <div className="mt-12 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-r border-gray-200 p-4 text-left font-semibold">{copy.thFeature}</th>
                  <th className="border-b border-r border-gray-200 p-4 text-center font-semibold text-primary">
                    {copy.thVline}<br/><span className="text-xs font-normal">{copy.thVlineNote}</span>
                  </th>
                  <th className="border-b border-r border-gray-200 p-4 text-center font-semibold">
                    {copy.thFillers}<br/><span className="text-xs font-normal">{copy.thFillersNote}</span>
                  </th>
                  <th className="border-b border-gray-200 p-4 text-center font-semibold">
                    {copy.thSurgery}<br/><span className="text-xs font-normal">{copy.thSurgeryNote}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-r border-gray-200 p-4 font-medium">{copy.rowRecovery}</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center text-primary">{copy.none}</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center">{copy.days13}</td>
                  <td className="border-b border-gray-200 p-4 text-center">{copy.weeks24}</td>
                </tr>
                <tr>
                  <td className="border-b border-r border-gray-200 p-4 font-medium">{copy.rowDuration}</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center text-primary">{copy.months1218}</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center">{copy.months612}</td>
                  <td className="border-b border-gray-200 p-4 text-center">{copy.permanent}</td>
                </tr>
                <tr>
                  <td className="border-b border-r border-gray-200 p-4 font-medium">{copy.rowPain}</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center text-primary">{copy.minimal}</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center">{copy.moderate}</td>
                  <td className="border-b border-gray-200 p-4 text-center">{copy.high}</td>
                </tr>
                <tr>
                  <td className="border-b border-r border-gray-200 p-4 font-medium">{copy.rowNatural}</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center text-primary">★★★★★</td>
                  <td className="border-b border-r border-gray-200 p-4 text-center">★★★☆☆</td>
                  <td className="border-b border-gray-200 p-4 text-center">★★★★☆</td>
                </tr>
                <tr>
                  <td className="border-r border-gray-200 p-4 font-medium">{copy.rowSafety}</td>
                  <td className="border-r border-gray-200 p-4 text-center text-primary">★★★★★</td>
                  <td className="border-r border-gray-200 p-4 text-center">★★★★☆</td>
                  <td className="p-4 text-center">★★★☆☆</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg md:p-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Sparkles className="mr-2 h-4 w-4" /> 
                  {copy.promoPill}
                </div>
                <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
                  {copy.promoTitleA} <span className="text-primary">{copy.promoTitleB}</span>
                </h2>
                <p className="mt-4 text-gray-600">
                  {copy.promoDesc}
                </p>
                
                <ul className="mt-6 space-y-3">
                  {copy.promoList.map((item) => (
                    <li key={item} className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <p className="text-lg font-semibold">{copy.promoPriceLabel}</p>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-primary">HK$1,980</span>
                    <span className="ml-3 text-lg text-gray-500 line-through">HK$2,480</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {copy.promoNote}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-4 text-xl font-bold">{copy.bookBoxTitle}</h3>
                  <p className="mb-6 text-gray-600">
                    {copy.bookBoxDesc}
                  </p>
                  <Link href="/contact" className="block w-full">
                    <Button className="w-full rounded-full bg-primary py-6 text-white hover:bg-primary/90">
                      {copy.bookNow}
                    </Button>
                  </Link>
                  <p className="mt-4 text-center text-sm text-gray-500">
                    {copy.callLabel} <a href="tel:+85212345678" className="font-medium text-primary">+852 1234 5678</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            {copy.finalTitleA} <span className="text-primary">{copy.finalTitleB}</span> {copy.finalTitleC}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            {copy.finalDesc}
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button size="lg" className="rounded-full bg-primary px-10 py-6 text-white hover:bg-primary/90">
                {copy.finalCta}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
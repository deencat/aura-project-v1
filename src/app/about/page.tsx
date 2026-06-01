'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PlaceholderImage from '@/components/PlaceholderImage'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { language } = useLanguage()

  const copy =
    language === 'zh-Hant'
      ? {
          heroTitle: '關於',
          heroBrand: 'SW Beauty',
          heroTagline: 'Spark precision. Glow with confidence.',
          heroTaglineTc: '精準煥活，自信耀現。',

          storyTitlePrefix: '我們的',
          storyTitleEmphasis: '故事',
          storyP1:
            'Scintillaworld Medica Center Limited（SW Beauty）一直致力為客戶提供多元、有效且安全的療程方案。我們匯聚來自不同地區的專業療程設備與技術，務求為每位客戶呈獻最貼心、最合適、最理想的服務體驗，由內而外細心呵護每一吋肌膚。',
          storyP2:
            '我們以「專業、溫度、精準」為核心，陪你一步步建立自信光采——著重自然提升，而非誇張改變。',

          missionTitlePrefix: '我們的',
          missionTitleEmphasis: '使命',
          missionP1:
            '我們的使命是以專業醫學美容服務，協助每位客戶達成美麗目標。每位客戶都獨一無二，因此我們會按你的膚況、生活習慣與期望，度身訂造護理方案。',
          missionP2:
            '我們重視服務品質與體驗：團隊持續接受訓練與認證，結合扎實的理論與豐富的實務經驗，讓你每次到訪都安心可靠。',
          missionP3:
            'SW Beauty 持續引入最新美容科技與國際級設備，並定期升級保養，確保療程質素與安全標準，保持業界領先。',

          valuesTitlePrefix: '我們的',
          valuesTitleEmphasis: '價值',
          value1Title: '以客為本',
          value1Body: '以你的需要與期望為出發點，提供清晰建議與貼心跟進。',
          value2Title: '安全優先',
          value2Body: '堅守療程安全與品質管理，選用認證設備並保持嚴謹流程。',
          value3Title: '持續創新',
          value3Body: '持續優化服務與技術，聆聽回饋，引入更合適的新方案。',

          teamTitlePrefix: '專業',
          teamTitleEmphasis: '團隊',
          teamSubtitle: '我們的專家團隊以經驗與熱誠，為每次療程帶來更細緻的照顧。',
          roleTitles: ['首席美容治療師', '護膚專家', '美肌科技顧問'],
          roleBios: [
            '專注先進面部療程超過 10 年，擅長以細節提升自然光澤。',
            '擅長肌膚修復與再生方向，協助客戶建立穩定、可持續的改善。',
            '致力把新科技帶入療程設計，令體驗更精準、更舒適。',
          ],

          whyTitlePrefix: '為何選擇',
          whyTitleEmphasis: 'SW Beauty',
          why1Title: '先進科技',
          why1Body: '投資最新美容科技，提供更有效、可預期的改善方向。',
          why2Title: '度身訂造',
          why2Body: '因應你的需要與關注點，調整療程建議與護理重點。',
          why3Title: '專業團隊',
          why3Body: '持續受訓，掌握最新技術與操作標準，服務更穩定。',
          why4Title: '持久效果',
          why4Body: '著重長遠改善與保養建議，令狀態更易維持。',

          faqTitlePrefix: '常見',
          faqTitleEmphasis: '問題',
          faq: [
            {
              q: '療程前有冇諮詢？',
              a: '有，我們會提供初步諮詢，了解你的需要與膚況，再建議合適療程方向。',
            },
            {
              q: '療程設備是否有認證？',
              a: '我們會選用合適的認證設備並定期保養，確保療程安全與穩定。',
            },
            {
              q: '點樣預約？',
              a: '你可以透過網站、電話或親臨中心預約；建議提早預約以確保時段。',
            },
            {
              q: '有冇分期／付款方案？',
              a: '我們提供多種付款方式（包括分期方案，視乎安排），詳情可向職員查詢。',
            },
          ],

          ctaTitlePrefix: '體驗',
          ctaTitleEmphasis: 'SW 差異',
          ctaBody: '預約諮詢，了解最適合你的療程方向，親身體驗專業與細緻。',
          ctaButton: '立即聯絡我們',
        }
      : language === 'zh-Hans'
        ? {
            heroTitle: '关于',
            heroBrand: 'SW Beauty',
            heroTagline: 'Spark precision. Glow with confidence.',
            heroTaglineTc: '精准焕活，自信耀现。',

            storyTitlePrefix: '我们的',
            storyTitleEmphasis: '故事',
            storyP1:
              'Scintillaworld Medica Center Limited（SW Beauty）一直致力为客户提供多元、有效且安全的疗程方案。我们汇聚来自不同地区的专业设备与技术，力求为每位客户呈献最贴心、最合适、最理想的服务体验，由内而外细心呵护每一寸肌肤。',
            storyP2:
              '我们以“专业、温度、精准”为核心，陪你一步步建立自信光采——强调自然提升，而非夸张改变。',

            missionTitlePrefix: '我们的',
            missionTitleEmphasis: '使命',
            missionP1:
              '我们的使命是以专业医美服务，协助每位客户达成美丽目标。每位客户都独一无二，因此我们会按你的肤况、生活习惯与期望，量身定制护理方案。',
            missionP2:
              '我们重视服务品质与体验：团队持续接受训练与认证，结合扎实理论与丰富实务经验，让你每次到访都安心可靠。',
            missionP3:
              'SW Beauty 持续引入最新美容科技与国际级设备，并定期升级保养，确保疗程质量与安全标准，保持业界领先。',

            valuesTitlePrefix: '我们的',
            valuesTitleEmphasis: '价值',
            value1Title: '以客为本',
            value1Body: '以你的需求与期望为出发点，提供清晰建议与贴心跟进。',
            value2Title: '安全优先',
            value2Body: '坚守疗程安全与品质管理，选用认证设备并保持严谨流程。',
            value3Title: '持续创新',
            value3Body: '持续优化服务与技术，倾听反馈，引入更合适的新方案。',

            teamTitlePrefix: '专业',
            teamTitleEmphasis: '团队',
            teamSubtitle: '我们的专家团队以经验与热忱，为每次疗程带来更细致的照顾。',
            roleTitles: ['首席美容治疗师', '护肤专家', '美肌科技顾问'],
            roleBios: [
              '专注先进面部疗程超过 10 年，擅长以细节提升自然光泽。',
              '擅长肌肤修复与再生方向，协助客户建立稳定、可持续的改善。',
              '致力把新科技带入疗程设计，让体验更精准、更舒适。',
            ],

            whyTitlePrefix: '为何选择',
            whyTitleEmphasis: 'SW Beauty',
            why1Title: '先进科技',
            why1Body: '投资最新美容科技，提供更有效、可预期的改善方向。',
            why2Title: '量身定制',
            why2Body: '根据你的需求与关注点，调整疗程建议与护理重点。',
            why3Title: '专业团队',
            why3Body: '持续受训，掌握最新技术与操作标准，服务更稳定。',
            why4Title: '持久效果',
            why4Body: '注重长期改善与保养建议，让状态更易维持。',

            faqTitlePrefix: '常见',
            faqTitleEmphasis: '问题',
            faq: [
              { q: '疗程前有咨询吗？', a: '有，我们会提供初步咨询，了解你的需求与肤况，再建议合适疗程方向。' },
              { q: '设备是否有认证？', a: '我们会选用合适的认证设备并定期保养，确保疗程安全与稳定。' },
              { q: '如何预约？', a: '你可以通过网站、电话或亲临中心预约；建议提前预约以确保时段。' },
              { q: '有分期／付款方案吗？', a: '我们提供多种付款方式（包括分期方案，视情况安排），详情可向工作人员查询。' },
            ],

            ctaTitlePrefix: '体验',
            ctaTitleEmphasis: 'SW 差异',
            ctaBody: '预约咨询，了解最适合你的疗程方向，亲身体验专业与细致。',
            ctaButton: '立即联系我们',
          }
        : {
            heroTitle: 'About',
            heroBrand: 'SW Beauty',
            heroTagline: 'Spark precision. Glow with confidence.',
            heroTaglineTc: 'Precision reawakened, confidence revealed.',

            storyTitlePrefix: 'Our',
            storyTitleEmphasis: 'Story',
            storyP1:
              'Scintillaworld Medica Center Limited (SW Beauty) is committed to providing diverse, effective, and safe treatment programs. We bring together professional equipment and techniques from around the world to deliver attentive, suitable, and optimal service experiences for every client.',
            storyP2:
              'We believe confidence comes from thoughtful, natural enhancement—powered by expertise, warmth, and precision.',

            missionTitlePrefix: 'Our',
            missionTitleEmphasis: 'Mission',
            missionP1:
              'Our mission is to provide exceptional medical beauty services to help each client achieve their beauty goals. Every client is unique, so we tailor treatments to your needs and concerns.',
            missionP2:
              'Our specialists are trained and certified, combining professional knowledge with hands-on experience for a consistent, comfortable experience.',
            missionP3:
              'SW Beauty continuously introduces the latest technologies and international-grade equipment, with regular upgrades and maintenance to uphold safety and quality.',

            valuesTitlePrefix: 'Our',
            valuesTitleEmphasis: 'Values',
            value1Title: 'Client-Centered',
            value1Body: 'We put your needs first with clear guidance and thoughtful follow-up.',
            value2Title: 'Safety First',
            value2Body: 'We prioritize safety and quality control with certified equipment and rigorous protocols.',
            value3Title: 'Innovation',
            value3Body: 'We improve continuously, listening to feedback and adopting better solutions.',

            teamTitlePrefix: 'Expert',
            teamTitleEmphasis: 'Team',
            teamSubtitle: 'Our trained specialists bring experience and passion to every treatment.',
            roleTitles: ['Lead Aesthetician', 'Skincare Specialist', 'Beauty Technologist'],
            roleBios: [
              'Specialized in advanced facial treatments with 10+ years of experience.',
              'Focused on regenerative approaches to help clients achieve natural results.',
              'Brings cutting-edge technology into treatment design and experience.',
            ],

            whyTitlePrefix: 'Why Choose',
            whyTitleEmphasis: 'SW Beauty',
            why1Title: 'Advanced Technology',
            why1Body: 'We invest in the latest technologies for effective, reliable directions.',
            why2Title: 'Customized Solutions',
            why2Body: 'We tailor treatments to your specific needs and concerns.',
            why3Title: 'Expert Team',
            why3Body: 'Our team is continuously trained on modern techniques and standards.',
            why4Title: 'Lasting Results',
            why4Body: 'We focus on improvements you can maintain over time.',

            faqTitlePrefix: 'Frequently Asked',
            faqTitleEmphasis: 'Questions',
            faq: [
              {
                q: 'Do you offer consultations before treatments?',
                a: 'Yes. We provide an initial consultation to understand your needs and recommend suitable directions.',
              },
              {
                q: 'Are your treatments certified/approved?',
                a: 'We use appropriate certified equipment and maintain it regularly to ensure safety and consistency.',
              },
              {
                q: 'How do I schedule an appointment?',
                a: 'You can book through our website, by phone, or by visiting our center. We recommend booking in advance.',
              },
              {
                q: 'Do you offer payment plans?',
                a: 'Yes, we offer multiple payment options (including installments depending on arrangement). Please ask our staff for details.',
              },
            ],

            ctaTitlePrefix: 'Experience the',
            ctaTitleEmphasis: 'SW Difference',
            ctaBody:
              'Book a consultation with our team and discover why so many clients trust us with their beauty needs.',
            ctaButton: 'Contact Us Today',
          }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {copy.heroTitle} <span className="text-primary">{copy.heroBrand}</span>
          </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              {copy.heroTagline} <br />
              {copy.heroTaglineTc}
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
                {copy.storyTitlePrefix} <span className="text-primary">{copy.storyTitleEmphasis}</span>
              </h2>
            </div>
            <div className="text-lg leading-relaxed text-gray-600">
              <p className="mb-6">
                {copy.storyP1}
                </p>
                <p>
                {copy.storyP2}
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
                {copy.missionTitlePrefix} <span className="text-primary">{copy.missionTitleEmphasis}</span>
              </h2>
              </div>
            <div className="text-lg leading-relaxed text-gray-600">
              <p className="mb-6">
                {copy.missionP1}
              </p>
              <p className="mb-6">
                {copy.missionP2}
              </p>
              <p>
                {copy.missionP3}
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
                {copy.valuesTitlePrefix} <span className="text-primary">{copy.valuesTitleEmphasis}</span>
          </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">{copy.value1Title}</h3>
                <p className="text-gray-600">
                  {copy.value1Body}
                </p>
              </div>
              
              <div className="rounded-lg bg-gray-50 p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="mb-4 text-xl font-bold">{copy.value2Title}</h3>
                <p className="text-gray-600">
                  {copy.value2Body}
              </p>
            </div>
            
              <div className="rounded-lg bg-gray-50 p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
                </div>
                <h3 className="mb-4 text-xl font-bold">{copy.value3Title}</h3>
                <p className="text-gray-600">
                  {copy.value3Body}
                </p>
              </div>
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
                {copy.whyTitlePrefix} <span className="text-primary">{copy.whyTitleEmphasis}</span>
          </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">1</div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">{copy.why1Title}</h3>
                  <p className="text-gray-600">
                    {copy.why1Body}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">2</div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">{copy.why2Title}</h3>
                  <p className="text-gray-600">
                    {copy.why2Body}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">3</div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">{copy.why3Title}</h3>
                  <p className="text-gray-600">
                    {copy.why3Body}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">4</div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">{copy.why4Title}</h3>
                  <p className="text-gray-600">
                    {copy.why4Body}
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
                {copy.faqTitlePrefix} <span className="text-primary">{copy.faqTitleEmphasis}</span>
              </h2>
            </div>
            <div className="space-y-6">
              {copy.faq.map((item) => (
                <div key={item.q} className="rounded-lg border border-gray-200 p-6">
                  <h3 className="mb-3 text-xl font-bold">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            {copy.ctaTitlePrefix} <span className="text-primary">{copy.ctaTitleEmphasis}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            {copy.ctaBody}
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <Button className="rounded-full bg-primary px-8 py-3 text-sm font-medium uppercase tracking-wide text-white hover:bg-primary/90">
                {copy.ctaButton}
            </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 
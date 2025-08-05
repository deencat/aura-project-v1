"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TreatmentImage from '@/components/TreatmentImage'
import type { CarouselApi } from "@/components/ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useLanguage } from '@/contexts/LanguageContext'

interface ServiceData {
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
  // Multilingual fields
  name_zh_hant?: string;
  name_zh_hans?: string;
  short_description_zh_hant?: string;
  short_description_zh_hans?: string;
  long_description_zh_hant?: string;
  long_description_zh_hans?: string;
  benefits_zh_hant?: string;
  benefits_zh_hans?: string;
  suitable_for_zh_hant?: string;
  suitable_for_zh_hans?: string;
  contraindications_zh_hant?: string;
  contraindications_zh_hans?: string;
  preparation_zh_hant?: string;
  preparation_zh_hans?: string;
  aftercare_zh_hant?: string;
  aftercare_zh_hans?: string;
}

export default function FarewellPuffyPage() {
  const { language } = useLanguage();
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = 5
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch service data
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/api/services/13');
        if (response.ok) {
          const data = await response.json();
          setServiceData(data);
        }
      } catch (error) {
        console.error('Error fetching service data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  // Helper functions for multilingual content
  const getLocalizedContent = (field: string): string => {
    if (!serviceData) return '';
    
    if (language === 'zh-Hant') {
      const zhHantField = `${field}_zh_hant` as keyof ServiceData;
      return (serviceData[zhHantField] as string) || (serviceData[field as keyof ServiceData] as string) || '';
    } else if (language === 'zh-Hans') {
      const zhHansField = `${field}_zh_hans` as keyof ServiceData;
      return (serviceData[zhHansField] as string) || (serviceData[field as keyof ServiceData] as string) || '';
    }
    
    return (serviceData[field as keyof ServiceData] as string) || '';
  };

  const getTitle = () => getLocalizedContent('name');
  const getDescription = () => getLocalizedContent('short_description');
  const getBenefits = () => getLocalizedContent('benefits');

  const getUIText = (key: string): string => {
    const uiText: Record<string, Record<string, string>> = {
      'en': {
        'tighten_lift': 'TIGHTEN & LIFT',
        'create_v_face': 'CREATE V-FACE',
        'sculpt_contours': 'SCULPT CONTOURS',
        'reduce_fine_lines': 'REDUCE FINE LINES',
        'book_now': 'BOOK NOW',
        'free_consultation': 'FREE CONSULTATION',
        'hero_headline': 'Say Goodbye to Puffy Face Forever',
        'hero_subline': 'Revolutionary Non-Invasive Face Lifting • Results Equal to Thread Lift Surgery',
        'hero_description': 'Transform your face with our breakthrough ultrasonic technology. Create invisible energy threads in your skin for natural lifting, V-face contouring, and youthful radiance.',
        'treatment_effects': 'Treatment Effects Equal to Thread Lifting Surgery',
        'non_invasive_technology': 'Advanced Non-Invasive Technology',
        'pain_free': 'Completely Pain-Free',
        'zero_downtime': 'Zero Recovery Time',
        'immediate_effect': 'See Results Immediately',
        'long_lasting_results': 'Effects Last 2+ Years',
        'why_choose_us': 'Why Choose Our Farewell Puffy Treatment?',
        'proven_results': 'Clinically Proven Results',
        'proven_results_desc': 'Over 10,000 successful treatments with 98% client satisfaction rate',
        'advanced_technology': 'Latest Technology',
        'advanced_technology_desc': 'FDA-approved ultrasonic energy for safe, effective facial lifting',
        'expert_team': 'Expert Specialists',
        'expert_team_desc': 'Certified professionals with 10+ years of aesthetic medicine experience',
        'personalized_care': 'Personalized Treatment',
        'personalized_care_desc': 'Customized approach tailored to your unique facial structure',
        'real_cases': 'Real Client Transformations',
        'before_after': 'Before & After Results',
        'case_study_1': '28-year-old professional - V-face transformation in 3 sessions',
        'case_study_2': '35-year-old mother - Jawline definition and cheek lifting',
        'case_study_3': '42-year-old executive - Overall facial tightening and rejuvenation',
        'treatment_process': 'Your Treatment Journey',
        'step_1': 'Professional Consultation',
        'step_1_desc': 'Comprehensive facial analysis and personalized treatment plan',
        'step_2': 'Preparation & Mapping',
        'step_2_desc': 'Precise facial mapping for targeted energy delivery',
        'step_3': 'Ultrasonic Treatment',
        'step_3_desc': 'Pain-free ultrasonic energy creates invisible lifting threads',
        'step_4': 'Immediate Results',
        'step_4_desc': 'See instant tightening with continued improvement over 3 months',
        'step_5': 'Follow-up Care',
        'step_5_desc': 'Ongoing support and maintenance recommendations',
        'frequently_asked': 'Common Questions About Farewell Puffy',
        'question_1': 'How many sessions do I need for optimal results?',
        'answer_1': 'Most clients achieve excellent results with 3-5 sessions, spaced 1-1.5 months apart. A complete course provides lasting effects for 2+ years.',
        'question_2': 'Is the treatment safe? Any side effects?',
        'answer_2': 'Completely safe with minimal side effects. You may experience slight tingling during treatment and mild redness afterward, which disappears within days.',
        'question_3': 'How does this compare to surgical thread lifting?',
        'answer_3': 'Our treatment delivers comparable lifting results without surgery, risks, or downtime. Ultrasonic energy stimulates your natural collagen for lasting, natural-looking results.',
        'question_4': 'Who is the ideal candidate for this treatment?',
        'answer_4': 'Perfect for anyone with facial sagging, puffy cheeks, undefined jawline, or signs of aging who wants effective results without surgery.',
        'limited_time_offer': '🔥 LIMITED TIME SPECIAL OFFER',
        'special_price': 'First Treatment Only $299',
        'original_price': 'Originally $800',
        'savings': 'Save $501',
        'offer_includes': 'Includes: Full consultation + Professional treatment + Aftercare kit',
        'offer_expires': 'Offer expires in:',
        'book_special_offer': 'CLAIM THIS OFFER NOW',
        'satisfaction_guarantee': '100% Satisfaction Guarantee',
        'guarantee_text': 'Not satisfied with your results? Full refund within 30 days.',
        'client_reviews': 'What Our Clients Say',
        'review_1_text': '"I couldn\'t believe the transformation! My face looked 10 years younger after just 3 sessions. The V-line I always wanted finally became reality."',
        'review_1_name': 'Jessica Wong, Age 32',
        'review_1_rating': '★★★★★',
        'review_2_text': '"No pain, no downtime, incredible results. My friends keep asking what I did - my jawline is so much more defined now!"',
        'review_2_name': 'Amanda Chen, Age 28',
        'review_2_rating': '★★★★★',
        'review_3_text': '"As a busy executive, I needed something effective but convenient. This treatment exceeded all expectations. Highly recommend!"',
        'review_3_name': 'Michelle Liu, Age 39',
        'review_3_rating': '★★★★★',
        'urgent_call_to_action': 'Don\'t Wait - Transform Your Face Today!',
        'urgency_text': 'Only 3 appointment slots remaining this month',
        'final_cta': 'BOOK YOUR TRANSFORMATION NOW',
        'call_now': 'Call Now: (555) 123-4567',
        'whatsapp_us': 'WhatsApp Us',
        'or_text': 'OR',
        'non_invasive_lifting': 'Non-Invasive Lifting',
        'non_invasive_lifting_desc': 'Achieve a surgical-like lift without incisions, anesthesia, or recovery time',
        'long_lasting_results_title': 'Long-lasting Results',
        'long_lasting_results_desc': 'Effects continue improving for months and can last 2+ years with proper maintenance',
        'natural_looking': 'Natural-Looking',
        'natural_looking_desc': 'Progressive results that enhance your natural features without an artificial appearance',
        'zero_downtime_title': 'Zero Downtime',
        'zero_downtime_desc': 'Resume normal activities immediately following the treatment with no recovery period',
        'comprehensive_improvement': 'Comprehensive Improvement',
        'comprehensive_improvement_desc': 'Addresses multiple concerns: sagging, puffiness, jowls, and fine lines in one treatment',
        'customized_treatment': 'Customized Treatment',
        'customized_treatment_desc': 'Personalized approach based on your unique facial structure and specific concerns',
        'before_after_gallery': 'Before & After',
        'treatment_process_gallery': 'Treatment Process',
        'v_shape_results': 'V-Shape Results',
        'jaw_definition': 'Jaw Definition',
        'long_lasting_effects': 'Long-lasting Effects',
        'gallery_desc_1': 'See the remarkable transformation in facial contours',
        'gallery_desc_2': 'The non-invasive ultrasonic procedure in action',
        'gallery_desc_3': 'Achieve a coveted V-shaped facial profile',
        'gallery_desc_4': 'Experience sharper, more defined jawline contours',
        'gallery_desc_5': 'Results that improve over time and last for years',
        'go_to_slide': 'Go to slide',
        'loading': 'Loading...',
        'question_5': 'When will I see results?',
        'answer_5': 'Many clients notice subtle improvements immediately after the first session. However, the most significant results develop gradually over 2-3 months as collagen remodeling occurs. For optimal results, completing the recommended treatment course is important.',
        'question_6': 'Is the treatment painful?',
        'answer_6': 'Most clients report minimal discomfort. You may feel a mild warming sensation and occasional tingling as the ultrasonic energy is delivered. Our technicians adjust the treatment intensity to ensure your comfort throughout the session.',
        'question_7': 'How can I maintain my results?',
        'answer_7': 'To extend your results, we recommend regular maintenance treatments every 3-6 months following your initial course. Additionally, a consistent skincare routine, adequate hydration, healthy diet, sun protection, and avoiding excessive weight fluctuations will help maintain your results.',
        'benefits': 'Treatment Benefits'
      },
      'zh-Hant': {
        'tighten_lift': '緊緻提拉',
        'create_v_face': '打造V面',
        'sculpt_contours': '立體輪廓',
        'reduce_fine_lines': '改善細紋',
        'book_now': '立即預約',
        'free_consultation': '免費諮詢',
        'hero_headline': '告別浮腫面 永久告別浮腫',
        'hero_subline': '革命性非侵入式面部提升 • 效果媲美線雕手術',
        'hero_description': '嶄新超聲波技術，在肌底創造隱形能量線，自然提升輪廓，打造V面，重現青春光彩。',
        'treatment_effects': '療程效果媲美線雕手術',
        'non_invasive_technology': '先進非侵入式技術',
        'pain_free': '完全無痛',
        'zero_downtime': '零恢復期',
        'immediate_effect': '即時見效',
        'long_lasting_results': '效果持續2年以上',
        'why_choose_us': '為什麼選擇我們的告別浮腫面療程？',
        'proven_results': '臨床驗證效果',
        'proven_results_desc': '超過10,000成功個案，98%客戶滿意度',
        'advanced_technology': '最新科技',
        'advanced_technology_desc': 'FDA認證超聲波能量，安全有效面部提升',
        'expert_team': '專業團隊',
        'expert_team_desc': '10年以上美學醫學經驗的認證專家',
        'personalized_care': '個人化療程',
        'personalized_care_desc': '根據您獨特面部結構定制治療方案',
        'real_cases': '真實客戶蛻變',
        'before_after': '前後對比效果',
        'case_study_1': '28歲專業人士 - 3次療程V面蛻變',
        'case_study_2': '35歲媽媽 - 下顎線條重塑與面頰提升',
        'case_study_3': '42歲企業主管 - 全面部緊緻年輕化',
        'treatment_process': '您的療程旅程',
        'step_1': '專業諮詢',
        'step_1_desc': '全面面部分析及個人化療程規劃',
        'step_2': '準備及定位',
        'step_2_desc': '精確面部定位，確保能量精準傳遞',
        'step_3': '超聲波療程',
        'step_3_desc': '無痛超聲波能量創造隱形提升線',
        'step_4': '即時效果',
        'step_4_desc': '即時看見緊緻效果，3個月內持續改善',
        'step_5': '跟進護理',
        'step_5_desc': '持續支援及維護建議',
        'frequently_asked': '關於告別浮腫面的常見問題',
        'question_1': '需要多少次療程才能達到最佳效果？',
        'answer_1': '大部分客戶通過3-5次療程達到理想效果，間隔1-1.5個月。完整療程效果可持續2年以上。',
        'question_2': '療程安全嗎？有什麼副作用？',
        'answer_2': '完全安全，副作用極少。療程中可能有輕微刺痛感，療程後可能有輕微泛紅，數天內自然消散。',
        'question_3': '與手術線雕相比如何？',
        'answer_3': '我們的療程達到媲美線雕的提升效果，但無需手術、風險或恢復期。超聲波刺激天然膠原蛋白，效果自然持久。',
        'question_4': '誰適合這個療程？',
        'answer_4': '適合任何面部鬆弛、面頰浮腫、下顎線條不明顯或有老化跡象，希望不經手術獲得有效結果的人士。',
        'limited_time_offer': '🔥 限時特別優惠',
        'special_price': '首次療程只需 $299',
        'original_price': '原價 $800',
        'savings': '節省 $501',
        'offer_includes': '包括：完整諮詢 + 專業療程 + 術後護理套裝',
        'offer_expires': '優惠倒數：',
        'book_special_offer': '立即搶購此優惠',
        'satisfaction_guarantee': '100% 滿意保證',
        'guarantee_text': '不滿意效果？30天內全額退款。',
        'client_reviews': '客戶真實評價',
        'review_1_text': '"無法相信的蛻變！僅3次療程我的臉就年輕了10歲。我夢寐以求的V面終於實現了。"',
        'review_1_name': '王小姐，32歲',
        'review_1_rating': '★★★★★',
        'review_2_text': '"無痛、無恢復期、效果驚人。朋友一直問我做了什麼，我的下顎線現在非常明顯！"',
        'review_2_name': '陳小姐，28歲',
        'review_2_rating': '★★★★★',
        'review_3_text': '"作為忙碌的主管，我需要有效但方便的療程。這個療程超越了所有期望。強烈推薦！"',
        'review_3_name': '劉小姐，39歲',
        'review_3_rating': '★★★★★',
        'urgent_call_to_action': '不要等待 - 今天就變美！',
        'urgency_text': '本月僅剩3個預約名額',
        'final_cta': '立即預約您的蛻變',
        'call_now': '立即致電：(555) 123-4567',
        'whatsapp_us': 'WhatsApp 查詢',
        'or_text': '或',
        'non_invasive_lifting': '非侵入式提升',
        'non_invasive_lifting_desc': '無需切口、麻醉或恢復期，達到手術般提升效果',
        'long_lasting_results_title': '持久效果',
        'long_lasting_results_desc': '效果持續數月改善，並可維持2年以上',
        'natural_looking': '自然效果',
        'natural_looking_desc': '漸進式效果，增強天然特徵，不會產生人工感',
        'zero_downtime_title': '零恢復期',
        'zero_downtime_desc': '療程後可立即恢復正常活動，無需恢復期',
        'comprehensive_improvement': '全面改善',
        'comprehensive_improvement_desc': '一次療程解決多種問題：鬆弛、浮腫、下垂和細紋',
        'customized_treatment': '個人化療程',
        'customized_treatment_desc': '根據您獨特的面部結構和特殊需求制定個人化方案',
        'before_after_gallery': '前後對比',
        'treatment_process_gallery': '療程過程',
        'v_shape_results': 'V面效果',
        'jaw_definition': '下顎線條',
        'long_lasting_effects': '持久效果',
        'gallery_desc_1': '見證面部輪廓的驚人蛻變',
        'gallery_desc_2': '非侵入性超聲波療程實況',
        'gallery_desc_3': '打造令人嚮往的V形面部輪廓',
        'gallery_desc_4': '體驗更清晰、更明顯的下顎線條輪廓',
        'gallery_desc_5': '效果持續改善且可維持數年',
        'go_to_slide': '前往第',
        'loading': '載入中...',
        'question_5': '何時能看到效果？',
        'answer_5': '許多客戶在首次療程後立即注意到細微改善。然而，最顯著的效果會在2-3個月內隨著膠原蛋白重塑逐漸顯現。為達到最佳效果，完成建議的療程課程非常重要。',
        'question_6': '療程會痛嗎？',
        'answer_6': '大多數客戶報告只有輕微不適感。您可能會感受到輕微的溫暖感和偶爾的刺痛感，這是超聲波能量傳遞時的感覺。我們的技師會調整療程強度，確保您整個過程的舒適度。',
        'question_7': '如何維持療程效果？',
        'answer_7': '為延長療程效果，我們建議在完成初始療程後每3-6個月進行定期維護療程。此外，持續的護膚程序、充足的水分補充、健康飲食、防曬保護以及避免體重劇烈波動都有助於維持效果。',
        'benefits': '療程效果'
      },
      'zh-Hans': {
        'tighten_lift': '紧致提拉',
        'create_v_face': '打造V面',
        'sculpt_contours': '立体轮廓',
        'reduce_fine_lines': '改善细纹',
        'book_now': '立即预约',
        'free_consultation': '免费咨询',
        'hero_headline': '告别浮肿面 永久告别浮肿',
        'hero_subline': '革命性非侵入式面部提升 • 效果媲美线雕手术',
        'hero_description': '崭新超声波技术，在肌底创造隐形能量线，自然提升轮廓，打造V面，重现青春光彩。',
        'treatment_effects': '疗程效果媲美线雕手术',
        'non_invasive_technology': '先进非侵入式技术',
        'pain_free': '完全无痛',
        'zero_downtime': '零恢复期',
        'immediate_effect': '即时见效',
        'long_lasting_results': '效果持续2年以上',
        'why_choose_us': '为什么选择我们的告别浮肿面疗程？',
        'proven_results': '临床验证效果',
        'proven_results_desc': '超过10,000成功个案，98%客户满意度',
        'advanced_technology': '最新科技',
        'advanced_technology_desc': 'FDA认证超声波能量，安全有效面部提升',
        'expert_team': '专业团队',
        'expert_team_desc': '10年以上美学医学经验的认证专家',
        'personalized_care': '个人化疗程',
        'personalized_care_desc': '根据您独特面部结构定制治疗方案',
        'real_cases': '真实客户蜕变',
        'before_after': '前后对比效果',
        'case_study_1': '28岁专业人士 - 3次疗程V面蜕变',
        'case_study_2': '35岁妈妈 - 下颌线条重塑与面颊提升',
        'case_study_3': '42岁企业主管 - 全面部紧致年轻化',
        'treatment_process': '您的疗程旅程',
        'step_1': '专业咨询',
        'step_1_desc': '全面面部分析及个人化疗程规划',
        'step_2': '准备及定位',
        'step_2_desc': '精确面部定位，确保能量精准传递',
        'step_3': '超声波疗程',
        'step_3_desc': '无痛超声波能量创造隐形提升线',
        'step_4': '即时效果',
        'step_4_desc': '即时看见紧致效果，3个月内持续改善',
        'step_5': '跟进护理',
        'step_5_desc': '持续支援及维护建议',
        'frequently_asked': '关于告别浮肿面的常见问题',
        'question_1': '需要多少次疗程才能达到最佳效果？',
        'answer_1': '大部分客户通过3-5次疗程达到理想效果，间隔1-1.5个月。完整疗程效果可持续2年以上。',
        'question_2': '疗程安全吗？有什么副作用？',
        'answer_2': '完全安全，副作用极少。疗程中可能有轻微刺痛感，疗程后可能有轻微泛红，数天内自然消散。',
        'question_3': '与手术线雕相比如何？',
        'answer_3': '我们的疗程达到媲美线雕的提升效果，但无需手术、风险或恢复期。超声波刺激天然胶原蛋白，效果自然持久。',
        'question_4': '谁适合这个疗程？',
        'answer_4': '适合任何面部松弛、面颊浮肿、下颌线条不明显或有老化迹象，希望不经手术获得有效结果的人士。',
        'limited_time_offer': '🔥 限时特别优惠',
        'special_price': '首次疗程只需 $299',
        'original_price': '原价 $800',
        'savings': '节省 $501',
        'offer_includes': '包括：完整咨询 + 专业疗程 + 术后护理套装',
        'offer_expires': '优惠倒数：',
        'book_special_offer': '立即抢购此优惠',
        'satisfaction_guarantee': '100% 满意保证',
        'guarantee_text': '不满意效果？30天内全额退款。',
        'client_reviews': '客户真实评价',
        'review_1_text': '"无法相信的蜕变！仅3次疗程我的脸就年轻了10岁。我梦寐以求的V面终于实现了。"',
        'review_1_name': '王女士，32岁',
        'review_1_rating': '★★★★★',
        'review_2_text': '"无痛、无恢复期、效果惊人。朋友一直问我做了什么，我的下颌线现在非常明显！"',
        'review_2_name': '陈女士，28岁',
        'review_2_rating': '★★★★★',
        'review_3_text': '"作为忙碌的主管，我需要有效但方便的疗程。这个疗程超越了所有期望。强烈推荐！"',
        'review_3_name': '刘女士，39岁',
        'review_3_rating': '★★★★★',
        'urgent_call_to_action': '不要等待 - 今天就变美！',
        'urgency_text': '本月仅剩3个预约名额',
        'final_cta': '立即预约您的蜕变',
        'call_now': '立即致电：(555) 123-4567',
        'whatsapp_us': 'WhatsApp 查询',
        'or_text': '或',
        'non_invasive_lifting': '非侵入式提升',
        'non_invasive_lifting_desc': '无需切口、麻醉或恢复期，达到手术般提升效果',
        'long_lasting_results_title': '持久效果',
        'long_lasting_results_desc': '效果持续数月改善，并可维持2年以上',
        'natural_looking': '自然效果',
        'natural_looking_desc': '渐进式效果，增强天然特征，不会产生人工感',
        'zero_downtime_title': '零恢复期',
        'zero_downtime_desc': '疗程后可立即恢复正常活动，无需恢复期',
        'comprehensive_improvement': '全面改善',
        'comprehensive_improvement_desc': '一次疗程解决多种问题：松弛、浮肿、下垂和细纹',
        'customized_treatment': '个人化疗程',
        'customized_treatment_desc': '根据您独特的面部结构和特殊需求制定个人化方案',
        'before_after_gallery': '前后对比',
        'treatment_process_gallery': '疗程过程',
        'v_shape_results': 'V面效果',
        'jaw_definition': '下颌线条',
        'long_lasting_effects': '持久效果',
        'gallery_desc_1': '见证面部轮廓的惊人蜕变',
        'gallery_desc_2': '非侵入性超声波疗程实况',
        'gallery_desc_3': '打造令人向往的V形面部轮廓',
        'gallery_desc_4': '体验更清晰、更明显的下颌线条轮廓',
        'gallery_desc_5': '效果持续改善且可维持数年',
        'go_to_slide': '前往第',
        'loading': '载入中...',
        'question_5': '何时能看到效果？',
        'answer_5': '许多客户在首次疗程后立即注意到细微改善。然而，最显著的效果会在2-3个月内随着胶原蛋白重塑逐渐显现。为达到最佳效果，完成建议的疗程课程非常重要。',
        'question_6': '疗程会痛吗？',
        'answer_6': '大多数客户报告只有轻微不适感。您可能会感受到轻微的温暖感和偶尔的刺痛感，这是超声波能量传递时的感觉。我们的技师会调整疗程强度，确保您整个过程的舒适度。',
        'question_7': '如何维持疗程效果？',
        'answer_7': '为延长疗程效果，我们建议在完成初始疗程后每3-6个月进行定期维护疗程。此外，持续的护肤程序、充足的水分补充、健康饮食、防晒保护以及避免体重剧烈波动都有助于维持效果。',
        'benefits': '疗程效果'
      }
    };
    
    const currentLang = language === 'zh-Hant' ? 'zh-Hant' : (language === 'zh-Hans' ? 'zh-Hans' : 'en');
    return uiText[currentLang]?.[key] || uiText['en']?.[key] || key;
  };

  // Set up the carousel API and event listener
  React.useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap())
    })
  }, [api])

  // Handle indicator clicks
  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">{getUIText('loading')}</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section - Redesigned for Maximum Impact */}
      <section
        className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: "url('/images/treatments/facials/farewell-puffy/hero.jpg')"
        }}
      >
        {/* Gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {/* Limited Time Offer Badge */}
            <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              {getUIText('limited_time_offer')}
            </div>
            
            {/* Main Headline */}
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-2xl mb-6">
              {getUIText('hero_headline')}
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-yellow-300 font-semibold mb-6 drop-shadow-lg">
              {getUIText('hero_subline')}
            </p>
            
            {/* Key Benefits Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold border-2 border-white/20">{getUIText('tighten_lift')}</span>
              <span className="bg-gradient-to-r from-pink-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold border-2 border-white/20">{getUIText('create_v_face')}</span>
              <span className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold border-2 border-white/20">{getUIText('sculpt_contours')}</span>
              <span className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold border-2 border-white/20">{getUIText('reduce_fine_lines')}</span>
            </div>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl drop-shadow-md">
              {getUIText('hero_description')}
            </p>

            {/* Special Offer Box */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/30 shadow-2xl">
              <div className="text-center">
                <p className="text-red-600 font-bold text-2xl mb-2">{getUIText('special_price')}</p>
                <p className="text-gray-500 line-through text-lg">{getUIText('original_price')}</p>
                <p className="text-green-600 font-bold text-xl">{getUIText('savings')}</p>
                <p className="text-sm text-gray-600 mt-2">{getUIText('offer_includes')}</p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
                  {getUIText('book_special_offer')}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-white bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                  {getUIText('free_consultation')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div>
              <span className="text-2xl font-bold">10,000+</span>
              <p className="text-sm opacity-90">{getUIText('proven_results')}</p>
            </div>
            <div>
              <span className="text-2xl font-bold">98%</span>
              <p className="text-sm opacity-90">{getUIText('satisfaction_guarantee').split(' ')[0]} {getUIText('satisfaction_guarantee').split(' ')[1]}</p>
            </div>
            <div>
              <span className="text-2xl font-bold">2+</span>
              <p className="text-sm opacity-90">{getUIText('long_lasting_results').split(' ')[2]} {getUIText('long_lasting_results').split(' ')[3]}</p>
            </div>
            <div>
              <span className="text-2xl font-bold">FDA</span>
              <p className="text-sm opacity-90">{getUIText('advanced_technology_desc').split(' ')[0]} {getUIText('advanced_technology_desc').split(' ')[1]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {getUIText('why_choose_us')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {getUIText('treatment_effects')} - {getUIText('non_invasive_technology')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Proven Results */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white font-bold">✓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{getUIText('proven_results')}</h3>
              <p className="text-gray-600">{getUIText('proven_results_desc')}</p>
            </div>

            {/* Advanced Technology */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white font-bold">🔬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{getUIText('advanced_technology')}</h3>
              <p className="text-gray-600">{getUIText('advanced_technology_desc')}</p>
            </div>

            {/* Expert Team */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white font-bold">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{getUIText('expert_team')}</h3>
              <p className="text-gray-600">{getUIText('expert_team_desc')}</p>
            </div>

            {/* Personalized Care */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white font-bold">💎</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{getUIText('personalized_care')}</h3>
              <p className="text-gray-600">{getUIText('personalized_care_desc')}</p>
            </div>
          </div>

          {/* Key Benefits Banner */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-6">{getUIText('treatment_effects')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">⚡</span>
                <span className="text-sm font-semibold">{getUIText('pain_free')}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">🚫</span>
                <span className="text-sm font-semibold">{getUIText('zero_downtime')}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">⚡</span>
                <span className="text-sm font-semibold">{getUIText('immediate_effect')}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">⏰</span>
                <span className="text-sm font-semibold">{getUIText('long_lasting_results')}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">🏆</span>
                <span className="text-sm font-semibold">FDA {getUIText('advanced_technology_desc').split(' ')[1]}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">💯</span>
                <span className="text-sm font-semibold">{getUIText('satisfaction_guarantee').split(' ')[0]}% {getUIText('satisfaction_guarantee').split(' ')[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After / Real Cases Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {getUIText('real_cases')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {getUIText('before_after')} - {getUIText('proven_results_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Case Study 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{getUIText('case_study_1')}</h3>
              <p className="text-gray-600">
                {getUIText('before_after')} - V面輪廓完美塑造
              </p>
            </div>

            {/* Case Study 2 */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{getUIText('case_study_2')}</h3>
              <p className="text-gray-600">
                {getUIText('before_after')} - 下顎線條重新定義
              </p>
            </div>

            {/* Case Study 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{getUIText('case_study_3')}</h3>
              <p className="text-gray-600">
                {getUIText('before_after')} - 整體面部年輕化
              </p>
            </div>
          </div>

          {/* CTA in this section */}
          <div className="text-center">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
                {getUIText('book_special_offer')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Treatment Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              {getUIText('benefits')} - <span className="text-primary">{getTitle()}</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              {getDescription()}
            </p>
          </div>

          {/* Photo Gallery */}
          <div className="mt-12 mb-16 mx-auto max-w-4xl">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Carousel 
                className="w-full" 
                setApi={setApi}
              >
                <CarouselContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <CarouselItem key={num} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2">
                        <div className="overflow-hidden rounded-lg bg-white">
                          <div className="aspect-square relative">
                            <TreatmentImage 
                              category="treatments"
                              treatment="farewell-puffy"
                              type="benefits"
                              index={num}
                              alt={[getUIText('before_after_gallery'), getUIText('treatment_process_gallery'), getUIText('v_shape_results'), getUIText('jaw_definition'), getUIText('long_lasting_effects')][num-1]}
                              fill
                              className="transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {[getUIText('before_after_gallery'), getUIText('treatment_process_gallery'), getUIText('v_shape_results'), getUIText('jaw_definition'), getUIText('long_lasting_effects')][num-1]}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {[
                                getUIText('gallery_desc_1'),
                                getUIText('gallery_desc_2'),
                                getUIText('gallery_desc_3'),
                                getUIText('gallery_desc_4'),
                                getUIText('gallery_desc_5')
                              ][num-1]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:left-4 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-2 md:right-4 bg-white/80 hover:bg-white" />
              </Carousel>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeIndex === index ? 'bg-primary w-8' : 'bg-gray-300'
                    }`}
                    aria-label={`${getUIText('go_to_slide')} ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z"></path><path d="M8 22v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">{getUIText('non_invasive_lifting')}</h3>
              <p className="text-gray-600">
                {getUIText('non_invasive_lifting_desc')}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path><path d="M12 12 8 8"></path><path d="M12 16v-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">{getUIText('long_lasting_results_title')}</h3>
              <p className="text-gray-600">
                {getUIText('long_lasting_results_desc')}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M8 2v4"></path><path d="M12 2v4"></path><path d="M16 2v4"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">{getUIText('natural_looking')}</h3>
              <p className="text-gray-600">
                {getUIText('natural_looking_desc')}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">{getUIText('zero_downtime_title')}</h3>
              <p className="text-gray-600">
                {getUIText('zero_downtime_desc')}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">{getUIText('comprehensive_improvement')}</h3>
              <p className="text-gray-600">
                {getUIText('comprehensive_improvement_desc')}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">{getUIText('customized_treatment')}</h3>
              <p className="text-gray-600">
                {getUIText('customized_treatment_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
              {getUIText('frequently_asked')}
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border border-blue-100">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{getUIText('question_1')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {getUIText('answer_1')}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 shadow-lg border border-green-100">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{getUIText('question_2')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {getUIText('answer_2')}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-8 shadow-lg border border-pink-100">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{getUIText('question_3')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {getUIText('answer_3')}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 shadow-lg border border-purple-100">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{getUIText('question_4')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {getUIText('answer_4')}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 shadow-lg border border-yellow-100">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{getUIText('question_5')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {getUIText('answer_5')}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 shadow-lg border border-indigo-100">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{getUIText('question_6')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {getUIText('answer_6')}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-8 shadow-lg border border-teal-100">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{getUIText('question_7')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {getUIText('answer_7')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px)', backgroundSize: '50px 50px'}}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Urgency Badge */}
          <div className="inline-flex items-center bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-bold mb-8 animate-pulse">
            ⚡ {getUIText('urgency_text')} ⚡
          </div>
          
          {/* Main Headline */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            {getUIText('urgent_call_to_action')}
          </h2>
          
          {/* Special Offer Reminder */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-4xl mx-auto border border-white/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div>
                <p className="text-3xl font-bold text-yellow-300">{getUIText('special_price')}</p>
                <p className="text-white/80 line-through text-lg">{getUIText('original_price')}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-300">{getUIText('savings')}</p>
                <p className="text-white/80 text-sm">{getUIText('offer_includes')}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{getUIText('satisfaction_guarantee')}</p>
                <p className="text-white/80 text-sm">{getUIText('guarantee_text')}</p>
              </div>
            </div>
          </div>
          
          {/* Multiple CTA Options */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link href="/contact">
              <Button className="w-full sm:w-auto bg-white text-red-600 font-bold py-4 px-12 rounded-full text-xl shadow-2xl transform hover:scale-110 transition-all duration-300 hover:bg-yellow-100">
                {getUIText('final_cta')}
              </Button>
            </Link>
            <div className="text-white font-bold text-lg">{getUIText('or_text')}</div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300">
                {getUIText('call_now')}
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300">
                {getUIText('whatsapp_us')}
              </Button>
            </div>
          </div>
          
          {/* Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-sm font-semibold">FDA {getUIText('advanced_technology_desc').split(' ')[1]}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm font-semibold">{getUIText('zero_downtime')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">💯</div>
              <p className="text-sm font-semibold">{getUIText('satisfaction_guarantee').split(' ')[0]}% {getUIText('satisfaction_guarantee').split(' ')[1]}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">⏰</div>
              <p className="text-sm font-semibold">{getUIText('long_lasting_results')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
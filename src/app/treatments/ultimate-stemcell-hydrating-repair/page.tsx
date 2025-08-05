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

export default function UltimateStemcellHydratingRepairPage() {
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
        const response = await fetch('/api/services/14');
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
  const getLongDescription = () => getLocalizedContent('long_description');
  const getBenefits = () => getLocalizedContent('benefits');

  const getUIText = (key: string): string => {
    const uiText: Record<string, Record<string, string>> = {
      'en': {
        'loading': 'Loading...',
        'hero_headline': 'Rescue Your Desert Skin',
        'hero_subline': 'Stem Cell Hydration | Ultimate Repair | Luminous Hydration',
        'hero_description': 'Transform severely dehydrated, fatigued skin with revolutionary stem cell technology. Deep cellular hydration that penetrates to the dermis layer, instantly plumping and revitalizing even the most compromised skin.',
        'emergency_cta': '🚨 SKIN EMERGENCY?',
        'book_now': 'BOOK NOW',
        'limited_spots': 'Only 5 spots left this week',
        'problem_headline': 'Is Your Skin Crying for Help?',
        'problem_description': 'During dry seasons, your skin sends distress signals daily. Dehydration creates a cascade of skin issues that age you faster than time itself.',
        'skin_problems': 'Recognize These Warning Signs?',
        'problem_1': '⚠️ Tight, uncomfortable skin that feels "pulled"',
        'problem_2': '⚠️ Fine lines appearing from dehydration',
        'problem_3': '⚠️ Dull, lackluster complexion',
        'problem_4': '⚠️ Flaky, rough texture',
        'problem_5': '⚠️ Increased sensitivity and irritation',
        'problem_6': '⚠️ Makeup that won\'t sit properly',
        'problem_cta': 'Don\'t let dehydration steal your youth',
        'solution_headline': 'The Ultimate Skin Rescue Protocol',
        'solution_description': 'Our breakthrough stem cell treatment doesn\'t just moisturize—it revolutionizes your skin at the cellular level.',
        'solution_process': 'How We Transform Desert Skin',
        'step_1_title': 'Deep Penetration Analysis',
        'step_1_desc': 'Advanced skin scanning reveals hidden dehydration layers that surface treatments miss',
        'step_2_title': 'Stem Cell Infusion',
        'step_2_desc': 'High-concentration plant stem cells penetrate to rebuild moisture barriers from within',
        'step_3_title': 'Cellular Regeneration',
        'step_3_desc': 'Activates your skin\'s natural repair mechanisms for lasting transformation',
        'step_4_title': 'Barrier Reinforcement',
        'step_4_desc': 'Strengthens protective barriers to prevent future moisture loss',
        'immediate_results': 'See Results in Just One Session',
        'result_1': '✨ Instantly plumper, more supple skin',
        'result_2': '✨ Visible reduction in dehydration lines',
        'result_3': '✨ Radiant, healthy glow returns',
        'result_4': '✨ Skin feels comfortable and hydrated',
        'result_5': '✨ Makeup applies flawlessly',
        'result_6': '✨ Long-lasting moisture retention',
        'testimonials_headline': 'Real Transformations, Real Results',
        'testimonial_1_text': '"I couldn\'t believe the change after just one treatment! My skin went from desert-dry to dewy and radiant. This treatment saved my skin."',
        'testimonial_1_name': 'Sarah Chen, 34',
        'testimonial_1_rating': '★★★★★',
        'testimonial_2_text': '"After struggling with chronic dehydration for years, this treatment gave me my confidence back. My skin has never looked or felt better!"',
        'testimonial_2_name': 'Michelle Wong, 41',
        'testimonial_2_rating': '★★★★★',
        'testimonial_3_text': '"As a beauty editor, I\'ve tried everything. This stem cell treatment is hands down the most effective hydration solution I\'ve ever experienced."',
        'testimonial_3_name': 'Linda Zhang, Beauty Editor',
        'testimonial_3_rating': '★★★★★',
        'limited_offer_headline': '🔥 EXCLUSIVE RESCUE PACKAGE',
        'offer_title': 'Desert Skin Emergency Kit',
        'offer_price': 'Complete Treatment $599',
        'offer_original': 'Regular Price $1,200',
        'offer_savings': 'Save $601 Today',
        'offer_includes': 'INCLUDES:',
        'offer_item_1': '• Advanced Stem Cell Hydration Treatment',
        'offer_item_2': '• Professional Skin Analysis',
        'offer_item_3': '• Take-Home Hydration Serum ($150 value)',
        'offer_item_4': '• 30-Day Skin Transformation Guide',
        'offer_item_5': '• Follow-up Consultation',
        'offer_expires': 'Limited Time: Expires in 48 hours',
        'offer_guarantee': '100% Satisfaction Guaranteed or Money Back',
        'claim_offer': 'CLAIM YOUR RESCUE PACKAGE',
        'urgency_text': 'Only 3 packages available at this price',
        'why_choose_us': 'Why Aura Beauty is Hong Kong\'s #1 Choice',
        'trust_1': '🏆 Award-Winning Stem Cell Technology',
        'trust_2': '🏆 10,000+ Successful Treatments',
        'trust_3': '🏆 98% Client Satisfaction Rate',
        'trust_4': '🏆 Celebrity & Influencer Trusted',
        'trust_5': '🏆 FDA-Approved Equipment',
        'trust_6': '🏆 No-Risk Money-Back Guarantee',
        'gallery_headline': 'Witness the Transformation',
        'before_after_gallery': 'Before & After',
        'treatment_process_gallery': 'Treatment Process',
        'moisture_analysis': 'Moisture Analysis',
        'stem_cell_extraction': 'Stem Cell Technology',
        'cellular_renewal': 'Cellular Renewal',
        'gallery_desc_1': 'Dramatic before and after results from real clients',
        'gallery_desc_2': 'Our proprietary multi-phase hydration protocol',
        'gallery_desc_3': 'Advanced moisture mapping technology',
        'gallery_desc_4': 'Premium plant stem cell extraction process',
        'gallery_desc_5': 'Microscopic view of skin cell regeneration',
        'faq_headline': 'Your Questions Answered',
        'question_1': 'How quickly will I see results?',
        'answer_1': 'Most clients see immediate improvement after the first session—skin feels plumper and looks more radiant instantly. Maximum results develop over 2-3 treatments as stem cells continue working at the cellular level.',
        'question_2': 'Is this treatment safe for sensitive skin?',
        'answer_2': 'Absolutely! Our plant-based stem cell formulation is specifically designed for sensitive, compromised skin. The treatment is gentle yet highly effective, with no downtime required.',
        'question_3': 'How long do results last?',
        'answer_3': 'Results can last 6-12 months depending on your lifestyle and skin condition. We recommend maintenance treatments every 6 months to sustain optimal hydration levels.',
        'question_4': 'What makes this different from regular facials?',
        'answer_4': 'Unlike surface-level treatments, our stem cell technology penetrates deep into the dermis to repair and regenerate skin cells. It\'s like giving your skin a complete cellular makeover.',
        'question_5': 'Is there any downtime?',
        'answer_5': 'Zero downtime! You can return to normal activities immediately. Many clients even notice their makeup applies better right after treatment.',
        'final_cta_headline': 'Your Skin Deserves the Best',
        'final_cta_text': 'Don\'t let another day pass with dehydrated, uncomfortable skin. Join thousands of satisfied clients who have transformed their skin with our revolutionary stem cell treatment.',
        'emergency_booking': 'EMERGENCY BOOKING',
        'call_now': 'Call Now: (852) 1234-5678',
        'whatsapp_us': 'WhatsApp Us',
        'book_consultation': 'Book Free Consultation',
        'go_to_slide': 'Go to slide'
      },
      'zh-Hant': {
        'loading': '載入中...',
        'hero_headline': '拯救沙漠肌',
        'hero_subline': '幹細胞鎖水 | 極緻修護 | 水感嫩白',
        'hero_description': '運用革命性幹細胞技術，徹底改善嚴重脫水、疲勞肌膚。深層細胞補水直達真皮層，即時豐盈修復最受損的肌膚。',
        'emergency_cta': '🚨 肌膚急救?',
        'book_now': '立即預約',
        'limited_spots': '本週僅餘5個名額',
        'problem_headline': '您的肌膚正在求救嗎？',
        'problem_description': '乾燥季節，肌膚每日發出求救訊號。缺水造成一連串肌膚問題，讓您比實際年齡老得更快。',
        'skin_problems': '認出這些警告訊號嗎？',
        'problem_1': '⚠️ 緊繃不適，感覺被「拉扯」的肌膚',
        'problem_2': '⚠️ 缺水導致細紋出現',
        'problem_3': '⚠️ 暗沉無光澤的膚色',
        'problem_4': '⚠️ 脫皮、粗糙的質感',
        'problem_5': '⚠️ 敏感度增加和刺激',
        'problem_6': '⚠️ 妝容無法貼服',
        'problem_cta': '別讓缺水偷走您的青春',
        'solution_headline': '終極肌膚拯救方案',
        'solution_description': '我們的突破性幹細胞療程不只是保濕—而是在細胞層面徹底革新您的肌膚。',
        'solution_process': '如何改造沙漠肌',
        'step_1_title': '深層滲透分析',
        'step_1_desc': '先進肌膚掃描揭示表面療程錯失的隱藏缺水層',
        'step_2_title': '幹細胞注入',
        'step_2_desc': '高濃度植物幹細胞滲透重建內在水分屏障',
        'step_3_title': '細胞再生',
        'step_3_desc': '激活肌膚天然修復機制，實現持久蛻變',
        'step_4_title': '屏障強化',
        'step_4_desc': '強化保護屏障，防止未來水分流失',
        'immediate_results': '一次療程即見效果',
        'result_1': '✨ 即時豐盈、更柔嫩的肌膚',
        'result_2': '✨ 明顯減少缺水紋',
        'result_3': '✨ 重現光采健康光澤',
        'result_4': '✨ 肌膚感覺舒適水潤',
        'result_5': '✨ 妝容完美貼服',
        'result_6': '✨ 持久保濕效果',
        'testimonials_headline': '真實蛻變，真實效果',
        'testimonial_1_text': '"一次療程後的改變讓我難以置信！我的肌膚從沙漠般乾燥變得水潤光采。這個療程拯救了我的肌膚。"',
        'testimonial_1_name': '陳小姐，34歲',
        'testimonial_1_rating': '★★★★★',
        'testimonial_2_text': '"在與慢性缺水問題掙扎多年後，這個療程讓我重拾信心。我的肌膚從未如此美麗和健康！"',
        'testimonial_2_name': '黃小姐，41歲',
        'testimonial_2_rating': '★★★★★',
        'testimonial_3_text': '"作為美容編輯，我試過一切。這個幹細胞療程絕對是我體驗過最有效的補水解決方案。"',
        'testimonial_3_name': '張小姐，美容編輯',
        'testimonial_3_rating': '★★★★★',
        'limited_offer_headline': '🔥 獨家拯救套餐',
        'offer_title': '沙漠肌急救組合',
        'offer_price': '完整療程 $599',
        'offer_original': '原價 $1,200',
        'offer_savings': '今日節省 $601',
        'offer_includes': '包括：',
        'offer_item_1': '• 先進幹細胞補水療程',
        'offer_item_2': '• 專業肌膚分析',
        'offer_item_3': '• 帶回家補水精華（價值$150）',
        'offer_item_4': '• 30天肌膚蛻變指南',
        'offer_item_5': '• 跟進諮詢',
        'offer_expires': '限時優惠：48小時內到期',
        'offer_guarantee': '100% 滿意保證或退款',
        'claim_offer': '立即搶購拯救套餐',
        'urgency_text': '此價格僅餘3個套餐',
        'why_choose_us': '為什麼Aura Beauty是香港第一選擇',
        'trust_1': '🏆 獲獎幹細胞技術',
        'trust_2': '🏆 10,000+ 成功療程',
        'trust_3': '🏆 98% 客戶滿意度',
        'trust_4': '🏆 名人及KOL信賴',
        'trust_5': '🏆 FDA認證設備',
        'trust_6': '🏆 無風險退款保證',
        'gallery_headline': '見證蛻變過程',
        'before_after_gallery': '前後對比',
        'treatment_process_gallery': '療程過程',
        'moisture_analysis': '水分分析',
        'stem_cell_extraction': '幹細胞技術',
        'cellular_renewal': '細胞更新',
        'gallery_desc_1': '真實客戶的戲劇性前後對比效果',
        'gallery_desc_2': '我們專有的多階段補水方案',
        'gallery_desc_3': '先進水分地圖技術',
        'gallery_desc_4': '優質植物幹細胞萃取過程',
        'gallery_desc_5': '肌膚細胞再生的微觀視圖',
        'faq_headline': '常見問題解答',
        'question_1': '多快能看到效果？',
        'answer_1': '大部分客戶在首次療程後立即看到改善—肌膚即時感覺更豐盈，看起來更光采。最大效果在2-3次療程中顯現，因為幹細胞在細胞層面持續作用。',
        'question_2': '這個療程對敏感肌膚安全嗎？',
        'answer_2': '絕對安全！我們的植物性幹細胞配方專為敏感、受損肌膚設計。療程溫和但高效，無需恢復期。',
        'question_3': '效果能維持多久？',
        'answer_3': '效果可維持6-12個月，取決於您的生活方式和肌膚狀況。我們建議每6個月進行維護療程以保持最佳水合水平。',
        'question_4': '這與一般面部護理有什麼不同？',
        'answer_4': '與表面護理不同，我們的幹細胞技術深入真皮層修復和再生肌膚細胞。就像給您的肌膚進行完整的細胞改造。',
        'question_5': '有恢復期嗎？',
        'answer_5': '零恢復期！您可立即恢復正常活動。許多客戶甚至注意到療程後妝容更貼服。',
        'final_cta_headline': '您的肌膚值得最好的',
        'final_cta_text': '別讓肌膚再承受缺水和不適。加入數千位滿意客戶，透過我們革命性幹細胞療程蛻變肌膚。',
        'emergency_booking': '緊急預約',
        'call_now': '立即致電：(852) 1234-5678',
        'whatsapp_us': 'WhatsApp 查詢',
        'book_consultation': '預約免費諮詢',
        'go_to_slide': '前往第'
      },
      'zh-Hans': {
        'loading': '载入中...',
        'hero_headline': '拯救沙漠肌',
        'hero_subline': '干细胞锁水 | 极致修护 | 水感嫩白',
        'hero_description': '运用革命性干细胞技术，彻底改善严重脱水、疲劳肌肤。深层细胞补水直达真皮层，即时丰盈修复最受损的肌肤。',
        'emergency_cta': '🚨 肌肤急救?',
        'book_now': '立即预约',
        'limited_spots': '本周仅余5个名额',
        'problem_headline': '您的肌肤正在求救吗？',
        'problem_description': '干燥季节，肌肤每日发出求救讯号。缺水造成一连串肌肤问题，让您比实际年龄老得更快。',
        'skin_problems': '认出这些警告讯号吗？',
        'problem_1': '⚠️ 紧绷不适，感觉被"拉扯"的肌肤',
        'problem_2': '⚠️ 缺水导致细纹出现',
        'problem_3': '⚠️ 暗沉无光泽的肤色',
        'problem_4': '⚠️ 脱皮、粗糙的质感',
        'problem_5': '⚠️ 敏感度增加和刺激',
        'problem_6': '⚠️ 妆容无法贴服',
        'problem_cta': '别让缺水偷走您的青春',
        'solution_headline': '终极肌肤拯救方案',
        'solution_description': '我们的突破性干细胞疗程不只是保湿—而是在细胞层面彻底革新您的肌肤。',
        'solution_process': '如何改造沙漠肌',
        'step_1_title': '深层渗透分析',
        'step_1_desc': '先进肌肤扫描揭示表面疗程错失的隐藏缺水层',
        'step_2_title': '干细胞注入',
        'step_2_desc': '高浓度植物干细胞渗透重建内在水分屏障',
        'step_3_title': '细胞再生',
        'step_3_desc': '激活肌肤天然修复机制，实现持久蜕变',
        'step_4_title': '屏障强化',
        'step_4_desc': '强化保护屏障，防止未来水分流失',
        'immediate_results': '一次疗程即见效果',
        'result_1': '✨ 即时丰盈、更柔嫩的肌肤',
        'result_2': '✨ 明显减少缺水纹',
        'result_3': '✨ 重现光彩健康光泽',
        'result_4': '✨ 肌肤感觉舒适水润',
        'result_5': '✨ 妆容完美贴服',
        'result_6': '✨ 持久保湿效果',
        'testimonials_headline': '真实蜕变，真实效果',
        'testimonial_1_text': '"一次疗程后的改变让我难以置信！我的肌肤从沙漠般干燥变得水润光彩。这个疗程拯救了我的肌肤。"',
        'testimonial_1_name': '陈女士，34岁',
        'testimonial_1_rating': '★★★★★',
        'testimonial_2_text': '"在与慢性缺水问题挣扎多年后，这个疗程让我重拾信心。我的肌肤从未如此美丽和健康！"',
        'testimonial_2_name': '黄女士，41岁',
        'testimonial_2_rating': '★★★★★',
        'testimonial_3_text': '"作为美容编辑，我试过一切。这个干细胞疗程绝对是我体验过最有效的补水解决方案。"',
        'testimonial_3_name': '张女士，美容编辑',
        'testimonial_3_rating': '★★★★★',
        'limited_offer_headline': '🔥 独家拯救套餐',
        'offer_title': '沙漠肌急救组合',
        'offer_price': '完整疗程 $599',
        'offer_original': '原价 $1,200',
        'offer_savings': '今日节省 $601',
        'offer_includes': '包括：',
        'offer_item_1': '• 先进干细胞补水疗程',
        'offer_item_2': '• 专业肌肤分析',
        'offer_item_3': '• 带回家补水精华（价值$150）',
        'offer_item_4': '• 30天肌肤蜕变指南',
        'offer_item_5': '• 跟进咨询',
        'offer_expires': '限时优惠：48小时内到期',
        'offer_guarantee': '100% 满意保证或退款',
        'claim_offer': '立即抢购拯救套餐',
        'urgency_text': '此价格仅余3个套餐',
        'why_choose_us': '为什么Aura Beauty是香港第一选择',
        'trust_1': '🏆 获奖干细胞技术',
        'trust_2': '🏆 10,000+ 成功疗程',
        'trust_3': '🏆 98% 客户满意度',
        'trust_4': '🏆 名人及KOL信赖',
        'trust_5': '🏆 FDA认证设备',
        'trust_6': '🏆 无风险退款保证',
        'gallery_headline': '见证蜕变过程',
        'before_after_gallery': '前后对比',
        'treatment_process_gallery': '疗程过程',
        'moisture_analysis': '水分分析',
        'stem_cell_extraction': '干细胞技术',
        'cellular_renewal': '细胞更新',
        'gallery_desc_1': '真实客户的戏剧性前后对比效果',
        'gallery_desc_2': '我们专有的多阶段补水方案',
        'gallery_desc_3': '先进水分地图技术',
        'gallery_desc_4': '优质植物干细胞萃取过程',
        'gallery_desc_5': '肌肤细胞再生的微观视图',
        'faq_headline': '常见问题解答',
        'question_1': '多快能看到效果？',
        'answer_1': '大部分客户在首次疗程后立即看到改善—肌肤即时感觉更丰盈，看起来更光彩。最大效果在2-3次疗程中显现，因为干细胞在细胞层面持续作用。',
        'question_2': '这个疗程对敏感肌肤安全吗？',
        'answer_2': '绝对安全！我们的植物性干细胞配方专为敏感、受损肌肤设计。疗程温和但高效，无需恢复期。',
        'question_3': '效果能维持多久？',
        'answer_3': '效果可维持6-12个月，取决于您的生活方式和肌肤状况。我们建议每6个月进行维护疗程以保持最佳水合水平。',
        'question_4': '这与一般面部护理有什么不同？',
        'answer_4': '与表面护理不同，我们的干细胞技术深入真皮层修复和再生肌肤细胞。就像给您的肌肤进行完整的细胞改造。',
        'question_5': '有恢复期吗？',
        'answer_5': '零恢复期！您可立即恢复正常活动。许多客户甚至注意到疗程后妆容更贴服。',
        'final_cta_headline': '您的肌肤值得最好的',
        'final_cta_text': '别让肌肤再承受缺水和不适。加入数千位满意客户，透过我们革命性干细胞疗程蜕变肌肤。',
        'emergency_booking': '紧急预约',
        'call_now': '立即致电：(852) 1234-5678',
        'whatsapp_us': 'WhatsApp 查询',
        'book_consultation': '预约免费咨询',
        'go_to_slide': '前往第'
      }
    };
    
    const currentLang = language === 'zh-Hant' ? 'zh-Hant' : (language === 'zh-Hans' ? 'zh-Hans' : 'en');
    return uiText[currentLang]?.[key] || uiText['en']?.[key] || key;
  };

  // Set up the carousel API and event listener
  useEffect(() => {
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
      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: "url('/images/treatments/facials/ultimate-stemcell-hydrating-repair/hero.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {/* Emergency Banner */}
            <div className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 animate-pulse">
              <span className="mr-2">🚨</span>
              {getUIText('emergency_cta')}
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-2xl mb-6">
              {getUIText('hero_headline')}
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-300 font-semibold mb-6 drop-shadow-lg">
              {getUIText('hero_subline')}
            </p>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl drop-shadow-md">
              {getUIText('hero_description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/contact">
                <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-xl">
                  {getUIText('book_now')}
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto border-2 border-white bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                {getUIText('book_consultation')}
              </Button>
            </div>

            {/* Urgency Text */}
            <p className="text-yellow-400 font-semibold animate-pulse">
              ⚡ {getUIText('limited_spots')}
            </p>
          </div>
        </div>
      </section>

      {/* Problem Agitation Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {getUIText('problem_headline')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {getUIText('problem_description')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-red-600">
              {getUIText('skin_problems')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
                  <p className="text-gray-800 font-medium">
                    {getUIText(`problem_${num}`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-xl font-semibold text-red-600 mb-6">
                {getUIText('problem_cta')}
              </p>
              <Link href="/contact">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg">
                  {getUIText('book_now')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {getUIText('solution_headline')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {getUIText('solution_description')}
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">
              {getUIText('solution_process')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="text-center">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {num}
                  </div>
                  <h4 className="text-xl font-bold mb-3">
                    {getUIText(`step_${num}_title`)}
                  </h4>
                  <p className="text-gray-600">
                    {getUIText(`step_${num}_desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Immediate Results */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-center mb-8">
              {getUIText('immediate_results')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="flex items-center space-x-3">
                  <span className="text-2xl">✨</span>
                  <p className="text-gray-800 font-medium">
                    {getUIText(`result_${num}`).replace('✨ ', '')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Limited Offer Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {getUIText('limited_offer_headline')}
            </h2>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-white/20">
              <h3 className="text-3xl font-bold mb-6">
                {getUIText('offer_title')}
              </h3>
              
              <div className="flex justify-center items-baseline gap-4 mb-6">
                <span className="text-4xl lg:text-5xl font-bold">
                  {getUIText('offer_price')}
                </span>
                <span className="text-xl line-through opacity-70">
                  {getUIText('offer_original')}
                </span>
              </div>
              
              <div className="text-2xl font-bold text-yellow-300 mb-8">
                {getUIText('offer_savings')}
              </div>

              <div className="text-left max-w-md mx-auto mb-8">
                <h4 className="font-bold mb-4">{getUIText('offer_includes')}</h4>
                {[1, 2, 3, 4, 5].map((num) => (
                  <p key={num} className="mb-2">
                    {getUIText(`offer_item_${num}`)}
                  </p>
                ))}
              </div>

              <div className="bg-red-600 text-white px-6 py-3 rounded-full inline-block mb-6 animate-pulse">
                {getUIText('offer_expires')}
              </div>

              <div className="mb-6">
                <p className="text-green-300 font-semibold">
                  {getUIText('offer_guarantee')}
                </p>
              </div>

              <Link href="/contact">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-xl transform hover:scale-105 transition-all duration-300 mb-4">
                  {getUIText('claim_offer')}
                </Button>
              </Link>

              <p className="text-yellow-300 text-sm animate-pulse">
                {getUIText('urgency_text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            {getUIText('testimonials_headline')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-blue-500">
                <div className="text-yellow-400 text-2xl mb-4">
                  {getUIText(`testimonial_${num}_rating`)}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  {getUIText(`testimonial_${num}_text`)}
                </p>
                <div className="font-semibold text-gray-900">
                  {getUIText(`testimonial_${num}_name`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {getUIText('why_choose_us')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="text-center p-6">
                <div className="text-4xl mb-4">
                  {getUIText(`trust_${num}`).split(' ')[0]}
                </div>
                <h3 className="text-lg font-semibold">
                  {getUIText(`trust_${num}`).replace('🏆 ', '')}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {getUIText('gallery_headline')}
          </h2>
          
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
                              treatment="ultimate-stemcell-hydrating-repair"
                              type="benefits"
                              index={num}
                              alt={[getUIText('before_after_gallery'), getUIText('treatment_process_gallery'), getUIText('moisture_analysis'), getUIText('stem_cell_extraction'), getUIText('cellular_renewal')][num-1]}
                              fill
                              className="transition duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">
                              {[getUIText('before_after_gallery'), getUIText('treatment_process_gallery'), getUIText('moisture_analysis'), getUIText('stem_cell_extraction'), getUIText('cellular_renewal')][num-1]}
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
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
              {getUIText('faq_headline')}
            </h2>
            
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border border-blue-100">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    {getUIText(`question_${num}`)}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {getUIText(`answer_${num}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {getUIText('final_cta_headline')}
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            {getUIText('final_cta_text')}
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-full text-xl transform hover:scale-105 transition-all duration-300">
                {getUIText('emergency_booking')}
              </Button>
            </Link>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 py-4 px-6 rounded-full">
                {getUIText('call_now')}
              </Button>
              <Button variant="outline" className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 py-4 px-6 rounded-full">
                {getUIText('whatsapp_us')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
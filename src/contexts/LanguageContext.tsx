"use client"

import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import type { Language } from '@/components/LanguageSwitcher'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string, fallback: string) => string
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key, fallback) => fallback,
})

// Simple translations object - in a real app, this would be loaded from a file or API
const translations: Record<Language, Record<string, string>> = {
  'en': {
    // Navigation
    'home': 'Home',
    'about': 'About Us',
    'contact': 'Contact Us',
    'treatments': 'Treatments',
    'book_now': 'Book Now',
    'learn_more': 'Learn More',
    'premium_beauty': 'Premium Beauty',
    'body_care': 'Body Care',
    'new_doublo': 'New Doublo™',
    'cell_beauty': 'Cell Beauty',
    'special_offers': 'Special Offers',
    
    // Treatment names
    'royal_black_scan': 'Royal Black Scan',
    'peeled_egg_skin': 'Peeled Egg Skin',
    'collagen_regeneration': 'Collagen Regeneration',
    'smart_rescue': '360 Smart Rescue',
    'farewell_puffy': 'Farewell Puffy Face',
    'ultimate_stemcell': 'Ultimate Stemcell Hydrating Repair',
    'ceramic_skin': 'Ceramic Skin Renewal',
    'mole_wart_removal': 'Mole, Wart & Skin Growth Removal',
    'radiant_defense': 'Radiant Defense Synergy Treatment',
    'lymphatic_detox': '2-in-1 Lymphatic Detox',
    'breast_enhancement': 'Breast Enhancement',
    'perfect_buttocks': 'Perfect Buttocks',
    'hair_removal': 'Full Body Hair Removal',
    'stretch_mark': 'Stretch Mark Repair',
    'sculpt_lift': 'Sculpt & Lift',
    'v_line': 'V-Line Perfection',
    'youth_revival': 'Youth Revival',
    'neck_rejuvenation': 'Neck Rejuvenation',
    'baby_face': 'Baby Face Contouring',
    
    // Common UI elements
    'view_details': 'View Details',
    'read_more': 'Read More',
    'back': 'Back',
    'next': 'Next',
    'previous': 'Previous',
    'close': 'Close',
    
    // Treatment page elements
    'benefits': 'Benefits',
    'suitable_for': 'Suitable For',
    'contraindications': 'Contraindications',
    'preparation': 'Preparation',
    'aftercare': 'Aftercare',
    'faq': 'Frequently Asked Questions',
    'how_it_works': 'How It Works',
    'results': 'Results',
    'testimonials': 'Testimonials',
    'ready_for': 'Ready for',
    'book_your_treatment': 'Book Your Treatment',
    'price': 'Price',
    'duration': 'Duration',
    'before_after': 'Before & After',
    'technology': 'Technology',
    'our_approach': 'Our Approach',
    'what_to_expect': 'What to Expect',
    
    // Blog related
    'blog': 'Blog',
    'search_blog': 'Search blog posts...',
    'all_categories': 'All Categories',
    'reset_filters': 'Reset filters',
    'no_posts_found': 'No posts found',
    'try_different_search': 'Try a different search term or category',
    'back_to_blog': 'Back to Blog',
    'blog_not_found': 'Blog post not found',
    'blog_not_found_message': 'The blog post you are looking for does not exist or has been removed.',
    'read_full_post': 'Read Full Post',
    'latest_posts': 'Latest Posts',
    'popular_posts': 'Popular Posts',
    'featured_posts': 'Featured Posts',
    'related_posts': 'Related Posts',
    'share_post': 'Share this post',
    
    // Testimonial related
    'what_clients_say': 'What Our Clients Say',
    'testimonials_subtitle': 'Read about the experiences of our satisfied clients with our beauty treatments and services.',
    'previous_testimonial': 'Previous testimonial',
    'next_testimonial': 'Next testimonial',
    'view_all_testimonials': 'View All Testimonials',
    'client_testimonials': 'Client Testimonials',
    'verified_client': 'Verified Client',
    'service_received': 'Service Received',
    'submit_testimonial': 'Submit Your Testimonial',
    'featured_testimonial': 'Featured Testimonial',
  },
  'zh-Hant': {
    // Navigation
    'home': '首頁',
    'about': '關於我們',
    'contact': '聯絡我們',
    'treatments': '療程',
    'book_now': '立即預約',
    'learn_more': '了解更多',
    'premium_beauty': '尊貴美容',
    'body_care': '身體護理',
    'new_doublo': '新多寶™',
    'cell_beauty': '細胞美容',
    'special_offers': '特別優惠',
    
    // Treatment names
    'royal_black_scan': '皇家黑掃描',
    'peeled_egg_skin': '剝殼雞蛋肌',
    'collagen_regeneration': '膠原蛋白再生',
    'smart_rescue': '360智能修復',
    'farewell_puffy': '告別浮腫面',
    'ultimate_stemcell': '終極幹細胞保濕修復',
    'ceramic_skin': '瓷肌煥新',
    'mole_wart_removal': '痣、疣及皮膚增生物移除',
    'radiant_defense': '亮膚防禦協同療程',
    'lymphatic_detox': '二合一淋巴排毒',
    'breast_enhancement': '胸部提升',
    'perfect_buttocks': '完美臀部',
    'hair_removal': '全身脫毛',
    'stretch_mark': '妊娠紋修復',
    'sculpt_lift': '塑形提升',
    'v_line': 'V臉完美',
    'youth_revival': '青春煥活',
    'neck_rejuvenation': '頸部年輕化',
    'baby_face': '嬰兒臉塑形',
    
    // Common UI elements
    'view_details': '查看詳情',
    'read_more': '閱讀更多',
    'back': '返回',
    'next': '下一步',
    'previous': '上一步',
    'close': '關閉',
    
    // Treatment page elements
    'benefits': '效益',
    'suitable_for': '適合人群',
    'contraindications': '禁忌症',
    'preparation': '準備事項',
    'aftercare': '術後護理',
    'faq': '常見問題',
    'how_it_works': '運作原理',
    'results': '效果',
    'testimonials': '客戶評價',
    'ready_for': '準備好體驗',
    'book_your_treatment': '預約您的療程',
    'price': '價格',
    'duration': '療程時間',
    'before_after': '前後對比',
    'technology': '技術',
    'our_approach': '我們的方法',
    'what_to_expect': '您可以期待',
    
    // Blog related
    'blog': '部落格',
    'search_blog': '搜尋部落格文章...',
    'all_categories': '所有類別',
    'reset_filters': '重設篩選',
    'no_posts_found': '找不到文章',
    'try_different_search': '嘗試不同的搜尋詞或類別',
    'back_to_blog': '返回部落格',
    'blog_not_found': '找不到部落格文章',
    'blog_not_found_message': '您尋找的部落格文章不存在或已被移除。',
    'read_full_post': '閱讀完整文章',
    'latest_posts': '最新文章',
    'popular_posts': '熱門文章',
    'featured_posts': '精選文章',
    'related_posts': '相關文章',
    'share_post': '分享此文章',
    
    // Testimonial related
    'what_clients_say': '客戶怎麼說',
    'testimonials_subtitle': '閱讀我們滿意客戶對美容療程和服務的體驗。',
    'previous_testimonial': '上一個評價',
    'next_testimonial': '下一個評價',
    'view_all_testimonials': '查看所有評價',
    'client_testimonials': '客戶評價',
    'verified_client': '已驗證客戶',
    'service_received': '接受的服務',
    'submit_testimonial': '提交您的評價',
    'featured_testimonial': '精選評價',
  },
  'zh-Hans': {
    // Navigation
    'home': '首页',
    'about': '关于我们',
    'contact': '联系我们',
    'treatments': '疗程',
    'book_now': '立即预约',
    'learn_more': '了解更多',
    'premium_beauty': '尊贵美容',
    'body_care': '身体护理',
    'new_doublo': '新多宝™',
    'cell_beauty': '细胞美容',
    'special_offers': '特别优惠',
    
    // Treatment names
    'royal_black_scan': '皇家黑扫描',
    'peeled_egg_skin': '剥壳鸡蛋肌',
    'collagen_regeneration': '胶原蛋白再生',
    'smart_rescue': '360智能修复',
    'farewell_puffy': '告别浮肿面',
    'ultimate_stemcell': '终极干细胞保湿修复',
    'ceramic_skin': '瓷肌焕新',
    'mole_wart_removal': '痣、疣及皮肤增生物移除',
    'radiant_defense': '亮肤防御协同疗程',
    'lymphatic_detox': '二合一淋巴排毒',
    'breast_enhancement': '胸部提升',
    'perfect_buttocks': '完美臀部',
    'hair_removal': '全身脱毛',
    'stretch_mark': '妊娠纹修复',
    'sculpt_lift': '塑形提升',
    'v_line': 'V脸完美',
    'youth_revival': '青春焕活',
    'neck_rejuvenation': '颈部年轻化',
    'baby_face': '婴儿脸塑形',
    
    // Common UI elements
    'view_details': '查看详情',
    'read_more': '阅读更多',
    'back': '返回',
    'next': '下一步',
    'previous': '上一步',
    'close': '关闭',
    
    // Treatment page elements
    'benefits': '效益',
    'suitable_for': '适合人群',
    'contraindications': '禁忌症',
    'preparation': '准备事项',
    'aftercare': '术后护理',
    'faq': '常见问题',
    'how_it_works': '运作原理',
    'results': '效果',
    'testimonials': '客户评价',
    'ready_for': '准备好体验',
    'book_your_treatment': '预约您的疗程',
    'price': '价格',
    'duration': '疗程时间',
    'before_after': '前后对比',
    'technology': '技术',
    'our_approach': '我们的方法',
    'what_to_expect': '您可以期待',
    
    // Blog related
    'blog': '博客',
    'search_blog': '搜索博客文章...',
    'all_categories': '所有类别',
    'reset_filters': '重置筛选',
    'no_posts_found': '找不到文章',
    'try_different_search': '尝试不同的搜索词或类别',
    'back_to_blog': '返回博客',
    'blog_not_found': '找不到博客文章',
    'blog_not_found_message': '您寻找的博客文章不存在或已被移除。',
    'read_full_post': '阅读完整文章',
    'latest_posts': '最新文章',
    'popular_posts': '热门文章',
    'featured_posts': '精选文章',
    'related_posts': '相关文章',
    'share_post': '分享此文章',
    
    // Testimonial related
    'what_clients_say': '客户怎么说',
    'testimonials_subtitle': '阅读我们满意客户对美容疗程和服务的体验。',
    'previous_testimonial': '上一个评价',
    'next_testimonial': '下一个评价',
    'view_all_testimonials': '查看所有评价',
    'client_testimonials': '客户评价',
    'verified_client': '已验证客户',
    'service_received': '接受的服务',
    'submit_testimonial': '提交您的评价',
    'featured_testimonial': '精选评价',
  }
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>('en')
  
  // Initialize language from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('preferred-language') as Language
      if (storedLanguage && ['en', 'zh-Hant', 'zh-Hans'].includes(storedLanguage)) {
        setLanguageState(storedLanguage)
      }
    }
  }, [])
  
  // Update localStorage when language changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem('preferred-language', newLanguage)
  }
  
  // Listen for language change events from other components
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent
      setLanguageState(customEvent.detail.language)
    }
    
    window.addEventListener('language-changed', handleLanguageChange)
    return () => {
      window.removeEventListener('language-changed', handleLanguageChange)
    }
  }, [])
  
  // Translation function
  const t = (key: string, fallback: string): string => {
    return translations[language]?.[key] || fallback
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext)

export default LanguageContext 
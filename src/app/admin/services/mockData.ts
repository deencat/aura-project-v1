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
  // Traditional Chinese fields
  name_zh_hant?: string;
  short_description_zh_hant?: string;
  long_description_zh_hant?: string;
  benefits_zh_hant?: string;
  suitable_for_zh_hant?: string;
  contraindications_zh_hant?: string;
  preparation_zh_hant?: string;
  aftercare_zh_hant?: string;
  // Simplified Chinese fields
  name_zh_hans?: string;
  short_description_zh_hans?: string;
  long_description_zh_hans?: string;
  benefits_zh_hans?: string;
  suitable_for_zh_hans?: string;
  contraindications_zh_hans?: string;
  preparation_zh_hans?: string;
  aftercare_zh_hans?: string;
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
    name: 'Goddess Curves',
    category: 'Body Care',
    price: '$1,200',
    duration: '90 min',
    status: 'Active',
    slug: 'body-care/breast-enhancement',
    short_description: 'Awaken Your Goddess Curves—Experience the Revolutionary "Cellular Breast Vitality" Transformation! Our exclusive techniques work at the cellular level to restore fullness and resilience from within.',
    long_description: 'Our revolutionary approach uses advanced technologies and natural methods to enhance beauty and wellness from within.',
    benefits: 'Cellular-Level Activation\nTriple Deep Restoration\nNatural Energy Infusion\nImproves firmness and lift\nEnhances shape\nStimulates collagen production',
    suitable_for: 'Post-pregnancy women, those seeking natural enhancement, age-related changes, asymmetry correction',
    contraindications: 'Pregnancy, breastfeeding, breast implants, history of breast cancer, certain skin conditions',
    preparation: 'Wear comfortable clothing. Avoid applying lotions or creams to the area',
    aftercare: 'Wear supportive bra for 24 hours. Avoid strenuous exercise for 48 hours',
    // Traditional Chinese content
    name_zh_hant: '女神曲線',
    short_description_zh_hant: '喚醒您的女神曲線—體驗革命性的「細胞豐胸活力」轉化！我們獨家技術從細胞層面恢復豐滿度和彈性。',
    long_description_zh_hant: '我們的革命性方法使用先進技術和天然方法，從內在提升美麗與健康。',
    benefits_zh_hant: '細胞層面激活\n三重深度修復\n天然能量注入\n改善緊實度和提升效果\n增強形狀\n刺激膠原蛋白生成',
    suitable_for_zh_hant: '產後女性，尋求天然增強效果者，年齡相關變化，不對稱矯正',
    contraindications_zh_hant: '懷孕期間，哺乳期間，乳房植入物，乳癌病史，某些皮膚狀況',
    preparation_zh_hant: '穿著舒適衣物。避免在治療區域塗抹乳液或面霜',
    aftercare_zh_hant: '24小時內穿著支撐性內衣。48小時內避免劇烈運動',
    // Simplified Chinese content
    name_zh_hans: '女神曲线',
    short_description_zh_hans: '唤醒您的女神曲线—体验革命性的"细胞丰胸活力"转化！我们独家技术从细胞层面恢复丰满度和弹性。',
    long_description_zh_hans: '我们的革命性方法使用先进技术和天然方法，从内在提升美丽与健康。',
    benefits_zh_hans: '细胞层面激活\n三重深度修复\n天然能量注入\n改善紧实度和提升效果\n增强形状\n刺激胶原蛋白生成',
    suitable_for_zh_hans: '产后女性，寻求天然增强效果者，年龄相关变化，不对称矫正',
    contraindications_zh_hans: '怀孕期间，哺乳期间，乳房植入物，乳癌病史，某些皮肤状况',
    preparation_zh_hans: '穿着舒适衣物。避免在治疗区域涂抹乳液或面霜',
    aftercare_zh_hans: '24小时内穿着支撑性内衣。48小时内避免剧烈运动'
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
  },
  {
    id: 10,
    name: 'Royal Black Scan',
    category: 'Facials',
    price: '$1,350',
    duration: '75 min',
    status: 'Active',
    slug: 'treatments/royal-black-scan',
    short_description: 'Advanced technology that targets all types of spots, pigmentation, and skin blemishes with precision.',
    long_description: 'Using cutting-edge technology, we precisely target and break down all types of spots on your skin. The Royal Black Scan is a non-invasive treatment that effectively reduces and eliminates spots on the skin. Based on advanced scientific technology, it precisely targets spots while protecting surrounding skin.',
    benefits: 'Targets all spot types\nPrecise wavelength technology\nStimulates collagen production\nImproves skin texture\nNon-invasive treatment\nNo downtime required',
    suitable_for: 'Those with various spots, freckles, age spots, hormonal spots, sun damage, pigmentation issues',
    contraindications: 'Pregnancy, breastfeeding, recent sun exposure, photosensitivity disorders, certain medications, skin infections',
    preparation: 'Avoid sun exposure for 2 weeks before treatment. Discontinue retinol products 1 week prior. Arrive with clean skin.',
    aftercare: 'Apply sunscreen diligently. Avoid sun exposure for 2 weeks. Use gentle skincare products only.',
    // Traditional Chinese content
      name_zh_hant: '女皇激光掃斑術',
  short_description_zh_hant: '革命性1064nm/755nm蜂巢激光技術，一掃即淨，重現無瑕美肌。',
  long_description_zh_hant: '採用頂尖女皇激光掃斑術，結合1064nm深層波長及755nm表層波長的雙重激光技術。極短時間內穿透皮膚，精準擊碎頑固色斑，激發膠原增生。此非侵入性療程能有效消除荷爾蒙斑、雀斑、老人斑等各類色素問題，同時保護周圍健康肌膚，讓您重拾完美無瑕的星級美肌。',
      benefits_zh_hant: '★ 雙波長激光精準打擊\n★ 1064nm/755nm蜂巢技術\n★ 激發深層膠原再生\n★ 星級無瑕美肌效果\n★ 零恢復期即見效果\n★ 全方位斑點剋星',
  suitable_for_zh_hant: '追求完美肌膚者、荷爾蒙斑困擾、雀斑老人斑問題、日曬色素沉澱、痘印疤痕、膚色不均等各類斑點問題',
    contraindications_zh_hant: '懷孕、哺乳、近期日曬、光敏感疾病、某些藥物、皮膚感染',
    preparation_zh_hant: '療程前2週避免日曬。療程前1週停用維A酸產品。到達時請保持皮膚清潔。',
    aftercare_zh_hant: '勤用防曬霜。療程後2週避免日曬。僅使用溫和護膚品。',
    // Simplified Chinese content
      name_zh_hans: '女皇激光扫斑术',
  short_description_zh_hans: '革命性1064nm/755nm蜂巢激光技术，一扫即净，重现无瑕美肌。',
  long_description_zh_hans: '采用顶尖女皇激光扫斑术，结合1064nm深层波长及755nm表层波长的双重激光技术。极短时间内穿透皮肤，精准击碎顽固色斑，激发胶原增生。此非侵入性疗程能有效消除荷尔蒙斑、雀斑、老人斑等各类色素问题，同时保护周围健康肌肤，让您重拾完美无瑕的星级美肌。',
  benefits_zh_hans: '★ 双波长激光精准打击\n★ 1064nm/755nm蜂巢技术\n★ 激发深层胶原再生\n★ 星级无瑕美肌效果\n★ 零恢复期即见效果\n★ 全方位斑点克星',
  suitable_for_zh_hans: '追求完美肌肤者、荷尔蒙斑困扰、雀斑老人斑问题、日晒色素沉淀、痘印疤痕、肤色不均等各类斑点问题',
    contraindications_zh_hans: '怀孕、哺乳、近期日晒、光敏感疾病、某些药物、皮肤感染',
    preparation_zh_hans: '疗程前2周避免日晒。疗程前1周停用维A酸产品。到达时请保持皮肤清洁。',
    aftercare_zh_hans: '勤用防晒霜。疗程后2周避免日晒。仅使用温和护肤品。'
  },
  {
    id: 11,
    name: 'Peeled Egg Skin',
    category: 'Facials',
    price: '$1,180',
    duration: '90 min',
    status: 'Active',
    slug: 'treatments/peeled-egg-skin',
    short_description: 'Advanced Korean ultrasonic pulse technology that deeply cleanses pores and reveals silky smooth skin like a freshly peeled egg.',
    long_description: 'Our "Peeled Egg Skin Treatment" uses advanced Korean ultrasonic pulse technology to deeply cleanse pores, thoroughly removing hidden impurities and old keratin. Combined with our professional beauticians\' exclusive massage techniques, this treatment promotes facial lymphatic circulation, helping to drain excess water and toxins. According to your skin\'s condition, we carefully select potent serums to infuse multiple nutrients deep into the skin, providing comprehensive repair.',
    benefits: 'Silky smooth texture\nDeep cleansing purification\nRadiant firmness enhancement\nGentle nourishment infusion\nLymphatic circulation boost\nImproved product absorption',
    suitable_for: 'Those with rough, dull skin, excess dead skin buildup, poor product absorption, clogged pores, uneven skin texture',
    contraindications: 'Pregnancy, breastfeeding, active skin infections, severe acne, recent facial surgery, certain skin conditions',
    preparation: 'Avoid exfoliating products for 3 days before treatment. Remove all makeup and arrive with clean skin. Avoid sun exposure.',
    aftercare: 'Apply gentle moisturizer only. Avoid harsh products for 24 hours. Use SPF protection. Stay hydrated.',
    // Traditional Chinese content
    name_zh_hant: '剝殼雞蛋肌',
    short_description_zh_hant: '韓式超聲波脈衝技術深層潔淨毛孔，重現如剝殼雞蛋般絲滑嫩白的完美肌膚。',
    long_description_zh_hant: '「剝殼雞蛋肌療程」採用先進韓式超聲波脈衝技術深層潔淨毛孔，徹底清除藏匿的污垢及老化角質。結合專業美容師獨家按摩手法，促進面部淋巴循環，協助排走多餘水分及毒素。根據您的肌膚狀況，精心挑選強效精華，將多重營養深層注入肌膚，提供全面修護，讓肌膚如剝殼雞蛋般光滑細膩無瑕。',
    benefits_zh_hant: '✨ 絲滑嫩白質感\n✨ 深層潔淨淨化\n✨ 緊緻透亮提升\n✨ 溫和滋養呵護\n✨ 淋巴循環促進\n✨ 護膚品吸收增強',
    suitable_for_zh_hant: '肌膚粗糙暗啞者、老化角質堆積、護膚品難吸收、毛孔堵塞、膚質不均等肌膚問題',
    contraindications_zh_hant: '懷孕、哺乳、活躍性皮膚感染、嚴重暗瘡、近期面部手術、某些皮膚疾病',
    preparation_zh_hant: '療程前3天避免去角質產品。卸除所有化妝品，保持肌膚清潔。避免日曬。',
    aftercare_zh_hant: '僅使用溫和保濕霜。療程後24小時內避免刺激性產品。勤用防曬保護。多補充水分。',
    // Simplified Chinese content
    name_zh_hans: '剥壳鸡蛋肌',
    short_description_zh_hans: '韩式超声波脉冲技术深层洁净毛孔，重现如剥壳鸡蛋般丝滑嫩白的完美肌肤。',
    long_description_zh_hans: '"剥壳鸡蛋肌疗程"采用先进韩式超声波脉冲技术深层洁净毛孔，彻底清除藏匿的污垢及老化角质。结合专业美容师独家按摩手法，促进面部淋巴循环，协助排走多余水分及毒素。根据您的肌肤状况，精心挑选强效精华，将多重营养深层注入肌肤，提供全面修护，让肌肤如剥壳鸡蛋般光滑细腻无瑕。',
    benefits_zh_hans: '✨ 丝滑嫩白质感\n✨ 深层洁净净化\n✨ 紧致透亮提升\n✨ 温和滋养呵护\n✨ 淋巴循环促进\n✨ 护肤品吸收增强',
    suitable_for_zh_hans: '肌肤粗糙暗哑者、老化角质堆积、护肤品难吸收、毛孔堵塞、肤质不均等肌肤问题',
    contraindications_zh_hans: '怀孕、哺乳、活跃性皮肤感染、严重暗疮、近期面部手术、某些皮肤疾病',
    preparation_zh_hans: '疗程前3天避免去角质产品。卸除所有化妆品，保持肌肤清洁。避免日晒。',
    aftercare_zh_hans: '仅使用温和保湿霜。疗程后24小时内避免刺激性产品。勤用防晒保护。多补充水分。'
  },
  {
    id: 12,
    name: 'Collagen Regeneration',
    category: 'Facials',
    price: '$1,280',
    duration: '80 min',
    status: 'Active',
    slug: 'treatments/collagen-regeneration',
    short_description: 'Boost your skin\'s natural collagen production for improved elasticity, firmness, and a more youthful appearance.',
    long_description: 'Our Collagen Regeneration treatment utilizes advanced technology to stimulate your skin\'s natural collagen production process, revitalizing your skin from within and restoring its youthful appearance. This non-invasive treatment penetrates deep into the dermis layer where collagen is produced, activating fibroblast cells to create new collagen fibers that strengthen and tighten your skin.',
    benefits: 'Improved skin elasticity\nReduced fine lines and wrinkles\nIncreased firmness\nEnhanced skin texture\nYouthful glow restoration\nNatural collagen boost',
    suitable_for: 'Those with aging skin, fine lines, wrinkles, loss of elasticity, dull complexion, or anyone seeking anti-aging benefits',
    contraindications: 'Pregnancy, breastfeeding, active skin infections, severe skin conditions, recent laser treatments, autoimmune disorders',
    preparation: 'Avoid sun exposure and retinol products for 1 week before treatment. Arrive with clean, makeup-free skin',
    aftercare: 'Apply provided healing cream. Use SPF 30+ daily. Avoid direct sun exposure for 48 hours. Stay hydrated',
    // Traditional Chinese content
    name_zh_hant: '膠原蛋白再生療程',
    short_description_zh_hant: '促進肌膚天然膠原蛋白生成，改善彈性、緊緻度，重現年輕光采。',
    long_description_zh_hant: '我們的膠原蛋白再生療程採用先進技術，刺激肌膚天然膠原蛋白生成過程，從內部活化肌膚，恢復年輕外觀。這項非侵入性療程深入真皮層膠原蛋白生成區域，激活纖維母細胞產生新的膠原蛋白纖維，強化和緊緻肌膚。',
    benefits_zh_hant: '改善肌膚彈性\n減少細紋和皺紋\n增強緊緻度\n提升肌膚質感\n恢復年輕光澤\n天然膠原蛋白提升',
    suitable_for_zh_hant: '適合老化肌膚、細紋、皺紋、彈性流失、暗沉膚色，或任何尋求抗老效果的人士',
    contraindications_zh_hant: '懷孕、哺乳期間、活躍性皮膚感染、嚴重皮膚狀況、近期激光治療、自體免疫疾病',
    preparation_zh_hant: '療程前一週避免日曬和使用維甲酸產品。請以潔淨無妝容肌膚到達',
    aftercare_zh_hant: '使用提供的修復面霜。每日使用SPF30+防曬。48小時內避免直接日曬。保持充足水分',
    // Simplified Chinese content
    name_zh_hans: '胶原蛋白再生疗程',
    short_description_zh_hans: '促进肌肤天然胶原蛋白生成，改善弹性、紧致度，重现年轻光采。',
    long_description_zh_hans: '我们的胶原蛋白再生疗程采用先进技术，刺激肌肤天然胶原蛋白生成过程，从内部活化肌肤，恢复年轻外观。这项非侵入性疗程深入真皮层胶原蛋白生成区域，激活纤维母细胞产生新的胶原蛋白纤维，强化和紧致肌肤。',
    benefits_zh_hans: '改善肌肤弹性\n减少细纹和皱纹\n增强紧致度\n提升肌肤质感\n恢复年轻光泽\n天然胶原蛋白提升',
    suitable_for_zh_hans: '适合老化肌肤、细纹、皱纹、弹性流失、暗沉肤色，或任何寻求抗老效果的人士',
    contraindications_zh_hans: '怀孕、哺乳期间、活跃性皮肤感染、严重皮肤状况、近期激光治疗、自体免疫疾病',
    preparation_zh_hans: '疗程前一周避免日晒和使用维甲酸产品。请以洁净无妆容肌肤到达',
    aftercare_zh_hans: '使用提供的修复面霜。每日使用SPF30+防晒。48小时内避免直接日晒。保持充足水分'
  },
  {
    id: 13,
    name: 'Farewell Puffy',
    category: 'Facial Treatment',
    price: '$1,500',
    duration: '120 min',
    status: 'Active',
    slug: 'treatments/farewell-puffy',
    short_description: 'Revolutionary non-invasive face slimming and lifting technique that delivers results comparable to thread lifting procedures.',
    long_description: 'Our "Farewell Puffy" treatment is a revolutionary non-invasive face slimming and lifting technique that delivers results comparable to thread lifting procedures. Using focused ultrasonic energy to create invisible "energy threads" in the deeper dermis layer, this treatment stimulates collagen production and restructuring, enhancing skin elasticity and creating a natural lifting effect.',
    benefits: 'Facial Tightening\nV-Shape Face Enhancement\nDefined Contours\nFine Line Reduction\nNon-invasive lifting\nImproved skin elasticity\nCollagen stimulation\nReduced puffiness',
    suitable_for: 'Those with sagging skin, puffy cheeks, lack of facial definition, age-related volume loss, or anyone seeking non-surgical facial lifting',
    contraindications: 'Pregnancy, breastfeeding, metal implants in treatment area, pacemaker, severe skin conditions, recent facial surgery',
    preparation: 'Arrive with clean, makeup-free skin. Avoid alcohol and blood-thinning medications 24 hours before treatment',
    aftercare: 'Apply gentle moisturizer. Avoid makeup for 4 hours. Stay hydrated. Avoid strenuous exercise for 24 hours',
    // Traditional Chinese content
    name_zh_hant: '告別浮腫緊膚術',
    short_description_zh_hant: '革命性非侵入式瘦臉提升技術，效果媲美線雕療程。',
    long_description_zh_hant: '我們的「告別浮腫」療程是革命性的非侵入式瘦臉提升技術，效果媲美線雕療程。利用聚焦超聲波能量在真皮深層創造無形的「能量線」，刺激膠原蛋白生成和重組，增強肌膚彈性，創造自然提升效果。',
    benefits_zh_hant: '面部緊膚\nV面輪廓塑造\n輪廓明確定義\n細紋減少\n非侵入式提升\n改善肌膚彈性\n膠原蛋白刺激\n減少浮腫',
    suitable_for_zh_hant: '適合肌膚鬆弛、面頰浮腫、面部輪廓不明顯、年齡相關體積流失，或尋求非手術面部提升的人士',
    contraindications_zh_hant: '懷孕、哺乳期間、治療區域有金屬植入物、心律調節器、嚴重皮膚狀況、近期面部手術',
    preparation_zh_hant: '請以潔淨無妝容肌膚到達。療程前24小時避免酒精和抗凝血藥物',
    aftercare_zh_hant: '使用溫和保濕霜。4小時內避免化妝。保持充足水分。24小時內避免劇烈運動',
    // Simplified Chinese content
    name_zh_hans: '告别浮肿紧肤术',
    short_description_zh_hans: '革命性非侵入式瘦脸提升技术，效果媲美线雕疗程。',
    long_description_zh_hans: '我们的"告别浮肿"疗程是革命性的非侵入式瘦脸提升技术，效果媲美线雕疗程。利用聚焦超声波能量在真皮深层创造无形的"能量线"，刺激胶原蛋白生成和重组，增强肌肤弹性，创造自然提升效果。',
    benefits_zh_hans: '面部紧肤\nV面轮廓塑造\n轮廓明确定义\n细纹减少\n非侵入式提升\n改善肌肤弹性\n胶原蛋白刺激\n减少浮肿',
    suitable_for_zh_hans: '适合肌肤松弛、面颊浮肿、面部轮廓不明显、年龄相关体积流失，或寻求非手术面部提升的人士',
    contraindications_zh_hans: '怀孕、哺乳期间、治疗区域有金属植入物、心律调节器、严重皮肤状况、近期面部手术',
    preparation_zh_hans: '请以洁净无妆容肌肤到达。疗程前24小时避免酒精和抗凝血药物',
          aftercare_zh_hans: '使用温和保湿霜。4小时内避免化妆。保持充足水分。24小时内避免剧烈运动'
    },
    {
      id: 14,
      name: 'Ultimate Stemcell Hydrating Repair',
      category: 'Facial Treatment',
      price: '$1,800',
      duration: '150 min',
      status: 'Active',
      slug: 'treatments/ultimate-stemcell-hydrating-repair',
      short_description: 'Revolutionary stem cell technology for deep hydration and cellular regeneration. Specially designed for severely dehydrated, fatigued, and lackluster skin.',
      long_description: 'During the dry autumn season, skin often feels tight and dehydrated, leading to issues such as fine lines, dull complexion, puffiness, and sensitivity. The Ultimate Stem Cell Hydrating & Radiance Repair Treatment is specially designed for severely dehydrated, fatigued, and lackluster skin. Utilizing high-concentration stem cell essence combined with innovative penetration technology, active ingredients are delivered deep into the skin to rapidly replenish moisture, strengthen the skin barrier, and reduce the appearance of fine lines.',
      benefits: 'Deep Hydration\nStem Cell Activation\nBarrier Reinforcement\nRadiance Enhancement\nImmediate Relief\nLong-lasting Hydration\nCellular Regeneration\nEnhanced Absorption\nFine Line Reduction\nStrengthened Barrier',
      suitable_for: 'All skin types experiencing dehydration, fatigue, or dullness, including sensitive skin. Ideal for those with severely dehydrated skin, fine lines due to dryness, compromised skin barrier, lackluster complexion, or seasonal skin concerns.',
      contraindications: 'Active skin infections, severe inflammatory conditions, recent chemical peels or laser treatments, pregnancy (consult physician), allergies to plant-derived ingredients',
      preparation: 'Arrive with clean, makeup-free skin. Avoid retinoids and exfoliating products 48 hours before treatment. Stay well-hydrated before your appointment.',
      aftercare: 'Apply gentle, hydrating products. Avoid harsh cleansers for 24 hours. Use SPF protection. Stay hydrated and maintain a gentle skincare routine.',
      // Traditional Chinese content
      name_zh_hant: '終極幹細胞深層補水修復',
      short_description_zh_hant: '革命性幹細胞技術深層補水和細胞再生。專為嚴重脫水、疲勞和黯淡肌膚而設計。',
      long_description_zh_hant: '在乾燥的秋季，肌膚經常感到緊繃和脫水，導致細紋、暗沉、浮腫和敏感等問題。終極幹細胞深層補水煥采修復療程專為嚴重脫水、疲勞和黯淡肌膚而特別設計。利用高濃度幹細胞精華結合創新滲透技術，將活性成分深入肌膚底層，快速補充水分，強化肌膚屏障，減少細紋的出現。',
      benefits_zh_hant: '深層補水\n幹細胞激活\n屏障強化\n光采提升\n即時舒緩\n持久保濕\n細胞再生\n增強吸收\n細紋減少\n屏障強化',
      suitable_for_zh_hant: '適合所有經歷脫水、疲勞或暗沉的肌膚類型，包括敏感肌膚。特別適合嚴重脫水肌膚、因乾燥導致的細紋、受損肌膚屏障、黯淡膚色或季節性肌膚問題的人士。',
      contraindications_zh_hant: '活躍性皮膚感染、嚴重炎症狀況、近期化學換膚或激光治療、懷孕（請諮詢醫生）、對植物衍生成分過敏',
      preparation_zh_hant: '請以潔淨無妝容肌膚到達。療程前48小時避免使用維他命A和去角質產品。療程前保持充足水分。',
      aftercare_zh_hant: '使用溫和保濕產品。24小時內避免刺激性潔面產品。使用防曬保護。保持充足水分並維持溫和護膚程序。',
      // Simplified Chinese content
      name_zh_hans: '终极干细胞深层补水修复',
      short_description_zh_hans: '革命性干细胞技术深层补水和细胞再生。专为严重脱水、疲劳和黯淡肌肤而设计。',
      long_description_zh_hans: '在干燥的秋季，肌肤经常感到紧绷和脱水，导致细纹、暗沉、浮肿和敏感等问题。终极干细胞深层补水焕彩修复疗程专为严重脱水、疲劳和黯淡肌肤而特别设计。利用高浓度干细胞精华结合创新渗透技术，将活性成分深入肌肤底层，快速补充水分，强化肌肤屏障，减少细纹的出现。',
      benefits_zh_hans: '深层补水\n干细胞激活\n屏障强化\n光彩提升\n即时舒缓\n持久保湿\n细胞再生\n增强吸收\n细纹减少\n屏障强化',
      suitable_for_zh_hans: '适合所有经历脱水、疲劳或暗沉的肌肤类型，包括敏感肌肤。特别适合严重脱水肌肤、因干燥导致的细纹、受损肌肤屏障、黯淡肤色或季节性肌肤问题的人士。',
      contraindications_zh_hans: '活跃性皮肤感染、严重炎症状况、近期化学换肤或激光治疗、怀孕（请咨询医生）、对植物衍生成分过敏',
      preparation_zh_hans: '请以洁净无妆容肌肤到达。疗程前48小时避免使用维生素A和去角质产品。疗程前保持充足水分。',
      aftercare_zh_hans: '使用温和保湿产品。24小时内避免刺激性洁面产品。使用防晒保护。保持充足水分并维持温和护肤程序。'
    }
  ]; 
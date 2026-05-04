import { prisma } from "@/lib/prisma"

export type KnowledgeTier = "T0" | "T1" | "T2" | "T3"
export type KnowledgeStatus = "staging" | "active" | "archived"

function getEmbeddingApiKey() {
  return process.env.EMBEDDING_API_KEY || process.env.OPENROUTER_API_KEY || ""
}

function getEmbeddingModel() {
  // Default to a non-OpenAI embedding model for HK compatibility.
  return process.env.EMBEDDING_MODEL || "qwen/qwen3-embedding-4b"
}

function isNumberArray(v: unknown): v is number[] {
  return Array.isArray(v) && v.length > 0 && v.every((x) => typeof x === "number" && Number.isFinite(x))
}

function cosineSimilarity(a: number[], b: number[]) {
  const n = Math.min(a.length, b.length)
  let dot = 0
  let na = 0
  let nb = 0
  for (let i = 0; i < n; i++) {
    const av = a[i]!
    const bv = b[i]!
    dot += av * bv
    na += av * av
    nb += bv * bv
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb)
  return denom === 0 ? 0 : dot / denom
}

async function embedTexts(args: { inputs: string[]; inputType?: "search_query" | "search_document" }) {
  const apiKey = getEmbeddingApiKey()
  if (!apiKey) return null

  const res = await fetch("https://openrouter.ai/api/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME || "Aura",
    },
    body: JSON.stringify({
      model: getEmbeddingModel(),
      input: args.inputs,
      encoding_format: "float",
      input_type: args.inputType,
    }),
  })

  const data: any = await res.json().catch(() => ({}))
  if (!res.ok) return null

  const rows = data?.data
  if (!Array.isArray(rows) || rows.length === 0) return null
  const embeddings = rows.map((r: any) => r?.embedding).filter(isNumberArray)
  if (embeddings.length !== args.inputs.length) return null
  return embeddings
}

export async function backfillKnowledgeChunkEmbeddings(args: { limit?: number; batchSize?: number }) {
  const limit = Math.max(1, Math.min(args.limit ?? 120, 500))
  const batchSize = Math.max(1, Math.min(args.batchSize ?? 16, 64))

  const apiKey = getEmbeddingApiKey()
  if (!apiKey) {
    return { ok: false as const, error: "missing_embedding_key", embedded: 0, scanned: 0 }
  }

  let embedded = 0
  let scanned = 0
  let batches = 0

  while (embedded < limit) {
    const remaining = limit - embedded
    const take = Math.min(batchSize, remaining)

    const rows = await prisma.knowledgeChunk.findMany({
      where: { embedding: null },
      orderBy: [{ updatedAt: "desc" }],
      take,
      select: { id: true, text: true },
    })

    if (rows.length === 0) break
    scanned += rows.length
    batches += 1

    const embeddings = await embedTexts({ inputs: rows.map((r) => r.text), inputType: "search_document" })
    if (!embeddings) {
      return { ok: false as const, error: "embedding_failed", embedded, scanned, batches }
    }

    await prisma.$transaction(
      rows.map((r, idx) =>
        prisma.knowledgeChunk.update({
          where: { id: r.id },
          data: {
            embedding: embeddings[idx] ?? null,
            embeddingModel: getEmbeddingModel(),
            embeddingVersion: "openrouter:v1",
          },
        })
      )
    )

    embedded += rows.length
  }

  return { ok: true as const, embedded, scanned, batches, model: getEmbeddingModel() }
}

export type CreateKnowledgeDocumentInput = {
  tier: KnowledgeTier
  status?: KnowledgeStatus
  language: string
  sourceUrl?: string | null
  title?: string | null
  publishedAt?: string | null
  hash?: string | null
  trustScore?: number | null
  topics?: string[]
  content: string
  chunkCharLimit?: number
}

function normalizeTopics(topics: string[] | undefined) {
  const cleaned = (topics ?? [])
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 20)
  return Array.from(new Set(cleaned))
}

function chunkTextByParagraphs(args: { text: string; chunkCharLimit: number }) {
  const { text, chunkCharLimit } = args
  const normalized = text.replace(/\r\n/g, "\n").trim()
  if (!normalized) return []

  const paras = normalized
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  const chunks: string[] = []
  let current = ""

  for (const p of paras) {
    const next = current ? `${current}\n\n${p}` : p
    if (next.length <= chunkCharLimit) {
      current = next
      continue
    }

    if (current) chunks.push(current)
    if (p.length <= chunkCharLimit) {
      current = p
      continue
    }

    // Fallback: hard-split long paragraphs.
    for (let i = 0; i < p.length; i += chunkCharLimit) {
      chunks.push(p.slice(i, i + chunkCharLimit))
    }
    current = ""
  }

  if (current) chunks.push(current)
  return chunks
}

type SeedDoc = {
  tier: KnowledgeTier
  status: KnowledgeStatus
  language: string
  title: string
  sourceUrl?: string | null
  topics: string[]
  content: string
  chunkCharLimit?: number
}

export async function seedHongKongKnowledgePack(args?: { language?: string; mode?: "starter" | "market" }) {
  const language = args?.language ?? "zh-HK"
  const mode = args?.mode ?? "starter"

  const pack: SeedDoc[] = [
    // T0 — canonical templates (safe, non-medical)
    {
      tier: "T0",
      status: "active",
      language,
      title: "【T0】AI 禮賓安全聲明與轉介規則（全站通用）",
      topics: ["安全", "轉介", "免責聲明", "懷孕", "敏感", "皮膚病"],
      content: [
        "Aura 美容 AI 禮賓提示（必讀）",
        "- 本 AI 提供內容只作一般美容資訊及建議方向，不構成醫療診斷或治療。",
        "- 本 AI 不會提供處方藥、用藥劑量、停藥/換藥建議；亦不會保證任何療效或效果。",
        "",
        "必須人工轉介/建議先諮詢治療師或醫生（任何一項成立）",
        "- 懷孕、備孕、哺乳",
        "- 皮膚病/感染：濕疹、玫瑰痤瘡（酒糟）、皮膚真菌/細菌感染、嚴重暗瘡發炎、傷口未癒合",
        "- 嚴重敏感或曾出現嚴重過敏反應（紅腫、呼吸困難、蕁麻疹等）",
        "- 近期（14 天內）做過高刺激項目：換膚、激光/光子、微針、強效去角質、注射類或醫美療程",
        "- 正在服用或外用處方藥物/藥膏（例如維A酸、類固醇等）或有免疫相關疾病",
        "- 有出血傾向或正在服用抗凝血藥物",
        "- 不確定膚況原因（突然嚴重泛紅、刺痛、脫皮、化膿、結痂）",
        "",
        "回覆風格",
        "- 先問 2–3 條簡短問題釐清：部位、敏感程度、停工期/預算/期望、近期是否做過刺激項目。",
        "- 只提出 2–3 個可能方向及注意事項；最後提供「預約/聯絡」建議。",
      ].join("\n"),
    },
    {
      tier: "T0",
      status: "active",
      language,
      title: "【T0】護膚諮詢問診框架（2–3 問）＋回覆模板",
      topics: ["問診", "諮詢", "框架", "敏感", "停工期", "預算"],
      content: [
        "用途：讓 AI 用最少問題釐清需要，再提供 2–3 個方向（非醫療）。",
        "",
        "建議先問（最多 3 條）",
        "1) 你主要想改善乜（暗瘡/色斑/毛孔/緊緻/敏感）？位置係邊？",
        "2) 你嘅敏感程度（0–10）？最近有冇刺痛、脫皮、泛紅？",
        "3) 最近 14 日有冇做過換膚/激光/微針/強效去角質？",
        "",
        "回覆格式（建議）",
        "- 先用 1 句總結：你目前最可能係（例：外油內乾＋屏障受損）。",
        "- 再提供 2–3 個方向：溫和修護 → 針對性改善 → 預約/聯絡。",
        "- 加上 1–2 條風險提醒：如有 T0 轉介條件，必須轉介。",
      ].join("\n"),
    },
    {
      tier: "T0",
      status: "active",
      language,
      title: "【T0】術後/日常通用注意事項（溫和版）",
      topics: ["術後護理", "注意事項", "敏感", "防曬", "清潔"],
      content: [
        "通用原則（非醫療）",
        "- 48–72 小時避免高溫桑拿、激烈運動、熱水久沖；避免搓揉皮膚。",
        "- 先簡化護膚：溫和清潔＋補水＋鎖水；暫停高刺激活性（高濃度酸類/強效去角質/自行加強代謝）。",
        "- 日間防曬要做足（足量＋按需要補塗）。",
        "",
        "警示：如出現明顯紅腫刺痛加劇、化膿、結痂惡化、呼吸不適等 → 先停止刺激做法並盡快諮詢治療師/醫生。",
      ].join("\n"),
    },

    // T2 — curated third-party summaries (HK reputable)
    {
      tier: "T2",
      status: "active",
      language,
      title: "【T2】香港消委會：防曬選購與正確用量（整理）",
      sourceUrl: "https://www.consumer.org.hk/tc/article/528-sunscreen/528_sunscreen_knowledge",
      topics: ["防曬", "SPF", "UVA", "用量", "補塗", "消委會"],
      content: [
        "整理重點（來源：香港消費者委員會）",
        "- 防曬唔只係夏天：紫外線一年四季都存在，陰天亦有 UVA。",
        "- SPF50 基本已接近 98% 防護；唔一定要追求更高 SPF，過高濃度可能增加皮膚負擔。",
        "- 用量要足：按 ISO 標準要達標示效能，臉部大約需要約 1 茶匙分量。",
        "- 長時間戶外：一般每 2–3 小時需要補塗；流汗或水上活動要更勤補。",
        "- 標示「防水/遮瑕」產品：建議使用後好好卸除/清潔，避免殘留阻塞毛孔。",
        "",
        "AI 使用規則：只可作一般護膚資訊；涉及皮膚病、嚴重敏感、懷孕等仍以 T0 轉介為準。",
      ].join("\n"),
    },
    {
      tier: "T2",
      status: "active",
      language,
      title: "【T2】香港海關：不安全美白霜（水銀超標）風險提示（整理）",
      sourceUrl: "https://www.info.gov.hk/gia/general/202301/20/P2023012000407.htm",
      topics: ["網購風險", "水銀", "美白", "海關", "安全"],
      content: [
        "整理重點（來源：香港特區政府新聞公報／香港海關）",
        "- 市面曾出現水銀含量超標的美白潤膚霜，長期接觸可能損害神經系統及腎臟。",
        "- 購買及使用美容產品建議：光顧有信譽商戶；避免成分或來源不明產品。",
        "- 使用後如不適：應立即停止使用並盡快求醫；懷疑不安全產品可向海關舉報/查詢。",
        "",
        "AI 使用規則：用作「安全提醒」與風險教育，不作任何醫療判斷。",
      ].join("\n"),
    },
    {
      tier: "T2",
      status: "active",
      language,
      title: "【T2】衞生防護中心：疑含過量水銀美顏霜個案提示（整理）",
      sourceUrl: "https://www.info.gov.hk/gia/general/202504/30/P2025043000565.htm?fontSize=1",
      topics: ["水銀", "美顏霜", "安全", "衞生防護中心"],
      content: [
        "整理重點（來源：衞生署衞生防護中心）",
        "- 市民應避免使用懷疑含過量水銀成分的美顏霜；長期接觸水銀可損害神經系統及腎臟。",
        "- 若正在使用涉事或來源不明產品：應立即停止使用。",
        "- 如身體不適或有懷疑：應盡快徵詢醫護人員意見。",
        "",
        "AI 使用規則：用作「高風險產品警示」；任何症狀描述需轉介。",
      ].join("\n"),
    },

    // T3 — raw / trend / consumer-facing reminders (staging by default)
    {
      tier: "T3",
      status: "staging",
      language,
      title: "【T3】護膚趨勢素材：香港用戶常見防曬迷思（待匯總）",
      sourceUrl: "https://www.consumer.org.hk/tc/shopping-guide/trivia/2020-tips-sunscreen-2",
      topics: ["護膚趨勢", "防曬", "迷思", "補塗"],
      content: [
        "素材重點（待 rollup；不作硬準則）",
        "- SPF 不是越高越好；SPF50+ 以上多以「50+」標示避免誤導。",
        "- 日常戶外 2–3 小時後應補塗；用量不足會大幅影響實際防護。",
        "- 化學/物理防曬各有取捨；敏感/濕疹史人士需更留意刺激與過敏風險。",
        "",
        "AI 用法：只作趨勢提醒＋安全注意；涉及症狀/皮膚病→轉介。",
      ].join("\n"),
    },
    {
      tier: "T3",
      status: "staging",
      language,
      title: "【T3】護膚趨勢素材：網購/來歷不明美白產品風險（待匯總）",
      sourceUrl: "https://www.info.gov.hk/gia/general/201702/22/P2017022200327.htm",
      topics: ["護膚趨勢", "網購", "成分標示", "規管", "風險"],
      content: [
        "素材重點（待 rollup；不作硬準則）",
        "- 香港市面化妝品/護膚品的安全一般受《消費品安全條例》及其附屬規例等監管（視產品性質而定）。",
        "- 網購與來源不明產品風險較高：成分/標示不清、可能含不當成分或不符安全標準。",
        "",
        "AI 用法：教育用途；任何身體不適→停止使用＋建議求醫。",
      ].join("\n"),
    },
  ]

  // HK 市場包：更多可用於「香港美容」情境的 T2/T3（附來源）
  const marketPack: SeedDoc[] = [
    {
      tier: "T2",
      status: "active",
      language,
      title: "【T2】消委會：去角質棉片/酸類「唔好盲追高濃度」安全提示（整理）",
      sourceUrl: "https://www.consumer.org.hk/tc/press-release/p-565-peeling-pads",
      topics: ["去角質", "果酸", "水楊酸", "敏感", "屏障", "消委會"],
      content: [
        "整理重點（來源：香港消費者委員會）",
        "- 去角質/煥膚棉片用法差異大：頻率、停留時間等要跟說明；切勿自行延長「駐留時間」。",
        "- 盲目追求高濃度或過度頻密使用，可能損害皮膚屏障，導致泛紅、乾燥、脫皮，甚至色素沉澱/留疤。",
        "- 同時疊用多種含去角質成分護膚品會增加不良反應機會；配方越簡單越易追查致敏源。",
        "- 敏感/易過敏人士可留意相對溫和類別（例如 PHAs / LHAs），但仍要觀察皮膚反應。",
        "",
        "AI 使用規則：只作一般護膚安全提示；出現嚴重症狀或符合 T0 轉介條件 → 必須轉介。",
      ].join("\n"),
    },
    {
      tier: "T2",
      status: "active",
      language,
      title: "【T2】消委會：卸妝重點＋敏感人士避雷（MIT/CMIT 等）（整理）",
      sourceUrl: "https://www.consumer.org.hk/tc/shopping-guide/trivia/2021-trivia-makeup-remove",
      topics: ["卸妝", "敏感", "MIT", "CMIT", "玫瑰痤瘡", "濕疹", "消委會"],
      content: [
        "整理重點（來源：香港消費者委員會）",
        "- 防水眼妝（眼線/睫毛膏）可能需要眼部專用卸妝產品，避免用力摩擦造成刺激。",
        "- 敏感/濕疹/玫瑰痤瘡人士要特別留意致敏防腐劑（例如 MIT/CMIT）等成分。",
        "- 免沖洗卸妝產品停留皮膚時間較長，如含致敏物質會增加過敏風險；建議仍以溫和清潔為主。",
        "- 過度清潔可令皮膚含水量下降、角質層受損，引發紅腫痕癢脫皮；需要減少清潔強度並以保濕修護為主。",
        "",
        "AI 使用規則：只作一般護膚資訊；如紅腫刺痛加劇或疑似皮膚炎 → 轉介。",
      ].join("\n"),
    },
    {
      tier: "T2",
      status: "active",
      language,
      title: "【T2】消委會：保濕迷思（面膜唔適宜日日敷、敷太耐反效果）（整理）",
      sourceUrl: "https://www.consumer.org.hk/tc/shopping-guide/trivia/2021-trivia-skin-care",
      topics: ["保濕", "面膜", "敏感", "冷氣肌", "消委會"],
      content: [
        "整理重點（來源：香港消費者委員會）",
        "- 面膜並非越頻密越好：油性肌天天敷可能增加暗瘡/油脂粒；濕疹/敏感肌長期敷可能增加過敏次數。",
        "- 敷面時間不應超過產品建議：過長可能令皮膚水分反被面膜吸走，造成反效果。",
        "- 選擇產品不宜只看「dermatologist-tested」「hypoallergenic」等字眼，仍可能含致敏成分；要看成分與皮膚反應。",
        "- 保濕核心：補水＋鎖水＋減少水分流失；洗面後趁皮膚仍微濕盡快塗抹。",
      ].join("\n"),
    },
    {
      tier: "T2",
      status: "active",
      language,
      title: "【T2】消委會：潔面迷思（弱酸性≠一定更親膚；痘痘肌用水楊酸要留意濃度）（整理）",
      sourceUrl: "https://www.consumer.org.hk/tc/shopping-guide/trivia/2022-trivia-facial-cleanser",
      topics: ["潔面", "弱酸性", "水楊酸", "暗瘡", "敏感", "消委會"],
      content: [
        "整理重點（來源：香港消費者委員會）",
        "- 弱酸性宣稱未必等於更有效/更親膚；最重要係避免過度清潔造成乾燥繃緊。",
        "- 痘痘肌使用含水楊酸產品理論上可行，但要留意濃度與刺激風險；長期大量吸收有機會引致不適。",
        "- 敏感/濕疹人士要特別留意高致敏防腐劑（例如 MIT/CMIT）及香料等。",
        "",
        "AI 使用規則：只作一般護膚資訊；如紅腫痕癢加劇 → 轉介。",
      ].join("\n"),
    },
    {
      tier: "T2",
      status: "active",
      language,
      title: "【T2】香港海關：不安全染髮劑微生物超標與安全使用提示（整理）",
      sourceUrl: "https://www.info.gov.hk/gia/general/202111/30/P2021113000311.htm",
      topics: ["染髮", "頭皮", "過敏", "海關", "安全"],
      content: [
        "整理重點（來源：香港特區政府新聞公報／香港海關）",
        "- 海關曾檢獲多款懷疑不安全染髮劑，微生物含量超標；長時間接觸皮膚或用於受損頭皮，或致過敏與發炎風險。",
        "- 安全提示：避免產品濺入眼睛；勿用於受損頭皮；詳閱安全使用說明；不適應立刻沖洗並求醫。",
        "",
        "AI 使用規則：用作安全提醒，不作醫療判斷。",
      ].join("\n"),
    },

    // T3 trend素材（待 rollup；避免作硬準則）
    {
      tier: "T3",
      status: "staging",
      language,
      title: "【T3】護膚趨勢素材：去角質/酸類常見踩雷清單（待匯總）",
      sourceUrl: "https://www.consumer.org.hk/tc/article/590-exfoliating-face-washes",
      topics: ["護膚趨勢", "去角質", "酸類", "敏感", "屏障"],
      content: [
        "素材重點（待 rollup；不作硬準則）",
        "- 過度去角質可能破壞皮膚天然屏障，引發乾燥、泛紅、敏感、刺痛。",
        "- 同期使用多款去角質潔面/棉片/精華，容易疊加刺激。",
        "- 初次嘗試宜低頻率＋局部試用；出現灼熱刺痛加劇應停用並諮詢專業人士。",
      ].join("\n"),
    },
    {
      tier: "T3",
      status: "staging",
      language,
      title: "【T3】護膚趨勢素材：香港用戶常見防曬迷思（擴展版，待匯總）",
      sourceUrl: "https://www.consumer.org.hk/tc/article/490-4423",
      topics: ["護膚趨勢", "防曬", "迷思", "UVA", "UVB"],
      content: [
        "素材重點（待 rollup；不作硬準則）",
        "- 防曬不只睇 SPF（UVB），亦要留意 UVA 標示（PA/UVAPF/Broad spectrum）。",
        "- 用量不足/唔補塗會大幅降低實際保護；長時間戶外要補塗。",
        "- 厚塗唔等於更有效，反而可能增加毛孔負擔。",
      ].join("\n"),
    },
    {
      tier: "T3",
      status: "staging",
      language,
      title: "【T3】週更模板：香港美容市場熱話關鍵字（護膚/療程）（模板）",
      topics: ["護膚趨勢", "市場", "熱話", "關鍵字", "模板"],
      content: [
        "（模板；每週由店舖/編輯更新）",
        "- 本週熱話：屏障修護、少而精、暗粒、毛孔、淡斑、敏感、補塗防曬、去角質棉片、卸妝、冷氣肌",
        "- 用家痛點：一用活性就泛紅／想見效但怕刺激／怕反黑",
        "- 常見誤區：同一晚疊酸＋磨砂＋強清潔／敷面時間過長／只搽薄薄防曬",
        "",
        "AI 用法：只用作趨勢提醒＋安全注意；硬規則以 T0/T2 為準。",
      ].join("\n"),
    },
  ]

  const created: Array<{ id: string; title: string; tier: KnowledgeTier; status: KnowledgeStatus }> = []
  const skipped: Array<{ title: string; reason: string }> = []

  const selected = mode === "market" ? [...pack, ...marketPack] : pack

  for (const doc of selected) {
    const exists = await prisma.knowledgeDocument.findFirst({
      where: {
        tier: doc.tier,
        language: doc.language,
        title: doc.title,
      },
      select: { id: true },
    })
    if (exists) {
      skipped.push({ title: doc.title, reason: "exists" })
      continue
    }

    const result = await createKnowledgeDocument({
      tier: doc.tier,
      status: doc.status,
      language: doc.language,
      sourceUrl: doc.sourceUrl ?? null,
      title: doc.title,
      topics: doc.topics,
      content: doc.content,
      chunkCharLimit: doc.chunkCharLimit ?? 1400,
    })
    created.push({ id: result.document.id, title: doc.title, tier: doc.tier, status: doc.status })
  }

  return { created, skipped }
}

export async function getKnowledgeDocumentById(id: string) {
  const row = await prisma.knowledgeDocument.findUnique({
    where: { id },
    include: {
      chunks: {
        orderBy: [{ chunkIndex: "asc" }],
        select: { id: true, chunkIndex: true, text: true },
      },
    },
  })
  if (!row) return null
  return {
    ...row,
    content: row.chunks.map((c) => c.text).join("\n\n"),
    chunkCount: row.chunks.length,
  }
}

export async function deleteKnowledgeDocument(args: { id: string }) {
  // Chunks cascade-delete via Prisma relation.
  await prisma.knowledgeDocument.delete({ where: { id: args.id } })
}

export async function updateKnowledgeDocument(args: {
  id: string
  tier?: KnowledgeTier
  status?: KnowledgeStatus
  language?: string
  sourceUrl?: string | null
  title?: string | null
  publishedAt?: string | null
  topics?: string[]
  content?: string
  chunkCharLimit?: number
}) {
  const existing = await prisma.knowledgeDocument.findUnique({ where: { id: args.id } })
  if (!existing) throw new Error("Document not found.")

  const topics = args.topics ? normalizeTopics(args.topics) : undefined
  const publishedAt = args.publishedAt !== undefined ? (args.publishedAt ? new Date(args.publishedAt) : null) : undefined

  const shouldRechunk = typeof args.content === "string"
  const chunkCharLimit = Math.max(400, Math.min(args.chunkCharLimit ?? 1400, 4000))
  const chunks = shouldRechunk ? chunkTextByParagraphs({ text: args.content!, chunkCharLimit }) : []
  if (shouldRechunk && chunks.length === 0) throw new Error("Content is empty.")

  const embeddings = shouldRechunk ? await embedTexts({ inputs: chunks, inputType: "search_document" }) : null

  return await prisma.$transaction(async (tx) => {
    const doc = await tx.knowledgeDocument.update({
      where: { id: args.id },
      data: {
        tier: args.tier,
        status: args.status,
        language: args.language,
        sourceUrl: args.sourceUrl,
        title: args.title,
        publishedAt,
        ...(topics ? { topics } : {}),
      },
    })

    let chunkCount: number | undefined = undefined
    if (shouldRechunk) {
      await tx.knowledgeChunk.deleteMany({ where: { documentId: doc.id } })
      await tx.knowledgeChunk.createMany({
        data: chunks.map((text, idx) => ({
          documentId: doc.id,
          chunkIndex: idx,
          text,
          tokenCount: null,
          embedding: embeddings?.[idx] ?? null,
          embeddingModel: embeddings ? getEmbeddingModel() : null,
          embeddingVersion: embeddings ? "openrouter:v1" : null,
        })),
      })
      chunkCount = chunks.length
    } else {
      chunkCount = await tx.knowledgeChunk.count({ where: { documentId: doc.id } })
    }

    return { document: doc, chunkCount }
  })
}

export async function createKnowledgeDocument(input: CreateKnowledgeDocumentInput) {
  const chunkCharLimit = Math.max(400, Math.min(input.chunkCharLimit ?? 1400, 4000))
  const chunks = chunkTextByParagraphs({ text: input.content, chunkCharLimit })
  if (chunks.length === 0) throw new Error("Content is empty.")

  const topics = normalizeTopics(input.topics)

  return await prisma.$transaction(async (tx) => {
    const doc = await tx.knowledgeDocument.create({
      data: {
        tier: input.tier,
        status: input.status ?? "staging",
        language: input.language,
        sourceUrl: input.sourceUrl ?? null,
        title: input.title ?? null,
        publishedAt: input.publishedAt ? new Date(input.publishedAt) : null,
        hash: input.hash ?? null,
        trustScore: input.trustScore ?? null,
        topics,
      },
    })

    const embeddings = await embedTexts({ inputs: chunks, inputType: "search_document" })

    await tx.knowledgeChunk.createMany({
      data: chunks.map((text, idx) => ({
        documentId: doc.id,
        chunkIndex: idx,
        text,
        tokenCount: null,
        embedding: embeddings?.[idx] ?? null,
        embeddingModel: embeddings ? getEmbeddingModel() : null,
        embeddingVersion: embeddings ? "openrouter:v1" : null,
      })),
    })

    return { document: doc, chunkCount: chunks.length }
  })
}

export async function listKnowledgeDocuments(args: {
  status?: KnowledgeStatus
  tier?: KnowledgeTier
  language?: string
  limit?: number
}) {
  const limit = Math.max(1, Math.min(args.limit ?? 50, 200))
  return await prisma.knowledgeDocument.findMany({
    where: {
      status: args.status,
      tier: args.tier,
      language: args.language,
    },
    orderBy: [{ updatedAt: "desc" }],
    take: limit,
    select: {
      id: true,
      tier: true,
      status: true,
      language: true,
      sourceUrl: true,
      title: true,
      publishedAt: true,
      fetchedAt: true,
      hash: true,
      trustScore: true,
      topics: true,
      approvedAt: true,
      approvedByUserId: true,
      createdAt: true,
      updatedAt: true,
      chunks: {
        select: { id: true },
      },
    },
  })
}

function extractQueryTerms(query: string) {
  const normalized = query
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
  if (!normalized) return []

  // Chinese: no spaces; still works by using 2-3 character windows from the original query.
  const hasSpaces = normalized.includes(" ")
  const terms = hasSpaces
    ? normalized.split(" ")
    : Array.from(new Set([normalized.slice(0, 2), normalized.slice(0, 3), normalized.slice(1, 3)].filter(Boolean)))

  return terms.filter((t) => t.length >= 2).slice(0, 8)
}

export async function retrieveKnowledgeChunks(args: {
  query: string
  locale: string
  tier?: KnowledgeTier
  status?: KnowledgeStatus
  limit?: number
}) {
  const limit = Math.max(1, Math.min(args.limit ?? 8, 16))
  const tier = args.tier ?? "T0"
  const status = args.status ?? "active"

  const locale = args.locale
  const languages =
    locale === "zh-HK"
      ? ["zh-HK", "zh-Hant"]
      : locale === "zh-Hans"
        ? ["zh-Hans", "zh-Hant"]
        : locale === "en"
          ? ["en"]
          : [locale, "zh-HK", "zh-Hant"]

  const terms = extractQueryTerms(args.query)
  if (terms.length === 0) return []

  const whereOr = terms.map((t) => ({ text: { contains: t, mode: "insensitive" as const } }))

  // KB-2 (upgraded): keyword candidate set, then rerank with embeddings when available.
  const candidateRows = await prisma.knowledgeChunk.findMany({
    where: {
      OR: whereOr,
      document: {
        tier,
        status,
        language: { in: languages },
      },
    },
    take: 60,
    orderBy: [{ updatedAt: "desc" }],
    include: {
      document: {
        select: {
          id: true,
          tier: true,
          status: true,
          language: true,
          title: true,
          sourceUrl: true,
          topics: true,
          updatedAt: true,
        },
      },
    },
  })

  const queryEmbedding = (await embedTexts({ inputs: [args.query], inputType: "search_query" }))?.[0] ?? null

  if (!queryEmbedding) {
    return candidateRows.slice(0, limit)
  }

  const scored = candidateRows.map((row) => {
    const emb = row.embedding
    const vec = isNumberArray(emb) ? emb : null
    const sim = vec ? cosineSimilarity(queryEmbedding, vec) : 0
    return { row, sim }
  })

  scored.sort((a, b) => b.sim - a.sim)
  return scored.slice(0, limit).map((s) => s.row)
}

export async function listKnowledgeRollups(args: {
  topic?: string
  language?: string
  limit?: number
}) {
  const limit = Math.max(1, Math.min(args.limit ?? 20, 100))
  return await prisma.knowledgeRollup.findMany({
    where: {
      topic: args.topic,
      language: args.language,
    },
    orderBy: [{ periodEnd: "desc" }],
    take: limit,
  })
}

/** Public trend pages: fetch a single rollup by id (no auth). */
export async function getKnowledgeRollupById(id: string) {
  return await prisma.knowledgeRollup.findUnique({ where: { id } })
}

export async function createKnowledgeRollup(args: {
  topic: string
  language: string
  periodStart: Date
  periodEnd: Date
  summaryText: string
}) {
  return await prisma.knowledgeRollup.create({
    data: {
      topic: args.topic,
      language: args.language,
      periodStart: args.periodStart,
      periodEnd: args.periodEnd,
      summaryText: args.summaryText,
    },
  })
}

export async function archiveOldStagingT3Documents(args?: { olderThanDays?: number }) {
  const fallbackDays = Number(process.env.KB_T3_STAGING_ARCHIVE_DAYS ?? 60)
  const olderThanDays = Math.max(
    1,
    Math.min(args?.olderThanDays ?? (Number.isFinite(fallbackDays) ? fallbackDays : 60), 3650)
  )
  const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000)

  const res = await prisma.knowledgeDocument.updateMany({
    where: {
      tier: "T3",
      status: "staging",
      createdAt: { lt: cutoff },
    },
    data: { status: "archived" },
  })

  return { archived: res.count, cutoffIso: cutoff.toISOString(), olderThanDays }
}

export async function getRollupContext(args: {
  query: string
  locale: string
  topic?: string
  limit?: number
}) {
  const limit = Math.max(1, Math.min(args.limit ?? 3, 5))
  const locale = args.locale
  const languages =
    locale === "zh-HK"
      ? ["zh-HK", "zh-Hant"]
      : locale === "zh-Hans"
        ? ["zh-Hans", "zh-Hant"]
        : locale === "en"
          ? ["en"]
          : [locale, "zh-HK", "zh-Hant"]

  const rollups = await prisma.knowledgeRollup.findMany({
    where: {
      language: { in: languages },
      ...(args.topic ? { topic: args.topic } : {}),
    },
    orderBy: [{ periodEnd: "desc" }],
    take: limit,
  })

  return rollups
}


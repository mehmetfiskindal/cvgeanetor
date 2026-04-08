export type LocaleCode = 'tr' | 'en'

export interface LocalizedValueLike {
  tr: string
  en: string
}

export interface ContactLike {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  linkedin: string
  website: string
  photoDataUrl: string
}

export interface PersonalDetailsLike {
  nationality: string
  gender: string
  birthPlace: string
  birthDate: string
  militaryStatus: string
  maritalStatus: string
  showOptionalDetails: boolean
}

export interface EducationLike {
  id: string
  school: string
  faculty: string
  department: string
  degree: string
  startDate: string
  endDate: string
  gpa: string
  notes: LocalizedValueLike
}

export interface TrainingLike {
  id: string
  title: string
  provider: string
  date: string
  duration: string
}

export interface CongressLike {
  id: string
  title: string
  location: string
  date: string
}

export interface ExperienceLike {
  id: string
  company: string
  title: string
  startDate: string
  endDate: string
  current: boolean
  location: string
  bullets: LocalizedValueLike
}

export interface ProjectLike {
  id: string
  name: string
  role: string
  startDate: string
  endDate: string
  current: boolean
  url: string
  keywords: string
  bullets: LocalizedValueLike
}

export interface LanguageLike {
  id: string
  name: string
  level: string
  score: string
  details: LocalizedValueLike
}

export interface SkillLike {
  id: string
  name: string
  details: LocalizedValueLike
}

export interface ActivityItemLike {
  id: string
  category: string
  description: string
}

export interface ReferenceLike {
  id: string
  fullName: string
  title: string
  organization: string
  phone: string
  email: string
}

export interface AtsSettingsLike {
  targetJobTitle: string
  jobDescription: string
  outputLanguage: LocaleCode
  templateId?: string
}

export interface CVDataLike {
  contact: ContactLike
  personalDetails: PersonalDetailsLike
  careerObjective: LocalizedValueLike
  education: EducationLike[]
  trainings: TrainingLike[]
  coursesOrCongresses: CongressLike[]
  experience: ExperienceLike[]
  internships: ExperienceLike[]
  projects: ProjectLike[]
  languages: LanguageLike[]
  computerSkills: SkillLike[]
  otherSkills: SkillLike[]
  activities: ActivityItemLike[]
  references: ReferenceLike[]
  referencesAvailableOnRequest: boolean
  ats: AtsSettingsLike
}

export type AuditCheckStatus = 'pass' | 'warn' | 'fail'
export type KeywordSource = 'summary' | 'experience' | 'projects' | 'skills'

export interface ScoreBreakdownItem {
  code: string
  label: string
  delta: number
  status: AuditCheckStatus
  evidence: string
}

export interface AuditCheck {
  code: string
  label: string
  status: AuditCheckStatus
  summary: string
  details: string[]
  delta: number
}

export interface AtsFinding {
  code: string
  message: string
  severity: 'info' | 'warning' | 'critical'
}

export interface KeywordMatch {
  keyword: string
  sources: KeywordSource[]
  evidence: string[]
}

export interface KeywordAnalysis {
  detectedKeywords: string[]
  matches: KeywordMatch[]
  missing: string[]
  suggestedSkills: string[]
}

export interface TemplateProfile {
  id: string
  name: string
  badge: string
  description: string
  guardrails: string[]
  safeFonts: string[]
  singleColumn: boolean
  exportTextBased: boolean
}

export interface TemplateAudit {
  profile: TemplateProfile
  status: AuditCheckStatus
  notes: string[]
}

export interface CorrectionWarning {
  id: string
  field: string
  title: string
  severity: 'warning' | 'critical'
  reason: string
  fix: string
  relatedCheckCode: string
}

export interface SuggestionAction {
  id: string
  label: string
  description: string
  target: 'summary' | 'experience' | 'project' | 'skills' | 'job-match'
}

export interface SuggestionSkillGroup {
  bucket: 'computer' | 'other'
  name: string
  details: string
}

export type SuggestionDraftPayload =
  | {
      kind: 'text'
      text: string
    }
  | {
      kind: 'skill-groups'
      groups: SuggestionSkillGroup[]
    }

export interface SuggestionDraft {
  id: string
  actionId: string
  title: string
  description: string
  note: string
  target: {
    type: 'careerObjective' | 'experience' | 'internships' | 'projects' | 'skills'
    id?: string
    locale: LocaleCode
  }
  payload: SuggestionDraftPayload
}

export interface AtsAuditResult {
  score: number
  matchedKeywords: string[]
  missingKeywords: string[]
  findings: AtsFinding[]
  keywordSuggestions: string[]
  localeFallbackCount: number
  measurableLineCount: number
  bulletCoverage: number
  scoreBreakdown: ScoreBreakdownItem[]
  checks: AuditCheck[]
  correctionWarnings: CorrectionWarning[]
  keywordAnalysis: KeywordAnalysis
  templateAudit: TemplateAudit
  helperDrafts: SuggestionDraft[]
}

export interface PrintSectionItem {
  id: string
  heading: string
  subheading?: string
  meta?: string
  text?: string
  bullets?: string[]
}

export interface PrintSection {
  id: 'summary' | 'skills' | 'experience' | 'projects' | 'education'
  title: string
  items: PrintSectionItem[]
}

const MONTHS = {
  tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
} as const

const KEYWORD_PREFIXES = [
  'experience with ',
  'experience in ',
  'hands-on with ',
  'knowledge of ',
  'knowledge in ',
  'proficiency in ',
  'proficient in ',
  'familiarity with ',
  'strong understanding of ',
  'required: ',
  'preferred: ',
  'must have ',
  'nice to have ',
  'required ',
  'preferred ',
  'tecrübe ',
  'tecrübesi ',
  'deneyim ',
  'deneyimi ',
  'bilgisi ',
  'uzmanlik ',
] as const

const KEYWORD_STOPWORDS = new Set([
  'a',
  'an',
  'and',
  'or',
  'the',
  'with',
  'for',
  'from',
  'to',
  'of',
  'on',
  'in',
  'using',
  'plus',
  'required',
  'preferred',
  'ability',
  'strong',
  'good',
  'excellent',
  'team',
  'work',
  'experience',
  'knowledge',
  'skills',
  'skill',
  'must',
  'have',
  'nice',
  'understanding',
  've',
  'veya',
  'ile',
  'için',
  'gibi',
  'iyi',
  'güçlü',
  'deneyim',
  'tecrübe',
  'bilgi',
  'beceri',
  'zorunlu',
  'tercihen',
])

const TECH_SIGNALS = ['api', 'sdk', 'ci/cd', 'node', 'react', 'flutter', 'firebase', 'docker', 'kubernetes', 'postgresql', 'graphql', 'typescript', 'javascript']

const EN_ACTION_VERBS = [
  'built',
  'created',
  'developed',
  'designed',
  'delivered',
  'drove',
  'improved',
  'implemented',
  'integrated',
  'launched',
  'led',
  'managed',
  'optimized',
  'owned',
  'published',
  'reduced',
  'scaled',
  'streamlined',
  'shipped',
]

const TR_ACTION_VERBS = [
  'geliştirdim',
  'geliştirdi',
  'tasarladım',
  'tasarladi',
  'yayınladım',
  'yayinladim',
  'entegrasyon',
  'entegrasyonunu',
  'iyileştirdim',
  'iyilestirdim',
  'optimize',
  'yönettim',
  'yonettim',
  'kurdum',
  'sağladım',
  'sagladim',
  'ölçekledim',
  'olcekledim',
  'teslim',
  'uyguladım',
  'uyguladim',
]

const TURKISH_STOPWORDS = [' ve ', ' ile ', ' için ', ' olarak ', 'bir ', ' bu ', ' ilgili ']

const ATS_SAFE_TEMPLATE: TemplateProfile = {
  id: 'ats-safe',
  name: 'ATS Safe Template',
  badge: 'ATS Safe',
  description: 'Tek sütun, sade başlık yapısı ve gerçek metin export ile ATS dostu şablon.',
  guardrails: [
    'Tek sütun önerilir',
    'Fotoğraf ATS için önerilmez',
    'İkon kullanımını azalt',
    'Kritik bilgileri header/footer içine koyma',
    'Progress bar, yıldız ve grafik kullanma',
    'Güvenli fontlar: Arial, Calibri, Helvetica, Georgia',
    'PDF export gerçek metin olarak üretilir',
  ],
  safeFonts: ['Arial', 'Calibri', 'Helvetica', 'Georgia'],
  singleColumn: true,
  exportTextBased: true,
}

const splitText = (value: string) =>
  value
    .split('\n')
    .map((line) => line.replace(/^[-*\u2022\s]+/, '').trim())
    .filter(Boolean)

const unique = (items: string[]) => {
  const seen = new Set<string>()
  return items.filter((item) => {
    const key = item.toLocaleLowerCase('en')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const cleanPhrase = (value: string) =>
  value
    .replace(/[()]/g, ' ')
    .replace(/[^\p{L}\p{N}+#./ -]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export const normalizeKeyword = (value: string) =>
  cleanPhrase(value)
    .toLocaleLowerCase('en')
    .replace(/\s+/g, ' ')
    .trim()

const looksTechnical = (phrase: string) => {
  const lower = normalizeKeyword(phrase)
  if (!lower) return false
  if (/[+#/.-]/.test(phrase)) return true
  if (/\d/.test(phrase)) return true
  if (TECH_SIGNALS.some((signal) => lower.includes(signal))) return true
  return phrase
    .split(' ')
    .some((token) => token.length > 1 && token[0] === token[0]?.toUpperCase() && token.slice(1) !== token.slice(1).toLowerCase())
}

const stripKeywordPrefix = (value: string) => {
  const lower = value.toLocaleLowerCase('en')
  const match = KEYWORD_PREFIXES.find((prefix) => lower.startsWith(prefix))
  return match ? value.slice(match.length).trim() : value.trim()
}

const isMeaningfulPhrase = (phrase: string) => {
  const normalized = normalizeKeyword(phrase)
  if (!normalized) return false
  const words = normalized.split(' ')
  if (words.length > 4) return false
  if (words.every((word) => KEYWORD_STOPWORDS.has(word))) return false
  return looksTechnical(phrase) || words.some((word) => !KEYWORD_STOPWORDS.has(word) && word.length > 2)
}

const KEYWORD_ALIASES: Record<string, string[]> = {
  'rest api': ['rest api', 'restful api', 'api integration', 'api integrations'],
  'ci/cd': ['ci/cd', 'ci cd', 'continuous integration', 'continuous delivery'],
  firebase: ['firebase', 'firestore', 'firebase authentication', 'cloud functions'],
  'app store': ['app store', 'ios release', 'store submission'],
  'google play': ['google play', 'play store', 'play console'],
  'play console': ['play console', 'google play console'],
}

const monthScore = (value: string, current = false) => {
  if (current) return Number.MAX_SAFE_INTEGER
  if (!value) return 0
  const [year, month] = value.split('-').map(Number)
  return year * 100 + month
}

const getAliasVariants = (keyword: string) => {
  const normalized = normalizeKeyword(keyword)
  const aliases = KEYWORD_ALIASES[normalized] || []
  return unique([keyword, ...aliases])
}

const getLocalizedEntries = (data: CVDataLike) => [
  data.careerObjective,
  ...data.education.map((item) => item.notes),
  ...data.experience.map((item) => item.bullets),
  ...data.internships.map((item) => item.bullets),
  ...data.projects.map((item) => item.bullets),
  ...data.languages.map((item) => item.details),
  ...data.computerSkills.map((item) => item.details),
  ...data.otherSkills.map((item) => item.details),
].filter((value) => value.tr.trim() || value.en.trim())

const countMetrics = (lines: string[]) => lines.filter((line) => /\b\d[\d.,+%x]*\b/.test(line)).length

const getSentenceCount = (value: string) =>
  value
    .split(/[.!?]+/g)
    .map((item) => item.trim())
    .filter(Boolean).length

const startsWithActionVerb = (line: string) => {
  const lower = normalizeKeyword(line)
  const firstWord = lower.split(' ')[0]
  return [...EN_ACTION_VERBS, ...TR_ACTION_VERBS].some((verb) => lower.startsWith(verb) || firstWord === normalizeKeyword(verb))
}

const getFreeTextDatePattern = (value: string) => {
  if (/^\d{4}-\d{2}$/.test(value)) return 'month'
  if (/^\d{4}$/.test(value)) return 'year'
  if (/^\d{2}\/\d{4}$/.test(value) || /^\d{2}\.\d{4}$/.test(value)) return 'month-year'
  if (/^[A-Za-zÇĞİÖŞÜçğıöşü]+\s+\d{4}$/.test(value)) return 'word-month-year'
  return 'free-text'
}

const extractSkillTokens = (data: CVDataLike, locale: LocaleCode) => {
  const buckets = [
    ...data.computerSkills.flatMap((item) => [item.name, getLocalizedValue(item.details, locale)]),
    ...data.otherSkills.flatMap((item) => [item.name, getLocalizedValue(item.details, locale)]),
    ...data.projects.map((item) => item.keywords),
  ]

  return buckets
    .flatMap((value) => cleanPhrase(value || '').split(/[,\n/]+/g))
    .map((item) => item.trim())
    .filter(Boolean)
}

const createSourceCorpus = (data: CVDataLike, locale: LocaleCode) => {
  const corpus = {
    summary: normalizeKeyword([data.ats.targetJobTitle, getLocalizedValue(data.careerObjective, locale)].filter(Boolean).join(' ')),
    experience: normalizeKeyword(
      [...data.experience, ...data.internships]
        .flatMap((item) => [item.company, item.title, item.location, getLocalizedValue(item.bullets, locale)])
        .filter(Boolean)
        .join(' '),
    ),
    projects: normalizeKeyword(
      data.projects
        .flatMap((item) => [item.name, item.role, item.url, item.keywords, getLocalizedValue(item.bullets, locale)])
        .filter(Boolean)
        .join(' '),
    ),
    skills: normalizeKeyword(
      [
        ...data.languages.flatMap((item) => [item.name, item.level, item.score, getLocalizedValue(item.details, locale)]),
        ...data.computerSkills.flatMap((item) => [item.name, getLocalizedValue(item.details, locale)]),
        ...data.otherSkills.flatMap((item) => [item.name, getLocalizedValue(item.details, locale)]),
      ]
        .filter(Boolean)
        .join(' '),
    ),
  }

  return corpus
}

const createKeywordAnalysis = (data: CVDataLike, locale: LocaleCode): KeywordAnalysis => {
  const detectedKeywords = extractKeywordCandidates(data.ats.jobDescription)
  const sourceCorpus = createSourceCorpus(data, locale)

  const matches: KeywordMatch[] = detectedKeywords
    .map((keyword) => {
      const aliases = getAliasVariants(keyword).map((item) => normalizeKeyword(item))
      const sources = (Object.keys(sourceCorpus) as KeywordSource[]).filter((source) => aliases.some((alias) => sourceCorpus[source].includes(alias)))
      return {
        keyword,
        sources,
        evidence: sources.map((source) => {
          if (source === 'summary') return 'Profesyonel özet'
          if (source === 'experience') return 'Deneyim'
          if (source === 'projects') return 'Projeler'
          return 'Beceriler'
        }),
      }
    })
    .filter((item) => item.sources.length > 0)

  const matchedKeywords = matches.map((item) => item.keyword)
  const missing = detectedKeywords.filter((keyword) => !matchedKeywords.includes(keyword))
  const existingSkillTokens = extractSkillTokens(data, locale).map((item) => normalizeKeyword(item))
  const suggestedSkills = missing.filter((keyword) => {
    const normalized = normalizeKeyword(keyword)
    return !existingSkillTokens.includes(normalized) && (looksTechnical(keyword) || normalized.includes('api'))
  })

  return {
    detectedKeywords,
    matches,
    missing,
    suggestedSkills,
  }
}

const pushCheck = (
  scoreBreakdown: ScoreBreakdownItem[],
  checks: AuditCheck[],
  code: string,
  label: string,
  delta: number,
  status: AuditCheckStatus,
  evidence: string,
  details: string[],
) => {
  scoreBreakdown.push({ code, label, delta, status, evidence })
  checks.push({ code, label, status, summary: evidence, details, delta })
}

const toFindings = (checks: AuditCheck[]): AtsFinding[] =>
  checks
    .filter((check) => check.status !== 'pass')
    .map((check) => ({
      code: check.code,
      message: [check.summary, ...check.details].filter(Boolean).join(' '),
      severity: check.status === 'fail' ? 'critical' : 'warning',
    }))

const buildCorrectionWarnings = (checks: AuditCheck[], keywordAnalysis: KeywordAnalysis): CorrectionWarning[] => {
  const warnings: CorrectionWarning[] = []
  const pushWarning = (
    id: string,
    field: string,
    title: string,
    severity: 'warning' | 'critical',
    reason: string,
    fix: string,
    relatedCheckCode: string,
  ) => {
    warnings.push({ id, field, title, severity, reason, fix, relatedCheckCode })
  }

  checks.forEach((check) => {
    if (check.status === 'pass') return

    if (check.code === 'contact-complete') {
      pushWarning(
        'warning-contact',
        'Kişisel bilgiler',
        'İletişim alanı puan kaybettiriyor',
        check.status === 'fail' ? 'critical' : 'warning',
        'Ad, e-posta veya telefon eksik olduğunda ATS temel iletişim bilgisini doğrulayamaz.',
        'Ad soyad, e-posta ve telefon alanlarını eksiksiz doldur. Kritik iletişim bilgisini tek satırda görünür tut.',
        check.code,
      )
    }

    if (check.code === 'summary-present') {
      pushWarning(
        'warning-summary',
        'Profesyonel özet',
        'Özet alanı boş ya da zayıf',
        check.status === 'fail' ? 'critical' : 'warning',
        'Seçili output dilinde özet yoksa CV ilk taramada bağlam kaybeder.',
        '2-4 cümlelik kısa bir özet ekle; hedef rolü, ana stack’i ve mümkünse 1 somut etkiyi yaz.',
        check.code,
      )
    }

    if (check.code === 'bullet-structure') {
      pushWarning(
        'warning-bullets',
        'Deneyim / projeler',
        'Tek paragraf veya yetersiz madde yapısı',
        check.status === 'fail' ? 'critical' : 'warning',
        'Deneyim ya da proje girdileri iki satırdan az olduğunda ATS okunabilirliği düşer.',
        'Her deneyim ve projeyi en az 2 bullet satırına böl. Her satır tek bir katkıyı anlatsın.',
        check.code,
      )
    }

    if (check.code === 'action-verbs') {
      pushWarning(
        'warning-action-verbs',
        'Deneyim dili',
        'Maddeler güçlü fiillerle başlamıyor',
        check.status === 'fail' ? 'critical' : 'warning',
        'Görev cümleleri zayıf başladığında katkı net görünmez ve skor düşer.',
        'Bullet satırlarını “Built, Developed, Improved” ya da “Geliştirdim, Yönettim, İyileştirdim” gibi güçlü fiillerle başlat.',
        check.code,
      )
    }

    if (check.code === 'measurable-results') {
      pushWarning(
        'warning-metrics',
        'Deneyim / projeler',
        'Ölçülebilir sonuç görünmüyor',
        check.status === 'fail' ? 'critical' : 'warning',
        'Sayı, yüzde veya hacim içermeyen maddeler etkiyi zayıf gösterir.',
        'Uygun yerlere yüzde, kullanıcı sayısı, teslim süresi, hız kazanımı veya çıktı adedi gibi metrikler ekle.',
        check.code,
      )
    }

    if (check.code === 'keyword-match') {
      const missingPreview = keywordAnalysis.missing.slice(0, 4).join(', ')
      pushWarning(
        'warning-keywords',
        'İş ilanı eşleşmesi',
        'İlan anahtar kelimeleri yeterince görünmüyor',
        check.status === 'fail' ? 'critical' : 'warning',
        keywordAnalysis.detectedKeywords.length > 0
          ? `Bazı kritik kelimeler CV içinde görünmüyor${missingPreview ? `: ${missingPreview}` : '.'}`
          : 'Job description alanı boş ya da sistem net anahtar kelime çıkaramadı.',
        keywordAnalysis.detectedKeywords.length > 0
          ? 'İlanda geçen ve gerçekten sahip olduğun becerileri özet, deneyim, projeler veya beceriler alanında açık biçimde geçir.'
          : 'Job description alanına ilanın teknik gereksinimlerini satır satır ekle.',
        check.code,
      )
    }

    if (check.code === 'skills-grouping') {
      pushWarning(
        'warning-skills',
        'Beceriler',
        'Beceri alanı dağınık veya tekrar ediyor',
        check.status === 'fail' ? 'critical' : 'warning',
        'Tekrarlayan veya tek satıra sıkışmış beceriler ATS eşleşmesini zayıflatabilir.',
        'Becerileri anlamlı gruplara ayır; yinelenen kelimeleri kaldır ve çok yoğun virgüllü başlıkları sadeleştir.',
        check.code,
      )
    }

    if (check.code === 'long-paragraphs') {
      pushWarning(
        'warning-paragraphs',
        'Özet / deneyim / projeler',
        'Uzun paragraf puan düşürüyor',
        check.status === 'fail' ? 'critical' : 'warning',
        'Tek blok halinde uzun metinler ATS ve insan okuyucu için taranması zor alanlar oluşturur.',
        'Uzun paragrafları kısa cümlelere veya bullet maddelere böl; her maddede tek mesaj ver.',
        check.code,
      )
    }

    if (check.code === 'date-consistency') {
      pushWarning(
        'warning-dates',
        'Tarihler',
        'Tarih formatı tutarsız',
        check.status === 'fail' ? 'critical' : 'warning',
        'Karışık tarih formatları tarih bilgisinin yanlış parse edilmesine yol açabilir.',
        'Ay bazlı alanlarda `YYYY-MM` kullan; serbest tarih alanlarında tek format seçip her kayıtta aynı yapıyı koru.',
        check.code,
      )
    }

    if (check.code === 'language-consistency') {
      pushWarning(
        'warning-language',
        'Dil tutarlılığı',
        'Seçili dil ile içerik dili karışıyor',
        check.status === 'fail' ? 'critical' : 'warning',
        'English output içinde Türkçe kalan alanlar veya fallback içerikler skor kaybettirir.',
        'Seçili çıktı dili hangisiyse aynı dilde özet, deneyim ve proje alanlarını tamamla; karışık dili temizle.',
        check.code,
      )
    }
  })

  return warnings
}

export const extractKeywordCandidates = (jobDescription: string) => {
  const rawFragments = jobDescription
    .replace(/[()]/g, ',')
    .split(/[\n,;|]+/g)
    .flatMap((part) => part.split(/\b(?:and|or|ve|veya|ile)\b/gi))
    .map((part) => stripKeywordPrefix(cleanPhrase(part)))
    .filter(Boolean)

  return unique(
    rawFragments
      .filter(isMeaningfulPhrase)
      .map((part) => cleanPhrase(part))
      .filter((part) => part.length >= 2),
  )
}

export const getLocalizedValue = (value: LocalizedValueLike, locale: LocaleCode, allowFallback = true) => {
  const selected = value[locale]?.trim() || ''
  if (selected || !allowFallback) return selected
  const fallbackLocale = locale === 'tr' ? 'en' : 'tr'
  return value[fallbackLocale]?.trim() || ''
}

export const hasSelectedLocaleValue = (value: LocalizedValueLike, locale: LocaleCode) => Boolean(value[locale]?.trim())

export const splitLocalizedLines = (value: LocalizedValueLike, locale: LocaleCode, allowFallback = true) => splitText(getLocalizedValue(value, locale, allowFallback))

export const compareByRecent = (a: { startDate: string; endDate: string; current?: boolean }, b: { startDate: string; endDate: string; current?: boolean }) =>
  monthScore(b.endDate, b.current) - monthScore(a.endDate, a.current) || monthScore(b.startDate) - monthScore(a.startDate)

export const formatMonth = (value: string, locale: LocaleCode) => {
  if (!value) return ''
  const [year, month] = value.split('-')
  const index = Number(month) - 1
  const monthName = MONTHS[locale][index]
  return monthName ? `${monthName} ${year}` : value
}

export const formatDateRange = (startDate: string, endDate: string, current: boolean, locale: LocaleCode) => {
  const start = formatMonth(startDate, locale)
  const end = current ? (locale === 'tr' ? 'Devam ediyor' : 'Present') : formatMonth(endDate, locale)
  return [start, end].filter(Boolean).join(' - ')
}

export const getAtsTemplateProfile = () => ATS_SAFE_TEMPLATE

export const analyzeAts = (data: CVDataLike): AtsAuditResult => {
  const locale = data.ats.outputLanguage
  const scoreBreakdown: ScoreBreakdownItem[] = []
  const checks: AuditCheck[] = []
  const localizedEntries = getLocalizedEntries(data)
  const localeFallbackCount = localizedEntries.filter((value) => !hasSelectedLocaleValue(value, locale) && getLocalizedValue(value, locale)).length

  const majorSections = createPrintSections(data)
  const hasPostSummarySection = majorSections.slice(1).some((section) => section.items.length > 0)
  pushCheck(
    scoreBreakdown,
    checks,
    'heading-structure',
    'Başlık yapısı doğru',
    hasPostSummarySection ? 10 : -10,
    hasPostSummarySection ? 'pass' : 'fail',
    hasPostSummarySection ? 'Standart ATS başlık sırası korunuyor.' : 'Özetten sonra en az bir ana ATS bölümü dolu olmalı.',
    hasPostSummarySection ? ['Summary > Skills > Experience > Projects > Education sırası aktif.'] : ['Beceri, deneyim, proje veya eğitim bölümlerinden en az biri doldurulmalı.'],
  )

  const hasRequiredContact = Boolean(data.contact.fullName.trim() && data.contact.email.trim() && data.contact.phone.trim())
  pushCheck(
    scoreBreakdown,
    checks,
    'contact-complete',
    'İletişim bilgileri tamam',
    hasRequiredContact ? 10 : -10,
    hasRequiredContact ? 'pass' : 'fail',
    hasRequiredContact ? 'Ad, e-posta ve telefon alanları hazır.' : 'Ad, e-posta ve telefon alanları ATS için kritik.',
    hasRequiredContact ? ['İletişim bloğu export için yeterli.'] : ['Eksik alanlar: ad soyad, e-posta veya telefon.'],
  )

  const summaryText = getLocalizedValue(data.careerObjective, locale)
  pushCheck(
    scoreBreakdown,
    checks,
    'summary-present',
    'Profesyonel özet mevcut',
    summaryText ? 8 : -8,
    summaryText ? 'pass' : 'fail',
    summaryText ? 'Seçili dilde profesyonel özet mevcut.' : 'Seçili output dili için profesyonel özet eklenmeli.',
    summaryText ? ['Özet ATS önizlemesinde görünecek.'] : ['Özet alanı boşsa eşleşme ve okunabilirlik puanı düşer.'],
  )

  const narrativeItems = [...data.experience, ...data.internships, ...data.projects].filter((item) => getLocalizedValue(item.bullets, locale))
  const bulletReadyItems = narrativeItems.filter((item) => splitLocalizedLines(item.bullets, locale).length >= 2)
  const bulletCoverage = narrativeItems.length === 0 ? 0 : bulletReadyItems.length / narrativeItems.length
  const weakBulletItems = narrativeItems
    .filter((item) => splitLocalizedLines(item.bullets, locale).length < 2)
    .map((item) => ('company' in item ? `${item.title || 'Deneyim'} / ${item.company || 'Kurum'}` : `${item.name || 'Proje'}`))
  const bulletStatus: AuditCheckStatus = narrativeItems.length === 0 ? 'warn' : bulletCoverage >= 0.75 ? 'pass' : bulletCoverage >= 0.4 ? 'warn' : 'fail'
  const bulletDelta = bulletStatus === 'pass' ? 8 : bulletStatus === 'warn' ? 0 : -8
  pushCheck(
    scoreBreakdown,
    checks,
    'bullet-structure',
    'Deneyim/proje maddeleri bullet yapısında',
    bulletDelta,
    bulletStatus,
    bulletStatus === 'pass' ? 'Deneyim ve projeler çok satırlı bullet yapısına yakın.' : 'Bazı deneyim veya proje blokları tek paragrafa sıkışmış.',
    weakBulletItems.length > 0 ? weakBulletItems.map((item) => `${item} iki veya daha fazla bullet satırına bölünmeli.`) : ['Bullet yapısı ATS tarafından daha kolay okunur.'],
  )

  const actionLines = narrativeItems.flatMap((item) => splitLocalizedLines(item.bullets, locale))
  const linesWithActionVerb = actionLines.filter(startsWithActionVerb)
  const actionRatio = actionLines.length === 0 ? 0 : linesWithActionVerb.length / actionLines.length
  const actionStatus: AuditCheckStatus = actionLines.length === 0 ? 'warn' : actionRatio >= 0.65 ? 'pass' : actionRatio >= 0.35 ? 'warn' : 'fail'
  pushCheck(
    scoreBreakdown,
    checks,
    'action-verbs',
    'Action verb kullanımı',
    actionStatus === 'pass' ? 8 : actionStatus === 'warn' ? 0 : -8,
    actionStatus,
    actionStatus === 'pass' ? 'Bullet satırları güçlü fiillerle başlıyor.' : 'Daha fazla bullet satırını güçlü fiillerle başlatmak gerekir.',
    actionStatus === 'pass' ? [`${linesWithActionVerb.length}/${actionLines.length} satır action verb ile başlıyor.`] : [`Action verb ile başlayan satır oranı: ${linesWithActionVerb.length}/${actionLines.length || 1}.`],
  )

  const measurableLineCount = narrativeItems.reduce((total, item) => total + countMetrics(splitLocalizedLines(item.bullets, locale)), 0)
  const metricsStatus: AuditCheckStatus = measurableLineCount >= 3 ? 'pass' : measurableLineCount >= 1 ? 'warn' : 'fail'
  pushCheck(
    scoreBreakdown,
    checks,
    'measurable-results',
    'Ölçülebilir sonuç varlığı',
    metricsStatus === 'pass' ? 8 : metricsStatus === 'warn' ? 4 : -8,
    metricsStatus,
    measurableLineCount > 0 ? `${measurableLineCount} satır ölçülebilir çıktı içeriyor.` : 'Henüz ölçülebilir sonuç içeren satır bulunamadı.',
    measurableLineCount > 0 ? ['Yüzde, sayı veya hacim içeren etkiler korunmalı.'] : ['%, adet, kullanıcı sayısı, gelir veya hız kazanımı gibi metrikler ekle.'],
  )

  const keywordAnalysis = createKeywordAnalysis(data, locale)
  const matchedKeywords = keywordAnalysis.matches.map((item) => item.keyword)
  const missingKeywords = keywordAnalysis.missing
  const keywordRatio = keywordAnalysis.detectedKeywords.length === 0 ? 0 : matchedKeywords.length / keywordAnalysis.detectedKeywords.length
  const keywordStatus: AuditCheckStatus =
    keywordAnalysis.detectedKeywords.length === 0
      ? data.ats.jobDescription.trim()
        ? 'warn'
        : 'warn'
      : keywordRatio >= 0.7
        ? 'pass'
        : keywordRatio >= 0.35
          ? 'warn'
          : 'fail'
  pushCheck(
    scoreBreakdown,
    checks,
    'keyword-match',
    'İş ilanı anahtar kelime eşleşmesi',
    keywordStatus === 'pass' ? 15 : keywordStatus === 'warn' ? 6 : keywordAnalysis.detectedKeywords.length > 0 ? -15 : 0,
    keywordStatus,
    keywordAnalysis.detectedKeywords.length > 0
      ? `${matchedKeywords.length}/${keywordAnalysis.detectedKeywords.length} ilan anahtar kelimesi CV içinde bulundu.`
      : 'İlan metni eklenmedi ya da net anahtar kelime çıkarılamadı.',
    missingKeywords.length > 0 ? missingKeywords.map((item) => `${item} CV içinde doğrudan görünmüyor.`) : ['Eksik anahtar kelime görünmüyor.'],
  )

  const skillTokens = extractSkillTokens(data, locale)
  const duplicateMap = new Map<string, number>()
  skillTokens.forEach((token) => {
    const normalized = normalizeKeyword(token)
    duplicateMap.set(normalized, (duplicateMap.get(normalized) || 0) + 1)
  })
  const duplicateSkills = [...duplicateMap.entries()].filter(([, count]) => count > 1).map(([token]) => token)
  const denseSkillNames = [...data.computerSkills, ...data.otherSkills].filter((item) => item.name.split(',').filter(Boolean).length >= 4).map((item) => item.name)
  const skillStatus: AuditCheckStatus = duplicateSkills.length === 0 && denseSkillNames.length === 0 ? 'pass' : duplicateSkills.length <= 2 ? 'warn' : 'fail'
  pushCheck(
    scoreBreakdown,
    checks,
    'skills-grouping',
    'Teknik beceri gruplama ve tekrar kontrolü',
    skillStatus === 'pass' ? 8 : skillStatus === 'warn' ? 0 : -8,
    skillStatus,
    skillStatus === 'pass' ? 'Beceri blokları gruplu ve tekrar oranı düşük.' : 'Beceri alanlarında tekrar veya yoğun virgüllü grupsuz girişler var.',
    [
      ...duplicateSkills.map((item) => `${item} birden fazla yerde tekrar ediyor.`),
      ...denseSkillNames.map((item) => `${item} tek satırda çok yoğun; gruplandırılması önerilir.`),
    ],
  )

  const longParagraphIssues: string[] = []
  if (summaryText && !summaryText.includes('\n') && (summaryText.length > 320 || getSentenceCount(summaryText) > 3)) {
    longParagraphIssues.push('Profesyonel özet çok uzun tek paragraf halinde.')
  }
  narrativeItems.forEach((item) => {
    const rawText = getLocalizedValue(item.bullets, locale)
    const lines = splitLocalizedLines(item.bullets, locale)
    if (lines.length < 2 && rawText && (rawText.length > 320 || getSentenceCount(rawText) > 3)) {
      const label = 'company' in item ? `${item.title || 'Deneyim'} / ${item.company || 'Kurum'}` : item.name || 'Proje'
      longParagraphIssues.push(`${label} tek paragraf olarak çok uzun.`)
    }
  })
  const paragraphStatus: AuditCheckStatus = longParagraphIssues.length === 0 ? 'pass' : longParagraphIssues.length <= 2 ? 'warn' : 'fail'
  pushCheck(
    scoreBreakdown,
    checks,
    'long-paragraphs',
    'Uzun paragraf tespiti',
    paragraphStatus === 'pass' ? 6 : paragraphStatus === 'warn' ? 0 : -6,
    paragraphStatus,
    paragraphStatus === 'pass' ? 'Uzun tek paragraf riski görünmüyor.' : 'Bazı alanlar ATS için fazla yoğun tek paragraf halinde.',
    longParagraphIssues.length > 0 ? longParagraphIssues : ['Uzun paragraflar bullet yapısına çevrilebilir.'],
  )

  const invalidMonthDates = [...data.education, ...data.experience, ...data.internships, ...data.projects]
    .flatMap((item) => [item.startDate, item.endDate])
    .filter((value) => value && !/^\d{4}-\d{2}$/.test(value))
  const freeTextDatePatterns = [...data.trainings.map((item) => item.date.trim()), ...data.coursesOrCongresses.map((item) => item.date.trim())].filter(Boolean).map(getFreeTextDatePattern)
  const uniqueDatePatterns = unique(freeTextDatePatterns)
  const dateStatus: AuditCheckStatus = invalidMonthDates.length === 0 && uniqueDatePatterns.length <= 1 ? 'pass' : invalidMonthDates.length === 0 ? 'warn' : 'fail'
  pushCheck(
    scoreBreakdown,
    checks,
    'date-consistency',
    'Tarih formatı tutarlılığı',
    dateStatus === 'pass' ? 6 : dateStatus === 'warn' ? 0 : -6,
    dateStatus,
    dateStatus === 'pass' ? 'Formdaki tarih alanları tutarlı.' : 'Tarih alanlarında karışık formatlar bulundu.',
    [
      ...invalidMonthDates.map((item) => `${item} YYYY-MM formatında değil.`),
      ...(uniqueDatePatterns.length > 1 ? [`Serbest tarih alanlarında karışık formatlar var: ${uniqueDatePatterns.join(', ')}.`] : []),
    ],
  )

  const mixedLanguageFields =
    locale === 'en'
      ? localizedEntries
          .map((entry) => getLocalizedValue(entry, locale, false))
          .filter(Boolean)
          .filter((value) => /[ığüşöçİĞÜŞÖÇ]/.test(value) || TURKISH_STOPWORDS.some((stopword) => ` ${value.toLocaleLowerCase('tr')} `.includes(stopword)))
      : []
  const localeCoverageRatio = localizedEntries.length === 0 ? 1 : (localizedEntries.length - localeFallbackCount) / localizedEntries.length
  const englishStatus: AuditCheckStatus =
    locale === 'en' ? (mixedLanguageFields.length === 0 && localeCoverageRatio >= 0.8 ? 'pass' : mixedLanguageFields.length === 0 ? 'warn' : 'fail') : 'pass'
  pushCheck(
    scoreBreakdown,
    checks,
    'language-consistency',
    'İngilizce CV için dil tutarlılığı',
    englishStatus === 'pass' ? 5 : englishStatus === 'warn' ? 0 : -5,
    englishStatus,
    locale === 'en' ? (englishStatus === 'pass' ? 'English output için dil tutarlılığı iyi durumda.' : 'English output içinde Türkçe izleri veya fallback alanlar var.') : 'Türkçe output seçildi; İngilizce tutarlılık kuralı bilgilendirici olarak geçildi.',
    [
      ...(localeFallbackCount > 0 ? [`${localeFallbackCount} alan seçili dil yerine fallback ile yazdırılacak.`] : []),
      ...mixedLanguageFields.slice(0, 3).map((item) => `"${item.slice(0, 80)}" English output içinde karışık dil işareti taşıyor.`),
    ],
  )

  const hiddenItems: string[] = []
  if (data.contact.photoDataUrl) hiddenItems.push('fotoğraf')
  if (
    data.personalDetails.showOptionalDetails &&
    [data.personalDetails.nationality, data.personalDetails.gender, data.personalDetails.birthPlace, data.personalDetails.birthDate, data.personalDetails.militaryStatus, data.personalDetails.maritalStatus].some((value) => value.trim())
  ) {
    hiddenItems.push('opsiyonel kişisel bilgiler')
  }
  if (data.referencesAvailableOnRequest || data.references.some((item) => item.fullName.trim() || item.organization.trim() || item.phone.trim() || item.email.trim())) {
    hiddenItems.push('referanslar')
  }
  const hasActivityData = Array.isArray(data.activities)
    ? data.activities.some((item) => item.category?.trim() || item.description?.trim())
    : Boolean(
        (data.activities as unknown as { interests?: string; memberships?: string; volunteerWork?: string })?.interests?.trim() ||
          (data.activities as unknown as { interests?: string; memberships?: string; volunteerWork?: string })?.memberships?.trim() ||
          (data.activities as unknown as { interests?: string; memberships?: string; volunteerWork?: string })?.volunteerWork?.trim(),
      )
  if (hasActivityData) {
    hiddenItems.push('faaliyetler')
  }
  const visualStatus: AuditCheckStatus = hiddenItems.length === 0 ? 'pass' : 'warn'
  pushCheck(
    scoreBreakdown,
    checks,
    'visual-risk',
    'Gereksiz görsel/ikon riski',
    visualStatus === 'pass' ? 3 : -3,
    visualStatus,
    visualStatus === 'pass' ? 'Görsel ağırlıklı ATS riski görünmüyor.' : 'Bazı görsel veya ATS dışı bilgiler export dışında tutulacak.',
    hiddenItems.length > 0 ? [`Kaydedilip export dışında kalan alanlar: ${hiddenItems.join(', ')}.`] : ['Print layout sade metin odaklı.'],
  )

  pushCheck(
    scoreBreakdown,
    checks,
    'layout-risk',
    'Tablo/çok kolon riski',
    5,
    'pass',
    'ATS Safe template tek sütun ve gerçek metin export kullanıyor.',
    ['Current export profile header/footer içine kritik bilgi saklamaz.', 'Şablon görsel progress bar veya tablo kullanmaz.'],
  )

  const templateAudit: TemplateAudit = {
    profile: ATS_SAFE_TEMPLATE,
    status: 'pass',
    notes: ATS_SAFE_TEMPLATE.guardrails,
  }

  const score = Math.max(
    0,
    Math.min(
      100,
      scoreBreakdown.reduce((total, item) => total + item.delta, 0),
    ),
  )

  return {
    score,
    matchedKeywords,
    missingKeywords,
    findings: toFindings(checks),
    keywordSuggestions: keywordAnalysis.detectedKeywords,
    localeFallbackCount,
    measurableLineCount,
    bulletCoverage,
    scoreBreakdown,
    checks,
    correctionWarnings: buildCorrectionWarnings(checks, keywordAnalysis),
    keywordAnalysis,
    templateAudit,
    helperDrafts: [],
  }
}

const formatSkillText = (value: LocalizedValueLike, locale: LocaleCode) => getLocalizedValue(value, locale).replace(/\n+/g, ', ')

export const createPrintSections = (data: CVDataLike): PrintSection[] => {
  const locale = data.ats.outputLanguage
  const sections: PrintSection[] = []
  const labels =
    locale === 'tr'
      ? {
          summary: 'Profesyonel Özet',
          skills: 'Teknik Beceriler',
          experience: 'İş Deneyimi',
          projects: 'Projeler',
          education: 'Eğitim',
          technicalSkills: 'Teknik Beceriler',
          additionalSkills: 'Diğer Beceriler',
          languages: 'Diller',
          role: 'Pozisyon',
          project: 'Proje',
          school: 'Okul',
          training: 'Eğitim',
          event: 'Etkinlik / Kongre',
          gpa: 'GNO',
        }
      : {
          summary: 'Professional Summary',
          skills: 'Technical Skills',
          experience: 'Work Experience',
          projects: 'Projects',
          education: 'Education',
          technicalSkills: 'Technical Skills',
          additionalSkills: 'Additional Skills',
          languages: 'Languages',
          role: 'Role',
          project: 'Project',
          school: 'School',
          training: 'Training',
          event: 'Event / Congress',
          gpa: 'GPA',
        }

  const summaryText = getLocalizedValue(data.careerObjective, locale)
  sections.push({
    id: 'summary',
    title: labels.summary,
    items: summaryText
      ? [
          {
            id: 'summary',
            heading: data.ats.targetJobTitle.trim() || data.contact.fullName.trim() || 'Candidate',
            text: summaryText,
          },
        ]
      : [],
  })

  const skillItems: PrintSectionItem[] = []
  const technicalSkills = data.computerSkills
    .filter((item) => item.name.trim() || getLocalizedValue(item.details, locale))
    .map((item) => [item.name.trim(), formatSkillText(item.details, locale)].filter(Boolean).join(' - '))
  const additionalSkills = data.otherSkills
    .filter((item) => item.name.trim() || getLocalizedValue(item.details, locale))
    .map((item) => [item.name.trim(), formatSkillText(item.details, locale)].filter(Boolean).join(' - '))
  const languageSkills = data.languages
    .filter((item) => item.name.trim())
    .map((item) => [item.name.trim(), item.level.trim(), item.score.trim()].filter(Boolean).join(' - '))

  if (technicalSkills.length > 0) {
    skillItems.push({ id: 'technical', heading: labels.technicalSkills, text: technicalSkills.join(', ') })
  }
  if (additionalSkills.length > 0) {
    skillItems.push({ id: 'additional', heading: labels.additionalSkills, text: additionalSkills.join(', ') })
  }
  if (languageSkills.length > 0) {
    skillItems.push({ id: 'languages', heading: labels.languages, text: languageSkills.join(', ') })
  }
  sections.push({ id: 'skills', title: labels.skills, items: skillItems })

  const combinedExperience = [...data.experience, ...data.internships]
  sections.push({
    id: 'experience',
    title: labels.experience,
    items: combinedExperience
      .sort(compareByRecent)
      .filter((item) => item.company.trim() || item.title.trim() || getLocalizedValue(item.bullets, locale))
      .map((item) => ({
        id: item.id,
        heading: item.title.trim() || labels.role,
        subheading: [item.company.trim(), item.location.trim()].filter(Boolean).join(' | '),
        meta: formatDateRange(item.startDate, item.endDate, item.current, locale),
        bullets: splitLocalizedLines(item.bullets, locale),
      })),
  })

  sections.push({
    id: 'projects',
    title: labels.projects,
    items: [...data.projects]
      .sort(compareByRecent)
      .filter((item) => item.name.trim() || item.role.trim() || getLocalizedValue(item.bullets, locale))
      .map((item) => ({
        id: item.id,
        heading: item.name.trim() || labels.project,
        subheading: [item.role.trim(), item.url.trim()].filter(Boolean).join(' | '),
        meta: [formatDateRange(item.startDate, item.endDate, item.current, locale), item.keywords.trim()].filter(Boolean).join(' | '),
        bullets: splitLocalizedLines(item.bullets, locale),
      })),
  })

  sections.push({
    id: 'education',
    title: labels.education,
    items: [
      ...[...data.education]
        .sort(compareByRecent)
        .filter((item) => item.school.trim() || item.department.trim() || getLocalizedValue(item.notes, locale))
        .map((item) => ({
          id: item.id,
          heading: item.school.trim() || labels.school,
          subheading: [item.faculty.trim(), item.department.trim(), item.degree.trim()].filter(Boolean).join(' | '),
          meta: [formatDateRange(item.startDate, item.endDate, false, locale), item.gpa.trim() ? `${labels.gpa}: ${item.gpa.trim()}` : ''].filter(Boolean).join(' | '),
          bullets: splitLocalizedLines(item.notes, locale),
        })),
      ...data.trainings
        .filter((item) => item.title.trim() || item.provider.trim() || item.date.trim() || item.duration.trim())
        .map((item) => ({
          id: item.id,
          heading: item.title.trim() || labels.training,
          subheading: item.provider.trim(),
          meta: [item.date.trim(), item.duration.trim()].filter(Boolean).join(' | '),
        })),
      ...data.coursesOrCongresses
        .filter((item) => item.title.trim() || item.location.trim() || item.date.trim())
        .map((item) => ({
          id: item.id,
          heading: item.title.trim() || labels.event,
          subheading: item.location.trim(),
          meta: item.date.trim(),
        })),
    ],
  })

  return sections
}

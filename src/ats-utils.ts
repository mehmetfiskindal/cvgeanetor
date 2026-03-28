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
}

export interface CVDataLike {
  contact: ContactLike
  personalDetails: PersonalDetailsLike
  careerObjective: LocalizedValueLike
  education: EducationLike[]
  trainings: unknown[]
  coursesOrCongresses: unknown[]
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

export interface AtsFinding {
  code: 'missing keyword' | 'add measurable result' | 'rewrite as bullets' | 'selected locale empty' | 'hidden from ATS print' | 'missing field'
  message: string
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
]

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

const countMetrics = (lines: string[]) => lines.filter((line) => /\b\d[\d.,+%x]*\b/.test(line)).length

const monthScore = (value: string, current = false) => {
  if (current) return Number.MAX_SAFE_INTEGER
  if (!value) return 0
  const [year, month] = value.split('-').map(Number)
  return year * 100 + month
}

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

const toCorpus = (data: CVDataLike, locale: LocaleCode) => {
  const parts = [
    data.ats.targetJobTitle,
    data.contact.fullName,
    data.contact.city,
    data.contact.linkedin,
    data.contact.website,
    getLocalizedValue(data.careerObjective, locale),
    ...data.experience.flatMap((item) => [item.company, item.title, item.location, getLocalizedValue(item.bullets, locale)]),
    ...data.projects.flatMap((item) => [item.name, item.role, item.url, item.keywords, getLocalizedValue(item.bullets, locale)]),
    ...data.languages.flatMap((item) => [item.name, item.level, item.score, getLocalizedValue(item.details, locale)]),
    ...data.computerSkills.flatMap((item) => [item.name, getLocalizedValue(item.details, locale)]),
    ...data.otherSkills.flatMap((item) => [item.name, getLocalizedValue(item.details, locale)]),
    ...data.education.flatMap((item) => [item.school, item.faculty, item.department, item.degree, item.gpa, getLocalizedValue(item.notes, locale)]),
  ]

  return normalizeKeyword(parts.filter(Boolean).join(' '))
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

const makeFinding = (code: AtsFinding['code'], message: string): AtsFinding => ({ code, message })

export const analyzeAts = (data: CVDataLike): AtsAuditResult => {
  const locale = data.ats.outputLanguage
  const findings: AtsFinding[] = []
  const selectedLocaleEntries = getLocalizedEntries(data)
  const localeFallbackCount = selectedLocaleEntries.filter((value) => !hasSelectedLocaleValue(value, locale) && getLocalizedValue(value, locale)).length

  let score = 0

  const hasRequiredContact = Boolean(data.contact.fullName.trim() && data.contact.email.trim() && data.contact.phone.trim())
  if (hasRequiredContact) score += 10
  else findings.push(makeFinding('missing field', 'Full name, email, and phone should be filled for ATS-safe export.'))

  if (data.ats.targetJobTitle.trim()) score += 10
  else findings.push(makeFinding('missing field', 'Add a target job title that matches the role you are applying for.'))

  const summaryText = getLocalizedValue(data.careerObjective, locale)
  if (summaryText) score += 10
  else findings.push(makeFinding('missing field', 'Add a professional summary for the selected output language.'))

  if (selectedLocaleEntries.length > 0) {
    const coverageRatio = (selectedLocaleEntries.length - localeFallbackCount) / selectedLocaleEntries.length
    if (coverageRatio >= 0.85) score += 15
    else if (coverageRatio >= 0.5) score += 10
    else if (coverageRatio > 0) score += 6

    if (localeFallbackCount > 0) {
      findings.push(makeFinding('selected locale empty', `${localeFallbackCount} localized field will fall back to the other language in ATS print output.`))
    }
  }

  const narrativeItems = [...data.experience, ...data.projects].filter((item) => getLocalizedValue(item.bullets, locale))
  const bulletReadyItems = narrativeItems.filter((item) => splitLocalizedLines(item.bullets, locale).length >= 2)
  const bulletCoverage = narrativeItems.length === 0 ? 0 : bulletReadyItems.length / narrativeItems.length
  if (bulletCoverage === 1 && narrativeItems.length > 0) score += 15
  else if (bulletCoverage >= 0.6) score += 10
  else if (bulletCoverage > 0) score += 5
  if (narrativeItems.some((item) => splitLocalizedLines(item.bullets, locale).length === 1)) {
    findings.push(makeFinding('rewrite as bullets', 'Rewrite experience and project descriptions as multiple bullet lines instead of single paragraphs.'))
  }

  const measurableLineCount = [...data.experience, ...data.projects].reduce((total, item) => total + countMetrics(splitLocalizedLines(item.bullets, locale)), 0)
  if (measurableLineCount >= 3) score += 15
  else if (measurableLineCount >= 1) score += 8
  if (measurableLineCount === 0) {
    findings.push(makeFinding('add measurable result', 'Add metrics such as %, counts, revenue, users, releases, or performance improvements.'))
  }

  const keywordSuggestions = extractKeywordCandidates(data.ats.jobDescription)
  const corpus = toCorpus(data, locale)
  const matchedKeywords = keywordSuggestions.filter((keyword) => corpus.includes(normalizeKeyword(keyword)))
  const missingKeywords = keywordSuggestions.filter((keyword) => !matchedKeywords.includes(keyword))
  if (keywordSuggestions.length > 0) {
    score += Math.round((matchedKeywords.length / keywordSuggestions.length) * 15)
    if (missingKeywords.length > 0) {
      findings.push(makeFinding('missing keyword', `${missingKeywords.length} job-description keywords are not present verbatim in the CV content.`))
    }
  } else if (data.ats.jobDescription.trim()) {
    findings.push(makeFinding('missing keyword', 'No clear ATS keywords were extracted from the job description. Paste role requirements line by line for better matching.'))
  }

  const hiddenItems: string[] = []
  if (data.contact.photoDataUrl) hiddenItems.push('photo')
  if (
    data.personalDetails.showOptionalDetails &&
    [data.personalDetails.nationality, data.personalDetails.gender, data.personalDetails.birthPlace, data.personalDetails.birthDate, data.personalDetails.militaryStatus, data.personalDetails.maritalStatus].some((value) => value.trim())
  ) {
    hiddenItems.push('optional personal details')
  }
  if (data.referencesAvailableOnRequest || data.references.some((item) => item.fullName.trim() || item.organization.trim() || item.phone.trim() || item.email.trim())) {
    hiddenItems.push('references')
  }
  if (data.activities.some((item) => item.category.trim() || item.description.trim())) {
    hiddenItems.push('activities')
  }

  const riskScore = Math.max(0, 10 - hiddenItems.length * 2)
  score += riskScore
  if (hiddenItems.length > 0) {
    findings.push(makeFinding('hidden from ATS print', `${hiddenItems.join(', ')} will stay in your saved data but will be hidden from the ATS print layout.`))
  }

  return {
    score: Math.min(100, score),
    matchedKeywords,
    missingKeywords,
    findings: unique(findings.map((item) => `${item.code}::${item.message}`)).map((value) => {
      const [code, message] = value.split('::')
      return { code: code as AtsFinding['code'], message }
    }),
    keywordSuggestions,
    localeFallbackCount,
    measurableLineCount,
    bulletCoverage,
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
    items: [...data.education]
      .sort(compareByRecent)
      .filter((item) => item.school.trim() || item.department.trim() || getLocalizedValue(item.notes, locale))
      .map((item) => ({
        id: item.id,
        heading: item.school.trim() || labels.school,
        subheading: [item.faculty.trim(), item.department.trim(), item.degree.trim()].filter(Boolean).join(' | '),
        meta: [formatDateRange(item.startDate, item.endDate, false, locale), item.gpa.trim() ? `${labels.gpa}: ${item.gpa.trim()}` : ''].filter(Boolean).join(' | '),
        bullets: splitLocalizedLines(item.notes, locale),
      })),
  })

  return sections
}

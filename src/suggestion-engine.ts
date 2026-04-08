import {
  extractKeywordCandidates,
  getLocalizedValue,
  normalizeKeyword,
  type CVDataLike,
  type LocaleCode,
  type SuggestionAction,
  type SuggestionDraft,
} from './ats-utils.ts'

const uid = () => Math.random().toString(36).slice(2, 10)

export const SUMMARY_ACTIONS: SuggestionAction[] = [
  { id: 'summary-variants', label: 'Özet uzunluk kontrolü', description: 'Özetin kısa, taranabilir ve dengeli olup olmadığını denetler.', target: 'summary' },
  { id: 'summary-job-rewrite', label: 'İlana uyum kontrolü', description: 'Özetin ilan kelimeleriyle ne kadar hizalı olduğunu kontrol eder.', target: 'summary' },
  { id: 'summary-tone-variants', label: 'Ton ve netlik kontrolü', description: 'Tonun kıdem seviyesiyle uyumunu ve netliğini inceler.', target: 'summary' },
]

export const EXPERIENCE_ACTIONS: SuggestionAction[] = [
  { id: 'experience-generate-bullets', label: 'Madde yapısını kontrol et', description: 'Bullet sayısı ve satır yapısını denetler.', target: 'experience' },
  { id: 'experience-professionalize', label: 'Profesyonellik kontrolü', description: 'Dil ve ifade biçiminin profesyonelliğini inceler.', target: 'experience' },
  { id: 'experience-impact', label: 'Etki odak kontrolü', description: 'Ölçülebilir sonuç ve etki sinyallerini arar.', target: 'experience' },
  { id: 'experience-star', label: 'STAR kontrolü', description: 'Durum-eylem-sonuç akışının yeterince görünür olup olmadığını kontrol eder.', target: 'experience' },
  { id: 'experience-cleanup', label: 'Zayıf kelime kontrolü', description: 'Zayıf veya belirsiz ifadeleri işaretler.', target: 'experience' },
]

export const PROJECT_ACTIONS: SuggestionAction[] = EXPERIENCE_ACTIONS.map((action) => ({
  ...action,
  id: action.id.replace('experience', 'project'),
  target: 'project' as const,
}))

export const JOB_MATCH_ACTIONS: SuggestionAction[] = [
  { id: 'job-summary-rewrite', label: 'Özet eşleşmesini kontrol et', description: 'Özetin ilanla ne kadar hizalandığını açıklar.', target: 'job-match' },
  { id: 'job-optimize-skills', label: 'Beceri eşleşmesini kontrol et', description: 'Beceri bölümlerinin ilanla uyumunu inceler.', target: 'job-match' },
  { id: 'job-missing-skills', label: 'Eksik becerileri listele', description: 'İlanda geçen ama CV içinde görünmeyen becerileri listeler.', target: 'job-match' },
  { id: 'job-tr-to-en', label: 'TR → EN hazırlık kontrolü', description: 'İngilizce CV için dil hazırlığını ve eksikleri kontrol eder.', target: 'job-match' },
]

const EN_WEAK_PHRASES = ['responsible for', 'helped', 'worked on', 'involved in', 'supported']
const TR_WEAK_PHRASES = ['sorumluydum', 'yardım ettim', 'destek oldum', 'çalıştım', 'ilgiliydim']
const EN_ACTION_HINTS = ['built', 'developed', 'led', 'implemented', 'improved', 'launched', 'optimized', 'managed', 'owned', 'integrated']
const TR_ACTION_HINTS = ['geliştirdim', 'yönettim', 'uyguladım', 'iyileştirdim', 'yayınladım', 'optimize ettim', 'kurdum', 'sağladım']

const sanitize = (value: string) => value.replace(/^[-*\u2022\s]+/, '').trim()

const unique = (items: string[]) => {
  const seen = new Set<string>()
  return items.filter((item) => {
    const key = normalizeKeyword(item)
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const getRole = (data: CVDataLike) =>
  data.ats.targetJobTitle.trim() ||
  data.experience.find((item) => item.title.trim())?.title.trim() ||
  data.projects.find((item) => item.role.trim())?.role.trim() ||
  'Aday'

const createTextDraft = (
  actionId: string,
  title: string,
  description: string,
  locale: LocaleCode,
  target: SuggestionDraft['target'],
  lines: string[],
): SuggestionDraft => ({
  id: uid(),
  actionId,
  title,
  description,
  note: locale === 'tr' ? 'Bu kart kontrol sonucudur; metni otomatik değiştirmez.' : 'This card is a diagnostic result only; it does not rewrite your content.',
  target,
  payload: { kind: 'text', text: lines.join('\n') },
})

const createStatusLine = (ok: boolean, passText: string, failText: string) => `${ok ? 'Tamam' : 'Eksik'}: ${ok ? passText : failText}`

const summaryChecks = (data: CVDataLike, locale: LocaleCode, actionId: string): SuggestionDraft[] => {
  const summary = getLocalizedValue(data.careerObjective, locale, false).trim()
  const sentences = summary.split(/[.!?]+/g).map((item) => item.trim()).filter(Boolean)
  const keywords = extractKeywordCandidates(data.ats.jobDescription)
  const matchedKeywords = keywords.filter((keyword) => normalizeKeyword(summary).includes(normalizeKeyword(keyword)))
  const weakToneHits = locale === 'tr' ? TR_WEAK_PHRASES.filter((item) => normalizeKeyword(summary).includes(item)) : EN_WEAK_PHRASES.filter((item) => normalizeKeyword(summary).includes(item))
  const hasMetrics = /\b\d[\d.,+%x]*\b/.test(summary)

  if (actionId === 'summary-variants') {
    return [
      createTextDraft(actionId, locale === 'tr' ? 'Özet uzunluk kontrolü' : 'Summary length check', locale === 'tr' ? 'Özetin okunabilirlik durumunu raporlar.' : 'Reports summary readability.', locale, { type: 'careerObjective', locale }, [
        createStatusLine(Boolean(summary), locale === 'tr' ? 'Özet alanı dolu.' : 'Summary field is filled.', locale === 'tr' ? 'Özet alanı boş.' : 'Summary field is empty.'),
        createStatusLine(sentences.length >= 2 && sentences.length <= 4, locale === 'tr' ? 'Cümle sayısı dengeli.' : 'Sentence count is balanced.', locale === 'tr' ? '2-4 cümle aralığı daha taranabilir olur.' : 'A 2-4 sentence range is easier to scan.'),
        createStatusLine(summary.length > 0 && summary.length <= 320, locale === 'tr' ? 'Paragraf uzunluğu kontrollü.' : 'Paragraph length is controlled.', locale === 'tr' ? 'Özet tek blokta fazla uzuyor.' : 'The summary is becoming too long in one block.'),
      ]),
    ]
  }

  if (actionId === 'summary-job-rewrite') {
    return [
      createTextDraft(actionId, locale === 'tr' ? 'İlana uyum kontrolü' : 'Job alignment check', locale === 'tr' ? 'Özet ile iş ilanı arasındaki eşleşmeyi raporlar.' : 'Reports summary alignment with the job description.', locale, { type: 'careerObjective', locale }, [
        createStatusLine(keywords.length > 0, locale === 'tr' ? 'İlandan anahtar kelime çıkarıldı.' : 'Keywords were extracted from the job ad.', locale === 'tr' ? 'İş ilanı girmeden bu kontrol sınırlı kalır.' : 'This check is limited without a job description.'),
        createStatusLine(matchedKeywords.length > 0, locale === 'tr' ? `${matchedKeywords.length} anahtar kelime özette geçiyor.` : `${matchedKeywords.length} keywords appear in the summary.`, locale === 'tr' ? 'Özette ilandan doğrudan geçen anahtar kelime görünmüyor.' : 'No direct job keywords appear in the summary.'),
        keywords.length > matchedKeywords.length
          ? `${locale === 'tr' ? 'Eksik kelimeler' : 'Missing keywords'}: ${keywords.filter((item) => !matchedKeywords.includes(item)).join(', ')}`
          : locale === 'tr'
            ? 'Eksik kelime görünmüyor.'
            : 'No missing keywords detected.',
      ]),
    ]
  }

  return [
    createTextDraft(actionId, locale === 'tr' ? 'Ton ve netlik kontrolü' : 'Tone and clarity check', locale === 'tr' ? 'Özetin tonunu ve netliğini değerlendirir.' : 'Evaluates summary tone and clarity.', locale, { type: 'careerObjective', locale }, [
      createStatusLine(weakToneHits.length === 0, locale === 'tr' ? 'Zayıf ifade işareti görünmüyor.' : 'No weak phrasing signals found.', locale === 'tr' ? `Zayıf ifadeler: ${weakToneHits.join(', ')}` : `Weak phrasing detected: ${weakToneHits.join(', ')}`),
      createStatusLine(hasMetrics, locale === 'tr' ? 'Etkinin somutlaşmasını destekleyen metrik var.' : 'A metric helps make the impact concrete.', locale === 'tr' ? 'Özette ölçülebilir sonuç görünmüyor.' : 'No measurable result appears in the summary.'),
      createStatusLine(summary.includes(getRole(data)) || summary.toLocaleLowerCase(locale).includes(getRole(data).toLocaleLowerCase(locale)), locale === 'tr' ? 'Hedef rol özette görünür.' : 'Target role is visible in the summary.', locale === 'tr' ? 'Hedef rolü özette daha açık yazmak faydalı olur.' : 'It would help to name the target role more explicitly in the summary.'),
    ]),
  ]
}

export const createSummaryDrafts = (data: CVDataLike, locale: LocaleCode, actionId: string): SuggestionDraft[] => summaryChecks(data, locale, actionId)

const buildNarrativeCheckLines = (text: string, locale: LocaleCode, mode: 'structure' | 'professional' | 'impact' | 'star' | 'cleanup') => {
  const lines = text
    .split('\n')
    .map(sanitize)
    .filter(Boolean)
  const weakHits = (locale === 'tr' ? TR_WEAK_PHRASES : EN_WEAK_PHRASES).filter((item) => normalizeKeyword(text).includes(item))
  const actionHints = locale === 'tr' ? TR_ACTION_HINTS : EN_ACTION_HINTS
  const actionLineCount = lines.filter((line) => actionHints.some((verb) => normalizeKeyword(line).startsWith(verb))).length
  const metricCount = lines.filter((line) => /\b\d[\d.,+%x]*\b/.test(line)).length

  if (mode === 'structure') {
    return [
      createStatusLine(lines.length >= 2, locale === 'tr' ? `${lines.length} bullet satırı var.` : `${lines.length} bullet lines found.`, locale === 'tr' ? 'En az 2 net bullet satırı beklenir.' : 'At least 2 clear bullet lines are expected.'),
      createStatusLine(lines.every((line) => line.length <= 180), locale === 'tr' ? 'Satır uzunlukları taranabilir.' : 'Line lengths stay scannable.', locale === 'tr' ? 'Bazı satırlar fazla uzun; bölünmesi iyi olur.' : 'Some lines are too long and should be split.'),
    ]
  }

  if (mode === 'professional') {
    return [
      createStatusLine(lines.length > 0, locale === 'tr' ? 'İçerik mevcut.' : 'Content is present.', locale === 'tr' ? 'Kontrol için önce deneyim metni girilmeli.' : 'Add experience text before running this check.'),
      createStatusLine(weakHits.length === 0, locale === 'tr' ? 'Belirsiz/zayıf ifade görünmüyor.' : 'No vague/weak wording detected.', locale === 'tr' ? `Gözden geçirilecek ifadeler: ${weakHits.join(', ')}` : `Phrases to review: ${weakHits.join(', ')}`),
      createStatusLine(actionLineCount >= Math.min(2, lines.length), locale === 'tr' ? 'Satırlar güçlü fiillerle başlıyor.' : 'Lines start with stronger action verbs.', locale === 'tr' ? 'Daha fazla satır güçlü fiille başlayabilir.' : 'More lines could start with strong action verbs.'),
    ]
  }

  if (mode === 'impact') {
    return [
      createStatusLine(metricCount > 0, locale === 'tr' ? `${metricCount} satırda ölçülebilir çıktı var.` : `${metricCount} lines include measurable output.`, locale === 'tr' ? 'Yüzde, sayı veya hacim içeren sonuç görünmüyor.' : 'No percentage, count, or scale-based outcome was found.'),
      createStatusLine(lines.some((line) => /release|launch|yayın|yayin|teslim|deployment|store/i.test(line)), locale === 'tr' ? 'Teslim veya yayın sonucu görünür.' : 'Delivery or launch outcome is visible.', locale === 'tr' ? 'İş sonucunu veya teslim etkisini daha net yazabilirsin.' : 'You can describe the business/delivery outcome more explicitly.'),
    ]
  }

  if (mode === 'star') {
    return [
      createStatusLine(lines.length >= 3, locale === 'tr' ? 'Durum-eylem-sonuç ayrıştırılabilecek kadar içerik var.' : 'There is enough content to separate situation, action, and result.', locale === 'tr' ? 'STAR için en az 3 anlamlı satır faydalı olur.' : 'At least 3 meaningful lines help with STAR framing.'),
      createStatusLine(metricCount > 0, locale === 'tr' ? 'Sonuç kısmını besleyecek metrik var.' : 'A metric exists to support the result part.', locale === 'tr' ? 'Sonuç kısmı için ölçülebilir veri eksik.' : 'A measurable result is missing for the result part.'),
      createStatusLine(actionLineCount > 0, locale === 'tr' ? 'Aksiyon dili mevcut.' : 'Action language is present.', locale === 'tr' ? 'Aksiyon bölümünü güçlendirecek fiiller az.' : 'There are too few verbs to make the action part clear.'),
    ]
  }

  return [
    createStatusLine(weakHits.length === 0, locale === 'tr' ? 'Zayıf kelime sinyali görünmüyor.' : 'No weak wording signals detected.', locale === 'tr' ? `Zayıf ifadeler: ${weakHits.join(', ')}` : `Weak phrases: ${weakHits.join(', ')}`),
    createStatusLine(lines.every((line) => !/etc\.|vb\.|vs\./i.test(line)), locale === 'tr' ? 'Belirsiz kısaltma görünmüyor.' : 'No vague shorthand detected.', locale === 'tr' ? 'VB., vs. gibi belirsiz kısaltmaları açmak daha iyi olur.' : 'Expand vague shorthand like etc. or similar abbreviations.'),
  ]
}

export const createExperienceDraft = (
  _data: CVDataLike,
  item: CVDataLike['experience'][number],
  locale: LocaleCode,
  actionId: string,
  targetType: 'experience' | 'internships' = 'experience',
): SuggestionDraft[] => {
  const text = getLocalizedValue(item.bullets, locale, true)
  const label = item.title?.trim() || item.company?.trim() || (locale === 'tr' ? 'Deneyim' : 'Experience')
  const mode =
    actionId === 'experience-generate-bullets'
      ? 'structure'
      : actionId === 'experience-professionalize'
        ? 'professional'
        : actionId === 'experience-impact'
          ? 'impact'
          : actionId === 'experience-star'
            ? 'star'
            : 'cleanup'

  const titleMap = {
    structure: locale === 'tr' ? 'Madde yapısı kontrolü' : 'Bullet structure check',
    professional: locale === 'tr' ? 'Profesyonellik kontrolü' : 'Professional tone check',
    impact: locale === 'tr' ? 'Etki odak kontrolü' : 'Impact check',
    star: locale === 'tr' ? 'STAR kontrolü' : 'STAR check',
    cleanup: locale === 'tr' ? 'Zayıf kelime kontrolü' : 'Weak wording check',
  } as const

  return [
    createTextDraft(actionId, `${titleMap[mode]}: ${label}`, locale === 'tr' ? 'Mevcut deneyim metnindeki eksikleri listeler.' : 'Lists gaps in the current experience text.', locale, { type: targetType, id: item.id, locale }, buildNarrativeCheckLines(text, locale, mode)),
  ]
}

export const createProjectDraft = (data: CVDataLike, item: CVDataLike['projects'][number], locale: LocaleCode, actionId: string): SuggestionDraft[] => {
  const mappedAction = actionId.replace('project-', 'experience-')
  return createExperienceDraft(
    data,
    {
      ...item,
      company: item.name,
      title: item.role || item.name,
      location: item.url,
      bullets: item.bullets,
    },
    locale,
    mappedAction,
    'projects',
  )
}

export const createJobMatchDrafts = (data: CVDataLike, locale: LocaleCode, actionId: string): SuggestionDraft[] => {
  const keywords = extractKeywordCandidates(data.ats.jobDescription)
  const summary = getLocalizedValue(data.careerObjective, locale, true)
  const rawSkills = [
    ...data.computerSkills.map((item) => item.name),
    ...data.otherSkills.map((item) => item.name),
    ...data.projects.flatMap((item) => item.keywords.split(',')),
  ]
    .map(sanitize)
    .filter(Boolean)
  const allSkills = unique(rawSkills)
  const matchedInSummary = keywords.filter((keyword) => normalizeKeyword(summary).includes(normalizeKeyword(keyword)))
  const matchedInSkills = keywords.filter((keyword) => allSkills.some((skill) => normalizeKeyword(skill) === normalizeKeyword(keyword)))
  const missingKeywords = keywords.filter((keyword) => !matchedInSummary.includes(keyword) && !matchedInSkills.includes(keyword))

  if (actionId === 'job-summary-rewrite') {
    return [
      createTextDraft(actionId, locale === 'tr' ? 'Özet eşleşme kontrolü' : 'Summary alignment check', locale === 'tr' ? 'Özetin ilanla uyumunu kontrol eder.' : 'Checks how well the summary aligns with the job ad.', locale, { type: 'careerObjective', locale }, [
        createStatusLine(Boolean(summary), locale === 'tr' ? 'Özet alanı dolu.' : 'Summary is filled.', locale === 'tr' ? 'Özet alanı boş.' : 'Summary is empty.'),
        createStatusLine(matchedInSummary.length > 0, locale === 'tr' ? `${matchedInSummary.length} ilan kelimesi özette geçiyor.` : `${matchedInSummary.length} job keywords appear in the summary.`, locale === 'tr' ? 'Özette ilan kelimesi görünmüyor.' : 'No job keywords appear in the summary.'),
        missingKeywords.length > 0 ? `${locale === 'tr' ? 'Özette eksik kalabilecek kelimeler' : 'Keywords still missing from the summary'}: ${missingKeywords.join(', ')}` : locale === 'tr' ? 'Özet tarafında belirgin eksik kelime yok.' : 'No obvious summary-side keyword gap detected.',
      ]),
    ]
  }

  if (actionId === 'job-optimize-skills') {
    const duplicateSkills = rawSkills.filter((skill, index) => rawSkills.findIndex((item) => normalizeKeyword(item) === normalizeKeyword(skill)) !== index)
    return [
      createTextDraft(actionId, locale === 'tr' ? 'Beceri eşleşme kontrolü' : 'Skill alignment check', locale === 'tr' ? 'Beceri bloklarını ilanla karşılaştırır.' : 'Compares skill sections with the job ad.', locale, { type: 'skills', locale }, [
        createStatusLine(allSkills.length > 0, locale === 'tr' ? `${allSkills.length} beceri girdisi bulundu.` : `${allSkills.length} skill entries found.`, locale === 'tr' ? 'Beceri alanları boş görünüyor.' : 'Skill sections appear empty.'),
        createStatusLine(matchedInSkills.length > 0, locale === 'tr' ? `${matchedInSkills.length} ilan kelimesi becerilerde geçiyor.` : `${matchedInSkills.length} job keywords appear in skills.`, locale === 'tr' ? 'Beceri bölümünde ilan kelimesi görünmüyor.' : 'No job keyword appears in the skill section.'),
        duplicateSkills.length > 0 ? `${locale === 'tr' ? 'Tekrar eden beceriler' : 'Duplicate skills'}: ${unique(duplicateSkills).join(', ')}` : locale === 'tr' ? 'Belirgin tekrar görünmüyor.' : 'No obvious duplication detected.',
      ]),
    ]
  }

  if (actionId === 'job-missing-skills') {
    return [
      createTextDraft(actionId, locale === 'tr' ? 'Eksik beceri listesi' : 'Missing skill list', locale === 'tr' ? 'İlanda olup CV’de görünmeyen becerileri listeler.' : 'Lists skills present in the job ad but not visible in the CV.', locale, { type: 'skills', locale }, [
        createStatusLine(keywords.length > 0, locale === 'tr' ? 'İlandan beceri çıkarıldı.' : 'Skills were extracted from the job ad.', locale === 'tr' ? 'Önce ilan metni girilmeli.' : 'Enter a job description first.'),
        missingKeywords.length > 0 ? `${locale === 'tr' ? 'Eksik görünen beceriler' : 'Potentially missing skills'}: ${missingKeywords.join(', ')}` : locale === 'tr' ? 'Eksik beceri görünmüyor.' : 'No missing skill detected.',
      ]),
    ]
  }

  const englishReady = locale === 'en' || Boolean(data.careerObjective.en.trim() || data.experience.some((item) => item.bullets.en.trim()) || data.projects.some((item) => item.bullets.en.trim()))
  return [
    createTextDraft(actionId, locale === 'tr' ? 'TR → EN hazırlık kontrolü' : 'TR -> EN readiness check', locale === 'tr' ? 'İngilizce CV hazırlığı için eksikleri listeler.' : 'Lists gaps for English CV readiness.', locale === 'tr' ? 'en' : locale, { type: 'careerObjective', locale: locale === 'tr' ? 'en' : locale }, [
      createStatusLine(englishReady, locale === 'tr' ? 'İngilizce içerik başlangıcı mevcut.' : 'An English content base exists.', locale === 'tr' ? 'İngilizce CV için henüz yeterli içerik görünmüyor.' : 'There is not enough visible English content yet.'),
      createStatusLine(keywords.length > 0, locale === 'tr' ? 'Korunacak ilan anahtar kelimeleri hazır.' : 'Job keywords to preserve are available.', locale === 'tr' ? 'İlan anahtar kelimesi olmadan EN hazırlık kontrolü sınırlı olur.' : 'The check is limited without job keywords.'),
      locale === 'tr'
        ? 'Not: Bu kontrol çeviri üretmez; yalnızca İngilizce CV hazırlığı için eksikleri gösterir.'
        : 'Note: This does not translate content; it only reports readiness gaps for English CV output.',
    ]),
  ]
}

import { Store } from '@geajs/core'
import {
  analyzeAts,
  compareByRecent,
  createPrintSections,
  formatMonth as formatLocalizedMonth,
  getAtsTemplateProfile,
  getLocalizedValue,
  type AtsAuditResult,
  type LocaleCode,
  type PrintSection,
  type SuggestionDraft,
} from './ats-utils'
import {
  createExperienceDraft,
  createJobMatchDrafts,
  createProjectDraft,
  createSummaryDrafts,
} from './suggestion-engine'

type AlertTone = 'info' | 'success' | 'error'

export interface LocalizedText {
  tr: string
  en: string
}

export interface ContactInfo {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  linkedin: string
  website: string
  photoDataUrl: string
}

export interface PersonalDetails {
  nationality: string
  gender: string
  birthPlace: string
  birthDate: string
  militaryStatus: string
  maritalStatus: string
  showOptionalDetails: boolean
}

export interface EducationItem {
  id: string
  school: string
  faculty: string
  department: string
  degree: string
  startDate: string
  endDate: string
  gpa: string
  notes: LocalizedText
}

export interface TrainingItem {
  id: string
  title: string
  provider: string
  date: string
  duration: string
}

export interface CongressItem {
  id: string
  title: string
  location: string
  date: string
}

export interface ExperienceItem {
  id: string
  company: string
  title: string
  startDate: string
  endDate: string
  current: boolean
  location: string
  bullets: LocalizedText
}

export interface ProjectItem {
  id: string
  name: string
  role: string
  startDate: string
  endDate: string
  current: boolean
  url: string
  keywords: string
  bullets: LocalizedText
}

export interface LanguageItem {
  id: string
  name: string
  level: string
  score: string
  details: LocalizedText
}

export interface SkillItem {
  id: string
  name: string
  details: LocalizedText
}

export interface ReferenceItem {
  id: string
  fullName: string
  title: string
  organization: string
  phone: string
  email: string
}

export interface ActivityItem {
  id: string
  category: string
  description: string
}

export interface AtsSettings {
  targetJobTitle: string
  jobDescription: string
  outputLanguage: LocaleCode
  templateId: string
}

export interface CVData {
  contact: ContactInfo
  personalDetails: PersonalDetails
  careerObjective: LocalizedText
  education: EducationItem[]
  trainings: TrainingItem[]
  coursesOrCongresses: CongressItem[]
  experience: ExperienceItem[]
  internships: ExperienceItem[]
  projects: ProjectItem[]
  languages: LanguageItem[]
  computerSkills: SkillItem[]
  otherSkills: SkillItem[]
  activities: ActivityItem[]
  references: ReferenceItem[]
  referencesAvailableOnRequest: boolean
  ats: AtsSettings
}

type CollectionKey =
  | 'education'
  | 'trainings'
  | 'coursesOrCongresses'
  | 'experience'
  | 'internships'
  | 'projects'
  | 'languages'
  | 'computerSkills'
  | 'otherSkills'
  | 'activities'
  | 'references'

export interface StepMeta {
  id: number
  title: string
  description: string
}

const STEP_META: StepMeta[] = [
  { id: 0, title: 'Kişisel bilgiler', description: 'İletişim, fotoğraf ve opsiyonel kişisel alanlar.' },
  { id: 1, title: 'Profesyonel özet', description: 'Özetini hedef role göre kontrol et ve eksiklerini gör.' },
  { id: 2, title: 'Deneyim', description: 'İş ve staj deneyimini bullet yapısı, etki ve ton açısından kontrol et.' },
  { id: 3, title: 'Projeler', description: 'Projeleri stack, yayın ve etki ile destekle.' },
  { id: 4, title: 'Eğitim ve beceriler', description: 'Eğitim, sertifika ve skill gruplarını tek adımda düzenle.' },
  { id: 5, title: 'İş ilanı eşleştirme', description: 'Keyword eşleşmesini, eksikleri ve kontrol sonuçlarını gör.' },
  { id: 6, title: 'Önizleme + PDF', description: 'Son kontrolü yap ve export al.' },
]

const uid = () => Math.random().toString(36).slice(2, 10)

const createLocalizedText = (tr = '', en = ''): LocalizedText => ({ tr, en })

const createEducationItem = (): EducationItem => ({
  id: uid(),
  school: '',
  faculty: '',
  department: '',
  degree: '',
  startDate: '',
  endDate: '',
  gpa: '',
  notes: createLocalizedText(),
})

const createTrainingItem = (): TrainingItem => ({
  id: uid(),
  title: '',
  provider: '',
  date: '',
  duration: '',
})

const createCongressItem = (): CongressItem => ({
  id: uid(),
  title: '',
  location: '',
  date: '',
})

const createExperienceItem = (): ExperienceItem => ({
  id: uid(),
  company: '',
  title: '',
  startDate: '',
  endDate: '',
  current: false,
  location: '',
  bullets: createLocalizedText(),
})

const createProjectItem = (): ProjectItem => ({
  id: uid(),
  name: '',
  role: '',
  startDate: '',
  endDate: '',
  current: false,
  url: '',
  keywords: '',
  bullets: createLocalizedText(),
})

const createLanguageItem = (): LanguageItem => ({
  id: uid(),
  name: '',
  level: '',
  score: '',
  details: createLocalizedText(),
})

const createSkillItem = (): SkillItem => ({
  id: uid(),
  name: '',
  details: createLocalizedText(),
})

const createActivityItem = (): ActivityItem => ({
  id: uid(),
  category: '',
  description: '',
})

const createReferenceItem = (): ReferenceItem => ({
  id: uid(),
  fullName: '',
  title: '',
  organization: '',
  phone: '',
  email: '',
})

const createDefaultData = (): CVData => ({
  contact: {
    fullName: 'Ad Soyad',
    email: '',
    phone: '',
    address: '',
    city: '',
    linkedin: '',
    website: '',
    photoDataUrl: '',
  },
  personalDetails: {
    nationality: '',
    gender: '',
    birthPlace: '',
    birthDate: '',
    militaryStatus: '',
    maritalStatus: '',
    showOptionalDetails: false,
  },
  careerObjective: createLocalizedText(),
  education: [createEducationItem()],
  trainings: [createTrainingItem()],
  coursesOrCongresses: [createCongressItem()],
  experience: [createExperienceItem()],
  internships: [createExperienceItem()],
  projects: [createProjectItem()],
  languages: [createLanguageItem()],
  computerSkills: [createSkillItem()],
  otherSkills: [createSkillItem()],
  activities: [createActivityItem()],
  references: [createReferenceItem()],
  referencesAvailableOnRequest: false,
  ats: {
    targetJobTitle: '',
    jobDescription: '',
    outputLanguage: 'tr',
    templateId: 'ats-safe',
  },
})

const cloneDefaultData = () => JSON.parse(JSON.stringify(createDefaultData())) as CVData

const isBlank = (value: unknown) => typeof value !== 'string' || value.trim().length === 0

const hasLocalizedText = (value: LocalizedText) => !isBlank(value.tr) || !isBlank(value.en)

const hasMojibakeMarkers = (value: string) => /[ÃÄÅÂ]/.test(value)

const scoreReadableTurkishText = (value: string) => {
  const turkishLetters = (value.match(/[ığüşöçİĞÜŞÖÇ]/g) || []).length
  const mojibakeMarkers = (value.match(/[ÃÄÅÂ]/g) || []).length
  return turkishLetters - mojibakeMarkers
}

const tryRecoverMojibake = (value: string) => {
  if (!hasMojibakeMarkers(value)) return value

  try {
    const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0) & 0xff)
    const recovered = new TextDecoder('utf-8', { fatal: false }).decode(bytes)
    return scoreReadableTurkishText(recovered) > scoreReadableTurkishText(value) ? recovered : value
  } catch {
    return value
  }
}

const normalizeImportedText = <T>(value: T): T => {
  if (typeof value === 'string') return tryRecoverMojibake(value) as T
  if (Array.isArray(value)) return value.map((item) => normalizeImportedText(item)) as T
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entryValue]) => [key, normalizeImportedText(entryValue)]),
    ) as T
  }
  return value
}

class CVStore extends Store {
  steps = STEP_META
  currentStep = 0
  previewRevision = 0
  formRevision = 0
  data: CVData = cloneDefaultData()
  helperDrafts: SuggestionDraft[] = []
  openDraftIds: string[] = []
  alert = {
    message: '',
    tone: 'info' as AlertTone,
  }
  exportState = {
    active: false,
    type: '' as '' | 'pdf' | 'json',
    progress: 0,
    message: '',
  }
  private exportProgressTimer: number | null = null
  private exportFinishTimer: number | null = null

  get primaryLocale() {
    return this.data.ats.outputLanguage
  }

  get secondaryLocale() {
    return this.data.ats.outputLanguage === 'tr' ? 'en' : 'tr'
  }

  get templateProfile() {
    return getAtsTemplateProfile()
  }

  bumpPreviewRevision = () => {
    this.previewRevision += 1
  }

  bumpFormRevision = () => {
    this.formRevision += 1
  }

  flushFormControlsToStore = () => {
    if (typeof document === 'undefined') return
    const controls = document.querySelectorAll('.form-card input, .form-card textarea, .form-card select')
    controls.forEach((control) => {
      control.dispatchEvent(new Event('input', { bubbles: true }))
      control.dispatchEvent(new Event('change', { bubbles: true }))
    })
  }

  private updateCollectionItem<K extends CollectionKey>(
    key: K,
    id: string,
    updater: (item: CVData[K][number]) => CVData[K][number],
  ) {
    this.data[key] = this.data[key].map((item) => (item.id === id ? updater(item) : item)) as CVData[K]
    this.bumpPreviewRevision()
  }

  private replaceDraftsForTarget = (predicate: (draft: SuggestionDraft) => boolean, drafts: SuggestionDraft[]) => {
    this.helperDrafts = [...this.helperDrafts.filter((draft) => !predicate(draft)), ...drafts]
    this.openDraftIds = this.openDraftIds.filter((id) => this.helperDrafts.some((draft) => draft.id === id))
    this.bumpFormRevision()
  }

  private showDrafts = (drafts: SuggestionDraft[]) => {
    this.openDraftIds = [...this.openDraftIds, ...drafts.map((draft) => draft.id)].filter((id, index, array) => array.indexOf(id) === index)
    this.bumpFormRevision()
  }

  updateCollectionField = <K extends CollectionKey, F extends keyof CVData[K][number]>(
    key: K,
    id: string,
    field: F,
    value: CVData[K][number][F],
  ) => {
    this.updateCollectionItem(key, id, (item) => ({ ...item, [field]: value }) as CVData[K][number])
  }

  updateCollectionLocalizedField = <
    K extends CollectionKey,
    F extends keyof CVData[K][number],
    L extends keyof LocalizedText
  >(
    key: K,
    id: string,
    field: F,
    locale: L,
    value: string,
  ) => {
    this.updateCollectionItem(key, id, (item) => ({
      ...item,
      [field]: {
        ...(item[field] as LocalizedText),
        [locale]: value,
      },
    }) as CVData[K][number])
  }

  get completionRatio() {
    return Math.round(((this.currentStep + 1) / this.steps.length) * 100)
  }

  get sortedEducation() {
    return [...this.data.education].sort(compareByRecent)
  }

  get sortedExperience() {
    return [...this.data.experience].sort(compareByRecent)
  }

  get sortedInternships() {
    return [...this.data.internships].sort(compareByRecent)
  }

  get sortedProjects() {
    return [...this.data.projects].sort(compareByRecent)
  }

  get combinedExperience() {
    return [
      ...this.data.experience.map((item) => ({ ...item, collection: 'experience' as const, label: 'İş deneyimi' })),
      ...this.data.internships.map((item) => ({ ...item, collection: 'internships' as const, label: 'Staj' })),
    ].sort(compareByRecent)
  }

  get atsAudit(): AtsAuditResult {
    const audit = analyzeAts(this.data)
    return {
      ...audit,
      helperDrafts: [...this.helperDrafts],
    }
  }

  get matchedKeywords() {
    return this.atsAudit.matchedKeywords
  }

  get missingKeywords() {
    return this.atsAudit.missingKeywords
  }

  get printSections(): PrintSection[] {
    return createPrintSections(this.data)
  }

  get draftsByTarget() {
    return (type: SuggestionDraft['target']['type'], id?: string, locale?: LocaleCode) =>
      this.helperDrafts.filter((draft) => draft.target.type === type && (!id || draft.target.id === id) && (!locale || draft.target.locale === locale))
  }

  isDraftPreviewOpen = (id: string) => this.openDraftIds.includes(id)

  toggleDraftPreview = (id: string) => {
    this.openDraftIds = this.openDraftIds.includes(id) ? this.openDraftIds.filter((item) => item !== id) : [...this.openDraftIds, id]
    this.bumpFormRevision()
  }

  discardDraft = (id: string) => {
    this.helperDrafts = this.helperDrafts.filter((draft) => draft.id !== id)
    this.openDraftIds = this.openDraftIds.filter((item) => item !== id)
    this.bumpFormRevision()
  }

  generateSummaryDrafts = (actionId: string, locale: LocaleCode = this.primaryLocale) => {
    const drafts = createSummaryDrafts(this.data, locale, actionId)
    if (drafts.length === 0) {
      this.setAlert('Bu aksiyon için yeterli veri bulunamadı.', 'error')
      return
    }
    this.replaceDraftsForTarget((draft) => draft.target.type === 'careerObjective' && draft.target.locale === locale, drafts)
    this.showDrafts(drafts)
  }

  generateExperienceDrafts = (collection: 'experience' | 'internships', id: string, actionId: string, locale: LocaleCode = this.primaryLocale) => {
    const item = this.data[collection].find((entry) => entry.id === id)
    if (!item) return
    const drafts = createExperienceDraft(this.data, item, locale, actionId, collection)
    if (drafts.length === 0) {
      this.setAlert('Deneyim kontrol sonucu oluşturulamadı.', 'error')
      return
    }
    this.replaceDraftsForTarget((draft) => draft.target.type === collection && draft.target.id === id && draft.target.locale === locale, drafts)
    this.showDrafts(drafts)
  }

  generateProjectDrafts = (id: string, actionId: string, locale: LocaleCode = this.primaryLocale) => {
    const item = this.data.projects.find((entry) => entry.id === id)
    if (!item) return
    const drafts = createProjectDraft(this.data, item, locale, actionId)
    if (drafts.length === 0) {
      this.setAlert('Proje kontrol sonucu oluşturulamadı.', 'error')
      return
    }
    this.replaceDraftsForTarget((draft) => draft.target.type === 'projects' && draft.target.id === id && draft.target.locale === locale, drafts)
    this.showDrafts(drafts)
  }

  generateJobMatchDrafts = (actionId: string, locale: LocaleCode = this.primaryLocale) => {
    const drafts = createJobMatchDrafts(this.data, locale, actionId)
    if (drafts.length === 0) {
      this.setAlert('İş ilanı bazlı kontrol sonucu oluşturulamadı.', 'error')
      return
    }
    this.replaceDraftsForTarget((draft) => drafts.some((newDraft) => draft.target.type === newDraft.target.type && draft.target.locale === newDraft.target.locale), drafts)
    this.showDrafts(drafts)
  }

  setAlert(message: string, tone: AlertTone = 'info') {
    this.alert.message = message
    this.alert.tone = tone
  }

  clearAlert = () => {
    this.alert.message = ''
  }

  private clearExportTimers = () => {
    if (this.exportProgressTimer !== null) {
      window.clearInterval(this.exportProgressTimer)
      this.exportProgressTimer = null
    }
    if (this.exportFinishTimer !== null) {
      window.clearTimeout(this.exportFinishTimer)
      this.exportFinishTimer = null
    }
  }

  private beginExport = (type: 'pdf' | 'json', message: string) => {
    this.clearExportTimers()
    this.exportState.active = true
    this.exportState.type = type
    this.exportState.message = message
    this.exportState.progress = 12

    this.exportProgressTimer = window.setInterval(() => {
      if (!this.exportState.active) return
      const next = this.exportState.progress + Math.max(2, Math.round((90 - this.exportState.progress) * 0.22))
      this.exportState.progress = Math.min(90, next)
    }, 140)
  }

  private setExportProgress = (progress: number, message?: string) => {
    if (!this.exportState.active) return
    this.exportState.progress = Math.max(this.exportState.progress, Math.min(progress, 100))
    if (message) {
      this.exportState.message = message
    }
  }

  private wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))

  private waitForUiPaint = () =>
    new Promise<void>((resolve) => {
      window.requestAnimationFrame(() => resolve())
    })

  private completeExport = (hideDelay = 260) => {
    this.clearExportTimers()
    this.exportState.progress = 100
    this.exportFinishTimer = window.setTimeout(() => {
      this.exportState.active = false
      this.exportState.type = ''
      this.exportState.message = ''
      this.exportState.progress = 0
    }, hideDelay)
  }

  private failExport = () => {
    this.clearExportTimers()
    this.exportState.active = false
    this.exportState.type = ''
    this.exportState.message = ''
    this.exportState.progress = 0
  }

  goToStep = (index: number) => {
    this.flushFormControlsToStore()
    this.currentStep = index
  }

  nextStep = () => {
    this.flushFormControlsToStore()
    this.currentStep = Math.min(this.currentStep + 1, this.steps.length - 1)
  }

  prevStep = () => {
    this.flushFormControlsToStore()
    this.currentStep = Math.max(this.currentStep - 1, 0)
  }

  updateContact = (field: keyof ContactInfo, value: string) => {
    this.data.contact = { ...this.data.contact, [field]: value }
    this.bumpPreviewRevision()
  }

  updatePersonalDetails = (field: keyof PersonalDetails, value: string | boolean) => {
    this.data.personalDetails = { ...this.data.personalDetails, [field]: value } as PersonalDetails
    this.bumpPreviewRevision()
  }

  updateCareerObjective = (locale: keyof LocalizedText, value: string) => {
    this.data.careerObjective = { ...this.data.careerObjective, [locale]: value }
    this.bumpPreviewRevision()
  }

  addActivity = () => {
    this.data.activities = [...this.data.activities, createActivityItem()]
    this.bumpFormRevision()
  }

  removeActivity = (id: string) => {
    if (this.data.activities.length === 1) return
    this.data.activities = this.data.activities.filter((item) => item.id !== id)
    this.bumpFormRevision()
    this.bumpPreviewRevision()
  }

  updateAtsField = (field: keyof AtsSettings, value: string) => {
    this.data.ats = { ...this.data.ats, [field]: value }
    this.bumpPreviewRevision()
  }

  setOutputLanguage = (value: LocaleCode) => {
    this.data.ats = { ...this.data.ats, outputLanguage: value }
    this.bumpPreviewRevision()
  }

  addEducation = () => {
    this.data.education = [...this.data.education, createEducationItem()]
    this.bumpFormRevision()
  }

  removeEducation = (id: string) => {
    if (this.data.education.length === 1) return
    this.data.education = this.data.education.filter((item) => item.id !== id)
    this.bumpFormRevision()
    this.bumpPreviewRevision()
  }

  addTraining = () => {
    this.data.trainings = [...this.data.trainings, createTrainingItem()]
    this.bumpFormRevision()
  }

  removeTraining = (id: string) => {
    if (this.data.trainings.length === 1) return
    this.data.trainings = this.data.trainings.filter((item) => item.id !== id)
    this.bumpFormRevision()
    this.bumpPreviewRevision()
  }

  addCongress = () => {
    this.data.coursesOrCongresses = [...this.data.coursesOrCongresses, createCongressItem()]
    this.bumpFormRevision()
  }

  removeCongress = (id: string) => {
    if (this.data.coursesOrCongresses.length === 1) return
    this.data.coursesOrCongresses = this.data.coursesOrCongresses.filter((item) => item.id !== id)
    this.bumpFormRevision()
    this.bumpPreviewRevision()
  }

  addExperience = () => {
    this.data.experience = [...this.data.experience, createExperienceItem()]
    this.bumpFormRevision()
  }

  removeExperience = (id: string) => {
    this.data.experience = this.data.experience.filter((item) => item.id !== id)
    this.bumpFormRevision()
    this.bumpPreviewRevision()
  }

  addInternship = () => {
    this.data.internships = [...this.data.internships, createExperienceItem()]
    this.bumpFormRevision()
  }

  removeInternship = (id: string) => {
    this.data.internships = this.data.internships.filter((item) => item.id !== id)
    this.bumpFormRevision()
    this.bumpPreviewRevision()
  }

  addProject = () => {
    this.data.projects = [...this.data.projects, createProjectItem()]
    this.bumpFormRevision()
  }

  removeProject = (id: string) => {
    if (this.data.projects.length === 1) return
    this.data.projects = this.data.projects.filter((item) => item.id !== id)
    this.bumpFormRevision()
    this.bumpPreviewRevision()
  }

  addLanguage = () => {
    this.data.languages = [...this.data.languages, createLanguageItem()]
    this.bumpFormRevision()
  }

  removeLanguage = (id: string) => {
    if (this.data.languages.length === 1) return
    this.data.languages = this.data.languages.filter((item) => item.id !== id)
    this.bumpFormRevision()
    this.bumpPreviewRevision()
  }

  addComputerSkill = () => {
    this.data.computerSkills = [...this.data.computerSkills, createSkillItem()]
    this.bumpFormRevision()
  }

  removeComputerSkill = (id: string) => {
    if (this.data.computerSkills.length === 1) return
    this.data.computerSkills = this.data.computerSkills.filter((item) => item.id !== id)
    this.bumpFormRevision()
    this.bumpPreviewRevision()
  }

  addOtherSkill = () => {
    this.data.otherSkills = [...this.data.otherSkills, createSkillItem()]
    this.bumpFormRevision()
  }

  removeOtherSkill = (id: string) => {
    if (this.data.otherSkills.length === 1) return
    this.data.otherSkills = this.data.otherSkills.filter((item) => item.id !== id)
    this.bumpFormRevision()
    this.bumpPreviewRevision()
  }

  addReference = () => {
    this.data.references = [...this.data.references, createReferenceItem()]
    this.bumpFormRevision()
  }

  removeReference = (id: string) => {
    if (this.data.references.length === 1) return
    this.data.references = this.data.references.filter((item) => item.id !== id)
    this.bumpFormRevision()
    this.bumpPreviewRevision()
  }

  setCollectionCurrentFlag = (key: 'experience' | 'internships' | 'projects', id: string, value: boolean) => {
    this.updateCollectionItem(key, id, (item) => ({
      ...item,
      current: value,
      endDate: value ? '' : item.endDate,
    }))
  }

  setReferencesAvailableOnRequest = (value: boolean) => {
    this.data.referencesAvailableOnRequest = value
    this.bumpPreviewRevision()
  }

  async importFromFile(file: File | null): Promise<boolean> {
    if (!file) return false

    try {
      const text = (await file.text()).replace(/^\uFEFF/, '')
      const parsed = JSON.parse(text) as Partial<CVData>
      const normalizedParsed = normalizeImportedText(parsed)
      const merged = this.mergeWithDefaults(normalizedParsed)

      this.data = merged as CVData
      this.data.experience = [...this.data.experience]
      this.data.internships = [...this.data.internships]
      this.data.projects = [...this.data.projects]
      this.data.education = [...this.data.education]
      this.data.languages = [...this.data.languages]
      this.data.computerSkills = [...this.data.computerSkills]
      this.data.otherSkills = [...this.data.otherSkills]
      this.data.activities = [...this.data.activities]
      this.helperDrafts = []
      this.openDraftIds = []
      this.bumpFormRevision()
      this.bumpPreviewRevision()

      this.setAlert('Taslak başarıyla içe aktarıldı.', 'success')
      return true
    } catch (error) {
      console.error('[IMPORT] Error:', error)
      this.setAlert('Dosya okunamadı. Lütfen geçerli bir JSON taslağı seç.', 'error')
      return false
    }
  }

  exportToJson = async () => {
    this.beginExport('json', 'JSON taslağı hazırlanıyor...')

    try {
      await this.waitForUiPaint()
      this.setExportProgress(24, 'Form verileri güncelleniyor...')
      this.flushFormControlsToStore()
      await this.wait(80)
      this.setExportProgress(52, 'JSON paketi oluşturuluyor...')

      const blob = new Blob(['\uFEFF', JSON.stringify(this.data, null, 2)], { type: 'application/json;charset=utf-8' })
      await this.wait(80)
      this.setExportProgress(78, 'İndirme bağlantısı hazırlanıyor...')
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = 'cv-taslagi.json'
      anchor.click()
      this.setExportProgress(94, 'İndirme başlatılıyor...')
      URL.revokeObjectURL(url)
      await this.wait(120)
      this.setAlert('Taslak JSON olarak indirildi.', 'success')
      this.completeExport()
    } catch (error) {
      console.error(error)
      this.setAlert('JSON dışa aktarma sırasında hata oluştu.', 'error')
      this.failExport()
    }
  }

  printAtsCv = async () => {
    this.beginExport('pdf', 'PDF yazdırma görünümü hazırlanıyor...')
    await this.waitForUiPaint()
    this.setExportProgress(20, 'Form verileri güncelleniyor...')
    this.flushFormControlsToStore()

    const localizedEntries = [
      this.data.careerObjective,
      ...this.data.education.map((item) => item.notes),
      ...this.data.experience.map((item) => item.bullets),
      ...this.data.internships.map((item) => item.bullets),
      ...this.data.projects.map((item) => item.bullets),
      ...this.data.languages.map((item) => item.details),
      ...this.data.computerSkills.map((item) => item.details),
      ...this.data.otherSkills.map((item) => item.details),
    ]
    const trCount = localizedEntries.filter((item) => item.tr.trim()).length
    const enCount = localizedEntries.filter((item) => item.en.trim()).length
    if (this.data.ats.outputLanguage === 'en' && trCount > 0 && enCount === 0) {
      this.data.ats.outputLanguage = 'tr'
    }

    const escapeHtml = (value: string) =>
      value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

    const ensureHttpUrl = (value: string) => {
      if (/^https?:\/\//i.test(value)) return value
      return `https://${value.replace(/^\/\//, '')}`
    }

    const decodeHtmlEntities = (value: string) => {
      const textarea = document.createElement('textarea')
      textarea.innerHTML = value
      return textarea.value
    }

    const normalizeRichTextInput = (value: string) => {
      const decoded = decodeHtmlEntities(value)
      return decoded
        .replace(/<a\b[^>]*href\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))[^>]*>[\s\S]*?<\/a>/gi, (_match, g1, g2, g3) => g1 || g2 || g3 || ' ')
        .replace(/\bhref\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi, (_match, g1, g2, g3) => ` ${g1 || g2 || g3 || ''} `)
        .replace(/<\/?a\b[^>]*>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    }

    const splitTrailingPunctuation = (value: string) => {
      let end = value.length
      while (end > 0 && /[),.;!?]$/.test(value.slice(end - 1, end))) {
        end -= 1
      }
      return {
        core: value.slice(0, end),
        trailing: value.slice(end),
      }
    }

    const createAnchor = (label: string, href: string) => `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`

    const linkifyText = (value: string) => {
      const cleanValue = normalizeRichTextInput(value)
      if (!cleanValue) return ''

      const tokenPattern = /(?:https?:\/\/|www\.)[^\s<>"'|]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
      let html = ''
      let cursor = 0

      for (const match of cleanValue.matchAll(tokenPattern)) {
        const token = match[0]
        const start = match.index ?? 0
        html += escapeHtml(cleanValue.slice(cursor, start))

        const { core, trailing } = splitTrailingPunctuation(token)
        if (!core) {
          html += escapeHtml(token)
          cursor = start + token.length
          continue
        }

        if (core.includes('@')) {
          html += createAnchor(core, `mailto:${core}`)
        } else {
          html += createAnchor(core, ensureHttpUrl(core))
        }

        html += escapeHtml(trailing)
        cursor = start + token.length
      }

      html += escapeHtml(cleanValue.slice(cursor))
      return html
    }

    const fullName = this.data.contact.fullName.trim() || 'Candidate Name'
    const roleText = this.data.ats.targetJobTitle.trim()
    const email = normalizeRichTextInput(this.data.contact.email)
    const phone = normalizeRichTextInput(this.data.contact.phone)
    const city = normalizeRichTextInput(this.data.contact.city)
    const linkedin = normalizeRichTextInput(this.data.contact.linkedin)
    const website = normalizeRichTextInput(this.data.contact.website)
    const contacts = [
      email ? createAnchor(email, `mailto:${email}`) : '',
      phone ? createAnchor(phone, `tel:${phone.replace(/\s+/g, '')}`) : '',
      city ? escapeHtml(city) : '',
      linkedin ? createAnchor(linkedin, ensureHttpUrl(linkedin)) : '',
      website ? createAnchor(website, ensureHttpUrl(website)) : '',
    ].filter(Boolean)
    const sections = this.printSections.filter((section) => section.items.length > 0)
    this.setExportProgress(54, 'PDF şablonu oluşturuluyor...')

    const sectionHtml = sections
      .map((section) => {
        const itemsHtml = section.items
          .map((item) => {
            const bulletsHtml = item.bullets && item.bullets.length > 0 ? `<ul>${item.bullets.map((line) => `<li>${linkifyText(line)}</li>`).join('')}</ul>` : ''
            const textHtml = item.text ? `<p class="text">${linkifyText(item.text)}</p>` : ''
            return `<article class="item">
              <div class="item-head">
                <div>
                  <h4>${escapeHtml(item.heading)}</h4>
                  ${item.subheading ? `<p>${linkifyText(item.subheading)}</p>` : ''}
                </div>
                ${item.meta ? `<span>${linkifyText(item.meta)}</span>` : ''}
              </div>
              ${textHtml}
              ${bulletsHtml}
            </article>`
          })
          .join('')

        return `<section class="section"><h3>${escapeHtml(section.title)}</h3>${itemsHtml}</section>`
      })
      .join('')

    const printDoc = `<!doctype html>
<html lang="${this.data.ats.outputLanguage}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(fullName)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: #111827;
      font: 16px/1.45 Arial, Calibri, Helvetica, Georgia, sans-serif;
      font-weight: 400;
      font-synthesis: none;
      font-variant-ligatures: none;
      font-feature-settings: "liga" 0, "clig" 0;
      text-rendering: geometricPrecision;
      -webkit-font-smoothing: antialiased;
      user-select: text;
      -webkit-user-select: text;
    }
    .page { width: 100%; max-width: 900px; margin: 0 auto; padding: 28px; }
    .header { display: flex; justify-content: space-between; gap: 16px; border-bottom: 1px solid #d1d5db; padding-bottom: 14px; }
    .header h1 { margin: 0; font-size: 34px; line-height: 1.05; }
    .role { margin-top: 8px; font-weight: 700; font-size: 20px; }
    .contact { display: grid; gap: 4px; text-align: right; font-size: 14px; }
    .section { margin-top: 18px; }
    .section h3 { margin: 0 0 10px; padding-bottom: 6px; border-bottom: 1px solid #d1d5db; text-transform: uppercase; letter-spacing: 0.08em; font-size: 14px; }
    .item { margin: 0 0 12px; page-break-inside: avoid; }
    .item-head { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
    .item-head h4 { margin: 0; font-size: 22px; line-height: 1.05; }
    .item-head p, .item-head span, .text { margin: 6px 0 0; color: #374151; }
    ul { margin: 8px 0 0; padding-left: 18px; }
    li { margin: 2px 0; }
    a { color: inherit; text-decoration: underline; text-underline-offset: 2px; word-break: break-word; }
    @page { size: A4; margin: 12mm; }
    @media print {
      .page { max-width: none; padding: 0; }
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="header">
      <div>
        <h1>${escapeHtml(fullName)}</h1>
        ${roleText ? `<p class="role">${escapeHtml(roleText)}</p>` : ''}
      </div>
      <div class="contact">${contacts.map((item) => `<span>${item}</span>`).join('')}</div>
    </header>
    ${sectionHtml}
  </main>
</body>
</html>`
    this.setExportProgress(76, 'Yazdırma penceresi hazırlanıyor...')

    const existingFrame = document.getElementById('ats-print-frame')
    if (existingFrame?.parentNode) {
      existingFrame.parentNode.removeChild(existingFrame)
    }

    const iframe = document.createElement('iframe')
    iframe.id = 'ats-print-frame'
    iframe.setAttribute('aria-hidden', 'true')
    iframe.style.position = 'fixed'
    iframe.style.right = '0'
    iframe.style.bottom = '0'
    iframe.style.width = '0'
    iframe.style.height = '0'
    iframe.style.border = '0'
    iframe.style.opacity = '0'
    document.body.appendChild(iframe)

    const frameWindow = iframe.contentWindow
    const frameDocument = iframe.contentDocument || frameWindow?.document

    if (!frameWindow || !frameDocument) {
      iframe.remove()
      this.setAlert('PDF yazdırma görünümü oluşturulamadı.', 'error')
      this.failExport()
      return
    }

    const cleanup = () => {
      frameWindow.removeEventListener('afterprint', cleanup)
      window.setTimeout(() => {
        iframe.remove()
      }, 150)
    }

    frameDocument.open()
    frameDocument.write(printDoc)
    frameDocument.close()

    const triggerPrint = () => {
      frameWindow.focus()
      window.setTimeout(async () => {
        try {
          this.setExportProgress(100, 'Yazdırma penceresi açılıyor...')
          await this.waitForUiPaint()
          this.completeExport(120)
          frameWindow.print()
        } finally {
          cleanup()
          this.setAlert('PDF yazdırma dokümanı oluşturuldu. Export gerçek metin kullanıyor.', 'success')
        }
      }, 150)
    }

    frameWindow.addEventListener('afterprint', cleanup)

    if (frameDocument.readyState === 'complete') {
      triggerPrint()
    } else {
      iframe.onload = () => triggerPrint()
    }
  }

  setPhotoFromFile = async (file: File | null) => {
    if (!file) return

    try {
      const reader = new FileReader()
      reader.onload = () => {
        this.data.contact.photoDataUrl = typeof reader.result === 'string' ? reader.result : ''
        this.bumpPreviewRevision()
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error(error)
      this.setAlert('Fotoğraf yüklenemedi.', 'error')
    }
  }

  removePhoto = () => {
    this.data.contact.photoDataUrl = ''
    this.bumpPreviewRevision()
  }

  mergeWithDefaults(value: Partial<CVData>) {
    const merged = cloneDefaultData()
    return {
      ...merged,
      ...value,
      contact: { ...merged.contact, ...(value.contact || {}) },
      personalDetails: { ...merged.personalDetails, ...(value.personalDetails || {}) },
      careerObjective: { ...merged.careerObjective, ...(value.careerObjective || {}) },
      activities: (() => {
        const raw = value.activities
        if (Array.isArray(raw)) return raw.map((item) => ({ ...createActivityItem(), ...item }))
        if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
          const old = raw as { interests?: string; memberships?: string; volunteerWork?: string }
          const items: ActivityItem[] = []
          if (old.interests?.trim()) items.push({ ...createActivityItem(), category: 'İlgi alanları', description: old.interests })
          if (old.memberships?.trim()) items.push({ ...createActivityItem(), category: 'Üyelikler', description: old.memberships })
          if (old.volunteerWork?.trim()) items.push({ ...createActivityItem(), category: 'Faaliyetler / Gönüllülük', description: old.volunteerWork })
          return items.length > 0 ? items : merged.activities
        }
        return merged.activities
      })(),
      ats: { ...merged.ats, ...(value.ats || {}), templateId: value.ats?.templateId || 'ats-safe' },
      education: (value.education || merged.education).map((item) => ({
        ...createEducationItem(),
        ...item,
        notes: { ...createLocalizedText(), ...(item.notes || {}) },
      })),
      trainings: (value.trainings || merged.trainings).map((item) => ({ ...createTrainingItem(), ...item })),
      coursesOrCongresses: (value.coursesOrCongresses || merged.coursesOrCongresses).map((item) => ({
        ...createCongressItem(),
        ...item,
      })),
      experience: (value.experience || merged.experience).map((item) => ({
        ...createExperienceItem(),
        ...item,
        bullets: { ...createLocalizedText(), ...(item.bullets || {}) },
      })),
      internships: (value.internships || merged.internships).map((item) => ({
        ...createExperienceItem(),
        ...item,
        bullets: { ...createLocalizedText(), ...(item.bullets || {}) },
      })),
      projects: (value.projects || merged.projects).map((item) => ({
        ...createProjectItem(),
        ...item,
        bullets: { ...createLocalizedText(), ...(item.bullets || {}) },
      })),
      languages: (value.languages || merged.languages).map((item) => ({
        ...createLanguageItem(),
        ...item,
        details: { ...createLocalizedText(), ...(item.details || {}) },
      })),
      computerSkills: (value.computerSkills || merged.computerSkills).map((item) => ({
        ...createSkillItem(),
        ...item,
        details: { ...createLocalizedText(), ...(item.details || {}) },
      })),
      otherSkills: (value.otherSkills || merged.otherSkills).map((item) => ({
        ...createSkillItem(),
        ...item,
        details: { ...createLocalizedText(), ...(item.details || {}) },
      })),
      references: (value.references || merged.references).map((item) => ({ ...createReferenceItem(), ...item })),
    }
  }

  hasContactInfo() {
    const { fullName, email, phone } = this.data.contact
    return !isBlank(fullName) || !isBlank(email) || !isBlank(phone)
  }

  hasCareerObjective() {
    return hasLocalizedText(this.data.careerObjective)
  }

  hasActivities() {
    return this.data.activities.some((item) => !isBlank(item.category) || !isBlank(item.description))
  }

  hasReferences() {
    if (this.data.referencesAvailableOnRequest) return true
    return this.data.references.some((item) => !isBlank(item.fullName) || !isBlank(item.organization) || !isBlank(item.phone))
  }

  hasProjects() {
    return this.data.projects.some((item) => !isBlank(item.name) || !isBlank(item.role) || hasLocalizedText(item.bullets))
  }

  getOutputText = (value: LocalizedText, allowFallback = true) => getLocalizedValue(value, this.data.ats.outputLanguage, allowFallback)

  formatMonth = (value: string, locale: LocaleCode = 'tr') => formatLocalizedMonth(value, locale)

  hasLocalizedText = hasLocalizedText
}

export default new CVStore()

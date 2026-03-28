import { Store } from '@geajs/core'
import { analyzeAts, compareByRecent, createPrintSections, formatMonth as formatLocalizedMonth, getLocalizedValue, type AtsAuditResult, type LocaleCode, type PrintSection } from './ats-utils'

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

export interface ActivitiesInfo {
  interests: string
  memberships: string
  volunteerWork: string
}

export interface AtsSettings {
  targetJobTitle: string
  jobDescription: string
  outputLanguage: LocaleCode
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
  activities: ActivitiesInfo
  references: ReferenceItem[]
  referencesAvailableOnRequest: boolean
  ats: AtsSettings
}

export interface StepMeta {
  id: number
  title: string
  description: string
}

const STEP_META: StepMeta[] = [
  { id: 0, title: 'Kişisel ve iletişim', description: 'İsim, iletişim ve isteğe bağlı ek bilgiler.' },
  { id: 1, title: 'Profesyonel Özet', description: 'Hedef role uygun, ATS dostu özet yaz.' },
  { id: 2, title: 'Eğitim bilgileri', description: 'Ters kronolojik sırayla okul, eğitim ve kongreler.' },
  { id: 3, title: 'İş deneyimi', description: 'Deneyimleri ölçülebilir bullet satırlarıyla gir.' },
  { id: 4, title: 'Projeler', description: 'Yayına alınmış ürünleri, stack ve etkileriyle ekle.' },
  { id: 5, title: 'Beceriler', description: 'Tech stack, diller ve diğer yetkinlikleri grupla.' },
  { id: 6, title: 'Faaliyetler', description: 'İsteğe bağlı ilgiler, üyelikler ve gönüllülük.' },
  { id: 7, title: 'Referanslar', description: 'Veride kalsın ama ATS baskıda gizli olsun.' },
  { id: 8, title: 'ATS kontrol', description: 'Skoru incele, eksikleri gör ve PDF olarak yazdır.' },
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
  activities: {
    interests: '',
    memberships: '',
    volunteerWork: '',
  },
  references: [createReferenceItem()],
  referencesAvailableOnRequest: false,
  ats: {
    targetJobTitle: '',
    jobDescription: '',
    outputLanguage: 'tr',
  },
})

const cloneDefaultData = () => JSON.parse(JSON.stringify(createDefaultData())) as CVData

const isBlank = (value: unknown) => typeof value !== 'string' || value.trim().length === 0

const hasLocalizedText = (value: LocalizedText) => !isBlank(value.tr) || !isBlank(value.en)

class CVStore extends Store {
  steps = STEP_META
  currentStep = 0
  data: CVData = cloneDefaultData()
  alert = {
    message: '',
    tone: 'info' as AlertTone,
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

  get atsAudit(): AtsAuditResult {
    return analyzeAts(this.data)
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

  setAlert(message: string, tone: AlertTone = 'info') {
    this.alert.message = message
    this.alert.tone = tone
  }

  clearAlert = () => {
    this.alert.message = ''
  }

  goToStep = (index: number) => {
    this.currentStep = index
  }

  nextStep = () => {
    this.currentStep = Math.min(this.currentStep + 1, this.steps.length - 1)
  }

  prevStep = () => {
    this.currentStep = Math.max(this.currentStep - 1, 0)
  }

  updateContact = (field: keyof ContactInfo, value: string) => {
    this.data.contact[field] = value
  }

  updatePersonalDetails = (field: keyof PersonalDetails, value: string | boolean) => {
    ;(this.data.personalDetails[field] as string | boolean) = value
  }

  updateLocalizedField = (target: LocalizedText, locale: keyof LocalizedText, value: string) => {
    target[locale] = value
  }

  updateActivities = (field: keyof ActivitiesInfo, value: string) => {
    this.data.activities[field] = value
  }

  updateAtsField = (field: keyof AtsSettings, value: string) => {
    ;(this.data.ats[field] as string) = value
  }

  setOutputLanguage = (value: LocaleCode) => {
    this.data.ats.outputLanguage = value
  }

  addEducation = () => {
    this.data.education.push(createEducationItem())
  }

  removeEducation = (id: string) => {
    if (this.data.education.length === 1) return
    this.data.education = this.data.education.filter((item) => item.id !== id)
  }

  addTraining = () => {
    this.data.trainings.push(createTrainingItem())
  }

  removeTraining = (id: string) => {
    if (this.data.trainings.length === 1) return
    this.data.trainings = this.data.trainings.filter((item) => item.id !== id)
  }

  addCongress = () => {
    this.data.coursesOrCongresses.push(createCongressItem())
  }

  removeCongress = (id: string) => {
    if (this.data.coursesOrCongresses.length === 1) return
    this.data.coursesOrCongresses = this.data.coursesOrCongresses.filter((item) => item.id !== id)
  }

  addExperience = () => {
    this.data.experience.push(createExperienceItem())
  }

  removeExperience = (id: string) => {
    if (this.data.experience.length === 1) return
    this.data.experience = this.data.experience.filter((item) => item.id !== id)
  }

  addInternship = () => {
    this.data.internships.push(createExperienceItem())
  }

  removeInternship = (id: string) => {
    if (this.data.internships.length === 1) return
    this.data.internships = this.data.internships.filter((item) => item.id !== id)
  }

  addProject = () => {
    this.data.projects.push(createProjectItem())
  }

  removeProject = (id: string) => {
    if (this.data.projects.length === 1) return
    this.data.projects = this.data.projects.filter((item) => item.id !== id)
  }

  addLanguage = () => {
    this.data.languages.push(createLanguageItem())
  }

  removeLanguage = (id: string) => {
    if (this.data.languages.length === 1) return
    this.data.languages = this.data.languages.filter((item) => item.id !== id)
  }

  addComputerSkill = () => {
    this.data.computerSkills.push(createSkillItem())
  }

  removeComputerSkill = (id: string) => {
    if (this.data.computerSkills.length === 1) return
    this.data.computerSkills = this.data.computerSkills.filter((item) => item.id !== id)
  }

  addOtherSkill = () => {
    this.data.otherSkills.push(createSkillItem())
  }

  removeOtherSkill = (id: string) => {
    if (this.data.otherSkills.length === 1) return
    this.data.otherSkills = this.data.otherSkills.filter((item) => item.id !== id)
  }

  addReference = () => {
    this.data.references.push(createReferenceItem())
  }

  removeReference = (id: string) => {
    if (this.data.references.length === 1) return
    this.data.references = this.data.references.filter((item) => item.id !== id)
  }

  setCurrentFlag = (item: ExperienceItem | ProjectItem, value: boolean) => {
    item.current = value
    if (value) item.endDate = ''
  }

  setReferencesAvailableOnRequest = (value: boolean) => {
    this.data.referencesAvailableOnRequest = value
  }

  async importFromFile(file: File | null) {
    if (!file) return

    try {
      const text = await file.text()
      const parsed = JSON.parse(text) as Partial<CVData>
      const merged = this.mergeWithDefaults(parsed)
      // Mevcut proxy üzerinden her field'ı ayrı ayrı güncelle;
      // this.data = newObj yapılırsa bileşenler eski proxy referansında kalır.
      ;(Object.keys(merged) as (keyof CVData)[]).forEach((key) => {
        ;(this.data as Record<string, unknown>)[key] = (merged as Record<string, unknown>)[key]
      })
      this.setAlert('Taslak başarıyla içe aktarıldı.', 'success')
    } catch (error) {
      console.error(error)
      this.setAlert('Dosya okunamadı. Lütfen geçerli bir JSON taslağı seç.', 'error')
    }
  }

  exportToJson = () => {
    const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'cv-taslagi.json'
    anchor.click()
    URL.revokeObjectURL(url)
    this.setAlert('Taslak JSON olarak indirildi.', 'success')
  }

  printAtsCv = () => {
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

    const fullName = this.data.contact.fullName.trim() || 'Candidate Name'
    const roleText = this.data.ats.targetJobTitle.trim()
    const contacts = [this.data.contact.email, this.data.contact.phone, this.data.contact.city, this.data.contact.linkedin, this.data.contact.website].filter((value) => value && value.trim())
    const sections = this.printSections.filter((section) => section.items.length > 0)

    const sectionHtml = sections
      .map((section) => {
        const itemsHtml = section.items
          .map((item) => {
            const bulletsHtml = item.bullets && item.bullets.length > 0 ? `<ul>${item.bullets.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}</ul>` : ''
            const textHtml = item.text ? `<p class="text">${escapeHtml(item.text)}</p>` : ''
            return `<article class="item">
              <div class="item-head">
                <div>
                  <h4>${escapeHtml(item.heading)}</h4>
                  ${item.subheading ? `<p>${escapeHtml(item.subheading)}</p>` : ''}
                </div>
                ${item.meta ? `<span>${escapeHtml(item.meta)}</span>` : ''}
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
      font: 16px/1.45 "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-weight: 400;
      font-synthesis: none;
      font-variant-ligatures: none;
      font-feature-settings: "liga" 0, "clig" 0;
      text-rendering: geometricPrecision;
      -webkit-font-smoothing: antialiased;
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
      <div class="contact">${contacts.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div>
    </header>
    ${sectionHtml}
  </main>
</body>
</html>`

    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      window.print()
      this.setAlert('Pop-up engellendi. Tarayıcı yazdırma görünümü açıldı, tekrar deneyebilirsin.', 'error')
      return
    }

    printWindow.document.open()
    printWindow.document.write(printDoc)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    this.setAlert('ATS PDF yazdırma dokümanı oluşturuldu. Önizleme ile aynı bölümler kullanılarak yazdırılıyor.', 'success')
  }

  setPhotoFromFile = async (file: File | null) => {
    if (!file) return

    try {
      const reader = new FileReader()
      reader.onload = () => {
        this.data.contact.photoDataUrl = typeof reader.result === 'string' ? reader.result : ''
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error(error)
      this.setAlert('Fotoğraf yüklenemedi.', 'error')
    }
  }

  removePhoto = () => {
    this.data.contact.photoDataUrl = ''
  }

  mergeWithDefaults(value: Partial<CVData>) {
    const merged = cloneDefaultData()
    return {
      ...merged,
      ...value,
      contact: { ...merged.contact, ...(value.contact || {}) },
      personalDetails: { ...merged.personalDetails, ...(value.personalDetails || {}) },
      careerObjective: { ...merged.careerObjective, ...(value.careerObjective || {}) },
      activities: { ...merged.activities, ...(value.activities || {}) },
      ats: { ...merged.ats, ...(value.ats || {}) },
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
    const { interests, memberships, volunteerWork } = this.data.activities
    return !isBlank(interests) || !isBlank(memberships) || !isBlank(volunteerWork)
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

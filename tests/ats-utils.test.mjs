import test from 'node:test'
import assert from 'node:assert/strict'

import { analyzeAts, compareByRecent, createPrintSections, extractKeywordCandidates, getLocalizedValue } from '../src/ats-utils.ts'

const createData = () => ({
  contact: {
    fullName: 'Mehmet Fiskindal',
    email: 'mehmet@example.com',
    phone: '+90 555 000 00 00',
    address: '',
    city: 'Istanbul',
    linkedin: 'linkedin.com/in/mehmet',
    website: 'fikeyword.app',
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
  careerObjective: {
    tr: '',
    en: 'Flutter Developer who ships production mobile apps with Firebase, REST API integrations, and measurable release outcomes.',
  },
  education: [
    {
      id: 'edu-1',
      school: 'Yildiz Technical University',
      faculty: 'Engineering',
      department: 'Computer Engineering',
      degree: 'BSc',
      startDate: '2018-09',
      endDate: '2022-06',
      gpa: '3.4',
      notes: { tr: '', en: 'Relevant coursework in mobile app development.' },
    },
  ],
  trainings: [{ id: 'training-1', title: 'Mobile CI/CD', provider: 'Acme', date: '2024-08', duration: '8 saat' }],
  coursesOrCongresses: [{ id: 'event-1', title: 'DevFest', location: 'Istanbul', date: '2024-09' }],
  experience: [
    {
      id: 'exp-1',
      company: 'Fikeyword',
      title: 'Flutter Developer',
      startDate: '2023-01',
      endDate: '',
      current: true,
      location: 'Remote',
      bullets: {
        tr: '',
        en: 'Built and released a Flutter mobile app to App Store and Google Play.\nIntegrated Firebase Authentication, Firestore, and REST API flows.\nScaled in-app content to 7,000+ words and improved release quality by 30%.',
      },
    },
  ],
  internships: [],
  projects: [
    {
      id: 'project-1',
      name: 'Fikeyword Mobile App',
      role: 'Product Developer',
      startDate: '2024-01',
      endDate: '',
      current: true,
      url: 'https://fikeyword.app',
      keywords: 'Flutter, Firebase, REST API',
      bullets: {
        tr: '',
        en: 'Published a production mobile app built with Flutter and Firebase.\nImplemented REST API integrations and release workflows.\nManaged the full product lifecycle from design to store submission.',
      },
    },
  ],
  languages: [
    {
      id: 'lang-1',
      name: 'English',
      level: 'C1',
      score: '',
      details: { tr: '', en: 'Professional working proficiency' },
    },
  ],
  computerSkills: [
    {
      id: 'skill-1',
      name: 'Core Stack',
      details: { tr: '', en: 'Flutter, Firebase, REST API, App Store, Google Play' },
    },
  ],
  otherSkills: [
    {
      id: 'skill-2',
      name: 'Delivery',
      details: { tr: '', en: 'CI/CD, release automation and store deployment' },
    },
  ],
  activities: [{ id: 'activity-1', category: 'Community', description: '' }],
  references: [],
  referencesAvailableOnRequest: false,
  ats: {
    targetJobTitle: 'Flutter Developer',
    jobDescription: 'Flutter\nFirebase\nREST API\nCI/CD\nPlay Console',
    outputLanguage: 'en',
    templateId: 'ats-safe',
  },
})

test('extractKeywordCandidates keeps technical phrases', () => {
  const keywords = extractKeywordCandidates('Flutter\nFirebase (Firestore, Cloud Functions)\nREST API\nCI/CD')

  assert.deepEqual(keywords, ['Flutter', 'Firebase', 'Firestore', 'Cloud Functions', 'REST API', 'CI/CD'])
})

test('getLocalizedValue falls back to the other language', () => {
  assert.equal(getLocalizedValue({ tr: '', en: 'English only summary' }, 'tr'), 'English only summary')
  assert.equal(getLocalizedValue({ tr: '', en: 'English only summary' }, 'tr', false), '')
})

test('analyzeAts returns explainable score breakdown and keyword analysis', () => {
  const audit = analyzeAts(createData())

  assert.ok(audit.score > 0)
  assert.ok(audit.scoreBreakdown.length >= 10)
  assert.ok(audit.checks.some((item) => item.code === 'keyword-match'))
  assert.ok(audit.checks.some((item) => item.code === 'layout-risk' && item.status === 'pass'))
  assert.ok(audit.keywordAnalysis.detectedKeywords.includes('Flutter'))
  assert.ok(audit.keywordAnalysis.matches.some((item) => item.keyword === 'Firebase'))
  assert.ok(audit.keywordAnalysis.missing.includes('Play Console'))
  assert.ok(Array.isArray(audit.keywordAnalysis.suggestedSkills))
})

test('analyzeAts flags long paragraph and mixed date formats', () => {
  const data = createData()
  data.careerObjective.en = 'This is a very long paragraph. It keeps going without structure. It keeps adding context without stopping. It becomes difficult to scan because it is one block of text designed to trigger the paragraph rule.'
  data.experience[0].bullets.en = 'Worked on app improvements without strong structure or metrics and without line breaks so that the paragraph remains dense and hard to scan for ATS systems.'
  data.trainings.push({ id: 'training-2', title: 'Another', provider: 'Acme', date: 'August 2024', duration: '2h' })

  const audit = analyzeAts(data)

  assert.equal(audit.checks.find((item) => item.code === 'long-paragraphs')?.status, 'warn')
  assert.notEqual(audit.checks.find((item) => item.code === 'date-consistency')?.status, 'pass')
})

test('analyzeAts penalizes weak action verbs and duplicated skills', () => {
  const data = createData()
  data.experience[0].bullets.en = 'Responsible for mobile work.\nHelped backend team.'
  data.projects[0].keywords = 'Flutter, Flutter, Firebase'
  data.computerSkills[0].name = 'Flutter, Firebase, REST API, CI/CD'

  const audit = analyzeAts(data)

  assert.equal(audit.checks.find((item) => item.code === 'action-verbs')?.status, 'warn')
  assert.notEqual(audit.checks.find((item) => item.code === 'skills-grouping')?.status, 'pass')
})

test('analyzeAts creates correction warnings for low-scoring inputs', () => {
  const data = createData()
  data.contact.email = ''
  data.careerObjective.en = ''
  data.experience[0].bullets.en = 'Worked on app tasks.'

  const audit = analyzeAts(data)

  assert.ok(audit.correctionWarnings.some((item) => item.relatedCheckCode === 'contact-complete'))
  assert.ok(audit.correctionWarnings.some((item) => item.relatedCheckCode === 'summary-present'))
  assert.ok(audit.correctionWarnings.some((item) => item.relatedCheckCode === 'bullet-structure'))
  assert.ok(audit.correctionWarnings.some((item) => item.relatedCheckCode === 'measurable-results'))
})

test('compareByRecent sorts active items first', () => {
  const items = [
    { startDate: '2022-01', endDate: '2023-03', current: false },
    { startDate: '2024-01', endDate: '', current: true },
    { startDate: '2023-04', endDate: '2024-02', current: false },
  ]

  items.sort(compareByRecent)

  assert.deepEqual(items, [
    { startDate: '2024-01', endDate: '', current: true },
    { startDate: '2023-04', endDate: '2024-02', current: false },
    { startDate: '2022-01', endDate: '2023-03', current: false },
  ])
})

test('createPrintSections preserves ATS section order and content', () => {
  const sections = createPrintSections(createData())

  assert.deepEqual(
    sections.map((section) => section.id),
    ['summary', 'skills', 'experience', 'projects', 'education'],
  )
  assert.equal(sections[0].title, 'Professional Summary')
  assert.equal(sections[2].items[0].heading, 'Flutter Developer')
  assert.equal(sections[3].items[0].heading, 'Fikeyword Mobile App')
})

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
    photoDataUrl: 'data:image/png;base64,abc',
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
  trainings: [],
  coursesOrCongresses: [],
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
      name: 'Flutter',
      details: { tr: '', en: 'Firebase, REST API, mobile architecture' },
    },
  ],
  otherSkills: [
    {
      id: 'skill-2',
      name: 'CI/CD',
      details: { tr: '', en: 'Release automation and store deployment' },
    },
  ],
  activities: {
    interests: 'Running',
    memberships: '',
    volunteerWork: '',
  },
  references: [],
  referencesAvailableOnRequest: false,
  ats: {
    targetJobTitle: 'Flutter Developer',
    jobDescription: 'Flutter\nFirebase\nREST API\nCI/CD',
    outputLanguage: 'en',
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

test('analyzeAts reports matched and missing keywords', () => {
  const data = createData()
  data.otherSkills = []

  const audit = analyzeAts(data)

  assert.ok(audit.score > 0)
  assert.deepEqual(audit.matchedKeywords, ['Flutter', 'Firebase', 'REST API'])
  assert.deepEqual(audit.missingKeywords, ['CI/CD'])
  assert.ok(audit.findings.some((item) => item.code === 'missing keyword'))
  assert.ok(audit.findings.some((item) => item.code === 'hidden from ATS print'))
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
  const data = createData()
  const sections = createPrintSections(data)

  assert.deepEqual(
    sections.map((section) => section.id),
    ['summary', 'skills', 'experience', 'projects', 'education'],
  )
  assert.equal(sections[0].title, 'Professional Summary')
  assert.equal(sections[2].items[0].heading, 'Flutter Developer')
  assert.equal(sections[3].items[0].heading, 'Fikeyword Mobile App')
})

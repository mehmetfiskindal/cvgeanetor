import test from 'node:test'
import assert from 'node:assert/strict'

import { createExperienceDraft, createJobMatchDrafts, createSummaryDrafts } from '../src/suggestion-engine.ts'

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
    tr: 'Flutter geliştirici olarak üretim ortamında çalışan mobil uygulamalar geliştiriyorum.',
    en: 'Flutter developer shipping production mobile apps.',
  },
  education: [],
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
        tr: 'Mobil uygulamayı yayına aldım.\nFirebase ve REST API entegrasyonlarını yönettim.\n30% daha iyi release kalitesi sağladım.',
        en: 'Built the mobile app.\nIntegrated Firebase and REST API flows.\nImproved release quality by 30%.',
      },
    },
  ],
  internships: [],
  projects: [
    {
      id: 'project-1',
      name: 'Fikeyword App',
      role: 'Product Developer',
      startDate: '2024-01',
      endDate: '',
      current: true,
      url: 'https://fikeyword.app',
      keywords: 'Flutter, Firebase, REST API',
      bullets: {
        tr: 'Uygulamayı mağazaya çıkardım.',
        en: 'Released the app to the stores.',
      },
    },
  ],
  languages: [],
  computerSkills: [{ id: 'skill-1', name: 'Core Stack', details: { tr: 'Flutter, Firebase', en: 'Flutter, Firebase' } }],
  otherSkills: [{ id: 'skill-2', name: 'Delivery', details: { tr: 'CI/CD', en: 'CI/CD' } }],
  activities: [],
  references: [],
  referencesAvailableOnRequest: false,
  ats: {
    targetJobTitle: 'Flutter Developer',
    jobDescription: 'Flutter\nFirebase\nREST API\nPlay Console',
    outputLanguage: 'en',
    templateId: 'ats-safe',
  },
})

test('createSummaryDrafts returns a diagnostic card for summary length', () => {
  const drafts = createSummaryDrafts(createData(), 'en', 'summary-variants')

  assert.equal(drafts.length, 1)
  assert.equal(drafts[0].payload.kind, 'text')
  assert.match(drafts[0].title, /Summary length check/)
  assert.match(drafts[0].payload.text, /Summary field is filled\./)
})

test('createExperienceDraft returns STAR diagnostics instead of rewritten content', () => {
  const data = createData()
  const draft = createExperienceDraft(data, data.experience[0], 'en', 'experience-star')[0]

  assert.equal(draft.payload.kind, 'text')
  assert.match(draft.title, /STAR check/)
  assert.match(draft.payload.text, /A metric exists to support the result part\./)
})

test('createJobMatchDrafts returns skill alignment diagnostics', () => {
  const drafts = createJobMatchDrafts(createData(), 'en', 'job-optimize-skills')

  assert.equal(drafts.length, 1)
  assert.equal(drafts[0].payload.kind, 'text')
  assert.match(drafts[0].title, /Skill alignment check/)
  assert.match(drafts[0].payload.text, /job keywords appear in skills\./)
})

test('createJobMatchDrafts reports TR to EN readiness without claiming translation', () => {
  const drafts = createJobMatchDrafts(createData(), 'tr', 'job-tr-to-en')

  assert.equal(drafts[0].target.locale, 'en')
  assert.match(drafts[0].note, /diagnostic result only/i)
  assert.match(drafts[0].payload.text, /çeviri üretmez/i)
})

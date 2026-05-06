import { expect, test } from '@playwright/test'
import { readFile, writeFile } from 'node:fs/promises'

test('kongre kaydi egitim ve beceriler bolumunde gorunur', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByTestId('congress-card').first()).toBeVisible()
})

test('export edilen json kongre kaydini icerir', async ({ page }, testInfo) => {
  await page.goto('/')

  const title = `Export Kongre ${Date.now()}`
  const congressCard = page.getByTestId('congress-card').first()
  await congressCard.getByLabel('Etkinlik / kongre').fill(title)

  const downloadPromise = page.waitForEvent('download')
  await page.getByTestId('export-json').click()
  const download = await downloadPromise

  const outputPath = testInfo.outputPath('cv-export.json')
  await download.saveAs(outputPath)
  const content = await readFile(outputPath, 'utf-8')

  const normalized = content.replace(/^\uFEFF/, '')
  const parsed = JSON.parse(normalized) as { coursesOrCongresses?: Array<{ title?: string }> }
  expect(parsed.coursesOrCongresses?.some((item) => item.title === title)).toBeTruthy()
})

test('import edilen json aktif taslagi ezerek export edilir', async ({ page }, testInfo) => {
  await page.goto('/')

  await page.getByLabel('Ad Soyad').fill('Eski Taslak Adi')

  const importedName = `Import Kisi ${Date.now()}`
  const importedCongress = `Import Kongre ${Date.now()}`
  const importPath = testInfo.outputPath('cv-import.json')
  await writeFile(
    importPath,
    JSON.stringify({
      contact: {
        fullName: importedName,
        email: 'import@example.com',
        phone: '+90 555 111 22 33',
      },
      coursesOrCongresses: [
        {
          id: 'import-congress',
          title: importedCongress,
          location: 'Istanbul',
          date: '2026-05',
        },
      ],
    }),
    'utf-8',
  )

  await page.locator('.drop-zone-hidden-input').setInputFiles(importPath)
  await expect(page.getByText('Taslak başarıyla içe aktarıldı.')).toBeVisible()

  const downloadPromise = page.waitForEvent('download')
  await page.getByTestId('export-json').click()
  const download = await downloadPromise

  const outputPath = testInfo.outputPath('cv-import-export.json')
  await download.saveAs(outputPath)
  const content = await readFile(outputPath, 'utf-8')

  const parsed = JSON.parse(content.replace(/^\uFEFF/, '')) as {
    contact?: { fullName?: string }
    coursesOrCongresses?: Array<{ title?: string }>
  }
  expect(parsed.contact?.fullName).toBe(importedName)
  expect(parsed.coursesOrCongresses?.some((item) => item.title === importedCongress)).toBeTruthy()
})

test('summary helper kontrol sonucu olusturur ve preview gosterir', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Ad Soyad').fill('Mehmet Fiskindal')
  await page.getByLabel('E-posta').fill('mehmet@example.com')
  await page.getByLabel('Telefon').fill('+90 555 000 00 00')

  await page.getByLabel('Hedef job title').fill('Flutter Developer')
  await page.getByLabel('Job description / keywords').fill('Flutter\nFirebase\nREST API\nPlay Console')

  await page.getByTestId('summary-action-summary-job-rewrite').click()
  await expect(page.getByTestId('suggestion-draft')).toHaveCount(1)

  const previewButton = page.locator('[data-testid^="draft-preview-"]').first()
  await previewButton.click()
  await expect(page.locator('.draft-preview-text')).toBeVisible()
  await expect(page.getByText('Bu kart kontrol sonucudur; metni otomatik değiştirmez.')).toBeVisible()

  await expect(page.locator('[data-testid^="draft-apply-"]')).toHaveCount(0)
})

test('preview renders without object placeholders', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText(/\[object Object\]/)).toHaveCount(0)
  await expect(page.getByText('Canlı önizleme')).toBeVisible()
})

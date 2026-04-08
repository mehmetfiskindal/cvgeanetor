import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

test('kongre kaydi yeni egitim ve beceriler adiminda eklenir', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('step-4').click()

  const beforeCount = await page.getByTestId('congress-card').count()
  await page.getByTestId('add-congress').click()
  await expect(page.getByTestId('congress-card')).toHaveCount(beforeCount + 1)
})

test('export edilen json kongre kaydini icerir', async ({ page }, testInfo) => {
  await page.goto('/')

  await page.getByTestId('step-4').click()

  const title = `Export Kongre ${Date.now()}`
  await page.getByTestId('congress-title').first().fill(title)
  await page.getByTestId('congress-location').first().fill('Ankara')
  await page.getByTestId('congress-date').first().fill('2026-04')

  await page.getByTestId('step-6').click()

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

test('summary helper kontrol sonucu olusturur ve preview gosterir', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('step-0').click()
  await page.getByLabel('Ad Soyad').fill('Mehmet Fiskindal')
  await page.getByLabel('E-posta').fill('mehmet@example.com')
  await page.getByLabel('Telefon').fill('+90 555 000 00 00')

  await page.getByTestId('step-5').click()
  await page.getByLabel('Hedef job title').fill('Flutter Developer')
  await page.getByLabel('Job description / keywords').fill('Flutter\nFirebase\nREST API\nPlay Console')

  await page.getByTestId('step-1').click()
  await page.getByTestId('summary-action-summary-job-rewrite').click()
  await expect(page.getByTestId('suggestion-draft')).toHaveCount(1)

  const previewButton = page.locator('[data-testid^="draft-preview-"]').first()
  await previewButton.click()
  await expect(page.locator('.draft-preview-text')).toBeVisible()
  await expect(page.getByText('Bu kart kontrol sonucudur; metni otomatik değiştirmez.')).toBeVisible()

  await expect(page.locator('[data-testid^="draft-apply-"]')).toHaveCount(0)
})

test('preview step renders numeric critical and warning counts', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('step-6').click()

  await expect(page.getByText(/\[object Object\]/)).toHaveCount(0)
  await expect(page.getByText(/Kritik kontrol:/)).toBeVisible()
  await expect(page.getByText(/Uyarı:/)).toBeVisible()
})

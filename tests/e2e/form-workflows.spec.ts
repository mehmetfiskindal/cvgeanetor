import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

test('kongre kaydi eklenir', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('step-2').click()

  const beforeCount = await page.getByTestId('congress-card').count()
  await page.getByTestId('add-congress').click()
  await expect(page.getByTestId('congress-card')).toHaveCount(beforeCount + 1)
})

test('export edilen json kongre kaydini icerir', async ({ page }, testInfo) => {
  await page.goto('/')

  await page.getByTestId('step-2').click()

  const title = `Export Kongre ${Date.now()}`
  await page.getByTestId('congress-title').first().fill(title)
  await page.getByTestId('congress-location').first().fill('Ankara')
  await page.getByTestId('congress-date').first().fill('2026-04')

  await page.getByTestId('step-8').click()

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

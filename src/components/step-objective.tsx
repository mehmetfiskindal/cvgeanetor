import cvStore from '../cv-store'

export default function StepObjective() {
  const { careerObjective } = cvStore.data

  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Form alanı</p>
          <h2>Professional Summary</h2>
          <p class="section-copy">Başvurduğun pozisyonla uyumlu, kısa ve açık bir özet yaz. ATS için hedef role uygun anahtar kelimeleri doğal şekilde kullan.</p>
        </div>
        <p class="hint-chip">2-4 cümle idealdir.</p>
      </header>

      <div class="grid two-col">
        <label class="field">
          <span>Summary (TR)</span>
          <textarea
            rows="4"
            value={careerObjective.tr}
            input={(event: Event) => cvStore.updateLocalizedField(cvStore.data.careerObjective, 'tr', (event.target as HTMLTextAreaElement).value)}
          />
        </label>
        <label class="field">
          <span>Summary (EN)</span>
          <textarea
            rows="4"
            value={careerObjective.en}
            input={(event: Event) => cvStore.updateLocalizedField(cvStore.data.careerObjective, 'en', (event.target as HTMLTextAreaElement).value)}
          />
        </label>
      </div>
    </div>
  )
}

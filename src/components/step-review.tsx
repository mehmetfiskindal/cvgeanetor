import AtsPrintPreview from './ats-print-preview'
import cvStore from '../cv-store'

const scoreTone = (score: number) => {
  if (score >= 80) return 'is-strong'
  if (score >= 60) return 'is-medium'
  return 'is-weak'
}

export default function StepReview() {
  const audit = cvStore.atsAudit

  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">ATS paneli</p>
          <h2>ATS kontrolü, anahtar kelimeler ve PDF yazdırma</h2>
          <p class="section-copy">Hedef unvan ve ilan metnini gir, eksikleri gör ve tek sütun ATS yazdırma görünümünü PDF olarak kaydet.</p>
        </div>
        <p class="hint-chip">Yazdırma görünümü fotoğrafı, referansları ve opsiyonel kişisel bilgileri otomatik gizler.</p>
      </header>

      <div class="grid two-col">
        <label class="field">
          <span>Hedef job title</span>
          <input value={cvStore.data.ats.targetJobTitle} input={(event: Event) => cvStore.updateAtsField('targetJobTitle', (event.target as HTMLInputElement).value)} placeholder="Flutter Developer" />
        </label>
        <label class="field">
          <span>ATS output language</span>
          <select value={cvStore.data.ats.outputLanguage} change={(event: Event) => cvStore.setOutputLanguage((event.target as HTMLSelectElement).value as 'tr' | 'en')}>
            <option value="en">English output</option>
            <option value="tr">Turkish output</option>
          </select>
        </label>
      </div>

      <label class="field">
        <span>Job description / keywords</span>
        <textarea
          rows="6"
          value={cvStore.data.ats.jobDescription}
          input={(event: Event) => cvStore.updateAtsField('jobDescription', (event.target as HTMLTextAreaElement).value)}
          placeholder={'Flutter\nFirebase\nREST API\nCI/CD'}
        />
      </label>

      <div class="audit-grid">
        <article class={`summary-card score-card ${scoreTone(audit.score)}`}>
          <p class="eyebrow">ATS score</p>
          <strong class="score-value">{audit.score}/100</strong>
          <p>
            Matched keywords: <strong>{audit.matchedKeywords.length}</strong>
          </p>
          <p>
            Missing keywords: <strong>{audit.missingKeywords.length}</strong>
          </p>
          <p>
            Measurable lines: <strong>{audit.measurableLineCount}</strong>
          </p>
        </article>

        <article class="summary-card">
          <p>
            Tamamlanma oranı: <strong>%{cvStore.completionRatio}</strong>
          </p>
          <ul>
            <li>İletişim: {cvStore.hasContactInfo() ? 'Hazır' : 'Eksik'}</li>
            <li>Professional Summary: {cvStore.hasCareerObjective() ? 'Hazır' : 'Eksik'}</li>
            <li>Deneyim: {cvStore.sortedExperience.some((item) => item.company || item.title) ? 'Hazır' : 'Eksik'}</li>
            <li>Projeler: {cvStore.hasProjects() ? 'Hazır' : 'Eksik'}</li>
          </ul>
        </article>
      </div>

      <div class="audit-grid">
        <article class="summary-card">
          <h3 class="subsection-title">Matched Keywords</h3>
          {audit.matchedKeywords.length > 0 ? (
            <div class="chip-row">
              {audit.matchedKeywords.map((keyword) => (
                <span class="chip chip-success" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p class="preview-note">Henüz eşleşen keyword bulunamadı.</p>
          )}
        </article>

        <article class="summary-card">
          <h3 class="subsection-title">Missing Keywords</h3>
          {audit.missingKeywords.length > 0 ? (
            <div class="chip-row">
              {audit.missingKeywords.map((keyword) => (
                <span class="chip chip-warning" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p class="preview-note">Eksik keyword yok ya da ilan metni henüz girilmedi.</p>
          )}
        </article>
      </div>

      <article class="summary-card">
        <h3 class="subsection-title">ATS Findings</h3>
        {audit.findings.length > 0 ? (
          <div class="finding-list">
            {audit.findings.map((item, index) => (
              <article class="finding-card" key={`${item.code}-${index}`}>
                <strong>{item.code}</strong>
                <p>{item.message}</p>
              </article>
            ))}
          </div>
        ) : (
          <p class="preview-note">Acil bir ATS bulgusu yok. Print layout PDF için hazır görünüyor.</p>
        )}
      </article>

      <label class="field">
        <span>JSON taslağı içe aktar</span>
        <input type="file" accept="application/json" change={(event: Event) => cvStore.importFromFile((event.target as HTMLInputElement).files?.[0] || null)} />
      </label>

      <div class="action-row action-row-wrap">
        <button class="button" click={cvStore.printAtsCv}>
          ATS PDF olarak yazdır
        </button>
        <button class="ghost-button" click={cvStore.exportToJson}>
          JSON olarak dışa aktar
        </button>
      </div>

      <div class="ats-preview-wrapper">
        <div class="preview-toolbar">
          <p class="eyebrow">ATS yazdırma önizlemesi</p>
          <span class="preview-note">Tek sütun, standart başlıklar, sade metin odaklı</span>
        </div>
        <AtsPrintPreview />
      </div>
    </div>
  )
}

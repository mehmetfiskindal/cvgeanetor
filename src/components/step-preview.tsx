import AtsPrintPreview from './ats-print-preview'
import cvStore from '../cv-store'

export default function StepPreview() {
  const audit = cvStore.atsAudit
  const criticalCount = audit.checks.reduce((total, item) => total + (item.status === 'fail' ? 1 : 0), 0)
  const warningCount = audit.checks.reduce((total, item) => total + (item.status === 'warn' ? 1 : 0), 0)

  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Adım 7</p>
          <h2>Önizleme + PDF</h2>
          <p class="section-copy">Son kontrolü önizleme üzerinde yap, opsiyonel faaliyet ve referans alanlarını yönet, ardından gerçek metin PDF export al.</p>
        </div>
      </header>

      <div class="audit-grid">
        <article class="summary-card">
          <p>
            Son ATS skoru: <strong>{audit.score}/100</strong>
          </p>
          <p>
            Kritik kontrol: <strong>{criticalCount}</strong>
          </p>
          <p>
            Uyarı: <strong>{warningCount}</strong>
          </p>
        </article>

        <article class="summary-card">
          <h3 class="subsection-title">ATS guardrail’leri</h3>
          <ul class="preview-list">
            {cvStore.templateProfile.guardrails.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <details class="optional-panel">
        <summary>Opsiyonel faaliyet alanı</summary>
        <div class="panel-content">
          <p class="preview-note">Bu alan kayıtta tutulur ama ATS print export içinde görünmez.</p>
          <div class="summary-card compact-card">
            <p>
              Faaliyet kaydı: <strong>{cvStore.data.activities.length}</strong>
            </p>
            <button class="button" click={cvStore.addActivity}>
              Faaliyet ekle
            </button>
          </div>

          {cvStore.data.activities.map((item) => (
            <article class="entry-card" key={item.id}>
              <label class="field">
                <span>Kategori</span>
                <input value={item.category} input={(event: Event) => cvStore.updateCollectionField('activities', item.id, 'category', (event.target as HTMLInputElement).value)} />
              </label>
              <label class="field">
                <span>Açıklama</span>
                <textarea rows="4" value={item.description} input={(event: Event) => cvStore.updateCollectionField('activities', item.id, 'description', (event.target as HTMLTextAreaElement).value)} />
              </label>
              <div class="entry-actions">
                <button class="ghost-button" click={() => cvStore.removeActivity(item.id)}>
                  Kaydı kaldır
                </button>
              </div>
            </article>
          ))}
        </div>
      </details>

      <details class="optional-panel">
        <summary>Opsiyonel referans alanı</summary>
        <div class="panel-content">
          <p class="preview-note">Referans bilgileri export içinde gizlenir; yalnızca kayıt amaçlı tutulur.</p>
          <label class="checkbox-field">
            <input type="checkbox" checked={cvStore.data.referencesAvailableOnRequest} change={(event: Event) => cvStore.setReferencesAvailableOnRequest((event.target as HTMLInputElement).checked)} />
            <span>Referanslar talep edildiğinde paylaşılsın</span>
          </label>

          {!cvStore.data.referencesAvailableOnRequest && (
            <div class="form-stack">
              {cvStore.data.references.map((item) => (
                <article class="entry-card" key={item.id}>
                  <div class="grid two-col">
                    <label class="field">
                      <span>Ad Soyad</span>
                      <input value={item.fullName} input={(event: Event) => cvStore.updateCollectionField('references', item.id, 'fullName', (event.target as HTMLInputElement).value)} />
                    </label>
                    <label class="field">
                      <span>Unvan</span>
                      <input value={item.title} input={(event: Event) => cvStore.updateCollectionField('references', item.id, 'title', (event.target as HTMLInputElement).value)} />
                    </label>
                    <label class="field">
                      <span>Kurum</span>
                      <input value={item.organization} input={(event: Event) => cvStore.updateCollectionField('references', item.id, 'organization', (event.target as HTMLInputElement).value)} />
                    </label>
                    <label class="field">
                      <span>Telefon</span>
                      <input value={item.phone} input={(event: Event) => cvStore.updateCollectionField('references', item.id, 'phone', (event.target as HTMLInputElement).value)} />
                    </label>
                    <label class="field">
                      <span>E-posta</span>
                      <input value={item.email} input={(event: Event) => cvStore.updateCollectionField('references', item.id, 'email', (event.target as HTMLInputElement).value)} />
                    </label>
                  </div>
                  <div class="entry-actions">
                    <button class="ghost-button" click={() => cvStore.removeReference(item.id)}>
                      Kaydı kaldır
                    </button>
                  </div>
                </article>
              ))}

              <button class="button" click={cvStore.addReference}>
                Referans ekle
              </button>
            </div>
          )}
        </div>
      </details>

      <label class="field">
        <span>JSON taslağı içe aktar</span>
        <input type="file" accept="application/json" change={(event: Event) => cvStore.importFromFile((event.target as HTMLInputElement).files?.[0] || null)} />
      </label>

      <div class="action-row action-row-wrap">
        <button class="button" click={cvStore.printAtsCv} disabled={cvStore.exportState.active}>
          {cvStore.exportState.active && cvStore.exportState.type === 'pdf' ? 'PDF hazırlanıyor...' : 'ATS PDF olarak yazdır'}
        </button>
        <button data-testid="export-json" class="ghost-button" click={cvStore.exportToJson} disabled={cvStore.exportState.active}>
          {cvStore.exportState.active && cvStore.exportState.type === 'json' ? 'JSON hazırlanıyor...' : 'JSON olarak dışa aktar'}
        </button>
      </div>
      {cvStore.exportState.active && (
        <div class="export-progress" role="status" aria-live="polite">
          <div class="export-progress-head">
            <span>{cvStore.exportState.message}</span>
            <strong>{cvStore.exportState.progress}%</strong>
          </div>
          <div class="export-progress-track" aria-hidden="true">
            <div class="export-progress-fill" style={{ width: `${cvStore.exportState.progress}%` }} />
          </div>
        </div>
      )}

      <div class="ats-preview-wrapper" data-testid="ats-preview">
        <div class="preview-toolbar">
          <div>
            <p class="eyebrow">CV Preview</p>
            <span class="preview-note">Tek sütun, standart başlıklar, güvenli fontlar ve gerçek metin export</span>
          </div>
        </div>
        <AtsPrintPreview key={`review-preview-${cvStore.previewRevision}`} />
      </div>
    </div>
  )
}

import cvStore from '../cv-store'
import SuggestionDrafts from './suggestion-drafts'

const localeLabel = (locale: 'tr' | 'en') => (locale === 'tr' ? 'TR' : 'EN')

export default function StepObjective() {
  const data = cvStore.draftData || cvStore.data
  const primaryDrafts = cvStore.draftsByTarget('careerObjective', undefined, cvStore.primaryLocale)
  const secondaryDrafts = cvStore.draftsByTarget('careerObjective', undefined, cvStore.secondaryLocale)

  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Adım 2</p>
          <h2>Profesyonel özet</h2>
          <p class="section-copy">Seçili output dilini önce doldur, sonra uzunluk, ilan uyumu ve ton kontrolleriyle özetin eksiklerini net biçimde gör.</p>
        </div>
        <p class="hint-chip">2-4 cümle, net anahtar kelimeler ve mümkünse ölçülebilir etki en iyi sonucu verir.</p>
      </header>

      <article class="entry-card">
        <div class="locale-header">
          <div>
            <strong>Öncelikli dil: {localeLabel(cvStore.primaryLocale)}</strong>
            <p class="preview-note">Bu kontroller metni değiştirmez; sadece eksikleri ve güçlü yanları gösterir.</p>
          </div>
          <div class="chip-row">
            <button class="ghost-button" data-testid="summary-action-summary-variants" click={() => cvStore.generateSummaryDrafts('summary-variants', cvStore.primaryLocale)}>
              Özet uzunluk kontrolü
            </button>
            <button class="ghost-button" data-testid="summary-action-summary-job-rewrite" click={() => cvStore.generateSummaryDrafts('summary-job-rewrite', cvStore.primaryLocale)}>
              İlana uyum kontrolü
            </button>
            <button class="ghost-button" data-testid="summary-action-summary-tone-variants" click={() => cvStore.generateSummaryDrafts('summary-tone-variants', cvStore.primaryLocale)}>
              Ton ve netlik kontrolü
            </button>
          </div>
        </div>

        <label class="field">
          <span>Summary ({localeLabel(cvStore.primaryLocale)})</span>
          <textarea
            rows={5}
            value={data.careerObjective[cvStore.primaryLocale]}
            input={(event: Event) => cvStore.updateDraftCareerObjective(cvStore.primaryLocale, (event.target as HTMLTextAreaElement).value)}
          />
        </label>

        <SuggestionDrafts drafts={primaryDrafts} emptyText="Henüz bu alan için oluşturulmuş bir kontrol sonucu yok." />
      </article>

      <details class="optional-panel">
        <summary>İkincil dil alanı: {localeLabel(cvStore.secondaryLocale)}</summary>
        <div class="panel-content">
          <label class="field">
            <span>Summary ({localeLabel(cvStore.secondaryLocale)})</span>
            <textarea
              rows={5}
              value={data.careerObjective[cvStore.secondaryLocale]}
              input={(event: Event) => cvStore.updateDraftCareerObjective(cvStore.secondaryLocale, (event.target as HTMLTextAreaElement).value)}
            />
          </label>

          <div class="chip-row">
            <button class="ghost-button" click={() => cvStore.generateSummaryDrafts('summary-variants', cvStore.secondaryLocale)}>
              Özet uzunluk kontrolü
            </button>
            <button class="ghost-button" click={() => cvStore.generateSummaryDrafts('summary-job-rewrite', cvStore.secondaryLocale)}>
              İlana uyum kontrolü
            </button>
            <button class="ghost-button" click={() => cvStore.generateSummaryDrafts('summary-tone-variants', cvStore.secondaryLocale)}>
              Ton ve netlik kontrolü
            </button>
          </div>

          <SuggestionDrafts drafts={secondaryDrafts} />
        </div>
      </details>
    </div>
  )
}

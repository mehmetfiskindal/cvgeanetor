import cvStore from '../cv-store'
import SuggestionDrafts from './suggestion-drafts'

const scoreTone = (score: number) => {
  if (score >= 80) return 'is-strong'
  if (score >= 60) return 'is-medium'
  return 'is-weak'
}

const signedDelta = (value: number) => (value > 0 ? `+${value}` : `${value}`)

export default function StepReview() {
  const data = cvStore.draftData || cvStore.data
  const audit = cvStore.atsAudit
  const locale = cvStore.primaryLocale
  const jobDrafts = cvStore.helperDrafts.filter((draft) => draft.actionId.startsWith('job-'))

  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Adım 6</p>
          <h2>İş ilanı eşleştirme</h2>
          <p class="section-copy">Skoru tek sayı olarak değil, nedenleriyle birlikte gör. Bu adım ilan anahtar kelimelerini, eksik eşleşmeleri ve iş ilanına özel kontrol sonuçlarını tek panelde toplar.</p>
        </div>
        <p class="hint-chip">En iyi sonuç için job description satır satır veya virgülle ayrılmış net gereksinimlerle girilmeli.</p>
      </header>

      <div class="grid two-col">
        <label class="field">
          <span>Hedef job title</span>
          <input value={data.ats.targetJobTitle} input={(event: Event) => cvStore.updateDraftAtsField('targetJobTitle', (event.target as HTMLInputElement).value)} placeholder="Flutter Developer" />
        </label>
        <label class="field">
          <span>ATS output language</span>
          <select value={data.ats.outputLanguage} change={(event: Event) => cvStore.setOutputLanguage((event.target as HTMLSelectElement).value as 'tr' | 'en')}>
            <option value="en">English output</option>
            <option value="tr">Turkish output</option>
          </select>
        </label>
      </div>

      <label class="field">
        <span>Job description / keywords</span>
        <textarea
          rows="8"
          value={data.ats.jobDescription}
          input={(event: Event) => cvStore.updateDraftAtsField('jobDescription', (event.target as HTMLTextAreaElement).value)}
          placeholder={'Flutter\nFirebase\nREST API\nApp Store\nPlay Console'}
        />
      </label>

      <div class="audit-grid">
        <article class={`summary-card score-card ${scoreTone(audit.score)}`}>
          <p class="eyebrow">Explainable ATS score</p>
          <strong class="score-value">{audit.score}/100</strong>
          <p>
            Tespit edilen keyword: <strong>{audit.keywordAnalysis.detectedKeywords.length}</strong>
          </p>
          <p>
            Eşleşen keyword: <strong>{audit.keywordAnalysis.matches.length}</strong>
          </p>
          <p>
            Ölçülebilir satır: <strong>{audit.measurableLineCount}</strong>
          </p>
        </article>

        <article class="summary-card">
          <p>
            Export profili: <strong>{audit.templateAudit.profile.name}</strong>
          </p>
          <ul>
            <li>Şablon: {audit.templateAudit.profile.name}</li>
            <li>Font: {audit.templateAudit.profile.safeFonts.join(', ')}</li>
            <li>Tek sütun: {audit.templateAudit.profile.singleColumn ? 'Evet' : 'Hayır'}</li>
            <li>Gerçek metin export: {audit.templateAudit.profile.exportTextBased ? 'Evet' : 'Hayır'}</li>
          </ul>
        </article>
      </div>

      <article class="summary-card">
        <h3 class="subsection-title">Skor kırılımı</h3>
        <div class="score-breakdown-list">
          {audit.scoreBreakdown.map((item) => (
            <article class={`score-breakdown-item status-${item.status}`} key={item.code}>
              <div>
                <strong>{item.label}</strong>
                <p>{item.evidence}</p>
              </div>
              <span>{signedDelta(item.delta)}</span>
            </article>
          ))}
        </div>
      </article>

      <article class="summary-card">
        <h3 class="subsection-title">Düzeltme uyarıları</h3>
        {audit.correctionWarnings.length > 0 ? (
          <div class="finding-list">
            {audit.correctionWarnings.map((warning) => (
              <article class={`finding-card status-${warning.severity === 'critical' ? 'fail' : 'warn'}`} key={warning.id}>
                <strong>{warning.title}</strong>
                <p>
                  <strong>Alan:</strong> {warning.field}
                </p>
                <p>{warning.reason}</p>
                <p>
                  <strong>Ne yapmalı:</strong> {warning.fix}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p class="preview-note">Şu anda düşük puan yaratan kritik bir girdi uyarısı görünmüyor.</p>
        )}
      </article>

      <div class="audit-grid">
        <article class="summary-card">
          <h3 class="subsection-title">İş ilanından tespit edilen anahtar kelimeler</h3>
          {audit.keywordAnalysis.detectedKeywords.length > 0 ? (
            <div class="chip-row">
              {audit.keywordAnalysis.detectedKeywords.map((keyword) => (
                <span class="chip" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p class="preview-note">Henüz tespit edilen keyword yok.</p>
          )}
        </article>

        <article class="summary-card">
          <h3 class="subsection-title">Eksik geçen beceriler</h3>
          {audit.keywordAnalysis.suggestedSkills.length > 0 ? (
            <div class="chip-row">
              {audit.keywordAnalysis.suggestedSkills.map((keyword) => (
                <span class="chip chip-warning" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p class="preview-note">İlanda eksik görünüp skill önerisine dönüşen ek bir beceri yok.</p>
          )}
        </article>
      </div>

      <div class="audit-grid">
        <article class="summary-card">
          <h3 class="subsection-title">CV’de bulunanlar</h3>
          {audit.keywordAnalysis.matches.length > 0 ? (
            <div class="finding-list">
              {audit.keywordAnalysis.matches.map((match) => (
                <article class="finding-card" key={match.keyword}>
                  <strong>{match.keyword}</strong>
                  <p>{match.evidence.join(', ')}</p>
                </article>
              ))}
            </div>
          ) : (
            <p class="preview-note">Henüz eşleşen keyword bulunamadı.</p>
          )}
        </article>

        <article class="summary-card">
          <h3 class="subsection-title">CV’de bulunmayanlar</h3>
          {audit.keywordAnalysis.missing.length > 0 ? (
            <div class="chip-row">
              {audit.keywordAnalysis.missing.map((keyword) => (
                <span class="chip chip-warning" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p class="preview-note">Eksik keyword görünmüyor.</p>
          )}
        </article>
      </div>

      <article class="summary-card">
        <div class="locale-header">
          <div>
            <h3 class="subsection-title">İlana özel kontroller</h3>
            <p class="preview-note">Bu kartlar metni değiştirmez; yalnızca eksikleri ve mevcut eşleşmeleri gösterir. Varsayılan dil: {locale.toUpperCase()}</p>
          </div>
          <div class="chip-row">
            <button class="ghost-button" data-testid="job-action-job-summary-rewrite" click={() => cvStore.generateJobMatchDrafts('job-summary-rewrite', cvStore.primaryLocale)}>
              Özet eşleşmesini kontrol et
            </button>
            <button class="ghost-button" data-testid="job-action-job-optimize-skills" click={() => cvStore.generateJobMatchDrafts('job-optimize-skills', cvStore.primaryLocale)}>
              Beceri eşleşmesini kontrol et
            </button>
            <button class="ghost-button" data-testid="job-action-job-missing-skills" click={() => cvStore.generateJobMatchDrafts('job-missing-skills', cvStore.primaryLocale)}>
              Eksik becerileri listele
            </button>
            <button class="ghost-button" data-testid="job-action-job-tr-to-en" click={() => cvStore.generateJobMatchDrafts('job-tr-to-en', cvStore.primaryLocale)}>
              TR → EN hazırlık kontrolü
            </button>
          </div>
        </div>

        <SuggestionDrafts drafts={jobDrafts} emptyText="Henüz iş ilanına özel bir kontrol sonucu oluşturulmadı." />
      </article>

      <article class="summary-card">
        <h3 class="subsection-title">Kontrol detayları</h3>
        <div class="finding-list">
          {audit.checks.map((check) => (
            <article class={`finding-card status-${check.status}`} key={check.code}>
              <strong>{check.label}</strong>
              <p>{check.summary}</p>
              {check.details.length > 0 && (
                <ul class="preview-list">
                  {check.details.map((detail, index) => (
                    <li key={`${check.code}-${index}`}>{detail}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </article>
    </div>
  )
}

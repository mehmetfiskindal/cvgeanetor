import cvStore from '../cv-store'
import SuggestionDrafts from './suggestion-drafts'

const localeLabel = (locale: 'tr' | 'en') => (locale === 'tr' ? 'TR' : 'EN')

export default function StepExperience() {
  const locale = cvStore.primaryLocale

  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Adım 3</p>
          <h2>Deneyim</h2>
          <p class="section-copy">İş ve staj kayıtlarını tek akışta düzenle. Her kayıt için mikro kontroller ile madde yapısını, profesyonellik düzeyini ve etki sinyallerini kontrol et.</p>
        </div>
        <p class="hint-chip">Tek paragraf yerine en az 2 bullet, mümkünse metrik ve action verb ile yaz.</p>
      </header>

      <div class="summary-card compact-card">
        <p>
          Toplam kayıt: <strong>{cvStore.data.experience.length + cvStore.data.internships.length}</strong>
        </p>
        <div class="entry-actions">
          <button class="button" click={cvStore.addExperience}>
            Bir deneyim daha ekle
          </button>
          <button class="button button-secondary" click={cvStore.addInternship}>
            Staj ekle
          </button>
        </div>
      </div>

      <h3 class="subsection-title">İş deneyimi</h3>
      {cvStore.data.experience.map((item) => (
        <article class="entry-card" key={item.id}>
          <div class="grid two-col">
            <label class="field">
              <span>Pozisyon unvanı</span>
              <input value={item.title} input={(event: Event) => cvStore.updateCollectionField('experience', item.id, 'title', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Kurum</span>
              <input value={item.company} input={(event: Event) => cvStore.updateCollectionField('experience', item.id, 'company', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Lokasyon</span>
              <input value={item.location} input={(event: Event) => cvStore.updateCollectionField('experience', item.id, 'location', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Başlangıç</span>
              <input type="month" value={item.startDate} input={(event: Event) => cvStore.updateCollectionField('experience', item.id, 'startDate', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Bitiş</span>
              <input type="month" value={item.endDate} disabled={item.current} input={(event: Event) => cvStore.updateCollectionField('experience', item.id, 'endDate', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="checkbox-field">
              <input type="checkbox" checked={item.current} change={(event: Event) => cvStore.setCollectionCurrentFlag('experience', item.id, (event.target as HTMLInputElement).checked)} />
              <span>Halen devam ediyor</span>
            </label>
          </div>

          <div class="micro-actions">
            <button class="ghost-button" click={() => cvStore.generateExperienceDrafts('experience', item.id, 'experience-generate-bullets', cvStore.primaryLocale)}>
              Madde yapısını kontrol et
            </button>
            <button class="ghost-button" click={() => cvStore.generateExperienceDrafts('experience', item.id, 'experience-professionalize', cvStore.primaryLocale)}>
              Profesyonellik kontrolü
            </button>
            <button class="ghost-button" click={() => cvStore.generateExperienceDrafts('experience', item.id, 'experience-impact', cvStore.primaryLocale)}>
              Etki odak kontrolü
            </button>
            <button class="ghost-button" click={() => cvStore.generateExperienceDrafts('experience', item.id, 'experience-star', cvStore.primaryLocale)}>
              STAR kontrolü
            </button>
            <button class="ghost-button" click={() => cvStore.generateExperienceDrafts('experience', item.id, 'experience-cleanup', cvStore.primaryLocale)}>
              Zayıf kelime kontrolü
            </button>
          </div>

          <div class="grid two-col">
            <label class="field">
              <span>Bullet satırları ({localeLabel(locale)})</span>
              <textarea rows="6" value={item.bullets[locale]} input={(event: Event) => cvStore.updateCollectionLocalizedField('experience', item.id, 'bullets', cvStore.primaryLocale, (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>İkincil dil ({localeLabel(cvStore.secondaryLocale)})</span>
              <textarea
                rows="6"
                value={item.bullets[cvStore.secondaryLocale]}
                input={(event: Event) => cvStore.updateCollectionLocalizedField('experience', item.id, 'bullets', cvStore.secondaryLocale, (event.target as HTMLTextAreaElement).value)}
              />
            </label>
          </div>

          <SuggestionDrafts drafts={cvStore.draftsByTarget('experience', item.id, locale)} />

          <div class="entry-actions">
            <button class="ghost-button" click={() => cvStore.removeExperience(item.id)}>
              Kaydı kaldır
            </button>
          </div>
        </article>
      ))}

      <h3 class="subsection-title">Stajlar</h3>
      {cvStore.data.internships.map((item) => (
        <article class="entry-card" key={item.id}>
          <div class="grid two-col">
            <label class="field">
              <span>Staj unvanı</span>
              <input value={item.title} input={(event: Event) => cvStore.updateCollectionField('internships', item.id, 'title', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Kurum</span>
              <input value={item.company} input={(event: Event) => cvStore.updateCollectionField('internships', item.id, 'company', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Lokasyon</span>
              <input value={item.location} input={(event: Event) => cvStore.updateCollectionField('internships', item.id, 'location', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Başlangıç</span>
              <input type="month" value={item.startDate} input={(event: Event) => cvStore.updateCollectionField('internships', item.id, 'startDate', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Bitiş</span>
              <input type="month" value={item.endDate} disabled={item.current} input={(event: Event) => cvStore.updateCollectionField('internships', item.id, 'endDate', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="checkbox-field">
              <input type="checkbox" checked={item.current} change={(event: Event) => cvStore.setCollectionCurrentFlag('internships', item.id, (event.target as HTMLInputElement).checked)} />
              <span>Halen devam ediyor</span>
            </label>
          </div>

          <div class="micro-actions">
            <button class="ghost-button" click={() => cvStore.generateExperienceDrafts('internships', item.id, 'experience-generate-bullets', cvStore.primaryLocale)}>
              Madde yapısını kontrol et
            </button>
            <button class="ghost-button" click={() => cvStore.generateExperienceDrafts('internships', item.id, 'experience-professionalize', cvStore.primaryLocale)}>
              Profesyonellik kontrolü
            </button>
            <button class="ghost-button" click={() => cvStore.generateExperienceDrafts('internships', item.id, 'experience-impact', cvStore.primaryLocale)}>
              Etki odak kontrolü
            </button>
            <button class="ghost-button" click={() => cvStore.generateExperienceDrafts('internships', item.id, 'experience-star', cvStore.primaryLocale)}>
              STAR kontrolü
            </button>
            <button class="ghost-button" click={() => cvStore.generateExperienceDrafts('internships', item.id, 'experience-cleanup', cvStore.primaryLocale)}>
              Zayıf kelime kontrolü
            </button>
          </div>

          <div class="grid two-col">
            <label class="field">
              <span>Bullet satırları ({localeLabel(locale)})</span>
              <textarea rows="6" value={item.bullets[locale]} input={(event: Event) => cvStore.updateCollectionLocalizedField('internships', item.id, 'bullets', cvStore.primaryLocale, (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>İkincil dil ({localeLabel(cvStore.secondaryLocale)})</span>
              <textarea
                rows="6"
                value={item.bullets[cvStore.secondaryLocale]}
                input={(event: Event) => cvStore.updateCollectionLocalizedField('internships', item.id, 'bullets', cvStore.secondaryLocale, (event.target as HTMLTextAreaElement).value)}
              />
            </label>
          </div>

          <SuggestionDrafts drafts={cvStore.draftsByTarget('internships', item.id, locale)} />

          <div class="entry-actions">
            <button class="ghost-button" click={() => cvStore.removeInternship(item.id)}>
              Kaydı kaldır
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

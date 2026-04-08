import cvStore from '../cv-store'
import SuggestionDrafts from './suggestion-drafts'

const localeLabel = (locale: 'tr' | 'en') => (locale === 'tr' ? 'TR' : 'EN')

export default function StepProjects() {
  const locale = cvStore.primaryLocale

  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Adım 4</p>
          <h2>Projeler</h2>
          <p class="section-copy">Projeleri ATS için yayın, stack, platform ve etki açısından açıkça yaz. App Store, Play Console, Firebase veya REST API gibi kelimeleri doğal biçimde görünür tut.</p>
        </div>
        <p class="hint-chip">Her proje için yayın linki, anahtar kelimeler ve sonuç odaklı bullet seti en değerli sinyallerden biri.</p>
      </header>

      {cvStore.data.projects.map((item) => (
        <article class="entry-card" key={item.id}>
          <div class="grid two-col">
            <label class="field">
              <span>Proje adı</span>
              <input value={item.name} input={(event: Event) => cvStore.updateCollectionField('projects', item.id, 'name', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Rolün</span>
              <input value={item.role} input={(event: Event) => cvStore.updateCollectionField('projects', item.id, 'role', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Başlangıç</span>
              <input type="month" value={item.startDate} input={(event: Event) => cvStore.updateCollectionField('projects', item.id, 'startDate', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Bitiş</span>
              <input type="month" value={item.endDate} disabled={item.current} input={(event: Event) => cvStore.updateCollectionField('projects', item.id, 'endDate', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Proje linki</span>
              <input value={item.url} input={(event: Event) => cvStore.updateCollectionField('projects', item.id, 'url', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Anahtar kelimeler</span>
              <input value={item.keywords} input={(event: Event) => cvStore.updateCollectionField('projects', item.id, 'keywords', (event.target as HTMLInputElement).value)} placeholder="Flutter, Firebase, REST API, App Store" />
            </label>
            <label class="checkbox-field">
              <input type="checkbox" checked={item.current} change={(event: Event) => cvStore.setCollectionCurrentFlag('projects', item.id, (event.target as HTMLInputElement).checked)} />
              <span>Halen devam ediyor</span>
            </label>
          </div>

          <div class="micro-actions">
            <button class="ghost-button" click={() => cvStore.generateProjectDrafts(item.id, 'project-generate-bullets', cvStore.primaryLocale)}>
              Madde yapısını kontrol et
            </button>
            <button class="ghost-button" click={() => cvStore.generateProjectDrafts(item.id, 'project-professionalize', cvStore.primaryLocale)}>
              Profesyonellik kontrolü
            </button>
            <button class="ghost-button" click={() => cvStore.generateProjectDrafts(item.id, 'project-impact', cvStore.primaryLocale)}>
              Etki odak kontrolü
            </button>
            <button class="ghost-button" click={() => cvStore.generateProjectDrafts(item.id, 'project-star', cvStore.primaryLocale)}>
              STAR kontrolü
            </button>
            <button class="ghost-button" click={() => cvStore.generateProjectDrafts(item.id, 'project-cleanup', cvStore.primaryLocale)}>
              Zayıf kelime kontrolü
            </button>
          </div>

          <div class="grid two-col">
            <label class="field">
              <span>Katkılar ve sonuç ({localeLabel(locale)})</span>
              <textarea rows="6" value={item.bullets[locale]} input={(event: Event) => cvStore.updateCollectionLocalizedField('projects', item.id, 'bullets', cvStore.primaryLocale, (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>İkincil dil ({localeLabel(cvStore.secondaryLocale)})</span>
              <textarea
                rows="6"
                value={item.bullets[cvStore.secondaryLocale]}
                input={(event: Event) => cvStore.updateCollectionLocalizedField('projects', item.id, 'bullets', cvStore.secondaryLocale, (event.target as HTMLTextAreaElement).value)}
              />
            </label>
          </div>

          <SuggestionDrafts drafts={cvStore.draftsByTarget('projects', item.id, locale)} />

          <div class="entry-actions">
            <button class="ghost-button" click={() => cvStore.removeProject(item.id)}>
              Kaydı kaldır
            </button>
          </div>
        </article>
      ))}

      <button class="button" click={cvStore.addProject}>
        Proje ekle
      </button>
    </div>
  )
}

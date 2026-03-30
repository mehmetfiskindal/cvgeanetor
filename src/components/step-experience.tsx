import cvStore from '../cv-store'

export default function StepExperience() {
  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Form alanı</p>
          <h2>İş ve staj deneyimi</h2>
          <p class="section-copy">Her işyeri için ayrı bir kart ekle. 2-3 farklı yerde çalıştıysan her birini ayrı deneyim olarak yaz; önizleme ters kronolojik olarak sıralar.</p>
        </div>
        <p class="hint-chip">Birden fazla iş deneyimi ekleyebilirsin; her kart ayrı sıralanır ve ATS çıktısında tek tek görünür.</p>
      </header>

      <div class="summary-card compact-card">
        <p>
          İş deneyimi kaydı: <strong>{cvStore.data.experience.length}</strong>
        </p>
        <button class="button" click={cvStore.addExperience}>
          Yeni iş deneyimi ekle
        </button>
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

          <div class="grid two-col">
            <label class="field">
              <span>Sorumluluklar ve katkılar (TR)</span>
              <textarea rows="5" value={item.bullets.tr} input={(event: Event) => cvStore.updateCollectionLocalizedField('experience', item.id, 'bullets', 'tr', (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>Sorumluluklar ve katkılar (EN)</span>
              <textarea rows="5" value={item.bullets.en} input={(event: Event) => cvStore.updateCollectionLocalizedField('experience', item.id, 'bullets', 'en', (event.target as HTMLTextAreaElement).value)} />
            </label>
          </div>

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

          <div class="grid two-col">
            <label class="field">
              <span>Sorumluluklar ve katkılar (TR)</span>
              <textarea rows="5" value={item.bullets.tr} input={(event: Event) => cvStore.updateCollectionLocalizedField('internships', item.id, 'bullets', 'tr', (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>Sorumluluklar ve katkılar (EN)</span>
              <textarea rows="5" value={item.bullets.en} input={(event: Event) => cvStore.updateCollectionLocalizedField('internships', item.id, 'bullets', 'en', (event.target as HTMLTextAreaElement).value)} />
            </label>
          </div>

          <div class="entry-actions">
            <button class="ghost-button" click={() => cvStore.removeInternship(item.id)}>
              Kaydı kaldır
            </button>
          </div>
        </article>
      ))}
      <button class="button button-secondary" click={cvStore.addInternship}>
        Staj ekle
      </button>
    </div>
  )
}



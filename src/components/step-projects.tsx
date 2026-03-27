import cvStore from '../cv-store'

export default function StepProjects() {
  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Form alani</p>
          <h2>Projeler</h2>
          <p class="section-copy">ATS icin urun, yayin, stack ve olculebilir etkiyi ayri proje kartlarinda topla.</p>
        </div>
        <p class="hint-chip">Ozellikle App Store, Google Play ve uretimde kullandigin stack kelimelerini aynen yaz.</p>
      </header>

      {cvStore.data.projects.map((item) => (
        <article class="entry-card" key={item.id}>
          <div class="grid two-col">
            <label class="field">
              <span>Proje adi</span>
              <input value={item.name} input={(event: Event) => (item.name = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Rolun</span>
              <input value={item.role} input={(event: Event) => (item.role = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Baslangic</span>
              <input type="month" value={item.startDate} input={(event: Event) => (item.startDate = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Bitis</span>
              <input type="month" value={item.endDate} disabled={item.current} input={(event: Event) => (item.endDate = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Proje linki</span>
              <input value={item.url} input={(event: Event) => (item.url = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Anahtar kelimeler</span>
              <input value={item.keywords} input={(event: Event) => (item.keywords = (event.target as HTMLInputElement).value)} placeholder="Flutter, Firebase, REST API, CI/CD" />
            </label>
            <label class="checkbox-field">
              <input type="checkbox" checked={item.current} change={(event: Event) => cvStore.setCurrentFlag(item, (event.target as HTMLInputElement).checked)} />
              <span>Halen devam ediyor</span>
            </label>
          </div>

          <div class="grid two-col">
            <label class="field">
              <span>Katkilar ve sonuc (TR)</span>
              <textarea rows="5" value={item.bullets.tr} input={(event: Event) => cvStore.updateLocalizedField(item.bullets, 'tr', (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>Katkilar ve sonuc (EN)</span>
              <textarea rows="5" value={item.bullets.en} input={(event: Event) => cvStore.updateLocalizedField(item.bullets, 'en', (event.target as HTMLTextAreaElement).value)} />
            </label>
          </div>

          <div class="entry-actions">
            <button class="ghost-button" click={() => cvStore.removeProject(item.id)}>
              Kaydi kaldir
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

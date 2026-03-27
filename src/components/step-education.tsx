import cvStore from '../cv-store'

export default function StepEducation() {
  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Form alani</p>
          <h2>Egitim bilgileri</h2>
          <p class="section-copy">Okul bilgilerini ters kronolojik sirayla gir. Alinan egitimler ve kongreleri ayri kartlar halinde ekleyebilirsin.</p>
        </div>
        <p class="hint-chip">Yeni mezunsan ilgili dersleri ve basarilari notlarda belirt.</p>
      </header>

      {cvStore.data.education.map((item) => (
        <article class="entry-card" key={item.id}>
          <div class="grid two-col">
            <label class="field">
              <span>Okul</span>
              <input value={item.school} input={(event: Event) => (item.school = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Derece</span>
              <input value={item.degree} input={(event: Event) => (item.degree = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Fakulte</span>
              <input value={item.faculty} input={(event: Event) => (item.faculty = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Bolum</span>
              <input value={item.department} input={(event: Event) => (item.department = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Baslangic</span>
              <input type="month" value={item.startDate} input={(event: Event) => (item.startDate = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Bitis</span>
              <input type="month" value={item.endDate} input={(event: Event) => (item.endDate = (event.target as HTMLInputElement).value)} />
            </label>
          </div>

          <label class="field">
            <span>Genel not ortalamasi</span>
            <input value={item.gpa} input={(event: Event) => (item.gpa = (event.target as HTMLInputElement).value)} />
          </label>

          <div class="grid two-col">
            <label class="field">
              <span>Notlar / ilgili dersler (TR)</span>
              <textarea rows="4" value={item.notes.tr} input={(event: Event) => cvStore.updateLocalizedField(item.notes, 'tr', (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>Notlar / ilgili dersler (EN)</span>
              <textarea rows="4" value={item.notes.en} input={(event: Event) => cvStore.updateLocalizedField(item.notes, 'en', (event.target as HTMLTextAreaElement).value)} />
            </label>
          </div>

          <div class="entry-actions">
            <button class="ghost-button" click={() => cvStore.removeEducation(item.id)}>
              Kaydi kaldir
            </button>
          </div>
        </article>
      ))}
      <button class="button" click={cvStore.addEducation}>
        Egitim kaydi ekle
      </button>

      <h3 class="subsection-title">Alinan egitimler</h3>
      {cvStore.data.trainings.map((item) => (
        <article class="entry-card" key={item.id}>
          <div class="grid two-col">
            <label class="field">
              <span>Egitim</span>
              <input value={item.title} input={(event: Event) => (item.title = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Kurum</span>
              <input value={item.provider} input={(event: Event) => (item.provider = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Tarih</span>
              <input value={item.date} input={(event: Event) => (item.date = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Sure</span>
              <input value={item.duration} input={(event: Event) => (item.duration = (event.target as HTMLInputElement).value)} />
            </label>
          </div>
          <div class="entry-actions">
            <button class="ghost-button" click={() => cvStore.removeTraining(item.id)}>
              Kaydi kaldir
            </button>
          </div>
        </article>
      ))}
      <button class="button button-secondary" click={cvStore.addTraining}>
        Egitim ekle
      </button>

      <h3 class="subsection-title">Kongreler ve etkinlikler</h3>
      {cvStore.data.coursesOrCongresses.map((item) => (
        <article class="entry-card" key={item.id}>
          <div class="grid two-col">
            <label class="field">
              <span>Etkinlik / kongre</span>
              <input value={item.title} input={(event: Event) => (item.title = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Konum</span>
              <input value={item.location} input={(event: Event) => (item.location = (event.target as HTMLInputElement).value)} />
            </label>
          </div>
          <label class="field">
            <span>Tarih</span>
            <input value={item.date} input={(event: Event) => (item.date = (event.target as HTMLInputElement).value)} />
          </label>
          <div class="entry-actions">
            <button class="ghost-button" click={() => cvStore.removeCongress(item.id)}>
              Kaydi kaldir
            </button>
          </div>
        </article>
      ))}
      <button class="button button-secondary" click={cvStore.addCongress}>
        Kongre ekle
      </button>
    </div>
  )
}

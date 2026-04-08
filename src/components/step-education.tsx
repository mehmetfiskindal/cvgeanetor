import cvStore from '../cv-store'

const localeLabel = (locale: 'tr' | 'en') => (locale === 'tr' ? 'TR' : 'EN')

export default function StepEducation() {
  const primaryLocale = cvStore.primaryLocale
  const secondaryLocale = cvStore.secondaryLocale

  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Adım 5</p>
          <h2>Eğitim ve beceriler</h2>
          <p class="section-copy">Eğitim, kurslar ve beceri gruplarını tek adımda topla. Bu alanın amacı ATS’ye “neleri bildiğini” temiz başlıklar ve tekrar etmeyen skill bloklarıyla göstermek.</p>
        </div>
        <p class="hint-chip">Yoğun virgüllü uzun skill satırları yerine grup başlığı + kısa açıklama düzeni daha okunaklıdır.</p>
      </header>

      <h3 class="subsection-title">Eğitim bilgileri</h3>
      <div key={`education-list-${cvStore.formRevision}`}>
        {cvStore.data.education.map((item) => (
          <article class="entry-card" key={item.id}>
            <div class="grid two-col">
              <label class="field">
                <span>Okul</span>
                <input value={item.school} input={(event: Event) => cvStore.updateCollectionField('education', item.id, 'school', (event.target as HTMLInputElement).value)} />
              </label>
              <label class="field">
                <span>Derece</span>
                <input value={item.degree} input={(event: Event) => cvStore.updateCollectionField('education', item.id, 'degree', (event.target as HTMLInputElement).value)} />
              </label>
              <label class="field">
                <span>Fakülte</span>
                <input value={item.faculty} input={(event: Event) => cvStore.updateCollectionField('education', item.id, 'faculty', (event.target as HTMLInputElement).value)} />
              </label>
              <label class="field">
                <span>Bölüm</span>
                <input value={item.department} input={(event: Event) => cvStore.updateCollectionField('education', item.id, 'department', (event.target as HTMLInputElement).value)} />
              </label>
              <label class="field">
                <span>Başlangıç</span>
                <input type="month" value={item.startDate} input={(event: Event) => cvStore.updateCollectionField('education', item.id, 'startDate', (event.target as HTMLInputElement).value)} />
              </label>
              <label class="field">
                <span>Bitiş</span>
                <input type="month" value={item.endDate} input={(event: Event) => cvStore.updateCollectionField('education', item.id, 'endDate', (event.target as HTMLInputElement).value)} />
              </label>
            </div>

            <label class="field">
              <span>Genel not ortalaması</span>
              <input value={item.gpa} input={(event: Event) => cvStore.updateCollectionField('education', item.id, 'gpa', (event.target as HTMLInputElement).value)} />
            </label>

            <div class="grid two-col">
              <label class="field">
                <span>Notlar / ilgili dersler ({localeLabel(primaryLocale)})</span>
                <textarea rows="4" value={item.notes[primaryLocale]} input={(event: Event) => cvStore.updateCollectionLocalizedField('education', item.id, 'notes', cvStore.primaryLocale, (event.target as HTMLTextAreaElement).value)} />
              </label>
              <label class="field">
                <span>İkincil dil ({localeLabel(secondaryLocale)})</span>
                <textarea rows="4" value={item.notes[secondaryLocale]} input={(event: Event) => cvStore.updateCollectionLocalizedField('education', item.id, 'notes', cvStore.secondaryLocale, (event.target as HTMLTextAreaElement).value)} />
              </label>
            </div>

            <div class="entry-actions">
              <button class="ghost-button" click={() => cvStore.removeEducation(item.id)}>
                Kaydı kaldır
              </button>
            </div>
          </article>
        ))}
      </div>
      <button class="button" click={cvStore.addEducation}>
        Eğitim kaydı ekle
      </button>

      <h3 class="subsection-title">Alınan eğitimler</h3>
      <div key={`training-list-${cvStore.formRevision}`}>
        {cvStore.data.trainings.map((item) => (
          <article class="entry-card" key={item.id}>
            <div class="grid two-col">
              <label class="field">
                <span>Eğitim</span>
                <input value={item.title} input={(event: Event) => cvStore.updateCollectionField('trainings', item.id, 'title', (event.target as HTMLInputElement).value)} />
              </label>
              <label class="field">
                <span>Kurum</span>
                <input value={item.provider} input={(event: Event) => cvStore.updateCollectionField('trainings', item.id, 'provider', (event.target as HTMLInputElement).value)} />
              </label>
              <label class="field">
                <span>Tarih</span>
                <input value={item.date} input={(event: Event) => cvStore.updateCollectionField('trainings', item.id, 'date', (event.target as HTMLInputElement).value)} />
              </label>
              <label class="field">
                <span>Süre</span>
                <input value={item.duration} input={(event: Event) => cvStore.updateCollectionField('trainings', item.id, 'duration', (event.target as HTMLInputElement).value)} />
              </label>
            </div>
            <div class="entry-actions">
              <button class="ghost-button" click={() => cvStore.removeTraining(item.id)}>
                Kaydı kaldır
              </button>
            </div>
          </article>
        ))}
      </div>
      <button class="button button-secondary" click={cvStore.addTraining}>
        Eğitim ekle
      </button>

      <h3 class="subsection-title">Kongreler ve etkinlikler</h3>
      <div key={`congress-list-${cvStore.formRevision}`}>
        {cvStore.data.coursesOrCongresses.map((item) => (
          <article class="entry-card" data-testid="congress-card" key={item.id}>
            <div class="grid two-col">
              <label class="field">
                <span>Etkinlik / kongre</span>
                <input data-testid="congress-title" value={item.title} input={(event: Event) => cvStore.updateCollectionField('coursesOrCongresses', item.id, 'title', (event.target as HTMLInputElement).value)} />
              </label>
              <label class="field">
                <span>Konum</span>
                <input data-testid="congress-location" value={item.location} input={(event: Event) => cvStore.updateCollectionField('coursesOrCongresses', item.id, 'location', (event.target as HTMLInputElement).value)} />
              </label>
            </div>
            <label class="field">
              <span>Tarih</span>
              <input data-testid="congress-date" value={item.date} input={(event: Event) => cvStore.updateCollectionField('coursesOrCongresses', item.id, 'date', (event.target as HTMLInputElement).value)} />
            </label>
            <div class="entry-actions">
              <button class="ghost-button" click={() => cvStore.removeCongress(item.id)}>
                Kaydı kaldır
              </button>
            </div>
          </article>
        ))}
      </div>
      <button data-testid="add-congress" class="button button-secondary" click={cvStore.addCongress}>
        Kongre ekle
      </button>

      <h3 class="subsection-title">Yabancı diller</h3>
      {cvStore.data.languages.map((item) => (
        <article class="entry-card" key={item.id}>
          <div class="grid two-col">
            <label class="field">
              <span>Dil</span>
              <input value={item.name} input={(event: Event) => cvStore.updateCollectionField('languages', item.id, 'name', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Seviye</span>
              <input value={item.level} input={(event: Event) => cvStore.updateCollectionField('languages', item.id, 'level', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Skor / belge</span>
              <input value={item.score} input={(event: Event) => cvStore.updateCollectionField('languages', item.id, 'score', (event.target as HTMLInputElement).value)} />
            </label>
          </div>

          <div class="grid two-col">
            <label class="field">
              <span>Açıklama ({localeLabel(primaryLocale)})</span>
              <textarea rows="4" value={item.details[primaryLocale]} input={(event: Event) => cvStore.updateCollectionLocalizedField('languages', item.id, 'details', cvStore.primaryLocale, (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>İkincil dil ({localeLabel(secondaryLocale)})</span>
              <textarea rows="4" value={item.details[secondaryLocale]} input={(event: Event) => cvStore.updateCollectionLocalizedField('languages', item.id, 'details', cvStore.secondaryLocale, (event.target as HTMLTextAreaElement).value)} />
            </label>
          </div>

          <div class="entry-actions">
            <button class="ghost-button" click={() => cvStore.removeLanguage(item.id)}>
              Kaydı kaldır
            </button>
          </div>
        </article>
      ))}
      <button class="button" click={cvStore.addLanguage}>
        Dil ekle
      </button>

      <h3 class="subsection-title">Bilgisayar becerileri</h3>
      {cvStore.data.computerSkills.map((item) => (
        <article class="entry-card" key={item.id}>
          <label class="field">
            <span>Grup başlığı</span>
            <input value={item.name} input={(event: Event) => cvStore.updateCollectionField('computerSkills', item.id, 'name', (event.target as HTMLInputElement).value)} />
          </label>
          <div class="grid two-col">
            <label class="field">
              <span>Açıklama ({localeLabel(primaryLocale)})</span>
              <textarea rows="4" value={item.details[primaryLocale]} input={(event: Event) => cvStore.updateCollectionLocalizedField('computerSkills', item.id, 'details', cvStore.primaryLocale, (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>İkincil dil ({localeLabel(secondaryLocale)})</span>
              <textarea rows="4" value={item.details[secondaryLocale]} input={(event: Event) => cvStore.updateCollectionLocalizedField('computerSkills', item.id, 'details', cvStore.secondaryLocale, (event.target as HTMLTextAreaElement).value)} />
            </label>
          </div>
          <div class="entry-actions">
            <button class="ghost-button" click={() => cvStore.removeComputerSkill(item.id)}>
              Kaydı kaldır
            </button>
          </div>
        </article>
      ))}
      <button class="button button-secondary" click={cvStore.addComputerSkill}>
        Bilgisayar becerisi ekle
      </button>

      <h3 class="subsection-title">Diğer beceriler</h3>
      {cvStore.data.otherSkills.map((item) => (
        <article class="entry-card" key={item.id}>
          <label class="field">
            <span>Grup başlığı</span>
            <input value={item.name} input={(event: Event) => cvStore.updateCollectionField('otherSkills', item.id, 'name', (event.target as HTMLInputElement).value)} />
          </label>
          <div class="grid two-col">
            <label class="field">
              <span>Açıklama ({localeLabel(primaryLocale)})</span>
              <textarea rows="4" value={item.details[primaryLocale]} input={(event: Event) => cvStore.updateCollectionLocalizedField('otherSkills', item.id, 'details', cvStore.primaryLocale, (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>İkincil dil ({localeLabel(secondaryLocale)})</span>
              <textarea rows="4" value={item.details[secondaryLocale]} input={(event: Event) => cvStore.updateCollectionLocalizedField('otherSkills', item.id, 'details', cvStore.secondaryLocale, (event.target as HTMLTextAreaElement).value)} />
            </label>
          </div>
          <div class="entry-actions">
            <button class="ghost-button" click={() => cvStore.removeOtherSkill(item.id)}>
              Kaydı kaldır
            </button>
          </div>
        </article>
      ))}
      <button class="button button-secondary" click={cvStore.addOtherSkill}>
        Diğer beceri ekle
      </button>
    </div>
  )
}

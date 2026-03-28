import cvStore from '../cv-store'

export default function StepSkills() {
  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Form alanı</p>
          <h2>Beceriler</h2>
          <p class="section-copy">Dil, bilgisayar ve diğer becerilerini ayrı alanlarda topla. Düzeyini olduğundan yüksek göstermemeye dikkat et.</p>
        </div>
        <p class="hint-chip">Rol ile ilgili yazılım veya araçları da mutlaka ekle.</p>
      </header>

      <h3 class="subsection-title">Yabanci diller</h3>
      {cvStore.data.languages.map((item) => (
        <article class="entry-card" key={item.id}>
          <div class="grid two-col">
            <label class="field">
              <span>Dil</span>
              <input value={item.name} input={(event: Event) => (item.name = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Seviye</span>
              <input value={item.level} input={(event: Event) => (item.level = (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Skor / belge</span>
              <input value={item.score} input={(event: Event) => (item.score = (event.target as HTMLInputElement).value)} />
            </label>
          </div>

          <div class="grid two-col">
            <label class="field">
              <span>Açıklama (TR)</span>
              <textarea rows="4" value={item.details.tr} input={(event: Event) => cvStore.updateLocalizedField(item.details, 'tr', (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>Açıklama (EN)</span>
              <textarea rows="4" value={item.details.en} input={(event: Event) => cvStore.updateLocalizedField(item.details, 'en', (event.target as HTMLTextAreaElement).value)} />
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
            <span>Başlık</span>
            <input value={item.name} input={(event: Event) => (item.name = (event.target as HTMLInputElement).value)} />
          </label>

          <div class="grid two-col">
            <label class="field">
              <span>Açıklama (TR)</span>
              <textarea rows="4" value={item.details.tr} input={(event: Event) => cvStore.updateLocalizedField(item.details, 'tr', (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>Açıklama (EN)</span>
              <textarea rows="4" value={item.details.en} input={(event: Event) => cvStore.updateLocalizedField(item.details, 'en', (event.target as HTMLTextAreaElement).value)} />
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
            <span>Başlık</span>
            <input value={item.name} input={(event: Event) => (item.name = (event.target as HTMLInputElement).value)} />
          </label>

          <div class="grid two-col">
            <label class="field">
              <span>Açıklama (TR)</span>
              <textarea rows="4" value={item.details.tr} input={(event: Event) => cvStore.updateLocalizedField(item.details, 'tr', (event.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="field">
              <span>Açıklama (EN)</span>
              <textarea rows="4" value={item.details.en} input={(event: Event) => cvStore.updateLocalizedField(item.details, 'en', (event.target as HTMLTextAreaElement).value)} />
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

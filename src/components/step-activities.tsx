import cvStore from '../cv-store'

export default function StepActivities() {
  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Form alanı</p>
          <h2>İlgi alanları, üyelikler ve faaliyetler</h2>
          <p class="section-copy">Sıradan hobi listesi yerine seni ayrıştıran ilgi alanları, topluluklar ve gönüllü çalışmaları yaz. ATS yazdırma çıktısında bu alanlar varsayılan olarak yer almaz.</p>
        </div>
        <p class="hint-chip">Pozisyonla ilgili faaliyetleri öncele.</p>
      </header>

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
            <input
              value={item.category}
              placeholder="İlgi alanları / Üyelikler / Gönüllülük"
              input={(event: Event) => cvStore.updateCollectionField('activities', item.id, 'category', (event.target as HTMLInputElement).value)}
            />
          </label>

          <label class="field">
            <span>Açıklama</span>
            <textarea
              rows="4"
              value={item.description}
              input={(event: Event) => cvStore.updateCollectionField('activities', item.id, 'description', (event.target as HTMLTextAreaElement).value)}
            />
          </label>

          <div class="entry-actions">
            <button class="ghost-button" click={() => cvStore.removeActivity(item.id)}>
              Kaydı kaldır
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}


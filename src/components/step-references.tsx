import cvStore from '../cv-store'

export default function StepReferences() {
  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Form alani</p>
          <h2>Referanslar</h2>
          <p class="section-copy">Referans ekleyebilir ya da bu bolum yerine talep edildiginde paylasilacagini belirtebilirsin. ATS yazdirma ciktisinda bu bolum varsayilan olarak gizlenir.</p>
        </div>
        <p class="hint-chip">Referans kisi bilgileri paylasilmadan once izin alinmali.</p>
      </header>

      <label class="checkbox-field">
        <input
          type="checkbox"
          checked={cvStore.data.referencesAvailableOnRequest}
          change={(event: Event) => cvStore.setReferencesAvailableOnRequest((event.target as HTMLInputElement).checked)}
        />
        <span>Referanslar talep edildiginde paylasilsin</span>
      </label>

      {!cvStore.data.referencesAvailableOnRequest && (
        <div class="form-stack">
          {cvStore.data.references.map((item) => (
            <article class="entry-card" key={item.id}>
              <div class="grid two-col">
                <label class="field">
                  <span>Ad Soyad</span>
                  <input value={item.fullName} input={(event: Event) => (item.fullName = (event.target as HTMLInputElement).value)} />
                </label>
                <label class="field">
                  <span>Unvan</span>
                  <input value={item.title} input={(event: Event) => (item.title = (event.target as HTMLInputElement).value)} />
                </label>
                <label class="field">
                  <span>Kurum</span>
                  <input value={item.organization} input={(event: Event) => (item.organization = (event.target as HTMLInputElement).value)} />
                </label>
                <label class="field">
                  <span>Telefon</span>
                  <input value={item.phone} input={(event: Event) => (item.phone = (event.target as HTMLInputElement).value)} />
                </label>
                <label class="field">
                  <span>E-posta</span>
                  <input value={item.email} input={(event: Event) => (item.email = (event.target as HTMLInputElement).value)} />
                </label>
              </div>

              <div class="entry-actions">
                <button class="ghost-button" click={() => cvStore.removeReference(item.id)}>
                  Kaydi kaldir
                </button>
              </div>
            </article>
          ))}

          <button class="button" click={cvStore.addReference}>
            Referans ekle
          </button>
        </div>
      )}
    </div>
  )
}

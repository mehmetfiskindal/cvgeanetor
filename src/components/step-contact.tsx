import cvStore from '../cv-store'

export default function StepContact() {
  // Use draft data if available, otherwise use main data
  const data = cvStore.draftData || cvStore.data
  const { contact, personalDetails } = data

  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Kişisel Bilgiler</p>
          <h2>Kişisel ve iletişim bilgileri</h2>
          <p class="section-copy">CV'nin en üstünde görünecek temel iletişim bilgisini tamamla. Fotoğraf ve ek kişisel alanlar isteğe bağlıdır; ATS export bunları otomatik olarak kritik içerikten ayırır.</p>
        </div>
        <p class="hint-chip">Fotoğraf kayıtta kalabilir ama export için kapalı tutman önerilir.</p>
      </header>

      <div class="grid two-col">
        <label class="field">
          <span>Ad Soyad</span>
          <input value={contact.fullName} input={(event: Event) => cvStore.updateDraftContactField('fullName', (event.target as HTMLInputElement).value)} />
        </label>
        <label class="field">
          <span>E-posta</span>
          <input type="email" value={contact.email} input={(event: Event) => cvStore.updateDraftContactField('email', (event.target as HTMLInputElement).value)} />
        </label>
        <label class="field">
          <span>Telefon</span>
          <input value={contact.phone} input={(event: Event) => cvStore.updateDraftContactField('phone', (event.target as HTMLInputElement).value)} />
        </label>
        <label class="field">
          <span>Şehir</span>
          <input value={contact.city} input={(event: Event) => cvStore.updateDraftContactField('city', (event.target as HTMLInputElement).value)} />
        </label>
      </div>

      <label class="field">
        <span>Açık adres</span>
        <textarea rows="3" value={contact.address} input={(event: Event) => cvStore.updateDraftContactField('address', (event.target as HTMLTextAreaElement).value)} />
      </label>

      <div class="grid two-col">
        <label class="field">
          <span>LinkedIn</span>
          <input value={contact.linkedin} input={(event: Event) => cvStore.updateDraftContactField('linkedin', (event.target as HTMLInputElement).value)} />
        </label>
        <label class="field">
          <span>Web sitesi / portfolyo</span>
          <input value={contact.website} input={(event: Event) => cvStore.updateDraftContactField('website', (event.target as HTMLInputElement).value)} />
        </label>
      </div>

      <label class="field">
        <span>Fotoğraf</span>
        <input type="file" accept="image/*" change={(event: Event) => cvStore.setPhotoFromFile((event.target as HTMLInputElement).files?.[0] || null)} />
      </label>

      {contact.photoDataUrl && (
        <button class="ghost-button" click={cvStore.removePhoto}>
          Fotoğrafı kaldır
        </button>
      )}

      <label class="checkbox-field">
        <input
          type="checkbox"
          checked={personalDetails.showOptionalDetails}
          change={(event: Event) => cvStore.updateDraftPersonalField('showOptionalDetails', (event.target as HTMLInputElement).checked)}
        />
        <span>Ek kişisel bilgi alanlarını göster</span>
      </label>

      {personalDetails.showOptionalDetails && (
        <div class="entry-card">
          <div class="grid two-col">
            <label class="field">
              <span>Uyruk</span>
              <input value={personalDetails.nationality} input={(event: Event) => cvStore.updateDraftPersonalField('nationality', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Cinsiyet</span>
              <input value={personalDetails.gender} input={(event: Event) => cvStore.updateDraftPersonalField('gender', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Doğum yeri</span>
              <input value={personalDetails.birthPlace} input={(event: Event) => cvStore.updateDraftPersonalField('birthPlace', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Doğum tarihi</span>
              <input value={personalDetails.birthDate} input={(event: Event) => cvStore.updateDraftPersonalField('birthDate', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Askerlik durumu</span>
              <input value={personalDetails.militaryStatus} input={(event: Event) => cvStore.updateDraftPersonalField('militaryStatus', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Medeni durum</span>
              <input value={personalDetails.maritalStatus} input={(event: Event) => cvStore.updateDraftPersonalField('maritalStatus', (event.target as HTMLInputElement).value)} />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

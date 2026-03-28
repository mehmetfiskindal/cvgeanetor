import cvStore from '../cv-store'

export default function StepContact() {
  const { contact, personalDetails } = cvStore.data

  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Form alanı</p>
          <h2>Kişisel ve iletişim bilgileri</h2>
          <p class="section-copy">CV'nin en üstünde yer alacak iletişim bilgilerini tamamla. Ek kişisel bilgiler varsayılan olarak kapalı.</p>
        </div>
        <p class="hint-chip">Fotoğraf ve ek kişisel bilgiler kayıtta kalır ama ATS yazdırma çıktısında gizlenir.</p>
      </header>

      <div class="grid two-col">
        <label class="field">
          <span>Ad Soyad</span>
          <input value={contact.fullName} input={(event: Event) => cvStore.updateContact('fullName', (event.target as HTMLInputElement).value)} />
        </label>
        <label class="field">
          <span>E-posta</span>
          <input type="email" value={contact.email} input={(event: Event) => cvStore.updateContact('email', (event.target as HTMLInputElement).value)} />
        </label>
        <label class="field">
          <span>Telefon</span>
          <input value={contact.phone} input={(event: Event) => cvStore.updateContact('phone', (event.target as HTMLInputElement).value)} />
        </label>
        <label class="field">
          <span>Şehir</span>
          <input value={contact.city} input={(event: Event) => cvStore.updateContact('city', (event.target as HTMLInputElement).value)} />
        </label>
      </div>

      <label class="field">
        <span>Açık adres</span>
        <textarea rows="3" value={contact.address} input={(event: Event) => cvStore.updateContact('address', (event.target as HTMLTextAreaElement).value)} />
      </label>

      <div class="grid two-col">
        <label class="field">
          <span>LinkedIn</span>
          <input value={contact.linkedin} input={(event: Event) => cvStore.updateContact('linkedin', (event.target as HTMLInputElement).value)} />
        </label>
        <label class="field">
          <span>Web sitesi / portfolyo</span>
          <input value={contact.website} input={(event: Event) => cvStore.updateContact('website', (event.target as HTMLInputElement).value)} />
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
          change={(event: Event) => cvStore.updatePersonalDetails('showOptionalDetails', (event.target as HTMLInputElement).checked)}
        />
        <span>Ek kişisel bilgi alanlarını göster</span>
      </label>

      {personalDetails.showOptionalDetails && (
        <div class="entry-card">
          <div class="grid two-col">
            <label class="field">
              <span>Uyruk</span>
              <input value={personalDetails.nationality} input={(event: Event) => cvStore.updatePersonalDetails('nationality', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Cinsiyet</span>
              <input value={personalDetails.gender} input={(event: Event) => cvStore.updatePersonalDetails('gender', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Doğum yeri</span>
              <input value={personalDetails.birthPlace} input={(event: Event) => cvStore.updatePersonalDetails('birthPlace', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Doğum tarihi</span>
              <input value={personalDetails.birthDate} input={(event: Event) => cvStore.updatePersonalDetails('birthDate', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Askerlik durumu</span>
              <input value={personalDetails.militaryStatus} input={(event: Event) => cvStore.updatePersonalDetails('militaryStatus', (event.target as HTMLInputElement).value)} />
            </label>
            <label class="field">
              <span>Medeni durum</span>
              <input value={personalDetails.maritalStatus} input={(event: Event) => cvStore.updatePersonalDetails('maritalStatus', (event.target as HTMLInputElement).value)} />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

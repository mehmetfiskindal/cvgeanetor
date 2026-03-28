import cvStore from '../cv-store'

export default function StepActivities() {
  const { activities } = cvStore.data

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

      <label class="field">
        <span>İlgi alanları</span>
        <textarea rows="4" value={activities.interests} input={(event: Event) => cvStore.updateActivities('interests', (event.target as HTMLTextAreaElement).value)} />
      </label>

      <label class="field">
        <span>Üyelikler</span>
        <textarea rows="4" value={activities.memberships} input={(event: Event) => cvStore.updateActivities('memberships', (event.target as HTMLTextAreaElement).value)} />
      </label>

      <label class="field">
        <span>Faaliyetler / gönüllülük</span>
        <textarea rows="4" value={activities.volunteerWork} input={(event: Event) => cvStore.updateActivities('volunteerWork', (event.target as HTMLTextAreaElement).value)} />
      </label>
    </div>
  )
}

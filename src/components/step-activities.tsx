import cvStore from '../cv-store'

export default function StepActivities() {
  const { activities } = cvStore.data

  return (
    <div class="form-stack">
      <header class="form-header">
        <div>
          <p class="eyebrow">Form alani</p>
          <h2>Ilgi alanlari, uyelikler ve faaliyetler</h2>
          <p class="section-copy">Siradan hobi listesi yerine seni ayristiran ilgi alanlari, topluluklar ve gonullu calismalari yaz. ATS yazdirma ciktisinda bu alanlar varsayilan olarak yer almaz.</p>
        </div>
        <p class="hint-chip">Pozisyonla ilgili faaliyetleri oncele.</p>
      </header>

      <label class="field">
        <span>Ilgi alanlari</span>
        <textarea rows="4" value={activities.interests} input={(event: Event) => cvStore.updateActivities('interests', (event.target as HTMLTextAreaElement).value)} />
      </label>

      <label class="field">
        <span>Uyelikler</span>
        <textarea rows="4" value={activities.memberships} input={(event: Event) => cvStore.updateActivities('memberships', (event.target as HTMLTextAreaElement).value)} />
      </label>

      <label class="field">
        <span>Faaliyetler / gonulluluk</span>
        <textarea rows="4" value={activities.volunteerWork} input={(event: Event) => cvStore.updateActivities('volunteerWork', (event.target as HTMLTextAreaElement).value)} />
      </label>
    </div>
  )
}

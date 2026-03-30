import cvStore from '../cv-store'

export default function AtsPrintPreview() {
  return (
    <section class="ats-print-sheet ats-print-screen">
      <header class="ats-print-header">
        <div>
          <h2>{cvStore.data.contact.fullName || 'Candidate Name'}</h2>
          <p class="ats-print-role">{cvStore.data.ats.targetJobTitle || 'Target Role'}</p>
        </div>
        <div class="ats-print-contact">
          {cvStore.data.contact.email && <span>{cvStore.data.contact.email}</span>}
          {cvStore.data.contact.phone && <span>{cvStore.data.contact.phone}</span>}
          {cvStore.data.contact.city && <span>{cvStore.data.contact.city}</span>}
          {cvStore.data.contact.linkedin && <span>{cvStore.data.contact.linkedin}</span>}
          {cvStore.data.contact.website && <span>{cvStore.data.contact.website}</span>}
        </div>
      </header>

      {cvStore.printSections
        .filter((section) => section.items.length > 0)
        .map((section) => (
          <section class="ats-print-section" key={section.id}>
            <h3>{section.title}</h3>
            <div class="ats-print-stack">
              {section.items.map((item) => (
                <article class="ats-print-item" key={item.id}>
                  <div class="ats-print-item-head">
                    <div>
                      <h4>{item.heading}</h4>
                      {item.subheading && <p>{item.subheading}</p>}
                    </div>
                    {item.meta && <span>{item.meta}</span>}
                  </div>
                  {item.text && <p class="ats-print-text">{item.text}</p>}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul>
                      {item.bullets.map((line, index) => (
                        <li key={`${item.id}-${index}`}>{line}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
    </section>
  )
}

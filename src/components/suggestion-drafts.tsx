import cvStore from '../cv-store'
import type { SuggestionDraft } from '../ats-utils'

interface SuggestionDraftsProps {
  drafts: SuggestionDraft[]
  emptyText?: string
}

export default function SuggestionDrafts({ drafts, emptyText }: SuggestionDraftsProps) {
  if (drafts.length === 0) {
    return emptyText ? <p class="preview-note">{emptyText}</p> : null
  }

  return (
    <div class="draft-list">
      {drafts.map((draft) => {
        const isOpen = cvStore.isDraftPreviewOpen(draft.id)

        return (
          <article class="draft-card" data-testid="suggestion-draft" key={draft.id}>
            <div class="draft-head">
              <div>
                <strong>{draft.title}</strong>
                <p>{draft.description}</p>
              </div>
              <div class="entry-actions">
                <button class="ghost-button" data-testid={`draft-preview-${draft.id}`} click={() => cvStore.toggleDraftPreview(draft.id)}>
                  {isOpen ? 'Detayı gizle' : 'Detayı aç'}
                </button>
                <button class="ghost-button" click={() => cvStore.discardDraft(draft.id)}>
                  Kapat
                </button>
              </div>
            </div>

            {isOpen && (
              <div class="draft-preview">
                <pre class="draft-preview-text">{draft.payload.kind === 'text' ? draft.payload.text : ''}</pre>
                <p class="preview-note">{draft.note}</p>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}

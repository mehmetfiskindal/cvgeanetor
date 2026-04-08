import AtsPrintPreview from './ats-print-preview'
import cvStore from '../cv-store'

export default function CVPreview() {
  const hiddenFinding = cvStore.atsAudit.findings.find((item) => item.code === 'visual-risk')

  return (
    <section class="preview-card">
      <div class="preview-toolbar">
        <div>
          <p class="eyebrow">Canlı önizleme</p>
          <span class="preview-note">Bu önizleme ATS yazdırma çıktısıyla aynı içeriği gösterir</span>
        </div>
      </div>

      {hiddenFinding && (
        <div class="inline-note">
          <strong>Not:</strong> {hiddenFinding.message}
        </div>
      )}

      <AtsPrintPreview key={`preview-${cvStore.previewRevision}`} />
    </section>
  )
}

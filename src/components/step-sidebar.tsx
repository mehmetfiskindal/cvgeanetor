import type { StepMeta } from '../cv-store'

interface StepSidebarProps {
  steps: StepMeta[]
  currentStep: number
  onSelectStep: (index: number) => void
}

export default function StepSidebar({ steps, currentStep, onSelectStep }: StepSidebarProps) {
  return (
    <aside class="sidebar-card">
      <div class="sidebar-head">
        <p class="eyebrow">Adimlar</p>
        <p class="sidebar-progress">%{Math.round(((currentStep + 1) / steps.length) * 100)} tamamlandi</p>
      </div>

      <div class="step-list">
        {steps.map((step, index) => (
          <button key={step.id} class={`step-item ${currentStep === index ? 'is-active' : ''}`} click={() => onSelectStep(index)}>
            <span class="step-index">0{index + 1}</span>
            <span>
              <strong>{step.title}</strong>
              <small>{step.description}</small>
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}

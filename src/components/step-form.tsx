import cvStore from '../cv-store'
import StepContact from './step-contact'
import StepEducation from './step-education'
import StepExperience from './step-experience'
import StepObjective from './step-objective'
import StepPreview from './step-preview'
import StepProjects from './step-projects'
import StepReview from './step-review'

interface StepFormProps {
  currentStep: number
  stepCount: number
}

const show = { display: 'block' }
const hide = { display: 'none' }

export default function StepForm({ currentStep, stepCount }: StepFormProps) {
  return (
    <section className="form-card">
      <div style={currentStep === 0 ? show : hide}>
        <StepContact />
      </div>
      <div style={currentStep === 1 ? show : hide}>
        <StepObjective />
      </div>
      <div style={currentStep === 2 ? show : hide}>
        <StepExperience />
      </div>
      <div style={currentStep === 3 ? show : hide}>
        <StepProjects />
      </div>
      <div style={currentStep === 4 ? show : hide}>
        <StepEducation />
      </div>
      <div style={currentStep === 5 ? show : hide}>
        <StepReview />
      </div>
      <div style={currentStep === 6 ? show : hide}>
        <StepPreview />
      </div>

      <footer className="wizard-footer">
        <button className="ghost-button" click={cvStore.prevStep} disabled={currentStep === 0}>
          Geri
        </button>
        <div className="footer-meta">
          <span>
            Adım {currentStep + 1} / {stepCount}
          </span>
          <button className="button" click={cvStore.nextStep} disabled={currentStep === stepCount - 1}>
            İleri
          </button>
        </div>
      </footer>
    </section>
  )
}

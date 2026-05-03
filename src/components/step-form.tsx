import { Component } from '@geajs/core'
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

export default class StepForm extends Component {
  private prevStep = -1

  onPropChange(props: StepFormProps) {
    if (props.currentStep !== this.prevStep) {
      // Commit previous step's draft if exists
      if (this.prevStep !== -1 && cvStore.hasDraftChanges) {
        cvStore.commitDraft()
      }
      // Initialize draft for new step
      cvStore.initializeDraftForStep(props.currentStep)
      this.prevStep = props.currentStep
    }
  }

  template({ currentStep, stepCount }: StepFormProps) {
    return (
      <section class="form-card">
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

        <footer class="wizard-footer">
          <button class="ghost-button" click={cvStore.prevStep} disabled={currentStep === 0}>
            Geri
          </button>
          <div class="footer-meta">
            <span>
              Adım {currentStep + 1} / {stepCount}
            </span>
            <button class="button" click={cvStore.nextStep} disabled={currentStep === stepCount - 1}>
              İleri
            </button>
          </div>
        </footer>
      </section>
    )
  }
}

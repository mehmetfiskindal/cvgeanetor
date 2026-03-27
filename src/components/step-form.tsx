import cvStore from '../cv-store'
import StepActivities from './step-activities'
import StepContact from './step-contact'
import StepEducation from './step-education'
import StepExperience from './step-experience'
import StepObjective from './step-objective'
import StepProjects from './step-projects'
import StepReferences from './step-references'
import StepReview from './step-review'
import StepSkills from './step-skills'

interface StepFormProps {
  currentStep: number
  stepCount: number
}

export default function StepForm({ currentStep, stepCount }: StepFormProps) {
  return (
    <section class="form-card">
      <div style={currentStep === 0 ? 'display:block' : 'display:none'}>
        <StepContact />
      </div>
      <div style={currentStep === 1 ? 'display:block' : 'display:none'}>
        <StepObjective />
      </div>
      <div style={currentStep === 2 ? 'display:block' : 'display:none'}>
        <StepEducation />
      </div>
      <div style={currentStep === 3 ? 'display:block' : 'display:none'}>
        <StepExperience />
      </div>
      <div style={currentStep === 4 ? 'display:block' : 'display:none'}>
        <StepProjects />
      </div>
      <div style={currentStep === 5 ? 'display:block' : 'display:none'}>
        <StepSkills />
      </div>
      <div style={currentStep === 6 ? 'display:block' : 'display:none'}>
        <StepActivities />
      </div>
      <div style={currentStep === 7 ? 'display:block' : 'display:none'}>
        <StepReferences />
      </div>
      <div style={currentStep === 8 ? 'display:block' : 'display:none'}>
        <StepReview />
      </div>

      <footer class="wizard-footer">
        <button class="ghost-button" click={cvStore.prevStep} disabled={currentStep === 0}>
          Geri
        </button>
        <div class="footer-meta">
          <span>
            Adim {currentStep + 1} / {stepCount}
          </span>
          <button class="button" click={cvStore.nextStep} disabled={currentStep === stepCount - 1}>
            Ileri
          </button>
        </div>
      </footer>
    </section>
  )
}

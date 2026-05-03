import { Component } from '@geajs/core'
import cvStore from '../cv-store'
import StepContact from './step-contact'
import StepEducation from './step-education'
import StepExperience from './step-experience'
import StepObjective from './step-objective'
import StepProjects from './step-projects'
import StepReview from './step-review'

export default class StepForm extends Component {
  private initialized = false

  onMount() {
    if (!this.initialized) {
      // Initialize draft when component mounts
      cvStore.initializeDraftForStep(0)
      this.initialized = true
    }
  }

  template() {
    return (
      <section class="form-card">
        <StepContact />
        <StepObjective />
        <StepExperience />
        <StepProjects />
        <StepEducation />
        <StepReview />

        <footer class="form-footer">
          <div class="footer-actions">
            <button class="button" click={() => cvStore.exportToJson()}>
              JSON olarak kaydet
            </button>
            <button class="button button-primary" click={() => cvStore.printAtsCv()}>
              PDF olarak yazdır
            </button>
          </div>
        </footer>
      </section>
    )
  }
}

import { Component } from '@geajs/core'
import AtsPrintPreview from './components/ats-print-preview'
import CVPreview from './components/cv-preview'
import StepForm from './components/step-form'
import StepSidebar from './components/step-sidebar'
import cvStore from './cv-store'

export default class App extends Component {
  template() {
    return (
      <main class="app-shell">
        <section class="hero-card">
          <div>
            <p class="eyebrow">ATS CV Builder</p>
            <h1>ATS uyumlu CV olustur, denetle ve PDF olarak yazdir.</h1>
          </div>
          <p class="hero-copy">
            Formu adim adim doldur, anahtar kelime eslesmelerini gor, ATS risklerini denetle ve tek sutun yazdirma
            gorunumu ile PDF al.
          </p>
        </section>

        {cvStore.alert.message && (
          <div class={`alert alert-${cvStore.alert.tone}`}>
            <span>{cvStore.alert.message}</span>
            <button class="ghost-button" click={cvStore.clearAlert}>
              Kapat
            </button>
          </div>
        )}

        <section class="workspace">
          <StepSidebar steps={cvStore.steps} currentStep={cvStore.currentStep} onSelectStep={cvStore.goToStep} />
          <StepForm currentStep={cvStore.currentStep} stepCount={cvStore.steps.length} />
          <CVPreview />
        </section>

        <div class="print-only-container">
          <AtsPrintPreview variant="print" />
        </div>
      </main>
    )
  }
}

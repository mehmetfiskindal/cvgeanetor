import { Component } from '@geajs/core'
import CVPreview from './components/cv-preview'
import JsonDropZone from './components/json-drop-zone'
import StepForm from './components/step-form'
import StepSidebar from './components/step-sidebar'
import cvStore from './cv-store'

export default class App extends Component {
  template() {
    return (
      <main className="app-shell">
        <section className="hero-card">
          <div>
            <p className="eyebrow">ATS CV Builder</p>
            <h1>ATS uyumlu CV oluştur, denetle ve PDF olarak yazdır.</h1>
          </div>
          <p className="hero-copy">
            Formu adım adım doldur, anahtar kelime eşleşmelerini gör, ATS risklerini denetle ve tek sütun yazdırma
            görünümü ile PDF al.
          </p>
          <JsonDropZone />
        </section>

        {cvStore.alert.message && (
          <div className={`alert alert-${cvStore.alert.tone}`}>
            <span>{cvStore.alert.message}</span>
            <button className="ghost-button" onClick={cvStore.clearAlert}>
              Kapat
            </button>
          </div>
        )}

        <section className="workspace">
          <StepSidebar steps={cvStore.steps} currentStep={cvStore.currentStep} onSelectStep={cvStore.goToStep} />
          <StepForm key={`form-${cvStore.formRevision}`} currentStep={cvStore.currentStep} stepCount={cvStore.steps.length} />
          <CVPreview />
        </section>
      </main>
    )
  }
}

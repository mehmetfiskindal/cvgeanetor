import { Component } from '@geajs/core'
import CVPreview from './components/cv-preview'
import JsonDropZone from './components/json-drop-zone'
import StepForm from './components/step-form'
import cvStore from './cv-store'

export default class App extends Component {
  template() {
    return (
      <main className="app-shell">
        <section className="hero-card">
          <div>
            <p className="eyebrow">ATS CV Builder</p>
            <h1>ATS uyumlu CV oluştur, neden düşük/yüksek skor aldığını gör ve PDF olarak yazdır.</h1>
          </div>
          <p className="hero-copy">
            Tek sayfada CV'ni doldur, iş ilanı anahtar kelime eşleşmelerini kaynak bazlı incele, explainable ATS audit ile riskleri gör ve PDF al.
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
          <StepForm key={`form-${cvStore.formRevision}`} />
          <CVPreview />
        </section>
      </main>
    )
  }
}

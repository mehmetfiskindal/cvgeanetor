import { Component } from '@geajs/core'
import cvStore from '../cv-store'

export default class JsonDropZone extends Component {
  isDragOver = false

  private handleFile(file: File | null | undefined) {
    if (!file) return
    cvStore.importFromFile(file)
  }

  onDragOver = (event: DragEvent) => {
    event.preventDefault()
    this.isDragOver = true
  }

  onDragLeave = () => {
    this.isDragOver = false
  }

  onDrop = (event: DragEvent) => {
    event.preventDefault()
    this.isDragOver = false
    this.handleFile(event.dataTransfer?.files?.[0])
  }

  onFileChange = (event: Event) => {
    this.handleFile((event.target as HTMLInputElement).files?.[0])
  }

  openPicker = () => {
    const input = document.getElementById(`${this.id}-input`) as HTMLInputElement | null
    input?.click()
  }

  template() {
    return (
      <div
        class={`drop-zone${this.isDragOver ? ' drop-zone--over' : ''}`}
        dragover={this.onDragOver}
        dragleave={this.onDragLeave}
        drop={this.onDrop}
      >
        <input
          id={`${this.id}-input`}
          type="file"
          accept="application/json"
          class="drop-zone-hidden-input"
          change={this.onFileChange}
        />
        <div class="drop-zone-icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 14.5v3A1.5 1.5 0 0 0 5.5 19h13a1.5 1.5 0 0 0 1.5-1.5v-3" />
            <polyline points="8 10 12 6 16 10" />
            <line x1="12" y1="6" x2="12" y2="15" />
          </svg>
        </div>
        <p class="drop-zone-title">JSON taslağını buraya sürükleyin</p>
        <p class="drop-zone-sub">ya da</p>
        <button class="button" click={this.openPicker}>
          Dosya seçin
        </button>
        <p class="drop-zone-hint">Yalnızca .json dosyaları</p>
      </div>
    )
  }
}

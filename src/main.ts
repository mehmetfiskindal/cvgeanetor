import { hydrate } from '@geajs/ssr/client'
import App from './app'
import cvStore from './cv-store'
import './styles.css'

const root = document.getElementById('app')

if (!root) {
  throw new Error('App root element not found')
}

hydrate(App, root, {
  storeRegistry: {
    cvStore,
  },
})

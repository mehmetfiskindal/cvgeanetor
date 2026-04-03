import { handleRequest } from '@geajs/ssr'
import App from './app'
import cvStore from './cv-store'

export default handleRequest(App, {
  storeRegistry: {
    cvStore,
  },
})

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Toaster } from 'vue-sonner'
import { router } from './router'
import App from './App.vue'
import { initializeConnections } from './config/database'

const initApp = async () => {
  try {
    await initializeConnections()
    
    const app = createApp(App)
    const pinia = createPinia()
    
    app.use(pinia)
    app.use(router)
    app.component('Toaster', Toaster)
    
    app.mount('#app')
  } catch (error) {
    console.error('Failed to initialize application:', error)
  }
}

initApp()

import { createApp } from 'vue'
import App from './App.vue'
import { initializeConnections } from './config/database'

const initApp = async () => {
  try {
    // Initialize database and connections
    await initializeConnections()
    
    // Create and mount Vue app
    const app = createApp(App)
    // ...existing app configuration...
    app.mount('#app')
  } catch (error) {
    console.error('Failed to initialize application:', error)
  }
}

initApp()

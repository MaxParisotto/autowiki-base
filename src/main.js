import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Import all CSS files from the "styles" folder
import './styles/tailwind.css'
import './styles/base.css'
import './styles/components.css'
import './styles/reset.css'
import './styles/variables.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('./pages/Dashboard.vue')
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: () => import('./pages/Tasks.vue')
    },
    {
      path: '/weaviate',
      name: 'Weaviate',
      component: () => import('./pages/Weaviate.vue')
    },
    {
      path: '/agents',
      name: 'Agents',
      component: () => import('./pages/Agents.vue')
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('./pages/Projects.vue')
    },
    {
      path: '/tools',
      name: 'Tools',
      component: () => import('./pages/Tools.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('./pages/Settings.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/'
    }
  ]
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia) // Add this before router
app.use(router)
app.mount('#app')

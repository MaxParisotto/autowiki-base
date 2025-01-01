
import { createRouter, createWebHistory } from 'vue-router'
// ...existing imports...
import Weaviate from '../pages/Weaviate.vue'
import Settings from '../pages/Settings.vue'

const routes = [
  // ...existing routes...
  {
    path: '/weaviate',
    name: 'Weaviate',
    component: Weaviate
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    children: [
      {
        path: 'agents',
        name: 'OpenAIAgentsConfig',
        component: () => import('../components/settings/OpenAIAgentsConfig.vue')
      }
      // Add more settings routes as needed
    ]
  }
]

// ...existing router creation and export...
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/pages/Settings.vue'),
  },
  {
    path: '/weaviate',
    name: 'Weaviate',
    component: () => import('@/pages/Weaviate.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    window.location = to.fullPath
  }
})

export default router
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/Settings.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/Settings.vue')
  },
  // ...existing routes...
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/weaviate',
    name: 'Weaviate',
    component: () => import('../pages/Weaviate.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/Settings.vue'),
    children: [
      {
        path: 'agents',
        name: 'OpenAIAgents',
        component: () => import('../components/settings/OpenAIAgentsConfig.vue')
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
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
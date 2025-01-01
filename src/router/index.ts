import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: () => import('../pages/Wiki.vue')
    },
    {
      path: '/weaviate',
      name: 'weaviate', 
      component: () => import('../pages/Weaviate.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../pages/Settings.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Handle loading states and pre-route checks if needed
  next()
})

router.onError((error) => {
  console.error('Navigation error:', error)
  // Optionally redirect to error page
  router.push('/error')
})

export default router

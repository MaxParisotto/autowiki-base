import { createRouter, createWebHistory } from 'vue-router';

// Define routes
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard.vue'), // Lazy-loaded
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/pages/Settings.vue'), // Lazy-loaded
  },
  {
    path: '/weaviate',
    name: 'Weaviate',
    component: () => import('@/pages/Weaviate.vue'), // Lazy-loaded
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/', // Catch-all route for 404
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global error handler for lazy-loaded modules
router.onError((error) => {
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    console.error('Module loading failed:', error);
    window.location.reload();
  }
});

export default router;
// src/router.js
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: () => import("./pages/Dashboard.vue"),
    },
    {
      path: "/projects",
      name: "Projects",
      component: () => import("./pages/Projects.vue"),
    },
    {
      path: "/tasks",
      name: "Tasks",
      component: () => import("./pages/Tasks.vue"),
    },
    {
      path: "/settings",
      name: "Settings",
      component: () => import("./pages/Settings.vue"),
    },
    {
      path: "/agents",
      name: "Agents",
      component: () => import("./pages/Agents.vue"),
    },
    {
      path: "/tools",
      name: "Tools",
      component: () => import("./pages/Tools.vue"),
    },
  ]
});

export default router;
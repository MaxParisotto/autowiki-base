// src/router.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("./pages/Dashboard.vue"),
    meta: { title: "Dashboard" }
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
    path: "/agents",
    name: "Agents",
    component: () => import("./pages/Agents.vue"),
    meta: { title: "Agents" }
  },
  {
    path: "/tools",
    name: "Tools",
    component: () => import("./pages/Tools.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Title handling
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - AutoWiki` || "AutoWiki";
  next();
});

export default router;
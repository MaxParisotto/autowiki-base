// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./pages/Dashboard.vue";
import Projects from "./pages/Projects.vue";
import Tasks from "./pages/Tasks.vue";
import Settings from "./pages/Settings.vue";
import Agents from "./pages/Agents.vue";
import Tools from "./pages/Tools.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/tasks", name: "Tasks", component: Tasks },
  { path: "/settings", name: "Settings", component: Settings },
  { path: "/agents", name: "Agents", component: Agents },
  { path: "/tools", name: "Tools", component: Tools },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
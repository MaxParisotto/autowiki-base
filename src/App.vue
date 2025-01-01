<template>
  <div class="app flex min-h-screen bg-canvas text-text-primary">
    <!-- Sidebar Navigation -->
    <nav class="w-64 min-h-screen bg-elevation-1 border-r border-border-weak">
      <div class="p-4 border-b border-border-weak">
        <h1 class="text-xl font-bold text-accent-orange">AutoWiki</h1>
      </div>
      <ul class="p-2 space-y-1">
        <li v-for="item in menuItems" :key="item.path">
          <router-link 
            :to="item.path"
            v-tooltip="item.tooltip"
            class="flex items-center px-4 py-2 rounded-lg text-sm transition-colors"
            :class="[
              $route.path === item.path 
                ? 'bg-accent-orange text-black font-medium'
                : 'text-text-secondary hover:bg-elevation-2'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <ActivityWidget />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ActivityWidget from './components/ActivityWidget.vue';
import {
  HomeIcon,
  UserGroupIcon,
  WrenchIcon,
  FolderIcon,
  ClipboardDocumentIcon,
  Cog6ToothIcon,
  ServerIcon,
} from '@heroicons/vue/24/outline';

const menuItems = ref([
  { name: 'Dashboard', path: '/', icon: HomeIcon, tooltip: 'Home Dashboard' },
  { name: 'Agents', path: '/agents', icon: UserGroupIcon, tooltip: 'Manage Agents' },
  { name: 'Tools', path: '/tools', icon: WrenchIcon, tooltip: 'Available Tools' },
  { name: 'Projects', path: '/projects', icon: FolderIcon, tooltip: 'Your Projects' },
  { name: 'Tasks', path: '/tasks', icon: ClipboardDocumentIcon, tooltip: 'Active Tasks' },
  { name: 'Weaviate', path: '/weaviate', icon: ServerIcon, tooltip: 'Vector Database' },
  { name: 'Settings', path: '/settings', icon: Cog6ToothIcon, tooltip: 'System Settings' },
]);
</script>

<style scoped>
.app {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
}

nav {
  width: 16rem;
  min-height: 100vh;
  background-color: var(--bg-elevation-1);
  border-right: 1px solid var(--border-weak);
}

nav h1 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent-orange);
}

ul {
  padding: 0.5rem;
  gap: 0.25rem;
}

li a {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition-property: color, background-color;
}

li a:hover {
  background-color: var(--bg-elevation-2);
  color: var(--text-secondary);
}

li a.router-link-active {
  background-color: var(--accent-orange);
  color: black;
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
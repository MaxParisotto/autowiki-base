<template>
  <div class="app flex min-h-screen bg-canvas text-text-primary">
    <!-- Sidebar Navigation -->
    <nav class="w-64 min-h-screen bg-elevation-1 border-r border-border-weak">
      <div class="p-4 border-b border-border-weak">
        <h1 class="text-xl font-bold text-accent-orange">AutoWiki</h1>
      </div>
      <ul class="p-2 space-y-1">
        <li v-for="route in navigationItems" :key="route.path">
          <router-link 
            :to="route.path"
            class="flex items-center px-4 py-2 rounded-lg text-sm transition-colors"
            :class="[
              $route.path === route.path
                ? 'bg-accent-orange text-black font-medium'
                : 'text-text-secondary hover:bg-elevation-2'
            ]"
          >
            <component :is="route.icon" class="w-5 h-5 mr-3" />
            {{ route.name }}
          </router-link>
        </li>
      </ul>
    </nav>

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
import { computed } from 'vue'
import ActivityWidget from './components/ActivityWidget.vue'
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  ServerIcon,
  UserGroupIcon,
  FolderIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'

const navigationItems = [
  { path: '/', name: 'Dashboard', icon: HomeIcon },
  { path: '/tasks', name: 'Tasks', icon: ClipboardDocumentListIcon },
  { path: '/weaviate', name: 'Weaviate', icon: ServerIcon },
  { path: '/agents', name: 'Agents', icon: UserGroupIcon },
  { path: '/projects', name: 'Projects', icon: FolderIcon },
  { path: '/tools', name: 'Tools', icon: WrenchScrewdriverIcon },
  { path: '/settings', name: 'Settings', icon: Cog6ToothIcon }
]
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
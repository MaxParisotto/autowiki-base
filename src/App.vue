<template>
  <div class="app flex min-h-screen bg-canvas text-text-primary">
    <nav class="navbar">
      <ul>
        <li v-for="(item, index) in menuItems" :key="index">
          <router-link 
            :to="item.path" 
            v-float-tooltip="item.tooltip"
            class="nav-link"
          >
            <component :is="item.icon" class="w-5 h-5 mr-2" />
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
    <main class="content">
      <router-view v-slot="{ Component }">
        <transition
          mode="out-in"
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <ActivityWidget />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ActivityWidget from './components/ActivityWidget.vue'
import {
  HomeIcon,
  UserGroupIcon,
  WrenchIcon,
  FolderIcon,
  ClipboardListIcon,
  CogIcon
} from '@heroicons/vue/outline/index.js'

const menuItems = ref([
  { name: 'Dashboard', path: '/', icon: HomeIcon, tooltip: 'Home Dashboard' },
  { name: 'Agents', path: '/agents', icon: UserGroupIcon, tooltip: 'Manage Agents' },
  { name: 'Tools', path: '/tools', icon: WrenchIcon, tooltip: 'Available Tools' },
  { name: 'Projects', path: '/projects', icon: FolderIcon, tooltip: 'Your Projects' },
  { name: 'Tasks', path: '/tasks', icon: ClipboardListIcon, tooltip: 'Active Tasks' },
  { name: 'Settings', path: '/settings', icon: CogIcon, tooltip: 'System Settings' }
])
</script>

<style lang="postcss">
/* Remove base.css import since it's already imported in main.js */
.app {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
}

.navbar {
  width: 140px;
  background-color: var(--bg-elevation-1);
  color: var(--text-primary);
  padding: 4px;
  border-right: 1px solid var(--border-weak);
  font-size: 1rem;
  box-shadow: 2px 0 8px var(--shadow-1);
}

.navbar ul {
  list-style: none;
  padding: 0;
  margin-top: 4px;
}

.navbar ul li {
  margin: 2px 0;
}

.navbar ul li a {
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.navbar ul li a:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}

.navbar ul li a.router-link-active {
  background-color: var(--accent-orange);
  color: var(--black);
  font-weight: 600;
}

.content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
}

/* Override router-view background */
.content > .router-view-container {
  background-color: var(--bg-canvas);
  min-height: 100%;
  padding: 16px;
}

/* Container backgrounds */
.container, 
.card, 
.panel, 
.box, 
.section {
  background-color: var(--bg-elevation-1) !important;
  color: var(--text-primary);
}

/* Nested container backgrounds */
.container .container,
.card .card,
.panel .panel,
.box .box,
.section .section {
  background-color: var(--bg-elevation-2) !important;
}

/* Third level nesting */
.container .container .container,
.card .card .card,
.panel .panel .panel,
.box .box .box,
.section .section .section {
  background-color: var(--bg-elevation-3) !important;
}

/* Form elements background override */
input, 
select, 
textarea, 
.input, 
.select, 
.textarea {
  background-color: var(--bg-elevation-2) !important;
  color: var(--text-primary) !important;
}

/* Dialog/Modal backgrounds */
.modal,
.dialog,
.popup {
  background-color: var(--bg-elevation-2) !important;
}

.modal-content,
.dialog-content,
.popup-content {
  background-color: var(--bg-elevation-1) !important;
}

/* Table backgrounds */
table, th, td {
  background-color: var(--bg-elevation-1) !important;
  color: var(--text-primary);
}

tr:nth-child(even) {
  background-color: var(--bg-elevation-2) !important;
}

/* Status colors */
.text-success { color: var(--success-text); }
.text-error { color: var(--error-text); }
.text-warning { color: var(--warning-text); }
.text-info { color: var(--info-text); }

/* Modern scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--bg-hover);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-grey-light);
}

/* Override any remaining white backgrounds */
* {
  box-sizing: border-box;
}

#app, html, body {
  background-color: var(--bg-canvas);
  color: var(--text-primary);
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}
.nav-link:hover {
  background-color: var(--bg-elevation-2);
  color: var(--text-primary);
}

.router-link-active {
  @apply bg-accent-orange text-black font-semibold;
}
</style>
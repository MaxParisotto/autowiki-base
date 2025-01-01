<template>
  <div class="app flex min-h-screen bg-canvas text-text-primary">
    <!-- Sidebar Navigation -->
    <nav class="w-64 min-h-screen bg-elevation-1 border-r border-border-weak">
      <!-- Logo/Header -->
      <div class="p-4 border-b border-border-weak">
        <h1 class="text-xl font-bold text-accent-orange">AutoWiki</h1>
      </div>
      
      <!-- Navigation Items -->
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
        <transition 
          name="fade"
          mode="out-in"
          appear
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <ActivityWidget />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ActivityWidget from './components/ActivityWidget.vue'
import {
  HomeIcon,
  UserGroupIcon,
  WrenchIcon,
  FolderIcon,
  ClipboardDocumentIcon, // Changed from ClipboardListIcon
  Cog6ToothIcon, // Changed from CogIcon
  ServerIcon // Add ServerIcon import
} from '@heroicons/vue/24/outline' // Changed path to v2 format

const menuItems = ref([
  { name: 'Dashboard', path: '/', icon: HomeIcon, tooltip: 'Home Dashboard' },
  { name: 'Agents', path: '/agents', icon: UserGroupIcon, tooltip: 'Manage Agents' },
  { name: 'Tools', path: '/tools', icon: WrenchIcon, tooltip: 'Available Tools' },
  { name: 'Projects', path: '/projects', icon: FolderIcon, tooltip: 'Your Projects' },
  { name: 'Tasks', path: '/tasks', icon: ClipboardDocumentIcon, tooltip: 'Active Tasks' }, // Updated icon
  { name: 'Weaviate', path: '/weaviate', icon: ServerIcon, tooltip: 'Vector Database' }, // Add Weaviate nav item
  { name: 'Settings', path: '/settings', icon: Cog6ToothIcon, tooltip: 'System Settings' } // Updated icon
])
</script>

<style lang="postcss">
/* Global background colors */
:root {
  color-scheme: dark;
}

/* Reset all backgrounds */
*, *::before, *::after {
  background-color: transparent;
}

/* Base container styles */
.app, 
.content, 
.page-container,
.container,
.card,
.panel,
.section {
  background-color: var(--bg-canvas);
}

/* First level elevation */
.navbar,
.card,
.panel,
.section,
.dialog,
.modal {
  background-color: var(--bg-elevation-1) !important;
}

/* Second level elevation */
.dropdown-content,
input,
select,
textarea,
button:not(.primary),
.card .card,
.panel .panel,
.section .section {
  background-color: var(--bg-elevation-2) !important;
}

/* Third level elevation */
.dropdown-item:hover,
.card .card .card,
.panel .panel .panel,
.section .section .section,
button:not(.primary):hover {
  background-color: var(--bg-elevation-3) !important;
}

/* Ensure form elements have proper styling */
input, 
select, 
textarea {
  border: 1px solid var(--border-weak);
  color: var(--text-primary);
}

/* Ensure modals and dialogs stack properly */
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: var(--bg-elevation-1) !important;
}

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
  @apply flex items-center px-4 py-2 text-text-secondary rounded-lg;
  /* Remove hover effects and transitions */
}

.router-link-active {
  @apply bg-accent-orange text-black font-semibold;
}

/* Add these tooltip styles */
.tooltip-trigger {
  position: relative;
}

.tooltip-trigger:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background-color: var(--bg-elevation-3);
  color: var(--text-primary);
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 50;
}

.page-container {
  width: 100%;
  height: 100%;
}

/* Override any remaining white backgrounds */
:global([class*="bg-white"]) {
  background-color: var(--bg-elevation-1) !important;
}

:global([class*="bg-gray"]) {
  background-color: var(--bg-elevation-2) !important;
}

/* Force dark backgrounds on common components */
:global(.dropdown-menu),
:global(.modal),
:global(.popover),
:global(.card),
:global(.list-group),
:global(.table),
:global(.form-control),
:global(.input-group),
:global(.btn):not(.btn-primary):not(.btn-accent) {
  background-color: var(--bg-elevation-1) !important;
  color: var (--text-primary) !important;
}

/* Force dark backgrounds on form elements */
:global(input),
:global(select),
:global(textarea) {
  background-color: var(--bg-elevation-2) !important;
  border-color: var(--border-weak) !important;
  color: var(--text-primary) !important;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Remove other existing styles as they're handled by Tailwind */
</style>
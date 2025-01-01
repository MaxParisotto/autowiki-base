<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = computed(() => route.path)

const navItems = [
  // Add any remaining navigation items here
]
</script>

<template>
  <nav class="sidebar">
    <router-link 
      v-for="item in navItems" 
      :key="item.path"
      :to="item.path"
      class="sidebar-item"
      :class="{ active: currentPath === item.path }"
    >
      <component :is="item.icon" class="w-5 h-5" />
      <span class="sidebar-label">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<style scoped>
.sidebar-item {
  @apply flex items-center gap-3 px-4 py-3 rounded-lg transition-colors;
  @apply hover:bg-elevation-2-hover;
}

.sidebar-item.active {
  @apply bg-elevation-2 text-accent-orange;
}

.sidebar-label {
  @apply text-sm font-medium;
}
</style>

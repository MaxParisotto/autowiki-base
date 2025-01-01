<template>
  <div 
    :class="['form-section', className]" 
    :aria-label="label"
  >
    <h2 class="form-section-heading">{{ label }}</h2>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  className?: string;
}>();
</script>

<style scoped>
.form-section {
  margin-bottom: 1rem;
}

.form-section-heading {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-heading);
}
</style>

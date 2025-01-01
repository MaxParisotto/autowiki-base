<template>
  <div :class="['form-section', className]" role="form" :aria-label="label">
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
</style>

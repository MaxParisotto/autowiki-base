<template>
  <fieldset :id="id" class="form-group" :aria-labelledby="`${id}-heading`">
    <legend :id="`${id}-heading`" class="form-group-heading">{{ heading }}</legend>
    <slot></slot>
  </fieldset>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  heading: string;
}>();
</script>

<style scoped>
.form-group {
  border: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.form-group-heading {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-heading);
}
</style>

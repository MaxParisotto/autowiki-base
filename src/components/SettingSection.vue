<template>
  <section :id="id" class="settings-section-wrapper">
    <FormSection :label="label">
      <fieldset class="settings-section" :aria-labelledby="`${id}-heading`">
        <h2 :id="`${id}-heading`">{{ heading }}</h2>
        <slot></slot>
      </fieldset>
    </FormSection>
  </section>
</template>

<script setup lang="ts">
import FormSection from './FormSection.vue';

defineProps<{
  id: string;
  label: string;
  heading: string;
}>();
</script>

<style scoped>
.settings-section-wrapper {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

.settings-section-wrapper:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.form-actions {
  margin-top: 1.5rem;
  padding: 1rem;
  border-top: 1px solid var(--color-border);
  text-align: right;
}
</style>

<template>
  <section :id="id" class="settings-section-wrapper">
    <FormWrapper :form-id="formId" @submit="$emit('submit')">
      <FormSection :label="label">
        <FormGroup :id="id" :heading="heading">
          <slot></slot>
        </FormGroup>
      </FormSection>
      <div class="form-actions">
        <button type="submit" class="save-button">
          Save {{ label }}
        </button>
      </div>
    </FormWrapper>
  </section>
</template>

<script setup lang="ts">
import FormSection from './FormSection.vue';
import FormWrapper from './FormWrapper.vue';
import FormGroup from './FormGroup.vue';

defineProps<{
  id: string;
  formId: string;
  label: string;
  heading: string;
}>();

defineEmits<{
  (e: 'submit'): void;
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

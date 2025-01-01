<template>
  <div class="password-field-wrapper">
    <div class="password-field-group">
      <input
        :id="`${id}-username`"
        type="text"
        :name="`${id}-username`"
        :form="formId"
        autocomplete="username"
        :value="usernameValue"
        aria-hidden="true"
        tabindex="-1"
        style="display: none"
      >
      <label :for="id">{{ label }}</label>
      <input
        :id="id"
        ref="passwordInput"
        :name="id"
        :form="formId"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keyup.enter="handleSubmit"
        type="password"
        :autocomplete="autocomplete || 'current-password'"
        :placeholder="placeholder"
        :aria-describedby="describedby"
        required
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  id: string;
  label: string;
  modelValue: string;
  usernameValue: string;
  formId?: string;
  placeholder?: string;
  describedby?: string;
  autocomplete?: string;
}>();

const passwordInput = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'submit', value: string): void;
}>();

const handleSubmit = () => {
  if (passwordInput.value?.form?.checkValidity()) {
    emit('submit', props.modelValue);
  }
};
</script>

<style scoped>
.password-field-wrapper {
  position: relative;
}

.password-form {
  margin: 0;
  padding: 0;
}

.password-field-group {
  margin-bottom: 0.25rem;
}

label {
  display: block;
  margin-bottom: 0.15rem;
  font-weight: 500;
  font-size: 0.85rem;
  color: var(--color-text);
}

input {
  width: 100%;
  padding: 0.25rem;
  margin-bottom: 0.25rem;
  border: 1px solid var(--color-border);
  border-radius: 3px;
  font-size: 0.85rem;
  height: 1.75rem;
  background: var(--color-background);
  color: var(--color-text);
}

input:focus {
  outline: none;
  border-color: var(--color-border-hover);
}
</style>

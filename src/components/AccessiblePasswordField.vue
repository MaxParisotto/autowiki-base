<template>
  <PasswordFormWrapper :form-id="`${id}-form`">
    <div class="password-field-group" role="group">
      <div class="username-field" aria-hidden="true">
        <input
          :id="`${id}-username`"
          type="text"
          :name="`${id}-username`"
          autocomplete="username"
          :value="usernameValue"
          form="password-form"
          tabindex="-1"
          style="position: absolute; opacity: 0; pointer-events: none;"
        >
      </div>
      <label :for="id">{{ label }}</label>
      <input
        :id="id"
        :name="id"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        type="password"
        :autocomplete="autocomplete || 'current-password'"
        :placeholder="placeholder"
        :aria-describedby="describedby"
        form="password-form"
        required
      >
    </div>
  </PasswordFormWrapper>
</template>

<script setup lang="ts">
import PasswordFormWrapper from './PasswordFormWrapper.vue';

defineProps<{
  id: string;
  label: string;
  modelValue: string;
  usernameValue: string;
  placeholder?: string;
  describedby?: string;
  autocomplete?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped>
.password-field-group {
  position: relative;
}

.password-field-group input[type="hidden"] {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  z-index: -1;
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

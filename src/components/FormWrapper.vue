<template>
  <form 
    :id="formId"
    class="settings-form"
    @submit.prevent="$emit('submit')"
  >
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  formId: string;
}>();

defineEmits<{
  (e: 'submit'): void;
}>();
</script>

<style scoped>
.settings-form {
  margin: 0;
  padding: 0;
}
</style>

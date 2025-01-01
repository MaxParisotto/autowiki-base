<template>
  <form 
    :id="formId" 
    class="password-form-wrapper" 
    role="form" 
    @submit.prevent
  >
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps<{
  formId: string;
}>();

onMounted(() => {
  // Form is mounted and ready
});
</script>

<style scoped>
.password-form-wrapper {
  margin: 0;
  padding: 0;
  border: none;
}
</style>

<template>
  <div 
    v-if="error"
    class="rounded-lg bg-elevation-2 border border-error/20 p-4 my-4"
  >
    <div class="flex items-start">
      <ExclamationCircleIcon class="w-5 h-5 text-error mt-0.5 mr-3" />
      <div>
        <h3 class="font-medium text-error">{{ error.title || 'Error' }}</h3>
        <p class="text-sm text-text-secondary mt-1">{{ error.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid'

defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>

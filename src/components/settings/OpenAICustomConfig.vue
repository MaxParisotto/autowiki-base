<template>
  <div class="openai-custom-config bg-elevation-1 rounded-lg p-6">
    <h2 class="text-xl font-semibold mb-4">OpenAI Configuration</h2>
    
    <form @submit.prevent="saveConfig" class="space-y-4">
      <div class="form-group">
        <label for="apiKey" class="block text-sm font-medium mb-1">API Key</label>
        <input
          id="apiKey"
          v-model="config.apiKey"
          type="password"
          class="w-full rounded-md bg-elevation-2 border-border-weak"
          placeholder="Enter your OpenAI API key"
        >
      </div>

      <div class="form-group">
        <label for="model" class="block text-sm font-medium mb-1">Model</label>
        <select
          id="model"
          v-model="config.model"
          class="w-full rounded-md bg-elevation-2 border-border-weak"
        >
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
        </select>
      </div>

      <div class="form-group">
        <label for="temperature" class="block text-sm font-medium mb-1">Temperature</label>
        <input
          id="temperature"
          v-model="config.temperature"
          type="range"
          min="0"
          max="2"
          step="0.1"
          class="w-full"
        >
        <span class="text-sm text-text-secondary">{{ config.temperature }}</span>
      </div>

      <button
        type="submit"
        class="px-4 py-2 bg-accent-orange text-black rounded-md hover:bg-accent-orange-dark"
      >
        Save Configuration
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-sonner'

const toast = useToast()

const config = ref({
  apiKey: '',
  model: 'gpt-3.5-turbo',
  temperature: 0.7
})

function saveConfig() {
  try {
    localStorage.setItem('openai-config', JSON.stringify(config.value))
    toast.success('Configuration saved successfully')
  } catch (error) {
    toast.error('Failed to save configuration')
    console.error('Error saving config:', error)
  }
}

// Load saved config on mount
if (typeof window !== 'undefined') {
  const savedConfig = localStorage.getItem('openai-config')
  if (savedConfig) {
    config.value = { ...config.value, ...JSON.parse(savedConfig) }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

input[type="range"] {
  accent-color: var(--accent-orange);
}
</style>
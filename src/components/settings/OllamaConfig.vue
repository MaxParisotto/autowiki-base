<template>
  <div class="space-y-4">
    <div>
      <label class="block text-text-primary mb-2">Base URL</label>
      <input type="url" 
             v-model="config.baseUrl" 
             class="w-full bg-elevation-3 border border-border-weak rounded-lg px-4 py-2 text-text-primary"
             placeholder="http://localhost:11434">
    </div>

    <div>
      <label class="block text-text-primary mb-2">Default Model</label>
      <select v-model="config.model" 
              class="w-full bg-elevation-3 border border-border-weak rounded-lg px-4 py-2 text-text-primary">
        <option value="llama2">Llama 2</option>
        <option value="mistral">Mistral</option>
        <option value="codellama">CodeLlama</option>
        <option value="orca-mini">Orca Mini</option>
      </select>
    </div>

    <div>
      <label class="block text-text-primary mb-2">System Instructions</label>
      <textarea v-model="config.systemContext"
                rows="4"
                class="w-full bg-elevation-3 border border-border-weak rounded-lg px-4 py-2 text-text-primary"
                placeholder="Define the base behavior and capabilities"></textarea>
    </div>

    <div>
      <label class="block text-text-primary mb-2">Temperature: {{ config.temperature }}</label>
      <input type="range"
             v-model="config.temperature"
             min="0"
             max="1"
             step="0.1"
             class="w-full">
    </div>
  </div>
</template>

<script>
export default {
  name: 'OllamaConfig',
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        baseUrl: 'http://localhost:11434',
        model: 'llama2',
        systemContext: '',
        temperature: 0.7
      })
    }
  },
  computed: {
    config: {
      get() { return this.modelValue },
      set(value) { this.$emit('update:modelValue', value) }
    }
  }
}
</script>

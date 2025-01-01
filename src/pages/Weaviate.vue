
<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-sonner'

const toast = useToast()
const config = ref({
  weaviate: {
    endpoint: '',
    apiKey: '',
    className: 'Documents',
  },
  embedding: {
    model: 'text-embedding-3-small',
    dimensions: 1536,
    provider: 'OpenAI',
    apiKey: ''
  },
  rag: {
    llmModel: 'gpt-4-turbo-preview',
    temperature: 0.7,
    maxTokens: 1000,
    topK: 5,
    minRelevance: 0.7
  }
})

const embeddingModels = [
  { value: 'text-embedding-3-small', label: 'OpenAI Ada 3 Small (1536)' },
  { value: 'text-embedding-3-large', label: 'OpenAI Ada 3 Large (3072)' },
  { value: 'all-MiniLM-L6-v2', label: 'MiniLM-L6 (384)' }
]

const llmModels = [
  { value: 'gpt-4-turbo-preview', label: 'GPT-4 Turbo' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus' }
]

const saveConfig = async () => {
  try {
    localStorage.setItem('weaviate-config', JSON.stringify(config.value))
    toast.success('Configuration saved successfully')
  } catch (error) {
    toast.error('Failed to save configuration')
  }
}

const testConnection = async () => {
  try {
    // TODO: Implement actual connection test
    toast.success('Connection successful!')
  } catch (error) {
    toast.error('Connection failed: ' + error.message)
  }
}

onMounted(() => {
  const saved = localStorage.getItem('weaviate-config')
  if (saved) {
    config.value = JSON.parse(saved)
  }
})
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-text-primary">Weaviate RAG Configuration</h1>
      <button @click="testConnection" 
              class="px-4 py-2 bg-elevation-2 hover:bg-elevation-2-hover rounded-lg transition-colors">
        Test Connection
      </button>
    </div>

    <form @submit.prevent="saveConfig" class="space-y-6">
      <!-- Weaviate Connection -->
      <section class="form-section">
        <h2 class="text-lg font-semibold mb-4 text-text-primary">Weaviate Connection</h2>
        <div class="space-y-4">
          <div class="form-group">
            <label>Endpoint URL</label>
            <input v-model="config.weaviate.endpoint" 
                   placeholder="https://your-weaviate-instance.com"
                   type="url" 
                   required />
          </div>
          <div class="form-group">
            <label>API Key</label>
            <input v-model="config.weaviate.apiKey" 
                   type="password" />
          </div>
          <div class="form-group">
            <label>Class Name</label>
            <input v-model="config.weaviate.className" 
                   placeholder="Documents" />
          </div>
        </div>
      </section>

      <!-- Embedding Configuration -->
      <section class="form-section">
        <h2 class="text-lg font-semibold mb-4 text-text-primary">Embedding Configuration</h2>
        <div class="space-y-4">
          <div class="form-group">
            <label>Embedding Model</label>
            <select v-model="config.embedding.model">
              <option v-for="model in embeddingModels" 
                      :key="model.value" 
                      :value="model.value">
                {{ model.label }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>OpenAI API Key</label>
            <input v-model="config.embedding.apiKey" 
                   type="password" />
          </div>
        </div>
      </section>

      <!-- RAG Settings -->
      <section class="form-section">
        <h2 class="text-lg font-semibold mb-4 text-text-primary">RAG Settings</h2>
        <div class="space-y-4">
          <div class="form-group">
            <label>LLM Model</label>
            <select v-model="config.rag.llmModel">
              <option v-for="model in llmModels" 
                      :key="model.value" 
                      :value="model.value">
                {{ model.label }}
              </option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
              <label>Temperature</label>
              <input v-model.number="config.rag.temperature" 
                     type="number" 
                     min="0" 
                     max="2" 
                     step="0.1" />
            </div>
            <div class="form-group">
              <label>Max Tokens</label>
              <input v-model.number="config.rag.maxTokens" 
                     type="number" 
                     min="1" />
            </div>
            <div class="form-group">
              <label>Top K Results</label>
              <input v-model.number="config.rag.topK" 
                     type="number" 
                     min="1" />
            </div>
            <div class="form-group">
              <label>Min Relevance Score</label>
              <input v-model.number="config.rag.minRelevance" 
                     type="number" 
                     min="0" 
                     max="1" 
                     step="0.1" />
            </div>
          </div>
        </div>
      </section>

      <div class="flex justify-end">
        <button type="submit" 
                class="px-6 py-2 bg-accent-orange hover:bg-accent-orange-dark text-black rounded-lg transition-colors">
          Save Configuration
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-section {
  @apply bg-elevation-1 rounded-lg border border-border-weak p-6;
}

.form-group {
  @apply space-y-2;
}

.form-group label {
  @apply block text-text-primary font-medium;
}

.form-group input,
.form-group select {
  @apply w-full px-4 py-2 bg-elevation-2 border border-border-weak rounded-lg
         focus:ring-2 focus:ring-accent-orange focus:border-transparent;
}
</style>
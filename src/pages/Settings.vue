<template>
  <div class="settings-container">
    <h1>Settings</h1>
    <div class="settings-content">
      <form @submit.prevent="saveSettings" class="settings-form">
        <!-- OpenAI Settings -->
        <div class="settings-section">
          <h2>OpenAI Settings</h2>
          <div class="form-group">
            <label for="openai-api">API Key</label>
            <input 
              id="openai-api" 
              v-model="settings.openai.apiKey" 
              type="password" 
              placeholder="Enter OpenAI API key"
            >
          </div>
          <div class="form-group">
            <label for="openai-model">Model</label>
            <input 
              id="openai-model" 
              v-model="settings.openai.model" 
              type="text" 
              placeholder="e.g., gpt-4"
            >
          </div>
        </div>

        <!-- Ollama Settings -->
        <div class="settings-section">
          <h2>Ollama Settings</h2>
          <div class="form-group">
            <label for="ollama-url">URL</label>
            <input 
              id="ollama-url" 
              v-model="settings.ollama.url" 
              type="url" 
              placeholder="Enter Ollama URL"
            >
          </div>
        </div>

        <!-- Custom GPT Settings -->
        <div class="settings-section">
          <h2>Custom GPT Settings</h2>
          <div class="form-group">
            <label for="custom-gpt-url">URL</label>
            <input 
              id="custom-gpt-url" 
              v-model="settings.customGpt.url" 
              type="url" 
              placeholder="Enter Custom GPT URL"
            >
            <label for="custom-gpt-key">API Key</label>
            <input 
              id="custom-gpt-key" 
              v-model="settings.customGpt.apiKey" 
              type="password" 
              placeholder="Enter Custom GPT API key"
            >
          </div>
        </div>

        <!-- Redis Settings -->
        <div class="settings-section">
          <h2>Redis Settings</h2>
          <div class="form-group">
            <label for="redis-url">URL</label>
            <input 
              id="redis-url" 
              v-model="settings.redis.url" 
              type="url" 
              placeholder="Enter Redis URL"
            >
            <label for="redis-password">Password</label>
            <input 
              id="redis-password" 
              v-model="settings.redis.password" 
              type="password" 
              placeholder="Enter Redis password"
            >
          </div>
        </div>

        <!-- Nextcloud Settings -->
        <div class="settings-section">
          <h2>Nextcloud Settings</h2>
          <div class="form-group">
            <label for="nextcloud-url">URL</label>
            <input 
              id="nextcloud-url" 
              v-model="settings.nextcloud.url" 
              type="url" 
              placeholder="Enter Nextcloud URL"
            >
            <label for="nextcloud-username">Username</label>
            <input 
              id="nextcloud-username" 
              v-model="settings.nextcloud.username" 
              type="text" 
              placeholder="Enter Nextcloud username"
            >
            <label for="nextcloud-password">Password</label>
            <input 
              id="nextcloud-password" 
              v-model="settings.nextcloud.password" 
              type="password" 
              placeholder="Enter Nextcloud password"
            >
          </div>
        </div>

        <!-- RAG Settings -->
        <div class="settings-section">
          <h2>RAG Configuration</h2>
          
          <!-- Embedding Settings -->
          <div class="form-group">
            <label for="embedding-model">Embedding Model</label>
            <select 
              id="embedding-model" 
              v-model="settings.rag.embeddingModel"
              class="select-input"
            >
              <option value="text-embedding-3-small">text-embedding-3-small</option>
              <option value="text-embedding-3-large">text-embedding-3-large</option>
              <option value="text-embedding-ada-002">text-embedding-ada-002</option>
            </select>
          </div>

          <!-- Vector Store Settings -->
          <div class="form-group">
            <h3>Vector Store</h3>
            <label for="vector-store">Type</label>
            <select 
              id="vector-store" 
              v-model="settings.rag.vectorStore.type"
              class="select-input"
            >
              <option value="weaviate">Weaviate</option>
              <option value="qdrant">Qdrant</option>
              <option value="pinecone">Pinecone</option>
            </select>

            <label for="vector-store-url">URL</label>
            <input 
              id="vector-store-url" 
              v-model="settings.rag.vectorStore.url" 
              type="url" 
              placeholder="Vector store URL"
            >

            <label for="vector-store-api-key">API Key</label>
            <input 
              id="vector-store-api-key" 
              v-model="settings.rag.vectorStore.apiKey" 
              type="password" 
              placeholder="Vector store API key"
            >
          </div>

          <!-- Retrieval Settings -->
          <div class="form-group">
            <h3>Retrieval Parameters</h3>
            <label for="top-k">Top K Results</label>
            <input 
              id="top-k" 
              v-model="settings.rag.retrieval.topK" 
              type="number" 
              min="1" 
              max="20"
            >

            <label for="similarity-threshold">Similarity Threshold</label>
            <input 
              id="similarity-threshold" 
              v-model="settings.rag.retrieval.similarityThreshold" 
              type="number" 
              step="0.01" 
              min="0" 
              max="1"
            >

            <label for="mmr-lambda">MMR Lambda</label>
            <input 
              id="mmr-lambda" 
              v-model="settings.rag.retrieval.mmrLambda" 
              type="number" 
              step="0.1" 
              min="0" 
              max="1"
            >
          </div>

          <!-- Text Chunking Settings -->
          <div class="form-group">
            <h3>Text Chunking</h3>
            <label for="chunk-size">Chunk Size</label>
            <input 
              id="chunk-size" 
              v-model="settings.rag.chunking.chunkSize" 
              type="number" 
              min="100" 
              max="2000"
            >

            <label for="chunk-overlap">Chunk Overlap</label>
            <input 
              id="chunk-overlap" 
              v-model="settings.rag.chunking.chunkOverlap" 
              type="number" 
              min="0" 
              max="500"
            >

            <label for="chunk-strategy">Chunking Strategy</label>
            <select 
              id="chunk-strategy" 
              v-model="settings.rag.chunking.strategy"
              class="select-input"
            >
              <option value="fixed">Fixed Size</option>
              <option value="paragraph">Paragraph</option>
              <option value="sentence">Sentence</option>
            </select>
          </div>
        </div>

        <button type="submit" class="save-button">Save Settings</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storageService } from '../services/StorageService'

const settings = ref({
  openai: {
    apiKey: '',
    model: ''
  },
  ollama: {
    url: ''
  },
  customGpt: {
    url: '',
    apiKey: ''
  },
  redis: {
    url: '',
    password: ''
  },
  nextcloud: {
    url: '',
    username: '',
    password: ''
  },
  rag: {
    embeddingModel: 'text-embedding-3-small',
    vectorStore: {
      type: 'weaviate',
      url: '',
      apiKey: ''
    },
    retrieval: {
      topK: 4,
      similarityThreshold: 0.7,
      mmrLambda: 0.5
    },
    chunking: {
      chunkSize: 500,
      chunkOverlap: 50,
      strategy: 'fixed'
    }
  }
})

// Load settings on mount
onMounted(async () => {
  try {
    const savedSettings = await storageService.getSettings('default')
    if (savedSettings) {
      settings.value = savedSettings
    }
  } catch (error) {
    console.error('Error loading settings:', error)
  }
})

const saveSettings = async () => {
  try {
    await storageService.saveSettings('default', settings.value)
    console.log('Settings saved successfully')
  } catch (error) {
    console.error('Error saving settings:', error)
  }
}
</script>

<style scoped>
.settings-container {
  padding: 0.5rem;
}

.settings-content {
  margin-top: 0.5rem;
}

.settings-section {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 3px;
  background: var(--color-background-soft);
}

h1, h2, h3 {
  color: var(--color-heading);
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

h2 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

h3 {
  font-size: 0.9rem;
  margin: 0.5rem 0 0.25rem 0;
  font-weight: 500;
}

.form-group {
  margin-bottom: 0.25rem;
}

label {
  display: block;
  margin-bottom: 0.15rem;
  font-weight: 500;
  font-size: 0.85rem;
  color: var(--color-text);
}

input, .select-input {
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

input:focus, .select-input:focus {
  outline: none;
  border-color: var(--color-border-hover);
}

.save-button {
  background-color: var(--color-primary);
  color: white;
  padding: 0.35rem 0.75rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  transition: background-color 0.2s;
}

.save-button:hover {
  background-color: var(--color-primary-hover, #45a049);
}

input[type="number"] {
  width: 100%;
}
</style>
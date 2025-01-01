<template>
  <div class="settings-container">
    <h1>Settings</h1>
    <div v-if="loading" class="loading-overlay">
      Loading...
    </div>
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    <div class="settings-content">
      <form @submit.prevent="saveSettings" class="settings-form">
        <!-- Database Connection Status -->
        <div class="settings-section connection-status">
          <h2>Database Connection Status</h2>
          <div class="status-grid">
            <div class="status-item">
              <span class="status-label">MySQL</span>
              <span :class="['status-badge', mysqlStatus.connected ? 'connected' : 'disconnected']">
                {{ mysqlStatus.message }}
              </span>
              <span v-if="mysqlStatus.details" class="status-details">
                {{ mysqlStatus.details }}
              </span>
            </div>
            
            <div class="status-item">
              <span class="status-label">Redis</span>
              <span :class="['status-badge', redisStatus.connected ? 'connected' : 'disconnected']">
                {{ redisStatus.message }}
              </span>
              <span v-if="redisStatus.details" class="status-details">
                {{ redisStatus.details }}
              </span>
            </div>
          </div>
          
          <button 
            @click="testConnections" 
            :disabled="isTesting" 
            class="test-button"
          >
            {{ isTesting ? 'Testing...' : 'Test Connections' }}
          </button>
        </div>

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
import { onMounted, ref } from 'vue'
import { useSettingsStore } from '../stores/settingsStore'
import { toast } from 'vue-sonner'
import { mysqlPool, redisClient } from '../config/database'

const settingsStore = useSettingsStore()
const { settings, loading, error } = settingsStore

onMounted(async () => {
  try {
    await settingsStore.loadSettings()
  } catch (err) {
    toast.error('Failed to load settings')
  }
})

const saveSettings = async () => {
  try {
    const success = await settingsStore.saveSettings(settings)
    if (success) {
      toast.success('Settings saved successfully')
    } else {
      toast.error('Failed to save settings')
    }
  } catch (err) {
    toast.error('Error saving settings')
  }
}

const isTesting = ref(false)
const mysqlStatus = ref({
  connected: false,
  message: 'Not Tested',
  details: ''
})
const redisStatus = ref({
  connected: false,
  message: 'Not Tested',
  details: ''
})

async function testConnections() {
  isTesting.value = true
  
  // Test MySQL
  try {
    const [result] = await mysqlPool.query('SHOW TABLES')
    mysqlStatus.value = {
      connected: true,
      message: 'Connected',
      details: `Tables found: ${(result as any[]).length}`
    }
  } catch (error: any) {
    mysqlStatus.value = {
      connected: false,
      message: 'Failed',
      details: error.message
    }
  }

  // Test Redis
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect()
    }
    const pong = await redisClient.ping()
    redisStatus.value = {
      connected: true,
      message: 'Connected',
      details: `Response: ${pong}`
    }
  } catch (error: any) {
    redisStatus.value = {
      connected: false,
      message: 'Failed',
      details: error.message
    }
  } finally {
    if (redisClient.isOpen) {
      await redisClient.quit()
    }
  }

  isTesting.value = false
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

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  z-index: 1000;
}

.error-message {
  color: var(--color-error, red);
  padding: 1rem;
  margin: 1rem 0;
  background: var(--color-error-bg, #fff1f0);
  border: 1px solid var(--color-error-border, #ffa39e);
  border-radius: 4px;
}

.connection-status {
  margin-bottom: 1rem;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.status-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-label {
  font-weight: 500;
  color: var(--color-text);
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-badge.connected {
  background-color: #10B981;
  color: white;
}

.status-badge.disconnected {
  background-color: #EF4444;
  color: white;
}

.status-details {
  font-size: 0.85rem;
  color: var(--color-text);
  opacity: 0.8;
}

.test-button {
  background-color: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 1rem;
}

.test-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.test-button:not(:disabled):hover {
  background-color: var(--color-primary-hover, #45a049);
}
</style>
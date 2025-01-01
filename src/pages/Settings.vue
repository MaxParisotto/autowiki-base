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
      <!-- Database Connection Section -->
      <FormSection label="Database Status" className="connection-status">
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
          @click.prevent="testConnections" 
          :disabled="isTesting" 
          class="test-button"
        >
          {{ isTesting ? 'Testing...' : 'Test Connections' }}
        </button>
      </FormSection>

      <!-- Settings Forms Container -->
      <div class="settings-forms-container">
        <!-- Hidden form for password fields -->
        <form id="password-form" style="display: none" @submit.prevent></form>
        
        <!-- Auth Settings -->
        <FormSection label="Authentication Settings">
          <form 
            @submit.prevent="saveAuthSettings" 
            class="settings-form"
            id="auth-settings-form"
          >
            <div class="settings-section" role="group" aria-labelledby="auth-heading">
              <h2 id="auth-heading">API Keys & Authentication</h2>
              <!-- OpenAI Settings -->
              <div class="form-group" role="group">
                <PasswordField
                  id="openai-api"
                  label="OpenAI API Key"
                  v-model="settings.openai.apiKey"
                  username-value="openai-user"
                  form-id="auth-settings-form"
                  placeholder="Enter OpenAI API key"
                  describedby="auth-heading"
                />
                <label for="openai-model">Model</label>
                <input 
                  id="openai-model" 
                  v-model="settings.openai.model" 
                  type="text" 
                  placeholder="e.g., gpt-4"
                >
              </div>
              <!-- Custom GPT Settings -->
              <div class="form-group" role="group">
                <label for="custom-gpt-url">URL</label>
                <input 
                  id="custom-gpt-url" 
                  v-model="settings.customGpt.url" 
                  type="url" 
                  placeholder="Enter Custom GPT URL"
                >
                <PasswordField
                  id="custom-gpt-key"
                  label="Custom GPT API Key"
                  v-model="settings.customGpt.apiKey"
                  username-value="custom-gpt"
                  form-id="auth-settings-form"
                  placeholder="Enter Custom GPT API key"
                  describedby="auth-heading"
                />
              </div>
              <button type="submit" class="save-button">Save Auth Settings</button>
            </div>
          </form>
        </FormSection>

        <!-- Connection Settings -->
        <FormSection label="Connection Settings">
          <form 
            @submit.prevent="saveConnectionSettings" 
            class="settings-form"
            id="connection-settings-form"
          >
            <div class="settings-section" role="group" aria-labelledby="connection-heading">
              <h2 id="connection-heading">Connection Settings</h2>
              <!-- Ollama Settings -->
              <div class="form-group" role="group">
                <label for="ollama-url">URL</label>
                <input 
                  id="ollama-url" 
                  v-model="settings.ollama.url" 
                  type="url" 
                  placeholder="Enter Ollama URL"
                >
              </div>
              <!-- Redis Settings -->
              <div class="form-group" role="group">
                <label for="redis-url">URL</label>
                <input 
                  id="redis-url" 
                  v-model="settings.redis.url" 
                  type="url" 
                  placeholder="Enter Redis URL"
                >
                <PasswordField
                  id="redis-password"
                  label="Password"
                  v-model="settings.redis.password"
                  username-value="redis"
                  form-id="connection-settings-form"
                  placeholder="Enter Redis password"
                  describedby="auth-heading"
                />
              </div>
              <!-- Nextcloud Settings -->
              <div class="form-group" role="group">
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
                  autocomplete="username"
                  placeholder="Enter Nextcloud username"
                >
                <PasswordField
                  id="nextcloud-password"
                  label="Password"
                  v-model="settings.nextcloud.password"
                  username-value="nextcloud"
                  form-id="connection-settings-form"
                  placeholder="Enter Nextcloud password"
                  describedby="auth-heading"
                />
              </div>
              <button type="submit" class="save-button">Save Connection Settings</button>
            </div>
          </form>
        </FormSection>

        <!-- RAG Settings -->
        <FormSection label="RAG Settings">
          <form 
            @submit.prevent="saveRagSettings" 
            class="settings-form"
            id="rag-settings-form"
          >
            <div class="settings-section" role="group" aria-labelledby="rag-heading">
              <h2 id="rag-heading">RAG Configuration</h2>
              <!-- Embedding Settings -->
              <div class="form-group" role="group">
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
              <div class="form-group" role="group">
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
                <PasswordField
                  id="vector-store-api-key"
                  label="API Key"
                  v-model="settings.rag.vectorStore.apiKey"
                  username-value="vector-store"
                  form-id="rag-settings-form"
                  placeholder="Vector store API key"
                  describedby="auth-heading"
                />
              </div>

              <!-- Retrieval Settings -->
              <div class="form-group" role="group">
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
              <div class="form-group" role="group">
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
              <button type="submit" class="save-button">Save RAG Settings</button>
            </div>
          </form>
        </FormSection>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '../stores/settingsStore'
import { toast } from 'vue-sonner'
import { testDatabaseConnections } from '../utils/api'
import AccessiblePasswordField from '../components/AccessiblePasswordField.vue'
import FormSection from '../components/FormSection.vue'
import PasswordField from '../components/PasswordField.vue'

const settingsStore = useSettingsStore()
const { settings, loading, error } = storeToRefs(settingsStore)

onMounted(async () => {
  try {
    await settingsStore.loadSettings()
  } catch (err) {
    toast.error('Failed to load settings')
  }
})

const saveAuthSettings = async () => {
  try {
    await settingsStore.saveSettings({
      ...settings.value,
      // Only include auth-related settings
      openai: settings.value.openai,
      customGpt: settings.value.customGpt
    })
    toast.success('Authentication settings saved')
  } catch (err) {
    toast.error('Error saving authentication settings')
  }
}

const saveConnectionSettings = async () => {
  try {
    await settingsStore.saveSettings({
      ...settings.value,
      // Only include connection-related settings
      ollama: settings.value.ollama,
      redis: settings.value.redis,
      nextcloud: settings.value.nextcloud
    })
    toast.success('Connection settings saved')
  } catch (err) {
    toast.error('Error saving connection settings')
  }
}

const saveRagSettings = async () => {
  try {
    await settingsStore.saveSettings({
      ...settings.value,
      // Only include RAG-related settings
      rag: settings.value.rag
    })
    toast.success('RAG settings saved')
  } catch (err) {
    toast.error('Error saving RAG settings')
  }
}

const saveSettings = async () => {
  try {
    await settingsStore.saveSettings(settings.value)
    toast.success('Settings saved successfully')
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
  if (isTesting.value) return
  
  isTesting.value = true
  toast.info('Testing database connections...')
  
  try {
    const { mysql, redis } = await testDatabaseConnections()
    
    mysqlStatus.value = {
      connected: mysql.connected,
      message: mysql.connected ? 'Connected' : 'Failed',
      details: mysql.details || ''
    }
    
    redisStatus.value = {
      connected: redis.connected,
      message: redis.connected ? 'Connected' : 'Failed',
      details: redis.details || ''
    }

    if (mysql.connected && redis.connected) {
      toast.success('All database connections successful')
    } else {
      toast.error('Some database connections failed')
    }
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to test connections'
    toast.error(errorMessage)
    
    mysqlStatus.value = {
      connected: false,
      message: 'Failed',
      details: errorMessage
    }
    redisStatus.value = {
      connected: false,
      message: 'Failed', 
      details: errorMessage
    }
  } finally {
    isTesting.value = false
  }
}

// Add form context
provide('form-context', {
  setFormFields: (fields: { [key: string]: string }) => {
    // This is a no-op function to satisfy form context requirements
    return;
  }
});

// Add form context provider
const formContext = {
  registerForm: (formId: string) => {
    // This is intentionally empty as it's just for accessibility
  }
};

provide('settingsFormContext', formContext);
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

/* Add form-specific styles */
.settings-form [role="group"] {
  margin-bottom: 1rem;
}

.settings-forms-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.settings-form {
  margin: 0;
  padding: 0;
}
</style>
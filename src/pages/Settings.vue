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

      <div class="settings-forms-container">
        <SettingSection
          v-for="section in sections"
          :key="section.id"
          :id="section.id"
          :form-id="`${section.id}-form`"
          :label="section.label"
          :heading="section.heading"
          @submit="section.onSubmit"
        >
          <component :is="section.component" 
                    v-bind="section.props" 
                    v-model="settings[section.modelKey]" />
        </SettingSection>
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
import SettingSection from '../components/SettingSection.vue'
import FormWrapper from '../components/FormWrapper.vue'

const settingsStore = useSettingsStore()
const { settings, loading, error } = storeToRefs(settingsStore)

onMounted(async () => {
  try {
    await settingsStore.loadSettings()
  } catch (err) {
    toast.error('Failed to load settings')
  }
})

const handleAuthSubmit = async () => {
  try {
    await settingsStore.saveSettings({
      ...settings.value,
      openai: settings.value.openai,
      customGpt: settings.value.customGpt
    })
    toast.success('Authentication settings saved')
  } catch (err) {
    toast.error('Error saving authentication settings')
  }
}

const handleConnectionSubmit = async () => {
  try {
    await settingsStore.saveSettings({
      ...settings.value,
      ollama: settings.value.ollama,
      redis: settings.value.redis,
      nextcloud: settings.value.nextcloud
    })
    toast.success('Connection settings saved')
  } catch (err) {
    toast.error('Error saving connection settings')
  }
}

const handleRagSubmit = async () => {
  try {
    await settingsStore.saveSettings({
      ...settings.value,
      rag: settings.value.rag
    })
    toast.success('RAG settings saved')
  } catch (err) {
    toast.error('Error saving RAG settings')
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
  formIds: {
    auth: 'auth-settings-form',
    connection: 'connection-settings-form',
    rag: 'rag-settings-form'
  },
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

const sections = [
  {
    id: 'auth-section',
    label: 'Authentication Settings',
    heading: 'API Keys & Authentication',
    modelKey: 'auth',
    onSubmit: handleAuthSubmit,
    // ...other section config
  },
  // ...other sections
];
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

fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.form-actions {
  margin-top: 1.5rem;
  padding: 1rem;
  border-top: 1px solid var(--color-border);
  text-align: right;
}

.settings-section-wrapper {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

.settings-section-wrapper:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
</style>
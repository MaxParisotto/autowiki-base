<template>
  <div class="nextcloud-config p-4">
    <h2 class="text-xl font-semibold mb-4">Nextcloud Configuration</h2>
    
    <form @submit.prevent="saveConfig" class="space-y-4">
      <div class="form-group">
        <label for="serverUrl" class="block text-sm font-medium">Server URL</label>
        <input 
          id="serverUrl"
          v-model="config.serverUrl"
          type="url"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="https://your-nextcloud-server.com"
        >
      </div>

      <div class="form-group">
        <label for="username" class="block text-sm font-medium">Username</label>
        <input 
          id="username"
          v-model="config.username"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter username"
        >
      </div>

      <div class="form-group">
        <label for="password" class="block text-sm font-medium">App Password</label>
        <input 
          id="password"
          v-model="config.password"
          type="password"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter app password"
        >
      </div>

      <div class="flex items-center mt-4">
        <button 
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          :disabled="isSaving"
        >
          {{ isSaving ? 'Saving...' : 'Save Configuration' }}
        </button>
        
        <button 
          type="button"
          class="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          @click="testConnection"
          :disabled="isTesting"
        >
          {{ isTesting ? 'Testing...' : 'Test Connection' }}
        </button>
      </div>
    </form>

    <div v-if="status" :class="['mt-4 p-4 rounded-md', statusClass]">
      {{ status }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-sonner'

const toast = useToast()

const config = ref({
  serverUrl: '',
  username: '',
  password: ''
})

const isSaving = ref(false)
const isTesting = ref(false)
const status = ref('')

const statusClass = computed(() => {
  if (!status.value) return ''
  return status.value.includes('Error') 
    ? 'bg-red-100 text-red-700'
    : 'bg-green-100 text-green-700'
})

async function saveConfig() {
  isSaving.value = true
  try {
    // API call to save config would go here
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    toast.success('Configuration saved successfully')
    status.value = 'Configuration saved successfully'
  } catch (error) {
    toast.error('Failed to save configuration')
    status.value = 'Error: Failed to save configuration'
  } finally {
    isSaving.value = false
  }
}

async function testConnection() {
  isTesting.value = true
  try {
    // API call to test connection would go here
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    toast.success('Connection test successful')
    status.value = 'Connection test successful'
  } catch (error) {
    toast.error('Connection test failed')
    status.value = 'Error: Connection test failed'
  } finally {
    isTesting.value = false
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
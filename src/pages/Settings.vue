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

        <button type="submit" class="save-button">Save Settings</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
  }
})

const saveSettings = async () => {
  try {
    // TODO: Implement settings save functionality
    console.log('Settings saved:', settings.value)
    // Here you would typically save to local storage or your backend
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

h1 {
  color: var(--color-heading);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.settings-section {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 3px;
}

h2 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: var(--color-heading);
}

.form-group {
  margin-bottom: 0.25rem;
}

label {
  display: block;
  margin-bottom: 0.15rem;
  font-weight: 500;
  font-size: 0.85rem;
}

input {
  width: 100%;
  padding: 0.25rem;
  margin-bottom: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 0.85rem;
  height: 1.75rem;
}

.save-button {
  background-color: #4CAF50;
  color: white;
  padding: 0.35rem 0.75rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.save-button:hover {
  background-color: #45a049;
}
</style>

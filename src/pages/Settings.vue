
<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-sonner'

const toast = useToast()
const settings = ref({
  theme: 'dark',
  language: 'en',
  notifications: true,
  apiKey: ''
})

const saveSettings = async () => {
  try {
    // TODO: Implement actual save logic
    localStorage.setItem('app-settings', JSON.stringify(settings.value))
    toast.success('Settings saved successfully')
  } catch (error) {
    toast.error('Failed to save settings')
  }
}

// Load saved settings
const loadSettings = () => {
  const saved = localStorage.getItem('app-settings')
  if (saved) {
    settings.value = JSON.parse(saved)
  }
}

loadSettings()
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-text-primary">Settings</h1>
    
    <form @submit.prevent="saveSettings" class="space-y-6">
      <!-- Theme -->
      <div class="form-group">
        <label class="text-text-primary font-medium">Theme</label>
        <select v-model="settings.theme" 
                class="mt-1 block w-full rounded-lg bg-elevation-2 border-border-weak">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <!-- Language -->
      <div class="form-group">
        <label class="text-text-primary font-medium">Language</label>
        <select v-model="settings.language" 
                class="mt-1 block w-full rounded-lg bg-elevation-2 border-border-weak">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <!-- API Key -->
      <div class="form-group">
        <label class="text-text-primary font-medium">API Key</label>
        <input type="password" 
               v-model="settings.apiKey"
               class="mt-1 block w-full rounded-lg bg-elevation-2 border-border-weak" />
      </div>

      <!-- Notifications -->
      <div class="form-group flex items-center gap-2">
        <input type="checkbox" 
               v-model="settings.notifications"
               class="rounded bg-elevation-2 border-border-weak" />
        <label class="text-text-primary font-medium">Enable Notifications</label>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button type="submit" 
                class="px-4 py-2 bg-accent-orange hover:bg-accent-orange-dark text-black rounded-lg transition-colors">
          Save Settings
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-group {
  @apply bg-elevation-1 p-4 rounded-lg border border-border-weak;
}
</style>
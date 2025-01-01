<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-sonner';

const toast = useToast();
const settings = ref({
  theme: 'dark',
  language: 'en',
  notifications: true,
  apiKey: '',
});

// Load and save settings
const saveSettings = () => {
  try {
    localStorage.setItem('app-settings', JSON.stringify(settings.value));
    toast.success('Settings saved successfully');
  } catch (error) {
    toast.error('Failed to save settings');
  }
};

onMounted(() => {
  const savedSettings = localStorage.getItem('app-settings');
  if (savedSettings) settings.value = JSON.parse(savedSettings);
});
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-text-primary">Settings</h1>
    <form @submit.prevent="saveSettings" class="space-y-6">
      <!-- Theme -->
      <div class="form-group">
        <label class="text-text-primary font-medium">Theme</label>
        <select v-model="settings.theme" class="input">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <!-- Language -->
      <div class="form-group">
        <label class="text-text-primary font-medium">Language</label>
        <select v-model="settings.language" class="input">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <!-- API Key -->
      <div class="form-group">
        <label class="text-text-primary font-medium">API Key</label>
        <input type="password" v-model="settings.apiKey" class="input" />
      </div>

      <!-- Notifications -->
      <div class="form-group flex items-center gap-2">
        <input type="checkbox" v-model="settings.notifications" class="checkbox" />
        <label class="text-text-primary font-medium">Enable Notifications</label>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button type="submit" class="btn-primary">Save Settings</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-group {
  @apply bg-elevation-1 p-4 rounded-lg border border-border-weak;
}
.input {
  @apply mt-1 block w-full rounded-lg bg-elevation-2 border-border-weak;
}
.checkbox {
  @apply rounded bg-elevation-2 border-border-weak;
}
.btn-primary {
  @apply px-4 py-2 bg-accent-orange hover:bg-accent-orange-dark text-black rounded-lg transition-colors;
}
</style>
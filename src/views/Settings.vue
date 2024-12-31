<template>
  <div class="settings-view">
    <!-- Split into separate forms -->
    <form @submit.prevent="saveGeneralSettings" class="settings-form">
      <h3>General Settings</h3>
      <!-- General settings fields -->
      <!-- ...existing general settings code... -->
    </form>

    <form @submit.prevent="saveAPISettings" class="settings-form">
      <h3>API Settings</h3>
      <!-- API related fields -->
      <!-- ...existing API settings code... -->
    </form>

    <form @submit.prevent="saveAppearanceSettings" class="settings-form">
      <h3>Appearance</h3>
      <!-- Appearance settings -->
      <!-- ...existing appearance settings code... -->
    </form>
  </div>
</template>

<script setup>
const saveGeneralSettings = () => {
  // Save general settings logic
}

const saveAPISettings = () => {
  // Save API settings logic  
}

const saveAppearanceSettings = () => {
  // Save appearance settings logic
}

// ...existing code...
</script>

<template>
  <form @submit.prevent="handleSubmit" class="login-form" id="login-form" role="form">
    <input 
      type="text" 
      id="login-username"
      name="username" 
      autocomplete="username" 
      v-model="username"
      aria-hidden="true"
      style="position: absolute; opacity: 0; pointer-events: none;"
    >
    <PasswordField
      id="agent-password"
      label="Password"
      v-model="password"
      :username-value="username || 'agent'"
      placeholder="Enter password"
    />
    // ...rest of template...
  </form>
</template>

// ...rest of component code...

<script setup lang="ts">
import { ref } from 'vue'
import PasswordField from '../components/PasswordField.vue'

const username = ref('')
const password = ref('')

// ...rest of script...
</script>

<style scoped>
.password-field-container {
  margin: 0;
  padding: 0;
}
</style>

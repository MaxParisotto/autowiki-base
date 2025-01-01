<template>
  <form @submit.prevent="handleSubmit" id="login-form" class="login-form" role="form">
    <PasswordField
      id="agent-password"
      label="Password"
      v-model="password"
      :username-value="username || 'agent'"
      form-id="login-form"
      placeholder="Enter password"
    />
    <!-- ... rest of template ... -->
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
